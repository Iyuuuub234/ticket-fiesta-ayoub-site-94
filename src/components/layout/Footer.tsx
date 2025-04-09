
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-display font-bold bg-gradient-to-r from-ticket-purple to-ticket-orange bg-clip-text text-transparent">
              Ticket Fiesta
            </Link>
            <p className="mt-4 text-gray-400">
              Votre plateforme pour découvrir et réserver des billets pour les meilleurs événements.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-white transition-colors">
                  Événements
                </Link>
              </li>
              <li>
                <Link to="/events?category=Concerts" className="text-gray-400 hover:text-white transition-colors">
                  Concerts
                </Link>
              </li>
              <li>
                <Link to="/events?category=Festivals" className="text-gray-400 hover:text-white transition-colors">
                  Festivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Catégories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Catégories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/events?category=Sports" className="text-gray-400 hover:text-white transition-colors">
                  Sports
                </Link>
              </li>
              <li>
                <Link to="/events?category=Théâtre" className="text-gray-400 hover:text-white transition-colors">
                  Théâtre
                </Link>
              </li>
              <li>
                <Link to="/events?category=Expositions" className="text-gray-400 hover:text-white transition-colors">
                  Expositions
                </Link>
              </li>
              <li>
                <Link to="/events?category=Conférences" className="text-gray-400 hover:text-white transition-colors">
                  Conférences
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-gray-400" />
                <a href="mailto:contact@ticketfiesta.com" className="text-gray-400 hover:text-white transition-colors">
                  contact@ticketfiesta.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-gray-400" />
                <a href="tel:+33123456789" className="text-gray-400 hover:text-white transition-colors">
                  +33 1 23 45 67 89
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Ticket Fiesta. Tous droits réservés. Projet de fin d'études par Ayoub.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
