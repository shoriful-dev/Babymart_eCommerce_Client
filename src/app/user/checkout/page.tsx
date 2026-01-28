import CheckoutPageClient from '@/components/pages/CheckoutPageClient';
import React from 'react';

const CheckoutPage = () => {
  return (
    <React.Suspense fallback={<div>Loading checkout...</div>}>
      <CheckoutPageClient />
    </React.Suspense>
  );
};

export default CheckoutPage;
