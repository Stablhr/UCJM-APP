import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../app/navigator';
import { useAuth } from '../../lib/auth';
import { useTheme } from '../../styles/ThemeContext';
import GradientBackground from '../../components/GradientBackground';
import Card from '../../components/Card';
import Button from '../../components/Button';
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
    <GradientBackground>
      <ScrollView contentContainerClassName="pb-8" showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-14 pb-6">
          <View className="flex-row justify-between items-center mb-2">
            <View>
              <Text style={{ color: tokens.textMuted }} className="text-sm font-medium">Welcome back,</Text>
              <Text style={{ color: tokens.text }} className="text-3xl font-bold tracking-tight">
                {user?.user_metadata?.full_name ?? 'Believer'}
              </Text>
            </View>
            <View className="flex-row gap-2">
              <TouchableOpacity
                onPress={toggleTheme}
                style={{
                  backgroundColor: tokens.surface,
                  borderWidth: 1,
                  borderColor: tokens.border,
                  borderRadius: 999,
                }}
                className="w-10 h-10 items-center justify-center"
              >
                <Feather name={isDark ? 'sun' : 'moon'} size={18} color={tokens.accent} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={signOut}
                style={{
                  backgroundColor: tokens.surface,
                  borderWidth: 1,
                  borderColor: tokens.border,
                  borderRadius: 999,
                }}
                className="px-4 py-2 flex-row items-center"
              >
                <Feather name="log-out" size={14} color={tokens.textMuted} />
                <Text style={{ color: tokens.textMuted }} className="text-sm ml-1.5">Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row mt-2">
            <View style={{ backgroundColor: tokens.accentMuted, borderRadius: 999 }}
              className="px-3 py-1 flex-row items-center"
            >
              <Feather name="sunrise" size={12} color={tokens.accent} />
              <Text style={{ color: tokens.accent }} className="text-xs font-medium ml-1.5">Daily Devotional</Text>
            </View>
          </View>
        </View>

        <View className="mx-5 mb-6">
          <View style={{
            backgroundColor: tokens.surfaceAlt,
            borderWidth: 1,
            borderColor: tokens.borderAccent,
            borderRadius: 24,
            padding: 24,
          }}>
            <View className="flex-row items-center mb-3">
              <View style={{ backgroundColor: tokens.accentMuted, borderRadius: 12 }}
                className="w-10 h-10 items-center justify-center mr-3"
              >
                <Feather name="book-open" size={20} color={tokens.accent} />
              </View>
              <View>
                <Text style={{ color: tokens.accent }} className="text-lg font-bold">Verse of the Day</Text>
                <Text style={{ color: tokens.textMuted }} className="text-xs">Psalm 1:1-3</Text>
              </View>
            </View>

            <View style={{
              backgroundColor: tokens.background + '66' + (isDark ? '' : ''),
              borderRadius: 16,
              padding: 16,
              marginBottom: 16,
              borderLeftWidth: 2,
              borderLeftColor: tokens.accent,
            }}>
              <Text style={{ color: tokens.text + 'E6' }} className="text-base italic leading-7">
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

        <View className="mx-5 mb-6">
          <View className="flex-row gap-3">
            {stats.map((stat) => (
              <View
                key={stat.label}
                style={{
                  flex: 1,
                  backgroundColor: tokens.surfaceAlt,
                  borderWidth: 1,
                  borderColor: tokens.borderMuted,
                  borderRadius: 16,
                  padding: 16,
                  alignItems: 'center',
                }}
              >
                <Feather name={stat.icon} size={22} color={tokens.accent} />
                <Text style={{ color: tokens.text }} className="text-xl font-bold mt-1.5">{stat.value}</Text>
                <Text style={{ color: tokens.textMuted }} className="text-xs mt-0.5">{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="px-5 mb-3">
          <View className="flex-row items-center justify-between mb-3">
            <Text style={{ color: tokens.text }} className="text-lg font-semibold">Quick Actions</Text>
          </View>
          <View className="gap-3">
            {quickActions.map((action) => (
              <Card
                key={action.key}
                title={action.title}
                subtitle={action.subtitle}
                icon={<Feather name={action.icon} size={22} color={tokens.accent} />}
                onPress={() => navigation.navigate(action.key)}
                variant="glass"
              />
            ))}
          </View>
        </View>

        <View className="items-center mt-6">
          <View style={{ backgroundColor: tokens.surface, borderRadius: 999 }}
            className="px-6 py-2 flex-row items-center"
          >
            <Text style={{ color: tokens.textMuted, opacity: 0.4 }} className="text-xs">UCJM v1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}
