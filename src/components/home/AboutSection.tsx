
import React from 'react';
import { Info, Service, Objective, Client } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">À Propos de Ticket Time</h2>
          <p className="text-gray-600">
            Votre plateforme de confiance pour découvrir et réserver des événements inoubliables
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-ticket-purple/10">
                  <Service className="w-6 h-6 text-ticket-purple" />
                </div>
                <h3 className="font-semibold text-xl">Nos Services</h3>
              </div>
              <p className="text-gray-600">
                Nous proposons une large gamme d'événements : concerts, festivals, sports, théâtre, expositions.
                Réservation simple et sécurisée, avec des billets électroniques instantanés.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-ticket-orange/10">
                  <Objective className="w-6 h-6 text-ticket-orange" />
                </div>
                <h3 className="font-semibold text-xl">Notre Mission</h3>
              </div>
              <p className="text-gray-600">
                Rendre la culture et le divertissement accessibles à tous. Nous facilitons
                la découverte d'événements et garantissons une expérience d'achat transparente.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-green-500/10">
                  <Client className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="font-semibold text-xl">Pour Nos Clients</h3>
              </div>
              <p className="text-gray-600">
                Support client dédié, prix transparents, et recommandations personnalisées
                pour vous aider à trouver les événements qui vous correspondent.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
