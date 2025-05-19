
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const { getTotalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const goToDashboard = () => {
    if (user?.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-3">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-display font-bold bg-gradient-to-r from-ticket-purple to-ticket-orange bg-clip-text text-transparent">
              Ticket Time
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

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-700 hover:text-ticket-purple relative">
                    <User size={20} />
                    {user?.role === 'admin' && (
                      <span className="absolute -top-1 -right-1 bg-ticket-purple text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center">
                        A
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={goToDashboard}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Tableau de bord</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" className="ml-4" onClick={() => navigate('/login')}>
                <LogIn className="mr-2 h-4 w-4" />
                Connexion
              </Button>
            )}
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

            {isAuthenticated ? (
              <Button variant="ghost" size="icon" className="text-gray-700" onClick={goToDashboard}>
                <User size={20} />
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                <LogIn size={20} />
              </Button>
            )}

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
                  {isAuthenticated && (
                    <>
                      <div className="border-t border-gray-200 pt-6">
                        <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                          <LogOut className="mr-2 h-4 w-4" />
                          Déconnexion
                        </Button>
                      </div>
                    </>
                  )}
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
