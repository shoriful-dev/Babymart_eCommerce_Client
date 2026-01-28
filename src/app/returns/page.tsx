'use client';

import React from 'react';
import Container from '@/components/common/Container';
import { motion } from 'framer-motion';
import { RefreshCcw, Package, CreditCard, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ReturnsPage = () => {
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen pb-20 pt-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <div className="w-20 h-20 bg-babyshopSky/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
               <RefreshCcw className="w-10 h-10 text-babyshopSky" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Returns & Refunds</h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Not happy with your purchase? No problem. Weve made our return process as simple as possible.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
             {[
               { title: "30 Day Window", desc: "You have 30 days from delivery to start a return.", icon: RefreshCcw },
               { title: "Original State", desc: "Items must be unused and in original packaging.", icon: Package },
               { title: "Quick Refund", desc: "Refunds processed within 5-7 business days.", icon: CreditCard },
             ].map((step, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
                   <step.icon className="w-8 h-8 text-babyshopSky mb-6" />
                   <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                   <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
             ))}
          </div>

          <div className="space-y-6">
             <h2 className="text-3xl font-black tracking-tight mb-8 text-center">How to start a return</h2>
             <div className="space-y-4">
                {[
                  "Go to 'My Orders' in your account",
                  "Select the item you wish to return",
                  "Choose a return reason and submit your request",
                  "Pack the items and drop them off at a local collection point",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-6 p-6 bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-900 rounded-2xl shadow-sm">
                     <div className="w-10 h-10 rounded-full bg-babyshopSky text-white flex items-center justify-center font-bold">{i + 1}</div>
                     <p className="text-lg font-bold">{text}</p>
                  </div>
                ))}
             </div>
          </div>

          <div className="mt-20 p-12 bg-babyshopSky rounded-[40px] text-white text-center">
             <h2 className="text-3xl font-black mb-4">Need further assistance?</h2>
             <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">If you have any specific questions about an exchange or a faulty item, our team is here for you.</p>
             <Link href="/help">
                <Button className="bg-white text-babyshopSky hover:bg-white/90 font-bold px-10 h-14 rounded-2xl">
                   Contact Support Hub
                   <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
             </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ReturnsPage;
