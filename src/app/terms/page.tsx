'use client';

import React from 'react';
import Container from '@/components/common/Container';
import { motion } from 'framer-motion';
import { FileText, Scale, ShoppingBag, Truck } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen pb-20 pt-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-16 text-center"
          >
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Terms & Conditions</h1>
            <p className="text-xl text-gray-500">Please read these terms carefully before using our services.</p>
          </motion.div>

          <div className="space-y-8 bg-gray-50 dark:bg-gray-900/50 p-8 md:p-12 rounded-[40px] border border-gray-100 dark:border-gray-800">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Scale className="w-6 h-6 text-babyshopSky" />
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using this website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-babyshopSky" />
                2. Use License
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Permission is granted to temporarily download one copy of the materials on Babyshops website for personal, non-commercial transitory viewing only.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Truck className="w-6 h-6 text-babyshopSky" />
                3. Shipping & Delivery
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Delivery times are estimates and start from the date of shipping, rather than the date of order. We are not responsible for delays caused by customs or local postal services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <FileText className="w-6 h-6 text-babyshopSky" />
                4. Orders & Cancellations
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to refuse or cancel any order for any reason, including limitations on quantities available for purchase or errors in product or pricing information.
              </p>
            </section>

            <div className="pt-8 border-t border-gray-200 dark:border-gray-800 mt-12">
               <p className="text-sm text-center text-gray-400 font-medium">For any questions regarding our terms, please contact legal@babyshop.com</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TermsPage;
