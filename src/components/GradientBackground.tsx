import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { View } from 'react-native';

interface Props {
  children: ReactNode;
  colors?: readonly [string, string, ...string[]];
  className?: string;
}

export default function GradientBackground({ children, colors, className }: Props) {
  return (
    <LinearGradient
      colors={colors ?? ['#1a1a2e', '#16213e', '#0f3460']}
      className={`flex-1 ${className ?? ''}`}
    >
      <View className="flex-1">{children}</View>
    </LinearGradient>
  );
}
