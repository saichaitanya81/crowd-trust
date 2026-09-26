import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export const HowItWorksPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
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
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#C96F4A] uppercase tracking-wider">
          Complete Workflow
        </span>
        <h1 className="text-4xl font-black text-[#3A2418] tracking-tight">
          How CrowdTrust Works
        </h1>
        <p className="text-xs sm:text-sm text-[#6B5140]">
          A step-by-step walkthrough of our verified, transparent crowdfunding lifecycle.
        </p>
      </div>

      {/* For Creators & For Donors Side-by-Side */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-10"
      >
        {/* Creator Workflow */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -6, scale: 1.015 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-8 rounded-2xl bg-[#FBF7EF] border border-[#DCCBB5] hover:border-[#C96F4A] transition-colors duration-300 shadow-warm-sm hover:shadow-[0_14px_32px_rgba(58,36,24,0.12)] space-y-6 overflow-hidden group flex flex-col justify-between"
        >
          {/* Subtle warm glow highlight on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
            style={{
              background: 'radial-gradient(circle at 10% 5%, rgba(201, 111, 74, 0.05), transparent 45%)',
            }}
          />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-[#EADDCB]">
              <span className="w-8 h-8 rounded-xl bg-[#F0DDC7] text-[#C96F4A] flex items-center justify-center font-black text-sm transition-all duration-300 group-hover:scale-108 group-hover:-translate-y-0.5 shadow-xs">
                1
              </span>
              <h2 className="text-xl font-bold text-[#3A2418] group-hover:text-[#2E1B11] transition-colors duration-200">
                For Campaign Creators
              </h2>
            </div>

            <div className="space-y-6 text-xs sm:text-sm text-[#6B5140]">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#F0DDC7] text-[#7A452F] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-104 shadow-2xs">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-[#3A2418] group-hover:text-[#C96F4A] transition-colors duration-200">
                    Build Your Multi-Step Proposal
                  </h4>
                  <p className="text-[#6B5140] group-hover:text-[#3A2418] mt-1 leading-relaxed transition-colors duration-200">
                    Enter story objectives, beneficiary details, planned budget items, and progressive milestones. Use the integrated AI Assistant to audit clarity.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#F0DDC7] text-[#7A452F] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-104 shadow-2xs">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-[#3A2418] group-hover:text-[#C96F4A] transition-colors duration-200">
                    Submit Identity Credentials
                  </h4>
                  <p className="text-[#6B5140] group-hover:text-[#3A2418] mt-1 leading-relaxed transition-colors duration-200">
                    Upload government ID or NGO registration certificates. Once approved, your campaign receives the green Verified Trust badge.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#F0DDC7] text-[#7A452F] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-104 shadow-2xs">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-[#3A2418] group-hover:text-[#C96F4A] transition-colors duration-200">
                    Unlock Milestone Escrow Tranches
                  </h4>
                  <p className="text-[#6B5140] group-hover:text-[#3A2418] mt-1 leading-relaxed transition-colors duration-200">
                    As you execute the project, submit photographic evidence and vendor receipts to unlock subsequent milestone funding installments.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-4">
            <Link
              to="/creator/campaigns/new"
              className="btn-primary w-full text-xs py-3 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-lg transition-all duration-200 block text-center"
            >
              Start a Verified Campaign
            </Link>
          </div>
        </motion.div>

        {/* Donor Workflow */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -6, scale: 1.015 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-8 rounded-2xl bg-[#FBF7EF] border border-[#DCCBB5] hover:border-[#C96F4A] transition-colors duration-300 shadow-warm-sm hover:shadow-[0_14px_32px_rgba(58,36,24,0.12)] space-y-6 overflow-hidden group flex flex-col justify-between"
        >
          {/* Subtle warm glow highlight on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
            style={{
              background: 'radial-gradient(circle at 10% 5%, rgba(201, 111, 74, 0.05), transparent 45%)',
            }}
          />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-[#EADDCB]">
              <span className="w-8 h-8 rounded-xl bg-[#E8F0DF] text-[#3D5A2B] flex items-center justify-center font-black text-sm transition-all duration-300 group-hover:scale-108 group-hover:-translate-y-0.5 shadow-xs">
                2
              </span>
              <h2 className="text-xl font-bold text-[#3A2418] group-hover:text-[#2E1B11] transition-colors duration-200">
                For Donors & Backers
              </h2>
            </div>

            <div className="space-y-6 text-xs sm:text-sm text-[#6B5140]">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E8F0DF] text-[#3D5A2B] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-104 shadow-2xs">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-[#3A2418] group-hover:text-[#C96F4A] transition-colors duration-200">
                    Discover Audited Causes
                  </h4>
                  <p className="text-[#6B5140] group-hover:text-[#3A2418] mt-1 leading-relaxed transition-colors duration-200">
                    Browse initiatives across Medical, Education, Environment, and Tech. Filter by verified organizers and location.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E8F0DF] text-[#3D5A2B] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-104 shadow-2xs">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-[#3A2418] group-hover:text-[#C96F4A] transition-colors duration-200">
                    Donate with Escrow Safety
                  </h4>
                  <p className="text-[#6B5140] group-hover:text-[#3A2418] mt-1 leading-relaxed transition-colors duration-200">
                    Your funds are protected. You receive instant official tax receipts and transaction references.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E8F0DF] text-[#3D5A2B] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-104 shadow-2xs">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-[#3A2418] group-hover:text-[#C96F4A] transition-colors duration-200">
                    Track Receipts & Measurable Outcomes
                  </h4>
                  <p className="text-[#6B5140] group-hover:text-[#3A2418] mt-1 leading-relaxed transition-colors duration-200">
                    Receive notifications when the creator completes milestones, uploads vendor receipts, and updates outcome statistics.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-4">
            <Link
              to="/campaigns"
              className="btn-trust w-full text-xs py-3 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-lg transition-all duration-200 block text-center"
            >
              Explore Active Campaigns
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Frequently Asked Questions */}
      <div className="card-container p-8 space-y-6">
        <h3 className="text-xl font-bold text-[#3A2418]">Frequently Asked Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-[#6B5140]">
          <div className="space-y-1.5">
            <h4 className="font-bold text-[#3A2418]">What happens if a milestone is rejected?</h4>
            <p className="leading-relaxed">
              If an organizer fails to provide valid evidence or vendor bills for a milestone, subsequent escrow funds remain locked until compliance issues are resolved.
            </p>
          </div>
          <div className="space-y-1.5">
            <h4 className="font-bold text-[#3A2418]">How does the AI Assistant assist creators?</h4>
            <p className="leading-relaxed">
              The AI analyzes description clarity, identifies missing budget items or beneficiary details, and suggests categories to optimize donor engagement.
            </p>
          </div>
          <div className="space-y-1.5">
            <h4 className="font-bold text-[#3A2418]">Are donations refundable?</h4>
            <p className="leading-relaxed">
              In cases where a campaign is proven fraudulent or cancelled before milestone release, remaining escrow funds can be credited back to donors.
            </p>
          </div>
          <div className="space-y-1.5">
            <h4 className="font-bold text-[#3A2418]">Who can view expense receipts?</h4>
            <p className="leading-relaxed">
              Every approved vendor bill and receipt is publicly inspectable by all donors on the campaign’s transparency dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
