'use client';

import React from 'react';
import Container from '@/components/common/Container';
import { useWishlistStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ProductCard from '@/components/common/ProductCard';
import { Badge } from '@/components/ui/badge';

const WishlistPageClient = () => {
  const { wishlistItems, removeFromWishlist, wishlistIds } = useWishlistStore();

  if (wishlistIds.length === 0) {
    return (
      <Container className="py-20 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-full mb-6">
          <Heart className="w-12 h-12 text-red-500 fill-red-500/10" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-8 text-center max-w-xs">
          Browse our collection and save your favorite items to your wishlist!
        </p>
        <Link href="/shop">
          <Button className="px-8">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Explore Shop
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            My Wishlist
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          </h1>
          <p className="text-gray-500 mt-1">Keep track of items you love</p>
        </div>
        <Badge variant="secondary" className="text-sm px-4 py-1.5 rounded-full">
          {wishlistIds.length} {wishlistIds.length === 1 ? 'Item' : 'Items'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {wishlistItems.map((product) => (
            <motion.div
              key={product._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative group"
            >
              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8 rounded-full shadow-lg"
                  onClick={() => removeFromWishlist(product._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {wishlistItems.length > 0 && (
        <div className="mt-12 p-8 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4 text-center">Ready to make them yours?</h3>
          <Link href="/user/cart">
            <Button size="lg" className="rounded-full px-10">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Go to Shopping Cart
            </Button>
          </Link>
        </div>
      )}
    </Container>
  );
};

export default WishlistPageClient;
