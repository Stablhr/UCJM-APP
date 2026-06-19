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
  const { tokens } = useTheme();

  return (
    <View className={`mb-4 ${className ?? ''}`}>
      <Text style={{ color: tokens.textMuted }} className="text-sm mb-1.5 font-medium">
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
            backgroundColor: tokens.surfaceAlt,
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 12,
            color: tokens.text,
            fontSize: 16,
          },
          multiline && { minHeight: 100, paddingTop: 12 },
          focused ? { borderWidth: 1, borderColor: tokens.accent + '99' } : { borderWidth: 1, borderColor: tokens.borderMuted },
          error ? { borderColor: tokens.error } : null,
        ]}
      />
      {error && (
        <Text style={{ color: tokens.error }} className="text-xs mt-1">{error}</Text>
      )}
    </View>
  );
}
