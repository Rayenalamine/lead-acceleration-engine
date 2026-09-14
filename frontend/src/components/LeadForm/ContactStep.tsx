import type { FieldErrors } from '../../types/lead';

interface ContactStepProps {
  fullName: string;
  email: string;
  companyName: string;
  errors: FieldErrors;
  onChange: (field: 'fullName' | 'email' | 'companyName', value: string) => void;
  onNext: () => void;
}

export function ContactStep({
  fullName,
  email,
  companyName,
  errors,
  onChange,
  onNext,
}: ContactStepProps) {
  return (
    <div className="animate-fade-up space-y-5">
      <div>
        <h2 className="font-display text-2xl font-semibold text-white">Contact details</h2>
        <p className="mt-1 text-sm text-slate-400">
          Who should we route this opportunity to after qualification?
        </p>
      </div>

      <Field
        label="Full name"
        value={fullName}
        error={errors.fullName}
        placeholder="Alex Rivera"
        onChange={(v) => onChange('fullName', v)}
        autoComplete="name"
      />
      <Field
        label="Business email"
        type="email"
        value={email}
        error={errors.email}
        placeholder="alex@company.com"
        onChange={(v) => onChange('email', v)}
        autoComplete="email"
      />
      <Field
        label="Company name"
        value={companyName}
        error={errors.companyName}
        placeholder="Acme Systems"
        onChange={(v) => onChange('companyName', v)}
        autoComplete="organization"
      />

      <div className="flex justify-end pt-2">
        <button type="button" className="btn-primary" onClick={onNext}>
          Continue
        </button>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  error?: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  onChange: (value: string) => void;
}

function Field({ label, value, error, placeholder, type = 'text', autoComplete, onChange }: FieldProps) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-slate-300">{label}</span>
      <input
        type={type}
        className={`input-field ${error ? 'border-rose-400/70 focus:border-rose-400 focus:ring-rose-400/20' : ''}`}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
      />
      {error ? <span className="text-xs text-rose-300">{error}</span> : null}
    </label>
  );
}
