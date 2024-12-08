import React from 'react';
import { Trophy, Ticket } from 'lucide-react';
import { motion } from 'framer-motion';
import { Winner } from '../types';

interface WinnerCardProps {
  winner: Winner;
  index: number;
}

export const WinnerCard: React.FC<WinnerCardProps> = ({ winner, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.3
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: index * 0.3 + 0.2
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.3 + 0.4
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <motion.div variants={iconVariants}>
          <Trophy className="w-8 h-8 text-yellow-500" />
        </motion.div>
        <motion.span
          variants={textVariants}
          className="text-sm font-semibold text-purple-600"
        >
          Winner #{index + 1}
        </motion.span>
      </div>
      
      <motion.h3
        variants={textVariants}
        className="text-xl font-bold text-gray-800 mb-2"
      >
        {winner.guide}
      </motion.h3>
      
      <motion.div
        variants={textVariants}
        className="flex items-center text-gray-600 mb-2"
      >
        <Ticket className="w-4 h-4 mr-2" />
        Ticket: {winner.ticket}
      </motion.div>
      
      <motion.div
        variants={textVariants}
        className="mt-4 pt-4 border-t border-purple-200"
      >
        <div className="text-lg font-semibold text-purple-600">
          Prize: {winner.prize}
        </div>
      </motion.div>
    </motion.div>
  );
};