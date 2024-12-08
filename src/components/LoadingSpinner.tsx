import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSpinner: React.FC = () => {
  const spinTransition = {
    repeat: Infinity,
    duration: 1,
    ease: "linear"
  };

  return (
    <div className="flex justify-center items-center h-64">
      <motion.div
        animate={{ rotate: 360 }}
        transition={spinTransition}
        className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full"
      />
    </div>
  );
};