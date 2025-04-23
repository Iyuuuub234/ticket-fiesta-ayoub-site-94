export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  category: string;
  image: string;
  price: number;
  description: string;
  featured: boolean;
}

export const categories = [
  "Concerts",
  "Festivals",
  "Sports",
  "Théâtre",
  "Expositions",
  "Conférences"
];

export const events: Event[] = [
  {
    id: "1",
    title: "Festival Électro Summer",
    date: "2024-07-15",
    time: "18:00",
    location: "Paris",
    venue: "Parc de la Villette",
    category: "Festivals",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    price: 49.99,
    description: "Le plus grand festival électro de l'été avec des artistes internationaux de renom. Profitez d'une soirée inoubliable sous les étoiles avec des jeux de lumières spectaculaires et une ambiance électrisante.",
    featured: true
  },
  {
    id: "2",
    title: "Concert Rock Legends",
    date: "2024-08-05",
    time: "20:30",
    location: "Lyon",
    venue: "Halle Tony Garnier",
    category: "Concerts",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    price: 65.00,
    description: "Les plus grandes légendes du rock réunies sur scène pour un concert exceptionnel. Revivez les plus grands tubes qui ont marqué l'histoire de la musique rock.",
    featured: true
  },
  {
    id: "3",
    title: "Match de Football - Finale",
    date: "2024-06-28",
    time: "21:00",
    location: "Marseille",
    venue: "Stade Vélodrome",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1570498839593-e565b39455fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    price: 120.00,
    description: "La grande finale de la coupe nationale, un match décisif entre les deux meilleures équipes du championnat. Une ambiance de folie garantie dans un stade mythique.",
    featured: true
  },
  {
    id: "4",
    title: "Salon d'Art Contemporain",
    date: "2024-09-10",
    time: "10:00",
    location: "Bordeaux",
    venue: "Hangar 14",
    category: "Expositions",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    price: 15.50,
    description: "Découvrez les œuvres des artistes contemporains les plus prometteurs. Une exposition qui bouscule les codes et vous invite à repenser l'art moderne.",
    featured: false
  },
  {
    id: "5",
    title: "Pièce de Théâtre 'Rêves'",
    date: "2024-07-21",
    time: "19:30",
    location: "Toulouse",
    venue: "Théâtre du Capitole",
    category: "Théâtre",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
    price: 35.00,
    description: "Une pièce captivante qui explore les frontières entre réalité et imagination. Mise en scène innovante et performances d'acteurs remarquables.",
    featured: false
  },
  {
    id: "6",
    title: "Conférence Tech Future",
    date: "2024-10-05",
    time: "09:00",
    location: "Paris",
    venue: "Palais des Congrès",
    category: "Conférences",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    price: 89.00,
    description: "Les dernières innovations technologiques présentées par des experts internationaux. Ateliers, tables rondes et demonstrations des technologies de demain.",
    featured: true
  },
  {
    id: "7",
    title: "Festival de Jazz",
    date: "2024-08-15",
    time: "17:00",
    location: "Nice",
    venue: "Place Masséna",
    category: "Festivals",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    price: 25.00,
    description: "Un festival qui célèbre le jazz sous toutes ses formes avec des artistes de renommée mondiale et des talents émergents. Ambiance décontractée et conviviale au cœur de la ville.",
    featured: false
  },
  {
    id: "8",
    title: "Exposition Photo Nature",
    date: "2024-11-01",
    time: "10:00",
    location: "Lille",
    venue: "Palais des Beaux-Arts",
    category: "Expositions",
    image: "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=918&q=80",
    price: 12.00,
    description: "Les plus beaux clichés de nature sauvage réunis dans une exposition époustouflante. Découvrez la beauté de notre planète à travers l'objectif des plus grands photographes.",
    featured: false
  },
  {
    id: "9",
    title: "Festival Jazz & Blues",
    date: "2024-08-20",
    time: "19:00",
    location: "Nantes",
    venue: "Le Lieu Unique",
    category: "Festivals",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    price: 35.00,
    description: "Une soirée exceptionnelle de jazz et de blues avec des artistes internationaux. Ambiance chaleureuse et conviviale garantie.",
    featured: true
  },
  {
    id: "10",
    title: "Match de Basketball - Playoffs",
    date: "2024-09-15",
    time: "20:30",
    location: "Paris",
    venue: "Accor Arena",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    price: 45.00,
    description: "Match décisif des playoffs de basketball. Venez supporter votre équipe favorite dans une ambiance électrique !",
    featured: true
  },
  {
    id: "11",
    title: "Exposition Art Moderne",
    date: "2024-10-01",
    time: "10:00",
    location: "Lyon",
    venue: "Musée d'Art Contemporain",
    category: "Expositions",
    image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    price: 12.00,
    description: "Une exposition unique présentant les œuvres marquantes de l'art moderne. Un voyage à travers les mouvements artistiques contemporains.",
    featured: true
  },
  {
    id: "12",
    title: "Spectacle de Danse Contemporaine",
    date: "2024-09-25",
    time: "20:00",
    location: "Marseille",
    venue: "Opéra Municipal",
    category: "Théâtre",
    image: "https://images.unsplash.com/photo-1545959563-db773e23bc75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    price: 28.00,
    description: "Un spectacle innovant mêlant danse contemporaine et arts numériques. Une expérience visuelle et émotionnelle unique.",
    featured: true
  }
];

export const getEventById = (id: string): Event | undefined => {
  return events.find(event => event.id === id);
};

export const getEventsByCategory = (category: string): Event[] => {
  if (category === "Tous") return events;
  return events.filter(event => event.category === category);
};

export const getFeaturedEvents = (): Event[] => {
  return events.filter(event => event.featured);
};

export const searchEvents = (query: string): Event[] => {
  const lowercaseQuery = query.toLowerCase();
  return events.filter(
    event => 
      event.title.toLowerCase().includes(lowercaseQuery) ||
      event.location.toLowerCase().includes(lowercaseQuery) ||
      event.category.toLowerCase().includes(lowercaseQuery) ||
      event.venue.toLowerCase().includes(lowercaseQuery)
  );
};
