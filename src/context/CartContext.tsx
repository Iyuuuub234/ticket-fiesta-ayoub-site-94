
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Event } from '../data/events';
import { toast } from '@/components/ui/use-toast';

export interface CartItem {
  event: Event;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (event: Event, quantity: number) => void;
  removeFromCart: (eventId: string) => void;
  updateQuantity: (eventId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Charger le panier depuis le localStorage au démarrage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Erreur lors du chargement du panier:', error);
      }
    }
  }, []);

  // Sauvegarder le panier dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (event: Event, quantity: number) => {
    setItems(prevItems => {
      // Vérifier si l'événement est déjà dans le panier
      const existingItemIndex = prevItems.findIndex(item => item.event.id === event.id);
      
      if (existingItemIndex !== -1) {
        // Mettre à jour la quantité si l'événement existe déjà
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast({
          title: 'Panier mis à jour',
          description: `${event.title} - Quantité: ${updatedItems[existingItemIndex].quantity}`,
        });
        return updatedItems;
      } else {
        // Ajouter le nouvel événement au panier
        toast({
          title: 'Ajouté au panier',
          description: `${event.title} - Quantité: ${quantity}`,
        });
        return [...prevItems, { event, quantity }];
      }
    });
  };

  const removeFromCart = (eventId: string) => {
    setItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.event.id !== eventId);
      toast({
        title: 'Article retiré',
        description: "L'article a été retiré du panier",
      });
      return updatedItems;
    });
  };

  const updateQuantity = (eventId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(eventId);
      return;
    }

    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.event.id === eventId) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: 'Panier vidé',
      description: "Tous les articles ont été retirés du panier",
    });
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.event.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      getTotalItems, 
      getTotalPrice 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
