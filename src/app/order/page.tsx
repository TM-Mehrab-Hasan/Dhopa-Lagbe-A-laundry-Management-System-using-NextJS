"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  MapPin, 
  Calendar, 
  Clock,
  CreditCard,
  CheckCircle,
  Plus,
  Minus,
  Shirt,
  Package,
  Sparkles,
  Shield
} from "lucide-react";

export default function CustomerOrderPage() {
  const [step, setStep] = useState(1);
  const [orderItems, setOrderItems] = useState([]);
  const [selectedServices, setSelectedServices] = useState<Record<string, number>>({});

  const services = [
    {
      id: "wash-fold",
      name: "Wash & Fold",
      description: "Regular washing and careful folding",
      price: 80,
      unit: "per kg",
      icon: Shirt,
      popular: true
    },
    {
      id: "dry-clean",
      name: "Dry Cleaning",
      description: "Professional dry cleaning for delicate items",
      price: 200,
      unit: "per piece",
      icon: Sparkles,
      popular: false
    },
    {
      id: "iron-only",
      name: "Iron Only",
      description: "Professional ironing service",
      price: 40,
      unit: "per piece",
      icon: Package,
      popular: false
    },
    {
      id: "wash-iron",
      name: "Wash & Iron",
      description: "Complete wash and iron service",
      price: 120,
      unit: "per kg",
      icon: Shield,
      popular: true
    },
  ];

  const deliverySlots = [
    { id: "morning", label: "Morning (9 AM - 12 PM)", price: 0 },
    { id: "afternoon", label: "Afternoon (1 PM - 5 PM)", price: 0 },
    { id: "evening", label: "Evening (6 PM - 9 PM)", price: 50 },
    { id: "express", label: "Express (Within 2 hours)", price: 200 },
  ];

  const updateQuantity = (serviceId: string, quantity: number) => {
    setSelectedServices(prev => ({
      ...prev,
      [serviceId]: Math.max(0, quantity)
    }));
  };

  const getTotalCost = () => {
    return Object.entries(selectedServices).reduce((total, [serviceId, quantity]) => {
      const service = services.find(s => s.id === serviceId);
      return total + (service ? service.price * (quantity as number) : 0);
    }, 0);
  };

  const steps = [
    { id: 1, title: "Select Services", description: "Choose your laundry services" },
    { id: 2, title: "Pickup Details", description: "Schedule pickup and delivery" },
    { id: 3, title: "Review & Payment", description: "Confirm your order" },
    { id: 4, title: "Confirmation", description: "Order placed successfully" }
  ];

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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Place Your Order</h1>
          <p className="text-gray-600">Professional laundry service at your convenience</p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center space-x-4">
            {steps.map((stepItem, index) => (
              <div key={stepItem.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  step >= stepItem.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > stepItem.id ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    stepItem.id
                  )}
                </div>
                <div className="ml-2 hidden sm:block">
                  <div className="text-sm font-medium">{stepItem.title}</div>
                  <div className="text-xs text-gray-500">{stepItem.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-8 h-px bg-gray-300 ml-4"></div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Step Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {step === 1 && (
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Select Services
                  </CardTitle>
                  <CardDescription>Choose the services you need for your laundry</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {services.map((service) => {
                      const Icon = service.icon;
                      const quantity = selectedServices[service.id] || 0;
                      
                      return (
                        <motion.div
                          key={service.id}
                          className="border rounded-lg p-4 hover:shadow-lg transition-all"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div className="p-2 bg-blue-100 rounded-lg">
                                <Icon className="h-6 w-6 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <h3 className="font-semibold">{service.name}</h3>
                                  {service.popular && (
                                    <Badge variant="secondary">Popular</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                                <p className="text-lg font-bold text-blue-600">
                                  ৳{service.price} {service.unit}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(service.id, quantity - 1)}
                                disabled={quantity === 0}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-12 text-center font-medium">{quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(service.id, quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-600">Subtotal</div>
                              <div className="font-bold">৳{(service.price * quantity).toLocaleString()}</div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                  
                  {/* Total */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total Cost:</span>
                      <span className="text-2xl font-bold text-blue-600">৳{getTotalCost().toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button 
                      onClick={() => setStep(2)}
                      disabled={getTotalCost() === 0}
                      size="lg"
                    >
                      Continue to Pickup Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {step === 2 && (
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Pickup & Delivery Details
                  </CardTitle>
                  <CardDescription>Schedule your pickup and delivery preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Address */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Pickup Address</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="address">Street Address</Label>
                        <Input id="address" placeholder="Enter your address" />
                      </div>
                      <div>
                        <Label htmlFor="area">Area</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select area" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dhanmondi">Dhanmondi</SelectItem>
                            <SelectItem value="gulshan">Gulshan</SelectItem>
                            <SelectItem value="uttara">Uttara</SelectItem>
                            <SelectItem value="bashundhara">Bashundhara</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="instructions">Special Instructions</Label>
                      <Textarea 
                        id="instructions" 
                        placeholder="Any special instructions for pickup..."
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Schedule</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pickup-date">Pickup Date</Label>
                        <Input type="date" id="pickup-date" />
                      </div>
                      <div>
                        <Label htmlFor="delivery-date">Delivery Date</Label>
                        <Input type="date" id="delivery-date" />
                      </div>
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Delivery Time Slot</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {deliverySlots.map((slot) => (
                        <label key={slot.id} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input type="radio" name="timeSlot" value={slot.id} className="text-blue-600" />
                          <div className="flex-1">
                            <div className="font-medium">{slot.label}</div>
                            {slot.price > 0 && (
                              <div className="text-sm text-blue-600">+৳{slot.price}</div>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back to Services
                    </Button>
                    <Button onClick={() => setStep(3)} size="lg">
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {step === 3 && (
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Review & Payment
                  </CardTitle>
                  <CardDescription>Review your order and complete payment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Summary */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Order Summary</h3>
                    <div className="border rounded-lg p-4">
                      {Object.entries(selectedServices).map(([serviceId, quantity]) => {
                        const service = services.find(s => s.id === serviceId);
                        if (!service || quantity === 0) return null;
                        
                        return (
                          <div key={serviceId} className="flex justify-between items-center py-2">
                            <div>
                              <span className="font-medium">{service.name}</span>
                              <span className="text-gray-600 ml-2">× {quantity}</span>
                            </div>
                            <span className="font-medium">৳{(service.price * (quantity as number)).toLocaleString()}</span>
                          </div>
                        );
                      })}
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Total:</span>
                          <span className="font-bold text-lg">৳{getTotalCost().toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Payment Method</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input type="radio" name="payment" value="cash" className="text-blue-600" defaultChecked />
                        <div>
                          <div className="font-medium">Cash on Delivery</div>
                          <div className="text-sm text-gray-600">Pay when your order is delivered</div>
                        </div>
                      </label>
                      <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input type="radio" name="payment" value="bkash" className="text-blue-600" />
                        <div>
                          <div className="font-medium">bKash</div>
                          <div className="text-sm text-gray-600">Pay with bKash mobile wallet</div>
                        </div>
                      </label>
                      <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input type="radio" name="payment" value="card" className="text-blue-600" />
                        <div>
                          <div className="font-medium">Credit/Debit Card</div>
                          <div className="text-sm text-gray-600">Pay with your card</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Back to Details
                    </Button>
                    <Button onClick={() => setStep(4)} size="lg">
                      Place Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {step === 4 && (
            <div className="max-w-md mx-auto text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
                    <p className="text-gray-600 mb-4">
                      Your order #DL{Date.now().toString().slice(-6)} has been placed successfully.
                    </p>
                    <div className="text-sm text-gray-500 mb-6">
                      You will receive a confirmation call within 30 minutes.
                    </div>
                    <div className="space-y-3">
                      <Button size="lg" className="w-full">
                        Track Your Order
                      </Button>
                      <Button variant="outline" size="lg" className="w-full" onClick={() => setStep(1)}>
                        Place Another Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}