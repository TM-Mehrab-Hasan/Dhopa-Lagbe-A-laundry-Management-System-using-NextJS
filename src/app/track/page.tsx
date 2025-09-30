"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  Package,
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  Truck,
  Calendar,
  User,
  MessageCircle,
  Star,
  Navigation,
  CreditCard
} from "lucide-react";

export default function OrderTrackingPage() {
  const [trackingId, setTrackingId] = useState("");
    const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Mock order data - replace with actual API call
  const mockOrderData = {
    id: "DL250101001",
    status: "OUT_FOR_DELIVERY",
    items: [
      { name: "Cotton Shirts", quantity: 3, service: "Wash & Fold" },
      { name: "Formal Pants", quantity: 2, service: "Dry Clean" },
      { name: "Bedsheets", quantity: 1, service: "Wash & Iron" }
    ],
    totalItems: 6,
    amount: 650,
    pickupDate: "2025-01-01T10:30:00Z",
    expectedDelivery: "2025-01-03T18:00:00Z",
    customer: {
      name: "John Doe",
      phone: "+8801712345678",
      address: "House 15, Road 12, Dhanmondi, Dhaka"
    },
    rider: {
      name: "Ahmed Hassan",
      phone: "+8801798765432",
      rating: 4.8,
      currentLocation: "Approaching destination"
    },
    timeline: [
      { 
        status: "Order Placed", 
        time: "2025-01-01T10:30:00Z", 
        completed: true,
        description: "Your order has been confirmed and scheduled for pickup"
      },
      { 
        status: "Picked Up", 
        time: "2025-01-01T14:15:00Z", 
        completed: true,
        description: "Items collected from your address by our team"
      },
      { 
        status: "In Processing", 
        time: "2025-01-02T09:00:00Z", 
        completed: true,
        description: "Your items are being cleaned with care"
      },
      { 
        status: "Quality Check", 
        time: "2025-01-02T16:30:00Z", 
        completed: true,
        description: "Items inspected and prepared for delivery"
      },
      { 
        status: "Out for Delivery", 
        time: "2025-01-03T15:45:00Z", 
        completed: true,
        description: "On the way to your address"
      },
      { 
        status: "Delivered", 
        time: "", 
        completed: false,
        description: "Items delivered to your address"
      }
    ],
    payment: {
      method: "Cash on Delivery",
      status: "Pending",
      amount: 650
    }
  };

  const handleTrackOrder = async () => {
    if (!trackingId.trim()) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOrderData(mockOrderData);
      setLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      "Order Placed": "bg-blue-100 text-blue-800",
      "Picked Up": "bg-purple-100 text-purple-800",
      "In Processing": "bg-orange-100 text-orange-800",
      "Quality Check": "bg-yellow-100 text-yellow-800",
      "Out for Delivery": "bg-green-100 text-green-800",
      "Delivered": "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return "";
    const date = new Date(timeString);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-gray-600">Enter your order ID to see real-time tracking information</p>
        </motion.div>

        {/* Search Section */}
        <motion.div 
          className="max-w-md mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Enter Order ID</CardTitle>
              <CardDescription className="text-center">
                You can find your order ID in your confirmation SMS or email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="e.g., DL250101001"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    className="pl-10"
                    onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder()}
                  />
                </div>
                <Button onClick={handleTrackOrder} disabled={loading}>
                  {loading ? "Tracking..." : "Track"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Order Details */}
        {orderData && (
          <motion.div 
            className="max-w-4xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Package className="h-5 w-5" />
                      <span>Order #{orderData.id}</span>
                    </CardTitle>
                    <CardDescription>
                      {orderData.totalItems} items • ৳{orderData.amount.toLocaleString()}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(orderData.status.replace("_", " "))}>
                    {orderData.status.replace("_", " ")}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                    <div className="space-y-2">
                      {orderData.items.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <div>
                            <span className="font-medium">{item.name}</span>
                            <span className="text-gray-600 ml-2">× {item.quantity}</span>
                          </div>
                          <Badge variant="outline">{item.service}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Delivery Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400 mt-1" />
                        <div>
                          <div className="text-sm text-gray-600">Expected Delivery</div>
                          <div className="font-medium">{formatTime(orderData.expectedDelivery)}</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                        <div>
                          <div className="text-sm text-gray-600">Delivery Address</div>
                          <div className="font-medium">{orderData.customer.address}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live Tracking */}
            {orderData.status === "OUT_FOR_DELIVERY" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Navigation className="h-5 w-5 text-green-600" />
                    <span>Live Tracking</span>
                  </CardTitle>
                  <CardDescription>Your order is on the way!</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                        <Truck className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{orderData.rider.name}</div>
                        <div className="text-sm text-gray-600">{orderData.rider.currentLocation}</div>
                        <div className="flex items-center text-sm text-green-600">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          {orderData.rider.rating}/5.0
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Rider
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Order Timeline</span>
                </CardTitle>
                <CardDescription>Track the progress of your order</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {orderData.timeline.map((step: any, index: number) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed 
                          ? 'bg-green-600' 
                          : index === orderData.timeline.findIndex((s: any) => !s.completed)
                          ? 'bg-blue-600'
                          : 'bg-gray-300'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="h-5 w-5 text-white" />
                        ) : (
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                            {step.status}
                          </h3>
                          {step.time && (
                            <span className="text-sm text-gray-500">
                              {formatTime(step.time)}
                            </span>
                          )}
                        </div>
                        <p className={`text-sm ${step.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Payment Method</div>
                    <div className="font-medium">{orderData.payment.method}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Payment Status</div>
                    <Badge variant={orderData.payment.status === "Pending" ? "secondary" : "default"}>
                      {orderData.payment.status}
                    </Badge>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Amount:</span>
                    <span className="text-xl font-bold text-green-600">
                      ৳{orderData.payment.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>Our customer support team is here to assist you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Support
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Live Chat
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <User className="h-4 w-4 mr-2" />
                    Report Issue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Sample Order IDs for Demo */}
        {!orderData && (
          <motion.div 
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-sm">Demo Order IDs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <p className="text-xs text-gray-600">Try these sample order IDs:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {["DL250101001", "DL250101002", "DL250101003"].map((id) => (
                      <Button
                        key={id}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setTrackingId(id);
                          setTimeout(() => handleTrackOrder(), 100);
                        }}
                      >
                        {id}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}