import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchLead } from '../api/leads';
import type { LeadDetail, LeadStatus } from '../types/lead';
import { TERMINAL_STATUSES } from '../types/lead';

const POLL_INTERVAL_MS = 500;
const MAX_POLLS = 120;

interface UseLeadPollingResult {
  lead: LeadDetail | null;
  isPolling: boolean;
  error: string | null;
  startPolling: (leadId: string) => void;
  reset: () => void;
}

export function useLeadPolling(): UseLeadPollingResult {
  const [lead, setLead] = useState<LeadDetail | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeLeadId, setActiveLeadId] = useState<string | null>(null);
  const pollCountRef = useRef(0);

  const reset = useCallback(() => {
    setLead(null);
    setIsPolling(false);
    setError(null);
    setActiveLeadId(null);
    pollCountRef.current = 0;
  }, []);

  const startPolling = useCallback((leadId: string) => {
    pollCountRef.current = 0;
    setError(null);
    setLead(null);
    setActiveLeadId(leadId);
    setIsPolling(true);
  }, []);

  useEffect(() => {
    if (!activeLeadId || !isPolling) {
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const poll = async () => {
      try {
        const detail = await fetchLead(activeLeadId);
        if (cancelled) return;

        setLead(detail);
        pollCountRef.current += 1;

        const status: LeadStatus = detail.status;
        if (TERMINAL_STATUSES.includes(status)) {
          setIsPolling(false);
          return;
        }

        if (pollCountRef.current >= MAX_POLLS) {
          setError('Qualification timed out. Your lead is still queued — refresh shortly.');
          setIsPolling(false);
          return;
        }

        timer = setTimeout(poll, POLL_INTERVAL_MS);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Failed to poll lead status');
        setIsPolling(false);
      }
    };

    void poll();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [activeLeadId, isPolling]);

  return { lead, isPolling, error, startPolling, reset };
}
