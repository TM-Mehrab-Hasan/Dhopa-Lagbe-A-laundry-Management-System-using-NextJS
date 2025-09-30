"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mail, 
  Lock, 
  LogIn,
  ShoppingBag,
  Bike,
  Shield,
  ArrowRight,
  Eye,
  EyeOff
} from "lucide-react";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    customer: { email: "", password: "" },
    rider: { email: "", password: "" },
    admin: { email: "", password: "" }
  });

  const handleInputChange = (tab: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [tab]: { ...prev[tab as keyof typeof prev], [field]: value }
    }));
  };

  const handleSubmit = (e: React.FormEvent, userType: string) => {
    e.preventDefault();
    console.log(`${userType} login:`, formData[userType as keyof typeof formData]);
    // Handle login logic here
  };

  const getTabConfig = (type: string) => {
    const configs = {
      customer: {
        icon: ShoppingBag,
        title: "Customer Login",
        description: "Access your laundry orders and account",
        gradient: "from-blue-600 to-purple-600",
        hoverGradient: "hover:from-blue-700 hover:to-purple-700"
      },
      rider: {
        icon: Bike,
        title: "Rider Login", 
        description: "Access your delivery dashboard",
        gradient: "from-green-600 to-blue-600",
        hoverGradient: "hover:from-green-700 hover:to-blue-700"
      },
      admin: {
        icon: Shield,
        title: "Admin Login",
        description: "Access admin management panel",
        gradient: "from-red-600 to-orange-600",
        hoverGradient: "hover:from-red-700 hover:to-orange-700"
      }
    };
    return configs[type as keyof typeof configs];
  };

  const renderLoginForm = (userType: string) => {
    const config = getTabConfig(userType);
    const IconComponent = config.icon;
    
    return (
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={`mx-auto w-16 h-16 bg-gradient-to-r ${config.gradient} rounded-full flex items-center justify-center mb-4`}
          >
            <IconComponent className="h-8 w-8 text-white" />
          </motion.div>
          <CardTitle className={`text-2xl font-bold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
            {config.title}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {config.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={(e) => handleSubmit(e, userType)} className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <Label htmlFor={`${userType}-email`}>Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id={`${userType}-email`}
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={formData[userType as keyof typeof formData].email}
                  onChange={(e) => handleInputChange(userType, "email", e.target.value)}
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <Label htmlFor={`${userType}-password`}>Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id={`${userType}-password`}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  value={formData[userType as keyof typeof formData].password}
                  onChange={(e) => handleInputChange(userType, "password", e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-2"
            >
              <Button
                type="submit"
                className={`w-full h-12 bg-gradient-to-r ${config.gradient} ${config.hoverGradient} text-white font-medium group`}
              >
                Sign in as {userType.charAt(0).toUpperCase() + userType.slice(1)}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </form>

          {userType !== "admin" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center space-y-3"
            >
              <Link 
                href="/auth/forgot-password" 
                className="text-sm text-gray-600 hover:text-gray-800 hover:underline transition-colors"
              >
                Forgot your password?
              </Link>
              
              <div className="border-t pt-3">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link 
                    href="/auth/register" 
                    className={`bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent font-medium hover:underline transition-colors`}
                  >
                    Create one here
                  </Link>
                </p>
              </div>
            </motion.div>
          )}

          {userType === "admin" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <Link 
                href="/auth/forgot-password" 
                className="text-sm text-gray-600 hover:text-gray-800 hover:underline transition-colors"
              >
                Forgot your password?
              </Link>
            </motion.div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-10 left-10 w-24 h-24 bg-blue-200 rounded-full opacity-20"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20"
        animate={{ 
          y: [0, 25, 0],
          rotate: [360, 180, 0],
          scale: [1, 0.8, 1]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-200 rounded-full opacity-15"
        animate={{ 
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 1.5, 1]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Tab Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <Tabs defaultValue="customer" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/50 backdrop-blur-sm p-1 rounded-lg shadow-lg">
                <TabsTrigger 
                  value="customer" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-200"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Customer
                </TabsTrigger>
                <TabsTrigger 
                  value="rider"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-200"
                >
                  <Bike className="h-4 w-4 mr-2" />
                  Rider
                </TabsTrigger>
                <TabsTrigger 
                  value="admin"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-orange-600 data-[state=active]:text-white transition-all duration-200"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Admin
                </TabsTrigger>
              </TabsList>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <TabsContent value="customer" className="mt-0">
                  {renderLoginForm("customer")}
                </TabsContent>
                <TabsContent value="rider" className="mt-0">
                  {renderLoginForm("rider")}
                </TabsContent>
                <TabsContent value="admin" className="mt-0">
                  {renderLoginForm("admin")}
                </TabsContent>
              </motion.div>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>

      {/* Back to Home Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute top-6 left-6"
      >
        <Link 
          href="/"
          className="text-gray-600 hover:text-gray-800 transition-colors font-medium"
        >
          ← Back to Home
        </Link>
      </motion.div>
    </div>
  );
}