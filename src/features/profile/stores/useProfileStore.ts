import { create } from 'zustand';
import { ProfileType } from '../types/profileType';

interface ProfileStore {
  profile: ProfileType | null;
  setProfile: (profile: ProfileType) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
}));
