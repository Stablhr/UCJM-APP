import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../styles/ThemeContext';

interface Props {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function EmptyState({ icon, title, subtitle, className }: Props) {
  const { tokens } = useTheme();

  return (
    <View className={`items-center py-16 ${className ?? ''}`}>
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 20,
          backgroundColor: tokens.surface,
          borderWidth: 1,
          borderColor: tokens.border,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}
      >
        <Feather name={icon} size={28} color={tokens.textMuted} style={{ opacity: 0.5 }} />
      </View>
      <Text style={{ color: tokens.textMuted, opacity: 0.6 }} className="text-base font-medium">
        {title}
      </Text>
      {subtitle && (
        <Text style={{ color: tokens.textMuted, opacity: 0.4 }} className="text-sm mt-1">
          {subtitle}
        </Text>
      )}
    </View>
  );
}
