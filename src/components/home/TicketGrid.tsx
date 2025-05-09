
import React, { useEffect, useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { events } from '@/data/events';

const TicketGrid = () => {
  const ticketImages = events.map(event => ({
    id: event.id,
    image: event.image,
    title: event.title
  }));

  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = useState(0);
  
  // Setup auto-slide functionality
  useEffect(() => {
    if (!api) return;
    
    // Start autoplay with 3-second intervals
    const autoplayInterval = setInterval(() => {
      api.scrollNext();
    }, 3000);
    
    // Clear the interval when component unmounts
    return () => clearInterval(autoplayInterval);
  }, [api]);

  useEffect(() => {
    if (!api) return;
    
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });

    // Set initial current slide
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  const handleDotClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">Nos tickets en vedette</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de billets pour les événements les plus attendus
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-8">
          <Carousel className="w-full" setApi={setApi}>
            <CarouselContent>
              {ticketImages.map(item => <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                  <Link to={`/event/${item.id}`}>
                    <div className="p-1">
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                        <CardContent className="p-0 relative group">
                          <div className="h-64 overflow-hidden">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
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
                </CarouselItem>)}
            </CarouselContent>
            
            {/* Custom dot indicators styled as lines */}
            <div className="flex items-center justify-center gap-3 mt-6">
              {ticketImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-1 rounded-none transition-all ${
                    current === index 
                      ? "w-6 bg-ticket-orange" 
                      : "w-6 bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </Carousel>

          <div className="mt-8 text-center">
            <Link to="/events">
              
            </Link>
          </div>
        </div>
      </div>
    </section>;
};
export default TicketGrid;
