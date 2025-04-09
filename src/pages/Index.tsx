
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedEvents from '@/components/home/FeaturedEvents';
import SearchBar from '@/components/ui/SearchBar';
import { useNavigate } from 'react-router-dom';
import { Categories } from '@/components/events/Categories';
import { categories } from '@/data/events';

const Index = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/events?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-6">Trouvez votre prochain événement</h2>
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-center mb-8">Parcourir par catégorie</h2>
            <Categories categories={categories} />
          </div>
        </section>
        
        <FeaturedEvents />
        
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="bg-gradient-to-r from-ticket-purple to-ticket-orange rounded-2xl overflow-hidden shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ne manquez aucun événement !</h2>
                  <p className="text-white/80 mb-6">
                    Recevez en avant-première les annonces d'événements et bénéficiez d'offres exclusives.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="email" 
                      placeholder="Votre email"
                      className="px-4 py-3 rounded-md focus:outline-none"
                    />
                    <button className="bg-white text-ticket-purple font-medium px-6 py-3 rounded-md hover:bg-white/90 transition-colors">
                      S'inscrire
                    </button>
                  </div>
                </div>
                <div className="hidden md:block">
                  <img 
                    src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" 
                    alt="Concert" 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
