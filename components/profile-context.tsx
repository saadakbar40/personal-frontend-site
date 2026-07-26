'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

interface ProfileContextValue {
  photo: string | null;
  setPhoto: (dataUrl: string | null) => void;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [photo, setPhotoState] = useState<string | null>(null);

  const setPhoto = useCallback((dataUrl: string | null) => {
    setPhotoState(dataUrl);
  }, []);

  return (
    <ProfileContext.Provider value={{ photo, setPhoto }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
}
