import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Guide, Winner } from './types';
import { Navigation } from './components/Navigation';
import { ContestDashboard } from './components/ContestDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { triggerConfetti } from './utils/confetti';

function App() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('contest');

  useEffect(() => {
    fetch('/data/Ticket_Assignment.json')
      .then(res => res.json())
      .then(data => setGuides(data));
  }, []);

  const selectWinner = () => {
    if (winners.length >= 2) {
      alert('All winners have been selected!');
      return;
    }

    setIsLoading(true);

    const availableGuides = guides.filter(
      guide => !winners.some(winner => winner.guide === guide.Jomax)
    );

    const randomGuide = availableGuides[Math.floor(Math.random() * availableGuides.length)];
    const tickets = randomGuide.TicketAssigned.split(',');
    const randomTicket = tickets[Math.floor(Math.random() * tickets.length)];
    const prize = winners.length === 0 ? 'Pulsar Bike' : 'Jupiter Scooty';

    setTimeout(() => {
      setWinners(prev => [...prev, {
        guide: randomGuide.Jomax,
        ticket: randomTicket,
        prize
      }]);
      setIsLoading(false);
      triggerConfetti();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {activeTab === 'contest' ? (
            <ContestDashboard
              winners={winners}
              isLoading={isLoading}
              onSelectWinner={selectWinner}
            />
          ) : (
            <AdminDashboard guides={guides} />
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default App;