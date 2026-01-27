import React from 'react';
import TopFooter from './TopFooter';
import HrLine from '../common/HrLine';
import Container from '../common/Container';
import { Title } from '../common/text';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { payment } from '@/assets/image';

const informationTab = [
  { title: 'About Us', href: '/about' },
  { title: 'Help Center', href: '/help' },
  { title: 'Privacy Policy', href: '/privacy' },
  { title: 'Terms and Conditions', href: '/terms' },
  { title: 'Top Searches', href: '/search' },
];
const CustomerTab = [
  { title: 'My Account', href: '/user/profile' },
  { title: 'My Orders', href: '/user/orders' },
  { title: 'My Wishlist', href: '/user/wishlist' },
  { title: 'Shop Now', href: '/shop' },
  { title: 'Returns/Exchange', href: '/returns' },
];
const OthersTab = [
  { title: 'Partnership Programs', href: '/help' },
  { title: 'Associate Program', href: '/help' },
  { title: 'Wholesale Program', href: '/help' },
  { title: 'Store Locations', href: '/help' },
  { title: 'Others', href: '/help' },
];

const Footer = () => {
  return (
    <footer className="w-full bg-babyshopWhite">
      <TopFooter />
      <HrLine />
      <Container className="py-10 hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div>
          <Title className="text-lg mb-4">Information</Title>
          <div className="flex flex-col gap-2">
            {informationTab?.map(item => (
              <Link
                key={item?.href}
                href={item?.href}
                className="text-babyshopBlack hover:text-babyshopSky hoverEffect"
              >
                {item?.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <Title className="text-lg mb-4">Customer Care</Title>
          <div className="flex flex-col gap-2">
            {CustomerTab?.map(item => (
              <Link
                href={item?.href}
                key={item?.title}
                className="text-babyshopBlack hover:text-babyshopSky hoverEffect"
              >
                {item?.title}
              </Link>
            ))}
          </div>
        </div>{' '}
        <div>
          <Title className="text-lg mb-4">Other Business</Title>
          <div className="flex flex-col gap-2">
            {OthersTab?.map(item => (
              <Link
                href={item?.href}
                key={item?.title}
                className="text-babyshopBlack hover:text-babyshopSky hoverEffect"
              >
                {item?.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <Title className="text-lg mb-4">Newsletter</Title>
          <div className="flex flex-col gap-2 relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="border rounded-full pl-3 pr-16 h-14 placeholder:text-babyshopBlack/50 font-medium"
            />
            <button className="bg-babyshopSky text-babyshopWhite w-14 h-14 rounded-full flex items-center justify-center absolute top-0 right-0">
              <ArrowRight />
            </button>
          </div>
        </div>
      </Container>
      <HrLine />
      <Container className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-5">
        <p>© 2025 Babymart Theme. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <p>We using safe payment for</p>
          <Image src={payment} alt="paymentImage" />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
