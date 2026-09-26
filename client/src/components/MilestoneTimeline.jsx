import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, Lock, ShieldCheck, FileText, ChevronRight, ExternalLink } from 'lucide-react';

export const MilestoneTimeline = ({ milestones = [] }) => {
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  if (!milestones || milestones.length === 0) {
    return (
      <div className="text-center p-6 text-[#8A7463] text-xs bg-[#F1E7D6] rounded-2xl border border-[#DCCBB5]">
        No milestones defined for this campaign yet.
      </div>
    );
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return <CheckCircle2 className="w-5 h-5 text-[#C96F4A] fill-[#F0DDC7]" />;
      case 'submitted':
        return <Clock className="w-5 h-5 text-[#D97706] animate-pulse" />;
      case 'active':
        return <Circle className="w-5 h-5 text-[#C96F4A] fill-[#F0DDC7]" />;
      case 'locked':
      default:
        return <Lock className="w-4 h-4 text-[#8A7463]" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return <span className="badge bg-[#F0DDC7] text-[#7A452F] border border-[#DCCBB5]">Verified Complete</span>;
      case 'submitted':
        return <span className="badge bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">Under Review</span>;
      case 'active':
        return <span className="badge bg-[#F0DDC7] text-[#7A452F] border border-[#DCCBB5]">In Progress</span>;
      case 'locked':
      default:
        return <span className="badge bg-[#EFE5D3] text-[#8A7463] border border-[#DCCBB5]">Locked</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative border-l-2 border-[#DCCBB5] ml-4 pl-6 space-y-8">
        {milestones.map((m, index) => {
          const isDone = m.status === 'completed' || m.status === 'approved';
          const isCurrent = m.status === 'active' || m.status === 'submitted';

          return (
            <div key={m._id || index} className="relative group">
              {/* Timeline Marker Icon */}
              <div
                className={`absolute -left-[35px] top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-[#FBF7EF] ${
                  isDone
                    ? 'border-[#C96F4A]'
                    : isCurrent
                    ? 'border-[#C96F4A] shadow-sm'
                    : 'border-[#DCCBB5]'
                }`}
              >
                {getStatusIcon(m.status)}
              </div>

              {/* Milestone Details Card */}
              <div className="card-container p-5 transition-all duration-200 hover:border-[#C96F4A]">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#8A7463] uppercase tracking-wider">
                      Milestone {m.order || index + 1}
                    </span>
                    {getStatusBadge(m.status)}
                  </div>
                  <span className="text-sm font-extrabold text-[#C96F4A] bg-[#F1E7D6] px-2.5 py-1 rounded-lg border border-[#DCCBB5]">
                    ₹{Number(m.targetAmount).toLocaleString()}
                  </span>
                </div>

                <h4 className="text-base font-bold text-[#3A2418] mb-1.5">{m.title}</h4>
                <p className="text-xs text-[#6B5140] leading-relaxed mb-3">{m.description}</p>

                {/* Evidence & Verification Box */}
                {m.evidence?.description && (
                  <div className="mt-3 p-3.5 bg-[#F1E7D6] rounded-2xl border border-[#DCCBB5] space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#3A2418]">
                      <span className="flex items-center gap-1.5 text-[#C96F4A] font-bold">
                        <FileText className="w-3.5 h-3.5" />
                        Submitted Proof & Evidence
                      </span>
                      {m.evidence.fileUrl && (
                        <a
                          href={m.evidence.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#C96F4A] hover:text-[#B85D3B] font-bold flex items-center gap-1 hover:underline text-[11px]"
                        >
                          View Document <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-[#6B5140] leading-relaxed">{m.evidence.description}</p>

                    {m.adminReview?.reviewedAt && (
                      <div className="pt-2 mt-2 border-t border-[#DCCBB5] flex items-center gap-2 text-[11px] text-[#3D5A2B] font-bold">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#4A6B3A] shrink-0" />
                        <span>
                          Verified by Compliance on {new Date(m.adminReview.reviewedAt).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MilestoneTimeline;
