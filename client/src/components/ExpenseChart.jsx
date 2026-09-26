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
      <div className="flex items-center justify-between pb-4 border-b border-[#EADDCB]">
        <div>
          <h3 className="text-base font-bold text-[#3A2418] flex items-center gap-2">
            <PieChart className="w-5 h-5 text-[#C96F4A]" />
            Transparency & Fund Utilization
          </h3>
          <p className="text-xs text-[#6B5140] mt-0.5">
            Real-time audit log of collected donor funds and approved vendor expenses.
          </p>
        </div>
        <span className="badge bg-[#F0DDC7] text-[#7A452F]">
          <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#C96F4A]" />
          100% Accounted
        </span>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#F1E7D6] border border-[#DCCBB5]">
          <span className="text-[11px] font-bold text-[#6B5140] uppercase tracking-wider">
            Total Funds Raised
          </span>
          <p className="text-xl font-black text-[#3A2418] mt-1">
            ₹{Number(totalRaised).toLocaleString()}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#F0DDC7]/70 border border-[#DCCBB5]">
          <span className="text-[11px] font-bold text-[#7A452F] uppercase tracking-wider">
            Audited & Disbursed
          </span>
          <p className="text-xl font-black text-[#7A452F] mt-1">
            ₹{Number(totalApprovedExpenses).toLocaleString()}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#EFE5D3] border border-[#DCCBB5]">
          <span className="text-[11px] font-bold text-[#6B5140] uppercase tracking-wider">
            Remaining in Escrow
          </span>
          <p className="text-xl font-black text-[#3A2418] mt-1">
            ₹{Number(remainingFunds).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Overall Utilization Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-bold text-[#3A2418]">
          <span>Overall Fund Utilization Rate</span>
          <span className="text-[#C96F4A]">{expenseUtilizationRate}%</span>
        </div>
        <ProgressBar percentage={expenseUtilizationRate} height="h-3" color="terracotta" />
      </div>

      {/* Category Breakdown Bars */}
      {categoryBreakdown && categoryBreakdown.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-[#EADDCB]">
          <h4 className="text-xs font-bold text-[#3A2418] uppercase tracking-wider">
            Spending by Category
          </h4>
          <div className="space-y-2.5">
            {categoryBreakdown.map((cat) => (
              <div key={cat.category} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-[#6B5140]">
                  <span>{cat.category}</span>
                  <span className="font-bold text-[#3A2418]">
                    ₹{Number(cat.amount).toLocaleString()} ({cat.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-[#EFE5D3] h-2 rounded-full overflow-hidden border border-[#DCCBB5]">
                  <div
                    className="bg-[#C96F4A] h-2 rounded-full transition-all duration-500"
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

export default ExpenseChart;
