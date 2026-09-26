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
import { motion } from 'motion/react';
import { CampaignCard } from '../components/CampaignCard.jsx';
import { CampaignCardSkeleton } from '../components/LoadingSkeleton.jsx';
import ClickSpark from '../components/ClickSpark.jsx';
import AnimatedContent from '../components/AnimatedContent.jsx';
import FadeContent from '../components/FadeContent.jsx';
import { LogoLoop } from '../components/LogoLoop.jsx';

export const HomePage = () => {
  const [stats, setStats] = useState({
    totalFundsRaised: 1420000,
    activeCampaigns: 18,
    completedCampaigns: 42,
    verifiedCreators: 28,
  });
  const [featuredCampaigns, setFeaturedCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const partnerLogos = [
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#FBF7EF] border border-[#DCCBB5] shadow-xs hover:border-[#C96F4A] transition-colors">
          <Stethoscope className="w-4 h-4 text-[#C96F4A]" />
          <span className="text-xs font-bold text-[#3A2418] whitespace-nowrap">Arogya Seva Trust</span>
        </div>
      ),
      title: 'Arogya Seva Trust',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#FBF7EF] border border-[#DCCBB5] shadow-xs hover:border-[#C96F4A] transition-colors">
          <GraduationCap className="w-4 h-4 text-[#C96F4A]" />
          <span className="text-xs font-bold text-[#3A2418] whitespace-nowrap">Vidya Shiksha Mission</span>
        </div>
      ),
      title: 'Vidya Shiksha Mission',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#FBF7EF] border border-[#DCCBB5] shadow-xs hover:border-[#C96F4A] transition-colors">
          <Leaf className="w-4 h-4 text-[#4A6B3A]" />
          <span className="text-xs font-bold text-[#3A2418] whitespace-nowrap">GreenEarth Forestry NGO</span>
        </div>
      ),
      title: 'GreenEarth Forestry NGO',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#FBF7EF] border border-[#DCCBB5] shadow-xs hover:border-[#C96F4A] transition-colors">
          <ShieldCheck className="w-4 h-4 text-[#C96F4A]" />
          <span className="text-xs font-bold text-[#3A2418] whitespace-nowrap">India NGO Alliance</span>
        </div>
      ),
      title: 'India NGO Alliance',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#FBF7EF] border border-[#DCCBB5] shadow-xs hover:border-[#C96F4A] transition-colors">
          <Cpu className="w-4 h-4 text-[#6B5140]" />
          <span className="text-xs font-bold text-[#3A2418] whitespace-nowrap">SolarBridge Renewable Energy</span>
        </div>
      ),
      title: 'SolarBridge Renewable Energy',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#FBF7EF] border border-[#DCCBB5] shadow-xs hover:border-[#C96F4A] transition-colors">
          <Heart className="w-4 h-4 text-[#C96F4A]" />
          <span className="text-xs font-bold text-[#3A2418] whitespace-nowrap">Community Care Foundation</span>
        </div>
      ),
      title: 'Community Care Foundation',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#FBF7EF] border border-[#DCCBB5] shadow-xs hover:border-[#C96F4A] transition-colors">
          <Award className="w-4 h-4 text-[#C96F4A]" />
          <span className="text-xs font-bold text-[#3A2418] whitespace-nowrap">Transparency Standard 80G</span>
        </div>
      ),
      title: 'Transparency Standard 80G',
    },
  ];

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
    { name: 'Education', icon: GraduationCap, color: 'text-[#C96F4A] bg-[#F0DDC7] border-[#DCCBB5]', count: '14 Campaigns' },
    { name: 'Medical', icon: Stethoscope, color: 'text-[#B85D3B] bg-[#F7E2D6] border-[#DCCBB5]', count: '22 Campaigns' },
    { name: 'Environment', icon: Leaf, color: 'text-[#4A6B3A] bg-[#E8F0DF] border-[#C8DCAE]', count: '19 Campaigns' },
    { name: 'Technology', icon: Cpu, color: 'text-[#6B5140] bg-[#EFE5D3] border-[#DCCBB5]', count: '11 Campaigns' },
    { name: 'Emergency', icon: Flame, color: 'text-[#C96F4A] bg-[#FBF0E4] border-[#E8DAC6]', count: '8 Campaigns' },
    { name: 'Community', icon: Users, color: 'text-[#8A5034] bg-[#F1E7D6] border-[#DCCBB5]', count: '16 Campaigns' },
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

  const categoryContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const categoryCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <ClickSpark
      sparkColor="#C96F4A"
      sparkSize={10}
      sparkRadius={18}
      sparkCount={8}
      duration={400}
      easing="ease-out"
      extraScale={1}
    >
      <div className="space-y-20 pb-20 overflow-hidden bg-[#F7F0E3] text-[#3A2418]">
        {/* 1. Hero Section */}
        <section className="relative pt-16 pb-24 sm:pt-24 sm:pb-32 overflow-hidden border-b border-[#DCCBB5]">
          {/* Background Image Layer */}
          <img
            src="/images/crowdtrust-hero-bg.png"
            alt=""
            aria-hidden="true"
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0 opacity-45 select-none"
          />

          {/* Warm Cream / Almond Theme Overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[#FBF7EF]/90 via-[#F7F0E3]/92 to-[#F7F0E3]"
          />

          {/* Hero Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[2] text-center">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F0DDC7] border border-[#D6BFA0] shadow-sm mb-6 text-xs font-bold text-[#7A452F] animate-fade-in">
              <span className="flex h-2 w-2 rounded-full bg-[#C96F4A] animate-ping" />
              <ShieldCheck className="w-4 h-4 text-[#C96F4A]" />
              <span>The 100% Audited Crowdfunding Standard</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-black text-[#3A2418] tracking-tight leading-[1.15] max-w-4xl mx-auto">
              Fund Ideas. Build Trust.{' '}
              <span className="text-[#C96F4A]">
                Create Impact.
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-6 text-base sm:text-lg text-[#6B5140] max-w-2xl mx-auto leading-relaxed">
              CrowdTrust is the transparent crowdfunding platform where every rupee is backed by verified creator identities, milestone escrow releases, and itemized invoice audits.
            </p>

            {/* Hero CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/creator/campaigns/new"
                className="btn-primary w-full sm:w-auto text-sm py-3.5 px-8 gap-2 shadow-lg shadow-[#C96F4A]/25"
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
            <div className="mt-14 pt-8 border-t border-[#DCCBB5] max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold text-[#3A2418]">
              <div className="flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C96F4A] shrink-0" />
                <span>Identity Verified</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C96F4A] shrink-0" />
                <span>Milestone Escrow</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C96F4A] shrink-0" />
                <span>Receipt Audits</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C96F4A] shrink-0" />
                <span>Zero Fake Claims</span>
              </div>
            </div>
          </div>
        </section>

      {/* Trusted Organizations LogoLoop Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="text-center mb-5">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8A7463]">
            Trusted by verified grassroots communities, NGOs & social impact partners
          </p>
        </div>

        <LogoLoop
          logos={partnerLogos}
          speed={60}
          direction="left"
          logoHeight={36}
          gap={32}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#F7F0E3"
          ariaLabel="CrowdTrust verified community partners and organizations"
        />
      </section>

      {/* 2. Platform Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedContent
          distance={150}
          direction="horizontal"
          reverse={false}
          duration={1.2}
          ease="bounce.out"
          initialOpacity={0.2}
          animateOpacity
          scale={1.05}
          threshold={0.2}
          delay={0.3}
        >
          <div className="p-8 rounded-3xl bg-[#FBF7EF] border border-[#DCCBB5] shadow-warm">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-[#DCCBB5]">
              <div className="space-y-1">
                <p className="text-3xl sm:text-4xl font-black text-[#C96F4A]">
                  ₹{Number(stats.totalFundsRaised || 0).toLocaleString()}
                </p>
                <p className="text-xs font-bold text-[#6B5140] uppercase tracking-wider">
                  Total Funds Raised
                </p>
              </div>
              <div className="space-y-1 pt-6 lg:pt-0">
                <p className="text-3xl sm:text-4xl font-black text-[#3A2418]">
                  {stats.activeCampaigns || 0}+
                </p>
                <p className="text-xs font-bold text-[#6B5140] uppercase tracking-wider">
                  Active Campaigns
                </p>
              </div>
              <div className="space-y-1 pt-6 lg:pt-0">
                <p className="text-3xl sm:text-4xl font-black text-[#3A2418]">
                  {stats.completedCampaigns || 0}+
                </p>
                <p className="text-xs font-bold text-[#6B5140] uppercase tracking-wider">
                  Successful Projects
                </p>
              </div>
              <div className="space-y-1 pt-6 lg:pt-0">
                <p className="text-3xl sm:text-4xl font-black text-[#C96F4A]">
                  {stats.verifiedCreators || 0}
                </p>
                <p className="text-xs font-bold text-[#6B5140] uppercase tracking-wider">
                  Verified Creators
                </p>
              </div>
            </div>
          </div>
        </AnimatedContent>
      </section>

      {/* 3. Featured Campaigns Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeContent blur duration={1000} ease="power2.out" threshold={0.1}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#C96F4A] uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Verified & Audited</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#3A2418] tracking-tight">
                Featured Campaigns
              </h2>
            </div>
            <Link
              to="/campaigns"
              className="text-xs font-bold text-[#C96F4A] hover:text-[#B85D3B] flex items-center gap-1 hover:underline"
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
              {featuredCampaigns.slice(0, 3).map((camp, idx) => (
                <CampaignCard key={camp._id} campaign={camp} index={idx} />
              ))}
            </div>
          )}
        </FadeContent>
      </section>

      {/* 4. How It Works Section */}
      <section className="bg-[#F1E7D6] py-16 border-y border-[#DCCBB5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeContent blur duration={1000} ease="power2.out" threshold={0.1}>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-[#C96F4A] uppercase tracking-wider">
                Transparency In Action
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#3A2418] tracking-tight mt-1">
                How CrowdTrust Guarantees Trust
              </h2>
              <p className="text-xs sm:text-sm text-[#6B5140] mt-2">
                From proposal to final execution, every single step is accounted for transparently.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.num}
                    className="p-6 rounded-2xl bg-[#FBF7EF] border border-[#DCCBB5] relative overflow-hidden group hover:border-[#C96F4A] transition-all duration-300 shadow-sm"
                  >
                    <span className="text-4xl font-black text-[#E8DAC6] group-hover:text-[#C96F4A]/20 absolute -top-1 right-3 select-none transition">
                      {step.num}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-[#F0DDC7] text-[#C96F4A] border border-[#E8DAC6] flex items-center justify-center mb-4 group-hover:bg-[#C96F4A] group-hover:text-[#FFF8EE] transition duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-[#3A2418] mb-2">{step.title}</h3>
                    <p className="text-xs text-[#6B5140] leading-relaxed">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </FadeContent>
        </div>
      </section>

      {/* 5. Explore Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeContent blur duration={1000} ease="power2.out" threshold={0.1}>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#C96F4A] uppercase tracking-wider">
              Diverse Impact
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#3A2418] tracking-tight mt-1">
              Explore Causes That Matter
            </h2>
          </div>

          <motion.div
            variants={categoryContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.name}
                  variants={categoryCardVariants}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={`/campaigns?category=${cat.name}`}
                    className="relative p-5 rounded-2xl bg-[#FBF7EF] border border-[#DCCBB5] hover:border-[#C96F4A] text-center group transition-colors duration-300 flex flex-col items-center justify-center shadow-xs hover:shadow-[0_12px_28px_rgba(58,36,24,0.12)] h-full overflow-hidden block"
                  >
                    {/* Subtle warm glow highlight on hover */}
                    <div className="absolute inset-0 bg-radial from-[#C96F4A]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

                    <div
                      className={`relative z-10 w-12 h-12 rounded-2xl border flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-108 group-hover:-translate-y-0.5 group-hover:shadow-xs ${cat.color}`}
                    >
                      <Icon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-3" />
                    </div>
                    <h4 className="relative z-10 text-xs font-bold text-[#3A2418] group-hover:text-[#C96F4A] transition-colors duration-200">
                      {cat.name}
                    </h4>
                    <span className="relative z-10 text-[11px] text-[#8A7463] group-hover:text-[#6B5140] transition-colors duration-200 mt-0.5">
                      {cat.count}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </FadeContent>
      </section>

      {/* 6. CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeContent blur duration={1000} ease="power2.out" threshold={0.1}>
          <div className="rounded-3xl bg-gradient-to-r from-[#3A2418] via-[#4A3022] to-[#2C1810] border border-[#523626] text-[#FFF8EE] p-8 sm:p-14 text-center shadow-warm-lg relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-[#FFF8EE]">
                Ready to create verified change with zero opacity?
              </h2>
              <p className="text-sm text-[#EADDCB] leading-relaxed">
                Launch your campaign on CrowdTrust with automated milestone tracking, AI assistance, and transparent receipt audits.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link
                  to="/register?role=creator"
                  className="btn-primary w-full sm:w-auto text-sm py-3.5 px-8 font-bold shadow-xl shadow-[#C96F4A]/30"
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
        </FadeContent>
      </section>
    </div>
    </ClickSpark>
  );
};

export default HomePage;
