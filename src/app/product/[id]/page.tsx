import { payment } from '@/assets/image';
import BackToHome from '@/components/common/BackToHome';
import Container from '@/components/common/Container';
import DiscountBadge from '@/components/common/DiscountBadge';
import ProductActions from '@/components/common/pages/product/ProductActions';
import ProductDescription from '@/components/common/pages/product/ProductDescription';
import PriceFormatter from '@/components/common/PriceFormatter';
import { fetchData } from '@/lib/api';
import { Product } from '@/types/type';
import { Box, Eye, FileQuestion, Share2, Star, Truck } from 'lucide-react';
import Image from 'next/image';
import BuyNowButton from '@/components/common/pages/product/BuyNowButton';
import React from 'react';
import ClientProductDetails from '@/components/common/pages/product/ClientProductDetails';

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

  const discountedPrice = product
    ? product.price * (1 - (product.discountPercentage || 0) / 100)
    : 0;

  if (!product) {
    return (
      <div className="min-h-[50vh] flex flex-col gap-2 items-center justify-center p-10">
        <h2 className="text-lg">
          No products found with <span className=" font-medium">#id</span>{' '}
          <span className="font-semibold text-babyshopSky underline">{id}</span>
        </h2>
        <BackToHome />
      </div>
    );
  }

  return (
    <div className="pt-5 mx-4">
      <Container>
        <div className="max-w-7xl bg-babyshopWhite shadow-babyshopBlack/10 shadow-sm border border-babyshopTextLight/30 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-10 p-5 md:p-10">
          <div>
            <Image
              src={product?.image}
              alt="productImage"
              width={500}
              height={500}
            />
          </div>
          <div className="w-full">
            <ClientProductDetails product={product} />
          </div>
        </div>
        <div className="max-w-7xl bg-babyshopWhite shadow-babyshopBlack/10 shadow-sm border border-babyshopTextLight/30 rounded-xl p-5 md:p-10 mt-5">
          <ProductDescription product={product} />
        </div>
      </Container>
    </div>
  );
};

export default SingleProductPage;
