import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, PlusCircle, User, LogOut, Bookmark, Menu, X, LayoutDashboard, ChevronDown, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { NotificationBell } from './NotificationBell.jsx';
import { PillNav } from './PillNav.jsx';
import Dock from './Dock.jsx';

export const Navbar = () => {
  const { user, isAuthenticated, logout, getDashboardPath } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const navItems = [
    { label: 'Explore Campaigns', href: '/campaigns' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Trust & Transparency', href: '/about' },
  ];

  const authDockItems = [
    {
      label: 'Sign In',
      icon: <LogIn size={20} className="text-[#3A2418]" />,
      onClick: () => navigate('/login'),
    },
    {
      label: 'Register',
      icon: <UserPlus size={20} className="text-[#C96F4A]" />,
      onClick: () => navigate('/register'),
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#E8D5B7]/95 backdrop-blur-md border-b border-[#DCCBB5] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#C96F4A] to-[#E8B89D] flex items-center justify-center shadow-sm text-[#FFF8EE] group-hover:scale-105 transition duration-200">
              <Shield className="w-5 h-5 fill-white/20" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-[#3A2418] flex items-center gap-1">
                Crowd<span className="text-[#C96F4A]">Trust</span>
              </span>
              <span className="hidden sm:block text-[10px] text-[#6B5140] font-semibold tracking-wide uppercase">
                Verified • Transparent
              </span>
            </div>
          </Link>

          {/* Desktop PillNav Navigation */}
          <div className="hidden md:flex items-center">
            <PillNav
              items={navItems}
              activeHref={location.pathname}
              ease="power3.easeOut"
              baseColor="#E8D5B7"
              pillColor="#F7F0E3"
              hoveredPillTextColor="#FFF8EE"
              pillTextColor="#3A2418"
              accentColor="#C96F4A"
            />
          </div>

          {/* Right Action Items */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && <NotificationBell />}

            <Link
              to={user?.role === 'creator' || user?.role === 'admin' ? '/creator/campaigns/new' : '/register?role=creator'}
              className="btn-primary text-xs py-2 px-3.5 gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Start Campaign</span>
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[#DFCCA9] transition focus:outline-none"
                >
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border border-[#DCCBB5] object-cover"
                  />
                  <span className="text-xs font-bold text-[#3A2418] max-w-[100px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#6B5140]" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#FBF7EF] rounded-2xl shadow-xl border border-[#DCCBB5] py-2 z-50 animate-scale-in">
                    <div className="px-4 py-2 border-b border-[#EADDCB]">
                      <p className="text-xs font-bold text-[#3A2418] truncate">{user.name}</p>
                      <p className="text-[11px] text-[#6B5140] truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#F0DDC7] text-[#7A452F]">
                        {user.role}
                      </span>
                    </div>

                    <div className="py-1">
                      <Link
                        to={getDashboardPath()}
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#3A2418] hover:bg-[#F1E7D6] transition"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#6B5140]" />
                        Dashboard
                      </Link>

                      {user.role === 'donor' && (
                        <Link
                          to="/dashboard?tab=bookmarks"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#3A2418] hover:bg-[#F1E7D6] transition"
                        >
                          <Bookmark className="w-4 h-4 text-[#6B5140]" />
                          Saved Campaigns
                        </Link>
                      )}

                      <Link
                        to="/dashboard?tab=profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#3A2418] hover:bg-[#F1E7D6] transition"
                      >
                        <User className="w-4 h-4 text-[#6B5140]" />
                        Profile Settings
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-[#EADDCB]">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#B85D3B] hover:bg-[#F0DDC7] transition text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center">
                <Dock
                  items={authDockItems}
                  panelHeight={52}
                  baseItemSize={38}
                  magnification={54}
                  distance={130}
                  dockHeight={52}
                />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {isAuthenticated && <NotificationBell />}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl text-[#3A2418] hover:bg-[#DFCCA9] transition"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-[#DCCBB5] bg-[#E8D5B7] px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/campaigns"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#3A2418] hover:bg-[#DFCCA9]"
          >
            Explore Campaigns
          </Link>
          <Link
            to="/how-it-works"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#3A2418] hover:bg-[#DFCCA9]"
          >
            How It Works
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#3A2418] hover:bg-[#DFCCA9]"
          >
            Trust & Transparency
          </Link>

          <div className="pt-3 border-t border-[#DCCBB5] space-y-2">
            <Link
              to={user?.role === 'creator' || user?.role === 'admin' ? '/creator/campaigns/new' : '/register?role=creator'}
              onClick={() => setIsMenuOpen(false)}
              className="btn-primary w-full text-xs py-2.5"
            >
              <PlusCircle className="w-4 h-4" />
              Start a Campaign
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to={getDashboardPath()}
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-secondary w-full text-xs py-2.5"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  My Dashboard ({user.role})
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-[#B85D3B] bg-[#F0DDC7] rounded-xl"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-secondary text-xs py-2 text-center"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-secondary text-xs py-2 text-center bg-[#FBF7EF]"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
