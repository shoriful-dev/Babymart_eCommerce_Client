import { Product } from '@/types/type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import DiscountBadge from './DiscountBadge';
import PriceContainer from './PriceContainer';
import AddToCartButton from './AddToCartButton';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="border rounded-md group overflow-hidden w-full h-full relative flex flex-col">
      <Link
        href={`/product/${product?._id}`}
        className="p-2 overflow-hidden relative block"
      >
        <Image
          src={product?.image}
          alt={product?.name || "productImage"}
          width={300}
          height={300}
          loading="lazy"
          className="w-full h-32 object-cover group-hover:scale-110 hoverEffect"
        />
        <DiscountBadge
          discountPercentage={product?.discountPercentage}
          className="absolute top-4 left-2"
        />
      </Link>
      {/* Wishlist button */}
      <hr />
      <div className="px-4 py-3 flex flex-col gap-1.5 flex-1 justify-between">
        <div>
           <p className="uppercase text-[10px] font-bold text-babyshopSky tracking-wider">
              {product?.category?.name || 'Care Essentials'}
           </p>
           <p className="line-clamp-2 text-sm font-bold text-gray-900 mt-1">{product?.name}</p>
           {/* Bold Description Preview */}
           <p className="line-clamp-2 text-xs font-bold text-gray-500 mt-1 leading-relaxed">
             {product?.description}
           </p>
        </div>
        
        <div className="mt-2 space-y-3">
           <div>
             <PriceContainer
               price={product?.price}
               discountPercentage={product?.discountPercentage}
             />
             <p className="text-xs text-green-600 font-bold mt-1">
               In Stock: {product?.stock || 0}
             </p>
           </div>
           <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
