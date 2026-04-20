import Container from '@/components/common/Container';
import { Title } from '@/components/common/text';
import { Truck, Clock, MapPin, Package, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const ShippingInfoPage = () => {
  return (
    <Container className="py-12 md:py-20 max-w-4xl">
      <div className="flex flex-col gap-10">
        <div className="space-y-4">
          <Title className="text-3xl md:text-5xl font-bold">Shipping Info</Title>
          <p className="text-gray-500 font-medium border-l-4 border-babyshopSky pl-4">
            Everything you need to know about our delivery options and timelines.
          </p>
        </div>

        {/* Shipping Options Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-center">
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">Standard Shipping</h3>
            <p className="text-babyshopSky font-bold text-2xl mb-2">Free</p>
            <p className="text-sm text-gray-500">On orders over $75</p>
            <p className="text-sm text-gray-600 mt-2">Delivery in 3–5 business days</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-center">
            <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">Expedited Shipping</h3>
            <p className="text-orange-500 font-bold text-2xl mb-2">$9.99</p>
            <p className="text-sm text-gray-500">All order sizes</p>
            <p className="text-sm text-gray-600 mt-2">Delivery in 1–2 business days</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-center">
            <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">International</h3>
            <p className="text-green-600 font-bold text-2xl mb-2">$24.99+</p>
            <p className="text-sm text-gray-500">Varies by location</p>
            <p className="text-sm text-gray-600 mt-2">Delivery in 7–14 business days</p>
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 border-l-4 border-babyshopSky pl-4">How Shipping Works</h2>
          <div className="space-y-4">
            {[
              { icon: Package, title: 'Order Confirmed', desc: 'Once your order is placed, you\'ll receive a confirmation email within a few minutes.' },
              { icon: Clock, title: 'Processing Time', desc: 'Most orders are processed and packed within 1 business day. Custom or personalized items may take longer.' },
              { icon: Truck, title: 'Shipped Out', desc: 'You\'ll receive a tracking email as soon as your package is picked up by our shipping carrier.' },
              { icon: CheckCircle, title: 'Delivered!', desc: 'Your baby products arrive safely at your doorstep, packaged with care.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="flex gap-4 items-start p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-babyshopSky/10 text-babyshopSky flex items-center justify-center shrink-0">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 border-l-4 border-babyshopSky pl-4">Order Tracking</h2>
          <p className="text-gray-600 leading-relaxed">
            Once your order ships, you'll receive an email with a tracking number. You can use this number on the carrier's website or through your{' '}
            <Link href="/user/orders" className="text-babyshopSky hover:underline font-medium">My Orders</Link>{' '}
            page to follow your package's journey.
          </p>
        </div>

        <div className="bg-babyshopSky/10 p-8 rounded-2xl border border-babyshopSky/20">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Still have questions?</h2>
          <p className="text-gray-600 mb-4">Our support team is always happy to help with any shipping questions.</p>
          <Link href="/help/contact" className="inline-flex items-center gap-2 bg-babyshopSky text-white px-6 py-3 rounded-full font-bold hover:bg-babyshopSky/90 transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default ShippingInfoPage;
