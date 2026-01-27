'use client';

import React, { useEffect } from 'react';
import Container from '@/components/common/Container';
import { useOrderStore, useUserStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { Package, Calendar, Clock, ChevronRight, ShoppingBag, Eye, TrendingUp, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PriceFormatter from '@/components/common/PriceFormatter';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

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
      <Container className="py-20">
        <div className="max-w-5xl mx-auto space-y-8">
           <div className="flex justify-between items-end">
              <div className="space-y-4">
                 <Skeleton className="h-4 w-32 rounded-full" />
                 <Skeleton className="h-10 w-64 rounded-xl" />
              </div>
              <Skeleton className="h-12 w-40 rounded-full" />
           </div>
           {[1, 2, 3].map((i) => (
             <Skeleton key={i} className="h-64 w-full rounded-[40px]" />
           ))}
        </div>
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <Container className="py-20 flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-50 dark:bg-gray-900 p-12 rounded-[50px] mb-10 border border-white dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none"
        >
          <ShoppingBag className="w-20 h-20 text-gray-200 dark:text-gray-800" />
        </motion.div>
        <h2 className="text-4xl font-black mb-4 tracking-tighter">Your Wardrobe is Empty</h2>
        <p className="text-gray-500 mb-10 text-center max-w-sm font-medium leading-relaxed">
          Looks like you haven't discovered our premium collections yet. Let's find something special for your little one!
        </p>
        <Link href="/shop">
          <Button className="h-16 px-12 rounded-full bg-babyshopSky text-white shadow-2xl shadow-babyshopSky/20 font-black text-xs uppercase tracking-[0.2em] transform active:scale-95 transition-all">
            Start Your Journey
            <ChevronRight className="ml-3 w-4 h-4" />
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <div className="bg-[#FAFAFA] dark:bg-black min-h-screen pb-32">
      <Container className="py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Badge className="bg-babyshopSky/10 text-babyshopSky border-none px-5 py-2 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-4">
                Shopping History
              </Badge>
              <h1 className="text-5xl font-black tracking-tighter lg:text-6xl text-gray-900 dark:text-white">
                 My <span className="text-babyshopSky">Orders</span>
              </h1>
              <p className="text-gray-400 font-medium mt-4 max-w-md">
                 Review your curated selections, track live deliveries, and manage your acquisition archive.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 bg-white dark:bg-gray-900 p-2 rounded-full border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/40 dark:shadow-none"
            >
               <div className="flex -space-x-3 pl-4">
                  {[1, 2, 3].map(i => (
                     <div key={i} className="w-10 h-10 border-4 border-white dark:border-gray-900 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
                        <ShoppingBag className="w-4 h-4 text-gray-300" />
                     </div>
                  ))}
               </div>
               <div className="pr-6">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Active Records</p>
                  <p className="text-xl font-black pl-2 leading-none text-babyshopSky">{orders.length} TOTAL</p>
               </div>
            </motion.div>
          </div>

          <div className="space-y-10">
            {orders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white dark:bg-gray-950 border border-white dark:border-gray-900 rounded-[48px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] hover:shadow-[0_48px_80px_-16px_rgba(0,0,0,0.12)] transition-all duration-700"
              >
                <div className="p-8 md:p-12">
                   <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10 pb-10 border-b border-gray-50 dark:border-gray-900">
                      <div className="flex items-center gap-6">
                         <div className="h-16 w-16 bg-babyshopSky/10 rounded-[28px] flex items-center justify-center text-babyshopSky shadow-inner transform group-hover:rotate-12 transition-transform duration-700">
                            <Package className="w-8 h-8" />
                         </div>
                         <div>
                            <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] mb-1">ARCHIVE REF</p>
                            <p className="font-mono text-sm font-black text-gray-900 dark:text-white uppercase">#{order._id.substring(order._id.length - 12)}</p>
                         </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-10 md:gap-16">
                         <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-2"> <Calendar className="w-3 h-3 text-babyshopSky" /> PLACED ON</p>
                            <p className="text-sm font-black dark:text-white">{new Date(order.createdAt).toLocaleDateString()}</p>
                         </div>
                         <div className="space-y-2">
                            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-2"> <TrendingUp className="w-3 h-3 text-babyshopSky" /> MOMENTUM</p>
                            <Badge 
                              className={`${
                                order.status === 'paid' ? 'bg-green-500 text-white' : 
                                order.status === 'completed' ? 'bg-babyshopSky text-white' : 
                                order.status === 'cancelled' ? 'bg-red-500 text-white' : 
                                'bg-orange-500 text-white'
                              } border-none font-black uppercase text-[9px] tracking-[0.2em] px-5 py-2 rounded-full shadow-lg shadow-black/5`}
                            >
                              {order.status}
                            </Badge>
                         </div>
                         <div className="text-left md:text-right">
                            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">SETTLEMENT</p>
                            <PriceFormatter amount={order.total} className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter" />
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                      <div className="flex flex-col gap-6">
                        <div className="flex -space-x-6 overflow-hidden">
                          {order.items.slice(0, 4).map((item, idx) => (
                            <div key={idx} className="h-24 w-24 rounded-[32px] border-8 border-white dark:border-gray-950 bg-gray-50 dark:bg-gray-900 overflow-hidden shadow-2xl relative group-hover:scale-105 transition-transform duration-500 z-[idx]">
                              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                            </div>
                          ))}
                          {order.items.length > 4 && (
                            <div className="h-24 w-24 rounded-[32px] border-8 border-white dark:border-gray-950 bg-babyshopSky text-white flex items-center justify-center font-black text-xl shadow-2xl z-10">
                               +{order.items.length - 4}
                            </div>
                          )}
                        </div>
                        <div className="pl-2">
                           <h4 className="font-black text-xs uppercase tracking-widest text-gray-400">{order.items.length} Total acquisition{order.items.length > 1 ? 's' : ''} recorded</h4>
                        </div>
                      </div>

                      <div className="flex justify-end pr-4">
                        <Link href={`/user/orders/${order._id}`}>
                          <Button className="h-20 px-12 rounded-[32px] bg-slate-900 text-white dark:bg-white dark:text-black hover:bg-babyshopSky dark:hover:bg-babyshopSky dark:hover:text-white transition-all duration-500 font-black uppercase text-xs tracking-[0.3em] flex gap-6 shadow-2xl shadow-black/10 transform hover:scale-[1.05] active:scale-95 group/btn">
                             <Eye className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                             Review Details
                             <div className="w-10 h-10 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center group-hover/btn:translate-x-2 transition-transform">
                                <ChevronRight className="w-5 h-5" />
                             </div>
                          </Button>
                        </Link>
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrdersPageClient;
