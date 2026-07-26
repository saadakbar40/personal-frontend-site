'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

export interface AboutYouForm {
  fullName: string;
  dateOfBirth: string;
  favouriteColor: string;
  favouriteFood: string;
  favouriteSeason: string;
  favouriteHobby: string;
  dreamDestination: string;
  personality: string;
  drink: string;
  timeOfDay: string;
  landscape: string;
  entertainment: string;
  ratings: Record<string, number>;
  happyAnswer: string;
  qualitiesAnswer: string;
  trustAnswer: string;
  askAnything: string;
  favorites: string[];
}

const initialForm: AboutYouForm = {
  fullName: '',
  dateOfBirth: '',
  favouriteColor: '',
  favouriteFood: '',
  favouriteSeason: '',
  favouriteHobby: '',
  dreamDestination: '',
  personality: '',
  drink: '',
  timeOfDay: '',
  landscape: '',
  entertainment: '',
  ratings: {
    Trust: 7,
    Respect: 8,
    Honesty: 8,
    Kindness: 8,
    Communication: 7,
    'Family Values': 8,
  },
  happyAnswer: '',
  qualitiesAnswer: '',
  trustAnswer: '',
  askAnything: '',
  favorites: [],
};

interface FormContextValue {
  form: AboutYouForm;
  setField: <K extends keyof AboutYouForm>(key: K, value: AboutYouForm[K]) => void;
  setRating: (name: string, value: number) => void;
  toggleFavorite: (item: string) => void;
  resetForm: () => void;
}

const FormContext = createContext<FormContextValue | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [form, setForm] = useState<AboutYouForm>(initialForm);

  const setField = useCallback(
    <K extends keyof AboutYouForm>(key: K, value: AboutYouForm[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const setRating = useCallback((name: string, value: number) => {
    setForm((prev) => ({
      ...prev,
      ratings: { ...prev.ratings, [name]: value },
    }));
  }, []);

  const toggleFavorite = useCallback((item: string) => {
    setForm((prev) => ({
      ...prev,
      favorites: prev.favorites.includes(item)
        ? prev.favorites.filter((f) => f !== item)
        : [...prev.favorites, item],
    }));
  }, []);

  const resetForm = useCallback(() => setForm(initialForm), []);

  return (
    <FormContext.Provider
      value={{ form, setField, setRating, toggleFavorite, resetForm }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useForm must be used within FormProvider');
  return ctx;
}
