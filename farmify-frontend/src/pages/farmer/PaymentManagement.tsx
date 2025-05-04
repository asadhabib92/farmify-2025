
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
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Download, 
  CreditCard, 
  BadgeIndianRupee, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Check, 
  Clock, 
  X,
  Eye,
  Filter,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { Badge } from '@/components/ui/badge';

const PaymentManagement = () => {
  const paymentMethods = [
    { id: 1, name: 'Bank Account', type: 'NEFT/IMPS', status: 'Active', default: true },
    { id: 2, name: 'UPI', type: 'UPI', status: 'Active', default: false },
  ];

  const transactions = [
    {
      id: "TRX-2023-001",
      date: "2023-04-01",
      amount: 1250.00,
      customer: "John Doe",
      orderId: "ORD-2023-001",
      type: "credit",
      method: "UPI",
      status: "Completed"
    },
    {
      id: "TRX-2023-002",
      date: "2023-03-28",
      amount: 755.00,
      customer: "Jane Smith",
      orderId: "ORD-2023-002",
      type: "credit",
      method: "Bank Transfer",
      status: "Completed"
    },
    {
      id: "TRX-2023-003",
      date: "2023-03-25",
      amount: 82.50,
      customer: "Admin",
      orderId: null,
      type: "debit",
      method: "Platform Fee",
      status: "Completed"
    },
    {
      id: "TRX-2023-004",
      date: "2023-03-24",
      amount: 952.50,
      customer: "Robert Brown",
      orderId: "ORD-2023-003",
      type: "credit",
      method: "Cash on Delivery",
      status: "Pending"
    },
    {
      id: "TRX-2023-005",
      date: "2023-03-20",
      amount: 457.50,
      customer: "Michael Johnson",
      orderId: "ORD-2023-005",
      type: "credit",
      method: "UPI",
      status: "Failed"
    }
  ];
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return <Check className="text-green-500" size={16} />;
      case 'Pending': return <Clock className="text-amber-500" size={16} />;
      case 'Failed': return <X className="text-red-500" size={16} />;
      default: return null;
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-amber-100 text-amber-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getTypeIcon = (type) => {
    return type === 'credit' 
      ? <ArrowDownLeft className="text-green-500" size={16} /> 
      : <ArrowUpRight className="text-red-500" size={16} />;
  };
  
  return (
    <FarmerLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Payment Management</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Balance Available</CardTitle>
              <BadgeIndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹4,872.50</div>
              <p className="text-xs text-muted-foreground">Last updated: Today, 10:30 AM</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month Earnings</CardTitle>
              <ArrowDownLeft className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹2,957.50</div>
              <p className="text-xs text-green-500">+12.5% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
              <Clock className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹952.50</div>
              <p className="text-xs text-muted-foreground">Expected by Apr 5, 2023</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="transactions">
          <TabsList className="mb-4">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="icon">
                  <Calendar className="h-4 w-4" />
                </Button>
                
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>
                  View all your incoming and outgoing transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Customer/Source</TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map(transaction => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {getTypeIcon(transaction.type)}
                              <span className="capitalize">{transaction.type}</span>
                            </div>
                          </TableCell>
                          <TableCell className={transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
                            {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                          </TableCell>
                          <TableCell>{transaction.customer}</TableCell>
                          <TableCell>{transaction.orderId || '-'}</TableCell>
                          <TableCell>{transaction.method}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(transaction.status)}
                              <Badge className={getStatusColor(transaction.status)}>
                                {transaction.status}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payouts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Schedule a Payout</CardTitle>
                <CardDescription>
                  Transfer your available balance to your bank account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Available for payout</h4>
                    <div className="text-2xl font-bold">₹4,872.50</div>
                  </div>
                  
                  <Button>Request Payout</Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Payout history would go here */}
          </TabsContent>
          
          <TabsContent value="payment-methods" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Payment Methods</CardTitle>
                <CardDescription>
                  Manage how you receive payments from customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map(method => (
                    <div key={method.id} className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-6 w-6 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">{method.name}</h4>
                          <p className="text-sm text-muted-foreground">{method.type}</p>
                        </div>
                        {method.default && (
                          <Badge>Default</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        {!method.default && (
                          <Button variant="ghost" size="sm">Make Default</Button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <Button>
                    Add Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </FarmerLayout>
  );
};

export default PaymentManagement;

