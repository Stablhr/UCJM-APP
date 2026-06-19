import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { View } from 'react-native';
import { gradients } from '../styles/theme';

interface Props {
  children: ReactNode;
  colors?: readonly [string, string, ...string[]];
  className?: string;
  withOverlay?: boolean;
}

export default function GradientBackground({
  children, colors, className, withOverlay = true,
}: Props) {
  return (
    <LinearGradient
      colors={colors ?? gradients.night}
      className={`flex-1 ${className ?? ''}`}
    >
      {withOverlay && (
        <>
          <View className="absolute top-0 right-0 w-40 h-40 rounded-full bg-sky-sunrise/5 blur-3xl" />
          <View className="absolute bottom-20 -left-20 w-60 h-60 rounded-full bg-sky-midnight/30 blur-3xl" />
        </>
      )}
      <View className="flex-1">{children}</View>
    </LinearGradient>
  );
}
