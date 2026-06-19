import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../styles/ThemeContext';

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
  const { tokens } = useTheme();

  return (
    <SafeAreaView className={`${className ?? ''}`}>
      <View className="flex-row items-center justify-between px-5 pb-3 pt-2">
        <View className="flex-row items-center flex-1">
          {showBack && navigation.canGoBack() && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                backgroundColor: tokens.surfaceAlt,
                borderWidth: 1,
                borderColor: tokens.borderMuted,
                borderRadius: 999,
              }}
              className="mr-3 w-10 h-10 items-center justify-center"
            >
              <Feather name="arrow-left" size={20} color={tokens.accent} />
            </TouchableOpacity>
          )}
          <View className="flex-1">
            <Text style={{ color: tokens.text }} className="text-2xl font-bold">{title}</Text>
            {subtitle && (
              <Text style={{ color: tokens.textMuted }} className="text-sm mt-0.5">{subtitle}</Text>
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
