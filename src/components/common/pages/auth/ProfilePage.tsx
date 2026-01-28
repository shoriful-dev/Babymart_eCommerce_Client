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
  ShoppingBag,
  Eye,
  EyeOff,
  Lock,
  Camera,
  Save
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import Container from '@/components/common/Container';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

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
    <Container className="py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            My Profile
            <User className="w-8 h-8 text-babyshopSky" />
          </h1>
          <p className="text-gray-500 mt-1">Manage your account and preferences</p>
        </div>
        <Button 
          onClick={handleLogout} 
          variant="outline"
          className="gap-2"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-800">
                  {authUser.avatar ? (
                    <Image src={authUser.avatar} alt={authUser.name} width={96} height={96} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-babyshopSky to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                      {authUser.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-babyshopSky text-white p-1.5 rounded-full">
                  <ShieldCheck className="w-3 h-3" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-1">{authUser.name}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {authUser.email}
              </p>
            </div>

            <div className="space-y-1">
              {[
                { id: 'overview', label: 'Overview', icon: ShoppingBag },
                { id: 'details', label: 'Edit Profile', icon: User },
                { id: 'settings', label: 'Settings', icon: Lock },
              ].map((tab) => (
                <Button 
                  key={tab.id}
                  variant="ghost" 
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full justify-start ${activeTab === tab.id ? 'bg-babyshopSky text-white hover:bg-babyshopSky/90 hover:text-white' : ''}`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/user/orders" className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-babyshopSky transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Total Orders</p>
                      <h3 className="text-3xl font-bold">{orders.length}</h3>
                    </div>
                    <div className="bg-babyshopSky/10 p-4 rounded-xl">
                      <Package className="w-8 h-8 text-babyshopSky" />
                    </div>
                  </div>
                </Link>

                <Link href="/user/wishlist" className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-red-500 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Wishlist Items</p>
                      <h3 className="text-3xl font-bold">{wishlistIds.length}</h3>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
                      <Heart className="w-8 h-8 text-red-500" />
                    </div>
                  </div>
                </Link>
              </div>

              {/* Account Info */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold mb-4">Account Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Calendar className="w-5 h-5 text-babyshopSky" />
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="font-medium">{authUser.createdAt ? new Date(authUser.createdAt).toLocaleDateString() : 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Account Status</p>
                      <p className="font-medium text-green-600">Active & Verified</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              {orders.length > 0 && (
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Recent Orders</h3>
                    <Link href="/user/orders">
                      <Button variant="ghost" size="sm">View All</Button>
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {orders.slice(0, 3).map((order) => (
                      <Link key={order._id} href={`/user/orders/${order._id}`}>
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                          <div className="flex items-center gap-3">
                            <Package className="w-5 h-5 text-babyshopSky" />
                            <div>
                              <p className="font-medium text-sm">#{order._id.substring(order._id.length - 8)}</p>
                              <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                            {order.status}
                          </Badge>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'details' && (
            <DetailsView authUser={authUser} updateUser={updateUser} />
          )}

          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold mb-4">Settings</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security</p>
                    </div>
                    <Badge className="bg-green-500">Enabled</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full" onClick={() => toast.info('Feature coming soon!')}>
                  Change Password
                </Button>
                <Button variant="destructive" className="w-full">
                  Delete Account
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
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
      if (response && response.success && response.data) {
        updateUser(response.data);
        toast.success('Profile updated successfully');
        setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
        setAvatarFile(null);
      } else {
        toast.error('Update failed');
      }
    } catch (error: any) {
      console.error('Update profile error:', error);
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-6">Edit Profile</h3>

      <form onSubmit={handleUpdate} className="space-y-6">
        {/* Avatar Upload */}
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-800">
              <Image 
                src={avatarPreview || 'https://via.placeholder.com/200'} 
                alt="Avatar Preview" 
                width={128}
                height={128}
                className="w-full h-full object-cover" 
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
              className="absolute bottom-0 right-0 bg-babyshopSky text-white p-2 rounded-full hover:bg-babyshopSky/90 transition-colors"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-3">Click to change avatar</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-babyshopSky"
                placeholder="Your name"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Email (Cannot be changed)</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                value={authUser.email} 
                disabled
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 opacity-60 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">New Password (Optional)</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-10 pr-10 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-babyshopSky"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Confirm Password</label>
            <input 
              value={formData.confirmPassword} 
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-babyshopSky"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full gap-2" 
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default ProfilePage;
