import {
  BadgeCheck,
  Calendar,
  Cpu,
  Mail,
  Play,
  RotateCcw,
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

      {/* Grid: AI Neural Scanner & Real-Looking 3D iPhone Pro */}
      <div className="grid gap-6 md:grid-cols-2 items-start">
        {/* Left: AI Neural Brain Scanner Simulation */}
        <div className="panel flex flex-col justify-between p-6 border-slate-700/60 bg-ink-950/60 min-h-[520px]">
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

            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-xs text-slate-300 space-y-1.5 shadow-inner">
                <div className="flex justify-between text-slate-400 font-mono text-[10px]">
                  <span>Lead Subject</span>
                  <span className="font-semibold text-emerald-400">Budget: ${leadBudget.toLocaleString()}</span>
                </div>
                <p className="font-semibold text-white text-sm">{leadName}</p>
                <p className="text-slate-400 leading-relaxed">{leadScope}</p>
              </div>

              {/* Neural Scanning Animation State */}
              {demoState === 'IDLE' && (
                <div className="rounded-xl border border-dashed border-slate-800 p-12 text-center text-xs text-slate-500 space-y-2">
                  <Cpu className="h-8 w-8 mx-auto text-slate-700 animate-pulse" />
                  <p>Click <strong>▶ Launch Live Automation Showcase</strong> above to trigger AI qualification scanning.</p>
                </div>
              )}

              {demoState === 'SCANNING' && (
                <div className="space-y-4 rounded-xl border border-indigo-500/40 bg-indigo-500/10 p-5 backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs text-indigo-300 font-mono">
                    <span className="flex items-center gap-2 font-semibold">
                      <Sparkles className="h-4 w-4 animate-spin text-cyan-400" />
                      Analyzing B2B Scope & Budget Intent...
                    </span>
                    <span>Scanning...</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full w-4/5 animate-pulse bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400" />
                  </div>
                </div>
              )}

              {(demoState === 'IPHONE_NOTIF' || demoState === 'SHEET_SYNC' || demoState === 'COMPLETE') && (
                <div className="rounded-xl border border-emerald-500/50 bg-emerald-500/10 p-5 space-y-2.5 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-300 font-semibold text-base">
                      <BadgeCheck className="h-6 w-6 text-emerald-400" />
                      <span>QUALIFIED (Score: 92/100)</span>
                    </div>
                    <span className="font-mono text-[10px] uppercase bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-md font-bold">
                      Passed & Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    AI Intent Match: <strong>High B2B Enterprise Fit</strong>. Budget meets $5,000 threshold. Executive calendar booking triggered.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Hyper-Realistic CSS iPhone 15 Pro Device Frame */}
        <div className="panel flex flex-col items-center justify-center p-6 border-slate-700/60 bg-ink-950/60 min-h-[520px]">
          {/* Authentic iPhone 15 Pro Mockup */}
          <div className="relative w-[280px] h-[480px] rounded-[44px] bg-slate-950 border-[9px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-between p-3 select-none">
            {/* Glossy Reflective Glass Edge */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-30" />

            {/* Top Status Bar & Dynamic Island */}
            <div className="relative z-20 flex items-center justify-between px-3 pt-1 text-[11px] font-semibold text-white">
              <span>9:41</span>
              {/* Dynamic Island */}
              <div className="h-4 w-20 rounded-full bg-black border border-white/10 flex items-center justify-end px-1.5 shadow-inner">
                <span className="h-2 w-2 rounded-full bg-indigo-950 border border-indigo-500/50" />
              </div>
              <div className="flex items-center gap-1 text-[10px]">
                <span>5G</span>
                <span className="h-2.5 w-4 rounded-sm border border-white bg-white/90" />
              </div>
            </div>

            {/* iOS Lock Screen Content */}
            <div className="relative z-20 flex-1 flex flex-col justify-between pt-4 pb-2 px-1">
              {/* iOS Lock Screen Time & Date */}
              <div className="text-center space-y-0.5">
                <p className="text-[10px] font-medium text-slate-300 uppercase tracking-widest">Monday, September 14</p>
                <p className="text-4xl font-extralight text-white tracking-tight font-display">9:41</p>
              </div>

              {/* iOS Lock Screen Push Notification Center */}
              <div className="space-y-2.5 my-auto">
                {demoState === 'IDLE' || demoState === 'SCANNING' ? (
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center backdrop-blur-md">
                    <p className="text-[11px] text-slate-400">No New Notifications</p>
                    <p className="text-[9px] text-slate-500 mt-1">Waiting for AI lead qualification...</p>
                  </div>
                ) : (
                  <div className="space-y-2 animate-in fade-in slide-in-from-bottom-5 duration-500">
                    {/* iOS Notification 1: Calendar Appointment */}
                    <div className="rounded-2xl bg-slate-900/80 border border-white/15 p-3 shadow-2xl backdrop-blur-xl space-y-1 transform transition-all">
                      <div className="flex items-center justify-between text-[10px]">
                        <div className="flex items-center gap-1.5 font-medium text-slate-300">
                          <div className="h-4 w-4 rounded-md bg-rose-500 flex items-center justify-center text-white font-bold text-[9px] shadow-sm">
                            <Calendar className="h-2.5 w-2.5" />
                          </div>
                          <span>CALENDAR</span>
                        </div>
                        <span className="text-[9px] text-slate-400">now</span>
                      </div>
                      <p className="text-xs font-bold text-white leading-tight">Meeting Booked: Discovery Call</p>
                      <p className="text-[10px] text-slate-300 leading-snug">
                        {leadName} (${leadBudget.toLocaleString()}) — Tomorrow at 10:00 AM
                      </p>
                    </div>

                    {/* iOS Notification 2: Executive Mail Summary */}
                    <div className="rounded-2xl bg-slate-900/80 border border-white/15 p-3 shadow-2xl backdrop-blur-xl space-y-1 transform transition-all">
                      <div className="flex items-center justify-between text-[10px]">
                        <div className="flex items-center gap-1.5 font-medium text-slate-300">
                          <div className="h-4 w-4 rounded-md bg-blue-500 flex items-center justify-center text-white font-bold text-[9px] shadow-sm">
                            <Mail className="h-2.5 w-2.5" />
                          </div>
                          <span>MAIL</span>
                        </div>
                        <span className="text-[9px] text-slate-400">now</span>
                      </div>
                      <p className="text-xs font-bold text-white leading-tight">VIP Executive AI Summary</p>
                      <p className="text-[10px] text-slate-300 leading-snug">
                        Dispatched to <strong>{leadEmail}</strong> with scope analysis & booking link.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* iOS Home Indicator Bar */}
            <div className="relative z-20 h-1 w-24 rounded-full bg-white/40 mx-auto mb-1" />
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
