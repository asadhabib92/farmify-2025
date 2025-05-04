
import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';
import {
  MoreHorizontal,
  Edit,
  Trash,
  UserX,
  Shield,
  Search
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

  // Mock data for users
  // const users = [
  //   { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Consumer', status: 'Active', joinDate: '2023-01-15' },
  //   { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Farmer', status: 'Active', joinDate: '2023-02-20' },
  //   { id: 3, name: 'Robert Brown', email: 'robert@example.com', role: 'Consumer', status: 'Active', joinDate: '2023-03-05' },
  //   { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Farmer', status: 'Suspended', joinDate: '2023-02-10' },
  //   { id: 5, name: 'Michael Johnson', email: 'michael@example.com', role: 'Admin', status: 'Active', joinDate: '2022-12-01' },
  //   { id: 6, name: 'Emily Davis', email: 'emily@example.com', role: 'Consumer', status: 'Inactive', joinDate: '2023-01-30' },
  // ];

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-50';
      case 'Inactive': return 'text-gray-600 bg-gray-50';
      case 'Suspended': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const userDetails = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/admin/users-details', {
        headers: {
          Authorization: `Bearer ${token}`, // Make sure the token is correct
        }
      });
      console.log(response.data.data);
      setUsers(response.data.data);
      users && console.log(users)
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (_id) => {
    try {
      const response = await axios.delete(import.meta.env.VITE_BACKEND_URL + `/api/admin/delete-user/${_id}`);
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        userDetails();
      }
    } catch (error) {
      console.log(error);
      toast.error("User Not Deleted");
    }
  }

  const handleSuspend = async (_id) => {
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + `/api/admin/suspend-user/${_id}`);
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        userDetails();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error")
    }
  }

  const handleActivate = async (_id) => {
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + `/api/admin/activate-user/${_id}`);
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        userDetails();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error")
    }
  }

  useEffect(() => {
    userDetails();
  }, [])

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Manage Users</h1>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Users</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-8 w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                {/* <Button>Add User</Button> */}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Users</TabsTrigger>
                <TabsTrigger value="consumers">Consumers</TabsTrigger>
                <TabsTrigger value="farmers">Farmers</TabsTrigger>
                <TabsTrigger value="admins">Admins</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map(user => (
                        <TableRow key={user._id}>
                          <TableCell className="font-medium">{user.firstName} {user.lastName}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </TableCell>
                          <TableCell>{user.createdAt}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="cursor-pointer">
                                  {/* <Edit className="mr-2 h-4 w-4" /> Edit */}
                                </DropdownMenuItem>
                                {user.status !== 'Suspended' ? (
                                  <DropdownMenuItem className="cursor-pointer text-amber-600" onClick={() => handleSuspend(user._id)}>
                                    <UserX className="mr-2 h-4 w-4" /> Suspend
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem className="cursor-pointer text-green-600" onClick={() => handleActivate(user._id)}>
                                    <Shield className="mr-2 h-4 w-4" /> Activate
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem className="cursor-pointer text-red-600" onClick={() => handleDelete(user._id)}>
                                  <Trash className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="consumers" className="mt-0">
                {/* Similar table but filtered for consumers */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.filter(user => user.role === 'consumer').map(user => (
                        <TableRow key={user._id}>
                          <TableCell className="font-medium">{user.firstName} {user.lastName}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </TableCell>
                          <TableCell>{user.createdAt}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="cursor-pointer">
                                  {/* <Edit className="mr-2 h-4 w-4" /> Edit */}
                                </DropdownMenuItem>
                                {user.status !== 'Suspended' ? (
                                  <DropdownMenuItem className="cursor-pointer text-amber-600" onClick={() => handleSuspend(user._id)}>
                                    <UserX className="mr-2 h-4 w-4" /> Suspend
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem className="cursor-pointer text-green-600" onClick={() => handleActivate(user._id)}>
                                    <Shield className="mr-2 h-4 w-4" /> Activate
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem className="cursor-pointer text-red-600" onClick={() => handleDelete(user._id)}>
                                  <Trash className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="farmers" className="mt-0">
                {/* Content for farmers tab */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.filter(user => user.role === 'farmer').map(user => (
                        <TableRow key={user._id}>
                          <TableCell className="font-medium">{user.firstName} {user.lastName}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </TableCell>
                          <TableCell>{user.createdAt}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="cursor-pointer">
                                  {/* <Edit className="mr-2 h-4 w-4" /> Edit */}
                                </DropdownMenuItem>
                                {user.status !== 'Suspended' ? (
                                  <DropdownMenuItem className="cursor-pointer text-amber-600" onClick={() => handleSuspend(user._id)}>
                                    <UserX className="mr-2 h-4 w-4" /> Suspend
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem className="cursor-pointer text-green-600" onClick={() => handleActivate(user._id)}>
                                    <Shield className="mr-2 h-4 w-4" /> Activate
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem className="cursor-pointer text-red-600" onClick={() => handleDelete(user._id)}>
                                  <Trash className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="admins" className="mt-0">
                {/* Content for admins tab */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.filter(user => user.role === 'admin').map(user => (
                        <TableRow key={user._id}>
                          <TableCell className="font-medium">{user.firstName} {user.lastName}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </TableCell>
                          <TableCell>{user.createdAt}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="cursor-pointer">
                                  {/* <Edit className="mr-2 h-4 w-4" /> Edit */}
                                </DropdownMenuItem>
                                {user.status !== 'Suspended' ? (
                                  <DropdownMenuItem className="cursor-pointer text-amber-600" onClick={() => handleSuspend(user._id)}>
                                    <UserX className="mr-2 h-4 w-4" /> Suspend
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem className="cursor-pointer text-green-600" onClick={() => handleActivate(user._id)}>
                                    <Shield className="mr-2 h-4 w-4" /> Activate
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem className="cursor-pointer text-red-600" onClick={() => handleDelete(user._id)}>
                                  <Trash className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ManageUsers;
