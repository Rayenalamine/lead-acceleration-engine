import { InteractiveShowcase } from './components/InteractiveShowcase';

export default function App() {
  return (
    <div className="mx-auto min-h-screen max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <InteractiveShowcase />

      <footer className="mt-8 text-center font-mono text-[11px] uppercase tracking-wider text-slate-600">
        Enterprise AI Lead Acceleration & Qualification Engine
      </footer>
    </div>
  );
}
