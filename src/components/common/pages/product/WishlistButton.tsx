import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import React from 'react';
import { useWishlistStore } from '@/lib/store';
import { Product } from '@/types/type';
import { toast } from 'sonner';

interface Props {
  product: Product;
  className?: string;
}

const WishlistButton = ({ product, className }: Props) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  
  const isFavourite = product ? isInWishlist(product._id) : false;

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product) return;

    if (isFavourite) {
      removeFromWishlist(product._id);
      toast.error('Removed from wishlist', {
        icon: <Heart size={16} className="text-red-500" />,
        className: 'font-bold'
      });
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist!', {
        icon: <Heart size={16} className="text-red-500 fill-red-500" />,
        className: 'font-bold'
      });
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className={cn(
        'group relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-500 active:scale-90',
        isFavourite 
          ? 'bg-red-50 text-red-500 shadow-inner' 
          : 'bg-white text-gray-400 hover:text-red-500 hover:shadow-xl hover:shadow-red-500/10 border border-gray-100',
        className,
      )}
      title={isFavourite ? 'Remove from Wishlist' : 'Add to Wishlist'}
    >
      <Heart
        size={24}
        strokeWidth={2.5}
        className={cn(
          'transition-all duration-500 group-hover:scale-110', 
          isFavourite ? 'fill-red-500 scale-110' : 'fill-transparent'
        )}
      />
      
      {!isFavourite && (
        <span className="absolute inset-0 rounded-2xl bg-red-500/10 scale-0 group-hover:scale-100 transition-transform duration-500 -z-10" />
      )}
    </button>
  );
};

export default WishlistButton;
