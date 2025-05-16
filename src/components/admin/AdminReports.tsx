
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";

const AdminReports = () => {
  const form = useForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Générer des Rapports</CardTitle>
        <CardDescription>
          Créez des rapports personnalisés basés sur différentes métriques
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="grid gap-4 py-4">
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
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AdminReports;
