'use client';
import { useUserStore } from '@/lib/store';
import { User, ChevronDown, Package, Heart, LogOut, Settings, Bell, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModalStore } from '@/lib/modalStore';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import authApi from '@/lib/authApi';

const UserButton = () => {
  const { isAuthenticated, authUser, logoutUser, verifyAuth } = useUserStore();
  const { openLoginModal } = useModalStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setMounted(true);
    
    // Automatically fetch user profile if token exists but user data is missing
    if (isAuthenticated && !authUser) {
       verifyAuth();
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isAuthenticated, authUser, verifyAuth]);

  const handleMainClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
        e.preventDefault();
        openLoginModal();
    } else {
        setIsOpen(!isOpen);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await authApi.post('/auth/logout', {});
      if (response?.success) {
        logoutUser();
        toast.success('Logged out successfully');
        setIsOpen(false);
        router.push('/');
      }
    } catch (error) {
       // local wipe fallback
       logoutUser();
       setIsOpen(false);
       router.push('/');
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={handleMainClick}
        className="flex items-center gap-3 group px-1"
      >
        <div className="relative">
          <div className="w-11 h-11 rounded-full border-[2.5px] border-babyshopSky/30 p-[2px] overflow-hidden group-hover:border-babyshopSky transition-colors">
             <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {isAuthenticated && authUser ? (
                  authUser.avatar ? (
                    <Image
                      src={authUser.avatar}
                      alt="userImage"
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-linear-to-br from-babyshopSky to-babyshopSky/60 flex items-center justify-center text-white text-sm font-bold">
                      {authUser.name?.charAt(0).toUpperCase() || '?'}
                    </div>
                  )
                ) : (
                  <User size={20} className="text-gray-400" />
                )}
             </div>
          </div>
        </div>

        <div className="hidden sm:flex flex-col text-left">
          <p className="text-[14px] font-medium text-babyshopSky leading-tight">
             Welcome
          </p>
          <div className="flex items-center gap-1.5 cursor-pointer">
             <p className="font-bold text-[16px] text-babyshopSky leading-tight truncate max-w-[150px]">
               {isAuthenticated
                 ? authUser?.name || 'My Account'
                 : 'Sign In / Register'}
             </p>
          </div>
        </div>
      </button>

      {/* Dropdown Menu - Matched to Image */}
      <AnimatePresence>
        {isOpen && isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="absolute top-full mt-4 right-0 w-[300px] bg-white rounded-lg shadow-2xl border border-gray-100 z-[100] overflow-hidden py-2"
          >
             <div className="px-6 py-4">
                <p className="font-bold text-[17px] text-gray-900 mb-0.5">{authUser?.name}</p>
                <p className="text-sm text-gray-500 font-medium">{authUser?.email}</p>
             </div>
             
             <div className="h-[1px] bg-gray-100 mx-0 my-1" />

             <div className="py-2">
                <MenuLink href="/user/profile" icon={User} label="My Profile" onClick={() => setIsOpen(false)} />
                <MenuLink href="/user/orders" icon={Package} label="Orders" onClick={() => setIsOpen(false)} />
                <MenuLink href="/user/wishlist" icon={Heart} label="Wishlist" onClick={() => setIsOpen(false)} />
                <MenuLink href="/shop" icon={ShoppingBag} label="Continue Shopping" onClick={() => setIsOpen(false)} />
                <MenuLink href="/user/profile?tab=settings" icon={Settings} label="Settings" onClick={() => setIsOpen(false)} />
             </div>

             <div className="h-[1px] bg-gray-100 mx-0 my-1" />

             <div className="py-2">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-6 py-3.5 text-red-600 hover:bg-red-50 transition-colors font-bold text-[16px]"
                >
                   <LogOut size={20} />
                   Logout
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MenuLink = ({ href, icon: Icon, label, onClick }: any) => (
  <Link 
    href={href} 
    onClick={onClick}
    className="flex items-center gap-4 px-6 py-3.5 text-gray-700 hover:bg-gray-50 transition-all font-medium text-[16px]"
  >
     <Icon size={20} className="text-gray-500" />
     {label}
  </Link>
);

export default UserButton;
