import { Loader2, Radio, ShieldAlert, ShieldCheck, ShieldX } from 'lucide-react';
import type { LeadDetail } from '../../types/lead';
import { ResultCard } from '../ResultCard';

interface StatusStepProps {
  isSubmitting: boolean;
  isPolling: boolean;
  lead: LeadDetail | null;
  error: string | null;
  onReset: () => void;
}

export function StatusStep({ isSubmitting, isPolling, lead, error, onReset }: StatusStepProps) {
  const showPulse = isSubmitting || isPolling;
  const terminal = lead && ['QUALIFIED', 'DISQUALIFIED', 'FAILED'].includes(lead.status);

  return (
    <div className="animate-fade-up space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold text-white">Qualification pulse</h2>
        <p className="mt-1 text-sm text-slate-400">
          Your lead is in the async pipeline. Status updates every 2 seconds.
        </p>
      </div>

      {showPulse && !terminal ? (
        <div className="panel relative overflow-hidden p-6">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-x-0 h-24 animate-scan-line bg-gradient-to-b from-transparent via-signal/10 to-transparent" />
          </div>

          <div className="relative flex flex-col items-center gap-4 py-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-signal/40 bg-signal/10">
              <Loader2 className="h-7 w-7 animate-spin text-signal" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-white">
                {isSubmitting ? 'Dispatching lead…' : 'Evaluating fit…'}
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-wider text-slate-400">
                {lead?.status ?? 'QUEUED'} · live poll
              </p>
            </div>
          </div>

          <div className="relative mt-2 grid gap-3 sm:grid-cols-3">
            <SkeletonBlock />
            <SkeletonBlock />
            <SkeletonBlock />
          </div>
        </div>
      ) : null}

      {error ? (
        <div className="flex items-start gap-3 rounded-xl border border-rose-500/40 bg-rose-500/10 p-4">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-rose-300" />
          <div>
            <p className="font-medium text-rose-100">Pipeline error</p>
            <p className="mt-1 text-sm text-rose-200/80">{error}</p>
          </div>
        </div>
      ) : null}

      {terminal && lead ? <ResultCard lead={lead} /> : null}

      {!showPulse && !terminal && !error ? (
        <div className="panel flex items-center gap-3 p-5 text-slate-300">
          <Radio className="h-5 w-5 text-signal" />
          <p className="text-sm">Waiting for engine response…</p>
        </div>
      ) : null}

      {(terminal || error) && (
        <div className="flex justify-end">
          <button type="button" className="btn-ghost" onClick={onReset}>
            Submit another lead
          </button>
        </div>
      )}

      {lead && !terminal ? (
        <p className="flex items-center gap-2 font-mono text-xs text-slate-500">
          {lead.status === 'PROCESSING' ? (
            <ShieldCheck className="h-3.5 w-3.5 text-signal" />
          ) : (
            <ShieldX className="h-3.5 w-3.5 text-slate-500" />
          )}
          Lead ID {lead.leadId}
        </p>
      ) : null}
    </div>
  );
}

function SkeletonBlock() {
  return <div className="skeleton h-16 w-full" />;
}
