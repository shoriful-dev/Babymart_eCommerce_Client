import Container from '@/components/common/Container';
import { Title } from '@/components/common/text';
import React from 'react';

const ReturnsPage = () => {
  return (
    <Container className="py-12 md:py-20 max-w-4xl">
      <div className="flex flex-col gap-10">
        <div className="space-y-4">
          <Title className="text-3xl md:text-5xl font-bold">Returns & Exchanges</Title>
          <p className="text-gray-500 font-medium">Hassle-free returns within 30 days of purchase</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 border-l-4 border-babyshopSky pl-4">Our Policy</h2>
          <p className="text-gray-600 leading-relaxed">
            If you or your baby are not completely satisfied with your purchase, you may return the item within 30 days of delivery for a full refund or exchange. Items must be in their original, unused condition with all tags and original packaging attached.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 border-l-4 border-babyshopSky pl-4">How to Return an Item</h2>
          
          <div className="space-y-6">
             <div className="flex gap-4 items-start">
               <div className="w-8 h-8 rounded-full bg-babyshopSky text-white flex items-center justify-center font-bold shrink-0 mt-1">1</div>
               <div>
                 <h3 className="font-bold text-lg text-gray-800">Initiate the Return</h3>
                 <p className="text-gray-600">Log into your account, go to "My Orders", and select the items you wish to return. If you checked out as a guest, please contact our support team.</p>
               </div>
             </div>
             
             <div className="flex gap-4 items-start">
               <div className="w-8 h-8 rounded-full bg-babyshopSky text-white flex items-center justify-center font-bold shrink-0 mt-1">2</div>
               <div>
                 <h3 className="font-bold text-lg text-gray-800">Print Your Label</h3>
                 <p className="text-gray-600">Once your return is approved, we will email you a prepaid shipping label. Print this label and attach it securely to your return package.</p>
               </div>
             </div>

             <div className="flex gap-4 items-start">
               <div className="w-8 h-8 rounded-full bg-babyshopSky text-white flex items-center justify-center font-bold shrink-0 mt-1">3</div>
               <div>
                 <h3 className="font-bold text-lg text-gray-800">Ship It Back</h3>
                 <p className="text-gray-600">Drop off the package at any authorized shipping location. Ensure the items are securely packaged to avoid damage during transit.</p>
               </div>
             </div>
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 border-l-4 border-babyshopSky pl-4">Non-Returnable Items</h2>
          <p className="text-gray-600 leading-relaxed">
            For hygiene and safety reasons, the following items are final sale and cannot be returned unless defective:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-2">
            <li>Opened feeding items (bottles, pacifiers)</li>
            <li>Diapers and wipes (unless unopened in original sealed packaging)</li>
            <li>Personal care products</li>
            <li>Customized or personalized items</li>
            <li>Clearance or final sale items</li>
          </ul>
        </div>
        
        <div className="space-y-4 bg-gray-50 p-8 rounded-xl border border-gray-100 mt-6">
          <h2 className="text-2xl font-semibold text-gray-900">Need Help?</h2>
          <p className="text-gray-600 leading-relaxed">
            If you need assistance with an exchange or a defective item return, our Customer Support team is here to help!
          </p>
          <div className="mt-4 space-y-2 text-sm text-gray-800">
             <p className="flex items-center gap-2"><strong>Email:</strong> support@babyshop.com</p>
             <p className="flex items-center gap-2"><strong>Phone:</strong> 1-800-BABYSHOP</p>
          </div>
        </div>

      </div>
    </Container>
  );
};

export default ReturnsPage;
