
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Filter, Download } from "lucide-react";
import { useTransactions } from "@/context/TransactionsContext";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const AdminSales = () => {
  const { transactions } = useTransactions();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Historique des Ventes</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter className="h-4 w-4" />
              Filtrer
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Download className="h-4 w-4" />
              Exporter
            </Button>
          </div>
        </div>
        <CardDescription>
          Toutes les transactions - {transactions.length} au total
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Articles</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id.substring(0, 8)}...</TableCell>
                  <TableCell>
                    {format(new Date(transaction.date), 'dd/MM/yyyy HH:mm', { locale: fr })}
                  </TableCell>
                  <TableCell>{transaction.customerName}</TableCell>
                  <TableCell>{transaction.customerEmail}</TableCell>
                  <TableCell>
                    {transaction.items.reduce((total, item) => total + item.quantity, 0)} tickets
                  </TableCell>
                  <TableCell>{transaction.totalAmount.toFixed(2)} €</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {transaction.status === 'completed' ? 'Complété' : 
                        transaction.status === 'pending' ? 'En attente' : 'Échoué'}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                  Aucune transaction enregistrée
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminSales;
