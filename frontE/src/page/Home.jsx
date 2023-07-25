import React from 'react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (    
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Landing Page</h1>
          <p className="text-lg text-gray-600">Thank you for visiting our website.</p>
          {/* เพิ่ม event handler เมื่อคลิกปุ่ม */}
          <a href="/Create-post">
          <button  
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded-md"
            
          >
            Get Started
          </button>
          </a>
        </motion.div>
      </div>
  );
};

export default LandingPage;
