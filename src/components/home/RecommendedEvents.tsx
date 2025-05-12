
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { events } from '@/data/events';

const RecommendedEvents = () => {
  // State for tracking selected category for recommendations
  const [selectedCategory, setSelectedCategory] = useState<string>("Concerts");
  
  // Recommendations based on selected category
  const recommendedEvents = events
    .filter(event => event.category === selectedCategory)
    .slice(0, 4);

  return (
    <>
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-3">Recommandations pour vous</h2>
        <p className="text-gray-600 max-w-2xl">
          Découvrez des événements similaires à ceux que vous aimez
        </p>
        
        {/* Category selector for personalized recommendations */}
        <div className="flex flex-wrap gap-2 mt-4">
          {['Concerts', 'Festivals', 'Sports', 'Théâtre', 'Expositions', 'Conférences'].map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={selectedCategory === category 
                ? "bg-ticket-purple hover:bg-ticket-purple/90" 
                : "border-gray-200"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedEvents.map(event => (
          <Link key={event.id} to={`/event/${event.id}`} className="block group">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-0 relative">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-ticket-purple bg-ticket-purple/10 px-2 py-1 rounded-full">
                    {event.category}
                  </span>
                  <h3 className="font-bold mt-2 group-hover:text-ticket-purple transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {event.venue}, {event.location}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="font-bold text-ticket-purple">{event.price.toFixed(2)}€</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default RecommendedEvents;
