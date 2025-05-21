
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  price: number;
  [key: string]: any;
}

interface EventsTableProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (event: Event) => void;
  getTicketsSold: (eventId: string) => number;
}

export const EventsTable = ({ events, onEdit, onDelete, getTicketsSold }: EventsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Lieu</TableHead>
          <TableHead>Prix</TableHead>
          <TableHead>Tickets vendus</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell className="font-medium">{event.title}</TableCell>
            <TableCell>{event.date}</TableCell>
            <TableCell>{event.location}</TableCell>
            <TableCell>{formatPrice(event.price)}</TableCell>
            <TableCell>{getTicketsSold(event.id)}</TableCell>
            <TableCell className="text-right space-x-2">
              <Button variant="ghost" size="sm" onClick={() => onEdit(event)}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Éditer</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(event)}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Supprimer</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
