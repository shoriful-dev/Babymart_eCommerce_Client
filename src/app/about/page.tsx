'use client';

import React from 'react';
import Container from '@/components/common/Container';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Truck, Star, Users, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AboutPage = () => {
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen pb-20">
      <div className="bg-babyshopSky/5 py-24 relative overflow-hidden">
        <Container>
           <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
              >
                 <Badge className="mb-6 bg-babyshopSky text-white border-none py-1 px-4 text-sm font-bold">Our Story</Badge>
                 <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">We believe every baby deserves <span className="text-babyshopSky">the best</span>.</h1>
                 <p className="text-xl text-gray-500 leading-relaxed">Founded in 2025, Babyshop started with a simple mission: to provide parents with high-quality, safe, and stylish products for their little ones.</p>
              </motion.div>
           </div>
        </Container>
      </div>

      <Container className="py-24">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Safe & Trusted", desc: "All our products meet international safety standards and are tested for child safety.", icon: ShieldCheck, color: "text-green-500" },
              { title: "Ethically Sourced", desc: "We work directly with manufacturers who share our commitment to ethical production.", icon: Heart, color: "text-red-500" },
              { title: "Global Delivery", desc: "Seamless shipping to parents in over 45 countries with real-time tracking.", icon: Globe, color: "text-blue-500" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-4"
              >
                 <div className={`w-14 h-14 rounded-2xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center ${item.color}`}>
                    <item.icon className="w-7 h-7" />
                 </div>
                 <h3 className="text-2xl font-bold">{item.title}</h3>
                 <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
         </div>

         <div className="mt-32 p-12 bg-gray-950 rounded-[40px] text-white">
            <div className="max-w-3xl">
               <h2 className="text-4xl font-black mb-6 tracking-tight">Our Commitment to Quality</h2>
               <p className="text-gray-400 text-lg leading-relaxed mb-8">From organic cotton apparel to BPA-free feeding accessories, every item in our inventory is hand-picked by our team of baby care specialists. We understand that as a parent, your priority is safety—and it's ours too.</p>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                     <p className="text-3xl font-bold text-babyshopSky">100%</p>
                     <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Authenticity</p>
                  </div>
                  <div>
                     <p className="text-3xl font-bold text-babyshopSky">24/7</p>
                     <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Support</p>
                  </div>
                  <div>
                     <p className="text-3xl font-bold text-babyshopSky">30 Days</p>
                     <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Returns</p>
                  </div>
                  <div>
                     <p className="text-3xl font-bold text-babyshopSky">ISO</p>
                     <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Certified</p>
                  </div>
               </div>
            </div>
         </div>
      </Container>
    </div>
  );
};

export default AboutPage;
