import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export default function Button({
  title, onPress, variant = 'primary', size = 'md', loading, disabled, className, icon,
}: Props) {
  const sizes = {
    sm: 'py-2 px-4 rounded-lg',
    md: 'py-3 px-6 rounded-xl',
    lg: 'py-4 px-8 rounded-xl',
  };

  const variants = {
    primary:
      'bg-sky-sunrise active:bg-yellow-500',
    secondary:
      'bg-sky-deep border border-sky-day/30 active:bg-sky-midnight',
    outline:
      'border border-sky-sunrise/50 active:bg-sky-sunrise/10',
    ghost:
      'active:bg-white/5',
  };

  const textColors = {
    primary: 'text-sky-night',
    secondary: 'text-white',
    outline: 'text-sky-sunrise',
    ghost: 'text-sky-day',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        flex-row items-center justify-center
        ${sizes[size]}
        ${variants[variant]}
        ${disabled || loading ? 'opacity-50' : ''}
        ${className ?? ''}
      `}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#1a1a2e' : '#FFC857'}
        />
      ) : (
        <>
          {icon && <View className="mr-2">{icon}</View>}
          <Text className={`font-semibold text-base ${textColors[variant]}`}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
