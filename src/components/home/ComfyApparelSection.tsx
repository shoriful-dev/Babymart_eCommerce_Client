import { fetchData } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shirt, Star, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types/type';
import ProductCard from '../common/ProductCard';

interface ProductsResponse {
  products: Product[];
  total: number;
}

const ComfyApparelSection = async () => {
  let products: Product[] = [];
  try {
    const response: ProductsResponse = await fetchData<ProductsResponse>('/products');
    // Get newest 4 products
    products = response.products.slice(0, 4);
  } catch (error) {
    console.error('Error loading products:', error);
  }

  return (
    <div className="py-12 bg-babyshopWhite p-5 mt-5 rounded-md border">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Shirt className="w-5 h-5 text-pink-500" />
            <Badge variant="outline" className="text-pink-500 border-pink-500">
              Trendy & Comfortable
            </Badge>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Comfy & Cute Apparel
          </h2>
          <p className="text-gray-600">
            Adorable outfits that keep your little one comfortable all day
          </p>
        </div>
        <Link href="/shop?category=apparel">
          <Button
            variant="outline"
            className="hidden md:flex items-center gap-2 hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-colors"
          >
            Shop All Items
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-linear-to-r from-pink-400 to-rose-400 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Baby Sleep Essentials</h3>
            <p className="text-pink-100 mb-4">Cozy pajamas and sleepwear for peaceful nights</p>
            <Link href="/shop?search=sleepwear">
              <Button className="bg-white text-pink-500 hover:bg-pink-50">Shop Sleepwear</Button>
            </Link>
          </div>
        </div>
        <div className="bg-linear-to-r from-orange-400 to-yellow-400 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Summer Collection</h3>
            <p className="text-orange-100 mb-4">Light and breathable outfits for warm weather</p>
            <Link href="/shop?search=summer">
              <Button className="bg-white text-orange-500 hover:bg-orange-50">Shop Summer</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComfyApparelSection;
