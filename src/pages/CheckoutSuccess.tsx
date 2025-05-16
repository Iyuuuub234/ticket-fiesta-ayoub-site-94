
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, Mail, Download, Calendar } from 'lucide-react';
import { useTransactions } from '@/context/TransactionsContext';

const CheckoutSuccess = () => {
  // Récupérer la dernière transaction
  const { transactions } = useTransactions();
  const latestTransaction = transactions.length > 0 ? transactions[0] : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-20 h-20 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Commande confirmée !</h1>
            <p className="text-lg text-gray-600 mb-8">
              Merci pour votre achat. Vos billets ont été réservés avec succès et vous ont été envoyés par email.
            </p>

            {latestTransaction && (
              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                <h3 className="font-bold text-lg mb-3">Détails de la commande</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Numéro de commande:</span>
                    <span className="font-medium">{latestTransaction.id.substring(0, 8)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">
                      {new Date(latestTransaction.date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-medium">{latestTransaction.totalAmount.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Statut:</span>
                    <span className="font-medium text-green-600">Payée</span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-ticket-purple mr-2" />
                <span className="font-medium">Un e-mail de confirmation a été envoyé</span>
              </div>
              <p className="text-sm text-gray-600">
                Consultez votre boîte de réception pour plus de détails sur votre commande.
                Si vous ne trouvez pas l'email, vérifiez votre dossier spam.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Button className="bg-ticket-purple hover:bg-ticket-purple/90">
                <Download className="mr-2" /> Télécharger les billets
              </Button>
              <Button variant="outline" className="border-ticket-purple text-ticket-purple hover:bg-ticket-purple/10">
                <Calendar className="mr-2" /> Ajouter au calendrier
              </Button>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                Vous avez des questions sur votre commande ?
              </p>
              <Link to="/" className="text-ticket-purple hover:underline font-medium">
                Contactez notre service client
              </Link>
            </div>
          </div>

          <div className="text-center mt-8">
            <h2 className="text-xl font-bold mb-4">Et maintenant ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="bg-ticket-purple/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="text-ticket-purple" />
                </div>
                <h3 className="font-bold mb-2">Marquez votre calendrier</h3>
                <p className="text-sm text-gray-600">
                  N'oubliez pas de noter la date et l'heure de votre événement.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="bg-ticket-purple/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="text-ticket-purple" />
                </div>
                <h3 className="font-bold mb-2">Gardez vos billets</h3>
                <p className="text-sm text-gray-600">
                  Conservez vos billets électroniques pour les présenter à l'entrée.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="bg-ticket-purple/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="text-ticket-purple" />
                </div>
                <h3 className="font-bold mb-2">Restez informé</h3>
                <p className="text-sm text-gray-600">
                  Surveillez votre email pour d'éventuelles mises à jour concernant l'événement.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/events">
              <Button variant="link" className="text-ticket-purple">
                Découvrir d'autres événements
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
