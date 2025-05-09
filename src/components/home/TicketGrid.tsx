
import React from 'react';
import { Ticket, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { events } from '@/data/events';

const TicketGrid = () => {
  const ticketImages = events.map(event => ({
    id: event.id,
    image: event.image,
    title: event.title
  }));

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">Nos tickets en vedette</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de billets pour les événements les plus attendus
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-8">
          <Carousel className="w-full">
            <CarouselContent>
              {ticketImages.map((item) => (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                  <Link to={`/event/${item.id}`}>
                    <div className="p-1">
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                        <CardContent className="p-0 relative group">
                          <div className="h-64 overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="secondary" size="sm" className="bg-white/80 backdrop-blur-sm">
                              <ImageIcon className="w-4 h-4 mr-2" />
                              Voir l'événement
                            </Button>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <h3 className="text-white font-medium text-lg truncate">{item.title}</h3>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center mt-4">
              <CarouselPrevious className="static translate-y-0 mr-2" />
              <CarouselNext className="static translate-y-0 ml-2" />
            </div>
          </Carousel>

          <div className="mt-8 text-center">
            <Link to="/events">
              <Button variant="outline" className="border-ticket-purple text-ticket-purple hover:bg-ticket-purple/10">
                Voir tous les événements
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TicketGrid;
