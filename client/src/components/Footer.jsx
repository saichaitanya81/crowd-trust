import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ShieldCheck, Heart, Mail, Globe, Share2, ExternalLink, CheckCircle2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-slate-950 shadow-sm font-bold">
                <Shield className="w-5 h-5 fill-slate-950/20" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Crowd<span className="text-teal-400">Trust</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The next-generation transparent crowdfunding ecosystem. We combine identity verification, milestone escrow releases, itemized expense audits, and measurable real-world outcomes.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 transition" aria-label="GitHub">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 transition" aria-label="Twitter">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="mailto:support@crowdtrust.org" className="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-slate-700 transition" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/campaigns" className="hover:text-white transition">All Campaigns</Link>
              </li>
              <li>
                <Link to="/campaigns?category=Medical" className="hover:text-white transition">Medical Relief</Link>
              </li>
              <li>
                <Link to="/campaigns?category=Education" className="hover:text-white transition">Education & STEM</Link>
              </li>
              <li>
                <Link to="/campaigns?category=Environment" className="hover:text-white transition">Clean Energy & Water</Link>
              </li>
              <li>
                <Link to="/campaigns?category=Technology" className="hover:text-white transition">Tech Innovation</Link>
              </li>
            </ul>
          </div>

          {/* Trust Architecture */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Trust Engine</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/how-it-works" className="hover:text-white transition">How It Works</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">Creator Verification</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">Milestone Tracking</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">Expense Audit Logs</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">Impact Metrics</Link>
              </li>
            </ul>
          </div>

          {/* Transparency Guarantee */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">The Trust Standard</h3>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 text-teal-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Hidden Fees</span>
              </div>
              <p className="text-slate-400 leading-snug">
                100% of donor funding is accounted for through audited vendor receipts and milestone proofs.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} CrowdTrust Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-slate-400 transition">Terms of Service</Link>
            <Link to="/about" className="hover:text-slate-400 transition">Privacy Policy</Link>
            <Link to="/about" className="hover:text-slate-400 transition">Security Disclosure</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
