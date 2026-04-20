'use client';
import Container from '@/components/common/Container';
import { Title } from '@/components/common/text';
import React from 'react';
import { HelpCircle, Package, Truck, CreditCard, RotateCcw } from 'lucide-react';
import Link from 'next/link';

const HelpPage = () => {
  return (
    <Container className="py-12 md:py-20 max-w-5xl">
      <div className="text-center mb-16 space-y-4">
        <Title className="text-4xl md:text-5xl font-bold">Help Center</Title>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto border-l-0">
          How can we help you today? Browse our frequently asked questions or contact our support team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
         <Link href="/user/orders" className="bg-white border hover:border-babyshopSky transition-all p-6 rounded-2xl flex flex-col items-center text-center gap-3 cursor-pointer shadow-sm hover:shadow-md group">
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-2 group-hover:scale-110 transition-transform">
               <Package size={28} />
            </div>
            <h3 className="font-bold text-gray-900">Orders</h3>
            <p className="text-sm text-gray-500">Track, modify, or cancel an order</p>
         </Link>

         <Link href="/help/shipping" className="bg-white border hover:border-babyshopSky transition-all p-6 rounded-2xl flex flex-col items-center text-center gap-3 cursor-pointer shadow-sm hover:shadow-md group">
            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-2 group-hover:scale-110 transition-transform">
               <Truck size={28} />
            </div>
            <h3 className="font-bold text-gray-900">Shipping</h3>
            <p className="text-sm text-gray-500">Delivery times, methods, and costs</p>
         </Link>

         <Link href="/help/returns" className="bg-white border hover:border-babyshopSky transition-all p-6 rounded-2xl flex flex-col items-center text-center gap-3 cursor-pointer shadow-sm hover:shadow-md group">
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-2 group-hover:scale-110 transition-transform">
               <RotateCcw size={28} />
            </div>
            <h3 className="font-bold text-gray-900">Returns</h3>
            <p className="text-sm text-gray-500">Return policies and exchange process</p>
         </Link>

         <Link href="/help/contact" className="bg-white border hover:border-babyshopSky transition-all p-6 rounded-2xl flex flex-col items-center text-center gap-3 cursor-pointer shadow-sm hover:shadow-md group">
            <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center text-purple-500 mb-2 group-hover:scale-110 transition-transform">
               <CreditCard size={28} />
            </div>
            <h3 className="font-bold text-gray-900">Payments</h3>
            <p className="text-sm text-gray-500">Payment methods and invoices</p>
         </Link>
      </div>

      <div className="space-y-10 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
             <HelpCircle className="text-babyshopSky w-5 h-5" /> How long does shipping take?
          </h3>
          <p className="text-gray-600 pl-7 leading-relaxed">
             Standard shipping typically takes 3-5 business days within the continental US. Expedited shipping options (1-2 days) are available at checkout. International shipping times vary by location.
          </p>
        </div>

        <div className="space-y-4 border-t border-gray-100 pt-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
             <HelpCircle className="text-babyshopSky w-5 h-5" /> Can I cancel or modify my order?
          </h3>
          <p className="text-gray-600 pl-7 leading-relaxed">
             We process orders quickly to ensure fast delivery. You can cancel or modify your order within 60 minutes of placing it by visiting your <Link href="/user/orders" className="text-babyshopSky hover:underline">Order History</Link>. After this window, the order cannot be changed.
          </p>
        </div>

        <div className="space-y-4 border-t border-gray-100 pt-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
             <HelpCircle className="text-babyshopSky w-5 h-5" /> What is your return policy?
          </h3>
          <p className="text-gray-600 pl-7 leading-relaxed">
             We offer a 30-day return policy on most items. Products must be unused and in their original packaging. For full details, please visit our <Link href="/help/returns" className="text-babyshopSky hover:underline">Returns & Exchanges</Link> page.
          </p>
        </div>
      </div>

      <div className="mt-20 bg-babyshopSky/10 p-10 rounded-3xl text-center">
         <h2 className="text-2xl font-bold text-gray-900 mb-4">Still need help?</h2>
         <p className="text-gray-600 mb-6 max-w-xl mx-auto">
           Our customer support team is available 24/7 to assist you with any questions or concerns you might have.
         </p>
         <Link href="/help/contact">
            <button className="bg-babyshopSky text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors">
               Contact Support
            </button>
         </Link>
      </div>

    </Container>
  );
};

export default HelpPage;
