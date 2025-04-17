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
  getItemPrice: (price: number, quantity: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const calculatePriceWithDiscount = (basePrice: number, quantity: number): number => {
  if (quantity >= 4) return basePrice * 0.8; // 20% de réduction pour 4 billets ou plus
  if (quantity === 3) return basePrice * 0.85; // 15% de réduction pour 3 billets
  if (quantity === 2) return basePrice * 0.9; // 10% de réduction pour 2 billets
  return basePrice; // Prix normal pour 1 billet
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

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

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (event: Event, quantity: number) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.event.id === event.id);
      
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        const newPrice = calculatePriceWithDiscount(event.price, updatedItems[existingItemIndex].quantity);
        toast({
          title: 'Panier mis à jour',
          description: `${event.title} - Quantité: ${updatedItems[existingItemIndex].quantity} - Prix unitaire: ${newPrice.toFixed(2)}€`,
        });
        return updatedItems;
      } else {
        const newPrice = calculatePriceWithDiscount(event.price, quantity);
        toast({
          title: 'Ajouté au panier',
          description: `${event.title} - Quantité: ${quantity} - Prix unitaire: ${newPrice.toFixed(2)}€`,
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

  const getItemPrice = (price: number, quantity: number): number => {
    return calculatePriceWithDiscount(price, quantity);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const priceWithDiscount = calculatePriceWithDiscount(item.event.price, item.quantity);
      return total + (priceWithDiscount * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      getTotalItems, 
      getTotalPrice,
      getItemPrice
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
