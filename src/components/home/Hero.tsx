
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Ticket } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-ticket-purple/90 to-ticket-purple py-16 md:py-24">
      {/* Cercles décoratifs */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-ticket-orange/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-ticket-purple/30 rounded-full blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-fade-in">
              Découvrez les<br />
              <span className="text-ticket-orange">meilleurs événements</span><br />
              près de chez vous
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-lg animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Concerts, festivals, sports, théâtre... Trouvez et réservez facilement des billets pour les événements qui vous passionnent.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Button className="btn-gradient px-8 py-6 text-lg">
                Découvrir les événements
              </Button>
              <Link to="/events">
                <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg">
                  Voir tout
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center">
                <Ticket className="text-ticket-orange mr-2" />
                <span>Billets sécurisés</span>
              </div>
              <div className="flex items-center">
                <Calendar className="text-ticket-orange mr-2" />
                <span>Événements exclusifs</span>
              </div>
              <div className="flex items-center">
                <MapPin className="text-ticket-orange mr-2" />
                <span>Partout en France</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-ticket-purple/60 to-transparent"></div>
              <img
                src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                alt="Concert"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute bottom-8 left-8 right-8 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-ticket-purple">Festival Électro Summer</h3>
                    <p className="text-gray-600 flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-1" /> 15 juillet 2024
                    </p>
                  </div>
                  <Link to="/event/1">
                    <Button className="bg-ticket-purple hover:bg-ticket-purple/90">
                      Voir les billets
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
