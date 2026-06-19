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
              className="mr-3"
              style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}
            >
              <Feather name="arrow-left" size={22} color={tokens.text} />
            </TouchableOpacity>
          )}
          <View className="flex-1">
            <Text style={{ color: tokens.text, fontSize: 32, fontFamily: 'Anton_400Regular', letterSpacing: 0.32 }}>
              {title}
            </Text>
            {subtitle && (
              <Text style={{ color: tokens.textMuted, fontSize: 14, letterSpacing: 0.14 }} className="mt-0.5">
                {subtitle}
              </Text>
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
