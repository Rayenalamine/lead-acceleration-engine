import { Check } from 'lucide-react';

const STEPS = ['Contact', 'Scope & Budget', 'Qualification'];

interface ProgressBarProps {
  currentStep: number;
}

export function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <ol className="mb-8 grid grid-cols-3 gap-2">
      {STEPS.map((label, index) => {
        const stepNumber = index + 1;
        const complete = currentStep > stepNumber;
        const active = currentStep === stepNumber;

        return (
          <li key={label} className="flex flex-col gap-2">
            <div
              className={`h-1 rounded-full transition-colors duration-500 ${
                complete || active ? 'bg-signal' : 'bg-slate-700'
              }`}
            />
            <div className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs font-mono transition-all duration-300 ${
                  complete
                    ? 'border-signal bg-signal text-ink-950'
                    : active
                      ? 'border-signal text-signal'
                      : 'border-slate-600 text-slate-500'
                }`}
              >
                {complete ? <Check className="h-3.5 w-3.5" /> : stepNumber}
              </span>
              <span
                className={`hidden text-xs font-medium sm:inline ${
                  active || complete ? 'text-slate-200' : 'text-slate-500'
                }`}
              >
                {label}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
