
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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

const AdminOverview = () => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default AdminOverview;
