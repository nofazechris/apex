'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { INITIAL_STATE, STORAGE_KEY, createActions } from '@/lib/actions';
import { buildViewModel } from '@/lib/viewModel';

/** Owns the app state, persistence and the exam timer; returns the view-model the screens render from. */
export default function useApex() {
  const [state, setStateRaw] = useState(INITIAL_STATE);
  const stateRef = useRef(state);

  const actions = useMemo(() => {
    const get = () => stateRef.current;
    const set = (patch) => {
      stateRef.current = { ...stateRef.current, ...patch };
      setStateRaw(stateRef.current);
    };
    return createActions({ get, set });
  }, []);

  // Restore saved progress once on the client.
  useEffect(() => {
    let saved = {};
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) saved = JSON.parse(raw) || {};
    } catch (e) {}
    const hasSaved = 'profile' in saved || 'session' in saved;
    actions.set({
      hydrated: true,
      now: Date.now(),
      ...(hasSaved && {
        profile: saved.profile || null,
        attempts: saved.attempts || [],
        isDemo: !!saved.isDemo,
        session: saved.session || null,
        route: saved.session ? 'exam' : saved.profile ? 'app' : 'landing',
        appScreen: 'dashboard',
      }),
    });
  }, [actions]);

  // Persist progress (only after the saved copy has been read).
  const { hydrated, profile, attempts, isDemo, session } = state;
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ profile, attempts, isDemo, session }));
    } catch (e) {}
  }, [hydrated, profile, attempts, isDemo, session]);

  // One-second clock; auto-submits a timed exam when it runs out.
  useEffect(() => {
    const timer = setInterval(() => {
      actions.set({ now: Date.now() });
      const s = stateRef.current.session;
      if (s && s.mode === 'exam' && s.endTime && Date.now() >= s.endTime) actions.submitExam(true);
    }, 1000);
    return () => clearInterval(timer);
  }, [actions]);

  return buildViewModel(state, actions);
}
