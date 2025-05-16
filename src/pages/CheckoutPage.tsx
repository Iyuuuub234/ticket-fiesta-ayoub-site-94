
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Check, ShieldCheck, Clock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useTransactions } from '@/context/TransactionsContext';
import { toast } from '@/components/ui/use-toast';

const CheckoutPage = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { addTransaction } = useTransactions();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler un temps de traitement
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Ajouter la transaction au contexte
      addTransaction({
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        items: items,
        totalAmount: getTotalPrice(),
        status: 'completed'
      });
      
      clearCart();
      toast({
        title: "Commande confirmée!",
        description: "Vos billets ont été réservés avec succès.",
      });
      navigate('/checkout/success');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-6">Finaliser votre commande</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Informations personnelles</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input 
                        id="firstName" 
                        required 
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input 
                        id="lastName" 
                        required 
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input 
                        id="phone" 
                        required 
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <h2 className="text-xl font-bold mb-4">Informations de paiement</h2>
                  <div className="space-y-4 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Numéro de carte</Label>
                      <div className="relative">
                        <Input 
                          id="cardNumber" 
                          placeholder="1234 5678 9012 3456" 
                          required 
                        />
                        <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Date d'expiration</Label>
                        <Input id="expiry" placeholder="MM/AA" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nameOnCard">Nom sur la carte</Label>
                      <Input id="nameOnCard" required />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-6">
                    <input
                      type="checkbox"
                      id="terms"
                      className="h-4 w-4 text-ticket-purple border-gray-300 rounded focus:ring-ticket-purple"
                      required
                    />
                    <Label htmlFor="terms" className="text-sm">
                      J'accepte les conditions générales de vente et la politique de confidentialité
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="btn-gradient w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="mr-2 animate-spin" /> Traitement en cours...
                      </>
                    ) : (
                      <>
                        Confirmer la commande - {getTotalPrice().toFixed(2)}€
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Résumé de la commande</h2>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.event.id} className="flex justify-between">
                      <div>
                        <div className="font-medium">{item.event.title}</div>
                        <div className="text-sm text-gray-600">
                          {item.quantity} {item.quantity > 1 ? 'billets' : 'billet'} x {item.event.price.toFixed(2)}€
                        </div>
                      </div>
                      <div className="font-medium">
                        {(item.event.price * item.quantity).toFixed(2)}€
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Sous-total</span>
                    <span>{getTotalPrice().toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Frais de service</span>
                    <span>0.00€</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{getTotalPrice().toFixed(2)}€</span>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start">
                    <ShieldCheck className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Paiement sécurisé avec cryptage SSL 256 bits</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Billets électroniques envoyés par email après confirmation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
