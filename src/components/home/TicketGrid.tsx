
import React from 'react';
import { Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

const TicketGrid = () => {
  const tickets = Array(16).fill(null);
  
  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <h2 className="text-2xl font-bold text-center mb-8">Tickets disponibles</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {tickets.map((_, index) => (
            <HoverCard key={index}>
              <HoverCardTrigger asChild>
                <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center group cursor-pointer hover:bg-gray-200 transition-colors">
                  <Ticket className="w-8 h-8 text-ticket-purple group-hover:scale-110 transition-transform" />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-56">
                <div className="space-y-2">
                  <h4 className="font-medium">Ticket #{index + 1}</h4>
                  <p className="text-sm text-muted-foreground">Cliquez pour voir tous les événements disponibles</p>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/events">
            <Button variant="outline" className="border-ticket-purple text-ticket-purple hover:bg-ticket-purple/10">
              Voir tous les tickets
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TicketGrid;
