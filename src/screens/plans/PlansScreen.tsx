import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import GradientBackground from '../../components/GradientBackground';

const predefinedAreas = [
  'Trusting the Lord', 'Patience', 'Joy', 'Peace', 'Faith',
  'Love', 'Forgiveness', 'Humility', 'Strength', 'Wisdom',
  'Gratitude', 'Hope',
];

const samplePlans = [
  {
    id: '1', title: 'Trusting God in Every Season', area: 'Trusting the Lord',
    duration: 7, desc: 'Learn to rely on God through life\'s ups and downs.',
  },
  {
    id: '2', title: 'The Fruit of Patience', area: 'Patience',
    duration: 5, desc: 'Study what Scripture says about waiting on the Lord.',
  },
  {
    id: '3', title: 'Walking in Joy', area: 'Joy',
    duration: 7, desc: 'Discover the joy that comes from the Lord.',
  },
  {
    id: '4', title: 'The Peace That Passes Understanding', area: 'Peace',
    duration: 5, desc: 'Find God\'s peace in the midst of chaos.',
  },
  {
    id: '5', title: 'Growing Your Faith', area: 'Faith',
    duration: 10, desc: 'Strengthen your faith through God\'s Word.',
  },
  {
    id: '6', title: 'Living in Love', area: 'Love',
    duration: 7, desc: 'Explore the deepest commandment.',
  },
];

export default function PlansScreen() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const filtered = selectedArea
    ? samplePlans.filter((p) => p.area === selectedArea)
    : samplePlans;

  return (
    <GradientBackground>
      <ScrollView contentContainerClassName="px-5 pt-14 pb-8">
        <Text className="text-white text-2xl font-bold mb-2">Reading Plans</Text>
        <Text className="text-sky-day mb-6">
          Pick what area of your life needs attention, then start a plan.
        </Text>

        <Text className="text-sky-light text-sm font-semibold mb-3">Life Areas</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
          <TouchableOpacity
            onPress={() => setSelectedArea(null)}
            className={`mr-2 px-4 py-2 rounded-full ${!selectedArea ? 'bg-sky-sunrise' : 'bg-sky-deep border border-sky-day/30'}`}
          >
            <Text className={!selectedArea ? 'text-sky-night font-semibold' : 'text-white'}>All</Text>
          </TouchableOpacity>
          {predefinedAreas.map((area) => (
            <TouchableOpacity
              key={area}
              onPress={() => setSelectedArea(area === selectedArea ? null : area)}
              className={`mr-2 px-4 py-2 rounded-full ${area === selectedArea ? 'bg-sky-sunrise' : 'bg-sky-deep border border-sky-day/30'}`}
            >
              <Text className={area === selectedArea ? 'text-sky-night font-semibold' : 'text-white'}>
                {area}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {selectedArea && (
          <Text className="text-sky-sunrise font-semibold mb-4">
            Plans for: {selectedArea}
          </Text>
        )}

        <View className="gap-4">
          {filtered.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              className="bg-sky-deep/60 border border-sky-day/20 rounded-2xl p-5 active:bg-sky-deep"
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-white text-lg font-semibold flex-1">{plan.title}</Text>
                <Text className="text-sky-sunrise text-sm ml-2">{plan.duration}d</Text>
              </View>
              <Text className="text-sky-day text-sm mb-3">{plan.desc}</Text>
              <View className="flex-row items-center">
                <View className="bg-sky-sunrise/20 px-3 py-1 rounded-full">
                  <Text className="text-sky-sunrise text-xs">{plan.area}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </GradientBackground>
  );
}
