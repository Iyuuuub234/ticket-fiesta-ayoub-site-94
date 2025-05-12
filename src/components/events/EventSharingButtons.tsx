
import React, { useState } from 'react';
import { Share2, Check, Copy, Facebook, Twitter, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

interface EventSharingButtonsProps {
  eventId: string;
  eventTitle: string;
}

const EventSharingButtons: React.FC<EventSharingButtonsProps> = ({ eventId, eventTitle }) => {
  const [isCopied, setIsCopied] = useState(false);
  const isMobile = useIsMobile();
  
  const eventUrl = `${window.location.origin}/event/${eventId}`;
  const encodedUrl = encodeURIComponent(eventUrl);
  const encodedTitle = encodeURIComponent(`Découvrez ${eventTitle} sur Ticket Time!`);
  
  const socialLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    instagram: `https://www.instagram.com/?url=${encodedUrl}` // Note: Instagram doesn't support direct sharing like this
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(eventUrl).then(() => {
      setIsCopied(true);
      toast.success('Lien copié avec succès !');
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleShare = (platform: string) => {
    window.open(socialLinks[platform as keyof typeof socialLinks], '_blank');
    toast.success(`Partage sur ${platform} en cours...`);
  };

  // Use native sharing if available (mostly on mobile)
  const useNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: eventTitle,
        text: `Découvrez ${eventTitle} sur Ticket Time!`,
        url: eventUrl,
      })
      .then(() => toast.success('Merci d\'avoir partagé !'))
      .catch((error) => console.error('Erreur lors du partage', error));
    }
  };

  return (
    <div className="flex items-center">
      {isMobile && navigator.share ? (
        <Button 
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-ticket-purple"
          onClick={useNativeShare}
        >
          <Share2 className="w-4 h-4 mr-1" /> Partager
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-ticket-purple"
            >
              <Share2 className="w-4 h-4 mr-1" /> Partager
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => handleShare('facebook')}>
              <Facebook className="w-4 h-4 mr-2" /> Facebook
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare('twitter')}>
              <Twitter className="w-4 h-4 mr-2" /> Twitter
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => copyToClipboard()}>
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-green-500" /> Copié
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" /> Copier le lien
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default EventSharingButtons;
