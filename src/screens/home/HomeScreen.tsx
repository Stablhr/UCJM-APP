import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../app/navigator';
import { useAuth } from '../../lib/auth';
import GradientBackground from '../../components/GradientBackground';
import Card from '../../components/Card';
import Button from '../../components/Button';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const quickActions = [
  { key: 'Bible' as const, title: 'Read the Bible', subtitle: 'Open the in-app Bible reader', icon: '📖' },
  { key: 'Plans' as const, title: 'Reading Plans', subtitle: 'Pick a plan based on your needs', icon: '📋' },
  { key: 'Chords' as const, title: 'Chord Library', subtitle: 'Browse worship song chords', icon: '🎵' },
  { key: 'Groups' as const, title: 'Cell Groups', subtitle: 'Connect with your group', icon: '👥' },
];

const stats = [
  { label: 'Days Read', value: '12', icon: '📅' },
  { label: 'Streak', value: '5 🔥', icon: '🔥' },
  { label: 'Plans Done', value: '2', icon: '✅' },
  { label: 'Verses', value: '48', icon: '📖' },
];

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { user, signOut } = useAuth();

  return (
    <GradientBackground>
      <ScrollView contentContainerClassName="pb-8" showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-14 pb-6">
          <View className="flex-row justify-between items-center mb-2">
            <View>
              <Text className="text-sky-day text-sm font-medium">Welcome back,</Text>
              <Text className="text-white text-3xl font-bold tracking-tight">
                {user?.user_metadata?.full_name ?? 'Believer'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={signOut}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 active:bg-white/10"
            >
              <Text className="text-sky-day text-sm">Sign Out</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row mt-2">
            <View className="bg-sky-sunrise/10 rounded-full px-3 py-1 flex-row items-center">
              <Text className="text-xs mr-1">🕊️</Text>
              <Text className="text-sky-sunrise text-xs font-medium">Daily Devotional</Text>
            </View>
          </View>
        </View>

        <View className="mx-5 mb-6">
          <View className="bg-gradient-to-b from-sky-sunrise/10 to-sky-deep/40 rounded-3xl border border-sky-sunrise/20 p-6">
            <View className="flex-row items-center mb-3">
              <View className="w-10 h-10 rounded-xl bg-sky-sunrise/20 items-center justify-center mr-3">
                <Text className="text-lg">📖</Text>
              </View>
              <View>
                <Text className="text-sky-sunrise text-lg font-bold">Verse of the Day</Text>
                <Text className="text-sky-day text-xs">Psalm 1:1-3</Text>
              </View>
            </View>

            <View className="bg-sky-night/40 rounded-2xl p-4 mb-4 border-l-2 border-sky-sunrise">
              <Text className="text-white/90 text-base italic leading-7">
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
            {stats.slice(0, 2).map((stat) => (
              <View key={stat.label} className="flex-1 bg-sky-deep/40 rounded-2xl border border-sky-day/10 p-4 items-center">
                <Text className="text-2xl mb-1">{stat.icon}</Text>
                <Text className="text-white text-xl font-bold">{stat.value}</Text>
                <Text className="text-sky-day text-xs mt-0.5">{stat.label}</Text>
              </View>
            ))}
            {stats.slice(2, 4).map((stat) => (
              <View key={stat.label} className="flex-1 bg-sky-deep/40 rounded-2xl border border-sky-day/10 p-4 items-center">
                <Text className="text-2xl mb-1">{stat.icon}</Text>
                <Text className="text-white text-xl font-bold">{stat.value}</Text>
                <Text className="text-sky-day text-xs mt-0.5">{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="px-5 mb-3">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-white text-lg font-semibold">Quick Actions</Text>
            <Text className="text-sky-day/50 text-xs">SWIPE ↓</Text>
          </View>
          <View className="gap-3">
            {quickActions.map((action) => (
              <Card
                key={action.key}
                title={action.title}
                subtitle={action.subtitle}
                icon={<Text className="text-2xl">{action.icon}</Text>}
                onPress={() => navigation.navigate(action.key)}
                variant="glass"
              />
            ))}
          </View>
        </View>

        <View className="items-center mt-6">
          <View className="bg-white/5 rounded-full px-6 py-2 flex-row items-center">
            <Text className="text-sky-day/40 text-xs">UCJM v1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}
