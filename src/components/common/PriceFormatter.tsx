'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { useCurrencyStore } from '@/lib/store';

interface Props {
  amount: number | undefined;
  className?: string;
}

const PriceFormatter = ({ amount, className }: Props) => {
  const { getCurrentCurrency, convertPrice, selectedCurrency } = useCurrencyStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (amount === undefined || amount === null) return null;

  // Render a blank or skeleton while hydrating to prevent server/client mismatch
  if (!mounted) {
     return (
        <span className={cn('text-sm font-semibold text-babyshopRed', className)}>
           ${new Number(amount).toFixed(2)}
        </span>
     );
  }

  const currency = getCurrentCurrency();
  const convertedAmount = convertPrice(amount);

  let formattedPrice = '';
  try {
    formattedPrice = new Number(convertedAmount).toLocaleString('en-US', {
      currency: currency.code,
      style: 'currency',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } catch (error) {
    // Fallback if the browser doesn't support a specific currency code natively
    formattedPrice = `${currency.symbol}${convertedAmount.toFixed(2)}`;
  }

  return (
    <span className={cn('text-sm font-semibold text-babyshopRed', className)}>
      {formattedPrice}
    </span>
  );
};

export default PriceFormatter;
