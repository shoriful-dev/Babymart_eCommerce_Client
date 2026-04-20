'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useWishlistStore } from '@/lib/store';

const WishlistIcon = () => {
  const { wishlistIds } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link
      href={'/user/wishlist'}
      className="relative hover:text-babyshopSky transition-colors"
    >
      <Heart size={26} strokeWidth={1.5} />
      {mounted && wishlistIds.length > 0 && (
        <span className="absolute -right-2.5 -top-2 bg-babyshopSky text-babyshopWhite text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
          {wishlistIds.length}
        </span>
      )}
    </Link>
  );
};

export default WishlistIcon;
