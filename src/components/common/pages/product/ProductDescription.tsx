'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product } from '@/types/type';
import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Props {
  product: Product;
}

const ProductDescription = ({ product }: Props) => {
  const [activeTab, setActiveTab] = useState('description');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#reviews') {
        setActiveTab('reviews');
      } else if (hash === '#questions') {
        setActiveTab('questions');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    if (!comment.trim()) {
      toast.error('Please write a comment');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      toast.success('Review submitted successfully!', {
        description: 'Thank you for your valuable feedback.',
        icon: <Star className="text-yellow-400 fill-yellow-400" size={18} />
      });
      setRating(0);
      setComment('');
      setIsSubmitting(false);
    }, 1500);
  };

  const tabs = [
    { id: 'description', label: 'Details' },
    { id: 'brand', label: 'Brand' },
    { id: 'reviews', label: `Reviews (${product?.ratings?.length || 0})` },
    { id: 'questions', label: 'Support' },
  ];

  return (
    <div className="w-full py-16 border-t border-gray-100" id="product-description-tabs">
      <Tabs
        className="w-full"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <div className="flex justify-center mb-16">
          <TabsList className="bg-transparent h-auto p-0 gap-12 rounded-none border-b border-gray-100 w-full flex justify-center">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="relative pb-6 pt-0 px-0 rounded-none text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 data-[state=active]:text-babyshopBlack data-[state=active]:bg-transparent border-b-2 border-transparent data-[state=active]:border-babyshopBlack text-gray-400 hover:text-babyshopBlack bg-transparent shadow-none"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="max-w-4xl mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <TabsContent value="description" className="mt-0 outline-none">
                <div className="prose prose-slate max-w-none">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {product?.description || 'Detailed information about this product is not available.'}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="brand" className="mt-0 outline-none">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                  <div className="w-20 h-20 rounded-xl bg-gray-50 flex items-center justify-center font-bold text-2xl border border-gray-100 shrink-0">
                    {product?.brand?.name?.charAt(0) || 'B'}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-babyshopBlack mb-4">
                      {product?.brand?.name || 'Babymart Collection'}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                      {product?.brand?.description || 'Providing high-quality essentials for your little ones.'}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-0 outline-none">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                  <div className="space-y-8">
                    <h3 className="text-xl font-bold text-babyshopBlack">Customer Reviews</h3>
                    <div className="bg-gray-50/50 rounded-2xl p-12 text-center border border-gray-100/50">
                      <p className="text-gray-400 font-medium">No reviews yet.</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-8 border border-gray-100">
                    <h3 className="text-lg font-bold text-babyshopBlack mb-8">Write a Review</h3>
                    <form onSubmit={handleReviewSubmit} className="space-y-6">
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="focus:outline-none"
                          >
                            <Star
                              size={24}
                              className={cn(
                                "transition-colors duration-200",
                                (hoverRating || rating) >= star ? "text-babyshopBlack fill-babyshopBlack" : "text-gray-200"
                              )}
                            />
                          </button>
                        ))}
                      </div>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your feedback..."
                        className="w-full h-32 bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-babyshopBlack/5 transition-all resize-none"
                      />
                      <Button 
                        disabled={isSubmitting}
                        className="w-full bg-babyshopBlack hover:bg-babyshopBlack/90 text-white font-bold h-12 rounded-xl"
                      >
                        {isSubmitting ? 'Submitting...' : 'Post Review'}
                      </Button>
                    </form>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="questions" className="mt-0 outline-none">
                <div className="max-w-2xl">
                  <h3 className="text-xl font-bold text-babyshopBlack mb-8">Product Support</h3>
                  <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <p className="text-gray-600 mb-6 font-medium">Have questions? Our team is here to help.</p>
                    <Button variant="outline" className="border-babyshopBlack text-babyshopBlack font-bold hover:bg-babyshopBlack hover:text-white rounded-xl px-8 transition-all">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </div>
      </Tabs>
    </div>
  );
};

export default ProductDescription;
