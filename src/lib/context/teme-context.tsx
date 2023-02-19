import { useState, useEffect, createContext } from 'react';
import type { ReactNode, ChangeEvent } from 'react';
export type Theme = 'light' | 'dim' | 'dark';
export type Accent = 'blue' | 'yellow' | 'pink' | 'purple' | 'orange' | 'green';

type ThemeContextProps = {
  theme: Theme;
  accent: Accent;
  changeTheme: ({ target: { value } }: ChangeEvent<HTMLInputElement>) => void;
  changeAccent: ({ target: { value } }: ChangeEvent<HTMLInputElement>) => void;
};
type ThemeContextProviderProps = {
  children: ReactNode;
};
export const ThemeContext = createContext<ThemeContextProps | null>(null);

function setInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const savedTheme = localStorage.getItem('theme') as Theme | null;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return savedTheme ?? (prefersDark ? 'dark' : 'light');
}

function setInitialAccent(): Accent {
  if (typeof window === 'undefined') return 'blue';

  const savedAccent = localStorage.getItem('accent') as Accent | null;

  return savedAccent ?? 'blue';
}

export function ThemeContextProvider({
  children
}: ThemeContextProviderProps): JSX.Element {
  const [theme, setTheme] = useState<Theme>(setInitialTheme);
  const [accent, setAccent] = useState<Accent>(setInitialAccent);

  useEffect(() => {
    const flipTheme = (theme: Theme): NodeJS.Timeout | undefined => {
      const root = document.documentElement;
      const targetTheme = theme === 'dim' ? 'dark' : theme;
      if (targetTheme === 'dark') root.classList.add('dark');
      else root.classList.remove('dark');
      root.style.setProperty('--main-background', `var(--${theme}-background)`);
      root.style.setProperty(
        '--main-search-background',
        `var(--${theme}-search-background)`
      );
      root.style.setProperty(
        '--main-sidebar-background',
        `var(--${theme}-sidebar-background)`
      );
      return undefined;
    };
    const timeoutID = flipTheme(theme);
    return () => clearTimeout(timeoutID);
  }, [theme]);

  useEffect(() => {
    const flipAccent = (accent: Accent): NodeJS.Timeout | undefined => {
      const root = document.documentElement;
      root.style.setProperty('--main-accent', `var(--accent-${accent})`);
      return undefined;
    };

    const timeoutID = flipAccent(accent);

    return () => clearTimeout(timeoutID);
  }, [accent]);

  const changeTheme = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => setTheme(value as Theme);
  const changeAccent = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => setAccent(value as Accent);
  const value: ThemeContextProps = {
    theme,
    accent,
    changeTheme,
    changeAccent
  };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
