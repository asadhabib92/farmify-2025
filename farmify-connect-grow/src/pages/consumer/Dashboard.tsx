
import React from 'react';
import ConsumerLayout from '@/components/layouts/ConsumerLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Package, Clock, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const ConsumerDashboard = () => {
  const recentOrders = [
    { 
      id: "ORD-007", 
      date: "2023-10-15", 
      farmer: "Ramesh Farms", 
      items: ["Organic Tomatoes", "Fresh Spinach"], 
      total: "₹450", 
      status: "Delivered" 
    },
    { 
      id: "ORD-012", 
      date: "2023-10-20", 
      farmer: "Green Valley Organics", 
      items: ["Brown Rice", "Raw Honey"], 
      total: "₹850", 
      status: "In Transit" 
    },
    { 
      id: "ORD-015", 
      date: "2023-10-25", 
      farmer: "Sunshine Farms", 
      items: ["Alphonso Mangoes", "Coconut"], 
      total: "₹600", 
      status: "Processing" 
    }
  ];

  const nearbyFarmers = [
    { name: "Ramesh Farms", distance: "2.5 km", rating: 4.8, products: 25 },
    { name: "Green Valley Organics", distance: "3.2 km", rating: 4.5, products: 18 },
    { name: "Sunshine Farms", distance: "4.1 km", rating: 4.7, products: 30 },
    { name: "Happy Harvest", distance: "5.5 km", rating: 4.6, products: 22 }
  ];

  return (
    <ConsumerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Consumer Dashboard</h1>
            <p className="text-gray-500">Welcome back! Find fresh produce from local farmers.</p>
          </div>
          <Link to="/consumer/products">
            <Button className="bg-farmify-green hover:bg-farmify-green-dark">Browse Products</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
              <ShoppingCart className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recentOrders.length}</div>
              <p className="text-xs text-gray-500">In the last 30 days</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Deliveries</CardTitle>
              <Package className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-gray-500">Expected today</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Saved Farmers</CardTitle>
              <MapPin className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-gray-500">Within 5km radius</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="border-b pb-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-gray-500">{order.date} • {order.farmer}</p>
                      </div>
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === "Delivered" 
                            ? "bg-green-100 text-green-800" 
                            : order.status === "In Transit"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">{order.items.join(", ")}</p>
                      <div className="flex justify-between mt-1">
                        <p className="text-sm font-semibold">{order.total}</p>
                        <Link to={`/consumer/orders`} className="text-xs text-farmify-green hover:underline">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Link to="/consumer/orders">
                  <Button variant="outline" className="w-full">View All Orders</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Farmers Near You</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nearbyFarmers.map((farmer, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-semibold">{farmer.name}</p>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                        <p className="text-xs text-gray-500">{farmer.distance}</p>
                        <span className="mx-2 text-gray-300">|</span>
                        <div className="flex text-yellow-400 text-xs">
                          {'★'.repeat(Math.round(farmer.rating))}
                        </div>
                        <span className="ml-1 text-xs text-gray-500">{farmer.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{farmer.products} products available</p>
                    </div>
                    <Link to={`/consumer/products?farmer=${farmer.name}`}>
                      <Button size="sm" variant="outline">View Products</Button>
                    </Link>
                  </div>
                ))}
                
                <Link to="/consumer/search?type=farmer">
                  <Button variant="outline" className="w-full">Find More Farmers</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Recommended for You</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                { name: "Organic Tomatoes", price: "₹40/kg", farmer: "Ramesh Farms" },
                { name: "Fresh Spinach", price: "₹30/kg", farmer: "Green Valley Organics" },
                { name: "Brown Rice", price: "₹60/kg", farmer: "Sunshine Farms" },
                { name: "Alphonso Mangoes", price: "₹250/dozen", farmer: "Happy Harvest" },
                { name: "Raw Honey", price: "₹350/bottle", farmer: "Green Valley Organics" }
              ].map((product, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className="h-32 bg-gray-100 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-farmify-green bg-opacity-20 flex items-center justify-center text-farmify-green">
                      Product
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold truncate">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.price}</p>
                    <p className="text-xs text-gray-400">{product.farmer}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <Link to="/consumer/products">
                <Button variant="outline" className="w-full">View All Products</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </ConsumerLayout>
  );
};

export default ConsumerDashboard;
