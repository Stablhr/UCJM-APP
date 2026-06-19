import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../app/navigator';
import { useAuth } from '../../lib/auth';
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
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 active:bg-white/10 flex-row items-center"
            >
              <Feather name="log-out" size={14} color="#87CEEB" />
              <Text className="text-sky-day text-sm ml-1.5">Sign Out</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row mt-2">
            <View className="bg-sky-sunrise/10 rounded-full px-3 py-1 flex-row items-center">
              <Feather name="sunrise" size={12} color="#FFC857" />
              <Text className="text-sky-sunrise text-xs font-medium ml-1.5">Daily Devotional</Text>
            </View>
          </View>
        </View>

        <View className="mx-5 mb-6">
          <View className="bg-sky-deep/40 rounded-3xl border border-sky-sunrise/20 p-6">
            <View className="flex-row items-center mb-3">
              <View className="w-10 h-10 rounded-xl bg-sky-sunrise/20 items-center justify-center mr-3">
                <Feather name="book-open" size={20} color="#FFC857" />
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
            {stats.map((stat) => (
              <View key={stat.label} className="flex-1 bg-sky-deep/40 rounded-2xl border border-sky-day/10 p-4 items-center">
                <Feather name={stat.icon} size={22} color="#FFC857" />
                <Text className="text-white text-xl font-bold mt-1.5">{stat.value}</Text>
                <Text className="text-sky-day text-xs mt-0.5">{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="px-5 mb-3">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-white text-lg font-semibold">Quick Actions</Text>
          </View>
          <View className="gap-3">
            {quickActions.map((action) => (
              <Card
                key={action.key}
                title={action.title}
                subtitle={action.subtitle}
                icon={<Feather name={action.icon} size={22} color="#FFC857" />}
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
