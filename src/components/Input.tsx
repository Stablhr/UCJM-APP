import { TextInput, View, Text } from 'react-native';
import { useState } from 'react';
import { useTheme } from '../styles/ThemeContext';

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  multiline?: boolean;
  error?: string;
  className?: string;
}

export default function Input({
  label, value, onChangeText, placeholder, secureTextEntry,
  keyboardType, autoCapitalize, multiline, error, className,
}: Props) {
  const [focused, setFocused] = useState(false);
  const { tokens, isDark } = useTheme();

  return (
    <View className={`mb-4 ${className ?? ''}`}>
      <Text style={{ color: tokens.textMuted, fontSize: 14, letterSpacing: 0.14 }} className="mb-1.5">
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={tokens.textMuted + '60'}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          {
            backgroundColor: isDark ? tokens.surface : tokens.background,
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 12,
            color: tokens.text,
            fontSize: 16,
          },
          multiline && { minHeight: 100, paddingTop: 12 },
          focused ? { borderWidth: 1, borderColor: tokens.border } : { borderWidth: 1, borderColor: tokens.borderMuted },
          error ? { borderColor: tokens.error } : null,
        ]}
      />
      {error && (
        <Text style={{ color: tokens.error, fontSize: 14, letterSpacing: 0.14 }} className="mt-1">{error}</Text>
      )}
    </View>
  );
}
