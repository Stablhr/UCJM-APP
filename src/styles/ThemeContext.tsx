import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTokens, lightTokens, type ThemeTokens, type ThemeMode } from './tokens';

const STORAGE_KEY = 'ucjm_theme';

interface ThemeContextValue {
  mode: ThemeMode;
  tokens: ThemeTokens;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (stored === 'light' || stored === 'dark') {
        setMode(stored);
      } else {
        setMode(systemScheme === 'light' ? 'light' : 'dark');
      }
      setLoaded(true);
    });
  }, [systemScheme]);

  const persistTheme = useCallback(async (newMode: ThemeMode) => {
    await AsyncStorage.setItem(STORAGE_KEY, newMode);
  }, []);

  const toggleTheme = useCallback(() => {
    setMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      persistTheme(next);
      return next;
    });
  }, [persistTheme]);

  const setTheme = useCallback((newMode: ThemeMode) => {
    setMode(newMode);
    persistTheme(newMode);
  }, [persistTheme]);

  if (!loaded) return null;

  return (
    <ThemeContext.Provider
      value={{
        mode,
        tokens: (mode === 'dark' ? darkTokens : lightTokens) as ThemeTokens,
        isDark: mode === 'dark',
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}
