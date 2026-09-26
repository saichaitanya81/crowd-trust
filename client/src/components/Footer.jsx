import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ShieldCheck, Mail, Globe, Share2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#2C1810] text-[#EADDCB] border-t border-[#4A3022]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#C96F4A] flex items-center justify-center text-[#FFF8EE] shadow-sm font-bold">
                <Shield className="w-5 h-5 fill-white/20" />
              </div>
              <span className="font-bold text-xl tracking-tight text-[#FFF8EE]">
                Crowd<span className="text-[#C96F4A]">Trust</span>
              </span>
            </Link>
            <p className="text-sm text-[#CBB4A0] leading-relaxed max-w-sm">
              The next-generation transparent crowdfunding ecosystem. We combine identity verification, milestone escrow releases, itemized expense audits, and measurable real-world outcomes.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[#CBB4A0]">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-[#3D2318] hover:text-[#FFF8EE] hover:bg-[#C96F4A] transition" aria-label="GitHub">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-[#3D2318] hover:text-[#FFF8EE] hover:bg-[#C96F4A] transition" aria-label="Twitter">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="mailto:support@crowdtrust.org" className="p-2 rounded-lg bg-[#3D2318] hover:text-[#FFF8EE] hover:bg-[#C96F4A] transition" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#FFF8EE] uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2 text-sm text-[#CBB4A0]">
              <li>
                <Link to="/campaigns" className="hover:text-[#FFF8EE] transition">All Campaigns</Link>
              </li>
              <li>
                <Link to="/campaigns?category=Medical" className="hover:text-[#FFF8EE] transition">Medical Relief</Link>
              </li>
              <li>
                <Link to="/campaigns?category=Education" className="hover:text-[#FFF8EE] transition">Education & STEM</Link>
              </li>
              <li>
                <Link to="/campaigns?category=Environment" className="hover:text-[#FFF8EE] transition">Clean Energy & Water</Link>
              </li>
              <li>
                <Link to="/campaigns?category=Technology" className="hover:text-[#FFF8EE] transition">Tech Innovation</Link>
              </li>
            </ul>
          </div>

          {/* Trust Architecture */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#FFF8EE] uppercase tracking-wider">Trust Engine</h3>
            <ul className="space-y-2 text-sm text-[#CBB4A0]">
              <li>
                <Link to="/how-it-works" className="hover:text-[#FFF8EE] transition">How It Works</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FFF8EE] transition">Creator Verification</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FFF8EE] transition">Milestone Tracking</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FFF8EE] transition">Expense Audit Logs</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FFF8EE] transition">Impact Metrics</Link>
              </li>
            </ul>
          </div>

          {/* Transparency Guarantee */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#FFF8EE] uppercase tracking-wider">The Trust Standard</h3>
            <div className="bg-[#3D2318] p-4 rounded-2xl border border-[#523626] space-y-2 text-xs text-[#EADDCB]">
              <div className="flex items-center gap-1.5 text-[#C96F4A] font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Hidden Fees</span>
              </div>
              <p className="text-[#CBB4A0] leading-snug">
                100% of donor funding is accounted for through audited vendor receipts and milestone proofs.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#4A3022] flex flex-col sm:flex-row items-center justify-between text-xs text-[#A8907E] gap-4">
          <p>© {new Date().getFullYear()} CrowdTrust Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-[#FFF8EE] transition">Terms of Service</Link>
            <Link to="/about" className="hover:text-[#FFF8EE] transition">Privacy Policy</Link>
            <Link to="/about" className="hover:text-[#FFF8EE] transition">Security Disclosure</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
