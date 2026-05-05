'use client';

import { Product } from '@/types/type';
import React, { useState, useEffect } from 'react';
import { Minus, Plus, ShoppingBag, Loader2, Eye, FileQuestion, Share2, Star, Truck, Box, Zap, MessageSquareQuote } from 'lucide-react';
import WishlistButton from './WishlistButton';
import PriceFormatter from '../../PriceFormatter';
import { Button } from '@/components/ui/button';
import { useCartStore, useUserStore } from '@/lib/store';
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
  const [viewCount, setViewCount] = useState(24);
  const { addToCart } = useCartStore();
  const { isAuthenticated } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    setViewCount(Math.floor(Math.random() * (45 - 15 + 1)) + 15);

    const interval = setInterval(() => {
      setViewCount(prev => {
        const change = Math.floor(Math.random() * 3) - 1;
        const newCount = prev + change;
        return newCount < 10 ? 10 : newCount > 60 ? 60 : newCount;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

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
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      router.push('/auth/signin');
      return;
    }
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
    if (!isAuthenticated) {
      toast.error('Please login to buy this product');
      router.push('/auth/signin');
      return;
    }
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <DiscountBadge
          discountPercentage={product?.discountPercentage}
          className="w-14"
        />
        <div className="flex items-center gap-1 text-babyshopBlack/60 text-xs font-medium uppercase tracking-wider">
          <Box size={14} />
          SKU: {product?._id?.slice(-8).toUpperCase()}
        </div>
      </div>
      
      <div className="flex items-start justify-between gap-5">
        <h1 className="text-3xl font-extrabold text-babyshopBlack tracking-tight leading-tight">{product?.name}</h1>
        <div className="pt-1">
          <WishlistButton
            product={product}
            className="h-11 w-11 rounded-full border border-gray-200 hover:border-babyshopSky hover:text-babyshopSky shadow-sm transition-all"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 py-2 border-y border-gray-100">
        <div className="flex items-center gap-1.5 pr-4 border-r border-gray-200">
          <div className="flex items-center text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill={i < Math.floor(product?.averageRating || 0) ? "currentColor" : "none"} />
            ))}
          </div>
          <p className="text-sm font-semibold text-babyshopBlack">
            {product?.averageRating?.toFixed(1) || '0.0'} 
            <span className="text-gray-400 font-normal ml-1">({product?.ratings?.length || 0} reviews)</span>
          </p>
        </div>
        
        <button 
          onClick={() => {
            router.push('#reviews');
            const reviewsSection = document.getElementById('product-description-tabs');
            if (reviewsSection) {
              reviewsSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="text-sm font-semibold text-babyshopSky hover:text-babyshopSky/80 flex items-center gap-1.5 transition-colors group"
        >
          <MessageSquareQuote size={16} className="group-hover:scale-110 transition-transform" />
          Write a Review
        </button>
      </div>

      <div className="flex items-baseline gap-3">
        <PriceFormatter amount={discountedPricePerUnit * quantity} className="text-4xl font-black text-babyshopBlack" />
        {product?.discountPercentage > 0 && (
          <PriceFormatter
            amount={product?.price * quantity}
            className="text-gray-400 line-through font-medium text-xl"
          />
        )}
      </div>

      <div className="flex items-center gap-2 text-babyshopBlack/60 text-sm bg-gray-50 w-fit px-3 py-1.5 rounded-lg border border-gray-100">
        <Eye size={16} className="text-babyshopSky" />
        <span className="font-bold text-babyshopSky">{viewCount}</span> people are viewing this right now
      </div>

      <div className="pt-2">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-babyshopBlack uppercase tracking-wider">Select Quantity</p>
          <p className={`text-xs font-bold px-2.5 py-1 rounded-full ${product.stock > 0 ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
            {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="border border-gray-200 bg-white flex items-center gap-4 px-3 py-2 rounded-xl shadow-sm">
            <button
              onClick={() => handleQuantityChange('decrease')}
              disabled={quantity <= 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-babyshopBlack hover:text-babyshopSky disabled:opacity-30 transition-all"
            >
              <Minus size={16} strokeWidth={2.5} />
            </button>
            <span className="font-bold text-lg min-w-[30px] text-center">{quantity}</span>
            <button
              onClick={() => handleQuantityChange('increase')}
              disabled={quantity >= product.stock}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-babyshopBlack hover:text-babyshopSky disabled:opacity-30 transition-all"
            >
              <Plus size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <Button
          onClick={handleAddToCart}
          disabled={localLoading || product.stock <= 0}
          variant={'outline'}
          className="h-14 border-2 border-babyshopSky text-babyshopSky hover:bg-babyshopSky hover:text-white text-base font-bold rounded-xl transition-all duration-300 group shadow-sm"
        >
          {localLoading ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <ShoppingBag className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
          )}
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>

        <Button 
          onClick={handleBuyNow} 
          disabled={buyLoading || product.stock <= 0}
          className="h-14 text-base font-bold bg-babyshopBlack hover:bg-babyshopBlack/90 text-white rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-gray-200"
        >
          {buyLoading ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <Zap className="w-5 h-5 mr-2 fill-current" />
          )}
          Buy Now
        </Button>
      </div>

      <div className="flex items-center gap-6 pt-2">
        <button 
          onClick={() => {
            router.push('#questions');
            const section = document.getElementById('product-description-tabs');
            if (section) section.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 text-sm font-bold text-babyshopBlack/70 hover:text-babyshopSky transition-colors group"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 group-hover:bg-sky-50 group-hover:border-sky-100 transition-all">
            <FileQuestion size={18} />
          </div>
          Ask a Question
        </button>
        <button className="flex items-center gap-2.5 text-sm font-bold text-babyshopBlack/70 hover:text-babyshopSky transition-colors group">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 group-hover:bg-sky-50 group-hover:border-sky-100 transition-all">
            <Share2 size={18} />
          </div>
          Share Product
        </button>
      </div>

      <div className="bg-gray-50/50 rounded-2xl p-6 space-y-5 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="text-babyshopSky bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
              <Truck size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-babyshopBlack mb-0.5">Estimated Delivery</p>
              <p className="text-xs text-gray-500 font-semibold tracking-wide">08 - 15 Jun, 2025</p>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <div className="text-babyshopSky bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
              <Box size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-babyshopBlack mb-0.5">Free Shipping</p>
              <p className="text-xs text-gray-500 font-semibold tracking-wide">On all orders over $200</p>
            </div>
          </div>
        </div>
        
        <div className="pt-5 border-t border-gray-200">
          <div className="flex flex-col items-center gap-3">
            <Image
              src={payment}
              alt="paymentImage"
              className="w-full max-w-[300px] grayscale opacity-60 hover:opacity-100 transition-opacity"
            />
            <p className="text-[10px] uppercase tracking-widest font-black text-gray-400">
              Guaranteed safe & secure checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProductDetails;
