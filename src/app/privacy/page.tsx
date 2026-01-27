'use client';

import React from 'react';
import Container from '@/components/common/Container';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, CheckCircle } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen pb-20 pt-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Privacy Policy</h1>
            <p className="text-xl text-gray-500">Last updated: January 27, 2026. Your privacy is important to us.</p>
          </motion.div>

          <div className="space-y-12">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-babyshopSky" />
                Information We Collect
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                We collect information you provide directly to us when you create an account, make a purchase, or contact our support team. This includes your name, email address, shipping address, and payment information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Lock className="w-6 h-6 text-babyshopSky" />
                How We Use Your Data
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                   "To process and fulfill your orders",
                   "To provide 24/7 customer support",
                   "To send order updates and newsletters",
                   "To improve our products and services",
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-medium">{item}</span>
                   </div>
                 ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Eye className="w-6 h-6 text-babyshopSky" />
                Data Security
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                We use industry-standard encryption (SSL/TLS) to protect your personal data during transmission. Your payment information is processed through secure, PCI-compliant gateways like Stripe and is never stored on our servers.
              </p>
            </section>
            
            <section className="p-8 bg-babyshopSky/5 rounded-3xl border border-babyshopSky/10">
               <h3 className="text-xl font-bold mb-3">Your Rights</h3>
               <p className="text-gray-600">You have the right to access, correct, or delete your personal information at any time. Simply log in to your account settings or contact our privacy officer at privacy@babyshop.com.</p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PrivacyPage;
