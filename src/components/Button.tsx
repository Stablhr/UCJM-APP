import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export default function Button({
  title, onPress, variant = 'primary', loading, disabled, className, icon,
}: Props) {
  const base = 'flex-row items-center justify-center py-3 px-6 rounded-xl';
  const variants = {
    primary: 'bg-sky-sunrise active:bg-yellow-500',
    secondary: 'bg-sky-deep active:bg-sky-midnight',
    outline: 'border border-sky-sunrise active:bg-sky-sunrise/10',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${disabled ? 'opacity-50' : ''} ${className ?? ''}`}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'outline' ? '#FFC857' : '#1a1a2e'} />
      ) : (
        <>
          {icon && <View className="mr-2">{icon}</View>}
          <Text
            className={`font-semibold text-base ${variant === 'outline' ? 'text-sky-sunrise' : 'text-sky-night'}`}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
