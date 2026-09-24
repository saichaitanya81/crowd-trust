import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Shield, Lock, Mail, User, Phone, MapPin, CheckCircle2, HeartHandshake, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'creator' ? 'creator' : 'donor';

  const { register, getDashboardPath } = useAuth();
  const { error } = useToast();
  const navigate = useNavigate();

  const [role, setRole] = useState(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Password rules validation
  const hasMinLen = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[@$!%*?&#]/.test(password);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasMinLen || !hasUpper || !hasLower || !hasNumber || !hasSpecial) {
      error('Password must satisfy all complexity criteria below.');
      return;
    }
    if (password !== confirmPassword) {
      error('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      const res = await register({
        name,
        email,
        password,
        role,
        phone,
        location,
      });

      if (res?.success && res.user) {
        navigate(getDashboardPath(res.user.role), { replace: true });
      }
    } catch (err) {
      error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg text-center space-y-2">
        <Link to="/" className="inline-flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 shadow-md font-bold">
            <Shield className="w-5 h-5 fill-slate-950/20" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-white">
            Crowd<span className="text-emerald-400">Trust</span>
          </span>
        </Link>
        <h2 className="text-2xl font-black text-white tracking-tight">Create Your Account</h2>
        <p className="text-xs text-slate-400">
          Join a community dedicated to verified, transparent social impact.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="p-8 space-y-6 shadow-2xl rounded-2xl border border-slate-800/80 bg-slate-900/90 backdrop-blur-md">
          {/* Role Toggle Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 text-center">
              Select Your Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('donor')}
                className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center text-center transition ${
                  role === 'donor'
                    ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 font-bold shadow-md shadow-emerald-500/10'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:bg-slate-800/40 hover:text-white'
                }`}
              >
                <HeartHandshake className="w-5 h-5 text-emerald-400 mb-1" />
                <span className="text-xs font-bold">Donor / Backer</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Explore & support causes</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('creator')}
                className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center text-center transition ${
                  role === 'creator'
                    ? 'border-teal-500 bg-teal-950/40 text-teal-300 font-bold shadow-md shadow-teal-500/10'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:bg-slate-800/40 hover:text-white'
                }`}
              >
                <Sparkles className="w-5 h-5 text-teal-400 mb-1" />
                <span className="text-xs font-bold">Campaign Creator</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Raise funds & audit milestones</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Full Name / Organization
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Ananya Sharma or Rural EdTech Foundation"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                  required
                />
              </div>
            </div>

            {/* Phone & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Phone (Optional)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  City, Country
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Mumbai, India"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
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

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password Validation Checklist */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-[11px]">
              <span className="font-bold text-slate-300 block">Password Requirements:</span>
              <div className="grid grid-cols-2 gap-1 text-slate-400">
                <span className={`flex items-center gap-1 ${hasMinLen ? 'text-emerald-400 font-bold' : ''}`}>
                  <CheckCircle2 className="w-3 h-3" /> 8+ Characters
                </span>
                <span className={`flex items-center gap-1 ${hasUpper ? 'text-emerald-400 font-bold' : ''}`}>
                  <CheckCircle2 className="w-3 h-3" /> 1 Uppercase Letter
                </span>
                <span className={`flex items-center gap-1 ${hasLower ? 'text-emerald-400 font-bold' : ''}`}>
                  <CheckCircle2 className="w-3 h-3" /> 1 Lowercase Letter
                </span>
                <span className={`flex items-center gap-1 ${hasNumber ? 'text-emerald-400 font-bold' : ''}`}>
                  <CheckCircle2 className="w-3 h-3" /> 1 Number
                </span>
                <span className={`flex items-center gap-1 ${hasSpecial ? 'text-emerald-400 font-bold' : ''}`}>
                  <CheckCircle2 className="w-3 h-3" /> 1 Special Character
                </span>
                <span className={`flex items-center gap-1 ${passwordsMatch ? 'text-emerald-400 font-bold' : ''}`}>
                  <CheckCircle2 className="w-3 h-3" /> Passwords Match
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 text-xs font-bold shadow-lg shadow-emerald-500/20"
            >
              {loading ? 'Creating Account...' : 'Complete Registration'}
            </button>
          </form>

          <div className="text-center text-xs text-slate-400 pt-1">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-emerald-400 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
