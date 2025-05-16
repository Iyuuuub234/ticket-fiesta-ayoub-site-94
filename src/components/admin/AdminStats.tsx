
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Calendar, Users, ShoppingBag } from "lucide-react";
import { events } from "@/data/events";
import { useTransactions } from "@/context/TransactionsContext";

const AdminStats = () => {
  const { transactions, users } = useTransactions();

  // Calculer le montant total des ventes
  const totalSales = transactions.reduce((total, tx) => total + tx.totalAmount, 0);
  
  // Calculer le nombre total de tickets vendus
  const totalTickets = transactions.reduce(
    (total, tx) => total + tx.items.reduce((sum, item) => sum + item.quantity, 0), 
    0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Ventes Totales</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€{totalSales.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {transactions.length > 0 ? '+20.1% par rapport au mois dernier' : 'Aucune vente ce mois-ci'}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Événements</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{events.length}</div>
          <p className="text-xs text-muted-foreground">12 événements à venir</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{users.length}</div>
          <p className="text-xs text-muted-foreground">
            {users.length > 0 ? `+${users.length} nouveaux utilisateurs` : 'Aucun utilisateur'}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Tickets Vendus</CardTitle>
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTickets}</div>
          <p className="text-xs text-muted-foreground">
            {transactions.length > 0 ? '+5.2% par rapport au mois dernier' : 'Aucun ticket vendu ce mois-ci'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;
