'use client';

import React, { useState } from 'react';
import Container from '@/components/common/Container';
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
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const faqs = [
  {
    question: "How can I track my order?",
    answer: "You can track your order by logging into your account and visiting the 'My Orders' section. Each order has a tracking link that is updated in real-time.",
    category: "Shipping"
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for most items. Products must be in original packaging and unused. Some hygiene items cannot be returned once opened.",
    category: "Returns"
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, we ship to over 15 countries worldwide. Shipping costs and delivery times vary by location. You can see the full list during checkout.",
    category: "Shipping"
  },
  {
    question: "How do I use a promo code?",
    answer: "During checkout, you'll see a 'Promo Code' field on the payment page. Enter your code there and click 'Apply' to see your savings.",
    category: "Payments"
  },
  {
    question: "Can I change my delivery address after ordering?",
    answer: "If your order has not been shipped yet, you can contact our support team immediately to update your address. Once shipped, we cannot change the destination.",
    category: "Shipping"
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit and debit cards (Visa, Mastercard, American Express), as well as digital wallets like PayPal and Apple Pay.",
    category: "Payments"
  },
  {
    question: "Is it safe to buy baby products online?",
    answer: "Yes, absolutely. All our products meet international safety standards. We source directly from trusted manufacturers to ensure authenticity and safety.",
    category: "Products"
  },
  {
    question: "How do I reset my password?",
    answer: "On the login page, click 'Forgot Password'. Enter your registered email address, and we will send you a link to securely reset your password.",
    category: "Account"
  },
];

const categories = [
  { id: 'all', icon: HelpCircle, title: "All Topics" },
  { id: 'shipping', icon: Truck, title: "Shipping & Delivery" },
  { id: 'returns', icon: RefreshCcw, title: "Returns & Refunds" },
  { id: 'payments', icon: CreditCard, title: "Payments" },
  { id: 'account', icon: User, title: "Account" },
  { id: 'products', icon: ShoppingBag, title: "Products" },
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
    <Container className="py-10">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          Help Center
          <HelpCircle className="w-10 h-10 text-babyshopSky" />
        </h1>
        <p className="text-gray-500 mb-8">How can we help you today?</p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-babyshopSky"
            placeholder="Search for help..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-babyshopSky transition-colors cursor-pointer">
          <div className="bg-babyshopSky/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <Package className="w-6 h-6 text-babyshopSky" />
          </div>
          <h3 className="font-semibold mb-2">Track Order</h3>
          <p className="text-sm text-gray-500">Check your order status</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-babyshopSky transition-colors cursor-pointer">
          <div className="bg-red-50 dark:bg-red-900/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <RefreshCcw className="w-6 h-6 text-red-500" />
          </div>
          <h3 className="font-semibold mb-2">Return Item</h3>
          <p className="text-sm text-gray-500">Start a return request</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-babyshopSky transition-colors cursor-pointer">
          <div className="bg-green-50 dark:bg-green-900/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <MessageCircle className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="font-semibold mb-2">Live Chat</h3>
          <p className="text-sm text-gray-500">Chat with support</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-semibold mb-3 px-2">Categories</h3>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 transition-colors ${
                    activeCategory === cat.id 
                      ? 'bg-babyshopSky text-white' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{cat.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            
            {filteredFaqs.length > 0 ? (
              <div className="space-y-3">
                {filteredFaqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <span className="font-semibold">{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === index && (
                      <div className="px-5 pb-4 text-gray-600 dark:text-gray-400">
                        <p>{faq.answer}</p>
                        <Badge variant="secondary" className="mt-3 text-xs">
                          {faq.category}
                        </Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-gray-500 mb-4">Try searching with different keywords</p>
                <Button onClick={() => setSearchTerm('')} variant="outline">Clear Search</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-12 bg-babyshopSky/10 rounded-2xl p-8 border border-babyshopSky/20">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
          <p className="text-gray-600 dark:text-gray-400">Our support team is here to assist you</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center">
            <div className="bg-babyshopSky/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-babyshopSky" />
            </div>
            <h3 className="font-semibold mb-2">Live Chat</h3>
            <p className="text-sm text-gray-500 mb-4">Chat with our team</p>
            <Button className="w-full">Start Chat</Button>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center">
            <div className="bg-green-50 dark:bg-green-900/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-sm text-gray-500 mb-4">support@babyshop.com</p>
            <Button variant="outline" className="w-full">Send Email</Button>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center">
            <div className="bg-blue-50 dark:bg-blue-900/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="font-semibold mb-2">Phone Support</h3>
            <p className="text-sm text-gray-500 mb-4">+1 (800) 123-4567</p>
            <Button variant="outline" className="w-full">Call Now</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HelpCenterPageClient;
