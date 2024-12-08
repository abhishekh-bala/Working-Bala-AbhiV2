import React, { useState } from 'react';
import { Users, Ticket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Guide } from '../types';
import { StatsCard } from './StatsCard';
import { Pagination } from './Pagination';
import { LoadingSpinner } from './LoadingSpinner';

interface AdminDashboardProps {
  guides: Guide[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ guides }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const guidesPerPage = 50;
  const totalPages = Math.ceil(guides.length / guidesPerPage);

  const indexOfLastGuide = currentPage * guidesPerPage;
  const indexOfFirstGuide = indexOfLastGuide - guidesPerPage;
  const currentGuides = guides.slice(indexOfFirstGuide, indexOfLastGuide);

  if (!guides.length) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-gray-800 mb-8"
      >
        Admin Dashboard
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatsCard
          icon={Users}
          title="Total Guides"
          value={guides.length}
          color="blue"
          delay={0.2}
        />
        <StatsCard
          icon={Ticket}
          title="Total Tickets"
          value={guides.reduce((acc, guide) => acc + guide.TicketC, 0)}
          color="green"
          delay={0.4}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white rounded-xl shadow overflow-hidden"
      >
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Guide Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Number of Tickets
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ticket Numbers
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <AnimatePresence mode="wait">
              {currentGuides.map((guide, index) => (
                <motion.tr
                  key={guide.Jomax}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {guide.Jomax}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {guide.TicketC}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {guide.TicketAssigned}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </motion.div>
    </motion.div>
  );
};