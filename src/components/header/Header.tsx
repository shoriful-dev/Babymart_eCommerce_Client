import React from 'react';
import TopHeader from './TopHeader';
import Container from '../common/Container';
import Logo from '../common/Logo';
import SearchInput from './SearchInput';
import OrdersIcon from './OrdersIcon';
import WishlistIcon from './WishlistIcon';
import UserButton from './UserButton';
import CartIcon from './CartIcon';
import Sidebar from './Sidebar';
import LoginModal from '../auth/LoginModal';

const Header = () => {
  return (
    <header className="border-b sticky top-0 z-50 bg-babyshopWhite shadow-sm">
      <TopHeader />
      <Container className="py-4">
        <div className="flex items-center justify-between gap-4 lg:gap-10">
          {/* Logo and Menu Toggle */}
          <div className="flex items-center gap-4 shrink-0">
            <Sidebar />
            <Logo />
          </div>

          {/* Central Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-auto">
            <SearchInput />
          </div>

          {/* User Actions - Matched to image order */}
          <div className="flex items-center gap-5 md:gap-8 shrink-0">
             <div className="flex items-center gap-6 md:gap-7 pr-2">
                <WishlistIcon />
                <CartIcon />
             </div>
             <UserButton />
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden mt-4">
          <SearchInput />
        </div>
      </Container>
      <LoginModal />
    </header>
  );
};

export default Header;
