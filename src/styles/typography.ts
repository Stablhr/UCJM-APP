export const fontFamily = {
  sans: ['Inter', 'System'],
  mono: ['Inter', 'System'],
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
} as const;

export const lineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const typography = {
  h1: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize['4xl'],
    lineHeight: fontSize['4xl'] * lineHeight.tight,
    fontWeight: fontWeight.bold,
  },
  h2: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize['2xl'],
    lineHeight: fontSize['2xl'] * lineHeight.tight,
    fontWeight: fontWeight.bold,
  },
  h3: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.xl,
    lineHeight: fontSize.xl * lineHeight.tight,
    fontWeight: fontWeight.semibold,
  },
  body: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.base,
    lineHeight: fontSize.base * lineHeight.relaxed,
    fontWeight: fontWeight.regular,
  },
  caption: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.sm,
    lineHeight: fontSize.sm * lineHeight.normal,
    fontWeight: fontWeight.medium,
  },
  small: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.xs,
    lineHeight: fontSize.xs * lineHeight.normal,
    fontWeight: fontWeight.medium,
  },
} as const;
