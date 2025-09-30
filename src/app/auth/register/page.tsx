"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  MapPin, 
  UserPlus,
  Bike,
  ShoppingBag,
  ArrowRight,
  Check,
  AlertCircle
} from "lucide-react";

export default function RegisterPage() {
  const [userType, setUserType] = useState<"customer" | "rider">("customer");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    // Rider specific fields
    vehicleType: "",
    vehicleNumber: "",
    licenseNumber: "",
    experience: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Registration data:", { userType, ...formData });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full opacity-20"
        animate={{ 
          y: [0, -30, 0],
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
        className="absolute bottom-20 right-20 w-24 h-24 bg-purple-200 rounded-full opacity-20"
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
      
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4"
              >
                <UserPlus className="h-8 w-8 text-white" />
              </motion.div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Join Dhopa Lagbe
              </CardTitle>
              <CardDescription className="text-gray-600">
                Create your account and start your laundry journey
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* User Type Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">I want to register as:</Label>
                <div className="grid grid-cols-2 gap-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="button"
                      variant={userType === "customer" ? "default" : "outline"}
                      className={`w-full h-16 flex flex-col items-center justify-center space-y-1 ${
                        userType === "customer" 
                          ? "bg-gradient-to-r from-blue-600 to-purple-600" 
                          : "border-2 hover:border-blue-300"
                      }`}
                      onClick={() => setUserType("customer")}
                    >
                      <ShoppingBag className="h-5 w-5" />
                      <span className="text-xs">Customer</span>
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="button"
                      variant={userType === "rider" ? "default" : "outline"}
                      className={`w-full h-16 flex flex-col items-center justify-center space-y-1 ${
                        userType === "rider" 
                          ? "bg-gradient-to-r from-green-600 to-blue-600" 
                          : "border-2 hover:border-green-300"
                      }`}
                      onClick={() => setUserType("rider")}
                    >
                      <Bike className="h-5 w-5" />
                      <span className="text-xs">Delivery Rider</span>
                    </Button>
                  </motion.div>
                </div>
                {userType === "rider" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-orange-50 border border-orange-200 rounded-lg p-3"
                  >
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-orange-700">
                        Rider applications require admin approval. You'll be notified via email once your application is reviewed.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Common Fields */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-10"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
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
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+880 1XXX-XXXXXX"
                      className="pl-10"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-2"
                >
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="address"
                      type="text"
                      placeholder="Enter your full address"
                      className="pl-10"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      required
                    />
                  </div>
                </motion.div>

                {/* Rider Specific Fields */}
                {userType === "rider" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 border-t pt-4"
                  >
                    <h4 className="font-medium text-gray-900 flex items-center">
                      <Bike className="h-4 w-4 mr-2" />
                      Delivery Information
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="vehicleType">Vehicle Type</Label>
                        <Select value={formData.vehicleType} onValueChange={(value) => handleInputChange("vehicleType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select vehicle" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="motorcycle">Motorcycle</SelectItem>
                            <SelectItem value="bicycle">Bicycle</SelectItem>
                            <SelectItem value="car">Car</SelectItem>
                            <SelectItem value="van">Van</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                        <Input
                          id="vehicleNumber"
                          type="text"
                          placeholder="DHK-1234"
                          value={formData.vehicleNumber}
                          onChange={(e) => handleInputChange("vehicleNumber", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">Driving License Number</Label>
                      <Input
                        id="licenseNumber"
                        type="text"
                        placeholder="Enter license number"
                        value={formData.licenseNumber}
                        onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience (Years)</Label>
                      <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1">0-1 years</SelectItem>
                          <SelectItem value="1-3">1-3 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5+">5+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>
                )}

                {/* Password Fields */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-2"
                >
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      className="pl-10"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-2"
                >
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      className="pl-10"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      required
                    />
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="pt-4"
                >
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium group"
                  >
                    Create {userType === "customer" ? "Customer" : "Rider"} Account
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </form>

              {/* Login Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center pt-4 border-t"
              >
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link 
                    href="/auth/login" 
                    className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                  >
                    Sign in here
                  </Link>
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}