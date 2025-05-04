
import React, { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart, LineChart, PieChart, ResponsiveContainer, Bar, XAxis, YAxis, Tooltip, Legend, Line, Pie, Cell } from 'recharts';

// Sample data for analytics
const salesData = [
  { month: 'Jan', sales: 18500 },
  { month: 'Feb', sales: 22000 },
  { month: 'Mar', sales: 25000 },
  { month: 'Apr', sales: 21000 },
  { month: 'May', sales: 30000 },
  { month: 'Jun', sales: 28000 },
  { month: 'Jul', sales: 32000 },
  { month: 'Aug', sales: 37000 },
  { month: 'Sep', sales: 40000 },
  { month: 'Oct', sales: 45000 },
  { month: 'Nov', sales: 48000 },
  { month: 'Dec', sales: 52000 }
];

const userGrowthData = [
  { month: 'Jan', farmers: 120, consumers: 450 },
  { month: 'Feb', farmers: 150, consumers: 520 },
  { month: 'Mar', farmers: 180, consumers: 610 },
  { month: 'Apr', farmers: 210, consumers: 780 },
  { month: 'May', farmers: 250, consumers: 950 },
  { month: 'Jun', farmers: 290, consumers: 1100 },
  { month: 'Jul', farmers: 330, consumers: 1350 },
  { month: 'Aug', farmers: 380, consumers: 1600 },
  { month: 'Sep', farmers: 420, consumers: 1850 },
  { month: 'Oct', farmers: 470, consumers: 2100 },
  { month: 'Nov', farmers: 520, consumers: 2300 },
  { month: 'Dec', farmers: 580, consumers: 2600 }
];

const productCategoryData = [
  { name: 'Vegetables', value: 35 },
  { name: 'Fruits', value: 25 },
  { name: 'Grains', value: 20 },
  { name: 'Dairy & Honey', value: 15 },
  { name: 'Herbs & Spices', value: 5 }
];

const COLORS = ['#16a34a', '#fb923c', '#fbbf24', '#c026d3', '#0ea5e9'];

