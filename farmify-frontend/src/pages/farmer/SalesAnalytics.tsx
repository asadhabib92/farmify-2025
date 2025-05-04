
import React from 'react';
import FarmerLayout from '@/components/layouts/FarmerLayout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';
import { 
  ArrowUp, 
  ArrowDown, 
  TrendingUp, 
  Calendar,
  DollarSign,
  ShoppingCart,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';

const SalesAnalytics = () => {
  // Mock data for charts
  const dailySalesData = [
    { date: '1 Apr', sales: 1200 },
    { date: '2 Apr', sales: 1800 },
    { date: '3 Apr', sales: 1400 },
    { date: '4 Apr', sales: 2200 },
    { date: '5 Apr', sales: 1900 },
    { date: '6 Apr', sales: 2400 },
    { date: '7 Apr', sales: 2100 },
  ];
  
  const monthlySalesData = [
    { month: 'Jan', sales: 12500 },
    { month: 'Feb', sales: 15800 },
    { month: 'Mar', sales: 18400 },
    { month: 'Apr', sales: 11200 },
    { month: 'May', sales: 19000 },
    { month: 'Jun', sales: 21400 },
    { month: 'Jul', sales: 22100 },
    { month: 'Aug', sales: 20500 },
    { month: 'Sep', sales: 23400 },
    { month: 'Oct', sales: 19800 },
    { month: 'Nov', sales: 22300 },
    { month: 'Dec', sales: 25000 },
  ];
  
  const productPerformance = [
    { name: 'Organic Tomatoes', sales: 3200, percentage: 22 },
    { name: 'Farm Fresh Eggs', sales: 2800, percentage: 19 },
    { name: 'Organic Apples', sales: 2100, percentage: 15 },
    { name: 'Fresh Carrots', sales: 1800, percentage: 13 },
    { name: 'Organic Potatoes', sales: 1500, percentage: 10 },
    { name: 'Others', sales: 3100, percentage: 21 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28BFF', '#FF6B6B'];
  
  return (
    <FarmerLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Sales Analytics</h1>
          
          <div className="flex items-center gap-2">
            <Select defaultValue="last7days">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last7days">Last 7 Days</SelectItem>
                <SelectItem value="last30days">Last 30 Days</SelectItem>
                <SelectItem value="thismonth">This Month</SelectItem>
                <SelectItem value="lastmonth">Last Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹12,457</div>
              <div className="flex items-center text-xs text-green-500 mt-1">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>+18.2% from previous period</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">84</div>
              <div className="flex items-center text-xs text-green-500 mt-1">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>+12.5% from previous period</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <div className="flex items-center text-xs text-red-500 mt-1">
                <ArrowDown className="h-4 w-4 mr-1" />
                <span>-5.8% from previous period</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="daily">
          <TabsList className="mb-4">
            <TabsTrigger value="daily">Daily Sales</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Sales</TabsTrigger>
            <TabsTrigger value="products">Product Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily">
            <Card>
              <CardHeader>
                <CardTitle>Daily Sales Trend</CardTitle>
                <CardDescription>
                  View your daily sales performance over the last 7 days
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={dailySalesData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${value}`, 'Sales']} />
                      <Area type="monotone" dataKey="sales" stroke="#10b981" fill="#10b98120" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Sales Overview</CardTitle>
                <CardDescription>
                  View your sales performance throughout the year
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlySalesData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${value}`, 'Sales']} />
                      <Bar dataKey="sales" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="products">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Products by Sales</CardTitle>
                  <CardDescription>
                    See which products are performing best
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={productPerformance}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="percentage"
                          label={({ name, percentage }) => `${name}: ${percentage}%`}
                        >
                          {productPerformance.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip formatter={(value, name, props) => [`${value}%`, props.payload.name]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Product Sales Breakdown</CardTitle>
                  <CardDescription>
                    Detailed view of sales by product
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {productPerformance.map((product, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{product.name}</span>
                          <span className="text-muted-foreground">₹{product.sales}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-farmify-green h-2.5 rounded-full" 
                            style={{ width: `${product.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground">{product.percentage}% of total sales</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </FarmerLayout>
  );
};

export default SalesAnalytics;
