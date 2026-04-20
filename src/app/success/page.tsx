import SuccessPageClient from "@/components/pages/SuccessPageClient";
import React, { Suspense } from "react";

const SuccessPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPageClient />
    </Suspense>
  );
};

export default SuccessPage;
