export type LeadStatus =
  | 'QUEUED'
  | 'PROCESSING'
  | 'QUALIFIED'
  | 'DISQUALIFIED'
  | 'FAILED';

export interface LeadSubmission {
  fullName: string;
  email: string;
  companyName: string;
  budgetUsd: number;
  projectScope: string;
}

export interface LeadResponse {
  leadId: string;
  status: LeadStatus;
  timestamp: string;
}

export interface LeadDetail {
  leadId: string;
  fullName: string;
  email: string;
  companyName: string;
  budgetUsd: number;
  projectScope: string;
  qualificationScore: number | null;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

export interface BudgetTier {
  id: string;
  label: string;
  range: string;
  value: number;
  description: string;
}

export interface FieldErrors {
  [key: string]: string | undefined;
}

export const BUDGET_TIERS: BudgetTier[] = [
  {
    id: 'starter',
    label: 'Pilot',
    range: '$1k – $5k',
    value: 3500,
    description: 'Focused automation sprint or MVP qualification.',
  },
  {
    id: 'growth',
    label: 'Growth',
    range: '$5k – $20k',
    value: 12500,
    description: 'Multi-system integration with measurable ROI.',
  },
  {
    id: 'enterprise',
    label: 'Enterprise',
    range: '$20k+',
    value: 35000,
    description: 'Full pipeline orchestration and CRM sync.',
  },
];

export const TERMINAL_STATUSES: LeadStatus[] = ['QUALIFIED', 'DISQUALIFIED', 'FAILED'];
