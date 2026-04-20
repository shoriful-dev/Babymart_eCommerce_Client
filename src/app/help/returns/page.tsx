import Container from '@/components/common/Container';
import { Title } from '@/components/common/text';
import { RotateCcw, CheckCircle, XCircle, Clock, Package } from 'lucide-react';
import Link from 'next/link';

const ReturnsPage = () => {
  return (
    <Container className="py-12 md:py-20 max-w-4xl">
      <div className="flex flex-col gap-10">
        <div className="space-y-4">
          <Title className="text-3xl md:text-5xl font-bold">Returns & Exchanges</Title>
          <p className="text-gray-500 font-medium border-l-4 border-babyshopSky pl-4">
            Hassle-free returns within 30 days of purchase.
          </p>
        </div>

        {/* Policy Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center">
            <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 text-lg mb-1">30-Day Returns</h3>
            <p className="text-sm text-gray-600">Return most unused items within 30 days of delivery for a full refund.</p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
            <RotateCcw className="w-10 h-10 text-blue-500 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 text-lg mb-1">Free Exchanges</h3>
            <p className="text-sm text-gray-600">Exchange any item for a different size or color at no extra charge.</p>
          </div>
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 text-center">
            <Clock className="w-10 h-10 text-orange-500 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 text-lg mb-1">Fast Refunds</h3>
            <p className="text-sm text-gray-600">Refunds are processed within 5–7 business days after we receive your item.</p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 border-l-4 border-babyshopSky pl-4">How to Return an Item</h2>
          <div className="space-y-4">
            {[
              { step: 1, title: 'Initiate Your Return', desc: 'Log in to your account, go to "My Orders", and select "Return Item" for the product you want to send back.' },
              { step: 2, title: 'Print Shipping Label', desc: 'Once approved, we\'ll email you a prepaid return label. Print it and attach it securely to your package.' },
              { step: 3, title: 'Drop Off Package', desc: 'Drop your package at any authorized shipping location. Keep the receipt as proof of shipment.' },
              { step: 4, title: 'Receive Your Refund', desc: 'Once we receive and inspect the item, your refund will be processed to your original payment method within 5–7 days.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4 items-start p-5 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-babyshopSky text-white font-bold flex items-center justify-center shrink-0 text-lg">
                  {step}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{title}</h3>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 border-l-4 border-red-400 pl-4 flex items-center gap-2">
            <XCircle className="text-red-400 w-6 h-6" /> Non-Returnable Items
          </h2>
          <p className="text-gray-600">For hygiene and safety reasons, these items cannot be returned unless defective:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Opened feeding items (bottles, pacifiers, breast pumps)</li>
            <li>Diapers and wipes (unless unopened in original sealed packaging)</li>
            <li>Personal care and skincare products</li>
            <li>Customized or personalized items</li>
            <li>Clearance or final sale items</li>
          </ul>
        </div>

        <div className="space-y-4 pt-6 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 border-l-4 border-babyshopSky pl-4 flex items-center gap-2">
            <Package className="text-babyshopSky w-6 h-6" /> Defective or Wrong Items
          </h2>
          <p className="text-gray-600 leading-relaxed">
            If you received a defective, damaged, or incorrect item, please contact us within <strong>48 hours</strong> of delivery. We'll send you a replacement or issue a full refund immediately — no return shipping required.
          </p>
        </div>

        <div className="bg-babyshopSky/10 p-8 rounded-2xl border border-babyshopSky/20">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Need help with your return?</h2>
          <p className="text-gray-600 mb-4">Our team is here to make returns painless. Reach out and we'll sort it out quickly.</p>
          <Link href="/help/contact" className="inline-flex items-center gap-2 bg-babyshopSky text-white px-6 py-3 rounded-full font-bold hover:bg-babyshopSky/90 transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default ReturnsPage;
