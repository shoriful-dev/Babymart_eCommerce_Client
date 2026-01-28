'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShoppingBag, ArrowRight, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Container from '@/components/common/Container';
import { useCartStore } from '@/lib/store';

const SuccessPageClient = () => {
  const { clearCart } = useCartStore();

  useEffect(() => {
    // Reset cart after successful payment
    clearCart();
  }, [clearCart]);

  return (
    <div className="bg-[#FAFAFA] dark:bg-black min-h-screen overflow-hidden">
      <Container className="py-20 flex flex-col items-center justify-center relative">
        {/* Background glow elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-150 bg-babyshopSky/5 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-purple-500/5 rounded-full blur-[100px] -z-10"></div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center max-w-2xl"
        >
          <div className="relative mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="bg-babyshopSky text-white p-8 rounded-[40px] shadow-[0_20px_50px_rgba(41,190,179,0.3)] relative z-10"
            >
              <CheckCircle2 className="w-24 h-24 animate-pulse" />
            </motion.div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 text-babyshopSky"
            >
              <Sparkles className="w-12 h-12 opacity-50" />
            </motion.div>
          </div>
          
          <Badge className="bg-babyshopSky/10 text-babyshopSky border-none px-6 py-2 rounded-full font-black text-xs uppercase tracking-[0.3em] mb-6">
             Transaction Confirmed
          </Badge>

          <h1 className="text-6xl font-black text-gray-900 dark:text-white tracking-tighter mb-6 leading-tight">
            The Magic Has <span className="text-babyshopSky italic underline decoration-babyshopSky/20 decoration-8 underline-offset-8">Begun!</span>
          </h1>
          
          <p className="text-xl text-gray-400 font-medium max-w-lg mx-auto leading-relaxed mb-12">
            Your premium selection is now being curated with care. Weve sent the digital receipt to your sanctuary.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 w-full justify-center px-4">
            <Link href="/user/orders" className="flex-1 max-w-70">
              <Button className="w-full h-16 rounded-[28px] bg-slate-900 text-white dark:bg-white dark:text-black hover:bg-babyshopSky dark:hover:bg-babyshopSky dark:hover:text-white transition-all duration-500 font-black uppercase text-xs tracking-[0.2em] shadow-2xl gap-4 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
                Track Order
              </Button>
            </Link>
            <Link href="/shop" className="flex-1 max-w-70">
              <Button variant="outline" className="w-full h-16 rounded-[28px] border-2 border-gray-100 dark:border-gray-800 font-black uppercase text-xs tracking-[0.2em] transition-all duration-300 hover:scale-[1.05] flex items-center justify-center gap-4">
                Explore More
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Decorative Progress Path */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-5xl">
          {[
            { 
              icon: Zap, 
              title: "Manifestation", 
              desc: "Automated verification complete.",
              color: "text-blue-500",
              bg: "bg-blue-500/10"
            },
            { 
              icon: ShieldCheck, 
              title: "Curation", 
              desc: "Qualitative analysis in progress.",
              color: "text-purple-500",
              bg: "bg-purple-500/10"
            },
            { 
              icon: Sparkles, 
              title: "Dispatch", 
              desc: "Estimated arrival: 3-5 standard cycles.",
              color: "text-babyshopSky",
              bg: "bg-babyshopSky/10"
            }
          ].map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="flex flex-col items-center p-8 bg-white dark:bg-gray-950 rounded-[40px] border border-white dark:border-gray-900 shadow-xl shadow-gray-200/50 dark:shadow-none relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50/50 dark:bg-gray-900/50 rounded-full translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-700"></div>
              <div className={`p-4 ${step.bg} ${step.color} rounded-2xl mb-6 relative z-10`}>
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white mb-2 relative z-10">{step.title}</h3>
              <p className="text-[10px] text-center font-bold text-gray-400 uppercase tracking-widest leading-loose relative z-10">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
};

import { Badge } from '@/components/ui/badge';

export default SuccessPageClient;
