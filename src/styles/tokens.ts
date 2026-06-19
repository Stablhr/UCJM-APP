export const darkTokens = {
  background: '#1a1a18',
  surface: '#2a2a26',
  surfaceAlt: '#222220',
  surfaceTertiary: '#33332e',
  text: '#f0f0eb',
  textMuted: '#9e9e96',
  textSecondary: '#cbcbc5',
  accent: '#ff3b00',
  accentMuted: 'rgba(255,59,0,0.12)',
  border: '#f0f0eb',
  borderAccent: 'rgba(255,59,0,0.2)',
  borderMuted: '#464643',
  error: '#E74C3C',
  errorBg: 'rgba(231,76,60,0.1)',
  errorBorder: 'rgba(231,76,60,0.3)',
  skeleton: 'rgba(255,255,255,0.06)',
} as const;

export const lightTokens = {
  background: '#f0f0eb',
  surface: '#ffffff',
  surfaceAlt: '#e1e1db',
  surfaceTertiary: '#d7d7cf',
  text: '#111110',
  textMuted: '#575753',
  textSecondary: '#464643',
  accent: '#ff3b00',
  accentMuted: 'rgba(255,59,0,0.08)',
  border: '#111110',
  borderAccent: 'rgba(255,59,0,0.2)',
  borderMuted: '#cbcbc5',
  error: '#D32F2F',
  errorBg: 'rgba(211,47,47,0.08)',
  errorBorder: 'rgba(211,47,47,0.2)',
  skeleton: 'rgba(0,0,0,0.06)',
} as const;

export type ThemeTokens = typeof darkTokens;
export type ThemeMode = 'dark' | 'light';
