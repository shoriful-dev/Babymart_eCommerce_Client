'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Container from '@/components/common/Container';
import { fetchData } from '@/lib/api';
import { Product } from '@/types/type';
import ProductCard from '../common/ProductCard';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, FilterX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductsResponse {
  products: Product[];
  total: number;
}

const SearchPageClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        // We'll append the query to the products endpoint
        // Assuming the backend supports a 'search' or 'name' parameter
        const data = await fetchData<ProductsResponse>(
          `/products?search=${query}&perPage=20`,
        );
        setProducts(data?.products || []);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    } else {
      setLoading(false);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-100 py-10 sticky top-0 z-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="relative flex gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-babyshopSky focus:border-transparent outline-none transition-all text-lg shadow-inner"
                  placeholder="Search for products, categories..."
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="h-full px-8 rounded-2xl bg-babyshopSky hover:bg-babyshopSky/90 font-bold text-lg hidden md:flex"
              >
                Search
              </Button>
            </form>

            {query && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-gray-500">
                  Search results for
                  <span className="text-babyshopSky font-bold">{query}</span>
                  <span className="ml-2 bg-gray-100 px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                    {products.length} Items
                  </span>
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-xl h-10 px-4 text-gray-500"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>

      <Container className="py-12">
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {products.map(product => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200"
          >
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FilterX className="w-12 h-12 text-gray-300" />
            </div>
            <h2 className="text-3xl font-black mb-4">No results found</h2>
            <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
              We couldnt find any products matching your search. Try checking
              your spelling or using more general terms.
            </p>
            <Button
              onClick={() => {
                setSearchInput('');
                router.push('/search');
              }}
              variant="outline"
              className="rounded-2xl h-14 px-10 font-bold border-babyshopSky text-babyshopSky hover:bg-babyshopSky hover:text-white"
            >
              Clear Search
            </Button>
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default SearchPageClient;
