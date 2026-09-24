import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, PlusCircle, User, LogOut, Bookmark, Menu, X, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { NotificationBell } from './NotificationBell.jsx';

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

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-500 flex items-center justify-center shadow-sm text-white group-hover:scale-105 transition duration-200">
              <Shield className="w-5 h-5 fill-white/20" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-slate-900 flex items-center gap-1">
                Crowd<span className="text-brand-600">Trust</span>
              </span>
              <span className="hidden sm:block text-[10px] text-slate-500 font-medium tracking-wide uppercase">
                Verified • Transparent
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            <Link
              to="/campaigns"
              className={`text-sm font-medium transition ${
                isActive('/campaigns') ? 'text-brand-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Explore Campaigns
            </Link>
            <Link
              to="/how-it-works"
              className={`text-sm font-medium transition ${
                isActive('/how-it-works') ? 'text-brand-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              How It Works
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition ${
                isActive('/about') ? 'text-brand-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Trust & Transparency
            </Link>
          </nav>

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
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition focus:outline-none"
                >
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border border-slate-200 object-cover"
                  />
                  <span className="text-xs font-semibold text-slate-800 max-w-[100px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-50 animate-scale-in">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-slate-100 text-slate-700">
                        {user.role}
                      </span>
                    </div>

                    <div className="py-1">
                      <Link
                        to={getDashboardPath()}
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                      >
                        <LayoutDashboard className="w-4 h-4 text-slate-500" />
                        Dashboard
                      </Link>

                      {user.role === 'donor' && (
                        <Link
                          to="/dashboard?tab=bookmarks"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                        >
                          <Bookmark className="w-4 h-4 text-slate-500" />
                          Saved Campaigns
                        </Link>
                      )}

                      <Link
                        to="/dashboard?tab=profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                      >
                        <User className="w-4 h-4 text-slate-500" />
                        Profile Settings
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-secondary text-xs py-2 px-3.5">
                  Sign In
                </Link>
                <Link to="/register" className="btn-secondary text-xs py-2 px-3.5 bg-slate-100 hover:bg-slate-200">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {isAuthenticated && <NotificationBell />}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200/80 bg-white px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/campaigns"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Explore Campaigns
          </Link>
          <Link
            to="/how-it-works"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            How It Works
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Trust & Transparency
          </Link>

          <div className="pt-3 border-t border-slate-100 space-y-2">
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
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-rose-600 bg-rose-50 rounded-xl"
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
                  className="btn-secondary text-xs py-2 text-center bg-slate-100"
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
