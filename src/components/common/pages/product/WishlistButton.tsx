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
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className={cn(
        'p-2 rounded-full transition-all duration-300 hover:scale-110 shadow-sm border',
        isFavourite 
          ? 'bg-red-50 border-red-100 text-red-500' 
          : 'bg-white border-gray-100 text-gray-400 hover:text-red-400',
        className,
      )}
    >
      <Heart
        size={20}
        className={cn('transition-all', isFavourite && 'fill-current')}
      />
    </button>
  );
};

export default WishlistButton;
