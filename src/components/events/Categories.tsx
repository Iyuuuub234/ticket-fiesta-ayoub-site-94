
import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Tent, Trophy, Theater, Image, BookOpen } from 'lucide-react';

interface CategoriesProps {
  categories: string[];
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Concerts':
      return <Music className="w-10 h-10 mb-3 text-ticket-purple" />;
    case 'Festivals':
      return <Tent className="w-10 h-10 mb-3 text-ticket-purple" />;
    case 'Sports':
      return <Trophy className="w-10 h-10 mb-3 text-ticket-purple" />;
    case 'Théâtre':
      return <Theater className="w-10 h-10 mb-3 text-ticket-purple" />;
    case 'Expositions':
      return <Image className="w-10 h-10 mb-3 text-ticket-purple" />;
    case 'Conférences':
      return <BookOpen className="w-10 h-10 mb-3 text-ticket-purple" />;
    default:
      return <Music className="w-10 h-10 mb-3 text-ticket-purple" />;
  }
};

export const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <Link 
          key={category} 
          to={`/events?category=${encodeURIComponent(category)}`}
          className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center"
        >
          {getCategoryIcon(category)}
          <span className="font-medium">{category}</span>
        </Link>
      ))}
    </div>
  );
};
