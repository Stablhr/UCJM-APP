import { TouchableOpacity, Text, View } from 'react-native';

interface Props {
  title: string;
  subtitle?: string;
  onPress: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export default function Card({ title, subtitle, onPress, className, icon }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-sky-deep/60 border border-sky-day/20 rounded-2xl p-5 active:bg-sky-deep ${className ?? ''}`}
    >
      <View className="flex-row items-center">
        {icon && <View className="mr-3">{icon}</View>}
        <View className="flex-1">
          <Text className="text-white text-lg font-semibold">{title}</Text>
          {subtitle && <Text className="text-sky-day text-sm mt-1">{subtitle}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
}
