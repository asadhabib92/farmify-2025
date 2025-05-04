
import React from 'react';

const testimonials = [
  {
    quote: "Farmify has transformed my business. I'm making 30% more income by selling directly to consumers.",
    name: "Rajesh Kumar",
    role: "Vegetable Farmer, Punjab",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
  },
  {
    quote: "The quality of produce I get is amazing. It's fresh, organic and I know exactly where it comes from.",
    name: "Priya Singh",
    role: "Consumer, Mumbai",
    image: "https://images.unsplash.com/photo-1545912452-8aea7e25a3d3?crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
  },
  {
    quote: "The educational resources helped me implement sustainable farming practices that increased my yield.",
    name: "Anand Verma",
    role: "Organic Farmer, Karnataka",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">What Our Community Says</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Hear from farmers and consumers who are part of our growing Farmify family
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col h-full">
                <svg className="w-10 h-10 text-farmify-orange mb-4" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-gray-700 mb-6 flex-grow">{testimonial.quote}</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
