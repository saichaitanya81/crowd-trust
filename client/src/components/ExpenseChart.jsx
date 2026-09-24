import React from 'react';
import { PieChart, DollarSign, Wallet, ShieldCheck } from 'lucide-react';
import { ProgressBar } from './ProgressBar.jsx';

export const ExpenseChart = ({ transparency = {}, categoryBreakdown = [] }) => {
  const {
    totalRaised = 0,
    totalApprovedExpenses = 0,
    remainingFunds = 0,
    expenseUtilizationRate = 0,
  } = transparency;

  return (
    <div className="card-container p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-brand-600" />
            Transparency & Fund Utilization
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time audit log of collected donor funds and approved vendor expenses.
          </p>
        </div>
        <span className="badge bg-emerald-100 text-emerald-800">
          <ShieldCheck className="w-3.5 h-3.5 mr-1" />
          100% Accounted
        </span>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Total Funds Raised
          </span>
          <p className="text-xl font-black text-slate-900 mt-1">
            ₹{Number(totalRaised).toLocaleString()}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/60">
          <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
            Audited & Disbursed
          </span>
          <p className="text-xl font-black text-emerald-800 mt-1">
            ₹{Number(totalApprovedExpenses).toLocaleString()}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200/60">
          <span className="text-[11px] font-semibold text-sky-700 uppercase tracking-wider">
            Remaining in Escrow
          </span>
          <p className="text-xl font-black text-sky-900 mt-1">
            ₹{Number(remainingFunds).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Overall Utilization Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-semibold text-slate-700">
          <span>Overall Fund Utilization Rate</span>
          <span>{expenseUtilizationRate}%</span>
        </div>
        <ProgressBar percentage={expenseUtilizationRate} height="h-3" color="trust" />
      </div>

      {/* Category Breakdown Bars */}
      {categoryBreakdown && categoryBreakdown.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Spending by Category
          </h4>
          <div className="space-y-2.5">
            {categoryBreakdown.map((cat) => (
              <div key={cat.category} className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-600">
                  <span>{cat.category}</span>
                  <span className="font-bold text-slate-800">
                    ₹{Number(cat.amount).toLocaleString()} ({cat.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, cat.percentage)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
