
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Download, Edit, Trash2 } from "lucide-react";
import { events } from "@/data/events";
import { useTransactions } from "@/context/TransactionsContext";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { categories } from "@/data/events";

// Définir le schéma de validation pour le formulaire d'ajout/édition de ticket
const ticketFormSchema = z.object({
  title: z.string().min(3, {
    message: "Le titre doit contenir au moins 3 caractères.",
  }),
  date: z.string().min(1, {
    message: "La date est requise.",
  }),
  time: z.string().min(1, {
    message: "L'heure est requise.",
  }),
  location: z.string().min(1, {
    message: "Le lieu est requis.",
  }),
  venue: z.string().min(1, {
    message: "La salle est requise.",
  }),
  category: z.string().min(1, {
    message: "La catégorie est requise.",
  }),
  price: z.string().transform(val => Number(val.replace(',', '.'))),
  description: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères.",
  }),
  featured: z.boolean().default(false),
});

type TicketFormValues = z.infer<typeof ticketFormSchema>;

const AdminEvents = () => {
  const { transactions } = useTransactions();
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [localEvents, setLocalEvents] = useState([...events]);

  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      title: "",
      date: new Date().toISOString().split('T')[0],
      time: "19:00",
      location: "",
      venue: "",
      category: "Concerts",
      price: "0",
      description: "",
      featured: false,
    },
  });

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
    
    setLocalEvents([newEvent, ...localEvents]);
    setIsAddDialogOpen(false);
    form.reset();
    
    toast({
      title: "Ticket ajouté",
      description: `Le ticket pour "${data.title}" a été ajouté avec succès.`,
    });
  };

  const openEditDialog = (event: any) => {
    setSelectedEvent(event);
    form.reset({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      venue: event.venue,
      category: event.category,
      price: String(event.price),
      description: event.description,
      featured: event.featured,
    });
    setIsAddDialogOpen(true);
  };

  const openDeleteDialog = (event: any) => {
    setSelectedEvent(event);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteTicket = () => {
    if (selectedEvent) {
      setLocalEvents(localEvents.filter(e => e.id !== selectedEvent.id));
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Gestion des Événements</CardTitle>
          <div className="flex items-center gap-2">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleAddTicket)} className="space-y-4 py-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titre de l'événement</FormLabel>
                          <FormControl>
                            <Input placeholder="Concert de..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Heure</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ville</FormLabel>
                            <FormControl>
                              <Input placeholder="Paris" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="venue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Salle</FormLabel>
                            <FormControl>
                              <Input placeholder="Stade de France" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Catégorie</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner une catégorie" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prix (€)</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.01" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Description de l'événement..." 
                              className="resize-none" 
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsAddDialogOpen(false)}
                      >
                        Annuler
                      </Button>
                      <Button type="submit">
                        {selectedEvent ? "Mettre à jour" : "Ajouter"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
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
          Liste complète des événements - {localEvents.length} au total
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
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {localEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{formatPrice(event.price)}</TableCell>
                <TableCell>{getTicketsSold(event.id)}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => openEditDialog(event)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Éditer</span>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => openDeleteDialog(event)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Supprimer</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Dialogue de confirmation de suppression */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmer la suppression</DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir supprimer le ticket pour "{selectedEvent?.title}" ? Cette action ne peut pas être annulée.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Annuler</Button>
              <Button variant="destructive" onClick={handleDeleteTicket}>Supprimer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default AdminEvents;
