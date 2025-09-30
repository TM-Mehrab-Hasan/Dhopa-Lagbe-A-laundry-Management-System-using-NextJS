"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Plus, 
  Edit, 
  MoreHorizontal,
  Package,
  Clock,
  DollarSign,
  Shirt,
  Zap,
  Shield,
  Sparkles,
  Settings,
  Eye,
  ToggleLeft,
  ToggleRight
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function AdminServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data - replace with actual API calls
  const services = [
    {
      id: "svc_001",
      name: "Regular Wash & Fold",
      category: "washing",
      description: "Standard washing and folding service for everyday clothes",
      basePrice: 60,
      pricePerKg: 60,
      estimatedTime: "24-48 hours",
      status: "active",
      popularity: 95,
      totalOrders: 1250,
      icon: "👕",
      features: ["Machine wash", "Fold & pack", "Quality detergent"],
      createdAt: "2024-01-15T10:30:00Z",
    },
    {
      id: "svc_002",
      name: "Express Cleaning",
      category: "express",
      description: "Fast cleaning service for urgent needs",
      basePrice: 120,
      pricePerKg: 120,
      estimatedTime: "4-6 hours",
      status: "active",
      popularity: 78,
      totalOrders: 456,
      icon: "⚡",
      features: ["Express delivery", "Same day service", "Priority handling"],
      createdAt: "2024-02-10T14:20:00Z",
    },
    {
      id: "svc_003",
      name: "Dry Cleaning",
      category: "drycleaning",
      description: "Professional dry cleaning for delicate fabrics",
      basePrice: 150,
      pricePerKg: 150,
      estimatedTime: "48-72 hours",
      status: "active",
      popularity: 65,
      totalOrders: 789,
      icon: "✨",
      features: ["Chemical cleaning", "Delicate fabric care", "Professional pressing"],
      createdAt: "2024-01-20T09:15:00Z",
    },
    {
      id: "svc_004",
      name: "Premium Care",
      category: "premium",
      description: "Premium service with special care and packaging",
      basePrice: 200,
      pricePerKg: 200,
      estimatedTime: "24-48 hours",
      status: "active",
      popularity: 45,
      totalOrders: 234,
      icon: "👑",
      features: ["Hand wash option", "Premium packaging", "Fabric softener", "Stain removal"],
      createdAt: "2024-03-05T16:45:00Z",
    },
    {
      id: "svc_005",
      name: "Ironing Only",
      category: "ironing",
      description: "Professional ironing and pressing service",
      basePrice: 40,
      pricePerKg: 40,
      estimatedTime: "12-24 hours",
      status: "inactive",
      popularity: 55,
      totalOrders: 567,
      icon: "🔥",
      features: ["Professional pressing", "Crease removal", "Fabric care"],
      createdAt: "2024-02-28T11:30:00Z",
    },
  ];

  const categories = [
    { value: "washing", label: "Washing", icon: "👕" },
    { value: "drycleaning", label: "Dry Cleaning", icon: "✨" },
    { value: "ironing", label: "Ironing", icon: "🔥" },
    { value: "express", label: "Express", icon: "⚡" },
    { value: "premium", label: "Premium", icon: "👑" },
  ];

  const getStatusColor = (status: string) => {
    return status === "active" 
      ? "bg-green-100 text-green-800" 
      : "bg-gray-100 text-gray-800";
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      washing: "bg-blue-100 text-blue-800",
      drycleaning: "bg-purple-100 text-purple-800",
      ironing: "bg-orange-100 text-orange-800",
      express: "bg-yellow-100 text-yellow-800",
      premium: "bg-pink-100 text-pink-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || service.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <AdminLayout>
      <Container>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Service Management</h1>
              <p className="text-gray-600">Manage laundry services, pricing, and configurations</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search services by name or description..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.icon} {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Services</p>
                    <p className="text-2xl font-bold">{services.length}</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Services</p>
                    <p className="text-2xl font-bold">
                      {services.filter(s => s.status === "active").length}
                    </p>
                  </div>
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg. Price</p>
                    <p className="text-2xl font-bold">
                      ৳{Math.round(services.reduce((sum, s) => sum + s.basePrice, 0) / services.length)}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold">
                      {services.reduce((sum, s) => sum + s.totalOrders, 0).toLocaleString()}
                    </p>
                  </div>
                  <Shirt className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Services List */}
          <Card>
            <CardHeader>
              <CardTitle>Services ({filteredServices.length})</CardTitle>
              <CardDescription>
                {filteredServices.length > 0 ? 
                  `Showing ${filteredServices.length} of ${services.length} services` : 
                  "No services found matching your criteria"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className="border rounded-lg p-6 hover:shadow-sm transition-shadow"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{service.icon}</div>
                        <div>
                          <h3 className="font-semibold text-lg">{service.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getCategoryColor(service.category)}>
                              {categories.find(c => c.value === service.category)?.label}
                            </Badge>
                            <Badge className={getStatusColor(service.status)}>
                              {service.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Service
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings className="h-4 w-4 mr-2" />
                            Configure Pricing
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {service.status === "active" ? (
                              <>
                                <ToggleLeft className="h-4 w-4 mr-2" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <ToggleRight className="h-4 w-4 mr-2" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 text-sm">{service.description}</p>

                    {/* Pricing & Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Base Price</span>
                          <span className="font-bold text-lg">৳{service.basePrice}</span>
                        </div>
                        <p className="text-xs text-gray-500">per kg</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Est. Time</span>
                          <span className="font-medium text-sm">{service.estimatedTime}</span>
                        </div>
                        <p className="text-xs text-gray-500">delivery time</p>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">{service.totalOrders} orders</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Sparkles className="h-4 w-4 text-purple-600" />
                        <span className="text-sm text-gray-600">{service.popularity}% popular</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {service.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 mt-4 pt-4 border-t">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="h-4 w-4 mr-1" />
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common service management tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <Plus className="h-6 w-6 mb-2" />
                  <span>Add New Service</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <DollarSign className="h-6 w-6 mb-2" />
                  <span>Bulk Price Update</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Settings className="h-6 w-6 mb-2" />
                  <span>Service Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </AdminLayout>
  );
}