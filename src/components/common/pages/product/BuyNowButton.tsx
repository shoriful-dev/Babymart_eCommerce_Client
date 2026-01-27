'use client';

import { Product } from '@/types/type';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Zap } from 'lucide-react';

interface BuyNowButtonProps {
  product: Product;
}

const BuyNowButton = ({ product }: BuyNowButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCartStore();
  const router = useRouter();

  const handleBuyNow = async () => {
    if (!product) return;
    setLoading(true);
    try {
      await addToCart(product, 1);
      toast.success('Added to cart, proceeding to checkout...');
      router.push('/user/checkout');
    } catch (error) {
      console.error('Buy now failed:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleBuyNow} 
      disabled={loading || product.stock <= 0}
      className="w-full py-7 text-lg font-bold bg-babyshopBlack hover:bg-babyshopBlack/90 text-white rounded-2xl transition-all active:scale-[0.98]"
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
      ) : (
        <Zap className="w-5 h-5 mr-2 fill-current" />
      )}
      Buy Now
    </Button>
  );
};

export default BuyNowButton;
