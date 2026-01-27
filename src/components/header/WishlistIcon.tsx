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
      className="relative hover:text-babyshopSky hoverEffect"
    >
      <Heart size={24} />
      {mounted && wishlistIds.length > 0 && (
        <span className="absolute -right-2 -top-2 bg-babyshopSky text-babyshopWhite text-[11px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
          {wishlistIds.length}
        </span>
      )}
    </Link>
  );
};

export default WishlistIcon;
