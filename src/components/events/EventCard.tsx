import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Event } from '@/data/events';
import { useCart } from '@/context/CartContext';
import { formatDate } from '@/lib/utils';
interface EventCardProps {
  event: Event;
}
const EventCard: React.FC<EventCardProps> = ({
  event
}) => {
  const {
    addToCart
  } = useCart();
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(event, 1);
  };
  return <div className="event-card group animate-scale-in">
      <Link to={`/event/${event.id}`} className="block">
        <div className="relative overflow-hidden">
          <div className="h-48 overflow-hidden">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
          <div className="absolute top-3 left-3">
            <Badge className="bg-ticket-purple hover:bg-ticket-purple/90">{event.category}</Badge>
          </div>
          {event.featured && <div className="absolute top-3 right-3">
              <Badge className="bg-ticket-orange hover:bg-ticket-orange/90">À la une</Badge>
            </div>}
        </div>
        
        <div className="p-4\n">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Calendar className="w-4 h-4 mr-1" /> 
            {formatDate(event.date)} - {event.time}
          </div>
          <h3 className="font-bold text-lg mb-1 line-clamp-1 group-hover:text-ticket-purple transition-colors">
            {event.title}
          </h3>
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-1" /> 
            {event.venue}, {event.location}
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-ticket-purple">{event.price.toFixed(2)}€</span>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="text-xs border-ticket-purple text-ticket-purple hover:bg-ticket-purple/10" onClick={handleAddToCart}>
                Ajouter au panier
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>;
};
export default EventCard;