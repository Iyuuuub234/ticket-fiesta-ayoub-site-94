
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { BarChart, Calendar, Users, Filter, Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { events } from "@/data/events";
import { useForm } from "react-hook-form";

// Données factices pour les graphiques
const salesData = [
  { name: 'Jan', sales: 65 },
  { name: 'Feb', sales: 59 },
  { name: 'Mar', sales: 80 },
  { name: 'Apr', sales: 81 },
  { name: 'May', sales: 56 },
  { name: 'Jun', sales: 55 },
  { name: 'Jul', sales: 40 },
];

const categoryData = [
  { name: 'Concerts', value: 40 },
  { name: 'Festivals', value: 30 },
  { name: 'Sports', value: 20 },
  { name: 'Théâtre', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Données factices pour les utilisateurs
const usersData = [
  { id: 1, name: 'Sophie Martin', email: 'sophie@example.com', tickets: 5, lastPurchase: '2025-05-10' },
  { id: 2, name: 'Thomas Dubois', email: 'thomas@example.com', tickets: 3, lastPurchase: '2025-05-12' },
  { id: 3, name: 'Emma Leroy', email: 'emma@example.com', tickets: 7, lastPurchase: '2025-05-09' },
  { id: 4, name: 'Nicolas Bernard', email: 'nicolas@example.com', tickets: 2, lastPurchase: '2025-05-14' },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const form = useForm();

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tableau de Bord Administrateur</h1>
        <Button variant="outline" onClick={() => navigate('/')}>
          Retour au site
        </Button>
      </div>

      {/* Cards des statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ventes Totales</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€42,350</div>
            <p className="text-xs text-muted-foreground">+20.1% par rapport au mois dernier</p>
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
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+27 nouveaux cette semaine</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Taux de Conversion</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24%</div>
            <p className="text-xs text-muted-foreground">+5.2% par rapport au mois dernier</p>
          </CardContent>
        </Card>
      </div>

      {/* Onglets pour différentes sections */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="events">Événements</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="reports">Rapports</TabsTrigger>
        </TabsList>

        {/* Vue d'ensemble */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Ventes Mensuelles</CardTitle>
                <CardDescription>Tendance des ventes pour les 7 derniers mois</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer 
                  config={{
                    sales: {
                      label: "Ventes",
                      color: "#0088FE"
                    },
                  }}
                >
                  <RechartsBarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="sales" name="Ventes" fill="var(--color-sales)" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Répartition par Catégorie</CardTitle>
                <CardDescription>Distribution des ventes par type d'événement</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} tickets`, 'Quantité']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Événements */}
        <TabsContent value="events" className="space-y-4">
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
                      <TableCell>{Math.floor(Math.random() * 500)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Éditer</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Utilisateurs */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Gestion des Utilisateurs</CardTitle>
                <Form {...form}>
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <FormField
                      control={form.control}
                      name="search"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Rechercher un utilisateur..." {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Rechercher</Button>
                  </div>
                </Form>
              </div>
              <CardDescription>
                Gérez les utilisateurs et visualisez leur activité
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Tickets achetés</TableHead>
                    <TableHead>Dernier achat</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usersData.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.tickets}</TableCell>
                      <TableCell>{user.lastPurchase}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">Détails</Button>
                          <Button variant="ghost" size="sm">Contacter</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rapports */}
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Générer des Rapports</CardTitle>
              <CardDescription>
                Créez des rapports personnalisés basés sur différentes métriques
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="reportType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type de rapport</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez un type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="sales">Ventes</SelectItem>
                              <SelectItem value="users">Utilisateurs</SelectItem>
                              <SelectItem value="events">Événements</SelectItem>
                              <SelectItem value="revenue">Revenus</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="period"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Période</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez une période" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="last7days">7 derniers jours</SelectItem>
                              <SelectItem value="last30days">30 derniers jours</SelectItem>
                              <SelectItem value="last3months">3 derniers mois</SelectItem>
                              <SelectItem value="last6months">6 derniers mois</SelectItem>
                              <SelectItem value="lastyear">Dernière année</SelectItem>
                              <SelectItem value="custom">Personnalisé</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit">Générer le rapport</Button>
                </div>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
