export const skyColors = {
  dawn: '#FF9A3C',
  sunrise: '#FFC857',
  morning: '#FFE29A',
  day: '#87CEEB',
  light: '#B8E3FF',
  white: '#FFFFFF',
  dusk: '#5B2C6F',
  sunset: '#E74C3C',
  gold: '#F39C12',
  night: '#1a1a2e',
  deep: '#16213e',
  midnight: '#0f3460',
} as const;

export const gradients = {
  sunrise: ['#FF9A3C', '#FFC857', '#FFE29A'] as const,
  daytime: ['#87CEEB', '#B8E3FF', '#FFFFFF'] as const,
  sunset: ['#5B2C6F', '#E74C3C', '#F39C12'] as const,
  night: ['#1a1a2e', '#16213e', '#0f3460'] as const,
  deepNight: ['#0a1628', '#1a1a2e', '#16213e'] as const,
  warmGlow: ['#1a1a2e', '#16213e', '#5B2C6F'] as const,
} as const;

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  glow: {
    shadowColor: '#FFC857',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
} as const;
