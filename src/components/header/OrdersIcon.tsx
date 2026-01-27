'use client';

import { Package } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useOrderStore } from '@/lib/store';

const OrdersIcon = () => {
  const { orders } = useOrderStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link
      href={'/user/orders'}
      className="relative hover:text-babyshopSky hoverEffect"
    >
      <Package size={24} />
      {mounted && orders.length > 0 && (
        <span className="absolute -right-2 -top-2 bg-babyshopSky text-babyshopWhite text-[11px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
          {orders.length}
        </span>
      )}
    </Link>
  );
};

export default OrdersIcon;
