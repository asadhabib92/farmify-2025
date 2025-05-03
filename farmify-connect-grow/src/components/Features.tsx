
import React from 'react';
import { 
  Users, 
  MapPin, 
  ShoppingCart, 
  Book,
  Package, 
  Map,
  Settings
} from 'lucide-react';

const featuresList = [
  {
    icon: <ShoppingCart className="w-8 h-8 text-farmify-orange" />,
    title: "Direct Marketplace",
    description: "Browse & buy fresh products directly from farmers in your area with secure checkout options."
  },
  {
    icon: <MapPin className="w-8 h-8 text-farmify-orange" />,
    title: "Location-Based",
    description: "Find farmers within your radius and get accurate delivery time estimations."
  },
  {
    icon: <Users className="w-8 h-8 text-farmify-orange" />,
    title: "Farmer Community",
    description: "Join a thriving community of farmers sharing best practices and knowledge."
  },
  {
    icon: <Package className="w-8 h-8 text-farmify-green" />,
    title: "Product Management",
    description: "Farmers can easily list and manage their products with our intuitive tools."
  },
  {
    icon: <Settings className="w-8 h-8 text-farmify-green" />,
    title: "Smart Tools",
    description: "AI-powered recommendations and pricing suggestions for better farming decisions."
  },
  {
    icon: <Book className="w-8 h-8 text-farmify-green" />,
    title: "Education Portal",
    description: "Access tutorials, government schemes, and best practices in agriculture."
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-gray-50" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Empowering Farmers, Delighting Consumers</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Farmify bridges the gap between farmers and consumers through technology, 
            creating a sustainable ecosystem that benefits both sides.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 flex-grow">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
