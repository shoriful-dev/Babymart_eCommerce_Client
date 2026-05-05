import Container from '@/components/common/Container';
import BabyTravelSection from '@/components/home/BabyTravelSection';
import Banner from '@/components/home/Banner';
import CategoriesSection from '@/components/home/CategoriesSection';
import ComfyApparelSection from '@/components/home/ComfyApparelSection';
import BabyCareSection from '@/components/home/BabyCareSection';
import FeaturedServicesSection from '@/components/home/FeaturedServicesSection';
import HomeBrand from '@/components/home/HomeBrand';
import ProductList from '@/components/home/ProductList';
import HomeProductSection from '@/components/home/HomeProductSection';
import VendorPromoBanner from '@/components/home/VendorPromoBanner';
import { fetchData } from '@/lib/api';
import { Brand } from '@/types/type';
import { Sparkles, TrendingUp, Tag, Clock, Star } from 'lucide-react';
import CongratulationsMessage from '@/components/common/CongratulationsMessage';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Loading Skeleton for sections
const SectionSkeleton = () => (
  <div className="py-6 space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-8 w-24" />
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-64 w-full rounded-md" />
      ))}
    </div>
  </div>
);

export default async function Home() {
  // Fetch primary data (brands) - others are fetched within components for better streaming
  let brands: Brand[] = [];
  try {
    brands = await fetchData<Brand[]>('/brands');
  } catch (err) {
    console.log('Error fetching brands:', err);
  }

  return (
    <div>
      <Container className="min-h-screen flex py-7 gap-3">
        <CategoriesSection />
        <div className="flex-1 min-w-0">
          <Banner />

          {/* Featured Products */}
          <Suspense fallback={<SectionSkeleton />}>
            <ProductList />
          </Suspense>

          {/* Brand logos */}
          <HomeBrand brands={brands} />

          {/* Trending Products */}
          <Suspense fallback={<SectionSkeleton />}>
            <HomeProductSection
              title="Trending Products"
              subtitle="What everyone is buying right now"
              icon={<><TrendingUp size={15} /> Trending</>}
              viewAllLink="/shop?sortOrder=desc"
              apiEndpoint="/products?limit=5&sortOrder=desc"
              accentColor="text-rose-500"
            />
          </Suspense>

          {/* New Arrivals */}
          <Suspense fallback={<SectionSkeleton />}>
            <HomeProductSection
              title="New Arrivals"
              subtitle="Fresh products just added to our store"
              icon={<><Sparkles size={15} /> New</>}
              viewAllLink="/shop?sortOrder=desc"
              apiEndpoint="/products?limit=5&page=2&sortOrder=desc"
              accentColor="text-green-500"
            />
          </Suspense>

          {/* Best Deals */}
          <Suspense fallback={<SectionSkeleton />}>
            <HomeProductSection
              title="Best Deals"
              subtitle="Hand-picked deals and discounts for you"
              icon={<><Tag size={15} /> Deals</>}
              viewAllLink="/shop"
              apiEndpoint="/products?limit=5&sortOrder=asc"
              accentColor="text-orange-500"
            />
          </Suspense>

          <VendorPromoBanner />

          {/* Baby Travel Section */}
          <Suspense fallback={<SectionSkeleton />}>
            <BabyTravelSection />
          </Suspense>

          {/* Winter Promotions */}
          <Suspense fallback={<SectionSkeleton />}>
            <HomeProductSection
              title="Winter Promotions"
              subtitle="Stay warm and cozy with our seasonal picks"
              icon={<><Star size={15} /> Season</>}
              viewAllLink="/shop?search=winter"
              apiEndpoint="/products?limit=5&page=3&sortOrder=desc"
              accentColor="text-blue-500"
            />
          </Suspense>

          {/* Comfy Apparel */}
          <Suspense fallback={<SectionSkeleton />}>
            <ComfyApparelSection />
          </Suspense>

          {/* Stock Clearance */}
          <Suspense fallback={<SectionSkeleton />}>
            <HomeProductSection
              title="Stock Clearance"
              subtitle="Last chance — limited stock at unbeatable prices"
              icon={<><Clock size={15} /> Clearance</>}
              viewAllLink="/shop?priceRange=0-50"
              apiEndpoint="/products?limit=5&sortOrder=asc&page=2"
              accentColor="text-red-500"
            />
          </Suspense>

          {/* Baby Care Section */}
          <Suspense fallback={<SectionSkeleton />}>
            <BabyCareSection />
          </Suspense>

          <FeaturedServicesSection />
          <div className="mt-10 pb-10">
            <CongratulationsMessage />
          </div>
        </div>
      </Container>
    </div>
  );
}
