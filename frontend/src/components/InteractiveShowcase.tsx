import {
  BadgeCheck,
  Calendar,
  Cpu,
  Mail,
  Play,
  RotateCcw,
  Sparkles,
  Table,
  User,
  Lock,
  Wifi,
  Battery
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

export function InteractiveShowcase() {
  const [demoState, setDemoState] = useState<'IDLE' | 'TYPING' | 'SCANNING' | 'IPHONE_NOTIF' | 'SHEET_SYNC' | 'COMPLETE'>('IDLE');
  
  // Dynamic Scoring State
  const [dynamicScore, setDynamicScore] = useState(98);
  const [dynamicAction, setDynamicAction] = useState('Meeting Booked & Email Sent');
  const [dynamicAnalysis, setDynamicAnalysis] = useState('Perfect ICP match. Budget exceeds minimum thresholds. Semantic intent indicates strong enterprise buying readiness.');

  const calculateDynamicScore = (budgetStr: string, scopeStr: string) => {
    const budget = parseInt(budgetStr) || 0;
    const scope = scopeStr.toLowerCase();
    
    let score = 50;
    if (budget >= 10000) score += 30;
    else if (budget >= 5000) score += 15;
    else score -= 20;

    if (scope.includes('ai') || scope.includes('automation') || scope.includes('enterprise')) {
      score += 15;
    }
    if (scope.length > 30) score += 5;
    
    score = Math.min(Math.max(score, 12), 98);
    setDynamicScore(score);

    if (score >= 80) {
      setDynamicAction('Meeting Booked & Email Sent');
      setDynamicAnalysis('Perfect ICP match. Budget exceeds minimum thresholds. Semantic intent indicates strong enterprise buying readiness.');
    } else if (score >= 50) {
      setDynamicAction('Added to Nurture Sequence');
      setDynamicAnalysis('Moderate ICP match. Budget is within acceptable range. Added to mid-tier email nurture sequence for further qualification.');
    } else {
      setDynamicAction('Sent Self-Serve Guide');
      setDynamicAnalysis('Low ICP match. Budget below enterprise threshold. Sent automated self-serve starter guide and redirected to standard funnel.');
    }
  };

  const getTheme = () => {
    if (dynamicScore >= 80) return {
      border: 'border-emerald-500/50', bg: 'bg-emerald-950/40', text: 'text-emerald-300', 
      iconBg: 'bg-emerald-500/20', iconText: 'text-emerald-400', badgeBg: 'bg-emerald-500', badgeText: 'text-emerald-950',
      shadow: 'rgba(16,185,129,0.3)', title: 'HIGH-VALUE LEAD', sheetRow: 'bg-emerald-100/50', sheetText: 'text-emerald-800'
    };
    if (dynamicScore >= 50) return {
      border: 'border-amber-500/50', bg: 'bg-amber-950/40', text: 'text-amber-300', 
      iconBg: 'bg-amber-500/20', iconText: 'text-amber-400', badgeBg: 'bg-amber-500', badgeText: 'text-amber-950',
      shadow: 'rgba(245,158,11,0.3)', title: 'MID-TIER LEAD', sheetRow: 'bg-amber-100/50', sheetText: 'text-amber-800'
    };
    return {
      border: 'border-rose-500/50', bg: 'bg-rose-950/40', text: 'text-rose-300', 
      iconBg: 'bg-rose-500/20', iconText: 'text-rose-400', badgeBg: 'bg-rose-500', badgeText: 'text-rose-950',
      shadow: 'rgba(225,29,72,0.3)', title: 'LOW-TIER LEAD', sheetRow: 'bg-rose-100/50', sheetText: 'text-rose-800'
    };
  };

  const theme = getTheme();
  
  const fullLeadName = 'Acme Global Systems';
  const fullLeadEmail = 'alex@acmeglobal.io';
  const fullLeadBudget = '15000';
  const fullLeadScope = 'Enterprise AI lead qualification engine with automated CRM sync and calendar booking.';

  const [typedName, setTypedName] = useState('');
  const [typedEmail, setTypedEmail] = useState('');
  const [typedBudget, setTypedBudget] = useState('');
  const [typedScope, setTypedScope] = useState('');

  const sheetsRef = useRef<HTMLDivElement>(null);
  const topSectionRef = useRef<HTMLDivElement>(null);

  const runDemo = () => {
    setDemoState('TYPING');
    setTypedName('');
    setTypedEmail('');
    setTypedBudget('');
    setTypedScope('');
  };

  // Smooth scroll to Sheets view when it activates
  useEffect(() => {
    if (demoState === 'TYPING' && topSectionRef.current) {
      topSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (demoState === 'SHEET_SYNC' && sheetsRef.current) {
      sheetsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [demoState]);

  useEffect(() => {
    let isCancelled = false;
    if (demoState === 'TYPING') {
      const typeText = async () => {
        const typeDelay = 15; 
        
        for (let i = 1; i <= fullLeadName.length; i++) {
          if (isCancelled) return;
          setTypedName(fullLeadName.substring(0, i));
          await new Promise(r => setTimeout(r, typeDelay));
        }
        for (let i = 1; i <= fullLeadEmail.length; i++) {
          if (isCancelled) return;
          setTypedEmail(fullLeadEmail.substring(0, i));
          await new Promise(r => setTimeout(r, typeDelay));
        }
        for (let i = 1; i <= fullLeadBudget.length; i++) {
          if (isCancelled) return;
          setTypedBudget(fullLeadBudget.substring(0, i));
          await new Promise(r => setTimeout(r, typeDelay));
        }
        for (let i = 1; i <= fullLeadScope.length; i++) {
          if (isCancelled) return;
          setTypedScope(fullLeadScope.substring(0, i));
          await new Promise(r => setTimeout(r, typeDelay));
        }
        
        if (!isCancelled) {
          setTimeout(() => setDemoState('SCANNING'), 400);
        }
      };
      typeText();
    }
    return () => { isCancelled = true; };
  }, [demoState]);

  useEffect(() => {
    if (demoState === 'SCANNING') {
      calculateDynamicScore(typedBudget || fullLeadBudget, typedScope || fullLeadScope);
      const timer = setTimeout(() => {
        setDemoState('IPHONE_NOTIF');
      }, 1200);
      return () => clearTimeout(timer);
    }
    if (demoState === 'IPHONE_NOTIF') {
      const timer = setTimeout(() => {
        setDemoState('SHEET_SYNC');
      }, 2500); // give time to read notifications
      return () => clearTimeout(timer);
    }
    if (demoState === 'SHEET_SYNC') {
      const timer = setTimeout(() => {
        setDemoState('COMPLETE');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [demoState]);

  return (
    <div className="space-y-8 pb-24">
      {/* Compact Demo Controls Bar */}
      <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/40 p-3.5 backdrop-blur-md shadow-lg mb-4 max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-inner">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-white tracking-tight">Enterprise AI Showcase</h2>
              <p className="text-xs text-indigo-200/80 hidden md:block">Hyper-realistic simulation of end-to-end lead qualification & automation.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {demoState !== 'IDLE' && (
              <button
                type="button"
                onClick={() => setDemoState('IDLE')}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-all backdrop-blur-md"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
            )}
            <button
              type="button"
              onClick={runDemo}
              disabled={demoState !== 'IDLE' && demoState !== 'COMPLETE'}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-5 py-2.5 text-xs font-bold text-white shadow-[0_0_20px_-5px_rgba(168,85,247,0.5)] transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
            >
              <Play className="h-3.5 w-3.5 fill-white" />
              {demoState === 'IDLE' ? 'LAUNCH SIMULATION' : demoState === 'COMPLETE' ? 'RE-RUN SIMULATION' : 'AUTOMATING...'}
            </button>
          </div>
        </div>
      </div>

      {/* Grid: AI Neural Scanner & Real-Looking iOS iPhone 15 Pro */}
      <div ref={topSectionRef} className="grid gap-12 lg:grid-cols-2 items-center max-w-6xl mx-auto">
        
        {/* Left: Dynamic Panel (Form Input -> AI Scanner) */}
        <div className="relative rounded-[2rem] border border-slate-700/50 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl min-h-[600px] flex flex-col justify-center overflow-hidden group">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative z-10 w-full max-w-md mx-auto">
            <div className="flex items-center justify-between border-b border-slate-700/50 pb-5 mb-8">
              <div className="flex items-center gap-3 font-display text-lg font-bold text-white">
                {demoState === 'IDLE' || demoState === 'TYPING' ? (
                  <>
                    <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                      <User className="h-5 w-5" />
                    </div>
                    <span>Client Lead Capture</span>
                  </>
                ) : (
                  <>
                    <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                      <Cpu className="h-5 w-5" />
                    </div>
                    <span>AI Neural Core Processing</span>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {demoState === 'IDLE' || demoState === 'TYPING' ? (
                // Form Simulation
                <div className="space-y-5 animate-in fade-in duration-700">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Company Name</label>
                    <input
                      type="text"
                      value={typedName}
                      onChange={(e) => setTypedName(e.target.value)}
                      readOnly={demoState !== 'IDLE'}
                      placeholder="e.g. Acme Global Systems"
                      className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-white font-medium h-12 shadow-inner ring-1 ring-white/5 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Work Email</label>
                    <input
                      type="email"
                      value={typedEmail}
                      onChange={(e) => setTypedEmail(e.target.value)}
                      readOnly={demoState !== 'IDLE'}
                      placeholder="e.g. alex@acmeglobal.io"
                      className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-white font-medium h-12 shadow-inner ring-1 ring-white/5 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Available Budget ($)</label>
                    <input
                      type="number"
                      value={typedBudget}
                      onChange={(e) => setTypedBudget(e.target.value)}
                      readOnly={demoState !== 'IDLE'}
                      placeholder="e.g. 15000"
                      className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-white font-medium h-12 shadow-inner ring-1 ring-white/5 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Project Needs</label>
                    <textarea
                      value={typedScope}
                      onChange={(e) => setTypedScope(e.target.value)}
                      readOnly={demoState !== 'IDLE'}
                      placeholder="Describe the enterprise integration required..."
                      className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-sm text-slate-300 font-medium min-h-[80px] shadow-inner ring-1 ring-white/5 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-600 resize-none"
                    />
                  </div>
                  <button 
                    onClick={() => {
                      if (demoState === 'IDLE') {
                        if (!typedName) setTypedName(fullLeadName);
                        if (!typedEmail) setTypedEmail(fullLeadEmail);
                        if (!typedBudget) setTypedBudget(fullLeadBudget);
                        if (!typedScope) setTypedScope(fullLeadScope);
                        setDemoState('SCANNING');
                      }
                    }}
                    disabled={demoState !== 'IDLE'}
                    className="w-full mt-4 py-4 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 hover:bg-blue-500 active:scale-[0.98] disabled:opacity-80 disabled:active:scale-100"
                  >
                    {demoState === 'TYPING' ? (
                      <><Sparkles className="h-5 w-5 animate-spin"/> Auto-Typing Simulation...</>
                    ) : (
                      'Submit Lead Inquiry'
                    )}
                  </button>
                </div>
              ) : (
                // AI Scanning View
                <div className="animate-in slide-in-from-bottom-8 fade-in duration-700 space-y-6">
                  <div className="rounded-2xl border border-indigo-500/20 bg-indigo-950/30 p-6 space-y-3 shadow-inner">
                    <div className="flex justify-between text-indigo-300 font-mono text-xs font-semibold">
                      <span>INCOMING LEAD PAYLOAD</span>
                      <span className="text-emerald-400 flex items-center gap-1"><BadgeCheck className="h-3 w-3"/> Verified</span>
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg">{typedName || fullLeadName}</p>
                      <p className="text-indigo-200 text-sm">{typedEmail || fullLeadEmail}</p>
                    </div>
                    <div className="pt-2 border-t border-indigo-500/20">
                      <p className="text-slate-300 text-sm leading-relaxed">{typedScope || fullLeadScope}</p>
                      <p className="mt-3 font-semibold text-emerald-400">Declared Budget: ${parseInt(typedBudget || fullLeadBudget).toLocaleString()}</p>
                    </div>
                  </div>

                  {demoState === 'SCANNING' && (
                    <div className="space-y-4 rounded-2xl border border-indigo-500/50 bg-indigo-600/20 p-6 backdrop-blur-md shadow-[0_0_30px_-5px_rgba(99,102,241,0.4)]">
                      <div className="flex items-center justify-between text-sm text-indigo-100 font-semibold">
                        <span className="flex items-center gap-3">
                          <Cpu className="h-5 w-5 animate-pulse text-indigo-300" />
                          Running NLP Qualification Engine...
                        </span>
                        <span className="font-mono">78%</span>
                      </div>
                      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-900/80 shadow-inner">
                        <div className="h-full w-full animate-[progress_1.2s_ease-in-out_infinite] bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 rounded-full origin-left scale-x-0" style={{ animationName: 'progress-bar' }} />
                      </div>
                      <style>{`
                        @keyframes progress-bar {
                          0% { transform: scaleX(0); transform-origin: left; }
                          50% { transform: scaleX(1); transform-origin: left; }
                          51% { transform: scaleX(1); transform-origin: right; }
                          100% { transform: scaleX(0); transform-origin: right; }
                        }
                      `}</style>
                    </div>
                  )}

                  {(demoState === 'IPHONE_NOTIF' || demoState === 'SHEET_SYNC' || demoState === 'COMPLETE') && (
                    <div className={`rounded-2xl border ${theme.border} ${theme.bg} p-6 space-y-4 animate-in zoom-in-95 duration-500`} style={{ boxShadow: `0 0 40px -10px ${theme.shadow}` }}>
                      <div className="flex items-center justify-between">
                        <div className={`flex items-center gap-3 ${theme.text} font-bold text-xl`}>
                          <div className={`${theme.iconBg} p-2 rounded-full`}>
                            <BadgeCheck className={`h-6 w-6 ${theme.iconText}`} />
                          </div>
                          <span>{theme.title}</span>
                        </div>
                        <span className={`font-mono text-xs uppercase ${theme.badgeBg} ${theme.badgeText} px-3 py-1 rounded-md font-black`}>
                          Score: {dynamicScore}/100
                        </span>
                      </div>
                      <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                        <p className={`text-sm text-white/90 leading-relaxed`}>
                          <strong>AI Analysis:</strong> {dynamicAnalysis}
                          <br/><br/>
                          <span className={`${theme.iconText} font-semibold flex items-center gap-2`}>
                            <Sparkles className="w-4 h-4" /> Triggering Automated Workflows...
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Hyper-Realistic iOS Lock Screen Mockup */}
        <div className="flex justify-center items-center perspective-1000">
          <div 
            className={`relative w-[320px] h-[650px] rounded-[55px] bg-black border-[14px] border-slate-900 overflow-hidden flex flex-col select-none ring-1 ring-slate-800 shadow-[0_0_80px_rgba(0,0,0,0.8)] transition-all duration-1000 transform ${demoState === 'IPHONE_NOTIF' || demoState === 'SHEET_SYNC' || demoState === 'COMPLETE' ? 'scale-105 rotate-y-[-5deg] rotate-x-[2deg] shadow-[0_40px_100px_rgba(99,102,241,0.4)]' : 'scale-95 opacity-90'}`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* iOS 17 Wallpaper Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 opacity-90 mix-blend-screen transition-all duration-1000" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent mix-blend-overlay"></div>
            
            {/* Screen Dimming before notification */}
            <div className={`absolute inset-0 bg-black transition-opacity duration-1000 z-10 ${demoState === 'IDLE' || demoState === 'TYPING' || demoState === 'SCANNING' ? 'opacity-40' : 'opacity-0'}`} />
            
            {/* Glossy Screen Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-50" />

            {/* Dynamic Island & Status Bar */}
            <div className="relative z-40 pt-3 px-6 flex justify-between items-center text-white font-medium text-[14px]">
              <span className="tracking-tight font-semibold">9:41</span>
              {/* Dynamic Island */}
              <div className={`absolute left-1/2 -translate-x-1/2 top-2 h-[30px] rounded-full bg-black flex items-center px-3 shadow-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${demoState === 'IPHONE_NOTIF' ? 'w-[140px] justify-between' : 'w-[90px] justify-between'}`}>
                 <div className="flex items-center gap-2">
                   <div className={`h-2.5 w-2.5 rounded-full bg-emerald-500 transition-all duration-500 ${demoState === 'IPHONE_NOTIF' || demoState === 'SHEET_SYNC' ? 'animate-pulse' : ''}`}></div>
                   {demoState === 'IPHONE_NOTIF' && (
                     <span className="text-[10px] text-emerald-400 font-bold whitespace-nowrap animate-in fade-in zoom-in duration-300">Automating...</span>
                   )}
                 </div>
                 {demoState !== 'IPHONE_NOTIF' && <div className="w-10 h-1.5 rounded-full bg-slate-800"></div>}
              </div>
              <div className="flex items-center gap-1.5">
                <Wifi className="w-4 h-4"/>
                <Battery className="w-5 h-5"/>
              </div>
            </div>

            {/* Lock Screen Clock */}
            <div className="relative z-20 mt-16 flex flex-col items-center select-none">
              <div className="text-white/90 font-semibold text-lg tracking-wide drop-shadow-md">Monday, September 14</div>
              <div className="text-white font-bold text-[84px] leading-none tracking-tighter drop-shadow-lg" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>9:41</div>
            </div>

            {/* iOS Notifications Stack (Bottom-Up) */}
            <div className="relative z-30 flex-1 flex flex-col justify-end p-4 pb-12 gap-2.5">
              {(demoState === 'IPHONE_NOTIF' || demoState === 'SHEET_SYNC' || demoState === 'COMPLETE') && (
                <>
                  {/* Notification 1: Primary Action */}
                  <div className="bg-white/80 backdrop-blur-2xl rounded-[24px] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex flex-col gap-2 animate-in slide-in-from-bottom-12 fade-in duration-500 ease-out border border-white/40">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-2">
                         <div className="bg-white rounded-[8px] p-1 shadow-sm">
                           <Calendar className={`w-4 h-4 ${dynamicScore >= 80 ? 'text-rose-500' : dynamicScore >= 50 ? 'text-amber-500' : 'text-slate-500'}`}/>
                         </div>
                         <span className="text-[13px] font-bold text-slate-800 tracking-wide uppercase opacity-80">{dynamicScore >= 80 ? 'Calendar' : 'CRM Update'}</span>
                      </div>
                      <span className="text-[12px] text-slate-500 font-semibold">now</span>
                    </div>
                    <div className="text-slate-900 font-bold text-[15px] leading-tight">
                      {dynamicScore >= 80 ? 'Meeting Booked: Discovery Call' : dynamicScore >= 50 ? 'Lead Added to CRM' : 'Lead Disqualified'}
                    </div>
                    <div className="text-slate-700 text-[14px] leading-snug">
                      {typedName || fullLeadName} (${parseInt(typedBudget || fullLeadBudget).toLocaleString()}) 
                      {dynamicScore >= 80 ? ' scheduled for tomorrow at 10:00 AM.' : dynamicScore >= 50 ? ' tagged for mid-tier email nurture.' : ' rejected due to low budget/fit.'}
                    </div>
                  </div>

                  {/* Notification 2: Secondary Action */}
                  <div className="bg-white/80 backdrop-blur-2xl rounded-[24px] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex flex-col gap-2 animate-in slide-in-from-bottom-12 fade-in duration-500 delay-200 ease-out border border-white/40">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-2">
                         <div className="bg-blue-500 rounded-[8px] p-1 shadow-sm">
                           <Mail className="w-4 h-4 text-white"/>
                         </div>
                         <span className="text-[13px] font-bold text-slate-800 tracking-wide uppercase opacity-80">Mail</span>
                      </div>
                      <span className="text-[12px] text-slate-500 font-semibold">now</span>
                    </div>
                    <div className="text-slate-900 font-bold text-[15px] leading-tight">
                      {dynamicScore >= 80 ? 'VIP Exec Summary Dispatched' : dynamicScore >= 50 ? 'Nurture Campaign Started' : 'Self-Serve Guide Sent'}
                    </div>
                    <div className="text-slate-700 text-[14px] leading-snug">
                      {dynamicScore >= 80 ? 'Qualification brief successfully delivered to ' : 'Automated response dispatched to '}
                      <strong>{typedEmail || fullLeadEmail}</strong>.
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* iOS Home Indicator */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-[120px] h-1.5 bg-white/80 rounded-full z-40 shadow-sm"></div>
          </div>
        </div>
      </div>

      {/* Bottom View: PC Browser Google Sheets Mockup */}
      <div 
        ref={sheetsRef}
        className={`w-full max-w-6xl mx-auto rounded-xl border border-slate-700 bg-white shadow-2xl overflow-hidden transition-all duration-1000 origin-top transform ${demoState === 'SHEET_SYNC' || demoState === 'COMPLETE' ? 'scale-100 opacity-100 shadow-[0_30px_100px_rgba(16,185,129,0.3)] translate-y-0' : 'scale-95 opacity-50 translate-y-10 blur-[2px] pointer-events-none'}`}
      >
        {/* MacOS Browser Header */}
        <div className="bg-slate-200 border-b border-slate-300 px-4 py-2 flex items-center gap-4">
           {/* MacOS Buttons */}
           <div className="flex gap-2">
             <div className="w-3 h-3 rounded-full bg-red-400 shadow-inner"></div>
             <div className="w-3 h-3 rounded-full bg-amber-400 shadow-inner"></div>
             <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-inner"></div>
           </div>
           {/* Address Bar */}
           <div className="flex-1 bg-white rounded-md px-4 py-1.5 text-xs text-slate-500 shadow-sm flex items-center justify-center gap-2 border border-slate-200/60 max-w-2xl mx-auto">
             <Lock className="w-3 h-3 text-slate-400"/> 
             <span className="text-slate-800">docs.google.com/spreadsheets/d/1aB2c...</span>
           </div>
           <div className="w-16"></div> {/* Spacer for balance */}
        </div>
        
        {/* Google Sheets Header Interface */}
        <div className="bg-emerald-50/30 border-b border-slate-200 p-2.5 flex flex-col gap-2.5">
           <div className="flex items-center gap-3 px-2">
             <div className="w-10 h-10 bg-emerald-600 rounded flex items-center justify-center text-white shadow-sm">
               <Table className="w-6 h-6"/>
             </div>
             <div>
               <h3 className="text-slate-800 font-medium text-[15px] flex items-center gap-2">
                 Automated CRM - Inbound Leads 
                 <div className="bg-slate-200 text-slate-600 text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
                   <Sparkles className="w-3 h-3"/> AI Managed
                 </div>
               </h3>
               <div className="text-[12px] text-slate-600 flex gap-4 mt-1">
                 <span className="hover:bg-slate-100 px-1 rounded cursor-pointer">File</span>
                 <span className="hover:bg-slate-100 px-1 rounded cursor-pointer">Edit</span>
                 <span className="hover:bg-slate-100 px-1 rounded cursor-pointer">View</span>
                 <span className="hover:bg-slate-100 px-1 rounded cursor-pointer">Insert</span>
                 <span className="hover:bg-slate-100 px-1 rounded cursor-pointer">Format</span>
                 <span className="hover:bg-slate-100 px-1 rounded cursor-pointer">Data</span>
                 <span className="hover:bg-slate-100 px-1 rounded cursor-pointer">Tools</span>
                 <span className="hover:bg-slate-100 px-1 rounded cursor-pointer">Extensions</span>
               </div>
             </div>
           </div>

           {/* Toolbar Mock */}
           <div className="flex items-center gap-4 bg-white/80 rounded-full px-5 py-1.5 shadow-sm text-slate-700 w-fit ml-14 border border-slate-200">
              <span className="font-sans font-bold text-sm">100%</span>
              <span className="w-px h-5 bg-slate-300"></span>
              <span className="font-serif text-base">$</span>
              <span className="font-serif text-base">%</span>
              <span className="w-px h-5 bg-slate-300"></span>
              <span className="font-sans font-bold text-sm">Arial</span>
              <span className="w-px h-5 bg-slate-300"></span>
              <span className="font-bold text-sm">B</span>
              <span className="italic text-sm">I</span>
              <span className="underline text-sm decoration-slate-400">U</span>
           </div>
        </div>

        {/* Formula Bar */}
        <div className="flex items-center gap-3 px-3 py-1.5 border-b border-slate-200 bg-white">
           <span className="text-slate-400 font-serif italic font-bold text-sm bg-slate-100 px-2 py-0.5 rounded">fx</span>
           <div className="flex-1 outline-none text-sm text-slate-700 font-mono"></div>
        </div>

        {/* Grid Canvas */}
        <div className="overflow-x-auto bg-white min-h-[300px]">
          <table className="w-full text-sm border-collapse table-fixed">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-center border-b border-slate-300 shadow-sm">
                <th className="w-12 border-r border-slate-300 bg-slate-100"></th>
                <th className="border-r border-slate-300 font-normal py-1.5 w-40">A</th>
                <th className="border-r border-slate-300 font-normal w-60">B</th>
                <th className="border-r border-slate-300 font-normal w-60">C</th>
                <th className="border-r border-slate-300 font-normal w-32">D</th>
                <th className="border-r border-slate-300 font-normal w-40">E</th>
                <th className="border-r border-slate-300 font-normal w-48">F</th>
              </tr>
            </thead>
            <tbody className="text-slate-800">
              {/* Row 1: Headers */}
              <tr>
                 <td className="bg-slate-100 text-slate-500 text-center border-r border-b border-slate-300 py-2">1</td>
                 <td className="border-r border-b border-slate-300 px-3 py-2 font-bold bg-slate-50/50">Timestamp</td>
                 <td className="border-r border-b border-slate-300 px-3 py-2 font-bold bg-slate-50/50">Company Lead Name</td>
                 <td className="border-r border-b border-slate-300 px-3 py-2 font-bold bg-slate-50/50">Email Address</td>
                 <td className="border-r border-b border-slate-300 px-3 py-2 font-bold bg-slate-50/50 text-right">Budget</td>
                 <td className="border-r border-b border-slate-300 px-3 py-2 font-bold bg-slate-50/50">AI Score</td>
                 <td className="border-r border-b border-slate-300 px-3 py-2 font-bold bg-slate-50/50">Action Taken</td>
              </tr>

              {/* Row 2: Animated Insertion */}
              <tr className={`transition-all duration-1000 ${demoState === 'SHEET_SYNC' ? `${theme.sheetRow}` : (demoState === 'COMPLETE' ? 'bg-white' : 'opacity-0')}`} style={demoState === 'SHEET_SYNC' ? { boxShadow: `inset 0 0 0 2px ${theme.shadow.replace('rgba', 'rgb').replace(',0.3)', ')')}` } : {}}>
                 <td className={`bg-slate-100 text-slate-500 text-center border-r border-b border-slate-300 py-2 transition-colors ${demoState === 'SHEET_SYNC' ? `${theme.sheetText} font-bold` : ''}`}>2</td>
                 <td className="border-r border-b border-slate-300 px-3 py-2 text-slate-600 font-mono text-xs">{demoState === 'SHEET_SYNC' || demoState === 'COMPLETE' ? new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}) : ''}</td>
                 <td className="border-r border-b border-slate-300 px-3 py-2 font-medium">{demoState === 'SHEET_SYNC' || demoState === 'COMPLETE' ? (typedName || fullLeadName) : ''}</td>
                 <td className="border-r border-b border-slate-300 px-3 py-2 text-blue-600 hover:underline cursor-pointer">{demoState === 'SHEET_SYNC' || demoState === 'COMPLETE' ? (typedEmail || fullLeadEmail) : ''}</td>
                 <td className="border-r border-b border-slate-300 px-3 py-2 text-right font-medium">{demoState === 'SHEET_SYNC' || demoState === 'COMPLETE' ? `$${parseInt(typedBudget || fullLeadBudget).toLocaleString()}` : ''}</td>
                 <td className="border-r border-b border-slate-300 px-3 py-2">
                   {demoState === 'SHEET_SYNC' || demoState === 'COMPLETE' ? (
                     <span className={`${theme.sheetRow} ${theme.sheetText} px-2 py-0.5 rounded font-bold text-xs`}>{dynamicScore} / 100</span>
                   ) : ''}
                 </td>
                 <td className={`border-r border-b border-slate-300 px-3 py-2 ${theme.sheetText} font-semibold text-xs`}>
                   {demoState === 'SHEET_SYNC' || demoState === 'COMPLETE' ? dynamicAction : ''}
                 </td>
              </tr>
              
              {/* Empty rows to fill space */}
              {[3,4,5,6,7,8].map(i => (
                <tr key={i}>
                  <td className="bg-slate-100 text-slate-500 text-center border-r border-b border-slate-300 py-2">{i}</td>
                  <td className="border-r border-b border-slate-300"></td>
                  <td className="border-r border-b border-slate-300"></td>
                  <td className="border-r border-b border-slate-300"></td>
                  <td className="border-r border-b border-slate-300"></td>
                  <td className="border-r border-b border-slate-300"></td>
                  <td className="border-r border-b border-slate-300"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

