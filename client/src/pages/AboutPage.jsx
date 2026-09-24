import React from 'react';
import { ShieldCheck, Lock, Eye, FileSpreadsheet, Users, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage = () => {
  const pillars = [
    {
      title: '1. Identity & Credential Verification',
      desc: 'No anonymous organizers. Every campaign creator must submit government-issued identity documents and tax/NGO registrations, validated by human compliance officers.',
      icon: ShieldCheck,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: '2. Milestone-Based Escrow Tranches',
      desc: 'Campaign funds are not wired out in a lump sum. They are locked in smart escrow accounts and disbursed sequentially as milestones are achieved.',
      icon: Lock,
      color: 'bg-brand-50 text-brand-600',
    },
    {
      title: '3. Audited Itemized Expense Logs',
      desc: 'Organizers upload vendor invoices, bills, and purchase receipts before next tranches are unlocked. Donors inspect real invoices on the transparency dashboard.',
      icon: FileSpreadsheet,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      title: '4. Measurable Real-World Impact',
      desc: 'Projects publish quantifiable outcomes (e.g., number of students schooled, liters of water purified) verified with geo-tagged photographic evidence.',
      icon: Eye,
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>The CrowdTrust Manifesto</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Rebuilding Trust in Global Philanthropy
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Traditional crowdfunding platforms suffer from opacity: donors never truly know if their contributions were deployed as promised or lost in overheads. CrowdTrust was engineered from the ground up to solve this trust gap.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {pillars.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.title} className="card-container p-8 space-y-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${p.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Trust Comparison Table */}
      <div className="card-container p-8 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">How CrowdTrust Differs</h3>
          <p className="text-xs text-slate-500 mt-1">Comparing traditional crowdfunding platforms with CrowdTrust.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-xs text-left">
            <thead className="bg-slate-50 uppercase text-slate-500 font-bold text-[11px]">
              <tr>
                <th className="p-3">Feature</th>
                <th className="p-3 text-slate-400">Traditional Platforms</th>
                <th className="p-3 text-brand-700 font-black">CrowdTrust Ecosystem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              <tr>
                <td className="p-3 font-bold">Fund Disbursement</td>
                <td className="p-3 text-rose-600">100% Upfront Lump Sum</td>
                <td className="p-3 text-emerald-700 font-bold">Milestone Tranches in Escrow</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Creator Verification</td>
                <td className="p-3 text-slate-500">Minimal Email Check</td>
                <td className="p-3 text-emerald-700 font-bold">Govt ID & NGO Audit Review</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Expense Receipts</td>
                <td className="p-3 text-rose-600">Hidden / Optional</td>
                <td className="p-3 text-emerald-700 font-bold">100% Public Audited Invoices</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Outcome Tracking</td>
                <td className="p-3 text-slate-500">Unverified Text Posts</td>
                <td className="p-3 text-emerald-700 font-bold">Measurable Metrics & Geo-Photos</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA Box */}
      <div className="card-container p-10 bg-slate-900 text-white text-center space-y-4">
        <h3 className="text-2xl font-black">Join the Transparent Giving Movement</h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Whether you are an impact organizer or a generous backer, experience transparency that sets a new industry standard.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link to="/campaigns" className="btn-primary py-3 px-6 text-xs font-bold">
            Explore Campaigns
          </Link>
          <Link to="/register?role=creator" className="btn-secondary py-3 px-6 text-xs font-bold bg-slate-800 text-white border-slate-700 hover:bg-slate-700">
            Apply as Creator
          </Link>
        </div>
      </div>
    </div>
  );
};
