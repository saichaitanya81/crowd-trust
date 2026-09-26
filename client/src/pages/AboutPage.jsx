import React from 'react';
import { ShieldCheck, Lock, Eye, FileSpreadsheet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export const AboutPage = () => {
  const pillars = [
    {
      title: '1. Identity & Credential Verification',
      desc: 'No anonymous organizers. Every campaign creator must submit government-issued identity documents and tax/NGO registrations, validated by human compliance officers.',
      icon: ShieldCheck,
      color: 'bg-[#F0DDC7] text-[#C96F4A]',
    },
    {
      title: '2. Milestone-Based Escrow Tranches',
      desc: 'Campaign funds are not wired out in a lump sum. They are locked in smart escrow accounts and disbursed sequentially as milestones are achieved.',
      icon: Lock,
      color: 'bg-[#F1E7D6] text-[#6B5140]',
    },
    {
      title: '3. Audited Itemized Expense Logs',
      desc: 'Organizers upload vendor invoices, bills, and purchase receipts before next tranches are unlocked. Donors inspect real invoices on the transparency dashboard.',
      icon: FileSpreadsheet,
      color: 'bg-[#FEF3C7] text-[#92400E]',
    },
    {
      title: '4. Measurable Real-World Impact',
      desc: 'Projects publish quantifiable outcomes (e.g., number of students schooled, liters of water purified) verified with geo-tagged photographic evidence.',
      icon: Eye,
      color: 'bg-[#E8F0DF] text-[#3D5A2B]',
    },
  ];

  const pillarContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const pillarCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16 bg-[#F7F0E3] text-[#3A2418]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0DDC7] text-[#7A452F] text-xs font-bold border border-[#DCCBB5]">
          <ShieldCheck className="w-4 h-4 text-[#C96F4A]" />
          <span>The CrowdTrust Manifesto</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-[#3A2418] tracking-tight leading-tight">
          Rebuilding Trust in Global Philanthropy
        </h1>
        <p className="text-sm sm:text-base text-[#6B5140] leading-relaxed">
          Traditional crowdfunding platforms suffer from opacity: donors never truly know if their contributions were deployed as promised or lost in overheads. CrowdTrust was engineered from the ground up to solve this trust gap.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <motion.div
        variants={pillarContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {pillars.map((p) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.title}
              variants={pillarCardVariants}
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-8 rounded-2xl bg-[#FBF7EF] border border-[#DCCBB5] hover:border-[#C96F4A] transition-colors duration-300 shadow-warm-sm hover:shadow-[0_12px_30px_rgba(58,36,24,0.10)] space-y-4 overflow-hidden group"
            >
              {/* Subtle warm glow highlight on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{
                  background: 'radial-gradient(circle at 15% 10%, rgba(201, 111, 74, 0.06), transparent 45%)',
                }}
              />

              <div
                className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-108 group-hover:-translate-y-0.5 shadow-xs ${p.color}`}
              >
                <Icon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-2" />
              </div>
              <h3 className="relative z-10 text-lg font-bold text-[#3A2418] group-hover:text-[#2E1B11] transition-colors duration-200">
                {p.title}
              </h3>
              <p className="relative z-10 text-xs sm:text-sm text-[#6B5140] group-hover:text-[#3A2418] leading-relaxed transition-colors duration-200">
                {p.desc}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Trust Comparison Table */}
      <div className="card-container p-8 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-[#3A2418]">How CrowdTrust Differs</h3>
          <p className="text-xs text-[#6B5140] mt-1">Comparing traditional crowdfunding platforms with CrowdTrust.</p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#DCCBB5]">
          <table className="min-w-full text-xs text-left">
            <thead className="bg-[#F1E7D6] uppercase text-[#3A2418] font-bold text-[11px]">
              <tr>
                <th className="p-3.5">Feature</th>
                <th className="p-3.5 text-[#8A7463]">Traditional Platforms</th>
                <th className="p-3.5 text-[#C96F4A] font-black">CrowdTrust Ecosystem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EADDCB] font-medium text-[#3A2418] bg-[#FBF7EF]">
              <tr>
                <td className="p-3.5 font-bold">Fund Disbursement</td>
                <td className="p-3.5 text-[#9B1C1C]">100% Upfront Lump Sum</td>
                <td className="p-3.5 text-[#3D5A2B] font-bold">Milestone Tranches in Escrow</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">Creator Verification</td>
                <td className="p-3.5 text-[#8A7463]">Minimal Email Check</td>
                <td className="p-3.5 text-[#3D5A2B] font-bold">Govt ID & NGO Audit Review</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">Expense Receipts</td>
                <td className="p-3.5 text-[#9B1C1C]">Hidden / Optional</td>
                <td className="p-3.5 text-[#3D5A2B] font-bold">100% Public Audited Invoices</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">Outcome Tracking</td>
                <td className="p-3.5 text-[#8A7463]">Unverified Text Posts</td>
                <td className="p-3.5 text-[#3D5A2B] font-bold">Measurable Metrics & Geo-Photos</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA Box */}
      <div className="card-container p-10 bg-gradient-to-r from-[#3A2418] via-[#4A3022] to-[#2C1810] border border-[#523626] text-[#FFF8EE] text-center space-y-4 shadow-warm-lg">
        <h3 className="text-2xl font-black text-[#FFF8EE]">Join the Transparent Giving Movement</h3>
        <p className="text-xs sm:text-sm text-[#EADDCB] max-w-xl mx-auto">
          Whether you are an impact organizer or a generous backer, experience transparency that sets a new industry standard.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/campaigns" className="btn-primary py-3 px-6 text-xs font-bold w-full sm:w-auto shadow-md">
            Explore Campaigns
          </Link>
          <Link to="/register?role=creator" className="btn-secondary py-3 px-6 text-xs font-bold w-full sm:w-auto">
            Apply as Creator
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
