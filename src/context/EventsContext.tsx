
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Event, events as initialEvents } from '@/data/events';

interface EventsContextType {
  events: Event[];
  addEvent: (event: Event) => void;
  updateEvent: (id: string, updatedEvent: Event) => void;
  deleteEvent: (id: string) => void;
  getEventById: (id: string) => Event | undefined;
  getEventsByCategory: (category: string) => Event[];
  getFeaturedEvents: () => Event[];
  searchEvents: (query: string) => Event[];
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(initialEvents);

  const addEvent = (event: Event) => {
    setEvents(prevEvents => [event, ...prevEvents]);
  };

  const updateEvent = (id: string, updatedEvent: Event) => {
    setEvents(prevEvents => 
      prevEvents.map(event => event.id === id ? updatedEvent : event)
    );
  };

  const deleteEvent = (id: string) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
  };

  const getEventById = (id: string): Event | undefined => {
    return events.find(event => event.id === id);
  };

  const getEventsByCategory = (category: string): Event[] => {
    if (category === "Tous") return events;
    return events.filter(event => event.category === category);
  };

  const getFeaturedEvents = (): Event[] => {
    return events.filter(event => event.featured);
  };

  const searchEvents = (query: string): Event[] => {
    const lowercaseQuery = query.toLowerCase();
    return events.filter(
      event => 
        event.title.toLowerCase().includes(lowercaseQuery) ||
        event.location.toLowerCase().includes(lowercaseQuery) ||
        event.category.toLowerCase().includes(lowercaseQuery) ||
        event.venue.toLowerCase().includes(lowercaseQuery)
    );
  };

  return (
    <EventsContext.Provider value={{
      events,
      addEvent,
      updateEvent,
      deleteEvent,
      getEventById,
      getEventsByCategory,
      getFeaturedEvents,
      searchEvents
    }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};
