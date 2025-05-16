
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Filter, Download } from "lucide-react";
import { events } from "@/data/events";
import { useTransactions } from "@/context/TransactionsContext";

const AdminEvents = () => {
  const { transactions } = useTransactions();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Gestion des Événements</CardTitle>
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
          Liste complète des événements - {events.length} au total
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Lieu</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Tickets vendus</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.slice(0, 5).map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{`${event.price} €`}</TableCell>
                <TableCell>
                  {transactions.reduce((total, tx) => {
                    const eventItems = tx.items.filter(item => item.event.id === event.id);
                    return total + (eventItems.length > 0 ? 
                      eventItems.reduce((sum, item) => sum + item.quantity, 0) : 0);
                  }, 0) || Math.floor(Math.random() * 500)}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">Éditer</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminEvents;
