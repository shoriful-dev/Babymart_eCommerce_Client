'use client';

import React, { useEffect, useState } from 'react';
import { useCurrencyStore } from '@/lib/store';
import { ChevronDown } from 'lucide-react';

const SelectCurrency = () => {
    const { selectedCurrency, currencies, setCurrency } = useCurrencyStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) {
       return <div className="px-2 py-1 h-6 w-[70px]" />;
    }

    return (
      <div className="relative flex items-center">
        <select 
          value={selectedCurrency} 
          onChange={(e) => setCurrency(e.target.value)}
          className="bg-transparent border-none focus:ring-0 text-sm font-medium text-babyShopLightWhite hover:text-babyshopWhite cursor-pointer outline-none shadow-none appearance-none pr-5 py-1 z-10"
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code} className="text-babyshopBlack bg-white font-medium">
               {currency.code} - {currency.name}
            </option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-1 top-1/2 -translate-y-1/2 text-babyShopLightWhite pointer-events-none" />
      </div>
    );
};

export default SelectCurrency;
