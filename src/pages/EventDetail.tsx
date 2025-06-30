
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Info, Ticket, ChevronRight, Heart, Users } from 'lucide-react';
import { useEvents } from '@/context/EventsContext';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useToast } from '@/hooks/use-toast';
import EventCard from '@/components/events/EventCard';
import { formatDate } from '@/lib/utils';
import EventSharingButtons from '@/components/events/EventSharingButtons';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEventById, getEventsByCategory } = useEvents();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isInFavorites } = useFavorites();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  
  // Récupérer les détails de l'événement
  const event = getEventById(id || '');
  
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container-custom py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Événement non trouvé</h1>
            <p className="mb-6">L'événement que vous recherchez n'existe pas ou a été supprimé.</p>
            <Button onClick={() => navigate('/events')}>
              Voir tous les événements
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Événements similaires
  const similarEvents = getEventsByCategory(event.category).filter(e => e.id !== event.id).slice(0, 4);
  
  const handleAddToCart = () => {
    addToCart(event, quantity);
  };
  
  const handleBuyNow = () => {
    addToCart(event, quantity);
    navigate('/cart');
  };

  // Handle toggle favorite
  const handleToggleFavorite = () => {
    const isFavorite = isInFavorites(event.id);
    if (isFavorite) {
      removeFromFavorites(event.id);
      toast({
        title: "Retiré des favoris",
        description: `${event.title} a été retiré de vos favoris`,
      });
    } else {
      addToFavorites(event);
      toast({
        title: "Ajouté aux favoris",
        description: `${event.title} a été ajouté à vos favoris`,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-br from-ticket-purple/90 to-ticket-purple py-6">
          <div className="container-custom">
            <div className="flex items-center text-sm text-gray-200 mb-2">
              <button onClick={() => navigate(-1)} className="hover:underline">Retour</button>
              <ChevronRight className="mx-1 w-4 h-4" />
              <button onClick={() => navigate('/events')} className="hover:underline">Événements</button>
              <ChevronRight className="mx-1 w-4 h-4" />
              <span>{event.category}</span>
            </div>
          </div>
        </div>
        
        <section className="py-8">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="relative rounded-xl overflow-hidden mb-6">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
                    <Calendar className="text-ticket-purple mr-2 w-5 h-5" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
                    <Clock className="text-ticket-purple mr-2 w-5 h-5" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
                    <MapPin className="text-ticket-purple mr-2 w-5 h-5" />
                    <span>{event.venue}, {event.location}</span>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-3 flex items-center">
                    <Info className="mr-2 text-ticket-purple" /> 
                    Description
                  </h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {event.description}
                  </p>
                </div>
                
                {similarEvents.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <Users className="mr-2 text-ticket-purple" /> 
                      Événements similaires
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {similarEvents.map((similarEvent) => (
                        <EventCard key={similarEvent.id} event={similarEvent} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 sticky top-24">
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-ticket-purple mb-1">{event.price.toFixed(2)}€</div>
                    <div className="text-sm text-gray-500">par billet, taxes incluses</div>
                  </div>
                  
                  <div className="py-4 border-t border-b border-gray-200 mb-4">
                    <div className="text-lg font-semibold mb-2">Sélectionner la quantité</div>
                    <div className="flex items-center">
                      <Button 
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        disabled={quantity <= 1}
                      >
                        -
                      </Button>
                      <span className="mx-4 font-medium w-6 text-center">{quantity}</span>
                      <Button 
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(prev => Math.min(10, prev + 1))}
                        disabled={quantity >= 10}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-3 mb-6">
                    <Button 
                      className="btn-gradient"
                      onClick={handleBuyNow}
                    >
                      <Ticket className="mr-2" /> Acheter maintenant
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-ticket-purple text-ticket-purple hover:bg-ticket-purple/10"
                      onClick={handleAddToCart}
                    >
                      Ajouter au panier
                    </Button>
                  </div>
                  
                  <div className="flex justify-between">
                    <EventSharingButtons eventId={event.id} eventTitle={event.title} />
                    <Button 
                      variant="ghost"
                      size="sm"
                      className={`${
                        isInFavorites(event.id) 
                          ? "text-red-500 hover:text-gray-600" 
                          : "text-gray-600 hover:text-red-500"
                      }`}
                      onClick={handleToggleFavorite}
                    >
                      <Heart className={`w-4 h-4 mr-1 ${isInFavorites(event.id) ? "fill-current" : ""}`} />
                      {isInFavorites(event.id) ? "Retiré des favoris" : "Ajouter aux favoris"}
                    </Button>
                  </div>
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

export default EventDetail;
