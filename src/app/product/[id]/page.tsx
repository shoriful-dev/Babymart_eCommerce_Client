import BackToHome from '@/components/common/BackToHome';
import Container from '@/components/common/Container';
import ProductDescription from '@/components/common/pages/product/ProductDescription';
import { fetchData } from '@/lib/api';
import { Product } from '@/types/type';
import React from 'react';
import ClientProductDetails from '@/components/common/pages/product/ClientProductDetails';
import ProductImageZoom from '@/components/common/pages/product/ProductImageZoom';
import HomeProductSection from '@/components/home/HomeProductSection';
import { Layers } from 'lucide-react';

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  let product: Product | null = null;
  try {
    product = await fetchData<Product>(`/products/${id}`);
  } catch (err) {
    console.log('Error fetching product:', err);
  }

  if (!product) {
    return (
      <div className="min-h-[50vh] flex flex-col gap-2 items-center justify-center p-10">
        <h2 className="text-lg text-babyshopBlack">
          No products found with <span className=" font-medium">#id</span>{' '}
          <span className="font-semibold text-babyshopSky underline">{id}</span>
        </h2>
        <BackToHome />
      </div>
    );
  }

  return (
    <div className="py-10 bg-gray-50/30">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl p-6 md:p-12 shadow-sm border border-gray-100">
          <div className="w-full">
            <ProductImageZoom 
              src={product?.image} 
              alt={product?.name} 
            />
          </div>
          <div className="w-full">
            <ClientProductDetails product={product} />
          </div>
        </div>

        <div id="product-description-tabs" className="mt-12 bg-white rounded-3xl p-6 md:p-12 shadow-sm border border-gray-100">
          <ProductDescription product={product} />
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <HomeProductSection
            title="Related Products"
            subtitle="You might also like these products from the same category"
            icon={<><Layers size={15} /> Suggested</>}
            viewAllLink={`/shop?category=${product.category._id}`}
            apiEndpoint={`/products?category=${product.category._id}&limit=5`}
            accentColor="text-babyshopSky"
          />
        </div>
      </Container>
    </div>
  );
};

export default SingleProductPage;
