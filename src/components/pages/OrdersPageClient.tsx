'use client';

import React, { useEffect } from 'react';
import Container from '@/components/common/Container';
import { useOrderStore, useUserStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { Package, ShoppingBag, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PriceFormatter from '@/components/common/PriceFormatter';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

const OrdersPageClient = () => {
  const { auth_token, isAuthenticated } = useUserStore();
  const { orders, isLoading, loadOrders } = useOrderStore();

  useEffect(() => {
    if (isAuthenticated && auth_token) {
      loadOrders(auth_token);
    }
  }, [isAuthenticated, auth_token, loadOrders]);

  if (isLoading) {
    return (
      <Container className="py-10">
        <div className="space-y-6">
          <Skeleton className="h-12 w-64" />
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 w-full rounded-2xl" />
          ))}
        </div>
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <Container className="py-20 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="bg-babyshopSky/10 p-6 rounded-full mb-6">
          <ShoppingBag className="w-12 h-12 text-babyshopSky" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
        <p className="text-gray-500 mb-8 text-center max-w-xs">
          Start shopping and your orders will appear here!
        </p>
        <Link href="/shop">
          <Button className="px-8">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Explore Shop
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            My Orders
            <Package className="w-8 h-8 text-babyshopSky" />
          </h1>
          <p className="text-gray-500 mt-1">Track and manage your orders</p>
        </div>
        <Badge variant="secondary" className="text-sm px-4 py-1.5 rounded-full">
          {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
        </Badge>
      </div>

      <div className="space-y-4">
        {orders.map((order, index) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-babyshopSky transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-babyshopSky/10 p-3 rounded-xl">
                  <Package className="w-6 h-6 text-babyshopSky" />
                </div>
                <div>
                  <p className="font-semibold">Order #{order._id.substring(order._id.length - 8)}</p>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>
                  <PriceFormatter amount={order.total} className="text-xl font-bold" />
                </div>
                <Badge 
                  className={`${
                    order.status === 'paid' ? 'bg-green-500' : 
                    order.status === 'completed' ? 'bg-babyshopSky' : 
                    order.status === 'cancelled' ? 'bg-red-500' : 
                    'bg-orange-500'
                  } text-white`}
                >
                  {order.status}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex -space-x-2">
                {order.items.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="w-12 h-12 rounded-lg border-2 border-white dark:border-gray-900 bg-gray-50 dark:bg-gray-800 overflow-hidden">
                    <Image src={item.image!} alt={item.name} width={48} height={48} className="w-full h-full object-cover" />
                  </div>
                ))}
                {order.items.length > 4 && (
                  <div className="w-12 h-12 rounded-lg border-2 border-white dark:border-gray-900 bg-babyshopSky text-white flex items-center justify-center text-sm font-bold">
                    +{order.items.length - 4}
                  </div>
                )}
              </div>
              
              <Link href={`/user/orders/${order._id}`}>
                <Button variant="outline" size="sm" className="gap-2">
                  <Eye className="w-4 h-4" />
                  View Details
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </Container>
  );
};

export default OrdersPageClient;
