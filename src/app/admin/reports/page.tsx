"use client";

import { AdminLayout } from "@/components/admin/admin-layout";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Package,
  Truck,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  Target
} from "lucide-react";

export default function AdminReports() {
  // Mock data - replace with actual API calls
  const monthlyRevenue = [
    { month: "Jan", revenue: 45000, orders: 380 },
    { month: "Feb", revenue: 52000, orders: 420 },
    { month: "Mar", revenue: 48000, orders: 395 },
    { month: "Apr", revenue: 61000, orders: 480 },
    { month: "May", revenue: 55000, orders: 445 },
    { month: "Jun", revenue: 67000, orders: 520 },
  ];

  const serviceBreakdown = [
    { service: "Wash & Fold", revenue: 180000, percentage: 45, orders: 1200 },
    { service: "Dry Cleaning", revenue: 120000, percentage: 30, orders: 600 },
    { service: "Ironing", revenue: 80000, percentage: 20, orders: 800 },
    { service: "Pickup & Delivery", revenue: 20000, percentage: 5, orders: 400 },
  ];

  const topCustomers = [
    { name: "John Doe", orders: 24, revenue: 2400, type: "Premium" },
    { name: "Jane Smith", orders: 18, revenue: 1980, type: "Regular" },
    { name: "Mike Johnson", orders: 16, revenue: 1760, type: "Premium" },
    { name: "Sarah Wilson", orders: 15, revenue: 1650, type: "Regular" },
    { name: "David Brown", orders: 12, revenue: 1320, type: "Premium" },
  ];

  const riderPerformance = [
    { name: "Ahmed Hassan", deliveries: 156, rating: 4.9, earnings: 15600 },
    { name: "Karim Rahman", deliveries: 142, rating: 4.8, earnings: 14200 },
    { name: "Rahim Uddin", deliveries: 138, rating: 4.7, earnings: 13800 },
    { name: "Nasir Ali", deliveries: 125, rating: 4.6, earnings: 12500 },
  ];

  const kpiMetrics = [
    {
      title: "Total Revenue",
      value: "৳420,000",
      change: "+15.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Total Orders",
      value: "2,847",
      change: "+8.1%",
      trend: "up",
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Active Customers",
      value: "1,234",
      change: "+12.3%",
      trend: "up",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Avg. Order Value",
      value: "৳147",
      change: "-2.1%",
      trend: "down",
      icon: Target,
      color: "text-orange-600"
    },
  ];

  return (
    <AdminLayout>
      <Container>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="text-gray-600">Comprehensive business insights and performance metrics</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* KPI Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiMetrics.map((metric, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{metric.title}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className={`text-xs flex items-center mt-1 ${
                        metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.trend === 'up' ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {metric.change} from last month
                      </p>
                    </div>
                    <metric.icon className={`h-8 w-8 ${metric.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <LineChart className="h-5 w-5 mr-2 text-blue-600" />
                      Monthly Revenue Trend
                    </CardTitle>
                    <CardDescription>Revenue and order count over the last 6 months</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyRevenue.map((month, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 text-sm font-medium">{month.month}</div>
                        <div className="flex-1">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(month.revenue / 70000) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">৳{month.revenue.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">{month.orders} orders</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Service Breakdown */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <PieChart className="h-5 w-5 mr-2 text-green-600" />
                      Service Revenue Breakdown
                    </CardTitle>
                    <CardDescription>Revenue distribution by service type</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serviceBreakdown.map((service, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{service.service}</span>
                        <span className="text-sm text-gray-600">{service.percentage}%</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              index === 0 ? 'bg-blue-600' :
                              index === 1 ? 'bg-green-600' :
                              index === 2 ? 'bg-yellow-600' : 'bg-purple-600'
                            }`}
                            style={{ width: `${service.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">৳{service.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Data Tables Row */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Top Customers */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-purple-600" />
                      Top Customers
                    </CardTitle>
                    <CardDescription>Highest value customers this month</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCustomers.map((customer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <div className="flex items-center space-x-2">
                            <Badge variant={customer.type === 'Premium' ? 'default' : 'secondary'}>
                              {customer.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">৳{customer.revenue.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{customer.orders} orders</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rider Performance */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Truck className="h-5 w-5 mr-2 text-orange-600" />
                      Rider Performance
                    </CardTitle>
                    <CardDescription>Top performing delivery riders</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riderPerformance.map((rider, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm font-medium text-orange-600">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{rider.name}</p>
                          <p className="text-sm text-gray-500">Rating: {rider.rating}/5.0</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">৳{rider.earnings.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{rider.deliveries} deliveries</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-indigo-600" />
                Business Summary
              </CardTitle>
              <CardDescription>Key insights and recommendations for business growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">94%</div>
                  <div className="text-sm text-gray-600">Customer Satisfaction</div>
                  <div className="text-xs text-green-600 mt-1">↑ 2% from last month</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">23min</div>
                  <div className="text-sm text-gray-600">Avg. Pickup Time</div>
                  <div className="text-xs text-blue-600 mt-1">↓ 5min improvement</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">8.2%</div>
                  <div className="text-sm text-gray-600">Monthly Growth Rate</div>
                  <div className="text-xs text-purple-600 mt-1">↑ 1.2% increase</div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Key Insights</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Peak order times: 6-8 PM on weekdays, 10 AM-2 PM on weekends</li>
                  <li>• Dry cleaning services showing 25% growth month-over-month</li>
                  <li>• Customer retention rate improved by 12% with loyalty program</li>
                  <li>• Mobile app orders account for 68% of total bookings</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </AdminLayout>
  );
}