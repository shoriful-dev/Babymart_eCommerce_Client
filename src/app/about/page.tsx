import Container from '@/components/common/Container';
import { Title } from '@/components/common/text';
import React from 'react';

const AboutPage = () => {
  return (
    <Container className="py-12 md:py-20 max-w-4xl">
      <div className="flex flex-col gap-10">
        <div className="space-y-4">
          <Title className="text-3xl md:text-5xl font-bold">About Babyshop</Title>
          <p className="text-lg text-gray-600 font-medium border-l-4 border-babyshopSky pl-4">
            Your trusted partner for premium baby and children's products
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            Founded with love and care, Babyshop has been dedicated to providing high-quality, safe, and stylish products for babies and children. We understand that every parent wants the best for their little ones, and we're here to make that possible with our carefully curated selection of products.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            To provide parents with peace of mind by offering only the highest quality, safest, and most innovative products for their children. We believe every child deserves the best start in life, and we're committed to supporting families on their parenting journey.
          </p>
        </div>

        <div className="space-y-6 pt-6 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-babyshopSky">Quality Assured</h3>
              <p className="text-gray-600 text-sm">Every product undergoes rigorous quality testing</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-babyshopSky">Expert Curation</h3>
              <p className="text-gray-600 text-sm">Selected by parenting and child development experts</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-babyshopSky">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Quick and secure delivery to your doorstep</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-babyshopSky">Customer Support</h3>
              <p className="text-gray-600 text-sm">Dedicated support team ready to help</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900">Our Commitment</h2>
          <p className="text-gray-600 leading-relaxed">
            We're committed to sustainability, safety, and innovation. All our products meet or exceed international safety standards, and we continuously work with manufacturers who share our values of environmental responsibility and ethical business practices.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default AboutPage;
