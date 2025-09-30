"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  Star,
  CreditCard,
  MapPin,
  User
} from "lucide-react";
import Link from "next/link";

export default function CustomerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/login");
      return;
    }
    
    // Redirect based on role
    if (session.user.role === "ADMIN") {
      router.push("/admin");
      return;
    }
    
    if (session.user.role === "RIDER") {
      router.push("/rider");
      return;
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!session || session.user.role !== "CUSTOMER") {
    return null;
  }

  // Mock data - replace with actual API calls
  const recentOrders = [
    {
      id: "DL240101001",
      status: "DELIVERED",
      items: "5 shirts, 3 pants",
      totalAmount: 450,
      deliveredAt: "2024-12-28",
    },
    {
      id: "DL240101002",
      status: "IN_PROGRESS",
      items: "2 dresses, 1 jacket",
      totalAmount: 650,
      pickupAt: "2024-12-29",
    },
  ];

  const stats = {
    totalOrders: 12,
    activeOrders: 2,
    totalSpent: 5400,
    loyaltyPoints: 540,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {session.user.name}!
              </h1>
              <p className="text-gray-600">
                Manage your laundry orders and track your history
              </p>
            </div>
            <Button size="lg" asChild>
              <Link href="/order/new">
                <Plus className="mr-2 h-5 w-5" />
                New Order
              </Link>
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Package className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{stats.totalOrders}</p>
                    <p className="text-sm text-gray-600">Total Orders</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-8 w-8 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold">{stats.activeOrders}</p>
                    <p className="text-sm text-gray-600">Active Orders</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">৳{stats.totalSpent}</p>
                    <p className="text-sm text-gray-600">Total Spent</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Star className="h-8 w-8 text-yellow-600" />
                  <div>
                    <p className="text-2xl font-bold">{stats.loyaltyPoints}</p>
                    <p className="text-sm text-gray-600">Loyalty Points</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Orders */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Recent Orders</CardTitle>
                      <CardDescription>
                        Your latest laundry orders and their status
                      </CardDescription>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href="/orders">View All</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium">{order.id}</span>
                            <Badge
                              variant={
                                order.status === "DELIVERED"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {order.status.replace("_", " ")}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {order.items}
                          </p>
                          <p className="text-sm font-medium">
                            ৳{order.totalAmount}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            {order.status === "DELIVERED" ? "Delivered" : "Pickup"}
                          </p>
                          <p className="text-sm font-medium">
                            {order.deliveredAt || order.pickupAt}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" asChild>
                    <Link href="/order/new">
                      <Plus className="mr-2 h-4 w-4" />
                      Place New Order
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/orders/track">
                      <Truck className="mr-2 h-4 w-4" />
                      Track Order
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/profile/addresses">
                      <MapPin className="mr-2 h-4 w-4" />
                      Manage Addresses
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Update Profile
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Loyalty Points */}
              <Card>
                <CardHeader>
                  <CardTitle>Loyalty Rewards</CardTitle>
                  <CardDescription>
                    Earn points with every order
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Current Points</span>
                      <span className="font-bold text-yellow-600">
                        {stats.loyaltyPoints}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-600 h-2 rounded-full"
                        style={{ width: `${(stats.loyaltyPoints % 1000) / 10}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600">
                      {1000 - (stats.loyaltyPoints % 1000)} points to next reward
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      View Rewards
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}