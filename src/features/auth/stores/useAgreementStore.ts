import { create } from 'zustand';

type AgreementState = {
  terms: boolean;
  privacy: boolean;
  marketing: boolean;
  allChecked: boolean;
  toggleTerms: () => void;
  togglePrivacy: () => void;
  toggleMarketing: () => void;
  toggleAll: () => void;
};

export const useAgreementStore = create<AgreementState>((set) => ({
  terms: false,
  privacy: false,
  marketing: false,
  allChecked: false,

  toggleTerms: () =>
    set((state) => {
      const next = !state.terms;
      const newState = { ...state, terms: next };
      return {
        ...newState,
        allChecked: newState.terms && newState.privacy && newState.marketing,
      };
    }),

  togglePrivacy: () =>
    set((state) => {
      const next = !state.privacy;
      const newState = { ...state, privacy: next };
      return {
        ...newState,
        allChecked: newState.terms && newState.privacy && newState.marketing,
      };
    }),

  toggleMarketing: () =>
    set((state) => {
      const next = !state.marketing;
      const newState = { ...state, marketing: next };
      return {
        ...newState,
        allChecked: newState.terms && newState.privacy && newState.marketing,
      };
    }),

  toggleAll: () =>
    set((state) => {
      const newValue = !(state.terms && state.privacy && state.marketing);
      return {
        terms: newValue,
        privacy: newValue,
        marketing: newValue,
        allChecked: newValue,
      };
    }),
}));
