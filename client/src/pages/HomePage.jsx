import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Heart,
  FileSpreadsheet,
  Lock,
  Layers,
  GraduationCap,
  Stethoscope,
  Leaf,
  Cpu,
  Flame,
  Users,
  Award,
} from 'lucide-react';
import api from '../services/api.js';
import { CampaignCard } from '../components/CampaignCard.jsx';
import { CampaignCardSkeleton } from '../components/LoadingSkeleton.jsx';

export const HomePage = () => {
  const [stats, setStats] = useState({
    totalFundsRaised: 1420000,
    activeCampaigns: 18,
    completedCampaigns: 42,
    verifiedCreators: 28,
  });
  const [featuredCampaigns, setFeaturedCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, featuredRes] = await Promise.all([
          api.get('/campaigns/stats').catch(() => null),
          api.get('/campaigns/featured').catch(() => null),
        ]);

        if (statsRes?.success) {
          setStats(statsRes.data);
        }
        if (featuredRes?.success) {
          setFeaturedCampaigns(featuredRes.data.campaigns || []);
        }
      } catch (err) {
        console.error('Failed to load homepage stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categories = [
    { name: 'Education', icon: GraduationCap, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', count: '14 Campaigns' },
    { name: 'Medical', icon: Stethoscope, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20', count: '22 Campaigns' },
    { name: 'Environment', icon: Leaf, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', count: '19 Campaigns' },
    { name: 'Technology', icon: Cpu, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20', count: '11 Campaigns' },
    { name: 'Emergency', icon: Flame, color: 'text-orange-400 bg-orange-500/10 border-orange-500/20', count: '8 Campaigns' },
    { name: 'Community', icon: Users, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20', count: '16 Campaigns' },
  ];

  const steps = [
    {
      num: '01',
      title: 'Create with Budget',
      desc: 'Organizers formulate campaigns with itemized cost estimates and defined measurable outcomes.',
      icon: Layers,
    },
    {
      num: '02',
      title: 'Verify & Audit',
      desc: 'Our compliance team audits organizer identity documents and verifies legal registration.',
      icon: ShieldCheck,
    },
    {
      num: '03',
      title: 'Fund with Escrow',
      desc: 'Donors contribute safely. Funds are locked in milestone-based escrow tranches.',
      icon: Lock,
    },
    {
      num: '04',
      title: 'Track Real Impact',
      desc: 'Inspect verified bills, photographic proofs, and audited outcomes in real time.',
      icon: FileSpreadsheet,
    },
  ];

  return (
    <div className="space-y-20 pb-20 overflow-hidden bg-slate-950 text-slate-100">
      {/* 1. Hero Section */}
      <section className="relative pt-16 pb-24 sm:pt-24 sm:pb-32 overflow-hidden bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 border-b border-slate-800/80">
        <div className="absolute top-0 inset-x-0 h-40 bg-radial from-emerald-500/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 shadow-lg shadow-emerald-500/5 mb-6 text-xs font-semibold text-emerald-400 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>The 100% Audited Crowdfunding Standard</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Fund Ideas. Build Trust.{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Create Impact.
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            CrowdTrust is the transparent crowdfunding platform where every rupee is backed by verified creator identities, milestone escrow releases, and itemized invoice audits.
          </p>

          {/* Hero CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/creator/campaigns/new"
              className="btn-primary w-full sm:w-auto text-sm py-3.5 px-8 gap-2 shadow-xl shadow-emerald-500/20"
            >
              <span>Start a Campaign</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/campaigns"
              className="btn-secondary w-full sm:w-auto text-sm py-3.5 px-8"
            >
              Explore Verified Campaigns
            </Link>
          </div>

          {/* Trust Guarantees Row */}
          <div className="mt-14 pt-8 border-t border-slate-800/80 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-slate-300">
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Identity Verified</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Milestone Escrow</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Receipt Audits</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero Fake Claims</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Platform Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-emerald-400">
                ₹{Number(stats.totalFundsRaised || 0).toLocaleString()}
              </p>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Total Funds Raised
              </p>
            </div>
            <div className="space-y-1 pt-6 lg:pt-0">
              <p className="text-3xl sm:text-4xl font-black text-teal-400">
                {stats.activeCampaigns || 0}+
              </p>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Active Campaigns
              </p>
            </div>
            <div className="space-y-1 pt-6 lg:pt-0">
              <p className="text-3xl sm:text-4xl font-black text-cyan-400">
                {stats.completedCampaigns || 0}+
              </p>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Successful Projects
              </p>
            </div>
            <div className="space-y-1 pt-6 lg:pt-0">
              <p className="text-3xl sm:text-4xl font-black text-amber-400">
                {stats.verifiedCreators || 0}
              </p>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Verified Creators
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Campaigns Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Verified & Audited</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Featured Campaigns
            </h2>
          </div>
          <Link
            to="/campaigns"
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 hover:underline"
          >
            Browse All Campaigns <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <CampaignCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCampaigns.slice(0, 3).map((camp) => (
              <CampaignCard key={camp._id} campaign={camp} />
            ))}
          </div>
        )}
      </section>

      {/* 4. How It Works Section */}
      <section className="bg-slate-900/60 py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Transparency In Action
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              How CrowdTrust Guarantees Trust
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              From proposal to final execution, every single step is accounted for transparently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="p-6 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden group hover:border-emerald-500/50 transition-all duration-300 shadow-xl"
                >
                  <span className="text-4xl font-black text-slate-800 group-hover:text-emerald-500/20 absolute -top-1 right-3 select-none transition">
                    {step.num}
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:bg-emerald-500 group-hover:text-slate-950 transition duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Explore Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Diverse Impact
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Explore Causes That Matter
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                to={`/campaigns?category=${cat.name}`}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center group hover:-translate-y-1 hover:border-slate-700 transition duration-300 flex flex-col items-center justify-center shadow-lg"
              >
                <div
                  className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-3 transition group-hover:scale-110 ${cat.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition">
                  {cat.name}
                </h4>
                <span className="text-[11px] text-slate-500 mt-0.5">{cat.count}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 6. CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-900/70 via-teal-900/60 to-slate-900 border border-emerald-500/30 text-white p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Ready to create verified change with zero opacity?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Launch your campaign on CrowdTrust with automated milestone tracking, AI assistance, and transparent receipt audits.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to="/register?role=creator"
                className="btn-primary w-full sm:w-auto text-sm py-3.5 px-8 font-bold shadow-xl shadow-emerald-500/25"
              >
                Start as a Creator
              </Link>
              <Link
                to="/campaigns"
                className="btn-secondary w-full sm:w-auto text-sm py-3.5 px-8"
              >
                Explore Campaigns
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
