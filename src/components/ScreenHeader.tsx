import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

interface Props {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
  className?: string;
}

export default function ScreenHeader({
  title, subtitle, showBack = true, rightAction, className,
}: Props) {
  const navigation = useNavigation();

  return (
    <SafeAreaView className={`${className ?? ''}`}>
      <View className="flex-row items-center justify-between px-5 pb-3 pt-2">
        <View className="flex-row items-center flex-1">
          {showBack && navigation.canGoBack() && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="mr-3 w-10 h-10 rounded-full bg-sky-deep/60 border border-sky-day/20 items-center justify-center"
            >
              <Feather name="arrow-left" size={20} color="#FFC857" />
            </TouchableOpacity>
          )}
          <View className="flex-1">
            <Text className="text-white text-2xl font-bold">{title}</Text>
            {subtitle && (
              <Text className="text-sky-day text-sm mt-0.5">{subtitle}</Text>
            )}
          </View>
        </View>
        {rightAction && (
          <View className="ml-3">{rightAction}</View>
        )}
      </View>
    </SafeAreaView>
  );
}
