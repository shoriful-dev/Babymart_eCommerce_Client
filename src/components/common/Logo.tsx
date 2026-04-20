'use client';
import { logo } from '@/assets/image';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Logo = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  const handleScrollToTop = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Link href={'/'} onClick={handleScrollToTop}>
      <Image src={logo} alt="logo" priority className={cn('w-32 lg:w-44', className)} />
    </Link>
  );
};

export default Logo;
