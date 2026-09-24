import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, UserCheck, Stethoscope, HeartHandshake } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

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
    <div className="min-h-[85vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <Link to="/" className="inline-flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 shadow-md font-bold">
            <Shield className="w-5 h-5 fill-slate-950/20" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-white">
            Crowd<span className="text-emerald-400">Trust</span>
          </span>
        </Link>
        <h2 className="text-2xl font-black text-white tracking-tight">Welcome Back</h2>
        <p className="text-xs text-slate-400">Sign in to manage your campaigns, donations, and audited proofs.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="p-8 space-y-6 shadow-2xl rounded-2xl border border-slate-800/80 bg-slate-900/90 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-xs font-bold shadow-lg shadow-emerald-500/20"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          {/* Quick 1-Click Demo Accounts */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
              Quick 1-Click Demo Credentials
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin@crowdtrust.org', 'Admin@12345#')}
                className="p-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-800/60 text-purple-300 text-center transition"
              >
                <UserCheck className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                <span className="block text-[10px] font-bold">Admin</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('dr.ananya@lifelinecare.org', 'Creator@12345#')}
                className="p-2.5 rounded-xl bg-teal-950/40 hover:bg-teal-900/60 border border-teal-800/60 text-teal-300 text-center transition"
              >
                <Stethoscope className="w-4 h-4 text-teal-400 mx-auto mb-1" />
                <span className="block text-[10px] font-bold">Creator</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('priya.sharma@gmail.com', 'Donor@12345#')}
                className="p-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/60 text-emerald-300 text-center transition"
              >
                <HeartHandshake className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <span className="block text-[10px] font-bold">Donor</span>
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-slate-400 pt-2">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-emerald-400 hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
