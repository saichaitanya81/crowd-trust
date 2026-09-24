import React from 'react';
import { Layers, ShieldCheck, Heart, FileSpreadsheet, Lock, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowItWorksPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
          Complete Workflow
        </span>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          How CrowdTrust Works
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          A step-by-step walkthrough of our verified, transparent crowdfunding lifecycle.
        </p>
      </div>

      {/* For Creators & For Donors Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Creator Workflow */}
        <div className="card-container p-8 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <span className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-sm">
              1
            </span>
            <h2 className="text-xl font-bold text-slate-900">For Campaign Creators</h2>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-700">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Build Your Multi-Step Proposal</h4>
                <p className="text-slate-500 mt-1 leading-relaxed">
                  Enter story objectives, beneficiary details, planned budget items, and progressive milestones. Use the integrated AI Assistant to audit clarity.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Submit Identity Credentials</h4>
                <p className="text-slate-500 mt-1 leading-relaxed">
                  Upload government ID or NGO registration certificates. Once approved, your campaign receives the green Verified Trust badge.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Unlock Milestone Escrow Tranches</h4>
                <p className="text-slate-500 mt-1 leading-relaxed">
                  As you execute the project, submit photographic evidence and vendor receipts to unlock subsequent milestone funding installments.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Link to="/creator/campaigns/new" className="btn-primary w-full text-xs py-3">
              Start a Verified Campaign
            </Link>
          </div>
        </div>

        {/* Donor Workflow */}
        <div className="card-container p-8 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
              2
            </span>
            <h2 className="text-xl font-bold text-slate-900">For Donors & Backers</h2>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-700">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Discover Audited Causes</h4>
                <p className="text-slate-500 mt-1 leading-relaxed">
                  Browse initiatives across Medical, Education, Environment, and Tech. Filter by verified organizers and location.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Donate with Escrow Safety</h4>
                <p className="text-slate-500 mt-1 leading-relaxed">
                  Your funds are protected. You receive instant official tax receipts and transaction references.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Track Receipts & Measurable Outcomes</h4>
                <p className="text-slate-500 mt-1 leading-relaxed">
                  Receive notifications when the creator completes milestones, uploads vendor receipts, and updates outcome statistics.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Link to="/campaigns" className="btn-trust w-full text-xs py-3">
              Explore Active Campaigns
            </Link>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="card-container p-8 space-y-6">
        <h3 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-600">
          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900">What happens if a milestone is rejected?</h4>
            <p className="leading-relaxed">
              If an organizer fails to provide valid evidence or vendor bills for a milestone, subsequent escrow funds remain locked until compliance issues are resolved.
            </p>
          </div>
          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900">How does the AI Assistant assist creators?</h4>
            <p className="leading-relaxed">
              The AI analyzes description clarity, identifies missing budget items or beneficiary details, and suggests categories to optimize donor engagement.
            </p>
          </div>
          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900">Are donations refundable?</h4>
            <p className="leading-relaxed">
              In cases where a campaign is proven fraudulent or cancelled before milestone release, remaining escrow funds can be credited back to donors.
            </p>
          </div>
          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900">Who can view expense receipts?</h4>
            <p className="leading-relaxed">
              Every approved vendor bill and receipt is publicly inspectable by all donors on the campaign’s transparency dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
