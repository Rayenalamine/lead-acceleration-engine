import {
  BadgeCheck,
  Calendar,
  Cpu,
  Mail,
  Play,
  RotateCcw,
  Smartphone,
  Sparkles,
  Table,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export function InteractiveShowcase() {
  const [demoState, setDemoState] = useState<'IDLE' | 'SCANNING' | 'IPHONE_NOTIF' | 'SHEET_SYNC' | 'COMPLETE'>('IDLE');
  const [leadName] = useState('Acme Global Systems');
  const [leadEmail] = useState('alex@acmeglobal.io');
  const [leadBudget] = useState(15000);
  const [leadScope] = useState('Enterprise AI lead qualification engine with automated CRM sync and calendar booking.');

  const runDemo = () => {
    setDemoState('SCANNING');
  };

  useEffect(() => {
    if (demoState === 'SCANNING') {
      const timer = setTimeout(() => {
        setDemoState('IPHONE_NOTIF');
      }, 900);
      return () => clearTimeout(timer);
    }
    if (demoState === 'IPHONE_NOTIF') {
      const timer = setTimeout(() => {
        setDemoState('SHEET_SYNC');
      }, 1200);
      return () => clearTimeout(timer);
    }
    if (demoState === 'SHEET_SYNC') {
      const timer = setTimeout(() => {
        setDemoState('COMPLETE');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [demoState]);

  return (
    <div className="space-y-6">
      {/* Demo Controls Bar */}
      <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-5 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/40">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-white">Interactive Client Showcase Simulation</h2>
              <p className="text-xs text-indigo-200/80">Simulate form submission, AI neural scanning, iPhone push notifications & Google Sheets sync in real-time.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {demoState !== 'IDLE' && (
              <button
                type="button"
                onClick={() => setDemoState('IDLE')}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset Demo
              </button>
            )}
            <button
              type="button"
              onClick={runDemo}
              disabled={demoState !== 'IDLE' && demoState !== 'COMPLETE'}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <Play className="h-4 w-4 fill-slate-950" />
              {demoState === 'IDLE' ? '▶ Launch Live Automation Showcase' : demoState === 'COMPLETE' ? '▶ Re-Run Live Showcase' : '⚡ Automating...'}
            </button>
          </div>
        </div>
      </div>

      {/* Grid: AI Neural Scanner & 3D iPhone Popup */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left: AI Neural Brain Scanner Simulation */}
        <div className="panel flex flex-col justify-between p-6 border-slate-700/60 bg-ink-950/60">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-indigo-400 uppercase">
                <Cpu className="h-4 w-4 text-cyan-400" />
                <span>AI Neural Scanner & Scoring Engine</span>
              </div>
              <span className="rounded bg-indigo-500/20 px-2 py-0.5 font-mono text-[10px] text-indigo-300">
                GPT-4o Sub-Second
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3.5 text-xs text-slate-300 space-y-1">
                <div className="flex justify-between text-slate-400 font-mono text-[10px]">
                  <span>Lead Subject</span>
                  <span>Budget: ${leadBudget.toLocaleString()}</span>
                </div>
                <p className="font-semibold text-white">{leadName}</p>
                <p className="text-slate-400 truncate">{leadScope}</p>
              </div>

              {/* Neural Scanning Animation State */}
              {demoState === 'IDLE' && (
                <div className="rounded-lg border border-dashed border-slate-800 p-8 text-center text-xs text-slate-500">
                  Click <strong>▶ Launch Live Automation Showcase</strong> above to trigger AI qualification scanning.
                </div>
              )}

              {demoState === 'SCANNING' && (
                <div className="space-y-3 rounded-lg border border-indigo-500/40 bg-indigo-500/10 p-4">
                  <div className="flex items-center justify-between text-xs text-indigo-300 font-mono">
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 animate-spin text-cyan-400" />
                      Analyzing B2B Scope & Budget Intent...
                    </span>
                    <span>Scanning...</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full w-3/4 animate-pulse bg-gradient-to-r from-indigo-500 to-cyan-400" />
                  </div>
                </div>
              )}

              {(demoState === 'IPHONE_NOTIF' || demoState === 'SHEET_SYNC' || demoState === 'COMPLETE') && (
                <div className="rounded-lg border border-emerald-500/50 bg-emerald-500/10 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
                      <BadgeCheck className="h-5 w-5 text-emerald-400" />
                      <span>QUALIFIED (Score: 92/100)</span>
                    </div>
                    <span className="font-mono text-[10px] uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
                      Passed & Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    AI Intent Match: <strong>High B2B Enterprise Fit</strong>. Budget meets $5k threshold.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: 3D iPhone Popup Screen Simulation */}
        <div className="panel flex flex-col justify-between p-6 border-slate-700/60 bg-ink-950/60">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-pink-400 uppercase">
              <Smartphone className="h-4 w-4 text-pink-400" />
              <span>3D Smartphone Notification Center</span>
            </div>
            <span className="rounded bg-pink-500/20 px-2 py-0.5 font-mono text-[10px] text-pink-300">
              iOS Push Alerts
            </span>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center min-h-[220px]">
            {demoState === 'IDLE' || demoState === 'SCANNING' ? (
              <div className="text-center text-xs text-slate-500 space-y-2">
                <Smartphone className="h-10 w-10 mx-auto text-slate-700 animate-bounce" />
                <p>Waiting for AI qualification outcome to trigger mobile push notifications...</p>
              </div>
            ) : (
              <div className="w-full space-y-3 transition-all duration-500 transform scale-100 animate-in fade-in slide-in-from-bottom-4">
                {/* Notification 1: Executive Calendar Meeting */}
                <div className="rounded-xl border border-slate-700/70 bg-slate-900/90 p-3.5 shadow-2xl backdrop-blur-xl space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <Calendar className="h-3.5 w-3.5" />
                      CALENDAR AUTO-BOOKED
                    </span>
                    <span>now</span>
                  </div>
                  <p className="text-xs font-bold text-white">Discovery Call: {leadName}</p>
                  <p className="text-[11px] text-slate-300">
                    Scheduled for Tomorrow at 10:00 AM (Budget: ${leadBudget.toLocaleString()})
                  </p>
                </div>

                {/* Notification 2: VIP Auto-Responder Email */}
                <div className="rounded-xl border border-slate-700/70 bg-slate-900/90 p-3.5 shadow-2xl backdrop-blur-xl space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                      <Mail className="h-3.5 w-3.5" />
                      EMAIL DISPATCHED
                    </span>
                    <span>now</span>
                  </div>
                  <p className="text-xs font-bold text-white">VIP Executive AI Summary</p>
                  <p className="text-[11px] text-slate-300">
                    Sent to <strong>{leadEmail}</strong> with calendar confirmation & AI scope notes.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom View: Live Google Sheets / CRM Sync Real-Time Table */}
      <div className="panel p-6 border-slate-700/60 bg-ink-950/60">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald-400 uppercase">
            <Table className="h-4 w-4 text-emerald-400" />
            <span>Live Google Sheets & CRM Real-Time Sync</span>
          </div>
          <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
            HubSpot / Google Sheet Row Output
          </span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 font-mono text-[10px] uppercase text-slate-500">
                <th className="pb-2">Timestamp</th>
                <th className="pb-2">Company Lead</th>
                <th className="pb-2">Email</th>
                <th className="pb-2">Budget</th>
                <th className="pb-2">AI Score</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Calendar Booking</th>
                <th className="pb-2">VIP Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
              {demoState === 'SHEET_SYNC' || demoState === 'COMPLETE' ? (
                <tr className="bg-emerald-500/10 text-white font-medium animate-in fade-in slide-in-from-left-4">
                  <td className="py-3 text-slate-400">10:00:01 AM</td>
                  <td className="py-3 font-semibold text-emerald-300">{leadName}</td>
                  <td className="py-3 text-slate-300">{leadEmail}</td>
                  <td className="py-3 font-bold text-white">${leadBudget.toLocaleString()}</td>
                  <td className="py-3 font-bold text-emerald-400">92 / 100</td>
                  <td className="py-3">
                    <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                      QUALIFIED ✓
                    </span>
                  </td>
                  <td className="py-3 text-emerald-300">Tomorrow 10:00 AM ✓</td>
                  <td className="py-3 text-cyan-300">Dispatched ✓</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-slate-600 font-sans">
                    No lead entries synced yet. Click <strong>▶ Launch Live Automation Showcase</strong> to simulate live Google Sheets & CRM sync.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
