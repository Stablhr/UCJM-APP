import { TextInput, View, Text } from 'react-native';

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  className?: string;
}

export default function Input({
  label, value, onChangeText, placeholder, secureTextEntry,
  keyboardType, autoCapitalize, className,
}: Props) {
  return (
    <View className={`mb-4 ${className ?? ''}`}>
      <Text className="text-sky-light text-sm mb-1.5 font-medium">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#87CEEB"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        className="bg-sky-deep/60 border border-sky-day/30 rounded-xl px-4 py-3 text-white text-base"
      />
    </View>
  );
}
