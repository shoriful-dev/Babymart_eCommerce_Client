'use client';

import { Product } from '@/types/type';
import React, { useState } from 'react';
import { Minus, Plus, ShoppingBag, Loader2, Eye, FileQuestion, Share2, Star, Truck, Box, Zap } from 'lucide-react';
import WishlistButton from './WishlistButton';
import PriceFormatter from '../../PriceFormatter';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { payment } from '@/assets/image';
import DiscountBadge from '@/components/common/DiscountBadge';

interface ClientProductDetailsProps {
  product: Product;
}

const ClientProductDetails: React.FC<ClientProductDetailsProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [localLoading, setLocalLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);
  const { addToCart } = useCartStore();
  const router = useRouter();

  const discountedPricePerUnit = product.price * (1 - (product.discountPercentage || 0) / 100);

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

  const handleBuyNow = async () => {
    if (!product) return;
    setBuyLoading(true);
    try {
      await addToCart(product, quantity);
      toast.success('Proceeding to checkout...');
      router.push('/user/checkout');
    } catch (error) {
      console.error('Buy now failed:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setBuyLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <DiscountBadge
        discountPercentage={product?.discountPercentage}
        className="w-14"
      />
      
      {/* Product Name with wishlist button - Originally from ProductActions */}
      <div className="flex items-center justify-between gap-5">
        <h1 className="text-2xl font-bold line-clamp-2">{product?.name}</h1>
        <div className="flex items-center gap-2">
          <WishlistButton
            product={product}
            className="border border-babyshopTextLight hover:border-babyshopSky"
          />
        </div>
      </div>

      {/* Quantity section - Originally from ProductActions */}
      <div>
        <p className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Select Quantity</p>
        <div className="flex flex-col gap-4">
          <div className="border border-gray-200 bg-white w-fit flex items-center gap-6 px-5 py-2.5 rounded-full shadow-sm">
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
          <p className="text-sm font-bold text-green-600">
            In Stock: {product.stock}
          </p>
        </div>
      </div>

      {/* Add to Cart button - Originally from ProductActions */}
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

      {/* Priceview - Originally from page.tsx */}
      <div className="flex items-center gap-5 justify-between pt-2">
        <div className="flex items-center gap-2">
          <PriceFormatter
            amount={product?.price * quantity}
            className="text-babyshopTextLight line-through font-medium text-lg"
          />
          <PriceFormatter amount={discountedPricePerUnit * quantity} className="text-2xl" />
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center text-babyshopTextLight">
            <Star size={15} />
            <Star size={15} />
            <Star size={15} />
            <Star size={15} />
            <Star size={15} />
          </div>
          <p className="text-sm">({0} reviews)</p>
        </div>
      </div>

      {/* user view - Originally from page.tsx */}
      <p className="flex items-center gap-1">
        <Eye />
        <span className="font-semibold">29</span>{' '}
        <span className="text-babyshopBlack/70">
          people are viewing this right now
        </span>
      </p>

      {/* Buy Now Button - Originally from BuyNowButton */}
      <Button 
        onClick={handleBuyNow} 
        disabled={buyLoading || product.stock <= 0}
        className="w-full py-7 text-lg font-bold bg-babyshopBlack hover:bg-babyshopBlack/90 text-white rounded-2xl transition-all active:scale-[0.98]"
      >
        {buyLoading ? (
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
        ) : (
          <Zap className="w-5 h-5 mr-2 fill-current" />
        )}
        Buy Now
      </Button>

      {/* Questions and Share - Originally from page.tsx */}
      <div className="flex items-center gap-5 justify-between border-b border-b-babyshopTextLight/50 pb-5">
        <div className="flex items-center gap-2">
          <FileQuestion /> <p>Ask a Question</p>
        </div>{' '}
        <div className="flex items-center gap-2">
          <Share2 /> <p>Share</p>
        </div>
      </div>

      {/* Delivery part - Originally from page.tsx */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-3">
          <Truck size={30} />{' '}
          <div>
            <p className="font-medium">
              Estimated Delivery:{' '}
              <span className="text-sm text-babyshopBlack/70">
                08 - 15 Jun, 2025
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Box size={30} />{' '}
          <div>
            <p className="font-medium">
              Free Shipping & Returns:{' '}
              <span className="text-sm text-babyshopBlack/70">
                On all orders over $200.00
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Secure Checkout section - Originally from page.tsx */}
      <div className="bg-babyshopTextLight/10 flex flex-col items-center justify-center p-5">
        <Image
          src={payment}
          alt="paymentImage"
          className="w-72 sm:w-80 mb-2"
        />
        <p className="text-sm text-babyshopBlack/70 text-center">
          Guaranteed safe & secure checkout
        </p>
      </div>
    </div>
  );
};

export default ClientProductDetails;
