import { Activity, Cpu } from 'lucide-react';

export function Header() {
  return (
    <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-signal/30 bg-signal/10">
          <Cpu className="h-5 w-5 text-signal" strokeWidth={1.75} />
        </div>
        <div>
          <p className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Lead Acceleration Engine
          </p>
          <p className="font-mono text-xs text-slate-400">AI qualification · async ingest · CRM-ready</p>
        </div>
      </div>

      <div className="inline-flex items-center gap-2 self-start rounded-full border border-signal/25 bg-signal/10 px-3.5 py-1.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
          <span className="relative inline-flex h-2 w-2 animate-status-pulse rounded-full bg-signal" />
        </span>
        <Activity className="h-3.5 w-3.5 text-signal" />
        <span className="font-mono text-xs font-medium uppercase tracking-wider text-signal-glow">
          Engine Active
        </span>
      </div>
    </header>
  );
}
