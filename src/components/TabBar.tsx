import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigationState, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../styles/ThemeContext';
import type { RootStackParamList } from '../app/navigator';

type Nav = NativeStackNavigationProp<RootStackParamList>;

interface TabItem {
  key: keyof RootStackParamList;
  label: string;
  icon: keyof typeof Feather.glyphMap;
}

const tabs: TabItem[] = [
  { key: 'Home', label: 'Home', icon: 'home' },
  { key: 'Bible', label: 'Bible', icon: 'book-open' },
  { key: 'Plans', label: 'Plans', icon: 'clipboard' },
  { key: 'Chords', label: 'Chords', icon: 'music' },
  { key: 'Groups', label: 'Groups', icon: 'users' },
];

export default function TabBar() {
  const { tokens, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();

  const currentRouteName = useNavigationState(
    (state) => state.routes[state.index]?.name
  );

  const TAB_BAR_HEIGHT = 56;
  const totalHeight = TAB_BAR_HEIGHT + insets.bottom;

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: totalHeight,
        paddingBottom: insets.bottom,
        backgroundColor: isDark ? '#1a1a18' : '#f0f0eb',
        borderTopWidth: 1,
        borderTopColor: tokens.border,
      }}
      pointerEvents="box-none"
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 8,
        }}
      >
        {tabs.map((tab) => {
          const isActive = currentRouteName === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => navigation.navigate(tab.key)}
              activeOpacity={0.6}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 8,
              }}
            >
              <Feather
                name={tab.icon}
                size={20}
                color={isActive ? tokens.accent : tokens.textMuted}
              />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '500',
                  color: isActive ? tokens.accent : tokens.textMuted,
                  marginTop: 2,
                }}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
