export const fontFamily = {
  sans: ['Aileron-Regular', 'System'],
  serif: ['Anton_400Regular', 'System'],
  mono: ['Aileron-Regular', 'System'],
} as const;

export const fontSize = {
  caption: 14,
  body: 18,
  subheading: 24,
  headingSm: 32,
  heading: 40,
  headingLg: 61,
  display: 80,
  displayXl: 96,
} as const;

export const lineHeight = {
  caption: 1.3,
  body: 1.35,
  subheading: 1.3,
  headingSm: 1.2,
  heading: 1.1,
  headingLg: 1,
  display: 0.95,
  displayXl: 0.91,
} as const;

export const tracking = {
  caption: 0.14,
  body: 0.18,
  subheading: 0.24,
  headingSm: 0.32,
  heading: 0.4,
  headingLg: -0.43,
  display: -0.56,
  displayXl: -0.67,
} as const;

export const fontWeight = {
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const typography = {
  display: {
    fontFamily: fontFamily.serif,
    fontSize: fontSize.display,
    lineHeight: fontSize.display * lineHeight.display,
    fontWeight: fontWeight.regular,
    letterSpacing: tracking.display,
  },
  displayXl: {
    fontFamily: fontFamily.serif,
    fontSize: fontSize.displayXl,
    lineHeight: fontSize.displayXl * lineHeight.displayXl,
    fontWeight: fontWeight.light,
    letterSpacing: tracking.displayXl,
  },
  heading: {
    fontFamily: fontFamily.serif,
    fontSize: fontSize.heading,
    lineHeight: fontSize.heading * lineHeight.heading,
    fontWeight: fontWeight.regular,
    letterSpacing: tracking.heading,
  },
  headingSm: {
    fontFamily: fontFamily.serif,
    fontSize: fontSize.headingSm,
    lineHeight: fontSize.headingSm * lineHeight.headingSm,
    fontWeight: fontWeight.regular,
    letterSpacing: tracking.headingSm,
  },
  subheading: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.subheading,
    lineHeight: fontSize.subheading * lineHeight.subheading,
    fontWeight: fontWeight.regular,
    letterSpacing: tracking.subheading,
  },
  body: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.body,
    lineHeight: fontSize.body * lineHeight.body,
    fontWeight: fontWeight.regular,
    letterSpacing: tracking.body,
  },
  caption: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.caption,
    lineHeight: fontSize.caption * lineHeight.caption,
    fontWeight: fontWeight.regular,
    letterSpacing: tracking.caption,
  },
} as const;
