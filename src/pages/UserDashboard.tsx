
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useTransactions } from '@/context/TransactionsContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Calendar, Ticket, User, Bookmark, ShoppingCart } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const UserDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { transactions } = useTransactions();
  const navigate = useNavigate();

  // Filter transactions for the current user
  const userTransactions = transactions.filter(
    transaction => user && transaction.customerEmail === user.email
  );

  // Calculate total tickets purchased
  const totalTickets = userTransactions.reduce(
    (total, transaction) => 
      total + transaction.items.reduce((sum, item) => sum + item.quantity, 0), 
    0
  );

  // Count upcoming events (assuming all purchased events are upcoming for demo)
  const upcomingEvents = userTransactions.reduce(
    (total, transaction) => 
      total + transaction.items.length, 
    0
  );

  useEffect(() => {
    // Redirect to login page if user is not authenticated
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
                <p className="text-3xl font-bold">{totalTickets}</p>
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
                <p className="text-3xl font-bold">{upcomingEvents}</p>
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

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <ShoppingCart className="mr-2 text-blue-500" size={20} />
                  Commandes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{userTransactions.length}</p>
                <p className="text-sm text-gray-500">Total des achats</p>
              </CardContent>
            </Card>
          </div>

          {userTransactions.length > 0 ? (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Historique des achats</CardTitle>
                <CardDescription>Détail de vos commandes précédentes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>N° Commande</TableHead>
                      <TableHead>Événements</TableHead>
                      <TableHead>Billets</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          {new Date(transaction.date).toLocaleDateString('fr-FR')}
                        </TableCell>
                        <TableCell className="font-medium">
                          {transaction.id.substring(0, 8)}...
                        </TableCell>
                        <TableCell>
                          {transaction.items.map(item => item.event.title).join(", ")}
                        </TableCell>
                        <TableCell>
                          {transaction.items.reduce((sum, item) => sum + item.quantity, 0)}
                        </TableCell>
                        <TableCell className="text-right">
                          {transaction.totalAmount.toFixed(2)}€
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Historique des achats</CardTitle>
                <CardDescription>Vous n'avez pas encore effectué d'achat</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 p-4 rounded text-center">
                  <p>Aucun achat trouvé dans votre historique.</p>
                  <Button variant="link" onClick={() => navigate('/events')}>
                    Explorer les événements
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

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
