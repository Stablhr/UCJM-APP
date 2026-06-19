import { ReactNode, useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  FadeInDown,
} from 'react-native-reanimated';

interface Props {
  children: ReactNode;
  index?: number;
  className?: string;
}

export default function FadeInView({ children, index = 0, className }: Props) {
  const entering = FadeInDown
    .duration(400)
    .delay(index * 80)
    .springify()
    .damping(20);

  return (
    <Animated.View entering={entering} className={className}>
      {children}
    </Animated.View>
  );
}
