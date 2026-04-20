import Container from '@/components/common/Container';
import { Title } from '@/components/common/text';
import React from 'react';

const TermsPage = () => {
  return (
    <Container className="py-12 md:py-20 max-w-4xl">
      <div className="flex flex-col gap-10">
        <div className="space-y-4">
          <Title className="text-3xl md:text-5xl font-bold">Terms and Conditions</Title>
          <p className="text-gray-500 font-medium">Last updated: April 19, 2026</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 border-l-4 border-babyshopSky pl-4">1. Agreement to Terms</h2>
          <p className="text-gray-600 leading-relaxed">
            By accessing and using Babyshop, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access or use our services.
          </p>
        </div>

        <div className="space-y-4 pt-6 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 border-l-4 border-babyshopSky pl-4">2. Use of Site</h2>
          <p className="text-gray-600 leading-relaxed">
            You may use our site only for lawful purposes and in accordance with these Terms. You agree not to use our site:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-2">
            <li>In any way that violates any applicable national or international law or regulation.</li>
            <li>To exploit, harm, or attempt to exploit or harm minors in any way.</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent.</li>
            <li>To impersonate or attempt to impersonate the Company, a Company employee, or another user.</li>
          </ul>
        </div>

        <div className="space-y-4 pt-6 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 border-l-4 border-babyshopSky pl-4">3. Products and Orders</h2>
          <p className="text-gray-600 leading-relaxed">
            We make every effort to display as accurately as possible the colors and images of our products. However, we cannot guarantee that your computer monitor's display of any color will be accurate. We reserve the right to limit the sales of our products to any person, geographic region, or jurisdiction.
          </p>
          <p className="text-gray-600 leading-relaxed mt-2">
            All descriptions of products or product pricing are subject to change at anytime without notice, at our sole discretion. We reserve the right to discontinue any product at any time.
          </p>
        </div>

        <div className="space-y-4 pt-6 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 border-l-4 border-babyshopSky pl-4">4. Accuracy of Billing and Account Information</h2>
          <p className="text-gray-600 leading-relaxed">
            We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store.
          </p>
        </div>

        <div className="space-y-4 pt-6 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 border-l-4 border-babyshopSky pl-4">5. Governing Law</h2>
          <p className="text-gray-600 leading-relaxed">
            These Terms shall be governed and construed in accordance with the laws of the applicable jurisdiction, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
          </p>
        </div>

      </div>
    </Container>
  );
};

export default TermsPage;