const revenueByStateData = [
  { state: 'Maharashtra', revenue: 12500000 },
  { state: 'Punjab', revenue: 9800000 },
  { state: 'Gujarat', revenue: 8200000 },
  { state: 'Karnataka', revenue: 7500000 },
  { state: 'Tamil Nadu', revenue: 6800000 },
  { state: 'Andhra Pradesh', revenue: 5500000 },
  { state: 'Uttar Pradesh', revenue: 4900000 },
  { state: 'Madhya Pradesh', revenue: 3700000 }
];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("yearly");
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-gray-500">Monitor platform metrics and performance</p>
          </div>
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,180</div>
              <p className="text-xs text-gray-500">
                <span className="text-green-500">+12.5%</span> from last month
              </p>
              <div className="text-xs text-gray-500 mt-1 flex">
                <span className="mr-2">Farmers: 580</span>
                <span>Consumers: 2,600</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹3.6 Cr</div>
              <p className="text-xs text-gray-500">
                <span className="text-green-500">+8.2%</span> from last month
              </p>
              <div className="text-xs text-gray-500 mt-1">
                Lifetime: ₹12.5 Cr
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,450</div>
              <p className="text-xs text-gray-500">
                <span className="text-green-500">+5.8%</span> from last month
              </p>
              <div className="text-xs text-gray-500 mt-1">
                Avg. Order Value: ₹2,890
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Products Listed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,875</div>
              <p className="text-xs text-gray-500">
                <span className="text-green-500">+3.2%</span> from last month
              </p>
              <div className="text-xs text-gray-500 mt-1">
                Across 5 categories
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="sales" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="regional">Regional</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>
                  Monthly sales over the past year
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `₹${value/1000}k`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Bar dataKey="sales" fill="#16a34a" name="Sales (₹)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                  <CardDescription>
                    Highest selling products
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Organic Tomatoes", sales: 524500, orders: 1450 },
                      { name: "Fresh Spinach", sales: 420800, orders: 1280 },
                      { name: "Brown Rice", sales: 385200, orders: 920 },
                      { name: "Alphonso Mangoes", sales: 350000, orders: 750 },
                      { name: "Raw Honey", sales: 325000, orders: 680 }
                    ].map((product, i) => (
                      <div key={i} className="flex items-center">
                        <div className="min-w-[24px] mr-2">{i + 1}</div>
                        <div className="flex-1">
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.orders} orders</div>
                        </div>
                        <div className="font-semibold">{formatCurrency(product.sales)}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Farmers</CardTitle>
                  <CardDescription>
                    Farmers with highest sales
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Ramesh Farms", sales: 854000, products: 25 },
                      { name: "Green Valley Organics", sales: 720000, products: 18 },
                      { name: "Sunshine Farms", sales: 650000, products: 30 },
                      { name: "Happy Harvest", sales: 580000, products: 22 },
                      { name: "Punjab Organics", sales: 495000, products: 15 }
                    ].map((farmer, i) => (
                      <div key={i} className="flex items-center">
                        <div className="min-w-[24px] mr-2">{i + 1}</div>
                        <div className="flex-1">
                          <div className="font-medium">{farmer.name}</div>
                          <div className="text-sm text-gray-500">{farmer.products} products</div>
                        </div>
                        <div className="font-semibold">{formatCurrency(farmer.sales)}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>
                  Farmer and consumer growth over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userGrowthData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="farmers" stroke="#16a34a" name="Farmers" />
                    <Line type="monotone" dataKey="consumers" stroke="#0ea5e9" name="Consumers" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Acquisition</CardTitle>
                  <CardDescription>
                    How users discover the platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie 
                        data={[
                          { name: 'Organic Search', value: 45 },
                          { name: 'Social Media', value: 25 },
                          { name: 'Direct', value: 15 },
                          { name: 'Referral', value: 10 },
                          { name: 'Other', value: 5 }
                        ]} 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {productCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                  <CardDescription>
                    Key engagement metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-sm font-medium">Average Session Duration</div>
                        <div className="text-sm font-semibold">8m 35s</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-farmify-green h-2 rounded-full w-[75%]"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-sm font-medium">Orders per User (Monthly)</div>
                        <div className="text-sm font-semibold">3.2</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-farmify-green h-2 rounded-full w-[65%]"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-sm font-medium">Repeat Purchase Rate</div>
                        <div className="text-sm font-semibold">68%</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-farmify-green h-2 rounded-full w-[68%]"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-sm font-medium">Review Submission Rate</div>
                        <div className="text-sm font-semibold">42%</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-farmify-green h-2 rounded-full w-[42%]"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-sm font-medium">App Install Conversion</div>
                        <div className="text-sm font-semibold">35%</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-farmify-green h-2 rounded-full w-[35%]"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="products" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Categories</CardTitle>
                  <CardDescription>
                    Distribution of products by category
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie 
                        data={productCategoryData} 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {productCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Product Performance</CardTitle>
                  <CardDescription>
                    Top vs bottom performing products
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-3">Top Performing</h4>
                      <div className="space-y-3">
                        {[
                          { name: "Organic Tomatoes", growth: "+28%" },
                          { name: "Fresh Spinach", growth: "+22%" },
                          { name: "Brown Rice", growth: "+19%" }
                        ].map((product, i) => (
                          <div key={i} className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs mr-2">
                              {i + 1}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{product.name}</div>
                            </div>
                            <div className="text-green-600 font-semibold">{product.growth}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-3">Needs Improvement</h4>
                      <div className="space-y-3">
                        {[
                          { name: "Yellow Lentils", growth: "-5%" },
                          { name: "Coconut Water", growth: "-3%" },
                          { name: "Jamun Fruit", growth: "-2%" }
                        ].map((product, i) => (
                          <div key={i} className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-red-100 text-red-800 flex items-center justify-center text-xs mr-2">
                              {i + 1}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{product.name}</div>
                            </div>
                            <div className="text-red-600 font-semibold">{product.growth}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Seasonal Product Trends</CardTitle>
                <CardDescription>
                  Product performance by season
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: 'Jan', vegetables: 35, fruits: 25, grains: 15, dairy: 10, herbs: 5 },
                      { month: 'Feb', vegetables: 38, fruits: 22, grains: 16, dairy: 10, herbs: 6 },
                      { month: 'Mar', vegetables: 40, fruits: 20, grains: 18, dairy: 11, herbs: 7 },
                      { month: 'Apr', vegetables: 45, fruits: 18, grains: 15, dairy: 12, herbs: 8 },
                      { month: 'May', vegetables: 48, fruits: 20, grains: 13, dairy: 10, herbs: 8 },
                      { month: 'Jun', vegetables: 43, fruits: 28, grains: 10, dairy: 9, herbs: 7 },
                      { month: 'Jul', vegetables: 40, fruits: 35, grains: 8, dairy: 8, herbs: 6 },
                      { month: 'Aug', vegetables: 38, fruits: 40, grains: 7, dairy: 9, herbs: 5 },
                      { month: 'Sep', vegetables: 35, fruits: 38, grains: 9, dairy: 10, herbs: 6 },
                      { month: 'Oct', vegetables: 33, fruits: 30, grains: 12, dairy: 12, herbs: 8 },
                      { month: 'Nov', vegetables: 32, fruits: 25, grains: 15, dairy: 13, herbs: 7 },
                      { month: 'Dec', vegetables: 30, fruits: 28, grains: 18, dairy: 12, herbs: 6 }
                    ]}
                  >
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Line type="monotone" dataKey="vegetables" stroke="#16a34a" name="Vegetables" />
                    <Line type="monotone" dataKey="fruits" stroke="#fb923c" name="Fruits" />
                    <Line type="monotone" dataKey="grains" stroke="#fbbf24" name="Grains" />
                    <Line type="monotone" dataKey="dairy" stroke="#0ea5e9" name="Dairy & Honey" />
                    <Line type="monotone" dataKey="herbs" stroke="#c026d3" name="Herbs & Spices" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="regional" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by State</CardTitle>
                <CardDescription>
                  Distribution of revenue across different states
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueByStateData} layout="vertical">
                    <XAxis type="number" tickFormatter={(value) => `₹${value/1000000}M`} />
                    <YAxis dataKey="state" type="category" width={100} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#16a34a" name="Revenue (₹)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Farmer Distribution</CardTitle>
                  <CardDescription>
                    Number of farmers by region
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie 
                        data={[
                          { name: 'North India', value: 30 },
                          { name: 'South India', value: 25 },
                          { name: 'West India', value: 28 },
                          { name: 'East India', value: 12 },
                          { name: 'Central India', value: 5 }
                        ]} 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {productCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Regional Growth</CardTitle>
                  <CardDescription>
                    Year-over-year growth by region
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { region: "Maharashtra", growth: 28, users: 580 },
                      { region: "Karnataka", growth: 25, users: 420 },
                      { region: "Punjab", growth: 22, users: 350 },
                      { region: "Gujarat", growth: 20, users: 310 },
                      { region: "Tamil Nadu", growth: 18, users: 280 },
                      { region: "Andhra Pradesh", growth: 15, users: 240 },
                      { region: "Uttar Pradesh", growth: 12, users: 210 },
                      { region: "Madhya Pradesh", growth: 10, users: 180 }
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            <span className="text-sm font-medium">{item.region}</span>
                            <span className="text-xs text-gray-500 ml-2">({item.users} users)</span>
                          </div>
                          <div className="text-sm font-semibold text-green-600">+{item.growth}%</div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-farmify-green h-2 rounded-full" 
                            style={{ width: `${(item.growth / 30) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Analytics;
