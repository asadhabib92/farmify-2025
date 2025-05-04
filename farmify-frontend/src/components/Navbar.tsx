import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CircleUserRound, LogOut, Menu, X } from 'lucide-react';
import { StoreContext } from '@/Context/StoreContext';

const Navbar = () => {
  const { userName, } = useContext(StoreContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const token = localStorage.getItem('token');

  return (
    <nav className="bg-white bg-opacity-95 backdrop-blur-sm fixed w-full z-10 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-farmify-green to-farmify-orange flex items-center justify-center">
            <span className="text-white font-bold text-xl">F</span>
          </div>
          <span className="text-2xl font-bold gradient-text">Farmify</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6 items-center">
            <Link to="/about" className="text-gray-700 hover:text-farmify-green transition-colors">
              About
            </Link>
            <Link to="/consumer/products" className="text-gray-700 hover:text-farmify-green transition-colors">
              Browse Products
            </Link>
            <Link to="/farmers" className="text-gray-700 hover:text-farmify-green transition-colors">
              Our Farmers
            </Link>
            {/* <Link to="/support" className="text-gray-700 hover:text-farmify-green transition-colors">
              Support
            </Link> */}
          </div>

          {!token ? <div className="flex items-center gap-3">
            <Link to="/login"><Button variant="outline" className="border-farmify-green text-farmify-green hover:bg-farmify-green hover:text-white">
              Login
            </Button></Link>
            <Link to="/register"><Button className="bg-farmify-green hover:bg-farmify-green-dark text-white">
              Sign Up
            </Button></Link>
          </div> :
            <div className=' flex flex-col justify-center items-center' onClick={() => { localStorage.removeItem('token'); window.location.reload() }}> <LogOut />{userName} </div>}

        </div>

        <button className="md:hidden text-gray-700" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {
        isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg animate-fade-in">
            <div className="flex flex-col p-4 gap-4">
              <Link to="/about"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={toggleMobileMenu}
              >
                About
              </Link>
              <Link to="/consumer/products"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={toggleMobileMenu}
              >
                Browse Products
              </Link>
              <Link to="/farmers"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={toggleMobileMenu}
              >
                Our Farmers
              </Link>
              {/* <Link to="/support"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={toggleMobileMenu}
              >
                Support
              </Link> */}

              {!token ? <div className="flex flex-col gap-2 mt-2">
                <Link to="/login"><Button variant="outline" className="border-farmify-green text-farmify-green w-full" onClick={toggleMobileMenu}>
                  Login
                </Button></Link>
                <Link to="/register"><Button className="bg-farmify-green hover:bg-farmify-green-dark text-white w-full" onClick={toggleMobileMenu}>
                  Sign Up
                </Button></Link>
              </div> :
                <div><Button variant="outline" className="border-farmify-green text-farmify-green w-full"
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.reload()
                  }}>
                  <LogOut /> Logout
                </Button></div>}
            </div>
          </div>
        )
      }
    </nav >
  );
};

export default Navbar;