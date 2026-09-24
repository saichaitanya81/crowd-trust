import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, Lock, ShieldCheck, FileText, ChevronRight, ExternalLink } from 'lucide-react';

export const MilestoneTimeline = ({ milestones = [] }) => {
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  if (!milestones || milestones.length === 0) {
    return (
      <div className="text-center p-6 text-slate-500 text-xs bg-slate-50 rounded-xl">
        No milestones defined for this campaign yet.
      </div>
    );
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100" />;
      case 'submitted':
        return <Clock className="w-5 h-5 text-amber-500 animate-pulse" />;
      case 'active':
        return <Circle className="w-5 h-5 text-brand-600 fill-brand-100" />;
      case 'locked':
      default:
        return <Lock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return <span className="badge bg-emerald-100 text-emerald-800">Verified Complete</span>;
      case 'submitted':
        return <span className="badge bg-amber-100 text-amber-800">Under Review</span>;
      case 'active':
        return <span className="badge bg-brand-100 text-brand-800">In Progress</span>;
      case 'locked':
      default:
        return <span className="badge bg-slate-100 text-slate-600">Locked</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-8">
        {milestones.map((m, index) => {
          const isDone = m.status === 'completed' || m.status === 'approved';
          const isCurrent = m.status === 'active' || m.status === 'submitted';

          return (
            <div key={m._id || index} className="relative group">
              {/* Timeline Marker Icon */}
              <div
                className={`absolute -left-[35px] top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-white ${
                  isDone
                    ? 'border-emerald-500'
                    : isCurrent
                    ? 'border-brand-500 shadow-sm'
                    : 'border-slate-300'
                }`}
              >
                {getStatusIcon(m.status)}
              </div>

              {/* Milestone Details Card */}
              <div className="card-container p-5 transition-all duration-200 hover:border-brand-200">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Milestone {m.order || index + 1}
                    </span>
                    {getStatusBadge(m.status)}
                  </div>
                  <span className="text-sm font-extrabold text-slate-900 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                    ₹{Number(m.targetAmount).toLocaleString()}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 mb-1.5">{m.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">{m.description}</p>

                {/* Evidence & Verification Box */}
                {m.evidence?.description && (
                  <div className="mt-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                      <span className="flex items-center gap-1.5 text-brand-700">
                        <FileText className="w-3.5 h-3.5" />
                        Submitted Proof & Evidence
                      </span>
                      {m.evidence.fileUrl && (
                        <a
                          href={m.evidence.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-600 hover:text-brand-800 flex items-center gap-1 hover:underline text-[11px]"
                        >
                          View Document <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{m.evidence.description}</p>

                    {m.adminReview?.reviewedAt && (
                      <div className="pt-2 mt-2 border-t border-slate-200/60 flex items-center gap-2 text-[11px] text-emerald-700 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
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
