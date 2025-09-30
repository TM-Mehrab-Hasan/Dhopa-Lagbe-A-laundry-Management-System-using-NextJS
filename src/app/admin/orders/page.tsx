"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  MoreHorizontal,
  Calendar,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Mock data - replace with actual API calls
  const orders = [
    {
      id: "DL250101001",
      orderNumber: "DL250101001",
      customer: {
        name: "John Doe",
        email: "john@example.com",
        phone: "+880 1234-567890"
      },
      status: "PICKED_UP",
      items: [
        { type: "Shirt", quantity: 3, service: "Wash & Fold" },
        { type: "Pants", quantity: 2, service: "Wash & Fold" }
      ],
      totalItems: 5,
      totalAmount: 450,
      pickupDate: "2025-01-01",
      deliveryDate: "2025-01-03",
      pickupAddress: "123 Main St, Dhaka",
      deliveryAddress: "123 Main St, Dhaka",
      rider: "Ahmed Hassan",
      paymentStatus: "PAID",
      createdAt: "2025-01-01T10:30:00Z",
      updatedAt: "2025-01-01T14:20:00Z"
    },
    {
      id: "DL250101002",
      orderNumber: "DL250101002",
      customer: {
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+880 1234-567891"
      },
      status: "IN_PROGRESS",
      items: [
        { type: "Dress", quantity: 2, service: "Dry Cleaning" },
        { type: "Jacket", quantity: 1, service: "Dry Cleaning" }
      ],
      totalItems: 3,
      totalAmount: 720,
      pickupDate: "2025-01-01",
      deliveryDate: "2025-01-04",
      pickupAddress: "456 Oak Ave, Dhaka",
      deliveryAddress: "456 Oak Ave, Dhaka",
      rider: "Karim Rahman",
      paymentStatus: "PENDING",
      createdAt: "2025-01-01T09:15:00Z",
      updatedAt: "2025-01-01T15:45:00Z"
    },
    {
      id: "DL250101003",
      orderNumber: "DL250101003",
      customer: {
        name: "Mike Johnson",
        email: "mike@example.com",
        phone: "+880 1234-567892"
      },
      status: "READY",
      items: [
        { type: "Shirt", quantity: 5, service: "Wash & Fold" },
        { type: "T-Shirt", quantity: 3, service: "Wash & Fold" }
      ],
      totalItems: 8,
      totalAmount: 280,
      pickupDate: "2024-12-30",
      deliveryDate: "2025-01-02",
      pickupAddress: "789 Pine St, Dhaka",
      deliveryAddress: "789 Pine St, Dhaka",
      rider: "Rafiq Ahmed",
      paymentStatus: "PAID",
      createdAt: "2024-12-30T08:45:00Z",
      updatedAt: "2025-01-01T16:30:00Z"
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: "bg-yellow-100 text-yellow-800",
      CONFIRMED: "bg-blue-100 text-blue-800",
      PICKED_UP: "bg-purple-100 text-purple-800",
      IN_PROGRESS: "bg-orange-100 text-orange-800",
      READY: "bg-cyan-100 text-cyan-800",
      OUT_FOR_DELIVERY: "bg-indigo-100 text-indigo-800",
      DELIVERED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getPaymentStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: "bg-yellow-100 text-yellow-800",
      PAID: "bg-green-100 text-green-800",
      FAILED: "bg-red-100 text-red-800",
      REFUNDED: "bg-blue-100 text-blue-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status: string) => {
    const icons: Record<string, React.ReactElement> = {
      PENDING: <Clock className="h-4 w-4" />,
      CONFIRMED: <CheckCircle className="h-4 w-4" />,
      PICKED_UP: <Truck className="h-4 w-4" />,
      IN_PROGRESS: <Package className="h-4 w-4" />,
      READY: <CheckCircle className="h-4 w-4" />,
      OUT_FOR_DELIVERY: <Truck className="h-4 w-4" />,
      DELIVERED: <CheckCircle className="h-4 w-4" />,
      CANCELLED: <XCircle className="h-4 w-4" />,
    };
    return icons[status] || <Package className="h-4 w-4" />;
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <Container>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
              <p className="text-gray-600">Manage and track all customer orders</p>
            </div>
            <Button>
              <Package className="mr-2 h-4 w-4" />
              Create Manual Order
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
                      placeholder="Search orders, customers, or order IDs..."
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
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                    <SelectItem value="PICKED_UP">Picked Up</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="READY">Ready</SelectItem>
                    <SelectItem value="OUT_FOR_DELIVERY">Out for Delivery</SelectItem>
                    <SelectItem value="DELIVERED">Delivered</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
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
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold">{orders.length}</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold">
                      {orders.filter(o => o.status === "IN_PROGRESS").length}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Ready for Delivery</p>
                    <p className="text-2xl font-bold">
                      {orders.filter(o => o.status === "READY").length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold">
                      ৳{orders.reduce((sum, order) => sum + order.totalAmount, 0).toLocaleString()}
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders Table */}
          <Card>
            <CardHeader>
              <CardTitle>Orders ({filteredOrders.length})</CardTitle>
              <CardDescription>
                {filteredOrders.length > 0 ? 
                  `Showing ${filteredOrders.length} of ${orders.length} orders` : 
                  "No orders found matching your criteria"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border rounded-lg p-6 hover:shadow-sm transition-shadow"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-start">
                      {/* Order Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-center space-x-2 mb-2">
                          {getStatusIcon(order.status)}
                          <span className="font-bold text-lg">{order.orderNumber}</span>
                        </div>
                        <p className="font-medium">{order.customer.name}</p>
                        <p className="text-sm text-gray-600">{order.customer.email}</p>
                        <p className="text-sm text-gray-600">{order.customer.phone}</p>
                      </div>

                      {/* Status & Payment */}
                      <div>
                        <div className="space-y-2">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.replace("_", " ")}
                          </Badge>
                          <br />
                          <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                            {order.paymentStatus}
                          </Badge>
                        </div>
                      </div>

                      {/* Items & Amount */}
                      <div>
                        <p className="font-medium">৳{order.totalAmount}</p>
                        <p className="text-sm text-gray-600">{order.totalItems} items</p>
                        <p className="text-sm text-gray-600">
                          {order.items.map(item => `${item.quantity}x ${item.type}`).join(", ")}
                        </p>
                      </div>

                      {/* Dates */}
                      <div>
                        <p className="text-sm text-gray-600">
                          <strong>Pickup:</strong> {order.pickupDate}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Delivery:</strong> {order.deliveryDate}
                        </p>
                        {order.rider && (
                          <p className="text-sm text-gray-600">
                            <strong>Rider:</strong> {order.rider}
                          </p>
                        )}
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
                              Edit Order
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Truck className="h-4 w-4 mr-2" />
                              Assign Rider
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Package className="h-4 w-4 mr-2" />
                              Update Status
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