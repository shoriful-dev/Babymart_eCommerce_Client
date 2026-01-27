'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Container from '@/components/common/Container';
import { useUserStore } from '@/lib/store';
import { getOrderById, Order } from '@/lib/orderApi';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Calendar, 
  Clock, 
  MapPin, 
  CreditCard, 
  ChevronLeft, 
  ShoppingBag,
  AlertCircle,
  FileText,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PriceFormatter from '@/components/common/PriceFormatter';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const OrderDetailsPageClient = () => {
  const { id } = useParams();
  const router = useRouter();
  const { auth_token, isAuthenticated, authUser } = useUserStore();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!isAuthenticated || !auth_token) {
        router.push('/login');
        return;
      }

      try {
        const data = await getOrderById(id as string, auth_token);
        if (data) {
          setOrder(data);
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
    
    // Live update: refresh every 10 seconds to see status changes from admin
    const interval = setInterval(fetchOrder, 10000);
    return () => clearInterval(interval);
  }, [id, auth_token, isAuthenticated, router]);

  if (loading) {
    return (
      <Container className="py-20">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="space-y-4">
             <Skeleton className="h-4 w-48 rounded-full" />
             <Skeleton className="h-12 w-64 rounded-xl" />
          </div>
          <Skeleton className="h-[400px] w-full rounded-[48px]" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Skeleton className="h-64 w-full rounded-[32px]" />
            <Skeleton className="h-64 w-full rounded-[32px]" />
            <Skeleton className="h-64 w-full rounded-[32px]" />
          </div>
        </div>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container className="py-20 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="p-8 bg-red-50 dark:bg-red-900/10 rounded-full mb-8">
           <AlertCircle className="w-16 h-16 text-red-500" />
        </div>
        <h2 className="text-4xl font-black mb-4 tracking-tighter">Order Lost in Transit</h2>
        <p className="text-gray-500 mb-10 text-center max-w-sm font-medium">
          We couldn't retrieve the specific details for this order. It might have been archived or the ID is incorrect.
        </p>
        <Link href="/user/orders">
          <Button className="h-14 px-10 rounded-full font-black text-xs uppercase tracking-widest bg-black text-white dark:bg-white dark:text-black">
            Return to Orders
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <div className="bg-[#FAFAFA] dark:bg-black min-h-screen pb-20">
      <Container className="py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
          >
            <div>
              <Link href="/user/orders" className="inline-flex items-center text-gray-400 hover:text-babyshopSky mb-6 transition-all duration-300 group text-[10px] font-black uppercase tracking-[0.3em]">
                <ChevronLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                History Archive
              </Link>
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 bg-babyshopSky rounded-2xl flex items-center justify-center text-white shadow-xl shadow-babyshopSky/20">
                    <ShoppingBag className="w-6 h-6" />
                 </div>
                 <h1 className="text-5xl font-black tracking-tighter lg:text-6xl">
                    Order <span className="text-babyshopSky italic underline decoration-babyshopSky/30 decoration-8 underline-offset-8">Receipt</span>
                 </h1>
              </div>
              <p className="text-xs font-mono text-gray-400 mt-4 bg-white dark:bg-gray-900 inline-block px-4 py-2 rounded-full border border-gray-100 dark:border-gray-800 shadow-sm">
                 ID: {order._id.toUpperCase()}
              </p>
            </div>
            
            <div className="flex flex-col items-end gap-4">
               <Badge className={`
                  ${order.status === 'paid' ? 'bg-green-500' : 
                    order.status === 'completed' ? 'bg-babyshopSky' : 
                    'bg-orange-600'} border-none uppercase text-[11px] px-8 py-3 font-black tracking-[0.2em] rounded-full shadow-2xl text-white shadow-babyshopSky/20
               `}>
                 {order.status === 'paid' ? 'Transaction Verified' : order.status}
               </Badge>
               <div className="flex items-center gap-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-babyshopSky" /> {new Date(order.createdAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-babyshopSky" /> {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
               </div>
            </div>
          </motion.div>

          {/* Delivery & Tracking Visualizer */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-950 rounded-[48px] p-12 mb-12 border border-white dark:border-gray-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-babyshopSky/5 rounded-full blur-[100px] -z-0"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px] -z-0"></div>
             
             <div className="relative z-10">
                <div className="flex items-center justify-between mb-12">
                   <h3 className="text-xl font-black tracking-tighter flex items-center gap-3">
                      <Zap className="w-6 h-6 text-babyshopSky fill-babyshopSky" />
                      Live Status Tracking
                   </h3>
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-babyshopSky rounded-full animate-ping"></div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-babyshopSky">Real-time update active</span>
                   </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between relative px-6 md:px-20 gap-12 md:gap-0">
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-50 dark:bg-gray-900 -translate-y-1/2 z-0 hidden md:block rounded-full"></div>
                  <div 
                    className="absolute top-1/2 left-0 h-1 bg-babyshopSky -translate-y-1/2 z-0 transition-all duration-1000 hidden md:block rounded-full animate-pulse"
                    style={{ 
                      width: order.status === 'pending' ? '12%' : 
                             order.status === 'paid' ? '50%' : 
                             order.status === 'completed' ? '100%' : '0%' 
                    }}
                  ></div>

                  {[
                    { label: 'Booking', status: 'pending', icon: ShoppingBag, desc: 'Processing Order' },
                    { label: 'Verified', status: 'paid', icon: ShieldCheck, desc: 'Payment Cleared' },
                    { label: 'Outward', status: 'completed', icon: Package, desc: 'Order Fulfilled' },
                  ].map((step, index) => {
                    const levels: Record<string, number> = { 'pending': 0, 'paid': 1, 'completed': 2 };
                    const currentLevel = levels[order.status] || 0;
                    const stepLevel = levels[step.status] || 0;
                    const active = order.status !== 'cancelled' && currentLevel >= stepLevel;

                    return (
                      <div key={index} className="flex flex-col items-center relative z-10 group">
                        <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center transition-all duration-700 border-8 border-white dark:border-gray-950 shadow-2xl ${active ? 'bg-babyshopSky text-white shadow-babyshopSky/40 rotate-12 scale-110' : 'bg-gray-50 dark:bg-gray-900 text-gray-300'}`}>
                          <step.icon className={`w-6 h-6 ${active ? 'animate-bounce' : ''}`} />
                        </div>
                        <div className="text-center mt-6">
                           <p className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${active ? 'text-black dark:text-white' : 'text-gray-400'}`}>{step.label}</p>
                           <p className="text-[9px] font-bold text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
             </div>
             
             {order.status === 'cancelled' && (
                <div className="mt-12 p-6 bg-red-500 text-white rounded-[32px] flex items-center gap-6 shadow-xl shadow-red-500/20">
                   <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md">
                      <AlertCircle className="w-8 h-8" />
                   </div>
                   <div>
                      <h4 className="font-black text-xl leading-none mb-1 uppercase tracking-tighter">Transaction Cancelled</h4>
                      <p className="text-sm font-medium text-white/80">Funds will be reverted to your original payment method within 3-5 business days.</p>
                   </div>
                </div>
             )}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
             {/* Left: Manifest Section */}
             <div className="lg:col-span-2 space-y-12">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-gray-950 border border-white dark:border-gray-900 rounded-[48px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)]"
                >
                   <div className="p-10 border-b border-gray-50 dark:border-gray-900 flex items-center justify-between">
                      <h3 className="text-2xl font-black tracking-tighter flex items-center gap-4">
                         <div className="w-10 h-10 bg-babyshopSky/10 rounded-xl flex items-center justify-center">
                            <Package className="w-5 h-5 text-babyshopSky" />
                         </div>
                         Item Manifest
                      </h3>
                      <Badge variant="outline" className="rounded-full px-5 py-2 font-black text-[10px] uppercase tracking-widest border-gray-200">
                         {order.items.length} Units Confirmed
                      </Badge>
                   </div>
                   
                   <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar">
                      {order.items.map((item, index) => (
                         <div key={index} className="flex items-center gap-8 p-6 rounded-[32px] hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 group">
                            <div className="w-32 h-32 bg-gray-50 dark:bg-gray-900 rounded-[28px] overflow-hidden border border-white dark:border-gray-800 shadow-xl shrink-0 group-hover:scale-105 transition-transform duration-500">
                               <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                               <h4 className="font-black text-xl text-gray-900 dark:text-white truncate group-hover:text-babyshopSky transition-colors">{item.name}</h4>
                               <div className="flex items-center gap-3 mt-3">
                                  <span className="text-[10px] font-black bg-white dark:bg-gray-800 px-4 py-1.5 rounded-full border border-gray-100 dark:border-gray-800 text-gray-400 uppercase tracking-widest leading-none">QTY: {item.quantity}</span>
                                  <PriceFormatter amount={item.price} className="text-babyshopSky font-black text-sm" />
                               </div>
                            </div>
                            <div className="text-right">
                               <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mb-1">Line Total</p>
                               <PriceFormatter amount={item.price * item.quantity} className="font-black text-2xl tracking-tighter" />
                            </div>
                         </div>
                      ))}
                   </div>

                   <div className="p-10 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 space-y-6">
                      <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                         <span>Subtotal Summary</span>
                         <PriceFormatter amount={order.total} className="text-gray-900 dark:text-white text-base" />
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                         <span>Logistics & Postage</span>
                         <div className="flex items-center gap-2">
                            <span className="line-through text-gray-200">$25.00</span>
                            <span className="text-green-500 font-black">Complementary</span>
                         </div>
                      </div>
                      <div className="pt-10 border-t-2 border-dashed border-gray-200 dark:border-gray-800 flex justify-between items-center">
                         <div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] block mb-2">Final Settlement</span>
                            <PriceFormatter amount={order.total} className="text-5xl font-black text-babyshopSky tracking-tighter" />
                         </div>
                         { (order.status === 'paid' || order.status === 'completed') && (
                            <Button className="h-16 px-10 rounded-[28px] bg-black text-white dark:bg-white dark:text-black hover:bg-babyshopSky dark:hover:bg-babyshopSky dark:hover:text-white transition-all font-black uppercase text-xs tracking-[0.2em] shadow-2xl gap-4 group">
                               <FileText className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                               Download Invoice
                            </Button>
                         )}
                      </div>
                   </div>
                </motion.div>
             </div>

             {/* Right: Identity Section */}
             <div className="space-y-12">
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white dark:bg-gray-950 border rounded-[48px] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.04)] space-y-10"
                >
                   <div>
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-3 mb-8">
                         <div className="w-8 h-8 bg-babyshopSky/10 rounded-xl flex items-center justify-center text-babyshopSky">
                            <MapPin className="w-4 h-4" />
                         </div>
                         Delivery Point
                      </h4>
                      <div className="space-y-4">
                         <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-3xl">
                            <div className="w-12 h-12 bg-babyshopSky text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-babyshopSky/20">
                               { authUser?.name?.charAt(0) || 'U' }
                            </div>
                            <div>
                               <p className="font-black text-lg leading-none mb-1">{ authUser?.name }</p>
                               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Authorized Receiver</p>
                            </div>
                         </div>
                         <div className="text-sm font-bold space-y-1 pl-4 border-l-4 border-babyshopSky/20">
                            <p className="text-gray-900 dark:text-white">{order.shippingAddress.street}</p>
                            <p className="text-gray-500">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                            <p className="text-babyshopSky font-black uppercase text-[11px] pt-2 tracking-[0.21em]">{order.shippingAddress.country}</p>
                         </div>
                      </div>
                   </div>

                   <div className="pt-10 border-t border-gray-50 dark:border-gray-900">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-3 mb-8">
                         <div className="w-8 h-8 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500">
                            <CreditCard className="w-4 h-4" />
                         </div>
                         Settlement Source
                      </h4>
                      <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-[36px] shadow-2xl relative overflow-hidden text-white group cursor-default">
                         <Sparkles className="absolute top-4 right-4 w-5 h-5 text-babyshopSky/40 group-hover:text-babyshopSky transition-colors" />
                         <div className="relative z-10 flex flex-col justify-between h-32">
                            <div className="flex justify-between items-start">
                               <p className="font-black text-xs uppercase tracking-widest text-white/40">Secure Transaction</p>
                               <Badge className="bg-green-500 text-[8px] font-black uppercase border-none px-2 h-4">Verified</Badge>
                            </div>
                            <div>
                               <p className="font-mono text-lg tracking-[0.2em] mb-1">•••• •••• •••• {order.paymentIntentId?.substring(order.paymentIntentId.length - 4) || '9981'}</p>
                               <div className="flex justify-between items-end">
                                  <p className="text-[10px] font-bold uppercase text-white/60 tracking-widest underline decoration-babyshopSky decoration-2 underline-offset-4">Stripe Gateway</p>
                                  <p className="font-black text-xl italic uppercase tracking-tighter">Gold Card</p>
                               </div>
                            </div>
                         </div>
                      </div>
                      <div className="mt-6 text-center">
                         <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Auth Code</p>
                         <p className="text-[10px] font-mono break-all font-bold text-gray-300 dark:text-gray-600 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-2xl">{order.paymentIntentId || 'TXN_REF_00299182'}</p>
                      </div>
                   </div>
                </motion.div>

                <div className="p-8 bg-white dark:bg-gray-950 border border-white dark:border-gray-900 rounded-[40px] shadow-xl text-center">
                   <p className="text-xs font-black text-gray-900 dark:text-white capitalize mb-2 flex items-center justify-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-babyshopSky" />
                      Purchase Protection Active
                   </p>
                   <p className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-widest mb-6">
                      Your order is insured by Babymart 24/7. Need help? Contact our elite support.
                   </p>
                   <Link href="/help-center" className="inline-flex items-center text-[10px] font-black uppercase text-babyshopSky hover:text-black dark:hover:text-white transition-colors gap-2 group">
                      Open Support Ticket
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-2 transition-transform" />
                   </Link>
                </div>
             </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrderDetailsPageClient;
