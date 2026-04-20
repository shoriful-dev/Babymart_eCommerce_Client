import { fetchData } from '@/lib/api';
import { Product } from '@/types/type';
import React from 'react';
import { ArrowRight, MapPin, Plane } from 'lucide-react';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { Button } from '../ui/button';
import ProductCard from '../common/ProductCard';
import { Card, CardContent } from '../ui/card';

interface ProductsResponse {
  products: Product[];
  total: number;
}

const BabyTravelSection = async () => {
  let products: Product[] = [];
  try {
    const response: ProductsResponse = await fetchData<ProductsResponse>('/products');
    // Filter products for baby travel category (simulation: just taking 4)
    products = response?.products?.slice(0, 4) || [];
  } catch (error) {
    console.error('Failed to fetch baby travel products:', error);
  }

  return (
    <div className="py-12 bg-babyshopWhite p-5 mt-5 rounded-md border">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Plane className="w-5 h-5 text-babyshopSky" />
            <Badge
              variant={'outline'}
              className="text-babyshopSky border-babyshopSky"
            >
              Travel Ready
            </Badge>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Baby Travel Essentials
          </h2>
          <p className="text-gray-600">
            Everything you need for safe and comfortable travels with your
            little one
          </p>
        </div>
        <Link href={'/shop?category=travel'}>
          <Button
            variant="outline"
            className="hidden md:flex items-center gap-2 hover:bg-babyshopSky hover:text-white hover:border-babyshopSky transition-colors"
          >
            Shop All Items
          </Button>
        </Link>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {products?.length > 0 ? (
          products?.map(product => (
            <ProductCard key={product?._id} product={product} />
          ))
        ) : (
          <>
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer text-center">
              <CardContent className="p-6">
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <Plane className="w-8 h-8 text-blue-600 mx-auto" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Travel Strollers</h3>
                <Link href="/shop?search=stroller">
                  <Button className="w-full bg-babyshopSky">Shop Now</Button>
                </Link>
              </CardContent>
            </Card>
            {/* ... other placeholders mapped similarly if needed ... */}
          </>
        )}
      </div>

      <div className="bg-linear-to-r from-babyshopSky to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Travel Smart</h3>
            <p className="text-blue-100">
              Discover our curated collection of travel essentials for stress-free adventures
            </p>
          </div>
          <Link href="/shop?category=travel">
            <Button size="lg" className="bg-white text-babyshopSky hover:bg-gray-100">
              Explore Collection
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BabyTravelSection;
