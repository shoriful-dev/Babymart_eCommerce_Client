'use client';
import { useCartStore } from '@/lib/store';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const CartIcon = () => {
  const { cartItemsWithQuantities } = useCartStore();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted ? cartItemsWithQuantities.length : 0;

  return (
    <Link
      href={'/user/cart'}
      className="relative hover:text-babyshopSky transition-colors"
    >
      <ShoppingBag size={26} strokeWidth={1.5} />
      {totalItems > 0 && (
        <span className="absolute -right-2.5 -top-2 bg-babyshopSky text-babyshopWhite text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
