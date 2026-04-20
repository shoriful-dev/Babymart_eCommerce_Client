import Container from '@/components/common/Container';
import { Title } from '@/components/common/text';
import React from 'react';

const PrivacyPage = () => {
  return (
    <Container className="py-12 md:py-20 max-w-4xl">
      <div className="flex flex-col gap-10">
        <div className="space-y-4">
          <Title className="text-3xl md:text-5xl font-bold">Privacy Policy</Title>
          <p className="text-gray-500 font-medium">Last updated: April 19, 2026</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 border-l-4 border-babyshopSky pl-4">Introduction</h2>
          <p className="text-gray-600 leading-relaxed">
            At Babyshop, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or make a purchase.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 border-l-4 border-babyshopSky pl-4">Information We Collect</h2>
          
          <div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Personal Information</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>Name, email address, and phone number</li>
              <li>Billing and shipping addresses</li>
              <li>Payment information (processed securely through our payment providers)</li>
              <li>Account credentials</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Usage Information</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>Browser type and version</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website addresses</li>
              <li>IP address and device information</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 border-l-4 border-babyshopSky pl-4">How We Use Your Information</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about your purchases</li>
            <li>Provide customer support</li>
            <li>Send promotional emails (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>
        </div>

        <div className="space-y-4 pt-6 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 border-l-4 border-babyshopSky pl-4">Information Sharing</h2>
          <p className="text-gray-600 leading-relaxed">
            We do not sell, trade, or otherwise transfer your personal information to third parties, except in the following circumstances:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-2">
            <li>Service providers who assist in operating our website and conducting business</li>
            <li>Payment processors for secure transaction processing</li>
            <li>Shipping companies for order fulfillment</li>
            <li>Legal compliance when required by law</li>
          </ul>
        </div>

        <div className="space-y-4 pt-6 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 border-l-4 border-babyshopSky pl-4">Data Security</h2>
          <p className="text-gray-600 leading-relaxed">
            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes SSL encryption for data transmission and secure payment processing.
          </p>
        </div>
        
        <div className="space-y-4 pt-6 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 border-l-4 border-babyshopSky pl-4">Cookies</h2>
          <p className="text-gray-600 leading-relaxed">
            Our website uses cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings.
          </p>
        </div>

        <div className="space-y-4 bg-gray-50 p-8 rounded-xl border border-gray-100 mt-6">
          <h2 className="text-2xl font-semibold text-gray-900">Contact Us</h2>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions about this Privacy Policy or how we handle your personal information, please contact us at:
          </p>
          <div className="mt-4 space-y-2 text-sm text-gray-800">
             <p className="flex items-center gap-2"><strong>Email:</strong> privacy@babyshop.com</p>
             <p className="flex items-center gap-2"><strong>Phone:</strong> 1-800-BABYSHOP</p>
             <p className="flex items-center gap-2"><strong>Address:</strong> 123 Baby Street, Child City, BC 12345</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PrivacyPage;
