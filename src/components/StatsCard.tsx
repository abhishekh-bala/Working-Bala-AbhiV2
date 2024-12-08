import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: number;
  color: string;
  delay?: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  icon: Icon,
  title,
  value,
  color,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`bg-${color}-100 p-6 rounded-xl`}
    >
      <div className="flex items-center">
        <Icon className={`w-8 h-8 text-${color}-600 mr-3`} />
        <div>
          <h3 className={`text-xl font-bold text-${color}-600`}>{title}</h3>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
            className={`text-3xl font-bold text-${color}-800`}
          >
            {value}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};