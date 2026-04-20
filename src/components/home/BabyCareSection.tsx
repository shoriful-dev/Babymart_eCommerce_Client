import { fetchData } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HeartPulse, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types/type';
import ProductCard from '../common/ProductCard';

interface ProductsResponse {
  products: Product[];
  total: number;
}

const BabyCareSection = async () => {
  let products: Product[] = [];
  try {
    const response: ProductsResponse = await fetchData<ProductsResponse>('/products');
    // Get 4 products for the care section
    products = response.products.slice(4, 8); 
  } catch (error) {
    console.error('Error loading products:', error);
  }

  return (
    <div className="py-12 bg-white p-5 mt-5 rounded-md border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-teal-500" />
            <Badge variant="outline" className="text-teal-500 border-teal-500">
              Gentle & Safe
            </Badge>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Essential Baby Care
          </h2>
          <p className="text-gray-600">
            Premium skincare and daily essentials to nurture your baby's delicate skin
          </p>
        </div>
        <Link href="/shop?category=care">
          <Button
            variant="outline"
            className="hidden md:flex items-center gap-2 hover:bg-teal-500 hover:text-white hover:border-teal-500 transition-colors"
          >
            Shop Care Items
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BabyCareSection;
