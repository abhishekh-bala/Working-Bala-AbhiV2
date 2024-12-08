import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Winner, Guide } from '../types';
import { WinnerCard } from './WinnerCard';

interface ContestDashboardProps {
  winners: Winner[];
  isLoading: boolean;
  onSelectWinner: () => void;
}

export const ContestDashboard: React.FC<ContestDashboardProps> = ({
  winners,
  isLoading,
  onSelectWinner,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold text-center text-purple-600 mb-12"
      >
        Thrilling Contest Dashboard
      </motion.h1>

      <div className="flex justify-center mb-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSelectWinner}
          disabled={isLoading || winners.length >= 2}
          className={`
            px-8 py-4 rounded-full text-xl font-bold text-white
            transform transition-all duration-300
            ${
              isLoading || winners.length >= 2
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg'
            }
          `}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Selecting Winner...
            </span>
          ) : winners.length >= 2 ? (
            'All Winners Selected!'
          ) : (
            'Reveal Lucky Winner!'
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {winners.map((winner, index) => (
            <WinnerCard key={index} winner={winner} index={index} />
          ))}
        </div>
      </AnimatePresence>
    </motion.div>
  );
};