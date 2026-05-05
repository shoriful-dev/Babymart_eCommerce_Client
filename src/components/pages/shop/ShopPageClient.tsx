'use client';

import Container from '@/components/common/Container';
import EmptyListDesign from '@/components/common/pages/product/EmptyListDesign';
import ProductCard from '@/components/common/ProductCard';
import ShopSkeleton from '@/components/skeleton/ShopSkeleton';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { fetchData } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Brand, Category, Product, ProductsResponse } from '@/types/type';
import { ChevronDown, ChevronUp, Loader2, X } from 'lucide-react';
import CongratulationsMessage from '@/components/common/CongratulationsMessage';
import { useSearchParams, useRouter } from 'next/navigation';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

interface ShopPageClientProps {
  categories: Category[];
  brands: Brand[];
}

const ShopPageClient = ({ categories, brands }: ShopPageClientProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [brand, setBrand] = useState(searchParams.get('brand') || '');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(
    (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
  );

  const productsPerPage = 10;
  const fetchSeqRef = useRef(0);
  const observerTarget = useRef<HTMLDivElement>(null);

  const filtersKey = useMemo(() => {
    return [
      searchParams.get('category') || 'all',
      searchParams.get('brand') || 'all',
      searchParams.get('search') || '',
      searchParams.get('priceRange') || 'all',
      searchParams.get('sortOrder') || 'desc',
    ].join('|');
  }, [searchParams]);

  const updateUrl = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === '') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      params.set('page', '1');
      router.push(`/shop?${params.toString()}`, { scroll: false });
    },
    [searchParams, router],
  );

  const fetchProducts = useCallback(
    async (page: number, isMore = false) => {
      fetchSeqRef.current += 1;
      const seq = fetchSeqRef.current;

      if (isMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      try {
        const queryParams = new URLSearchParams();
        const cat = searchParams.get('category');
        const brd = searchParams.get('brand');
        const srch = searchParams.get('search');
        const prce = searchParams.get('priceRange');
        const srt = searchParams.get('sortOrder') || 'desc';

        if (cat && cat !== 'all') queryParams.append('category', cat);
        if (brd && brd !== 'all') queryParams.append('brand', brd);
        if (srch) queryParams.append('search', srch);
        if (srt) queryParams.append('sortOrder', srt);
        
        if (prce && prce !== 'all') {
          const [min, max] = prce.split('-').map(Number);
          if (!isNaN(min)) queryParams.append('priceMin', String(min));
          if (!isNaN(max) && max !== Infinity) queryParams.append('priceMax', String(max));
        }

        queryParams.append('page', page.toString());
        queryParams.append('limit', productsPerPage.toString());

        const response: ProductsResponse = await fetchData(`/products?${queryParams.toString()}`);

        if (seq !== fetchSeqRef.current) return;

        if (response && response.products) {
          setTotal(response.total || 0);
          if (isMore) {
            setProducts(prev => [...prev, ...response.products]);
          } else {
            setProducts(response.products);
          }
        } else {
          setTotal(0);
          if (!isMore) setProducts([]);
        }
      } catch (err) {
        if (seq !== fetchSeqRef.current) return;
        console.error('Shop fetch error:', err);
        if (!isMore) setProducts([]);
      } finally {
        if (seq === fetchSeqRef.current) {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    },
    [searchParams, productsPerPage],
  );

  useEffect(() => {
    setCurrentPage(1);
    fetchProducts(1, false);
  }, [filtersKey, fetchProducts]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchProducts(currentPage, true);
    }
  }, [currentPage, fetchProducts]);

  useEffect(() => {
    const cat = searchParams.get('category') || '';
    const brd = searchParams.get('brand') || '';
    const srch = searchParams.get('search') || '';
    const prce = searchParams.get('priceRange') || '';
    const srt = searchParams.get('sortOrder') || 'desc';

    setCategory(cat);
    setBrand(brd);
    setSearch(srch);
    setSortOrder(srt as 'asc' | 'desc');

    if (prce) {
      const [min, max] = prce.split('-').map(Number);
      setPriceRange([min, max]);
    } else {
      setPriceRange(null);
    }
  }, [searchParams]);

  const hasMoreProducts = products.length < total && products.length > 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMoreProducts && !loadingMore && !loading) {
          setCurrentPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    const target = observerTarget.current;
    if (target) observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasMoreProducts, loadingMore, loading]);

  const resetAllFilters = () => router.push('/shop');

  const priceRanges: [number, number][] = [
    [0, 20],
    [20, 50],
    [50, 100],
    [100, Infinity],
  ];

  return (
    <Container className="py-10">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl font-bold text-babyshopBlack">Shop Products</h2>
          <p className="text-babyshopBlack/60 font-medium">
            {loading ? 'Loading...' : `Showing ${products.length} of ${total} products`}
          </p>
        </div>
        {(category || brand || search || priceRange || sortOrder !== 'desc') && (
          <Button
            variant="outline"
            className="text-sm font-bold"
            onClick={resetAllFilters}
            disabled={loading}
          >
            Reset All Filters
          </Button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        <aside className="p-5 bg-white w-full md:max-w-64 min-w-60 rounded-xl border border-gray-100 shadow-sm h-fit">
          <div className="md:hidden">
            <Button
              variant="outline"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="w-full mb-4 flex items-center justify-between font-bold"
            >
              <span>Filters</span>
              {isFiltersOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </Button>
          </div>

          <div className={cn("space-y-6", !isFiltersOpen && "hidden md:block")}>
            {search && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-babyshopBlack/40 mb-3">Search</h3>
                <div className="flex items-center gap-2 bg-babyshopSky/10 text-babyshopSky px-3 py-1.5 rounded-full text-xs font-bold">
                  "{search}"
                  <button onClick={() => updateUrl({ search: null })} className="hover:text-babyshopBlack transition-colors">
                    <X size={14} />
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-babyshopBlack/40 mb-3">Category</label>
              <Select value={category || 'all'} onValueChange={v => updateUrl({ category: v === 'all' ? null : v })}>
                <SelectTrigger className="w-full h-11 border-gray-100 rounded-lg font-bold">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-none shadow-2xl">
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories?.map(c => (
                    <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-babyshopBlack/40 mb-3">Brand</label>
              <Select value={brand || 'all'} onValueChange={v => updateUrl({ brand: v === 'all' ? null : v })}>
                <SelectTrigger className="w-full h-11 border-gray-100 rounded-lg font-bold">
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-none shadow-2xl">
                  <SelectItem value="all">All Brands</SelectItem>
                  {brands?.map(b => (
                    <SelectItem key={b._id} value={b._id}>{b.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-babyshopBlack/40 mb-3">Price Range</label>
              <Select value={priceRange ? `${priceRange[0]}-${priceRange[1]}` : 'all'} onValueChange={v => updateUrl({ priceRange: v === 'all' ? null : v })}>
                <SelectTrigger className="w-full h-11 border-gray-100 rounded-lg font-bold">
                  <SelectValue placeholder="All Prices" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-none shadow-2xl">
                  <SelectItem value="all">All Prices</SelectItem>
                  {priceRanges.map(([min, max]) => (
                    <SelectItem key={`${min}-${max}`} value={`${min}-${max}`}>
                      ${min} - {max === Infinity ? 'Above' : `$${max}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-babyshopBlack/40 mb-3">Sort By</label>
              <Select value={sortOrder} onValueChange={(v: 'asc' | 'desc') => updateUrl({ sortOrder: v })}>
                <SelectTrigger className="w-full h-11 border-gray-100 rounded-lg font-bold">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-none shadow-2xl">
                  <SelectItem value="desc">Newest First</SelectItem>
                  <SelectItem value="asc">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </aside>

        <main className="flex-1 bg-white p-5 rounded-xl border border-gray-100 shadow-sm min-h-[600px]">
          {loading && !loadingMore ? (
            <ShopSkeleton />
          ) : products.length > 0 ? (
            <div className="w-full">
              <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map((p, i) => (
                  <ProductCard key={`${p._id}-${i}`} product={p} />
                ))}
              </div>
              
              <div ref={observerTarget} className="flex items-center justify-center mt-4 mb-10">
                {loadingMore ? (
                  <Loader2 className="animate-spin text-babyshopSky" size={32} />
                ) : !hasMoreProducts && products.length > 0 && (
                  <CongratulationsMessage />
                )}
              </div>
            </div>
          ) : (
            <EmptyListDesign
              message="No products match your selected filters."
              resetFilters={resetAllFilters}
            />
          )}
        </main>
      </div>
    </Container>
  );
};

export default ShopPageClient;
