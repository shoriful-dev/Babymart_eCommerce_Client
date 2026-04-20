'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModalStore } from '@/lib/modalStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useUserStore } from '@/lib/store';
import { toast } from 'sonner';
import Logo from '../common/Logo';
import authApi from '@/lib/authApi';

const LoginModal = () => {
  const { isLoginModalOpen, closeLoginModal } = useModalStore();
  const { setAuthToken } = useUserStore();
  
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const response = await authApi.post<any>(endpoint, formData);
      
      if (response.data) {
        if (!isRegister) {
            setAuthToken(response.data.token);
            toast.success('Login Successful!');
            closeLoginModal();
        } else {
            toast.success('Registration successful! Please login.');
            setIsRegister(false);
        }
      } else {
        toast.error(response.error?.message || 'Action failed');
      }
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={closeLoginModal}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden rounded-3xl border-none shadow-2xl">
        <div className="bg-white p-6 sm:p-10">
          <DialogHeader className="mb-8">
            <DialogTitle className="text-xl font-black uppercase tracking-tight text-babyshopBlack">
              {isRegister ? 'Create Account' : 'Login'}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center mb-8">
             <Logo className="w-40 mb-2" />
          </div>

          <div className="space-y-4">
             {/* Form */}
             <form onSubmit={handleSubmit} className="space-y-5">
                {isRegister && (
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Full Name</label>
                        <Input 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="John Doe" 
                            className="rounded-xl py-6 border-gray-100 focus:border-babyshopSky transition-all"
                            required
                        />
                    </div>
                )}
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address <span className="text-red-500">*</span></label>
                    <Input 
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="example@mail.com" 
                        className="rounded-xl py-6 border-gray-100 focus:border-babyshopSky transition-all"
                        required
                    />
                </div>
                <div className="space-y-1 relative">
                    <div className="flex items-center justify-between">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Password <span className="text-red-500">*</span></label>
                        {!isRegister && (
                            <button type="button" className="text-[10px] font-black text-gray-400 hover:text-babyshopSky uppercase tracking-widest">Forgot Password?</button>
                        )}
                    </div>
                    <div className="relative">
                        <Input 
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="••••••••" 
                            className="rounded-xl py-6 border-gray-100 focus:border-babyshopSky transition-all pr-12"
                            required
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-babyshopSky"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center space-x-2 py-2">
                    <Checkbox id="terms" className="rounded-md border-gray-100 data-[state=checked]:bg-babyshopBlack data-[state=checked]:border-babyshopBlack" />
                    <label
                        htmlFor="terms"
                        className="text-[10px] font-bold text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        I agree with the <span className="text-babyshopBlack hover:underline cursor-pointer">Privacy Policy</span>
                    </label>
                </div>

                <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full rounded-full py-7 bg-babyshopBlack hover:bg-gray-800 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-gray-200 transition-all active:scale-[0.98]"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isRegister ? 'Create Account' : 'Sign In')}
                </Button>
             </form>

             <div className="mt-8 text-center">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">
                    {isRegister ? 'Already have an account?' : 'Don\'t have an account?'}
                    <button 
                        onClick={() => setIsRegister(!isRegister)}
                        className="ml-1 text-babyshopBlack font-black hover:underline"
                    >
                        {isRegister ? 'Login Now' : 'Sign Up Now'}
                    </button>
                </p>
             </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
