
import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, ClipboardCheck, AlertTriangle } from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: Users,
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Pending Applications",
      value: "23",
      icon: ClipboardCheck,
      change: "-5%",
      changeType: "positive"
    },
    {
      title: "Active Reports",
      value: "7",
      icon: AlertTriangle,
      change: "+2",
      changeType: "negative"
    },
    {
      title: "Total Sales",
      value: "₹45,245",
      icon: BarChart3,
      change: "+18%",
      changeType: "positive"
    }
  ];

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

  useEffect(() => {
    userDetails();
  }, [])

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">Welcome to the Farmify admin panel. Here's an overview of everything happening on the platform.</p>
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
              <CardTitle>Recent User Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((item, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-2">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                      <div className="ml-4">
                        <p className="font-semibold">{item.firstName}</p>
                        <p className="text-sm text-gray-500">{item.role}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.createdAt}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Farmer Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex justify-between items-center border-b pb-2">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                      <div className="ml-4">
                        <p className="font-semibold">Farmer Name {item}</p>
                        <p className="text-sm text-gray-500">Applied on {new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-farmify-green text-white rounded-md text-sm">
                        Approve
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded-md text-sm">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
