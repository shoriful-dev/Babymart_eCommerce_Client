'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, ShoppingBag, ArrowRight, Package, Truck, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Container from '@/components/common/Container';
import { useCartStore } from '@/lib/store';
import { useSearchParams } from 'next/navigation';

const SuccessPageClient = () => {
  const { clearCart } = useCartStore();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Reset cart after successful payment
    clearCart();
  }, [clearCart]);

  if (!mounted) return null;

  return (
    <div className="bg-gray-50 min-h-[80vh]">
      <Container className="py-16 md:py-24 flex flex-col items-center justify-center">
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-16 max-w-3xl w-full text-center">
          
          <div className="flex justify-center mb-8">
            <div className="bg-green-50 p-6 rounded-full inline-block">
              <CheckCircle2 className="w-20 h-20 text-green-500" />
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Thank You for Your Order!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed">
            Your payment was successful and your order has been received. 
            We've sent a confirmation email with your order details.
          </p>

          {orderId && (
            <div className="mb-10 p-4 bg-gray-50 rounded-xl inline-block border border-gray-100">
               <span className="text-gray-500 font-medium mr-2">Order ID:</span>
               <span className="font-bold text-gray-900">{orderId}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/user/orders" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-14 px-8 rounded-full bg-babyshopSky hover:bg-babyshopSky/90 text-white font-bold text-base shadow-lg shadow-sky-100 transition-transform hover:-translate-y-1">
                <ShoppingBag className="w-5 h-5 mr-3" />
                View My Orders
              </Button>
            </Link>
            <Link href="/shop" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto h-14 px-8 rounded-full border-2 border-gray-200 text-gray-700 font-bold text-base hover:bg-gray-50 hover:border-gray-300 transition-transform hover:-translate-y-1">
                Continue Shopping
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </Link>
          </div>
        </div>

        {/* What Happens Next Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
           <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center shadow-sm">
             <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
               <Package className="w-8 h-8 text-blue-500" />
             </div>
             <h3 className="font-bold text-gray-900 text-lg mb-2">Order Processing</h3>
             <p className="text-sm text-gray-600">We are carefully packing your items and getting them ready for shipment.</p>
           </div>
           
           <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center shadow-sm">
             <div className="bg-babyshopSky/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
               <Truck className="w-8 h-8 text-babyshopSky" />
             </div>
             <h3 className="font-bold text-gray-900 text-lg mb-2">On The Way</h3>
             <p className="text-sm text-gray-600">You'll receive a tracking email as soon as your package leaves our warehouse.</p>
           </div>

           <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center shadow-sm">
             <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
               <Smile className="w-8 h-8 text-orange-500" />
             </div>
             <h3 className="font-bold text-gray-900 text-lg mb-2">Delivery</h3>
             <p className="text-sm text-gray-600">Your premium baby products arrive safely at your doorstep!</p>
           </div>
        </div>

      </Container>
    </div>
  );
};

export default SuccessPageClient;
