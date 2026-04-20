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
import { Brand, Category, Product } from '@/types/type';
import { ChevronDown, ChevronUp, Loader2, X } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

interface ProductsResponse {
  products: Product[];
  total: number;
}

interface Props {
  categories: Category[];
  brands: Brand[];
}
const ShopPageClient = ({ categories, brands }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [category, setCategory] = useState<string>(
    searchParams.get('category') || '',
  );
  const [brand, setBrand] = useState<string>(searchParams.get('brand') || '');
  const [search, setSearch] = useState<string>(
    searchParams.get('search') || '',
  );

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [newlyLoadedProducts, setNewlyLoadedProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [invalidCategory, setInvalidCategory] = useState<string>('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const productsPerPage = 10;
  const fetchSeqRef = useRef(0);
  const observerTarget = useRef<HTMLDivElement>(null);

  const filtersKey = useMemo(
    () =>
      [
        searchParams.get('category') || '',
        searchParams.get('brand') || '',
        searchParams.get('search') || '',
        searchParams.get('priceRange') || '',
        searchParams.get('sortOrder') || 'desc',
      ].join('|'),
    [searchParams],
  );

  useLayoutEffect(() => {
    setCurrentPage(1);
  }, [filtersKey]);

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
      // Reset page when any filter changes
      params.set('page', '1');
      router.push(`/shop?${params.toString()}`, { scroll: false });
    },
    [searchParams, router],
  );

  useEffect(() => {
    const categoryQuery = searchParams.get('category') || '';
    const brandQuery = searchParams.get('brand') || '';
    const searchQuery = searchParams.get('search') || '';
    const priceRangeQuery = searchParams.get('priceRange') || '';
    const sortOrderQuery = searchParams.get('sortOrder') || 'desc';

    setCategory(categoryQuery);
    setBrand(brandQuery);
    setSearch(searchQuery);
    setSortOrder(sortOrderQuery as 'asc' | 'desc');

    if (priceRangeQuery) {
      const [min, max] = priceRangeQuery.split('-').map(Number);
      setPriceRange([min, max]);
    } else {
      setPriceRange(null);
    }

    // If ID is provided in URL, check if it's valid
    if (categoryQuery) {
      const categoryExits = categories.some(cat => cat._id === categoryQuery);
      if (!categoryExits) {
        setInvalidCategory(categoryQuery);
      } else {
        setInvalidCategory('');
      }
    } else {
      setInvalidCategory('');
    }

    setCurrentPage(1);
  }, [searchParams, categories]);

  const fetchProducts = useCallback(
    async (page: number, loadMore = false) => {
      fetchSeqRef.current += 1;
      const seq = fetchSeqRef.current;
      const urlCategory = searchParams.get('category') || '';
      const urlBrand = searchParams.get('brand') || '';
      const urlSearch = searchParams.get('search') || '';
      const urlPriceRangeRaw = searchParams.get('priceRange') || '';
      const urlSort =
        (searchParams.get('sortOrder') as 'asc' | 'desc' | null) || 'desc';
      let urlPriceTuple: [number, number] | null = null;
      if (urlPriceRangeRaw) {
        const parts = urlPriceRangeRaw.split('-').map(Number);
        if (parts.length >= 2 && !parts.some(Number.isNaN)) {
          urlPriceTuple = [parts[0], parts[1]];
        }
      }
      const stateMismatch =
        urlCategory !== category ||
        urlBrand !== brand ||
        urlSearch !== search ||
        urlSort !== sortOrder ||
        (urlPriceTuple === null && priceRange !== null) ||
        (urlPriceTuple !== null &&
          priceRange !== null &&
          (urlPriceTuple[0] !== priceRange[0] ||
            urlPriceTuple[1] !== priceRange[1])) ||
        (urlPriceTuple !== null && priceRange === null);

      if (loadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      try {
        const params = new URLSearchParams();
        const qCategory = urlCategory;
        const qBrand = urlBrand;
        const qSearch = urlSearch;
        const qPrice = urlPriceTuple;
        const qSort = urlSort;

        if (qCategory && qCategory !== 'all') params.append('category', qCategory);
        if (qBrand && qBrand !== 'all') params.append('brand', qBrand);
        if (qSearch) params.append('search', qSearch);
        if (qPrice) {
          const hasFiniteUpper =
            qPrice[1] !== undefined &&
            qPrice[1] !== Infinity &&
            !Number.isNaN(qPrice[1]);
          if (hasFiniteUpper) {
            const minVal = Number.isNaN(qPrice[0]) ? 0 : qPrice[0];
            params.append('priceMin', String(minVal));
            params.append('priceMax', String(qPrice[1]));
          } else if (
            qPrice[0] !== undefined &&
            !Number.isNaN(qPrice[0]) &&
            qPrice[0] > 0
          ) {
            params.append('priceMin', String(qPrice[0]));
          }
        }
        params.append('page', page.toString());
        params.append('limit', productsPerPage.toString());
        params.append('sortOrder', qSort);

        // #region agent log
        fetch('http://127.0.0.1:7787/ingest/07ccecfd-86cf-4868-9c5c-2ab1d7e072e6', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Debug-Session-Id': 'b93dc8',
          },
          body: JSON.stringify({
            sessionId: 'b93dc8',
            runId: 'post-fix',
            hypothesisId: 'H1',
            location: 'ShopPageClient.tsx:fetchProducts:start',
            message: 'shop fetch start',
            data: {
              seq,
              page,
              loadMore,
              sp: searchParams.toString(),
              builtQuery: params.toString(),
              urlCategory,
              stateCategory: category,
              urlBrand,
              stateBrand: brand,
              urlPriceRangeRaw,
              statePriceRange: priceRange,
              stateMismatch,
            },
            timestamp: Date.now(),
          }),
        }).catch(() => {});
        // #endregion

        const response: ProductsResponse = await fetchData(
          `/products?${params.toString()}`,
        );

        // #region agent log
        fetch('http://127.0.0.1:7787/ingest/07ccecfd-86cf-4868-9c5c-2ab1d7e072e6', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Debug-Session-Id': 'b93dc8',
          },
          body: JSON.stringify({
            sessionId: 'b93dc8',
            runId: 'post-fix',
            hypothesisId: 'H2',
            location: 'ShopPageClient.tsx:fetchProducts:response',
            message: 'shop fetch response',
            data: {
              seq,
              total: response?.total,
              count: response?.products?.length,
              builtQuery: params.toString(),
              stale: seq !== fetchSeqRef.current,
            },
            timestamp: Date.now(),
          }),
        }).catch(() => {});
        // #endregion

        if (seq !== fetchSeqRef.current) {
          return;
        }

        setTotal(response?.total || 0);
        if (loadMore) {
          setNewlyLoadedProducts(response.products);
          setProducts(prev => [...prev, ...response.products]);
        } else {
          setNewlyLoadedProducts([]);
          setProducts(response.products);
        }
      } catch (error) {
        console.log('Failed to fetch products:', error);
        if (seq !== fetchSeqRef.current) {
          return;
        }
        setTotal(0);
        if (!loadMore) {
          setProducts([]);
        }
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [category, brand, search, priceRange, sortOrder, searchParams, productsPerPage],
  );

  useEffect(() => {
    if (currentPage === 1) {
      fetchProducts(1, false);
    } else {
      fetchProducts(currentPage, true);
    }
  }, [currentPage, fetchProducts, filtersKey]);

  useEffect(() => {
    if (newlyLoadedProducts.length > 0) {
      const timer = setTimeout(() => {
        setNewlyLoadedProducts([]);
      }, 1500); // Increased from 100ms to 1500ms to allow animation to complete
      return () => clearTimeout(timer);
    }
  }, [newlyLoadedProducts]);

  const totalPages = Math.ceil(total / productsPerPage);

  const hasMoreProducts = products.length < total && currentPage < totalPages;

  const priceRanges: [number, number][] = [
    [0, 20],
    [20, 50],
    [50, 100],
    [100, Infinity],
  ];

  const loadMoreProducts = useCallback(() => {
    if (hasMoreProducts && !loadingMore) {
      setCurrentPage(prev => prev + 1);
    }
  }, [hasMoreProducts, loadingMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMoreProducts();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMoreProducts]);

  const resetCategory = () => {
    updateUrl({ category: null });
  };

  const resetBrand = () => {
    updateUrl({ brand: null });
  };

  const resetSearch = () => {
    updateUrl({ search: null });
  };

  const resetPriceRange = () => {
    updateUrl({ priceRange: null });
  };

  const resetSortOrder = () => {
    updateUrl({ sortOrder: 'desc' });
  };

  const resetAllFilters = () => {
    router.push('/shop');
  };

  return (
    <Container className="py-10">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl font-semibold">Shop Products</h2>
          <p className="text-babyshopBlack/70 fiont-medium">
            {loading
              ? 'Loading'
              : `Showing ${products?.length} of ${total} products`}
          </p>
          {invalidCategory && (
            <div className="mt-2 bg-yellow-50 border border-yellow-200 rounded-md py-1 px-2">
              <p className="text-sm text-yellow-800">
                Category &quot;{invalidCategory}&quot; not found. Showing all
                products instead.
              </p>
            </div>
          )}
        </div>
        {(category || brand || search || priceRange || sortOrder !== 'desc') && (
          <Button
            variant={'outline'}
            className="text-sm"
            onClick={resetAllFilters}
            disabled={loading}
          >
            Reset All Filters
          </Button>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="p-5 bg-babyshopWhite w-full md:max-w-64 min-w-60 rounded-lg border">
          {/* Small devices */}
          <div className="md:hidden">
            <Button
              variant="outline"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="w-full mb-4 flex items-center justify-between"
            >
              <span className="font-medium">Filters</span>
              {isFiltersOpen ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </Button>
          </div>
          <div
            className={`${
              isFiltersOpen ? 'block' : 'hidden'
            } md:block space-y-4`}
          >
            {/* Search */}
            {search && (
              <div>
                <h3 className="text-sm font-medium mb-3">Search</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700 border border-blue-200">
                    `&quot;`{search}`&quot;`
                    <button
                      onClick={resetSearch}
                      className="ml-2 text-blue-500 hover:text-blue-700"
                      disabled={loading}
                    >
                      <X size={14} />
                    </button>
                  </span>
                </div>
              </div>
            )}
            {/* category */}
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                {category && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={resetCategory}
                    disabled={loading}
                    className="text-xs text-blue-600 p-0"
                  >
                    Reset
                  </Button>
                )}
              </div>
              <Select
                value={category || 'All'}
                onValueChange={value => {
                  updateUrl({ category: value === 'All' ? null : value });
                }}
                disabled={loading}
              >
                <SelectTrigger className="w-full p-2 border rounded-md">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="All">All Categories</SelectItem>
                    {categories?.map((cat: Category) => (
                      <SelectItem key={cat?._id} value={cat?._id}>
                        {cat?.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* brands */}
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium mb-2">Brand</label>
                {brand && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={resetBrand}
                    disabled={loading}
                    className="text-xs text-blue-600 p-0"
                  >
                    Reset
                  </Button>
                )}
              </div>
              <Select
                value={brand || 'All'}
                onValueChange={value => {
                  updateUrl({ brand: value === 'All' ? null : value });
                }}
                disabled={loading}
              >
                <SelectTrigger className="w-full p-2 border rounded">
                  <SelectValue placeholder="Select a brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Brands</SelectLabel>
                    <SelectItem value="All">All Brands</SelectItem>
                    {brands.map((brd: Brand) => (
                      <SelectItem key={brd?._id} value={brd?._id}>
                        {brd?.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* price range */}
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium mb-2">
                  Price Range
                </label>
                {priceRange && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={resetPriceRange}
                    disabled={loading}
                    className="text-xs text-blue-600 p-0"
                  >
                    Reset
                  </Button>
                )}
              </div>
              <Select
                value={priceRange ? `${priceRange[0]}-${priceRange[1]}` : 'all'}
                onValueChange={value => {
                  updateUrl({ priceRange: value === 'all' ? null : value });
                }}
                disabled={loading}
              >
                <SelectTrigger className="w-full p-2 border rounded">
                  <SelectValue placeholder="Select a price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Price Ranges</SelectLabel>
                    <SelectItem value="all">All Prices</SelectItem>
                    {priceRanges.map(([min, max]) => (
                      <SelectItem key={`${min}-${max}`} value={`${min}-${max}`}>
                        ${min} - {max === Infinity ? 'Above' : `$${max}`}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* sort filter */}
            <div>
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium mb-2">
                  Sort By
                </label>
                {sortOrder !== 'desc' && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={resetSortOrder}
                    disabled={loading}
                    className="text-xs text-blue-600 p-0"
                  >
                    Reset
                  </Button>
                )}
              </div>
              <Select
                value={sortOrder}
                onValueChange={(value: 'asc' | 'desc') => {
                  updateUrl({ sortOrder: value });
                }}
                disabled={loading}
              >
                <SelectTrigger className="w-full p-2 border rounded">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Newest First</SelectItem>
                  <SelectItem value="asc">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="bg-babyshopWhite p-5 rounded-md w-full border">
          {loading ? (
            <ShopSkeleton />
          ) : products?.length > 0 ? (
            <div className="w-full">
              <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {products?.map((product, index) => {
                  const isNewlyLoaded = newlyLoadedProducts.some(
                    newProduct => newProduct._id === product._id,
                  );
                  return (
                    <div
                      key={`${product?._id}-${index}`}
                      className={`transition-all duration-700 ease-out ${
                        isNewlyLoaded
                          ? 'opacity-0 translate-y-8 scale-95'
                          : 'opacity-100 translate-y-0 scale-100'
                      }`}
                      style={{
                        transitionDelay: isNewlyLoaded
                          ? `${(index % 10) * 100}ms`
                          : '0ms',
                      }}
                    >
                      <ProductCard product={product} />
                    </div>
                  );
                })}
              </div>
              {hasMoreProducts && (
                <div ref={observerTarget} className="mt-8 flex flex-col items-center gap-4 py-4">
                  {loadingMore && <Loader2 className="animate-spin text-babyshopSky" size={32} />}
                </div>
              )}
              {!hasMoreProducts &&
                products.length > 0 &&
                total > 0 &&
                !loadingMore && (
                  <div className="text-center py-6 mt-6">
                    <p className="text-gray-600 text-lg mb-2">
                      🎉 You&apos;ve seen it all! No more products to show.
                    </p>
                    <p className="text-gray-500 text-sm">
                      Showing all {products.length} products
                    </p>
                  </div>
                )}
            </div>
          ) : (
            !loading && (
              <EmptyListDesign
                message="No products match to your selected filters."
                resetFilters={resetAllFilters}
              />
            )
          )}
        </div>
      </div>
    </Container>
  );
};

export default ShopPageClient;
