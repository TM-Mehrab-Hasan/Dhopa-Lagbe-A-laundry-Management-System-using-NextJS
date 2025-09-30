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
  Bike, 
  Eye, 
  Edit, 
  MoreHorizontal,
  Phone,
  MapPin,
  Package,
  Star,
  Calendar,
  Clock,
  TrendingUp,
  Users,
  Navigation
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function AdminRidersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  // Mock data - replace with actual API calls
  const riders = [
    {
      id: "rider_001",
      name: "Abdul Rahman",
      phone: "+880 1234-567890",
      image: null,
      status: "active",
      availability: "available",
      joinedAt: "2024-05-15T10:30:00Z",
      lastActiveAt: "2025-01-01T10:30:00Z",
      totalDeliveries: 245,
      completedToday: 8,
      averageRating: 4.8,
      vehicleType: "Motorcycle",
      vehicleNumber: "DHK-1234",
      currentLocation: "Dhanmondi, Dhaka",
      totalEarnings: 45000,
      monthlyEarnings: 12000,
      onTimeRate: 95,
      activeOrders: 2,
    },
    {
      id: "rider_002",
      name: "Mohammad Karim",
      phone: "+880 1234-567891",
      image: null,
      status: "active",
      availability: "busy",
      joinedAt: "2024-08-20T15:45:00Z",
      lastActiveAt: "2024-12-28T14:20:00Z",
      totalDeliveries: 156,
      completedToday: 5,
      averageRating: 4.9,
      vehicleType: "Bicycle",
      vehicleNumber: "DHK-5678",
      currentLocation: "Gulshan, Dhaka",
      totalEarnings: 28000,
      monthlyEarnings: 8500,
      onTimeRate: 98,
      activeOrders: 1,
    },
    {
      id: "rider_003",
      name: "Shahidul Islam",
      phone: "+880 1234-567892",
      image: null,
      status: "inactive",
      availability: "offline",
      joinedAt: "2024-03-10T09:15:00Z",
      lastActiveAt: "2024-11-15T11:30:00Z",
      totalDeliveries: 389,
      completedToday: 0,
      averageRating: 4.7,
      vehicleType: "Motorcycle",
      vehicleNumber: "DHK-9012",
      currentLocation: "Banani, Dhaka",
      totalEarnings: 67000,
      monthlyEarnings: 0,
      onTimeRate: 92,
      activeOrders: 0,
    },
    {
      id: "rider_004",
      name: "Rafiq Ahmed",
      phone: "+880 1234-567893",
      image: null,
      status: "active",
      availability: "available",
      joinedAt: "2024-11-05T12:00:00Z",
      lastActiveAt: "2024-12-30T16:45:00Z",
      totalDeliveries: 67,
      completedToday: 3,
      averageRating: 5.0,
      vehicleType: "Motorcycle",
      vehicleNumber: "DHK-3456",
      currentLocation: "Uttara, Dhaka",
      totalEarnings: 15000,
      monthlyEarnings: 6500,
      onTimeRate: 100,
      activeOrders: 1,
    },
  ];

  const getStatusColor = (status: string) => {
    return status === "active" 
      ? "bg-green-100 text-green-800" 
      : "bg-gray-100 text-gray-800";
  };

  const getAvailabilityColor = (availability: string) => {
    const colors: Record<string, string> = {
      available: "bg-green-100 text-green-800",
      busy: "bg-yellow-100 text-yellow-800",
      offline: "bg-gray-100 text-gray-800",
    };
    return colors[availability] || "bg-gray-100 text-gray-800";
  };

  const getVehicleIcon = (vehicleType: string) => {
    return vehicleType === "Motorcycle" ? "🏍️" : "🚲";
  };

  const filteredRiders = riders.filter(rider => {
    const matchesSearch = rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rider.phone.includes(searchTerm) ||
                         rider.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || rider.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Sort riders
  const sortedRiders = [...filteredRiders].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "deliveries":
        return b.totalDeliveries - a.totalDeliveries;
      case "rating":
        return b.averageRating - a.averageRating;
      case "earnings":
        return b.totalEarnings - a.totalEarnings;
      case "recent":
      default:
        return new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime();
    }
  });

  return (
    <AdminLayout>
      <Container>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Rider Management</h1>
              <p className="text-gray-600">Manage delivery riders and track their performance</p>
            </div>
            <Button>
              <Users className="mr-2 h-4 w-4" />
              Add Rider
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
                      placeholder="Search riders by name, phone, or vehicle number..."
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
                    <SelectItem value="deliveries">Total Deliveries</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="earnings">Earnings</SelectItem>
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
                    <p className="text-sm text-gray-600">Total Riders</p>
                    <p className="text-2xl font-bold">{riders.length}</p>
                  </div>
                  <Bike className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Riders</p>
                    <p className="text-2xl font-bold">
                      {riders.filter(r => r.status === "active").length}
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
                    <p className="text-sm text-gray-600">Available Now</p>
                    <p className="text-2xl font-bold">
                      {riders.filter(r => r.availability === "available").length}
                    </p>
                  </div>
                  <Navigation className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg. Rating</p>
                    <p className="text-2xl font-bold">
                      {(riders.reduce((sum, r) => sum + r.averageRating, 0) / riders.length).toFixed(1)}
                    </p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Riders List */}
          <Card>
            <CardHeader>
              <CardTitle>Riders ({sortedRiders.length})</CardTitle>
              <CardDescription>
                {sortedRiders.length > 0 ? 
                  `Showing ${sortedRiders.length} of ${riders.length} riders` : 
                  "No riders found matching your criteria"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedRiders.map((rider) => (
                  <div
                    key={rider.id}
                    className="border rounded-lg p-6 hover:shadow-sm transition-shadow"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-start">
                      {/* Rider Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-3">
                          <Avatar>
                            <AvatarImage src={rider.image || ""} />
                            <AvatarFallback>
                              {rider.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-lg">{rider.name}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge className={getStatusColor(rider.status)}>
                                {rider.status}
                              </Badge>
                              <Badge className={getAvailabilityColor(rider.availability)}>
                                {rider.availability}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-4 w-4 mr-2" />
                            {rider.phone}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="mr-2">{getVehicleIcon(rider.vehicleType)}</span>
                            {rider.vehicleType} - {rider.vehicleNumber}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2" />
                            {rider.currentLocation}
                          </div>
                        </div>
                      </div>

                      {/* Performance Stats */}
                      <div>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Package className="h-4 w-4 mr-2 text-blue-600" />
                            <span className="font-medium">{rider.totalDeliveries}</span>
                            <span className="text-gray-600 ml-1">total</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-2 text-green-600" />
                            <span className="font-medium">{rider.completedToday}</span>
                            <span className="text-gray-600 ml-1">today</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <TrendingUp className="h-4 w-4 mr-2 text-purple-600" />
                            <span className="font-medium">{rider.onTimeRate}%</span>
                            <span className="text-gray-600 ml-1">on-time</span>
                          </div>
                        </div>
                      </div>

                      {/* Rating & Active Orders */}
                      <div>
                        <div className="flex items-center space-x-1 mb-2">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold">{rider.averageRating}</span>
                          <span className="text-gray-600 text-sm">rating</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          <strong>Active Orders:</strong> {rider.activeOrders}
                        </p>
                      </div>

                      {/* Earnings */}
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          <strong>This Month:</strong> ৳{rider.monthlyEarnings.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Total:</strong> ৳{rider.totalEarnings.toLocaleString()}
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
                              Assign Order
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Navigation className="h-4 w-4 mr-2" />
                              Track Location
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <TrendingUp className="h-4 w-4 mr-2" />
                              View Performance
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Clock className="h-4 w-4 mr-2" />
                              Schedule Management
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