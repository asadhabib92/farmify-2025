
import React, { useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import FarmerSection from '@/components/FarmerSection';
import Testimonials from '@/components/Testimonials';
import StatsSection from '@/components/StatsSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

const Index = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate();
  const dashboardRef = useRef<HTMLDivElement>(null);
  const scrollToDashboard = () => {
    dashboardRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}
      <div className=' '>
        <Hero onDashboardClick={scrollToDashboard} />
        <StatsSection />
        <Features />
        <HowItWorks />
        <FarmerSection />
        <Testimonials />
      </div>

      {/* Access Panels Section */}
      <section ref={dashboardRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Access Your Dashboard</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Login to your respective dashboard to manage your Farmify experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-farmify-green bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-farmify-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Consumer Panel</h3>
              <p className="text-gray-600 mb-6">
                Browse fresh produce, place orders, and manage your deliveries.
              </p>
              <Link to="/consumer/dashboard">
                <Button className="w-full bg-farmify-green hover:bg-farmify-green-dark">
                  Access Consumer Panel
                </Button>
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-farmify-green bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-farmify-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Farmer Panel</h3>
              <p className="text-gray-600 mb-6">
                Manage your products, track orders, and grow your farm business.
              </p>

              <Button className="w-full bg-farmify-green hover:bg-farmify-green-dark"
                onClick={() => { token ? navigate('/farmer/dashboard') : toast.error("Please Login First") }}>
                Access Farmer Panel
              </Button>

            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-farmify-green bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-farmify-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Admin Panel</h3>
              <p className="text-gray-600 mb-6">
                Oversee platform operations, manage users, and analyze performance.
              </p>

              <Button className="w-full bg-farmify-green hover:bg-farmify-green-dark"
                onClick={() => navigate('/admin/dashboard')}>
                Access Admin Panel
              </Button>

            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm">
              New to Farmify? <Link to="/register" className="text-farmify-green hover:underline">Create an account</Link> or <Link to="/login" className="text-farmify-green hover:underline">login</Link> to get started.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
