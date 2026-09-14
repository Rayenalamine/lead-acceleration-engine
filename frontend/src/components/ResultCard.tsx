import { BadgeCheck, Ban, Building2, Mail, User, XCircle } from 'lucide-react';
import type { ReactNode } from 'react';
import type { LeadDetail } from '../types/lead';

interface ResultCardProps {
  lead: LeadDetail;
}

export function ResultCard({ lead }: ResultCardProps) {
  const qualified = lead.status === 'QUALIFIED';
  const failed = lead.status === 'FAILED';

  const tone = qualified
    ? {
        border: 'border-signal/50',
        bg: 'bg-signal/10',
        icon: <BadgeCheck className="h-7 w-7 text-signal" />,
        title: 'Lead Qualified',
        subtitle: 'High-fit opportunity — ready for CRM sync.',
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
          subtitle: 'Below qualification threshold for current intake criteria.',
          badge: 'DISQUALIFIED',
          badgeClass: 'bg-rose-500/20 text-rose-200',
        };

  const score = lead.qualificationScore;

  return (
    <article className={`panel overflow-hidden border ${tone.border}`}>
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

      <div className="border-t border-slate-700/50 px-6 py-4">
        <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Lead ID</p>
        <p className="mt-1 break-all font-mono text-xs text-slate-300">{lead.leadId}</p>
      </div>
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
