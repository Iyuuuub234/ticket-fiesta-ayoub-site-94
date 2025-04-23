
import React from 'react';
import { Ticket } from 'lucide-react';

const TicketGrid = () => {
  const tickets = Array(32).fill(null);
  
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Réservez vos billets</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {tickets.map((_, index) => (
            <div
              key={index}
              className="aspect-[2/1] bg-gradient-to-r from-ticket-purple/5 to-ticket-orange/5 rounded-lg flex items-center justify-center group hover:from-ticket-purple/10 hover:to-ticket-orange/10 transition-all duration-300"
            >
              <Ticket className="w-8 h-8 text-ticket-purple opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TicketGrid;

