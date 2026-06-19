import { TouchableOpacity, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../styles/ThemeContext';

interface Props {
  title: string;
  subtitle?: string;
  onPress: () => void;
  className?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  variant?: 'default' | 'accent';
}

export default function Card({
  title, subtitle, onPress, className, icon, rightElement, variant = 'default',
}: Props) {
  const { tokens } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const variants = {
    default: {
      backgroundColor: tokens.surface,
      borderWidth: 1,
      borderColor: tokens.border,
    },
    accent: {
      backgroundColor: tokens.accentMuted,
      borderWidth: 1,
      borderColor: tokens.borderAccent,
    },
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={() => { scale.value = withSpring(0.98); }}
        onPressOut={() => { scale.value = withSpring(1); }}
        activeOpacity={1}
        style={[variants[variant], { borderRadius: 8, padding: 32 }]}
        className={className ?? ''}
      >
        <View className="flex-row items-center">
          {icon && (
            <View
              style={{ backgroundColor: tokens.accentMuted, borderRadius: 8 }}
              className="mr-4 w-12 h-12 items-center justify-center"
            >
              {icon}
            </View>
          )}
          <View className="flex-1">
            <Text style={{ color: tokens.text, fontSize: 18, letterSpacing: 0.18, fontWeight: '500' }}>
              {title}
            </Text>
            {subtitle && (
              <Text style={{ color: tokens.textMuted, fontSize: 14, letterSpacing: 0.14 }} className="mt-1 leading-5">
                {subtitle}
              </Text>
            )}
          </View>
          {rightElement && (
            <View className="ml-3">{rightElement}</View>
          )}
          {!rightElement && (
            <Feather name="chevron-right" size={20} color={tokens.textMuted} style={{ opacity: 0.5 }} />
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
