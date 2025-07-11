
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Download } from "lucide-react";
import { useTransactions } from "@/context/TransactionsContext";
import { useEvents } from "@/context/EventsContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { EventForm, TicketFormValues } from "./EventForm";
import { EventsTable } from "./EventsTable";
import { DeleteEventDialog } from "./DeleteEventDialog";

const AdminEvents = () => {
  const { transactions } = useTransactions();
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Default values for the event form
  const defaultFormValues: TicketFormValues = {
    title: "",
    date: new Date().toISOString().split('T')[0],
    time: "19:00",
    location: "",
    venue: "",
    category: "Concerts",
    price: 0,
    description: "",
    featured: false,
  };

  const handleAddTicket = (data: TicketFormValues) => {
    const newEvent = {
      id: `event-${Date.now()}`,
      title: data.title,
      date: data.date,
      time: data.time,
      location: data.location,
      venue: data.venue,
      category: data.category,
      image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14",
      price: Number(data.price),
      description: data.description,
      featured: data.featured,
    };
    
    if (selectedEvent) {
      // Update existing event
      updateEvent(selectedEvent.id, { ...newEvent, id: selectedEvent.id });
      toast({
        title: "Ticket modifié",
        description: `Le ticket pour "${data.title}" a été modifié avec succès.`,
      });
    } else {
      // Add new event
      addEvent(newEvent);
      toast({
        title: "Ticket ajouté",
        description: `Le ticket pour "${data.title}" a été ajouté avec succès.`,
      });
    }
    
    setIsAddDialogOpen(false);
    setSelectedEvent(null);
  };

  const openEditDialog = (event: any) => {
    setSelectedEvent(event);
    setIsAddDialogOpen(true);
  };

  const openDeleteDialog = (event: any) => {
    setSelectedEvent(event);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteTicket = () => {
    if (selectedEvent) {
      deleteEvent(selectedEvent.id);
      setIsDeleteDialogOpen(false);
      setSelectedEvent(null);
      
      toast({
        title: "Ticket supprimé",
        description: `Le ticket pour "${selectedEvent.title}" a été supprimé.`,
      });
    }
  };

  const getTicketsSold = (eventId: string) => {
    return transactions.reduce((total, tx) => {
      const eventItems = tx.items.filter(item => item.event.id === eventId);
      return total + (eventItems.length > 0 ? 
        eventItems.reduce((sum, item) => sum + item.quantity, 0) : 0);
    }, 0) || Math.floor(Math.random() * 50);
  };

  // Get the current form values based on whether we're editing or creating
  const getCurrentFormValues = () => {
    if (selectedEvent) {
      return {
        title: selectedEvent.title,
        date: selectedEvent.date,
        time: selectedEvent.time,
        location: selectedEvent.location,
        venue: selectedEvent.venue,
        category: selectedEvent.category,
        price: selectedEvent.price,
        description: selectedEvent.description,
        featured: selectedEvent.featured,
      };
    }
    return defaultFormValues;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Gestion des Événements</CardTitle>
          <div className="flex items-center gap-2">
            <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
              setIsAddDialogOpen(open);
              if (!open) setSelectedEvent(null);
            }}>
              <DialogTrigger asChild>
                <Button variant="default" size="sm" className="h-8 gap-1">
                  <Plus className="h-4 w-4" />
                  Ajouter un ticket
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{selectedEvent ? "Modifier le ticket" : "Ajouter un nouveau ticket"}</DialogTitle>
                  <DialogDescription>
                    {selectedEvent 
                      ? "Modifiez les détails du ticket existant." 
                      : "Remplissez le formulaire pour ajouter un nouveau ticket."}
                  </DialogDescription>
                </DialogHeader>
                
                <EventForm 
                  defaultValues={getCurrentFormValues()}
                  onSubmit={handleAddTicket}
                  onCancel={() => {
                    setIsAddDialogOpen(false);
                    setSelectedEvent(null);
                  }}
                  isEditing={!!selectedEvent}
                />
              </DialogContent>
            </Dialog>
            
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
        <EventsTable 
          events={events}
          onEdit={openEditDialog}
          onDelete={openDeleteDialog}
          getTicketsSold={getTicketsSold}
        />
        
        <DeleteEventDialog 
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleDeleteTicket}
          eventTitle={selectedEvent?.title || ""}
        />
      </CardContent>
    </Card>
  );
};

export default AdminEvents;
