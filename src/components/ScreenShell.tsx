import { ReactNode } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../styles/ThemeContext';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function ScreenShell({
  children, className,
}: Props) {
  const { tokens, isDark } = useTheme();

  return (
    <View
      style={{ backgroundColor: tokens.background }}
      className={`flex-1 ${className ?? ''}`}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View className="flex-1">{children}</View>
    </View>
  );
}
