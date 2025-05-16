
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch,
  placeholder = "Rechercher un événement, lieu, catégorie...",
  initialQuery = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-20 py-6 rounded-full border-gray-700 focus:border-ticket-purple focus:ring-ticket-purple bg-[#1A1F2C] text-white placeholder:text-gray-400"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={20} />
        </div>
        <Button 
          type="submit" 
          className="absolute right-1.5 top-1.5 rounded-full bg-ticket-purple hover:bg-ticket-purple/90"
        >
          Rechercher
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
