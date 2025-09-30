"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Users, 
  Eye, 
  Edit, 
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Package,
  Star,
  Calendar,
  CreditCard
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function AdminCustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  // Mock data - replace with actual API calls
  const customers = [
    {
      id: "cust_001",
      name: "John Doe",
      email: "john@example.com",
      phone: "+880 1234-567890",
      image: null,
      status: "active",
      joinedAt: "2024-06-15T10:30:00Z",
      lastOrderAt: "2025-01-01T10:30:00Z",
      totalOrders: 15,
      totalSpent: 4500,
      loyaltyPoints: 450,
      defaultAddress: "123 Main St, Dhanmondi, Dhaka",
      averageRating: 4.8,
      subscription: "Standard",
    },
    {
      id: "cust_002",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+880 1234-567891",
      image: null,
      status: "active",
      joinedAt: "2024-08-20T15:45:00Z",
      lastOrderAt: "2024-12-28T14:20:00Z",
      totalOrders: 8,
      totalSpent: 2400,
      loyaltyPoints: 240,
      defaultAddress: "456 Oak Ave, Gulshan, Dhaka",
      averageRating: 4.9,
      subscription: "Premium",
    },
    {
      id: "cust_003",
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+880 1234-567892",
      image: null,
      status: "inactive",
      joinedAt: "2024-03-10T09:15:00Z",
      lastOrderAt: "2024-11-15T11:30:00Z",
      totalOrders: 25,
      totalSpent: 7800,
      loyaltyPoints: 780,
      defaultAddress: "789 Pine St, Banani, Dhaka",
      averageRating: 4.7,
      subscription: "Basic",
    },
    {
      id: "cust_004",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+880 1234-567893",
      image: null,
      status: "active",
      joinedAt: "2024-11-05T12:00:00Z",
      lastOrderAt: "2024-12-30T16:45:00Z",
      totalOrders: 3,
      totalSpent: 890,
      loyaltyPoints: 89,
      defaultAddress: "321 Elm St, Uttara, Dhaka",
      averageRating: 5.0,
      subscription: null,
    },
  ];

  const getStatusColor = (status: string) => {
    return status === "active" 
      ? "bg-green-100 text-green-800" 
      : "bg-gray-100 text-gray-800";
  };

  const getSubscriptionColor = (subscription: string | null) => {
    if (!subscription) return "bg-gray-100 text-gray-800";
    
    const colors: Record<string, string> = {
      Basic: "bg-blue-100 text-blue-800",
      Standard: "bg-purple-100 text-purple-800",
      Premium: "bg-orange-100 text-orange-800",
    };
    return colors[subscription] || "bg-gray-100 text-gray-800";
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Sort customers
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "orders":
        return b.totalOrders - a.totalOrders;
      case "spent":
        return b.totalSpent - a.totalSpent;
      case "recent":
      default:
        return new Date(b.lastOrderAt).getTime() - new Date(a.lastOrderAt).getTime();
    }
  });

  return (
    <AdminLayout>
      <Container>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
              <p className="text-gray-600">Manage customer profiles and track their activity</p>
            </div>
            <Button>
              <Users className="mr-2 h-4 w-4" />
              Add Customer
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
                      placeholder="Search customers by name, email, or phone..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
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
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Recent Activity</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="orders">Total Orders</SelectItem>
                    <SelectItem value="spent">Total Spent</SelectItem>
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
                    <p className="text-sm text-gray-600">Total Customers</p>
                    <p className="text-2xl font-bold">{customers.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Customers</p>
                    <p className="text-2xl font-bold">
                      {customers.filter(c => c.status === "active").length}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Subscribers</p>
                    <p className="text-2xl font-bold">
                      {customers.filter(c => c.subscription).length}
                    </p>
                  </div>
                  <CreditCard className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg. Rating</p>
                    <p className="text-2xl font-bold">
                      {(customers.reduce((sum, c) => sum + c.averageRating, 0) / customers.length).toFixed(1)}
                    </p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customers List */}
          <Card>
            <CardHeader>
              <CardTitle>Customers ({sortedCustomers.length})</CardTitle>
              <CardDescription>
                {sortedCustomers.length > 0 ? 
                  `Showing ${sortedCustomers.length} of ${customers.length} customers` : 
                  "No customers found matching your criteria"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="border rounded-lg p-6 hover:shadow-sm transition-shadow"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-start">
                      {/* Customer Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-3">
                          <Avatar>
                            <AvatarImage src={customer.image || ""} />
                            <AvatarFallback>
                              {customer.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-lg">{customer.name}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge className={getStatusColor(customer.status)}>
                                {customer.status}
                              </Badge>
                              {customer.subscription && (
                                <Badge className={getSubscriptionColor(customer.subscription)}>
                                  {customer.subscription}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="h-4 w-4 mr-2" />
                            {customer.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-4 w-4 mr-2" />
                            {customer.phone}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2" />
                            {customer.defaultAddress}
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Package className="h-4 w-4 mr-2 text-blue-600" />
                            <span className="font-medium">{customer.totalOrders}</span>
                            <span className="text-gray-600 ml-1">orders</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <CreditCard className="h-4 w-4 mr-2 text-green-600" />
                            <span className="font-medium">৳{customer.totalSpent.toLocaleString()}</span>
                            <span className="text-gray-600 ml-1">spent</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Star className="h-4 w-4 mr-2 text-yellow-600" />
                            <span className="font-medium">{customer.loyaltyPoints}</span>
                            <span className="text-gray-600 ml-1">points</span>
                          </div>
                        </div>
                      </div>

                      {/* Rating */}
                      <div>
                        <div className="flex items-center space-x-1 mb-2">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold">{customer.averageRating}</span>
                          <span className="text-gray-600 text-sm">rating</span>
                        </div>
                      </div>

                      {/* Dates */}
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          <strong>Joined:</strong> {new Date(customer.joinedAt).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Last Order:</strong> {new Date(customer.lastOrderAt).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Package className="h-4 w-4 mr-2" />
                              View Orders
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CreditCard className="h-4 w-4 mr-2" />
                              Manage Subscription
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </AdminLayout>
  );
}