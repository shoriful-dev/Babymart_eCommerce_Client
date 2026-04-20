import Link from 'next/link';
import React from 'react';
import { ArrowRight, Store } from 'lucide-react';

const VendorPromoBanner = () => {
  return (
    <div className="mt-3 w-full rounded-xl overflow-hidden bg-gradient-to-r from-babyshopSky to-blue-500 text-white p-8 md:p-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 text-center md:text-left">
          <div className="bg-white/20 p-4 rounded-2xl hidden md:flex items-center justify-center shrink-0">
            <Store className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Become a Vendor on Babyshop
            </h2>
            <p className="text-blue-100 max-w-xl leading-relaxed">
              Join our marketplace and reach thousands of customers. Sell your
              baby products with ease and grow your business today.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold rounded-full transition-colors"
          >
            Learn More
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-babyshopSky hover:bg-blue-50 font-bold rounded-full transition-colors shadow-lg"
          >
            Apply Now <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VendorPromoBanner;
