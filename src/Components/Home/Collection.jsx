import React, { useState } from 'react';
import img1 from '../../assets/office.jpg';
import img2 from '../../assets/denim.png';
import img3 from '../../assets/frock.png';
import img4 from '../../assets/top.jpg';

const Collection = () => {
  const collections = [
    {
      name: "Office wear",
      image: img1, // Example image for tops
    },
    {
      name: "Denims",
      image: img2, // Example image for dresses
    },
    {
      name: "Frocks",
      image: img3, // Example image for pants
    },
    {
      name: "Top wear",
      image: img4, // Example image for blazers
    },
  ];

  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className="container mx-auto p-4 mt-10">
<h1 className='text-[#604a03ff] text-center font-bold text-5xl'>Boutique Picks</h1>      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        {collections.map((collection, index) => (
          <div
            key={index}
            className="relative overflow-hidden group cursor-pointer"
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <img
              src={collection.image}
              alt={collection.name}
              className="w-full h-100 object-cover transition-transform duration-300 group-hover:scale-105"
            />
                {/* Overlay for hover effect */}
            {hoveredItem === index && (
            <div className="absolute inset-0 bg-black-20 bg-opacity-40 backdrop-blur-md flex items-center justify-center transition-opacity duration-300">
                <p className="text-2xl font-bold tracking-widest text-white uppercase">
                {collection.name}
                </p>
            </div>
            )}
                                    {/* Static button-like text at the bottom */}
            {/* Static button-like text at the bottom with glass effect */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2  bg-opacity-30 backdrop-blur-sm px-6 py-2 rounded-sm shadow-md">
            <p className="text-lg font-medium text-white">{collection.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;