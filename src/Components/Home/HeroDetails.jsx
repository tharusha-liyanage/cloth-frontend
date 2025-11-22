import React from 'react';
import { Truck, RotateCcw, BadgePercent } from 'lucide-react';

const HeroDetails = () => {
  // Data array for easy management
  const features = [
    {
      id: 1,
      icon: <Truck size={40} className="text-black" />, 
      title: "Free Shipping",
      subtitle: "For All Orders Over Rs.5000", // Corrected spelling from 'Oders'
    },
    {
      id: 2,
      icon: <RotateCcw size={40} className="text-black" />, // Represents Return/Time
      title: "30 Day Return",
      subtitle: "Money Back Guarantee", // Corrected spelling from 'Gerantee'
    },
    {
      id: 3,
      icon: <BadgePercent size={40} className="text-black" />,
      title: "Promotions",
      subtitle: "Get 10% for loyalty",
    },
  ];

  return (
    <section className="w-full bg-[#f6f2eaff] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Grid Layout: 1 column on mobile, 3 columns on medium screens and up */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-300">
          
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="flex items-center justify-center gap-4 p-4"
            >
              {/* Icon Section */}
              <div className="flex-shrink-0">
                {feature.icon}
              </div>

              {/* Text Section */}
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-black uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-700 font-medium">
                  {feature.subtitle}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default HeroDetails;