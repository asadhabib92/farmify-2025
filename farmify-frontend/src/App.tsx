import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Admin Panel Pages
import AdminDashboard from "./pages/admin/Dashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ApproveApplications from "./pages/admin/ApproveApplications";
import ReportsManagement from "./pages/admin/ReportsManagement";
import AdminAnalytics from "./pages/admin/Analytics";

// Farmer Panel Pages
import FarmerDashboard from "./pages/farmer/Dashboard";
import ProductManagement from "./pages/farmer/ProductManagement";
import OrderHistory from "./pages/farmer/OrderHistory";
import InventoryDashboard from "./pages/farmer/InventoryDashboard";
import PaymentManagement from "./pages/farmer/PaymentManagement";
import SalesAnalytics from "./pages/farmer/SalesAnalytics";
import ReviewsAndRatings from "./pages/farmer/ReviewsAndRatings";
import FarmerRegistration from "./pages/farmer/Registration";

// Consumer Panel Pages
import ProductBrowse from "./pages/consumer/ProductBrowse";
import ProductSearch from "./pages/consumer/ProductSearch";
import Checkout from "./pages/consumer/Checkout";
import OrderTracking from "./pages/consumer/OrderTracking";
import UserReviews from "./pages/consumer/UserReviews";
import ConsumerDashboard from "./pages/consumer/Dashboard";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import KYCVerification from "./pages/auth/KYCVerification";

import FarmersList from "./pages/FarmersList";
import Navbar from "./components/Navbar";
import StoreContextProvider from "./Context/StoreContext";
import { ToastContainer } from "react-toastify";
import { useRef } from "react";
import Support from "./pages/Support";

const queryClient = new QueryClient();

const App = () => {
  return (
    <StoreContextProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ToastContainer />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className=" pb-5 mb-7"><Navbar /></div>
            <Routes>
              <Route path="/" element={<Index />} />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/kyc-verification" element={<KYCVerification />} />

              {/* Admin Panel Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/applications" element={<ApproveApplications />} />
              <Route path="/admin/reports" element={<ReportsManagement />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />

              {/* Farmer Panel Routes */}
              <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
              <Route path="/farmer/products" element={<ProductManagement />} />
              <Route path="/farmer/orders" element={<OrderHistory />} />
              <Route path="/farmer/inventory" element={<InventoryDashboard />} />
              <Route path="/farmer/payments" element={<PaymentManagement />} />
              <Route path="/farmer/analytics" element={<SalesAnalytics />} />
              <Route path="/farmer/reviews" element={<ReviewsAndRatings />} />
              <Route path="/farmer/registration" element={<FarmerRegistration />} />

              {/* Consumer Panel Routes */}
              <Route path="/consumer/dashboard" element={<ConsumerDashboard />} />
              <Route path="/consumer/products" element={<ProductBrowse />} />
              <Route path="/consumer/search" element={<ProductSearch />} />
              <Route path="/consumer/checkout" element={<Checkout />} />
              <Route path="/consumer/orders" element={<OrderTracking />} />
              <Route path="/consumer/reviews" element={<UserReviews />} />

              {/* Public Routes */}
              <Route path="/farmers" element={<FarmersList />} />
              <Route path="/support" element={<Support />} />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </StoreContextProvider>
  );
}

export default App;