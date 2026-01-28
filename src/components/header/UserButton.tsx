'use client';
import { useUserStore } from '@/lib/store';
import { User, Sparkles, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const UserButton = () => {
  const { isAuthenticated, authUser } = useUserStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link
      href={isAuthenticated && authUser ? '/user/profile' : '/auth/signin'}
      className="relative group bg-white dark:bg-gray-950 p-1 pr-4 rounded-full border border-gray-100 dark:border-gray-900 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3"
    >
      <div className="relative">
        <div className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 shadow-xl overflow-hidden bg-babyshopSky/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
           {mounted && isAuthenticated && authUser ? (
             authUser.avatar ? (
               <Image
                 src={authUser.avatar}
                 alt="userImage"
                 width={100}
                 height={100}
                 className="h-full w-full object-cover"
               />
             ) : (
               <div className="h-full w-full bg-gradient-to-br from-babyshopSky to-purple-500 flex items-center justify-center text-white text-sm font-black">
                 {authUser.name?.charAt(0).toUpperCase() || '?'}
               </div>
             )
           ) : (
             <User size={20} className="text-gray-400" />
           )}
        </div>
        {mounted && isAuthenticated && (
           <motion.div 
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             className="absolute -top-1 -right-1 w-4 h-4 bg-babyshopSky rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center shadow-lg"
           >
              <Sparkles className="w-2 h-2 text-white" />
           </motion.div>
        )}
      </div>

      <div className="flex flex-col">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 leading-none mb-0.5">
           {mounted && isAuthenticated ? 'Authenticated' : 'Member Portal'}
        </p>
        <div className="flex items-center gap-1.5">
           <p className="font-black text-xs text-gray-900 dark:text-white truncate max-w-[100px] leading-none uppercase">
             {mounted && isAuthenticated && authUser
               ? authUser.name?.split(' ')[0] || 'My Profile'
               : 'Join Us'}
           </p>
           <ChevronDown className="w-3 h-3 text-gray-300 group-hover:text-babyshopSky transition-colors" />
        </div>
      </div>
    </Link>
  );
};

export default UserButton;
