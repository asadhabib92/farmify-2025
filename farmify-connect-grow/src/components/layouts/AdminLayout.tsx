
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  AlertTriangle,
  BarChart3,
  LogOut
} from "lucide-react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Users, label: "Users", path: "/admin/users" },
    { icon: ClipboardCheck, label: "Applications", path: "/admin/applications" },
    { icon: AlertTriangle, label: "Reports", path: "/admin/reports" },
    { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
        <div className="flex items-center gap-2 p-6 border-b">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-farmify-green to-farmify-orange flex items-center justify-center">
            <span className="text-white font-bold text-xl">F</span>
          </div>
          <span className="text-xl font-bold">Admin Panel</span>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 ${location.pathname === item.path
                      ? 'bg-farmify-green bg-opacity-10 text-farmify-green'
                      : 'text-gray-700'
                    }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* <div className="absolute bottom-4 left-4 right-4">
          <Link to="/">
            <Button variant="ghost" className="w-full flex items-center gap-2">
              <LogOut size={18} />
              <span>Back to Site</span>
            </Button>
          </Link>
        </div> */}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
