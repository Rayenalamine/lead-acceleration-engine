import axios, { AxiosError } from 'axios';
import type { LeadDetail, LeadResponse, LeadSubmission } from '../types/lead';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

export interface ApiErrorBody {
  message?: string;
  violations?: Array<{ field: string; message: string }>;
}

export async function submitLead(payload: LeadSubmission): Promise<LeadResponse> {
  const { data } = await api.post<LeadResponse>('/api/v1/leads', payload);
  return data;
}

export async function fetchLead(leadId: string): Promise<LeadDetail> {
  const { data } = await api.get<LeadDetail>(`/api/v1/leads/${leadId}`);
  return data;
}

export function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorBody>;
    const body = axiosError.response?.data;
    if (body?.violations?.length) {
      return body.violations.map((v) => v.message).join(' · ');
    }
    if (body?.message) {
      return body.message;
    }
    if (axiosError.message) {
      return axiosError.message;
    }
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unexpected error. Please try again.';
}
