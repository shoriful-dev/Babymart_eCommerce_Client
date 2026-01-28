'use client';

import { Button } from '@/components/ui/button';
import authApi from '@/lib/authApi';
import { useUserStore, useOrderStore, useWishlistStore } from '@/lib/store';
import { 
  Loader2, 
  User, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  Package, 
  Heart, 
  LogOut,
  ChevronRight,
  ShoppingBag,
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  Camera,
  Save,
  TrendingUp,
  Zap,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import Container from '@/components/common/Container';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'settings'>('overview');
  const { logoutUser, authUser, auth_token, updateUser } = useUserStore();
  const { orders, loadOrders } = useOrderStore();
  const { wishlistIds } = useWishlistStore();
  const router = useRouter();

  useEffect(() => {
    if (!auth_token) return;
    
    loadOrders(auth_token);
    
    const interval = setInterval(() => {
      loadOrders(auth_token);
    }, 10000);

    return () => clearInterval(interval);
  }, [auth_token, loadOrders]);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await authApi.post('/auth/logout', {});
      if (response?.success) {
        logoutUser();
        toast.success('Logged out successfully');
        router.push('/');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!authUser) return null;

  return (
    <div className="bg-[#FAFAFA] dark:bg-black min-h-screen pb-20">
      <Container className="py-12 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div>
            <Badge className="bg-babyshopSky/10 text-babyshopSky border-none px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.3em] mb-4">
               Member Sanctuary
            </Badge>
            <h1 className="text-5xl font-black tracking-tighter lg:text-6xl text-gray-900 dark:text-white">
               My <span className="text-babyshopSky italic">Profile</span>
            </h1>
            <p className="text-gray-400 font-medium mt-4 max-w-md">
               Manage your luxury account, track curated deliveries, and secure your personal archive.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white dark:bg-gray-950 p-3 rounded-4xl border border-white dark:border-gray-900 shadow-xl shadow-gray-200/50 dark:shadow-none pr-8">
             <div className="w-14 h-14 bg-babyshopSky/10 rounded-2xl flex items-center justify-center text-babyshopSky">
                <ShieldCheck className="w-8 h-8" />
             </div>
             <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none mb-1">Authenticity</p>
                <p className="text-lg font-black leading-none text-gray-900 dark:text-white uppercase tracking-tighter">Verified Member</p>
             </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Enhanced Navigation Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
               className="bg-white dark:bg-gray-950 rounded-[48px] p-10 border border-white dark:border-gray-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] flex flex-col items-center text-center relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-babyshopSky/5 rounded-full blur-3xl z-0"></div>
               
               <div className="relative z-10 w-full flex flex-col items-center">
                  <div className="relative mb-8">
                    <div className="w-40 h-40 rounded-[35%] ring-8 ring-babyshopSky/5 p-1.5 bg-linear-to-tr from-babyshopSky/30 to-indigo-500/30 overflow-hidden shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700">
                       {authUser.avatar ? (
                         <Image src={authUser.avatar} alt={authUser.name} className="w-full h-full object-cover rounded-[30%] border-4 border-white dark:border-gray-900 shadow-inner" />
                       ) : (
                         <div className="w-full h-full bg-white dark:bg-gray-800 rounded-[30%] flex items-center justify-center text-5xl font-black text-babyshopSky">
                            {authUser.name.charAt(0).toUpperCase()}
                         </div>
                       )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-black text-white p-4 rounded-[20px] border-4 border-white dark:border-gray-950 shadow-2xl scale-110">
                       <ShieldCheck className="w-5 h-5" />
                    </div>
                  </div>

                  <h2 className="text-3xl font-black mb-1 tracking-tighter text-gray-900 dark:text-white uppercase">{authUser.name}</h2>
                  <p className="text-gray-400 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 mb-10 bg-gray-50 dark:bg-gray-900 px-4 py-2 rounded-full">
                     <Mail className="w-3.5 h-3.5 text-babyshopSky" />
                     {authUser.email}
                  </p>

                  <div className="w-full space-y-3">
                     {[
                        { id: 'overview', label: 'Command Center', icon: Zap },
                        { id: 'details', label: 'Identity Archive', icon: User },
                        { id: 'settings', label: 'Security Vault', icon: Lock },
                     ].map((tab) => (
                        <Button 
                           key={tab.id}
                           variant="ghost" 
                           onClick={() => setActiveTab(tab.id as any)}
                           className={`w-full justify-between px-6 rounded-3xl h-16 transition-all duration-500 font-black uppercase text-[10px] tracking-[0.2em] relative group ${activeTab === tab.id ? 'bg-babyshopSky text-white shadow-xl shadow-babyshopSky/20 translate-x-4' : 'text-gray-500 hover:text-babyshopSky hover:bg-babyshopSky/5 hover:translate-x-2'}`}
                        >
                           <div className="flex items-center gap-4">
                              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'animate-pulse' : ''}`} />
                              {tab.label}
                           </div>
                           <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === tab.id ? 'translate-x-2' : 'opacity-0 group-hover:opacity-100'}`} />
                        </Button>
                     ))}
                     
                     <Button 
                        onClick={handleLogout} 
                        variant="ghost" 
                        className="w-full justify-start px-6 rounded-3xl h-16 text-red-500 hover:text-red-600 hover:bg-red-50/50 mt-10 font-black uppercase text-[10px] tracking-[0.2em] gap-4"
                        disabled={isLoading}
                     >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogOut className="w-5 h-5" />}
                        Terminate Session
                     </Button>
                  </div>
               </div>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div 
                 key={activeTab}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 transition={{ duration: 0.4 }}
                 className="space-y-8"
              >
                {activeTab === 'overview' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <Link href="/user/orders" className="group bg-linear-to-br from-slate-900 to-black rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden transition-all hover:shadow-babyshopSky/10">
                          <div className="relative z-10 flex flex-col h-full justify-between min-h-35">
                             <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-2">Order Archive</p>
                                <h3 className="text-4xl font-black tracking-tighter">{orders.length} TOTAL</h3>
                             </div>
                             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-babyshopSky">
                                Review Manifest <ArrowRight className="w-3 h-3 group-hover:translate-x-2 transition-transform" />
                             </div>
                          </div>
                          <Package className="absolute -right-8 -bottom-8 w-40 h-40 opacity-10 group-hover:scale-110 transition-transform duration-700 rotate-12" />
                       </Link>
                       <Link href="/user/wishlist" className="group bg-white dark:bg-gray-950 rounded-[48px] p-10 border border-white dark:border-gray-900 shadow-xl relative overflow-hidden transition-all">
                          <div className="relative z-10 flex flex-col h-full justify-between min-h-35">
                             <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-2">Desire List</p>
                                <h3 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white">{wishlistIds.length} UNITS</h3>
                             </div>
                             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-babyshopSky">
                                View Selection <ArrowRight className="w-3 h-3 group-hover:translate-x-2 transition-transform" />
                             </div>
                          </div>
                          <Heart className="absolute -right-8 -bottom-8 w-40 h-40 text-red-500/10 group-hover:scale-110 transition-transform duration-700 -rotate-12" />
                       </Link>
                    </div>

                    <div className="bg-white dark:bg-gray-950 rounded-[48px] p-10 md:p-14 border border-white dark:border-gray-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)]">
                       <div className="flex items-center justify-between mb-12">
                          <h3 className="text-2xl font-black tracking-tighter flex items-center gap-4">
                             <TrendingUp className="w-6 h-6 text-babyshopSky" />
                             Live Feed
                          </h3>
                       </div>
                       
                       {orders.length > 0 ? (
                          <div className="space-y-6">
                             {orders.slice(0, 3).map((order) => (
                                <Link key={order._id} href={`/user/orders/${order._id}`}>
                                   <div className="flex flex-col md:flex-row md:items-center justify-between p-8 rounded-[36px] bg-gray-50 dark:bg-gray-900 border-2 border-transparent hover:border-babyshopSky/30 hover:bg-white dark:hover:bg-gray-950 shadow-sm transition-all duration-500 group">
                                      <div className="flex items-center gap-6 mb-4 md:mb-0">
                                         <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-500">
                                            <Package className="w-6 h-6 text-babyshopSky" />
                                         </div>
                                         <div>
                                            <p className="font-mono text-sm font-black text-gray-900 dark:text-white uppercase tracking-tighter">#{order._id.substring(order._id.length - 12)}</p>
                                            <p className="text-[10px] font-black text-gray-400 tracking-[0.2em] mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                                         </div>
                                      </div>
                                      <div className="flex items-center justify-between md:justify-end gap-10">
                                         <Badge 
                                           className={`${
                                             order.status === 'paid' ? 'bg-green-500' : 
                                             order.status === 'completed' ? 'bg-babyshopSky' : 
                                             'bg-orange-500'
                                           } border-none font-black uppercase text-[9px] tracking-[0.2em] px-5 py-2 rounded-full text-white shadow-lg`}
                                         >
                                           {order.status}
                                         </Badge>
                                         <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-babyshopSky group-hover:translate-x-2 transition-all duration-500" />
                                      </div>
                                   </div>
                                </Link>
                             ))}
                             <Link href="/user/orders" className="block text-center pt-6">
                                <Button variant="ghost" className="font-black uppercase text-[10px] tracking-[0.3em] text-gray-400 hover:text-babyshopSky gap-4">
                                   Access Entire Archive <ArrowRight className="w-4 h-4" />
                                </Button>
                             </Link>
                          </div>
                       ) : (
                          <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-[40px] border-2 border-dashed border-gray-100 dark:border-gray-800">
                             <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                             <p className="text-sm font-black text-gray-400 uppercase tracking-widest leading-loose">No acquisitions found in current cycle</p>
                          </div>
                       )}

                       <div className="mt-16 pt-16 border-t border-gray-50 dark:border-gray-900 grid grid-cols-1 md:grid-cols-2 gap-12">
                          <div className="space-y-4">
                             <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">Account Lineage</p>
                             <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-900 p-6 rounded-4xl border border-gray-100 dark:border-gray-800">
                                <Calendar className="w-6 h-6 text-babyshopSky" />
                                <div>
                                   <p className="text-lg font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-none mb-1">Established On</p>
                                   <p className="text-xs font-bold text-gray-400">{authUser.createdAt ? new Date(authUser.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</p>
                                </div>
                             </div>
                          </div>
                          <div className="space-y-4">
                             <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">Protocol Status</p>
                             <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-900 p-6 rounded-4xl border border-gray-100 dark:border-gray-800">
                                <ShieldCheck className="w-6 h-6 text-green-500" />
                                <div>
                                   <p className="text-lg font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-none mb-1">Standard Active</p>
                                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">End-to-End Encryption</p>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                  </>
                )}

                {activeTab === 'details' && (
                  <DetailsView authUser={authUser} auth_token={auth_token} updateUser={updateUser} />
                )}

                {activeTab === 'settings' && (
                  <div className="bg-white dark:bg-gray-950 rounded-[48px] p-10 md:p-14 border border-white dark:border-gray-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)]">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500">
                          <Lock className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-black tracking-tighter">Security Vault</h3>
                    </div>

                    <div className="space-y-8">
                       <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-10 rounded-[40px] bg-slate-900 text-white relative overflow-hidden group">
                          <Zap className="absolute -right-8 -top-8 w-40 h-40 opacity-5 text-white group-hover:rotate-12 transition-transform duration-1000" />
                          <div className="flex items-center gap-6 relative z-10 mb-6 md:mb-0">
                             <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                                <ShieldCheck className="w-8 h-8 text-babyshopSky" />
                             </div>
                             <div>
                                <p className="text-xl font-black tracking-tighter uppercase leading-none mb-1">Two-Factor Authentication</p>
                                <p className="text-xs font-bold text-white/50 uppercase tracking-widest">High-Level Encryption Protocol</p>
                             </div>
                          </div>
                          <Badge className="bg-babyshopSky text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-full relative z-10">Secured</Badge>
                       </div>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                          <Button 
                             variant="outline" 
                             className="h-24 rounded-4xl justify-between px-8 border-2 border-gray-50 dark:border-gray-900 hover:border-babyshopSky transition-all group overflow-hidden relative"
                             onClick={() => toast.info('Advanced security features coming soon!')}
                          >
                             <div className="flex flex-col items-start relative z-10">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Protocol Update</p>
                                <p className="text-sm font-black uppercase text-gray-900 dark:text-white">Change Credentials</p>
                             </div>
                             <ChevronRight className="w-5 h-5 text-gray-300 group-hover:translate-x-4 transition-all relative z-10" />
                             <Sparkles className="absolute -left-4 -bottom-4 w-16 h-16 opacity-5 text-babyshopSky" />
                          </Button>
                          <Button 
                             variant="outline" 
                             className="h-24 rounded-4xl justify-between px-8 border-2 border-red-50 dark:border-red-950 hover:bg-red-500 hover:text-white transition-all group overflow-hidden relative"
                          >
                             <div className="flex flex-col items-start relative z-10">
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Danger Zone</p>
                                <p className="text-sm font-black uppercase">Terminate Account</p>
                             </div>
                             <AlertCircle className="w-5 h-5 opacity-40 group-hover:scale-125 transition-all relative z-10" />
                             <div className="absolute top-0 right-0 w-full h-full bg-red-500 translate-y-24 group-hover:translate-y-0 transition-transform duration-500 z-0"></div>
                          </Button>
                       </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </div>
  );
};

const DetailsView = ({ authUser, updateUser }: any) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(authUser.avatar || null);
  const [avatarFile, setAvatarFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: authUser.name,
    password: '',
    confirmPassword: '',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        setAvatarFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password && formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const updateData: any = { name: formData.name };
      if (formData.password) {
        updateData.password = formData.password;
      }
      if (avatarFile) {
        updateData.avatar = avatarFile;
      }

      const response = await authApi.put(`/users/${authUser._id}`, updateData);
      // Backend returns { success: true, data: user } on success
      if (response && response.success && response.data) {
        updateUser(response.data);
        toast.success('Identity Archive Updated');
        setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
        setAvatarFile(null);
      } else {
        toast.error('Manifest update failed');
      }
    } catch (error: any) {
      console.error('Update profile error:', error);
      toast.error(error.response?.data?.message || 'Update synchronization error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-950 rounded-[48px] p-10 md:p-14 border border-white dark:border-gray-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between mb-12">
         <h3 className="text-2xl font-black tracking-tighter flex items-center gap-4">
            <User className="w-6 h-6 text-babyshopSky" />
            Identity Archive
         </h3>
         <Badge className="bg-babyshopSky/10 text-babyshopSky border-none px-4 py-2 rounded-full font-black text-[9px] uppercase tracking-widest">Read / Write Access</Badge>
      </div>

      <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4 flex flex-col items-center">
           <div className="relative group">
              <div className="w-48 h-48 rounded-[40px] ring-8 ring-babyshopSky/5 p-1.5 bg-linear-to-tr from-babyshopSky/20 to-indigo-500/20 overflow-hidden shadow-2xl transition-all duration-700">
                 <Image 
                   src={avatarPreview || 'https://via.placeholder.com/200'} 
                   alt="Avatar Preview" 
                   className="w-full h-full object-cover rounded-[35%] border-4 border-white dark:border-gray-950" 
                 />
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageChange} 
              />
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-2 right-2 bg-babyshopSky text-white p-5 rounded-3xl border-4 border-white dark:border-gray-950 shadow-2xl hover:scale-110 active:scale-95 transition-all"
              >
                <Camera className="w-6 h-6" />
              </button>
           </div>
           <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] mt-8">Universal Identity Token</p>
        </div>

        <div className="md:col-span-8 space-y-10">
          <div className="grid grid-cols-1 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 ml-2">Full Identity Name</label>
              <div className="relative group/input">
                 <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within/input:text-babyshopSky transition-colors" />
                 <Input 
                   value={formData.name} 
                   onChange={(e: any) => setFormData({...formData, name: e.target.value})}
                   className="rounded-[28px] h-16 pl-16 bg-gray-50 border-transparent focus:bg-white focus:border-babyshopSky/30 shadow-none font-black uppercase text-xs tracking-widest transition-all"
                   placeholder="Enter your registered name"
                   required
                 />
              </div>
            </div>

            <div className="space-y-3 opacity-60">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 ml-2">Permanent Email Reference (Locked)</label>
              <div className="relative cursor-not-allowed">
                 <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                 <Input 
                   value={authUser.email} 
                   disabled
                   className="rounded-[28px] h-16 pl-16 bg-gray-100 border-transparent font-black uppercase text-xs tracking-widest cursor-not-allowed opacity-50"
                 />
                 <Lock className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-50 dark:border-gray-900 flex items-center gap-4 mb-4">
              <ShieldCheck className="w-5 h-5 text-babyshopSky" />
              <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Security Update Manifest</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 ml-2">New Security Code</label>
              <div className="relative group/input">
                 <div className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within/input:text-babyshopSky transition-colors">
                    <Lock className="w-5 h-5" />
                 </div>
                 <Input 
                   value={formData.password} 
                   onChange={(e: any) => setFormData({...formData, password: e.target.value})}
                   className="rounded-[28px] h-16 pl-16 pr-14 bg-gray-50 border-transparent focus:bg-white focus:border-babyshopSky/30 shadow-none font-black uppercase text-xs tracking-widest transition-all"
                   type={showPassword ? "text" : "password"}
                   placeholder="••••••••"
                 />
                 <button 
                   type="button"
                   onClick={() => setShowPassword(!showPassword)}
                   className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-babyshopSky transition-colors"
                 >
                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                 </button>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 ml-2">Verify Manifest</label>
              <Input 
                value={formData.confirmPassword} 
                onChange={(e: any) => setFormData({...formData, confirmPassword: e.target.value})}
                className="rounded-[28px] h-16 px-8 bg-gray-50 border-transparent focus:bg-white focus:border-babyshopSky/30 shadow-none font-black uppercase text-xs tracking-widest transition-all"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="pt-10 flex flex-col md:flex-row gap-6">
            <Button 
               type="submit" 
               className="h-20 px-12 rounded-4xl bg-black text-white dark:bg-white dark:text-black hover:bg-babyshopSky dark:hover:bg-babyshopSky dark:hover:text-white transition-all duration-500 font-black uppercase text-xs tracking-[0.3em] flex gap-6 shadow-2xl flex-1 group" 
               disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Save className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              )}
              Execute Synchronization
            </Button>
            <div className="hidden md:flex items-center gap-4 px-10 bg-gray-50 dark:bg-gray-900 rounded-4xl text-gray-400 text-[9px] font-black uppercase tracking-[0.2em] leading-tight">
               <ShieldCheck className="w-5 h-5 text-babyshopSky" />
               Locked by E2E <br /> Encryption
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

// UI Components
const Badge = ({ children, className }: any) => (
  <span className={`inline-flex items-center justify-center ${className}`}>
    {children}
  </span>
);

const Input = ({ className, ...props }: any) => (
  <input 
    className={`flex w-full ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed border-2 border-transparent ${className}`}
    {...props}
  />
);

export default ProfilePage;
