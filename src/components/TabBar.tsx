import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigationState, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
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

  const TAB_BAR_HEIGHT = 64;
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
      }}
      pointerEvents="box-none"
    >
      <BlurView
        intensity={isDark ? 24 : 60}
        tint={isDark ? 'dark' : 'light'}
        style={{
          flex: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
          borderTopWidth: 1,
          borderColor: tokens.border,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 8,
            backgroundColor: isDark
              ? 'rgba(0,0,0,0.2)'
              : 'rgba(255,255,255,0.3)',
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
                  borderRadius: 12,
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 32,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                    backgroundColor: isActive ? tokens.accentMuted : 'transparent',
                  }}
                >
                  <Feather
                    name={tab.icon}
                    size={20}
                    color={isActive ? tokens.accent : tokens.textMuted}
                    style={{ opacity: isActive ? 1 : 0.5 }}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '600',
                    color: isActive ? tokens.accent : tokens.textMuted,
                    opacity: isActive ? 1 : 0.5,
                    marginTop: 2,
                  }}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
}
