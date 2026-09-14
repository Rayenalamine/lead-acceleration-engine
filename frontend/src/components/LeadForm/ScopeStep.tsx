import { BUDGET_TIERS, type FieldErrors } from '../../types/lead';

interface ScopeStepProps {
  projectScope: string;
  budgetUsd: number;
  errors: FieldErrors;
  onScopeChange: (value: string) => void;
  onBudgetChange: (value: number) => void;
  onBack: () => void;
  onNext: () => void;
}

export function ScopeStep({
  projectScope,
  budgetUsd,
  errors,
  onScopeChange,
  onBudgetChange,
  onBack,
  onNext,
}: ScopeStepProps) {
  return (
    <div className="animate-fade-up space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold text-white">Project scope & budget</h2>
        <p className="mt-1 text-sm text-slate-400">
          Give the qualification model enough signal to score fit accurately.
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-slate-300">Investment band</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {BUDGET_TIERS.map((tier) => {
            const selected = budgetUsd === tier.value;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => onBudgetChange(tier.value)}
                className={`rounded-xl border p-4 text-left transition duration-300 ${
                  selected
                    ? 'border-signal/70 bg-signal/10 shadow-[0_0_24px_-8px_rgba(45,212,191,0.55)]'
                    : 'border-slate-700/70 bg-ink-900/50 hover:border-slate-500'
                }`}
              >
                <p className="font-display text-sm font-semibold text-white">{tier.label}</p>
                <p className="mt-1 font-mono text-lg text-signal">{tier.range}</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{tier.description}</p>
              </button>
            );
          })}
        </div>
        {errors.budgetUsd ? <p className="text-xs text-rose-300">{errors.budgetUsd}</p> : null}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label htmlFor="budget-slider" className="text-sm font-medium text-slate-300">
            Fine-tune budget
          </label>
          <span className="font-mono text-sm text-signal">${budgetUsd.toLocaleString()}</span>
        </div>
        <input
          id="budget-slider"
          type="range"
          min={1000}
          max={75000}
          step={500}
          value={budgetUsd}
          onChange={(e) => onBudgetChange(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-teal-400"
        />
        <div className="flex justify-between font-mono text-[10px] uppercase tracking-wider text-slate-500">
          <span>$1k</span>
          <span>$5k</span>
          <span>$20k</span>
          <span>$75k</span>
        </div>
      </div>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-slate-300">Project scope</span>
        <textarea
          className={`input-field min-h-[140px] resize-y ${
            errors.projectScope ? 'border-rose-400/70 focus:border-rose-400 focus:ring-rose-400/20' : ''
          }`}
          value={projectScope}
          placeholder="Describe the automation, integrations, volume, and success metrics…"
          onChange={(e) => onScopeChange(e.target.value)}
        />
        <div className="flex justify-between text-xs text-slate-500">
          {errors.projectScope ? (
            <span className="text-rose-300">{errors.projectScope}</span>
          ) : (
            <span>Minimum 20 characters</span>
          )}
          <span className="font-mono">{projectScope.length}/2000</span>
        </div>
      </label>

      <div className="flex justify-between gap-3 pt-2">
        <button type="button" className="btn-ghost" onClick={onBack}>
          Back
        </button>
        <button type="button" className="btn-primary" onClick={onNext}>
          Submit for qualification
        </button>
      </div>
    </div>
  );
}
