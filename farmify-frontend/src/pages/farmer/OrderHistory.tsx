
import React, { useEffect, useState } from 'react';
import FarmerLayout from '@/components/layouts/FarmerLayout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Badge
} from '@/components/ui/badge';
import {
  Eye,
  Package,
  Printer,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function loadData() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/farmer/order-history', {
          headers: {
            Authorization: `Bearer ${token}`, // Make sure the token is correct
          }
        });
        console.log(response.data);
        setOrders(response.data.data)
        console.log(orders)
      } catch (error) {
        console.log(error)
      }
    }
    loadData();
  }, []);
  // Mock data for orders
  // const orders = [
  //   {
  //     id: "ORD-2023-001",
  //     customer: "John Doe",
  //     products: ["Organic Tomatoes", "Fresh Carrots"],
  //     total: 125.00,
  //     date: "2023-04-01",
  //     status: "Completed",
  //     paymentStatus: "Paid"
  //   },
  //   {
  //     id: "ORD-2023-002",
  //     customer: "Jane Smith",
  //     products: ["Farm Fresh Eggs", "Organic Milk"],
  //     total: 75.50,
  //     date: "2023-03-29",
  //     status: "Shipped",
  //     paymentStatus: "Paid"
  //   },
  //   {
  //     id: "ORD-2023-003",
  //     customer: "Robert Brown",
  //     products: ["Green Beans", "Lettuce", "Potatoes"],
  //     total: 95.25,
  //     date: "2023-03-28",
  //     status: "Processing",
  //     paymentStatus: "Paid"
  //   },
  //   {
  //     id: "ORD-2023-004",
  //     customer: "Emily Wilson",
  //     products: ["Organic Apples", "Honey"],
  //     total: 55.00,
  //     date: "2023-03-25",
  //     status: "Completed",
  //     paymentStatus: "Paid"
  //   },
  //   {
  //     id: "ORD-2023-005",
  //     customer: "Michael Johnson",
  //     products: ["Fresh Corn", "Bell Peppers"],
  //     total: 45.75,
  //     date: "2023-03-22",
  //     status: "Cancelled",
  //     paymentStatus: "Refunded"
  //   }
  // ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <FarmerLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Order History</h1>

        <div className="flex justify-between items-center">
          <div className="relative w-[300px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search orders..." className="pl-8" />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" /> Export Orders
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="shipped">Shipped</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order Number</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Products</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map(order => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.orderNumber}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{ }</TableCell>
                          <TableCell>₹{order.total.toFixed(2)}</TableCell>
                          <TableCell>{order.createdAt.slice(0, 10)}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(order.status)}>
                              {order.orderStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                              {order.paymentStatus}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                              {order.status === 'Processing' && (
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Package className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="processing" className="mt-0">
                {/* Similar table but filtered for processing orders */}
              </TabsContent>

              <TabsContent value="shipped" className="mt-0">
                {/* Similar table but filtered for shipped orders */}
              </TabsContent>

              <TabsContent value="completed" className="mt-0">
                {/* Similar table but filtered for completed orders */}
              </TabsContent>

              <TabsContent value="cancelled" className="mt-0">
                {/* Similar table but filtered for cancelled orders */}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </FarmerLayout>
  );
};

export default OrderHistory;
