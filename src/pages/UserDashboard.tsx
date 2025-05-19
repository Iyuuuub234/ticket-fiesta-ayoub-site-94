
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Calendar, Ticket, User, Bookmark } from 'lucide-react';

const UserDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Tableau de Bord Utilisateur</h1>
            <Button variant="outline" onClick={() => navigate('/')}>
              Retour au site
            </Button>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <div className="flex items-center space-x-4">
              <div className="bg-ticket-purple text-white p-4 rounded-full">
                <User size={24} />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Ticket className="mr-2 text-ticket-purple" size={20} />
                  Mes Billets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">0</p>
                <p className="text-sm text-gray-500">Billets achetés</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="mr-2 text-ticket-orange" size={20} />
                  Événements à venir
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">0</p>
                <p className="text-sm text-gray-500">Événements planifiés</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Bookmark className="mr-2 text-green-500" size={20} />
                  Événements sauvegardés
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">0</p>
                <p className="text-sm text-gray-500">Dans vos favoris</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Événements recommandés</CardTitle>
              <CardDescription>Basé sur vos préférences et achats précédents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 p-4 rounded text-center">
                <p>Aucun événement recommandé pour le moment.</p>
                <Button variant="link" onClick={() => navigate('/events')}>
                  Explorer les événements
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboard;
