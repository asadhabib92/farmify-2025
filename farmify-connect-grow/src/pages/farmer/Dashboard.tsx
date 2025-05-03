
import React from 'react';
import FarmerLayout from '@/components/layouts/FarmerLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Package, CreditCard, Star } from 'lucide-react';

const FarmerDashboard = () => {
  const stats = [
    {
      title: "Orders",
      value: "25",
      icon: ShoppingBag,
      change: "+5",
      changeType: "positive"
    },
    {
      title: "Products",
      value: "12",
      icon: Package,
      change: "+2",
      changeType: "positive"
    },
    {
      title: "Revenue",
      value: "₹25,430",
      icon: CreditCard,
      change: "+₹4,320",
      changeType: "positive"
    },
    {
      title: "Rating",
      value: "4.8/5",
      icon: Star,
      change: "+0.2",
      changeType: "positive"
    }
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "Amit Sharma", items: 3, total: "₹750", status: "Delivered" },
    { id: "ORD-002", customer: "Priya Patel", items: 2, total: "₹520", status: "Preparing" },
    { id: "ORD-003", customer: "Rohit Verma", items: 1, total: "₹150", status: "In Transit" },
    { id: "ORD-004", customer: "Neha Singh", items: 4, total: "₹1,200", status: "Preparing" },
    { id: "ORD-005", customer: "Vikram Khanna", items: 2, total: "₹350", status: "Delivered" }
  ];

  const lowStockItems = [
    { name: "Organic Tomatoes", stock: "2 kg", minStock: "5 kg" },
    { name: "Fresh Spinach", stock: "1.5 kg", minStock: "3 kg" },
    { name: "Brown Rice", stock: "5 kg", minStock: "10 kg" }
  ];

  return (
    <FarmerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Farmer Dashboard</h1>
          <p className="text-gray-500">Welcome back, Farmer! Here's an overview of your farm business.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs font-semibold text-gray-500">
                      <th className="pb-2">Order ID</th>
                      <th className="pb-2">Customer</th>
                      <th className="pb-2">Items</th>
                      <th className="pb-2">Total</th>
                      <th className="pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="py-3 text-sm">{order.id}</td>
                        <td className="py-3 text-sm">{order.customer}</td>
                        <td className="py-3 text-sm">{order.items}</td>
                        <td className="py-3 text-sm">{order.total}</td>
                        <td className="py-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            order.status === "Delivered" 
                              ? "bg-green-100 text-green-800" 
                              : order.status === "In Transit"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Low Stock Alert</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lowStockItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-red-500">Current: {item.stock} (Min: {item.minStock})</p>
                      </div>
                      <button className="px-3 py-1 bg-farmify-green text-white rounded-md text-sm">
                        Restock
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {'★★★★★'.split('').map((star, i) => (
                          <span key={i}>{star}</span>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">2 days ago</span>
                    </div>
                    <p className="mt-1 text-sm">The tomatoes were so fresh and tasty! Will order again.</p>
                    <p className="mt-1 text-xs text-gray-500">- Amit S.</p>
                  </div>
                  
                  <div className="border-b pb-2">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {'★★★★☆'.split('').map((star, i) => (
                          <span key={i}>{star}</span>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">1 week ago</span>
                    </div>
                    <p className="mt-1 text-sm">Great quality produce, but delivery was a bit late.</p>
                    <p className="mt-1 text-xs text-gray-500">- Neha R.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </FarmerLayout>
  );
};

export default FarmerDashboard;
