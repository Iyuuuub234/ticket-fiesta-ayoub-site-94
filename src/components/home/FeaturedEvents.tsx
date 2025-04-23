
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { getFeaturedEvents } from '@/data/events';
import EventCard from '../events/EventCard';

const FeaturedEvents: React.FC = () => {
  const featuredEvents = getFeaturedEvents().slice(0, 8); // Show up to 8 featured events

  return (
    <section className="py-16 bg-ticket-light">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Événements à la une</h2>
            <p className="text-gray-600 max-w-2xl">
              Découvrez notre sélection des événements les plus populaires et ne manquez pas les dates importantes.
            </p>
          </div>
          <Link to="/events" className="hidden md:flex items-center text-ticket-purple hover:text-ticket-purple/80 font-medium">
            Voir tout <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/events">
            <Button variant="outline" className="border-ticket-purple text-ticket-purple hover:bg-ticket-purple/10">
              Voir tous les événements <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
