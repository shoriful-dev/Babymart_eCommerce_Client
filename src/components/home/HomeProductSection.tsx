import { fetchData } from '@/lib/api';
import { Product } from '@/types/type';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import ProductCard from '../common/ProductCard';

interface ProductsResponse {
  products: Product[];
  total: number;
}

interface HomeProductSectionProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  viewAllLink: string;
  apiEndpoint: string; // e.g. '/products?limit=5&sortOrder=desc'
  accentColor?: string; // e.g. 'text-purple-500'
}

const HomeProductSection = async ({
  title,
  subtitle,
  icon,
  viewAllLink,
  apiEndpoint,
  accentColor = 'text-babyshopSky',
}: HomeProductSectionProps) => {
  let products: Product[] = [];
  try {
    const response: ProductsResponse = await fetchData<ProductsResponse>(apiEndpoint);
    products = response?.products?.slice(0, 5) || [];
  } catch (error) {
    console.error(`Failed to fetch products for ${title}:`, error);
  }

  if (!products || products.length === 0) return null;

  return (
    <div className="bg-babyshopWhite border mt-3 rounded-md w-full">
      <div className="flex items-center justify-between p-4 pb-0">
        <div className="space-y-0.5">
          {icon && (
            <div className={`flex items-center gap-2 text-sm font-semibold ${accentColor} mb-1`}>
              {icon}
            </div>
          )}
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
        </div>
        <Link href={viewAllLink}>
          <Button
            variant="outline"
            size="sm"
            className={`hidden md:flex items-center gap-1 text-sm hover:bg-babyshopSky hover:text-white hover:border-babyshopSky transition-colors`}
          >
            View All <ArrowRight size={14} />
          </Button>
        </Link>
      </div>

      <div className="w-full p-4 grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="md:hidden p-4 pt-0">
        <Link href={viewAllLink} className="w-full block">
          <Button variant="outline" className="w-full hover:bg-babyshopSky hover:text-white hover:border-babyshopSky transition-colors">
            View All <ArrowRight size={14} className="ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomeProductSection;
