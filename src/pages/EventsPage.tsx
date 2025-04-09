
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EventCard from '@/components/events/EventCard';
import SearchBar from '@/components/ui/SearchBar';
import { 
  events, 
  categories, 
  getEventsByCategory,
  searchEvents
} from '@/data/events';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Filter } from 'lucide-react';

const EventsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [activeCategory, setActiveCategory] = useState('Tous');
  
  const categoryParam = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    let filtered = events;
    
    // Filtrer par catégorie si spécifiée
    if (categoryParam) {
      setActiveCategory(categoryParam);
      filtered = getEventsByCategory(categoryParam);
    } else {
      setActiveCategory('Tous');
    }
    
    // Filtrer par recherche si spécifiée
    if (searchQuery) {
      filtered = searchEvents(searchQuery);
    }
    
    setFilteredEvents(filtered);
  }, [categoryParam, searchQuery]);

  const handleSearch = (query: string) => {
    if (query) {
      setSearchParams({ search: query });
    } else {
      searchParams.delete('search');
      setSearchParams(searchParams);
    }
  };

  const handleCategoryChange = (category: string) => {
    if (category === 'Tous') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    searchParams.delete('search');
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-8 bg-gradient-to-br from-ticket-purple/90 to-ticket-purple text-white">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {categoryParam ? `${categoryParam}` : 'Tous les événements'}
            </h1>
            <p className="mb-6 max-w-2xl">
              Découvrez et réservez vos billets pour les événements qui vous passionnent.
            </p>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <SearchBar onSearch={handleSearch} placeholder="Rechercher un événement..." />
            </div>
          </div>
        </section>

        <section className="py-8 bg-gray-50">
          <div className="container-custom">
            <div className="flex items-center mb-6 overflow-x-auto py-2 scrollbar-hide">
              <Button
                onClick={() => handleCategoryChange('Tous')}
                variant={activeCategory === 'Tous' ? 'default' : 'outline'}
                className={`mr-2 whitespace-nowrap ${
                  activeCategory === 'Tous' 
                    ? 'bg-ticket-purple hover:bg-ticket-purple/90' 
                    : 'border-gray-200'
                }`}
              >
                Tous
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  variant={activeCategory === category ? 'default' : 'outline'}
                  className={`mr-2 whitespace-nowrap ${
                    activeCategory === category 
                      ? 'bg-ticket-purple hover:bg-ticket-purple/90' 
                      : 'border-gray-200'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">Aucun événement trouvé</h3>
                <p className="text-gray-600 mb-6">Essayez de modifier vos critères de recherche.</p>
                <Button onClick={() => handleCategoryChange('Tous')}>
                  Voir tous les événements
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EventsPage;
