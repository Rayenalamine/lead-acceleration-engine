import { useState } from 'react';
import { extractErrorMessage, submitLead } from './api/leads';
import { Header } from './components/Header';
import { InteractiveShowcase } from './components/InteractiveShowcase';
import { ContactStep } from './components/LeadForm/ContactStep';
import { ProgressBar } from './components/LeadForm/ProgressBar';
import { ScopeStep } from './components/LeadForm/ScopeStep';
import { StatusStep } from './components/LeadForm/StatusStep';
import { useLeadPolling } from './hooks/useLeadPolling';
import type { FieldErrors } from './types/lead';
import { BUDGET_TIERS } from './types/lead';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function App() {
  const [activeTab, setActiveTab] = useState<'INTAKE' | 'SHOWCASE'>('INTAKE');
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [projectScope, setProjectScope] = useState('');
  const [budgetUsd, setBudgetUsd] = useState(BUDGET_TIERS[1].value);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { lead, isPolling, error: pollError, startPolling, reset: resetPolling } = useLeadPolling();

  const validateContact = (): boolean => {
    const next: FieldErrors = {};
    if (fullName.trim().length < 2) next.fullName = 'Enter your full name (min 2 characters).';
    if (!EMAIL_REGEX.test(email.trim())) next.email = 'Enter a valid business email.';
    if (companyName.trim().length < 2) next.companyName = 'Enter your company name.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validateScope = (): boolean => {
    const next: FieldErrors = {};
    if (budgetUsd < 1000) next.budgetUsd = 'Budget must be at least $1,000.';
    if (projectScope.trim().length < 20) {
      next.projectScope = 'Describe the project in at least 20 characters.';
    }
    if (projectScope.trim().length > 2000) {
      next.projectScope = 'Project scope must be under 2000 characters.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateScope()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setStep(3);

    try {
      const response = await submitLead({
        fullName: fullName.trim(),
        email: email.trim(),
        companyName: companyName.trim(),
        budgetUsd,
        projectScope: projectScope.trim(),
      });
      startPolling(response.leadId);
    } catch (err) {
      setSubmitError(extractErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setFullName('');
    setEmail('');
    setCompanyName('');
    setProjectScope('');
    setBudgetUsd(BUDGET_TIERS[1].value);
    setErrors({});
    setSubmitError(null);
    resetPolling();
  };

  return (
    <div className="mx-auto min-h-screen max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'SHOWCASE' ? (
        <InteractiveShowcase />
      ) : (
        <main className="panel p-6 sm:p-8">
          <ProgressBar currentStep={step} />

          {step === 1 && (
            <ContactStep
              fullName={fullName}
              email={email}
              companyName={companyName}
              errors={errors}
              onChange={(field, value) => {
                if (field === 'fullName') setFullName(value);
                if (field === 'email') setEmail(value);
                if (field === 'companyName') setCompanyName(value);
              }}
              onNext={() => {
                if (validateContact()) setStep(2);
              }}
            />
          )}

          {step === 2 && (
            <ScopeStep
              projectScope={projectScope}
              budgetUsd={budgetUsd}
              errors={errors}
              onScopeChange={setProjectScope}
              onBudgetChange={setBudgetUsd}
              onBack={() => setStep(1)}
              onNext={() => void handleSubmit()}
            />
          )}

          {step === 3 && (
            <StatusStep
              isSubmitting={isSubmitting}
              isPolling={isPolling}
              lead={lead}
              error={submitError ?? pollError}
              onReset={handleReset}
            />
          )}
        </main>
      )}

      <footer className="mt-8 text-center font-mono text-[11px] uppercase tracking-wider text-slate-600">
        Enterprise AI Lead Acceleration & Qualification Engine
      </footer>
    </div>
  );
}
