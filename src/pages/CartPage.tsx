
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, ChevronLeft, Ticket } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatDate } from '@/lib/utils';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-6 flex items-center">
            <ShoppingCart className="mr-2" /> Mon panier
          </h1>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {items.map((item) => (
                  <div 
                    key={item.event.id} 
                    className="bg-white rounded-xl border border-gray-200 p-4 mb-4 flex flex-col sm:flex-row items-start sm:items-center"
                  >
                    <div className="w-full sm:w-24 h-24 mr-4 flex-shrink-0 mb-3 sm:mb-0">
                      <img 
                        src={item.event.image} 
                        alt={item.event.title} 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-grow">
                      <Link to={`/event/${item.event.id}`} className="font-bold text-lg hover:text-ticket-purple">
                        {item.event.title}
                      </Link>
                      <div className="text-sm text-gray-600 mb-2">
                        {formatDate(item.event.date)} - {item.event.time}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {item.event.venue}, {item.event.location}
                      </div>
                    </div>
                    <div className="flex flex-col items-end mt-3 sm:mt-0">
                      <div className="font-bold text-ticket-purple mb-2">
                        {(item.event.price * item.quantity).toFixed(2)}€
                      </div>
                      <div className="flex items-center mb-2">
                        <Button 
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.event.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span className="mx-2 font-medium w-6 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.event.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                      <Button 
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeFromCart(item.event.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Supprimer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 sticky top-24">
                  <h2 className="text-xl font-bold mb-4">Résumé de la commande</h2>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sous-total</span>
                      <span>{getTotalPrice().toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frais de service</span>
                      <span>0.00€</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mb-6">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{getTotalPrice().toFixed(2)}€</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Button 
                      className="btn-gradient w-full"
                      onClick={() => navigate('/checkout')}
                    >
                      <Ticket className="mr-2" /> Passer la commande
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full border-ticket-purple text-ticket-purple hover:bg-ticket-purple/10"
                      onClick={() => navigate('/events')}
                    >
                      Continuer les achats
                    </Button>
                    <Button 
                      variant="ghost"
                      className="w-full text-red-500 hover:text-red-700"
                      onClick={clearCart}
                    >
                      Vider le panier
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <div className="flex justify-center">
                <ShoppingCart className="w-20 h-20 text-gray-300 mb-4" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Votre panier est vide</h2>
              <p className="text-gray-600 mb-6">Ajoutez des billets d'événements pour les retrouver ici.</p>
              <Link to="/events">
                <Button className="bg-ticket-purple hover:bg-ticket-purple/90">
                  <ChevronLeft className="mr-2" /> Continuer les achats
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
