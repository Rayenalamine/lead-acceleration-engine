import {
  BadgeCheck,
  Ban,
  Building2,
  Calendar,
  CheckCircle2,
  ExternalLink,
  FileText,
  Mail,
  Send,
  Sparkles,
  User,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import type { LeadDetail } from '../types/lead';

interface ResultCardProps {
  lead: LeadDetail;
}

export function ResultCard({ lead }: ResultCardProps) {
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const qualified = lead.status === 'QUALIFIED';
  const failed = lead.status === 'FAILED';

  const tone = qualified
    ? {
        border: 'border-signal/50',
        bg: 'bg-signal/10',
        icon: <BadgeCheck className="h-7 w-7 text-signal" />,
        title: 'Lead Qualified — High Priority',
        subtitle: 'B2B intent & budget verified by AI. Immediate executive calendar booking active.',
        badge: 'QUALIFIED',
        badgeClass: 'bg-signal/20 text-signal-glow',
      }
    : failed
      ? {
          border: 'border-amber-400/40',
          bg: 'bg-amber-400/10',
          icon: <XCircle className="h-7 w-7 text-amber-300" />,
          title: 'Processing Failed',
          subtitle: 'The qualification pipeline could not complete. Retry or escalate.',
          badge: 'FAILED',
          badgeClass: 'bg-amber-400/20 text-amber-200',
        }
      : {
          border: 'border-rose-400/40',
          bg: 'bg-rose-500/10',
          icon: <Ban className="h-7 w-7 text-rose-300" />,
          title: 'Lead Disqualified',
          subtitle: 'Below qualification threshold. Self-serve starter package sequence assigned.',
          badge: 'DISQUALIFIED',
          badgeClass: 'bg-rose-500/20 text-rose-200',
        };

  const score = lead.qualificationScore;

  return (
    <article className={`panel overflow-hidden border ${tone.border} shadow-2xl`}>
      {/* Header Banner */}
      <div className={`flex items-start gap-4 border-b border-slate-700/50 px-6 py-5 ${tone.bg}`}>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-ink-950/40">
          {tone.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-xl font-semibold text-white">{tone.title}</h3>
            <span className={`rounded-md px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${tone.badgeClass}`}>
              {tone.badge}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-300">{tone.subtitle}</p>
        </div>
        {typeof score === 'number' ? (
          <div className="text-right">
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Score</p>
            <p className="font-display text-3xl font-semibold text-white">{score}</p>
          </div>
        ) : null}
      </div>

      {/* Prospect Details */}
      <div className="grid gap-4 px-6 py-5 sm:grid-cols-2">
        <Meta icon={<User className="h-4 w-4" />} label="Name" value={lead.fullName} />
        <Meta icon={<Mail className="h-4 w-4" />} label="Email" value={lead.email} />
        <Meta icon={<Building2 className="h-4 w-4" />} label="Company" value={lead.companyName} />
        <Meta
          icon={<BadgeCheck className="h-4 w-4" />}
          label="Budget"
          value={`$${lead.budgetUsd.toLocaleString()}`}
        />
      </div>

      {/* Dynamic Enterprise Post-Qualification Actions */}
      <div className="border-t border-slate-700/50 bg-slate-900/40 px-6 py-5">
        <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
          Automated Enterprise Actions & Integrations
        </p>

        {qualified ? (
          <div className="mt-3 space-y-3">
            {/* Direct Calendar Booking Action */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3.5">
              <div className="flex items-center gap-2.5">
                <Calendar className="h-5 w-5 text-emerald-400" />
                <div>
                  <p className="text-xs font-semibold text-emerald-200">
                    VIP Executive Calendar Booking Ready
                  </p>
                  <p className="text-[11px] text-emerald-400/80">
                    Direct 1-click slot picker for Calendly / Cal.com integration
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCalendarModal(true)}
                className="flex items-center gap-1.5 rounded-md bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-slate-950 transition-colors hover:bg-emerald-400"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {bookingConfirmed ? 'Meeting Booked ✓' : 'Book Discovery Call'}
              </button>
            </div>

            {/* Email Notification & CRM Badges */}
            <div className="grid gap-2 text-xs text-slate-300 sm:grid-cols-2">
              <div className="flex items-center gap-2 rounded-md border border-slate-700/60 bg-ink-950/40 px-3 py-2">
                <Send className="h-4 w-4 text-cyan-400" />
                <span>Email summary dispatched to <strong>{lead.email}</strong></span>
              </div>
              <div className="flex items-center gap-2 rounded-md border border-slate-700/60 bg-ink-950/40 px-3 py-2">
                <CheckCircle2 className="h-4 w-4 text-signal" />
                <span>HubSpot / Salesforce Deal Created</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-3 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-700/60 bg-slate-800/40 p-3.5">
              <div className="flex items-center gap-2.5">
                <FileText className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-xs font-semibold text-slate-200">
                    Self-Serve Starter Documentation Sequence
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Automated email nurture sent with self-assessment guides
                  </p>
                </div>
              </div>
              <a
                href="#starter-resources"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Disqualified lead redirected to automated self-service resources.');
                }}
                className="flex items-center gap-1.5 rounded-md border border-slate-600 bg-slate-700/50 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700"
              >
                <span>View Starter Guides</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Footer Metadata */}
      <div className="border-t border-slate-700/50 px-6 py-3.5 flex items-center justify-between text-[11px] text-slate-500">
        <span>Lead ID: <code className="font-mono text-slate-300">{lead.leadId}</code></span>
        <span>Processed via AI Engine</span>
      </div>

      {/* Interactive Calendar Embed Modal */}
      {showCalendarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <Calendar className="h-5 w-5" />
                <span>Schedule Executive Strategy Call</span>
              </div>
              <button
                type="button"
                onClick={() => setShowCalendarModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="my-4 space-y-3">
              <p className="text-xs text-slate-300">
                Selecting a 30-minute discovery slot for <strong>{lead.fullName}</strong> ({lead.companyName}):
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['Tomorrow at 10:00 AM', 'Tomorrow at 2:00 PM', 'Thursday at 11:30 AM', 'Thursday at 4:00 PM'].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => {
                      setBookingConfirmed(true);
                      setShowCalendarModal(false);
                      alert(`🎉 Calendar Booking Confirmed for ${lead.fullName} on ${slot}! Automated invite & Zoom link sent to ${lead.email}.`);
                    }}
                    className="rounded-md border border-slate-700 bg-slate-800/80 p-2.5 text-center text-slate-200 transition-colors hover:border-emerald-500 hover:bg-emerald-500/20 hover:text-emerald-300 font-medium"
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-800 pt-3 text-right">
              <button
                type="button"
                onClick={() => setShowCalendarModal(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

function Meta({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 text-slate-500">{icon}</span>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
        <p className="text-sm text-slate-200">{value}</p>
      </div>
    </div>
  );
}
