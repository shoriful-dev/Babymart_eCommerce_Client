'use client';

import React, { useState } from 'react';
import Container from '@/components/common/Container';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  HelpCircle, 
  Truck, 
  RefreshCcw, 
  CreditCard, 
  User, 
  MessageCircle, 
  Mail, 
  Phone, 
  ChevronDown,
  ShieldCheck,
  ShoppingBag,
  FileText,
  Zap,
  Star,
  ArrowRight,
  Globe,
  Clock,
  Heart,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';

const faqs = [
  {
    question: "How can I track my order?",
    answer: "You can track your order by logging into your account and visiting the 'My Orders' section. Each order has a tracking link that is updated in real-time as your package moves through our network.",
    category: "Shipping"
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for most items. Products must be in original packaging and unused. Some hygiene items like feeding bottles or pacifiers cannot be returned once opened.",
    category: "Returns"
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, we ship to over 15 countries worldwide. Shipping costs and delivery times vary by location. You can see the full list of supported countries during checkout.",
    category: "Shipping"
  },
  {
    question: "How do I use a promo code?",
    answer: "During the checkout process, you'll see a 'Promo Code' field on the payment page. Enter your code there and click 'Apply' to see your savings reflected in the total.",
    category: "Payments"
  },
  {
    question: "Can I change my delivery address after ordering?",
    answer: "If your order has not been shipped yet, you can contact our support team immediately to update your address. Once an order is shipped, we cannot change the delivery destination.",
    category: "Shipping"
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit and debit cards (Visa, Mastercard, American Express), as well as digital wallets like PayPal and Apple Pay. All transactions are encrypted and secure.",
    category: "Payments"
  },
  {
    question: "Is it safe to buy baby products online?",
    answer: "Yes, absolutely. All our products meet international safety standards (ISO/CPSC). We source directly from trusted manufacturers to ensure 100% authenticity and safety.",
    category: "Products"
  },
  {
    question: "How do I reset my password?",
    answer: "On the login page, click 'Forgot Password'. Enter your registered email address, and we will send you a link to securely reset your password.",
    category: "Account"
  },
  {
    question: "Are your clothes machine washable?",
    answer: "Most of our organic cotton apparel is machine washable. However, we recommend washing at 30°C and avoiding high-heat tumble drying to prevent shrinkage and maintain softness.",
    category: "Products"
  },
  {
    question: "Can I cancel my order?",
    answer: "Orders can be cancelled within 1 hour of placement. After this window, the order enters the processing phase, and we may not be able to stop shipment. Please check 'My Orders' for the status.",
    category: "Orders"
  }
];

const topArticles = [
  { title: "Understanding Baby Sizes", readTime: "5 min read", views: "12k", icon: FileText },
  { title: "Sterilizing Guide", readTime: "8 min read", views: "8.5k", icon: Zap },
  { title: "Choosing the Right Stroller", readTime: "12 min read", views: "20k", icon: Star },
  { title: "Sleep Training 101", readTime: "15 min read", views: "15k", icon: Heart },
  { title: "Eco-friendly Diapering", readTime: "6 min read", views: "5.2k", icon: Globe },
  { title: "Nursery Setup Tips", readTime: "10 min read", views: "9k", icon: ShoppingBag },
];

const stats = [
  { label: "Community Members", value: "250K+", icon: Users },
  { label: "Countries Served", value: "45+", icon: Globe },
  { label: "Queries Resolved", value: "1M+", icon: MessageCircle },
  { label: "Positive Reviews", value: "99.9%", icon: Heart },
];

const categories = [
  { id: 'shipping', icon: Truck, title: "Shipping & Delivery", description: "Tracking, costs, and timescales", color: "text-blue-500", bg: "bg-blue-50" },
  { id: 'returns', icon: RefreshCcw, title: "Returns & Refunds", description: "How to return items and get refunds", color: "text-red-500", bg: "bg-red-50" },
  { id: 'orders', icon: CreditCard, title: "Orders & Payments", description: "Managing orders and payment methods", color: "text-green-500", bg: "bg-green-50" },
  { id: 'account', icon: User, title: "Account & Security", description: "Managing your profile and password", color: "text-indigo-500", bg: "bg-indigo-50" },
  { id: 'products', icon: ShoppingBag, title: "Products & Stock", description: "Product availability and size guides", color: "text-orange-500", bg: "bg-orange-50" },
  { id: 'legal', icon: ShieldCheck, title: "Privacy & Terms", description: "Your data rights and our policies", color: "text-purple-500", bg: "bg-purple-50" },
];

