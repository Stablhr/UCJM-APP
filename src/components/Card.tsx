import { TouchableOpacity, Text, View } from 'react-native';

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
  const variants = {
    default:
      'bg-sky-deep/60 border border-sky-day/20',
    glass:
      'bg-white/5 border border-white/10',
    accent:
      'bg-sky-sunrise/10 border border-sky-sunrise/20',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`rounded-2xl p-5 active:opacity-80 ${variants[variant]} ${className ?? ''}`}
    >
      <View className="flex-row items-center">
        {icon && (
          <View className="mr-4 w-12 h-12 rounded-xl bg-sky-sunrise/15 items-center justify-center">
            {icon}
          </View>
        )}
        <View className="flex-1">
          <Text className="text-white text-lg font-semibold">{title}</Text>
          {subtitle && (
            <Text className="text-sky-day text-sm mt-1 leading-5">{subtitle}</Text>
          )}
        </View>
        {rightElement && (
          <View className="ml-3">{rightElement}</View>
        )}
        {!rightElement && (
          <Text className="text-sky-day/50 ml-2 text-lg">›</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
