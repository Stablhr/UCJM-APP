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
} as const;
