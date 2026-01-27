'use client'
import { Product } from '@/types/type';
import { Minus, Plus, ShoppingBag, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import WishlistButton from './WishlistButton';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';

interface ProductActionsProps {
  product: Product;
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [localLoading, setLocalLoading] = useState(false);
  const { addToCart } = useCartStore();

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      setQuantity(prev => (product.stock > prev ? prev + 1 : prev));
    } else {
      setQuantity(prev => Math.max(1, prev - 1));
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    setLocalLoading(true);
    try {
      await addToCart(product, quantity);
      toast.success(`${product.name} added to cart`);
    } catch (error) {
      console.error('Add to cart failed:', error);
      toast.error('Failed to add to cart');
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <>
      {/* Proudct name with wishlist button */}
      <div className="flex items-center justify-between gap-5">
        <h1 className="text-2xl font-bold line-clamp-2">{product?.name}</h1>
        <div className="flex items-center gap-2">
          <WishlistButton
            product={product}
            className="border border-babyshopTextLight hover:border-babyshopSky"
          />
        </div>
      </div>
      {/* Quantity and Add to Cart */}
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Select Quantity</p>
          <div className="flex items-center gap-5">
            <div className="border border-gray-200 bg-white flex items-center gap-6 px-5 py-2.5 rounded-full shadow-sm">
              <button
                onClick={() => handleQuantityChange('decrease')}
                disabled={quantity <= 1}
                className="border-0 bg-transparent text-babyshopBlack hover:text-babyshopSky disabled:opacity-30 transition-colors"
              >
                <Minus size={18} />
              </button>
              <span className="font-bold text-lg min-w-[20px] text-center">{quantity}</span>
              <button
                onClick={() => handleQuantityChange('increase')}
                disabled={quantity >= product.stock}
                className="border-0 bg-transparent text-babyshopBlack hover:text-babyshopSky disabled:opacity-30 transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
            <div className="text-sm text-gray-500">
              {product.stock} items available
            </div>
          </div>
        </div>
        
        <Button
          onClick={handleAddToCart}
          disabled={localLoading || product.stock <= 0}
          variant={'outline'}
          className="w-full py-7 border-2 border-babyshopSky text-babyshopSky hover:bg-babyshopSky hover:text-babyshopWhite text-lg font-bold rounded-2xl transition-all duration-300 group shadow-lg shadow-sky-100 dark:shadow-none translate-y-0 active:translate-y-1"
        >
          {localLoading ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <ShoppingBag className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
          )}
          {product.stock > 0 ? 'Add to Shopping Cart' : 'Out of Stock'}
        </Button>
      </div>
    </>
  );
};

export default ProductActions;
