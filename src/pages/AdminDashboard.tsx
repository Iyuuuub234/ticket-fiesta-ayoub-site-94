
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminStats from "@/components/admin/AdminStats";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminSales from "@/components/admin/AdminSales";
import AdminEvents from "@/components/admin/AdminEvents";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminReports from "@/components/admin/AdminReports";
import { FavoritesProvider } from '@/context/FavoritesContext';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <FavoritesProvider>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tableau de Bord Administrateur</h1>
          <Button variant="outline" onClick={() => navigate('/')}>
            Retour au site
          </Button>
        </div>

        {/* Cards des statistiques */}
        <AdminStats />

        {/* Onglets pour différentes sections */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="sales">Ventes</TabsTrigger>
            <TabsTrigger value="events">Événements</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="reports">Rapports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AdminOverview />
          </TabsContent>

          <TabsContent value="sales">
            <AdminSales />
          </TabsContent>

          <TabsContent value="events">
            <AdminEvents />
          </TabsContent>

          <TabsContent value="users">
            <AdminUsers />
          </TabsContent>

          <TabsContent value="reports">
            <AdminReports />
          </TabsContent>
        </Tabs>
      </div>
    </FavoritesProvider>
  );
};

export default AdminDashboard;
