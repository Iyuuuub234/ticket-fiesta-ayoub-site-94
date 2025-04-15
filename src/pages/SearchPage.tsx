
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EventCard from '@/components/events/EventCard';
import SearchBar from '@/components/ui/SearchBar';
import { searchEvents } from '@/data/events';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const searchResults = searchEvents(query);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-8 bg-gradient-to-br from-ticket-purple/90 to-ticket-purple text-white">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Résultats de recherche
            </h1>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <SearchBar initialQuery={query} onSearch={q => window.location.href = `/search?q=${encodeURIComponent(q)}`} />
            </div>
          </div>
        </section>

        <section className="py-8 bg-gray-50">
          <div className="container-custom">
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun résultat trouvé</h3>
                <p className="text-gray-600">
                  Essayez d'autres mots-clés ou parcourez nos catégories d'événements.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
