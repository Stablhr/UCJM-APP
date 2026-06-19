import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '../styles/ThemeContext';

interface Props {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  className?: string;
}

export default function Skeleton({ width = '100%', height = 20, borderRadius = 8, className }: Props) {
  const { tokens } = useTheme();
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.7, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor: tokens.skeleton,
        },
        animatedStyle,
      ]}
      className={className}
    />
  );
}
