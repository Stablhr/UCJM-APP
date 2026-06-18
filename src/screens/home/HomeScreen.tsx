import { View, Text, ScrollView } from 'react-native';
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

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { user, signOut } = useAuth();

  return (
    <GradientBackground>
      <ScrollView contentContainerClassName="px-5 pt-14 pb-8">
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text className="text-sky-day text-sm">Welcome back,</Text>
            <Text className="text-white text-2xl font-bold">
              {user?.user_metadata?.full_name ?? 'Believer'}
            </Text>
          </View>
          <Button title="Sign Out" onPress={signOut} variant="outline" className="px-3 py-2" />
        </View>

        <View className="bg-sky-deep/60 border border-sky-day/20 rounded-2xl p-5 mb-8">
          <Text className="text-sky-sunrise text-lg font-bold mb-1">Today's Reading</Text>
          <Text className="text-sky-day text-base">Psalm 1:1-3</Text>
          <Text className="text-gray-400 text-sm mt-2">
            "Blessed is the one who does not walk in step with the wicked..."
          </Text>
          <Button
            title="Mark as Read"
            onPress={() => {}}
            variant="primary"
            className="mt-4"
          />
        </View>

        <Text className="text-white text-lg font-semibold mb-3">Quick Actions</Text>
        <View className="gap-3">
          {quickActions.map((action) => (
            <Card
              key={action.key}
              title={action.title}
              subtitle={action.subtitle}
              icon={<Text className="text-2xl">{action.icon}</Text>}
              onPress={() => navigation.navigate(action.key)}
            />
          ))}
        </View>
      </ScrollView>
    </GradientBackground>
  );
}
