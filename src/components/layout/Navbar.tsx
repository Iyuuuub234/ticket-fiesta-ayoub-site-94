
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet';

const Navbar: React.FC = () => {
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-3">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-display font-bold bg-gradient-to-r from-ticket-purple to-ticket-orange bg-clip-text text-transparent">
              Ticket Fiesta
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-ticket-purple font-medium transition-colors">
              Accueil
            </Link>
            <Link to="/events" className="text-gray-700 hover:text-ticket-purple font-medium transition-colors">
              Événements
            </Link>
            <Link to="/events?category=Concerts" className="text-gray-700 hover:text-ticket-purple font-medium transition-colors">
              Concerts
            </Link>
            <Link to="/events?category=Festivals" className="text-gray-700 hover:text-ticket-purple font-medium transition-colors">
              Festivals
            </Link>
          </div>

          {/* Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/search">
              <Button variant="ghost" size="icon" className="text-gray-700 hover:text-ticket-purple">
                <Search size={20} />
              </Button>
            </Link>
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-gray-700 hover:text-ticket-purple">
                <ShoppingCart size={20} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-ticket-orange text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-3 md:hidden">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-gray-700">
                <ShoppingCart size={20} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-ticket-orange text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col space-y-6 mt-8">
                  <Link to="/" className="text-lg font-medium hover:text-ticket-purple">
                    Accueil
                  </Link>
                  <Link to="/events" className="text-lg font-medium hover:text-ticket-purple">
                    Événements
                  </Link>
                  <Link to="/events?category=Concerts" className="text-lg font-medium hover:text-ticket-purple">
                    Concerts
                  </Link>
                  <Link to="/events?category=Festivals" className="text-lg font-medium hover:text-ticket-purple">
                    Festivals
                  </Link>
                  <Link to="/search" className="text-lg font-medium hover:text-ticket-purple">
                    Recherche
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