const HelpCenterPageClient = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category.toLowerCase().includes(activeCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen pb-20">
      {/* Dynamic Hero Section */}
      <div className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-babyshopSky/5 to-white dark:to-gray-950 -z-10"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-babyshopSky/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-100/30 rounded-full blur-[100px] -z-10"></div>
        
        <Container>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-babyshopSky/10 text-babyshopSky border-babyshopSky/20 px-6 py-1.5 text-sm font-bold uppercase tracking-wider backdrop-blur-sm">
                24/7 Support Intelligence
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none bg-linear-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent dark:from-white dark:to-gray-400">
                Hi, how can we <br /> <span className="text-babyshopSky">help you</span> today?
              </h1>
              
              <div className="relative max-w-2xl mx-auto group">
                <div className="absolute -inset-1 bg-linear-to-r from-babyshopSky to-purple-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <Search className="h-6 w-6 text-babyshopSky" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-16 pr-6 py-6 rounded-2xl border-none bg-white dark:bg-gray-900 shadow-2xl focus:ring-2 focus:ring-babyshopSky outline-none transition-all text-xl placeholder:text-gray-400"
                    placeholder="Search help topics, FAQs, guides..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                 <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mr-2 py-1">Quick Picks:</span>
                 {['Tracking', 'Returns', 'Refunds', 'Payment'].map((tag) => (
                    <button 
                      key={tag}
                      onClick={() => setSearchTerm(tag)}
                      className="px-4 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-bold hover:bg-babyshopSky hover:text-white transition-all border border-transparent hover:border-babyshopSky/30"
                    >
                       #{tag}
                    </button>
                 ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Quick Access Grid */}
      <Container className="-mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { title: "Track Order", icon: Truck, link: "/user/orders", color: "bg-blue-500" },
             { title: "Return Item", icon: RefreshCcw, link: "/help", color: "bg-red-500" },
             { title: "Manage Account", icon: User, link: "/account", color: "bg-indigo-500" },
             { title: "Product Guides", icon: FileText, link: "/help", color: "bg-orange-500" },
           ].map((item, i) => (
             <Link key={i} href={item.link}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-900 shadow-xl shadow-gray-200/50 dark:shadow-none flex items-center gap-5 group cursor-pointer"
                >
                  <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-white shadow-lg shadow-gray-200 group-hover:shadow-babyshopSky/20 transition-all`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg group-hover:text-babyshopSky transition-colors">{item.title}</h4>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Quick Action</p>
                  </div>
                </motion.div>
             </Link>
           ))}
        </div>
      </Container>

      <Container className="mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           {/* Sidebar Navigation */}
           <div className="lg:col-span-3 space-y-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 mb-4">Topic Explorer</h3>
              <button 
                onClick={() => setActiveCategory('all')}
                className={`w-full text-left px-5 py-3.5 rounded-2xl font-bold flex items-center justify-between transition-all ${activeCategory === 'all' ? 'bg-babyshopSky text-white shadow-lg shadow-babyshopSky/30' : 'hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-600'}`}
              >
                 <span>All Topics</span>
                 {activeCategory === 'all' && <Zap className="w-4 h-4" />}
              </button>
              {categories.map((cat) => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-5 py-3.5 rounded-2xl font-bold flex items-center gap-4 transition-all ${activeCategory === cat.id ? 'bg-babyshopSky text-white shadow-lg shadow-babyshopSky/30' : 'hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-600'}`}
                >
                   <cat.icon className={`w-5 h-5 ${activeCategory === cat.id ? 'text-white' : 'text-gray-400'}`} />
                   <span>{cat.title}</span>
                </button>
              ))}
           </div>

           {/* Main Content Area */}
           <div className="lg:col-span-9">
              {/* Popular Articles */}
              <div className="mb-16">
                 <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-black tracking-tight">Top Selection</h2>
                    <Button variant="ghost" className="text-babyshopSky font-bold hover:bg-babyshopSky/5">View Knowledge Base <ArrowRight className="ml-2 w-4 h-4" /></Button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {topArticles.map((article, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 group cursor-pointer"
                      >
                         <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-babyshopSky group-hover:text-white transition-all">
                            <article.icon className="w-5 h-5" />
                         </div>
                         <h4 className="font-bold text-lg mb-4 line-clamp-2">{article.title}</h4>
                         <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                            <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {article.readTime}</span>
                            <span>{article.views} reads</span>
                         </div>
                      </motion.div>
                    ))}
                 </div>
              </div>

              {/* FAQs Section */}
              <div className="bg-white dark:bg-gray-950 rounded-[40px] p-8 md:p-12 border border-gray-100 dark:border-gray-900 shadow-2xl shadow-gray-200/50 dark:shadow-none relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                   <HelpCircle className="w-32 h-32 text-gray-50 dark:text-gray-900 -rotate-12" />
                </div>
                
                <div className="relative z-10">
                  <h2 className="text-4xl font-black mb-4 tracking-tighter">Instant Answers</h2>
                  <p className="text-gray-500 mb-12 max-w-lg">Everything you need to know about our baby products, orders, and delivery services.</p>

                  <div className="space-y-4">
                    <AnimatePresence mode='popLayout'>
                      {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq, index) => (
                          <motion.div
                            key={index}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl overflow-hidden border border-transparent hover:border-babyshopSky/20 transition-all"
                          >
                            <button
                              onClick={() => setOpenFaq(openFaq === index ? null : index)}
                              className="w-full px-8 py-6 flex items-center justify-between text-left group"
                            >
                              <span className="font-bold text-lg text-gray-800 dark:text-gray-200 transition-colors group-hover:text-babyshopSky">{faq.question}</span>
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${openFaq === index ? 'bg-babyshopSky text-white rotate-180' : 'bg-white dark:bg-gray-800 text-gray-400'}`}>
                                <ChevronDown className="w-5 h-5" />
                              </div>
                            </button>
                            {openFaq === index && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                className="px-8 pb-8 text-gray-600 dark:text-gray-400 leading-relaxed text-lg"
                              >
                                {faq.answer}
                                <div className="mt-8 flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-6">
                                  <Badge variant="outline" className="bg-babyshopSky/5 text-babyshopSky border-babyshopSky/10 uppercase tracking-widest text-[10px] font-black px-4">
                                    Topic: {faq.category}
                                  </Badge>
                                  <div className="flex items-center gap-3">
                                     <span className="text-xs font-bold text-gray-400">Did this help?</span>
                                     <button className="text-gray-400 hover:text-green-500 transition-colors"><Star className="w-4 h-4" /></button>
                                     <button className="text-gray-400 hover:text-red-500 transition-colors"><RefreshCcw className="w-4 h-4" /></button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-24 bg-white dark:bg-gray-950 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                          <HelpCircle className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                          <h3 className="text-2xl font-black mb-3">No matching results</h3>
                          <p className="text-gray-500 text-lg">Try searching for other words or contact our team directly.</p>
                          <Button onClick={() => setSearchTerm('')} className="mt-8 rounded-xl bg-babyshopSky hover:bg-babyshopSky/90 px-8 h-12">Clear Search</Button>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
           </div>
        </div>
      </Container>

      {/* Global Stats */}
      <div className="bg-gray-50 dark:bg-gray-900/50 py-24 my-24 border-y border-gray-100 dark:border-gray-800">
         <Container>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
               {stats.map((stat, i) => (
                 <div key={i} className="text-center group">
                    <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:bg-babyshopSky group-hover:text-white transition-all transform group-hover:-translate-y-2">
                       <stat.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-4xl font-black mb-2 leading-none">{stat.value}</h3>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                 </div>
               ))}
            </div>
         </Container>
      </div>

      {/* Modern Contact Section */}
      <Container>
        <div className="bg-gray-950 dark:bg-black rounded-[50px] p-8 md:p-20 text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
          <div className="absolute top-0 right-0 w-[60%] h-full bg-linear-to-l from-babyshopSky/20 to-transparent pointer-events-none"></div>
          <div className="absolute top-[-20%] right-[-10%] w-125 h-125 bg-babyshopSky/10 rounded-full blur-[150px]"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
            <div className="max-w-xl">
              <Badge className="mb-6 bg-white/10 text-white border-white/20 px-4 py-1.5 uppercase font-bold tracking-widest text-[10px]">Direct Connect</Badge>
              <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter leading-[0.9]">Human support, <br /> available <span className="text-babyshopSky underline decoration-double">24 hours</span> a day.</h2>
              <p className="text-gray-400 text-xl leading-relaxed mb-12">Tired of bots? Our baby care experts are ready to help you personally. Average response time is under 110 seconds.</p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Button className="bg-babyshopSky text-white hover:bg-white hover:text-babyshopSky font-bold rounded-2xl h-16 px-10 shadow-2xl transition-all text-lg flex items-center justify-center gap-3">
                  <MessageCircle className="w-6 h-6" />
                  Initiate Live Chat
                </Button>
                <div className="flex items-center gap-4 px-6">
                   <div className="flex -space-x-4">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-12 h-12 rounded-full border-4 border-gray-950 bg-gray-800 overflow-hidden ring-2 ring-babyshopSky/30">
                           <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Support${i}`} alt="support" />
                        </div>
                      ))}
                      <div className="w-12 h-12 rounded-full border-4 border-gray-950 bg-babyshopSky flex items-center justify-center text-xs font-bold ring-2 ring-babyshopSky/30">
                        +12
                      </div>
                   </div>
                   <div>
                      <p className="text-sm font-bold text-white leading-none">Agents Online</p>
                      <p className="text-xs text-babyshopSky font-bold uppercase tracking-widest mt-1 animate-pulse">Ready to Chat</p>
                   </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
               {[
                 { title: "Direct Phone Line", value: "+1 (800) BABY-MART", icon: Phone, desc: "Mon-Sat, 9AM to 6PM EST" },
                 { title: "Global Email", value: "hello@babyshop.com", icon: Mail, desc: "Response within 2 hours" },
                 { title: "Mailing Address", value: "123 Baby Lane, NY 10001", icon: Globe, desc: "Headquarters & Returns" },
               ].map((item, i) => (
                 <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-3xl hover:bg-white/10 transition-all group flex items-start gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-babyshopSky group-hover:text-white transition-all shadow-inner">
                       <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                       <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">{item.title}</h4>
                       <p className="text-xl font-bold mb-1">{item.value}</p>
                       <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HelpCenterPageClient;
