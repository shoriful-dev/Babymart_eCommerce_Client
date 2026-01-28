'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Container from '@/components/common/Container';
import { useUserStore } from '@/lib/store';
import { getOrderById, Order } from '@/lib/orderApi';
import { 
  Package, 
  Calendar, 
  MapPin, 
  CreditCard, 
  ChevronLeft, 
  ShoppingBag,
  AlertCircle,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PriceFormatter from '@/components/common/PriceFormatter';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

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
  }, [id, auth_token, isAuthenticated, router]);

  if (loading) {
    return (
      <Container className="py-10">
        <div className="space-y-6">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container className="py-20 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-full mb-6">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Order not found</h2>
        <p className="text-gray-500 mb-8 text-center max-w-xs">
          We couldn't find this order. It may have been removed or the ID is incorrect.
        </p>
        <Link href="/user/orders">
          <Button>Return to Orders</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      {/* Header */}
      <div className="mb-8">
        <Link href="/user/orders" className="inline-flex items-center text-gray-500 hover:text-babyshopSky mb-4 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Orders
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              Order Details
              <Package className="w-8 h-8 text-babyshopSky" />
            </h1>
            <p className="text-sm text-gray-500 mt-1">Order #{order._id.substring(order._id.length - 8)}</p>
          </div>
          <Badge 
            className={`${
              order.status === 'paid' ? 'bg-green-500' : 
              order.status === 'completed' ? 'bg-babyshopSky' : 
              order.status === 'cancelled' ? 'bg-red-500' : 
              'bg-orange-500'
            } text-white`}
          >
            {order.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-babyshopSky" />
              Order Status
            </h3>
            <div className="flex items-center justify-between">
              {['Pending', 'Paid', 'Completed'].map((status, index) => {
                const levels: Record<string, number> = { 'pending': 0, 'paid': 1, 'completed': 2 };
                const currentLevel = levels[order.status] || 0;
                const isActive = currentLevel >= index;
                
                return (
                  <div key={status} className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isActive ? 'bg-babyshopSky text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'}`}>
                      {index + 1}
                    </div>
                    <p className={`text-xs mt-2 ${isActive ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-400'}`}>
                      {status}
                    </p>
                  </div>
                );
              })}
            </div>
            {order.status === 'cancelled' && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-sm text-red-600 dark:text-red-400">This order has been cancelled</p>
              </div>
            )}
          </div>

          {/* Order Items */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-babyshopSky" />
                Order Items
              </span>
              <Badge variant="secondary">{order.items.length} items</Badge>
            </h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-20 h-20 bg-white dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.image!} alt={item.name} width={80} height={80} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">{item.name}</h4>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    <PriceFormatter amount={item.price} className="text-sm font-semibold text-babyshopSky" />
                  </div>
                  <div className="text-right">
                    <PriceFormatter amount={item.price * item.quantity} className="font-bold" />
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <PriceFormatter amount={order.total} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200 dark:border-gray-700">
                <span>Total</span>
                <PriceFormatter amount={order.total} className="text-babyshopSky" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Shipping Address */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-babyshopSky" />
              Shipping Address
            </h3>
            <div className="space-y-2">
              <p className="font-semibold">{authUser?.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{order.shippingAddress.street}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{order.shippingAddress.country}</p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-babyshopSky" />
              Payment Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Method</span>
                <span className="font-semibold">Stripe</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Status</span>
                <Badge variant={order.status === 'paid' || order.status === 'completed' ? 'default' : 'secondary'}>
                  {order.status === 'paid' || order.status === 'completed' ? 'Paid' : 'Pending'}
                </Badge>
              </div>
              {order.paymentIntentId && (
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 mb-1">Transaction ID</p>
                  <p className="text-xs font-mono text-gray-600 dark:text-gray-400 break-all">
                    {order.paymentIntentId}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Info */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-babyshopSky" />
              Order Information
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Order Date</span>
                <span className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Order ID</span>
                <span className="font-mono text-xs">{order._id.substring(order._id.length - 12)}</span>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="bg-babyshopSky/10 rounded-2xl p-6 border border-babyshopSky/20">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-5 h-5 text-babyshopSky" />
              <h3 className="font-semibold">Need Help?</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Contact our support team if you have any questions about your order.
            </p>
            <Button variant="outline" className="w-full">Contact Support</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OrderDetailsPageClient;
