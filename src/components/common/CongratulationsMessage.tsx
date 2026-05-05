'use client';

import React from 'react';
import { PartyPopper } from 'lucide-react';
import { motion } from 'framer-motion';

const CongratulationsMessage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto flex flex-col items-center justify-center py-6 px-4 mt-8 bg-babyshopSky/5 rounded-2xl border border-dashed border-babyshopSky/20 text-center"
    >
      <div className="flex items-center gap-2 mb-1">
        <PartyPopper className="w-5 h-5 text-babyshopSky" />
        <h3 className="text-lg font-bold text-babyshopBlack">You've reached the end! 🎉</h3>
      </div>
      <p className="text-babyshopBlack/50 text-sm font-medium">
        Congratulations! You've seen all our products.
      </p>
    </motion.div>
  );
};

export default CongratulationsMessage;
