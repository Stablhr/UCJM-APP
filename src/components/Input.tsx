import { TextInput, View, Text } from 'react-native';
import { useState } from 'react';

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

  return (
    <View className={`mb-4 ${className ?? ''}`}>
      <Text className="text-sky-light text-sm mb-1.5 font-medium">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#87CEEB60"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`
          bg-sky-deep/60 rounded-xl px-4 py-3 text-white text-base
          ${multiline ? 'min-h-[100px] pt-3' : ''}
          ${focused ? 'border border-sky-sunrise/60' : 'border border-sky-day/20'}
          ${error ? 'border-sunset' : ''}
        `}
      />
      {error && (
        <Text className="text-sunset text-xs mt-1">{error}</Text>
      )}
    </View>
  );
}
