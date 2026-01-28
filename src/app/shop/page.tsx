import ShopPageClient from '@/components/pages/shop/ShopPageClient';
import { fetchData } from '@/lib/api';
import { Brand, Category } from '@/types/type';
import React from 'react';

interface CategoriesResponse {
  categories: Category[];
}

const ShopPage = async () => {
  let brands: Brand[] = [];
  try {
    brands = await fetchData<Brand[]>('/brands');
  } catch (err) {
    console.log('Error fetching brands:', err);
  }
  let categories: Category[] = [];
  let error: string | null = null;

  try {
    const data = await fetchData<CategoriesResponse>('/categories');
    categories = data.categories;
  } catch (err) {
    error = err instanceof Error ? err.message : 'An unknown error occurred';
    console.log('error', error);
  }

  return (
    <React.Suspense fallback={<div>Loading shop...</div>}>
      <ShopPageClient categories={categories} brands={brands} />
    </React.Suspense>
  );
};

export default ShopPage;
