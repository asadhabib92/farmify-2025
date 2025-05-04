
import React from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Flag, 
  MoreHorizontal 
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

const ReportsManagement = () => {
  // Mock data for reports
  const reports = [
    {
      id: 1,
      title: 'Product Quality Issue',
      reporter: 'John Doe',
      reportedEntity: 'Fresh Farms',
      type: 'Product',
      status: 'Open',
      priority: 'High',
      date: '2023-04-01'
    },
    {
      id: 2,
      title: 'Delayed Delivery',
      reporter: 'Jane Smith',
      reportedEntity: 'Quick Harvest',
      type: 'Service',
      status: 'In Progress',
      priority: 'Medium',
      date: '2023-03-28'
    },
    {
      id: 3,
      title: 'Incorrect Product Description',
      reporter: 'Mike Johnson',
      reportedEntity: 'Organic Fields',
      type: 'Product',
      status: 'Resolved',
      priority: 'Low',
      date: '2023-03-25'
    },
    {
      id: 4,
      title: 'Payment Dispute',
      reporter: 'Sarah Wilson',
      reportedEntity: 'Sunrise Farms',
      type: 'Payment',
      status: 'Closed',
      priority: 'High',
      date: '2023-03-22'
    },
    {
      id: 5,
      title: 'Fraudulent Behavior Report',
      reporter: 'Lisa Brown',
      reportedEntity: 'Valley Greens',
      type: 'User',
      status: 'Open',
      priority: 'Critical',
      date: '2023-04-02'
    }
  ];
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Open':
        return <AlertTriangle size={16} className="text-amber-500" />;
      case 'In Progress':
        return <Clock size={16} className="text-blue-500" />;
      case 'Resolved':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'Closed':
        return <CheckCircle size={16} className="text-gray-500" />;
      default:
        return <Flag size={16} />;
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-amber-50 text-amber-700';
      case 'In Progress': return 'bg-blue-50 text-blue-700';
      case 'Resolved': return 'bg-green-50 text-green-700';
      case 'Closed': return 'bg-gray-50 text-gray-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Reports Management</h1>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="inprogress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="service">Service</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button>Export Reports</Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>All Reports</CardTitle>
            <CardDescription>
              Manage and respond to user reports and issues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Reporter</TableHead>
                    <TableHead>Reported Entity</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map(report => (
                    <TableRow key={report.id}>
                      <TableCell>{report.id}</TableCell>
                      <TableCell className="font-medium">{report.title}</TableCell>
                      <TableCell>{report.reporter}</TableCell>
                      <TableCell>{report.reportedEntity}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{report.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(report.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}>
                          {report.priority}
                        </span>
                      </TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Change Status</DropdownMenuItem>
                            <DropdownMenuItem>Assign to Team Member</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ReportsManagement;
