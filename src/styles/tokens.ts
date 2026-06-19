export const darkTokens = {
  background: '#1a1a2e',
  surface: 'rgba(255,255,255,0.05)',
  surfaceAlt: '#16213e',
  surfaceTertiary: '#0f3460',
  text: '#FFFFFF',
  textMuted: '#87CEEB',
  textSecondary: '#B8E3FF',
  accent: '#FFC857',
  accentMuted: 'rgba(255,200,87,0.15)',
  border: 'rgba(255,255,255,0.1)',
  borderAccent: 'rgba(255,200,87,0.2)',
  borderMuted: 'rgba(135,206,235,0.2)',
  error: '#E74C3C',
  errorBg: 'rgba(231,76,60,0.1)',
  errorBorder: 'rgba(231,76,60,0.3)',
  skeleton: 'rgba(255,255,255,0.08)',
} as const;

export const lightTokens = {
  background: '#F5F5FA',
  surface: '#FFFFFF',
  surfaceAlt: '#F0F0F5',
  surfaceTertiary: '#E8E8F0',
  text: '#1a1a2e',
  textMuted: '#5B7B9A',
  textSecondary: '#3A5A7A',
  accent: '#FF9A3C',
  accentMuted: 'rgba(255,154,60,0.12)',
  border: 'rgba(0,0,0,0.08)',
  borderAccent: 'rgba(255,154,60,0.2)',
  borderMuted: 'rgba(91,123,154,0.2)',
  error: '#D32F2F',
  errorBg: 'rgba(211,47,47,0.08)',
  errorBorder: 'rgba(211,47,47,0.2)',
  skeleton: 'rgba(0,0,0,0.06)',
} as const;

export type ThemeTokens = typeof darkTokens;
export type ThemeMode = 'dark' | 'light';
