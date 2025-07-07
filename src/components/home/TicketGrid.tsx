
import React, { useEffect, useState } from 'react';
import { Image as ImageIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { events } from '@/data/events';

const TicketGrid = () => {
  const ticketImages = events.map(event => ({
    id: event.id,
    image: event.image,
    title: event.title,
    category: event.category
  }));

  // État pour suivre la catégorie sélectionnée pour les recommandations
  const [selectedCategory, setSelectedCategory] = useState<string>("Concerts");

  // Recommandations basées sur la catégorie sélectionnée
  const recommendedEvents = events.filter(event => event.category === selectedCategory).slice(0, 4);
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

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

    // Set initial current slide and total slides
    setCurrent(api.selectedScrollSnap());
    setTotalSlides(api.scrollSnapList().length);
  }, [api]);
  
  const handleDotClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  // Create fixed number of 6 buttons
  const renderNavButtons = () => {
    // Create exactly 6 buttons
    const buttons = [];
    for (let i = 0; i < 6; i++) {
      // Calculate which slide this button corresponds to
      const slideIndex = Math.floor(i * (totalSlides / 6));
      buttons.push(
        <button 
          key={i} 
          onClick={() => handleDotClick(slideIndex)} 
          className={`h-1 rounded-none transition-all ${
            current === slideIndex || 
            i === 5 && current >= slideIndex || 
            i < 5 && current >= slideIndex && current < Math.floor((i + 1) * (totalSlides / 6)) 
              ? "w-6 bg-ticket-orange" 
              : "w-6 bg-gray-300"
          }`} 
          aria-label={`Go to slide group ${i + 1}`} 
        />
      );
    }
    return buttons;
  };

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

          <div className="max-w-6xl mx-auto px-8">
            <Carousel className="w-full" setApi={setApi}>
              <CarouselContent>
                {ticketImages.map(item => (
                  <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/4">
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
              
              {/* Fixed 6 dot indicators styled as lines */}
              <div className="flex items-center justify-center gap-3 mt-6">
                {totalSlides > 0 && renderNavButtons()}
              </div>
            </Carousel>

            <div className="mt-8 text-center">
              <Link to="/events">
                
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section des recommandations personnalisées avec hauteur uniforme */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-3">Recommandations pour vous</h2>
            <p className="text-gray-600 max-w-2xl">
              Découvrez des événements similaires à ceux que vous aimez
            </p>
            
            {/* Sélecteur de catégories pour personnaliser les recommandations */}
            <div className="flex flex-wrap gap-2 mt-4">
              {['Concerts', 'Festivals', 'Sports', 'Théâtre', 'Expositions', 'Conférences'].map(category => (
                <Button 
                  key={category} 
                  variant={selectedCategory === category ? "default" : "outline"} 
                  className={selectedCategory === category ? "bg-ticket-purple hover:bg-ticket-purple/90" : "border-gray-200"} 
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedEvents.map(event => (
              <Link key={event.id} to={`/event/${event.id}`} className="block group h-full">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  <CardContent className="p-0 relative flex flex-col h-full">
                    <div className="h-48 overflow-hidden flex-shrink-0">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <span className="text-xs font-medium text-ticket-purple bg-ticket-purple/10 px-2 py-1 rounded-full w-fit mb-2">
                        {event.category}
                      </span>
                      <h3 className="font-bold mb-2 group-hover:text-ticket-purple transition-colors line-clamp-2 flex-grow">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-1">
                        {event.venue}, {event.location}
                      </p>
                      <div className="flex justify-between items-center mt-auto">
                        <span className="font-bold text-ticket-purple">{event.price.toFixed(2)}€</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
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
