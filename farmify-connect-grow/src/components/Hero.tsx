
import React, { useContext, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '@/Context/StoreContext';

interface HeroProps {
  onDashboardClick: () => void;
}

const Hero = ({ onDashboardClick }: HeroProps) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  return (
    <div className="hero-pattern min-h-[85vh] flex flex-col items-center justify-center pt-8 pb-8 px-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 flex flex-col items-start animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">From Farm to Families</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-xl">
            Direct connection between farmers and consumers. Fresh produce, fair prices, and sustainable agriculture.
          </p>
          {!token && <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/register"><Button className="bg-farmify-green hover:bg-farmify-green-dark text-white px-8 py-6 text-lg btn-hover-effect">
              I'm a Consumer
            </Button></Link>
            <Link to="/login"><Button variant="outline" className="border-2 border-farmify-orange text-farmify-orange hover:bg-farmify-orange hover:text-white px-8 py-6 text-lg btn-hover-effect">
              I'm a Farmer
            </Button></Link>
          </div>}

          {token && <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button className="bg-farmify-green hover:bg-farmify-green-dark text-white px-8 py-6 text-lg btn-hover-effect"
              onClick={onDashboardClick}>
              Go To Dashboard
            </Button>
          </div>}

          <div className="mt-12 bg-white rounded-full shadow-lg p-2 flex items-center w-full max-w-md border border-gray-200">
            <Search className="ml-2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Find fresh produce near you..."
              className="px-4 py-2 rounded-full w-full focus:outline-none"

            />
            <Button className="rounded-full bg-farmify-orange hover:bg-farmify-orange-dark"
              onClick={() => navigate('/consumer/search')}>
              Search
            </Button>
          </div>
        </div>

        <div className="lg:w-1/2 relative animate-fade-in">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="home-image.jpg"
              alt="Farm fresh products"
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-xs">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-farmify-green"></div>
              <p className="font-medium text-gray-800">100+ Local Farmers</p>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-farmify-orange"></div>
              <p className="font-medium text-gray-800">Fresh Organic Produce</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-farmify-earth"></div>
              <p className="font-medium text-gray-800">Farm to Table Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
