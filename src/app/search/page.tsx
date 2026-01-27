import SearchPageClient from "@/components/pages/SearchPageClient";
import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";

const SearchPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-babyshopSky" />
      </div>
    }>
      <SearchPageClient />
    </Suspense>
  );
};

export default SearchPage;
