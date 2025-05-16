
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useTransactions } from "@/context/TransactionsContext";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const AdminUsers = () => {
  const { users } = useTransactions();
  const form = useForm();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (data: { search: string }) => {
    setSearchTerm(data.search || "");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Gestion des Utilisateurs</CardTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSearch)} className="flex w-full max-w-sm items-center space-x-2">
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
            </form>
          </Form>
        </div>
        <CardDescription>
          Gérez les utilisateurs et visualisez leur activité - {users.length} utilisateurs au total
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
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.ticketsPurchased}</TableCell>
                  <TableCell>
                    {format(new Date(user.lastPurchaseDate), 'dd/MM/yyyy', { locale: fr })}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">Détails</Button>
                      <Button variant="ghost" size="sm">Contacter</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                  {users.length === 0 ? "Aucun utilisateur enregistré" : "Aucun utilisateur trouvé"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminUsers;
