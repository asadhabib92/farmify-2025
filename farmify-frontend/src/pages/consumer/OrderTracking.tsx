
import React, { useState } from 'react';
import ConsumerLayout from '@/components/layouts/ConsumerLayout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Package, 
  Truck, 
  Home, 
  CheckCircle2, 
  Calendar, 
  Search,
  MessageSquare,
  Download,
  Filter,
  Eye
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const OrderTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Mock data for orders
  const orders = [
    {
      id: "ORD-2023-001",
      date: "2023-04-01",
      farmer: "Green Valley Farms",
      items: [
        { name: "Organic Tomatoes", quantity: 2, price: 50.00 },
        { name: "Fresh Carrots", quantity: 1, price: 25.00 }
      ],
      total: 125.00,
      status: "Delivered",
      deliveryDate: "2023-04-03",
      paymentMethod: "UPI",
      paymentStatus: "Paid",
      trackingSteps: [
        { title: "Order Placed", date: "2023-04-01, 10:30 AM", completed: true },
        { title: "Order Confirmed", date: "2023-04-01, 11:45 AM", completed: true },
        { title: "Processing", date: "2023-04-01, 2:15 PM", completed: true },
        { title: "Shipped", date: "2023-04-02, 9:30 AM", completed: true },
        { title: "Out for Delivery", date: "2023-04-03, 8:45 AM", completed: true },
        { title: "Delivered", date: "2023-04-03, 2:30 PM", completed: true }
      ]
    },
    {
      id: "ORD-2023-002",
      date: "2023-03-28",
      farmer: "Sunny Side Poultry",
      items: [
        { name: "Farm Fresh Eggs", quantity: 2, price: 60.00 },
        { name: "Organic Milk", quantity: 1, price: 35.00 }
      ],
      total: 155.00,
      status: "Out for Delivery",
      deliveryDate: "2023-03-30",
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Pending",
      trackingSteps: [
        { title: "Order Placed", date: "2023-03-28, 3:22 PM", completed: true },
        { title: "Order Confirmed", date: "2023-03-28, 4:30 PM", completed: true },
        { title: "Processing", date: "2023-03-29, 10:15 AM", completed: true },
        { title: "Shipped", date: "2023-03-29, 3:45 PM", completed: true },
        { title: "Out for Delivery", date: "2023-03-30, 9:20 AM", completed: true },
        { title: "Delivered", date: "Expected by 6:00 PM", completed: false }
      ]
    },
    {
      id: "ORD-2023-003",
      date: "2023-03-25",
      farmer: "Green Leaf Farms",
      items: [
        { name: "Organic Baby Spinach", quantity: 3, price: 60.00 },
        { name: "Bell Peppers Mix", quantity: 1, price: 90.00 }
      ],
      total: 270.00,
      status: "Delivered",
      deliveryDate: "2023-03-27",
      paymentMethod: "UPI",
      paymentStatus: "Paid",
      trackingSteps: [
        { title: "Order Placed", date: "2023-03-25, 11:10 AM", completed: true },
        { title: "Order Confirmed", date: "2023-03-25, 12:30 PM", completed: true },
        { title: "Processing", date: "2023-03-26, 9:45 AM", completed: true },
        { title: "Shipped", date: "2023-03-26, 2:15 PM", completed: true },
        { title: "Out for Delivery", date: "2023-03-27, 8:30 AM", completed: true },
        { title: "Delivered", date: "2023-03-27, 1:45 PM", completed: true }
      ]
    },
    {
      id: "ORD-2023-004",
      date: "2023-03-22",
      farmer: "Sweet Fields Apiary",
      items: [
        { name: "Organic Honey", quantity: 1, price: 350.00 }
      ],
      total: 350.00,
      status: "Processing",
      deliveryDate: "2023-03-24",
      paymentMethod: "Credit Card",
      paymentStatus: "Paid",
      trackingSteps: [
        { title: "Order Placed", date: "2023-03-22, 5:40 PM", completed: true },
        { title: "Order Confirmed", date: "2023-03-22, 6:15 PM", completed: true },
        { title: "Processing", date: "2023-03-23, 10:30 AM", completed: true },
        { title: "Shipped", date: "Expected today", completed: false },
        { title: "Out for Delivery", date: "Pending", completed: false },
        { title: "Delivered", date: "Pending", completed: false }
      ]
    },
    {
      id: "ORD-2023-005",
      date: "2023-03-20",
      farmer: "Root Harvest Co.",
      items: [
        { name: "Fresh Carrots", quantity: 2, price: 35.00 },
        { name: "Organic Potatoes", quantity: 3, price: 40.00 }
      ],
      total: 190.00,
      status: "Cancelled",
      deliveryDate: "Cancelled",
      paymentMethod: "UPI",
      paymentStatus: "Refunded",
      trackingSteps: [
        { title: "Order Placed", date: "2023-03-20, 9:15 AM", completed: true },
        { title: "Order Confirmed", date: "2023-03-20, 10:30 AM", completed: true },
        { title: "Cancelled", date: "2023-03-20, 2:45 PM", completed: true },
        { title: "Refund Initiated", date: "2023-03-20, 3:30 PM", completed: true },
        { title: "Refund Completed", date: "2023-03-21, 11:20 AM", completed: true }
      ]
    }
  ];
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-amber-100 text-amber-800';
      case 'Out for Delivery': return 'bg-purple-100 text-purple-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getTrackingIcon = (step) => {
    switch(step.title) {
      case 'Order Placed': return <Calendar className={`h-6 w-6 ${step.completed ? 'text-farmify-green' : 'text-muted-foreground'}`} />;
      case 'Order Confirmed': return <CheckCircle2 className={`h-6 w-6 ${step.completed ? 'text-farmify-green' : 'text-muted-foreground'}`} />;
      case 'Processing': return <Package className={`h-6 w-6 ${step.completed ? 'text-farmify-green' : 'text-muted-foreground'}`} />;
      case 'Shipped': return <Truck className={`h-6 w-6 ${step.completed ? 'text-farmify-green' : 'text-muted-foreground'}`} />;
      case 'Out for Delivery': return <Truck className={`h-6 w-6 ${step.completed ? 'text-farmify-green' : 'text-muted-foreground'}`} />;
      case 'Delivered': return <Home className={`h-6 w-6 ${step.completed ? 'text-farmify-green' : 'text-muted-foreground'}`} />;
      case 'Cancelled': return <CheckCircle2 className={`h-6 w-6 ${step.completed ? 'text-red-500' : 'text-muted-foreground'}`} />;
      case 'Refund Initiated': return <CheckCircle2 className={`h-6 w-6 ${step.completed ? 'text-amber-500' : 'text-muted-foreground'}`} />;
      case 'Refund Completed': return <CheckCircle2 className={`h-6 w-6 ${step.completed ? 'text-green-500' : 'text-muted-foreground'}`} />;
      default: return <CheckCircle2 className={`h-6 w-6 ${step.completed ? 'text-farmify-green' : 'text-muted-foreground'}`} />;
    }
  };
  
  // Filter orders based on search term
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.farmer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <ConsumerLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Order Tracking</h1>
        
        <Tabs defaultValue="all">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <div className="relative w-[250px]">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search orders..." 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select defaultValue="all-time">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-time">All Time</SelectItem>
                  <SelectItem value="last-week">Last Week</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <TabsContent value="all" className="mt-6">
            {selectedOrder ? (
              <div className="space-y-6">
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedOrder(null)}
                  className="px-0 hover:bg-transparent hover:text-farmify-green"
                >
                  ← Back to All Orders
                </Button>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedOrder.id}</h2>
                    <p className="text-muted-foreground">Ordered on {selectedOrder.date} from {selectedOrder.farmer}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" /> Contact Farmer
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Download className="h-4 w-4" /> Invoice
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Order Status</CardTitle>
                        <CardDescription>Current status: <Badge className={getStatusColor(selectedOrder.status)}>{selectedOrder.status}</Badge></CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="relative">
                          {/* Progress line */}
                          <div className="absolute left-6 top-6 h-[calc(100%-48px)] w-0.5 bg-gray-200"></div>
                          
                          {/* Tracking steps */}
                          <div className="space-y-8">
                            {selectedOrder.trackingSteps.map((step, index) => (
                              <div key={index} className="flex items-start relative">
                                <div className={`mr-4 bg-white rounded-full p-1 ${step.completed ? 'text-farmify-green' : 'text-muted-foreground'}`}>
                                  {getTrackingIcon(step)}
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium">{step.title}</p>
                                  <p className="text-sm text-muted-foreground">{step.date}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Order Items</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Item</TableHead>
                              <TableHead>Quantity</TableHead>
                              <TableHead>Price</TableHead>
                              <TableHead>Total</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedOrder.items.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>₹{item.price.toFixed(2)}</TableCell>
                                <TableCell>₹{(item.quantity * item.price).toFixed(2)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <div className="space-y-1 text-right">
                          <p className="text-sm text-muted-foreground">Subtotal: ₹{selectedOrder.total.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">Delivery: ₹0.00</p>
                          <p className="font-medium">Order Total: ₹{selectedOrder.total.toFixed(2)}</p>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                  
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Delivery Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Delivery Date</p>
                          <p className="font-medium">{selectedOrder.deliveryDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Delivery Address</p>
                          <p className="font-medium">123 Main Street, Apartment 4B</p>
                          <p>Mumbai, Maharashtra 400001</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Payment Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Payment Method</p>
                          <p className="font-medium">{selectedOrder.paymentMethod}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Payment Status</p>
                          <Badge className={
                            selectedOrder.paymentStatus === "Paid" ? "bg-green-100 text-green-800" : 
                            selectedOrder.paymentStatus === "Pending" ? "bg-amber-100 text-amber-800" : 
                            "bg-blue-100 text-blue-800"
                          }>
                            {selectedOrder.paymentStatus}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {selectedOrder.status === "Delivered" && (
                      <Button className="w-full">Write a Review</Button>
                    )}
                    
                    {selectedOrder.status !== "Cancelled" && selectedOrder.status !== "Delivered" && (
                      <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
                        Cancel Order
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Farmer</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-10">
                            <div className="flex flex-col items-center justify-center">
                              <Package className="h-10 w-10 text-muted-foreground mb-2" />
                              <h3 className="font-medium">No orders found</h3>
                              <p className="text-sm text-muted-foreground">Try searching with a different term</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.farmer}</TableCell>
                            <TableCell>₹{order.total.toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{order.paymentStatus}</TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setSelectedOrder(order)}
                                className="flex items-center gap-1"
                              >
                                <Eye className="h-4 w-4" /> View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="processing" className="mt-6">
            {/* Similar table but filtered for processing orders */}
          </TabsContent>
          
          <TabsContent value="shipped" className="mt-6">
            {/* Similar table but filtered for shipped orders */}
          </TabsContent>
          
          <TabsContent value="delivered" className="mt-6">
            {/* Similar table but filtered for delivered orders */}
          </TabsContent>
        </Tabs>
      </div>
    </ConsumerLayout>
  );
};

export default OrderTracking;
