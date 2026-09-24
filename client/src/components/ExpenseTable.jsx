import React, { useState } from 'react';
import { Receipt, ShieldCheck, Eye, ExternalLink, X, Calendar, Tag } from 'lucide-react';

export const ExpenseTable = ({ expenses = [] }) => {
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  if (!expenses || expenses.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 text-xs bg-slate-50 rounded-2xl border border-slate-100">
        <Receipt className="w-8 h-8 text-slate-300 mx-auto mb-2" />
        No verified expense records uploaded yet. All future receipts will appear here automatically.
      </div>
    );
  }

  const categoryColors = {
    Equipment: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Materials: 'bg-sky-50 text-sky-700 border-sky-200',
    Labor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Logistics & Transport': 'bg-amber-50 text-amber-700 border-amber-200',
    'Legal & Permitting': 'bg-purple-50 text-purple-700 border-purple-200',
    Operations: 'bg-slate-100 text-slate-700 border-slate-200',
    Other: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 shadow-subtle bg-white">
        <table className="min-w-full divide-y divide-slate-100 text-left text-xs">
          <thead className="bg-slate-50 font-bold text-slate-600 uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3.5 px-4">Date</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Description</th>
              <th className="py-3.5 px-4 text-right">Amount</th>
              <th className="py-3.5 px-4 text-center">Receipt Proof</th>
              <th className="py-3.5 px-4 text-center">Audit Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {expenses.map((exp) => (
              <tr key={exp._id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                  {new Date(exp.date || exp.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${
                      categoryColors[exp.category] || categoryColors.Other
                    }`}
                  >
                    {exp.category}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-700 max-w-xs">{exp.description}</td>
                <td className="py-3.5 px-4 text-right font-extrabold text-slate-900 whitespace-nowrap">
                  ₹{Number(exp.amount).toLocaleString()}
                </td>
                <td className="py-3.5 px-4 text-center whitespace-nowrap">
                  {exp.receiptUrl ? (
                    <button
                      onClick={() => setSelectedReceipt(exp)}
                      className="inline-flex items-center gap-1 text-xs text-brand-600 hover:text-brand-800 font-semibold p-1 rounded hover:bg-brand-50 transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Inspect Bill
                    </button>
                  ) : (
                    <span className="text-slate-400 text-[11px]">No receipt</span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-center whitespace-nowrap">
                  {exp.status === 'approved' ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Audited
                    </span>
                  ) : exp.status === 'pending' ? (
                    <span className="inline-flex items-center text-amber-700 font-medium text-[11px] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      Review Pending
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-rose-700 font-medium text-[11px] bg-rose-50 px-2 py-0.5 rounded-full">
                      Rejected
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Receipt Inspection Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-200 animate-scale-in">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Verified Invoice / Receipt</h3>
                <p className="text-xs text-slate-500">{selectedReceipt.description}</p>
              </div>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
              <img
                src={selectedReceipt.receiptUrl}
                alt="Receipt Proof"
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="flex items-center justify-between text-xs bg-slate-50 p-3 rounded-xl">
              <div>
                <span className="text-slate-500">Amount Billed:</span>
                <span className="font-bold text-slate-900 ml-1.5">
                  ₹{Number(selectedReceipt.amount).toLocaleString()}
                </span>
              </div>
              <a
                href={selectedReceipt.receiptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 hover:text-brand-800 font-semibold flex items-center gap-1"
              >
                Open Full Document <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
