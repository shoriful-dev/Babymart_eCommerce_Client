'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product, Rating } from '@/types/type';
import { useState, useEffect } from 'react';
import { Star, MessageSquare, Info, ShieldQuestion, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useUserStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

interface Props {
  product: Product;
}

const ProductDescription = ({ product }: Props) => {
  const [activeTab, setActiveTab] = useState('description');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated } = useUserStore();
  const router = useRouter();

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
    { id: 'description', label: 'Description', icon: Info },
    { id: 'brand', label: 'Brand Info', icon: Award },
    { id: 'reviews', label: `Reviews (${product?.ratings?.length || 0})`, icon: MessageSquare },
    { id: 'questions', label: 'Support', icon: ShieldQuestion },
  ];

  return (
    <div className="w-full py-4" id="product-description-tabs">
      <Tabs
        className="w-full"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <div className="flex justify-center mb-12">
          <TabsList className="bg-transparent h-auto p-0 gap-6 md:gap-12 rounded-none border-b border-gray-100 w-full flex justify-center overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  "relative pb-6 pt-0 px-0 rounded-none text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300",
                  "bg-transparent shadow-none border-none ring-0 outline-none focus-visible:ring-0",
                  "data-[state=active]:text-babyshopBlack border-b-2 border-transparent data-[state=active]:border-babyshopBlack",
                  "text-gray-400 hover:text-babyshopBlack flex items-center gap-2.5"
                )}
              >
                <tab.icon size={15} className={cn(activeTab === tab.id ? "text-babyshopBlack" : "text-gray-300")} />
                <span className="whitespace-nowrap">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="max-w-5xl mx-auto px-4">
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
                  <p className="text-gray-600 leading-relaxed text-[15px] md:text-lg">
                    {product?.description || 'Detailed information about this product is not available at the moment.'}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="brand" className="mt-0 outline-none">
                <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
                  <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center font-bold text-2xl border border-gray-100 shrink-0 text-babyshopSky">
                    {product?.brand?.name?.charAt(0) || 'B'}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-babyshopBlack mb-3">
                      {product?.brand?.name || 'Babymart Premium Collection'}
                    </h3>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl">
                      {product?.brand?.description || 'Providing high-quality, safe, and premium essentials for your little ones. Every product is carefully curated to ensure maximum comfort.'}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-0 outline-none">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                  <div className="lg:col-span-7 space-y-8">
                    <div className="flex items-center justify-between">
                       <h3 className="text-xl font-bold text-babyshopBlack">Product Reviews</h3>
                       {product?.averageRating > 0 && (
                         <div className="flex items-center gap-2">
                            <div className="flex text-yellow-400">
                               {[...Array(5)].map((_, i) => (
                                 <Star key={i} size={14} fill={i < Math.floor(product.averageRating) ? "currentColor" : "none"} />
                               ))}
                            </div>
                            <span className="font-bold text-babyshopBlack text-sm">{product.averageRating.toFixed(1)}</span>
                         </div>
                       )}
                    </div>
                    
                    <div className="space-y-5">
                      {product?.ratings && product.ratings.length > 0 ? (
                        product.ratings.map((rev: Rating) => (
                          <div key={rev._id} className="p-5 rounded-2xl bg-gray-50/50 border border-gray-100/60">
                            <div className="flex items-center gap-3 mb-3">
                               <div className="w-9 h-9 rounded-full bg-babyshopSky/10 flex items-center justify-center font-bold text-babyshopSky text-sm uppercase">
                                  {rev.user?.name?.charAt(0) || 'U'}
                               </div>
                               <div>
                                 <p className="font-bold text-babyshopBlack text-sm">{rev.user?.name || 'Anonymous'}</p>
                                 <div className="flex text-yellow-400 gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                      <Star key={i} size={12} fill={i < rev.rating ? "currentColor" : "none"} />
                                    ))}
                                 </div>
                               </div>
                               <span className="ml-auto text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                  {new Date(rev.createdAt).toLocaleDateString()}
                               </span>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed font-medium">
                              {rev.comment}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="py-12 px-6 rounded-2xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center">
                           <MessageSquare size={32} className="text-gray-200 mb-4" />
                           <p className="text-gray-400 font-bold text-sm">No reviews yet. Be the first to share your experience!</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm h-full flex flex-col justify-center">
                      {isAuthenticated ? (
                        <>
                          <h3 className="text-sm font-bold text-babyshopBlack mb-6 uppercase tracking-widest">Share Your Thoughts</h3>
                          <form onSubmit={handleReviewSubmit} className="space-y-5">
                            <div className="flex gap-1.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  type="button"
                                  key={star}
                                  onClick={() => setRating(star)}
                                  onMouseEnter={() => setHoverRating(star)}
                                  onMouseLeave={() => setHoverRating(0)}
                                  className="focus:outline-none transition-transform active:scale-90"
                                >
                                  <Star
                                    size={26}
                                    className={cn(
                                      "transition-all duration-200",
                                      (hoverRating || rating) >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-200"
                                    )}
                                  />
                                </button>
                              ))}
                            </div>
                            <textarea
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="What did you like or dislike about this product?"
                              className="w-full h-36 bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-babyshopBlack/5 focus:bg-white transition-all resize-none"
                            />
                            <Button 
                              disabled={isSubmitting}
                              className="w-full bg-babyshopBlack hover:bg-babyshopBlack/90 text-white font-bold h-12 rounded-xl text-sm transition-all shadow-sm"
                            >
                              {isSubmitting ? 'Posting...' : 'Submit Review'}
                            </Button>
                          </form>
                        </>
                      ) : (
                        <div className="text-center space-y-6 py-10">
                          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                            <Star size={32} className="text-gray-200" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-babyshopBlack mb-2">Login to Review</h3>
                            <p className="text-gray-500 text-sm font-medium">Please sign in to your account to share your experience with this product.</p>
                          </div>
                          <Button 
                            onClick={() => router.push('/auth/signin')}
                            className="w-full bg-babyshopBlack hover:bg-babyshopBlack/90 text-white font-bold h-12 rounded-xl"
                          >
                            Sign In Now
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="questions" className="mt-0 outline-none">
                <div className="max-w-3xl">
                  <h3 className="text-xl font-bold text-babyshopBlack mb-6">Product Support</h3>
                  <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-100 flex flex-col items-center text-center">
                    <ShieldQuestion size={40} className="text-babyshopSky mb-5" />
                    <p className="text-gray-600 mb-8 font-medium text-base md:text-lg max-w-lg">
                      Our customer support team is available 24/7 to help you with any questions about size, fit, or material.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Button className="bg-babyshopBlack text-white font-bold hover:bg-babyshopBlack/90 rounded-xl px-8 h-12 transition-all">
                        Chat with Support
                      </Button>
                      <Button variant="outline" className="border border-babyshopBlack text-babyshopBlack font-bold hover:bg-gray-100 rounded-xl px-8 h-12 transition-all">
                        View FAQ
                      </Button>
                    </div>
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
