
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ShoppingBasket,
  Search,
  ShoppingCart,
  Package,
  Star,
  LogOut
} from "lucide-react";

const ConsumerLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/consumer/dashboard" },
    { icon: ShoppingBasket, label: "Browse Products", path: "/consumer/products" },
    { icon: Search, label: "Search", path: "/consumer/search" },
    { icon: ShoppingCart, label: "Checkout", path: "/consumer/checkout" },
    { icon: Package, label: "My Orders", path: "/consumer/orders" },
    { icon: Star, label: "My Reviews", path: "/consumer/reviews" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
        <div className="flex items-center gap-2 p-6 border-b">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-farmify-green to-farmify-orange flex items-center justify-center">
            <span className="text-white font-bold text-xl">F</span>
          </div>
          <span className="text-xl font-bold">Consumer Panel</span>
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

        <div className="absolute bottom-4 left-4 right-4">
          <Link to="/">
            <Button variant="ghost" className="w-full flex items-center gap-2">
              <LogOut size={18} />
              <span>Back to Homepage</span>
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default ConsumerLayout;
