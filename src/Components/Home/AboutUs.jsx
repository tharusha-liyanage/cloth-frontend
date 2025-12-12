import React from 'react';
import { motion } from 'framer-motion';
import img1 from '../../assets/about.png'
import { useNavigate } from 'react-router-dom';
const AboutUs = () => {
  const navigate = useNavigate();
  // 1. Framer Motion Variants
  const imageVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } },
  };

  const keywordVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1, delay: 0.6 } },
  };

  const keywordItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut", delay: 1.2 } },
  };

  // Replace with the actual image URL or import
  const imageUrl = img1; 

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-2xl max-w-6xl w-full overflow-hidden">
        
        {/* 2. Image Section (with Motion) */}
        <motion.div
          className="lg:w-1/2 w-auto h-auto min-h-[300px] lg:min-h-[600px] bg-cover bg-center "
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          {/* Background image is set via style property */}
        </motion.div>

        {/* 3. Text Content Section (with Motion) */}
        <div className="lg:w-1/2 w-full flex flex-col justify-center p-8 sm:p-12 md:p-16 text-left">
          
          {/* Title */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-extrabold text-gray-800 mb-6 leading-tight"
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            Our Story         
        </motion.h1>

          {/* Keywords */}
          <motion.div
            className="mb-8 text-lg sm:text-xl text-gray-600 space-y-2"
            variants={keywordVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.p variants={keywordItemVariants}>
              <span className="font-semibold text-gray-800">
                <span className='text-[#af8314ff]'>Mahinda Trade Center</span> is your one-stop fashion destination,
                offering stylish, high-quality clothing for everyday wear.
                We bring the latest trends, comfortable fabrics, and timeless
                designs together to create an effortless shopping experience.
              </span>
            </motion.p>
            
          </motion.div>

          {/* Button */}
          <motion.button
            className="self-start px-8 py-3 bg-stone-700 text-white text-base font-semibold uppercase tracking-wider rounded-lg shadow-md hover:bg-stone-800 transition duration-300 ease-in-out transform hover:scale-[1.02]"
            variants={buttonVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/newArrival`)}
          >
            DISCOVER OUR New Collection
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;