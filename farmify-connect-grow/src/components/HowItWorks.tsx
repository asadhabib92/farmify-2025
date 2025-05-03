
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: "01",
    title: "Find Local Farmers",
    description: "Browse through our network of verified local farmers in your area",
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
    color: "bg-farmify-green"
  },
  {
    number: "02",
    title: "Order Fresh Produce",
    description: "Select fresh, seasonal products directly from farmers at fair prices",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    color: "bg-farmify-orange"
  },
  {
    number: "03",
    title: "Receive At Your Doorstep",
    description: "Get farm-fresh products delivered right to your home",
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    color: "bg-farmify-earth"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">How Farmify Works</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Our platform makes it easy to connect with local farmers and access fresh produce
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="rounded-xl overflow-hidden shadow-lg mb-6 aspect-video">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute top-4 left-4 ${step.color} text-white w-12 h-12 flex items-center justify-center rounded-full font-bold`}
                >
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/consumer/dashboard"><Button className="bg-farmify-green hover:bg-farmify-green-dark text-white px-8 py-6 text-lg btn-hover-effect">
            Start Shopping
          </Button></Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
