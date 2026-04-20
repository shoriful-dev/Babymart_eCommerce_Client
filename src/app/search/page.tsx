'use client';
import Container from '@/components/common/Container';
import { Title } from '@/components/common/text';
import { Search, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';
import Link from 'next/link';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const trendingSearches = [
    'Baby Strollers', 'Newborn Bodysuits', 'Diaper Bags', 
    'Educational Toys', 'Nursing Pillows', 'Baby Monitors',
    'Winter Jackets', 'Feeding Bottles', 'Car Seats'
  ];

  return (
    <Container className="py-12 md:py-20 max-w-4xl min-h-[60vh]">
      <div className="flex flex-col gap-10">
        <div className="space-y-4 text-center">
          <Title className="text-3xl md:text-5xl font-bold">Search Products</Title>
          <p className="text-gray-500 font-medium">Find exactly what you're looking for</p>
        </div>

        <div className="relative max-w-2xl mx-auto w-full">
           <div className="flex items-center bg-white border-2 border-babyshopSky rounded-full px-5 py-3 shadow-md focus-within:shadow-lg transition-shadow">
              <Search className="text-babyshopSky w-6 h-6 mr-3 shrink-0" />
              <input 
                 type="text" 
                 className="w-full text-lg outline-none text-gray-700 bg-transparent"
                 placeholder="Search for strollers, toys, apparel..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Link href={`/shop?search=${searchQuery}`}>
                <button className="bg-babyshopSky text-white px-6 py-2 rounded-full font-bold hover:bg-opacity-90 ml-3 shrink-0">
                  Search
                </button>
              </Link>
           </div>
        </div>

        <div className="mt-8 max-w-2xl mx-auto w-full">
           <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
              <TrendingUp className="text-rose-500" />
              Top Trending Searches
           </h2>
           
           <div className="flex flex-wrap gap-3">
              {trendingSearches.map((term, idx) => (
                 <Link key={idx} href={`/shop?search=${term.toLowerCase().replace(' ', '-')}`}>
                   <span className="inline-block px-5 py-2.5 bg-gray-50 hover:bg-babyshopSky hover:text-white border border-gray-100 rounded-full text-sm font-medium text-gray-700 transition-colors cursor-pointer">
                      {term}
                   </span>
                 </Link>
              ))}
           </div>
        </div>
      </div>
    </Container>
  );
};

export default SearchPage;
