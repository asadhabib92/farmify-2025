
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const benefits = [
  "Direct access to consumers - no middlemen",
  "Higher profit margins and fair pricing",
  "Easy inventory and order management",
  "Smart pricing suggestions based on market trends",
  "Educational resources to improve farming practices",
  "Weather forecasts and crop management tools"
];

const FarmerSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="gradient-text">For Farmers</span>
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              Join our platform to reach more customers, get better prices for your produce, and access tools to help modernize your farming practices.
            </p>

            <div className="mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 mb-3">
                  <div className="bg-farmify-green rounded-full p-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>

            <Link to="/register"><Button className="bg-farmify-green hover:bg-farmify-green-dark text-white px-8 py-6 text-lg btn-hover-effect">
              Join as a Farmer
            </Button></Link>
          </div>

          <div className="order-1 md:order-2 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1493962853295-0fd70327578a"
                alt="Farmer with crop"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-lg shadow-lg max-w-xs">
              <p className="text-lg font-bold text-farmify-green mb-1">
                20,000+
              </p>
              <p className="text-gray-700">
                Farmers already growing their business with us
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FarmerSection;
