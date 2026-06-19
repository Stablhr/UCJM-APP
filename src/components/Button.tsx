import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../styles/ThemeContext';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export default function Button({
  title, onPress, variant = 'primary', size = 'md', loading, disabled, className, icon,
}: Props) {
  const { tokens } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const sizes = {
    sm: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 24 },
    md: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 24 },
    lg: { paddingVertical: 16, paddingHorizontal: 32, borderRadius: 40 },
  };

  const variants = {
    primary: {
      backgroundColor: tokens.text,
    },
    outline: {
      borderWidth: 1,
      borderColor: tokens.border,
    },
    ghost: {},
  };

  const textColors = {
    primary: tokens.background,
    outline: tokens.text,
    ghost: tokens.textMuted,
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={() => { scale.value = withSpring(0.97); }}
        onPressOut={() => { scale.value = withSpring(1); }}
        disabled={disabled || loading}
        activeOpacity={1}
        style={[
          { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
          sizes[size],
          variants[variant],
          (disabled || loading) && { opacity: 0.5 },
        ]}
        className={className ?? ''}
      >
        {loading ? (
          <ActivityIndicator size="small" color={textColors[variant]} />
        ) : (
          <>
            {icon && <View className="mr-2">{icon}</View>}
            <Text style={{ color: textColors[variant], fontSize: 14, letterSpacing: 0.14, fontWeight: '500' }}>
              {title}
            </Text>
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}
