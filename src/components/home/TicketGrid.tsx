
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FeaturedTicketsCarousel from './FeaturedTicketsCarousel';
import RecommendedEvents from './RecommendedEvents';

const TicketGrid = () => {
  return (
    <>
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">Nos tickets en vedette</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection de billets pour les événements les plus attendus
            </p>
          </div>

          <FeaturedTicketsCarousel />

          <div className="mt-8 text-center">
            <Link to="/events">
              <Button variant="outline" className="border-ticket-purple text-ticket-purple hover:bg-ticket-purple/10">
                Voir tous les événements <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section for personalized recommendations */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <RecommendedEvents />
          
          <div className="mt-8 text-center">
            <Link to="/events">
              <Button className="bg-ticket-orange hover:bg-ticket-orange/90">
                Découvrir plus d'événements
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default TicketGrid;
