import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../app/navigator';
import { useAuth } from '../../lib/auth';
import { useTheme } from '../../styles/ThemeContext';
import ScreenShell from '../../components/ScreenShell';
import Card from '../../components/Card';
import Button from '../../components/Button';
import FadeInView from '../../components/FadeInView';
import { Feather } from '@expo/vector-icons';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const quickActions = [
  { key: 'Bible' as const, title: 'Read the Bible', subtitle: 'Open the in-app Bible reader', icon: 'book-open' as const },
  { key: 'Plans' as const, title: 'Reading Plans', subtitle: 'Pick a plan based on your needs', icon: 'clipboard' as const },
  { key: 'Chords' as const, title: 'Chord Library', subtitle: 'Browse worship song chords', icon: 'music' as const },
  { key: 'Groups' as const, title: 'Cell Groups', subtitle: 'Connect with your group', icon: 'users' as const },
];

const stats = [
  { label: 'Days Read', value: '12', icon: 'calendar' as const },
  { label: 'Streak', value: '5', icon: 'zap' as const },
  { label: 'Plans Done', value: '2', icon: 'check-circle' as const },
  { label: 'Verses', value: '48', icon: 'book' as const },
];

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { user, signOut } = useAuth();
  const { tokens, isDark, toggleTheme } = useTheme();

  return (
    <ScreenShell>
      <ScrollView className="flex-1" contentContainerClassName="pb-24 flex-grow" showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-14 pb-6">
          <View className="flex-row justify-between items-center mb-2">
            <View>
              <Text style={{ color: tokens.textMuted, fontSize: 14, letterSpacing: 0.14, fontWeight: '500' }}>Welcome back,</Text>
              <Text style={{ color: tokens.text, fontSize: 32, fontFamily: 'Anton_400Regular', letterSpacing: 0.32 }}>
                {user?.user_metadata?.full_name ?? 'Believer'}
              </Text>
            </View>
            <View className="flex-row gap-2">
              <TouchableOpacity
                onPress={toggleTheme}
                className="items-center justify-center"
                style={{ width: 36, height: 36 }}
              >
                <Feather name={isDark ? 'sun' : 'moon'} size={18} color={tokens.text} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={signOut}
                className="flex-row items-center"
                style={{ paddingVertical: 6, paddingHorizontal: 12 }}
              >
                <Feather name="log-out" size={14} color={tokens.textMuted} />
                <Text style={{ color: tokens.textMuted, fontSize: 14, letterSpacing: 0.14 }} className="ml-1.5">Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row mt-2">
            <View style={{ backgroundColor: tokens.accentMuted, borderRadius: 9999 }}
              className="px-3 py-1 flex-row items-center"
            >
              <Feather name="sunrise" size={12} color={tokens.accent} />
              <Text style={{ color: tokens.accent, fontSize: 14, letterSpacing: 0.14 }} className="ml-1.5">Daily Devotional</Text>
            </View>
          </View>
        </View>

        <FadeInView index={0}>
          <View className="mx-5 mb-6">
            <View style={{
              backgroundColor: tokens.surface,
              borderWidth: 1,
              borderColor: tokens.border,
              borderRadius: 8,
              padding: 32,
            }}>
              <View className="flex-row items-center mb-4">
                <View style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: tokens.accentMuted, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                  <Feather name="book-open" size={20} color={tokens.accent} />
                </View>
                <View>
                  <Text style={{ color: tokens.text, fontSize: 18, letterSpacing: 0.18, fontWeight: '500' }}>Verse of the Day</Text>
                  <Text style={{ color: tokens.textMuted, fontSize: 14, letterSpacing: 0.14 }}>Psalm 1:1-3</Text>
                </View>
              </View>

              <View style={{
                backgroundColor: isDark ? tokens.surfaceAlt : '#f0f0eb',
                borderRadius: 8,
                padding: 16,
                marginBottom: 16,
                borderLeftWidth: 2,
                borderLeftColor: tokens.accent,
              }}>
                <Text style={{ color: tokens.text, fontSize: 16, fontStyle: 'italic', lineHeight: 26, opacity: 0.9 }}>
                  "Blessed is the one who does not walk in step with the wicked or stand in the way that sinners take..."
                </Text>
              </View>

              <View className="flex-row gap-3">
                <Button
                  title="Read Chapter"
                  onPress={() => navigation.navigate('Bible')}
                  variant="primary"
                  size="sm"
                  className="flex-1"
                />
                <Button
                  title="Mark Read"
                  onPress={() => {}}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                />
              </View>
            </View>
          </View>
        </FadeInView>

        <FadeInView index={1}>
          <View className="mx-5 mb-6">
            <View className="flex-row gap-3">
              {stats.map((stat) => (
                <View
                  key={stat.label}
                  style={{
                    flex: 1,
                    backgroundColor: tokens.surface,
                    borderWidth: 1,
                    borderColor: tokens.border,
                    borderRadius: 8,
                    padding: 16,
                    alignItems: 'center',
                  }}
                >
                  <Feather name={stat.icon} size={20} color={tokens.text} style={{ opacity: 0.7 }} />
                  <Text style={{ color: tokens.text, fontSize: 24, fontFamily: 'Anton_400Regular', letterSpacing: 0.24 }} className="mt-1">{stat.value}</Text>
                  <Text style={{ color: tokens.textMuted, fontSize: 14, letterSpacing: 0.14 }} className="mt-1">{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </FadeInView>

        <FadeInView index={2}>
          <View className="px-5 mb-3">
            <View className="flex-row items-center justify-between mb-4">
              <Text style={{ color: tokens.text, fontSize: 18, letterSpacing: 0.18, fontWeight: '500' }}>Quick Actions</Text>
            </View>
            <View className="gap-3">
              {quickActions.map((action) => (
                <Card
                  key={action.key}
                  title={action.title}
                  subtitle={action.subtitle}
                  icon={<Feather name={action.icon} size={22} color={tokens.accent} />}
                  onPress={() => navigation.navigate(action.key)}
                />
              ))}
            </View>
          </View>
        </FadeInView>

        <View className="items-center mt-6">
          <View style={{ backgroundColor: tokens.surface, borderRadius: 9999 }}
            className="px-6 py-2"
          >
            <Text style={{ color: tokens.textMuted, opacity: 0.4, fontSize: 14, letterSpacing: 0.14 }}>UCJM v1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </ScreenShell>
  );
}
