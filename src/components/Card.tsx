import { TouchableOpacity, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../styles/ThemeContext';

interface Props {
  title: string;
  subtitle?: string;
  onPress: () => void;
  className?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  variant?: 'default' | 'glass' | 'accent';
}

export default function Card({
  title, subtitle, onPress, className, icon, rightElement, variant = 'default',
}: Props) {
  const { tokens } = useTheme();

  const variants = {
    default: {
      backgroundColor: tokens.surfaceAlt,
      borderWidth: 1,
      borderColor: tokens.borderMuted,
    },
    glass: {
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
    <TouchableOpacity
      onPress={onPress}
      style={[variants[variant], { borderRadius: 16, padding: 20 }]}
      className={`active:opacity-80 ${className ?? ''}`}
    >
      <View className="flex-row items-center">
        {icon && (
          <View
            style={{ backgroundColor: tokens.accentMuted, borderRadius: 12 }}
            className="mr-4 w-12 h-12 items-center justify-center"
          >
            {icon}
          </View>
        )}
        <View className="flex-1">
          <Text style={{ color: tokens.text }} className="text-lg font-semibold">
            {title}
          </Text>
          {subtitle && (
            <Text style={{ color: tokens.textMuted }} className="text-sm mt-1 leading-5">
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
  );
}
