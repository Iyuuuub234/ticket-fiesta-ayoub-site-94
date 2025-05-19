
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Event } from '@/data/events';
import { useAuth } from '@/context/AuthContext';

interface FavoritesContextType {
  favorites: Event[];
  addToFavorites: (event: Event) => void;
  removeFromFavorites: (eventId: string) => void;
  isInFavorites: (eventId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  isInFavorites: () => false,
});

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Event[]>([]);
  const { user } = useAuth();
  
  // Load favorites from localStorage on component mount
  useEffect(() => {
    if (user) {
      const storedFavorites = localStorage.getItem(`favorites-${user.email}`);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    }
  }, [user]);
  
  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`favorites-${user.email}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);
  
  // Add an event to favorites
  const addToFavorites = (event: Event) => {
    setFavorites(prevFavorites => {
      if (!prevFavorites.some(fav => fav.id === event.id)) {
        return [...prevFavorites, event];
      }
      return prevFavorites;
    });
  };
  
  // Remove an event from favorites
  const removeFromFavorites = (eventId: string) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(event => event.id !== eventId)
    );
  };
  
  // Check if an event is in favorites
  const isInFavorites = (eventId: string) => {
    return favorites.some(event => event.id === eventId);
  };
  
  return (
    <FavoritesContext.Provider 
      value={{ favorites, addToFavorites, removeFromFavorites, isInFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
