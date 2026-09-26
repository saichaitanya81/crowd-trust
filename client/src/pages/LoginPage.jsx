import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, UserCheck, Stethoscope, HeartHandshake } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import WarmTooltip from '../components/WarmTooltip/WarmTooltip.jsx';
import TiltedCard from '../components/TiltedCard/TiltedCard.jsx';

export const LoginPage = () => {
  const { login, getDashboardPath } = useAuth();
  const { error } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      error('Please enter both email and password.');
      return;
    }

    setLoading(true);
    const res = await login(email, password);
    setLoading(false);

    if (res?.success && res.user) {
      const defaultPath = getDashboardPath(res.user.role);
      const from = location.state?.from?.pathname || defaultPath;
      navigate(from, { replace: true });
    }
  };

  const handleQuickLogin = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#F7F0E3] text-[#3A2418]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <Link to="/" className="inline-flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#C96F4A] flex items-center justify-center text-[#FFF8EE] shadow-md font-bold">
            <Shield className="w-5 h-5 fill-white/20" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-[#3A2418]">
            Crowd<span className="text-[#C96F4A]">Trust</span>
          </span>
        </Link>
        <h2 className="text-2xl font-black text-[#3A2418] tracking-tight">Welcome Back</h2>
        <p className="text-xs text-[#6B5140]">Sign in to manage your campaigns, donations, and audited proofs.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <TiltedCard
          altText="CrowdTrust Sign In"
          captionText="Sign in to CrowdTrust"
          containerHeight="auto"
          containerWidth="100%"
          imageHeight="100%"
          imageWidth="100%"
          rotateAmplitude={5}
          scaleOnHover={1.02}
          showMobileWarning={false}
          showTooltip={false}
          displayOverlayContent={true}
          overlayContent={
            <div className="p-8 space-y-6 shadow-warm-lg rounded-3xl border border-[#DCCBB5] bg-[#FBF7EF] w-full">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#3A2418] uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8A7463] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D6BFA0] bg-[#FBF7EF] text-xs text-[#3A2418] placeholder-[#9A8371] focus:border-[#C96F4A] transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3A2418] uppercase tracking-wider mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#8A7463] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D6BFA0] bg-[#FBF7EF] text-xs text-[#3A2418] placeholder-[#9A8371] focus:border-[#C96F4A] transition"
                      required
                    />
                  </div>
                </div>

                <WarmTooltip
                  content="Sign In"
                  side="top"
                  surfaceColor="#E8D5B7"
                  inkColor="#3A2418"
                  size="md"
                  radius={8}
                  gap={8}
                  arrow
                  popDuration={160}
                  popScale={0.94}
                  popBlur={4}
                  showFuse={false}
                  className="w-full"
                >
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3 text-xs font-bold shadow-lg shadow-[#C96F4A]/25"
                    aria-label="Sign In"
                  >
                    {loading ? 'Authenticating...' : 'Sign In'}
                  </button>
                </WarmTooltip>
              </form>

              {/* Quick 1-Click Demo Accounts */}
              <div className="pt-4 border-t border-[#EADDCB] space-y-2">
                <span className="block text-[11px] font-bold text-[#8A7463] uppercase tracking-wider text-center">
                  Quick 1-Click Demo Credentials
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('admin@crowdtrust.org', 'Admin@12345#')}
                    className="p-2.5 rounded-2xl bg-[#F0DDC7] hover:bg-[#E8D5B7] border border-[#DCCBB5] text-[#7A452F] text-center transition"
                  >
                    <UserCheck className="w-4 h-4 text-[#C96F4A] mx-auto mb-1" />
                    <span className="block text-[10px] font-bold">Admin</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('aisha@ruralhealth.org', 'Creator@12345#')}
                    className="p-2.5 rounded-2xl bg-[#F1E7D6] hover:bg-[#E8D5B7] border border-[#DCCBB5] text-[#6B5140] text-center transition"
                  >
                    <Stethoscope className="w-4 h-4 text-[#C96F4A] mx-auto mb-1" />
                    <span className="block text-[10px] font-bold">Creator</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('priya@example.com', 'Donor@12345#')}
                    className="p-2.5 rounded-2xl bg-[#E8F0DF] hover:bg-[#DBE8D0] border border-[#C8DCAE] text-[#3D5A2B] text-center transition"
                  >
                    <HeartHandshake className="w-4 h-4 text-[#4A6B3A] mx-auto mb-1" />
                    <span className="block text-[10px] font-bold">Donor</span>
                  </button>
                </div>
              </div>

              <div className="text-center text-xs text-[#6B5140] pt-2">
                Don't have an account yet?{' '}
                <WarmTooltip
                  content="Create an account"
                  side="top"
                  surfaceColor="#E8D5B7"
                  inkColor="#3A2418"
                  size="sm"
                  radius={8}
                  gap={8}
                  arrow
                  popDuration={160}
                  popScale={0.94}
                  popBlur={4}
                  showFuse={false}
                >
                  <Link to="/register" className="font-bold text-[#C96F4A] hover:underline" aria-label="Create an account">
                    Create an account
                  </Link>
                </WarmTooltip>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default LoginPage;
