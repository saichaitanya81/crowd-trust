import React, { useState } from 'react';
import { Receipt, ShieldCheck, Eye, ExternalLink, X, Calendar, Tag } from 'lucide-react';

export const ExpenseTable = ({ expenses = [] }) => {
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  if (!expenses || expenses.length === 0) {
    return (
      <div className="p-8 text-center text-[#8A7463] text-xs bg-[#F1E7D6] rounded-2xl border border-[#DCCBB5]">
        <Receipt className="w-8 h-8 text-[#B85D3B] mx-auto mb-2 opacity-60" />
        No verified expense records uploaded yet. All future receipts will appear here automatically.
      </div>
    );
  }

  const categoryColors = {
    Equipment: 'bg-[#F0DDC7] text-[#7A452F] border-[#DCCBB5]',
    Materials: 'bg-[#F1E7D6] text-[#6B5140] border-[#DCCBB5]',
    Labor: 'bg-[#E8F0DF] text-[#3D5A2B] border-[#C8DCAE]',
    'Logistics & Transport': 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]',
    'Legal & Permitting': 'bg-[#EAE6DF] text-[#5A483C] border-[#D6CABA]',
    Operations: 'bg-[#F1E7D6] text-[#6B5140] border-[#DCCBB5]',
    Other: 'bg-[#F1E7D6] text-[#6B5140] border-[#DCCBB5]',
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-2xl border border-[#DCCBB5] shadow-sm bg-[#FBF7EF]">
        <table className="min-w-full divide-y divide-[#EADDCB] text-left text-xs">
          <thead className="bg-[#F1E7D6] font-bold text-[#3A2418] uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3.5 px-4">Date</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Description</th>
              <th className="py-3.5 px-4 text-right">Amount</th>
              <th className="py-3.5 px-4 text-center">Receipt Proof</th>
              <th className="py-3.5 px-4 text-center">Audit Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EADDCB] font-medium text-[#3A2418]">
            {expenses.map((exp) => (
              <tr key={exp._id} className="hover:bg-[#F1E7D6]/60 transition-colors">
                <td className="py-3.5 px-4 text-[#6B5140] whitespace-nowrap">
                  {new Date(exp.date || exp.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold border ${
                      categoryColors[exp.category] || categoryColors.Other
                    }`}
                  >
                    {exp.category}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[#3A2418] max-w-xs">{exp.description}</td>
                <td className="py-3.5 px-4 text-right font-black text-[#C96F4A] whitespace-nowrap">
                  ₹{Number(exp.amount).toLocaleString()}
                </td>
                <td className="py-3.5 px-4 text-center whitespace-nowrap">
                  {exp.receiptUrl ? (
                    <button
                      onClick={() => setSelectedReceipt(exp)}
                      className="inline-flex items-center gap-1 text-xs text-[#C96F4A] hover:text-[#B85D3B] font-bold p-1 rounded hover:bg-[#F0DDC7] transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Inspect Bill
                    </button>
                  ) : (
                    <span className="text-[#8A7463] text-[11px]">No receipt</span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-center whitespace-nowrap">
                  {exp.status === 'approved' ? (
                    <span className="inline-flex items-center gap-1 text-[#3D5A2B] font-bold text-[11px] bg-[#E8F0DF] px-2.5 py-0.5 rounded-full border border-[#C8DCAE]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#4A6B3A]" />
                      Audited
                    </span>
                  ) : exp.status === 'pending' ? (
                    <span className="inline-flex items-center text-[#92400E] font-bold text-[11px] bg-[#FEF3C7] px-2.5 py-0.5 rounded-full border border-[#FDE68A]">
                      Review Pending
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-[#9B1C1C] font-bold text-[11px] bg-[#FDE8E8] px-2.5 py-0.5 rounded-full border border-[#F8B4B4]">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C1810]/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FBF7EF] rounded-3xl max-w-lg w-full p-6 shadow-warm-lg space-y-4 border border-[#DCCBB5] animate-scale-in text-[#3A2418]">
            <div className="flex items-center justify-between border-b border-[#EADDCB] pb-3">
              <div>
                <h3 className="text-base font-bold text-[#3A2418]">Verified Invoice / Receipt</h3>
                <p className="text-xs text-[#6B5140]">{selectedReceipt.description}</p>
              </div>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="p-1 rounded-xl text-[#8A7463] hover:text-[#3A2418] hover:bg-[#F1E7D6] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-[#EFE5D3] border border-[#DCCBB5] flex items-center justify-center">
              <img
                src={selectedReceipt.receiptUrl}
                alt="Receipt Proof"
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="flex items-center justify-between text-xs bg-[#F1E7D6] p-3.5 rounded-2xl border border-[#DCCBB5]">
              <div>
                <span className="text-[#6B5140]">Amount Billed:</span>
                <span className="font-extrabold text-[#C96F4A] ml-1.5">
                  ₹{Number(selectedReceipt.amount).toLocaleString()}
                </span>
              </div>
              <a
                href={selectedReceipt.receiptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C96F4A] hover:text-[#B85D3B] font-bold flex items-center gap-1 hover:underline"
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

export default ExpenseTable;
