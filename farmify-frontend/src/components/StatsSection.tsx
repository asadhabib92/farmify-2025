
import React from 'react';

const stats = [
  {
    value: "10,000+",
    label: "Farmers"
  },
  {
    value: "50,000+",
    label: "Consumers"
  },
  {
    value: "100+",
    label: "Cities"
  },
  {
    value: "₹10 Cr+",
    label: "Monthly Sales"
  }
];

const StatsSection = () => {
  return (
    <section className="py-12 bg-farmify-green">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-white text-4xl md:text-5xl font-bold mb-2">{stat.value}</p>
              <p className="text-green-100 text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
