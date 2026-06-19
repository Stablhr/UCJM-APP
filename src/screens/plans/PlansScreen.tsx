import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import GradientBackground from '../../components/GradientBackground';
import ScreenHeader from '../../components/ScreenHeader';
import Button from '../../components/Button';

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
      <ScreenHeader title="Reading Plans" subtitle="Grow in your faith journey" />
      <ScrollView contentContainerClassName="px-5 pb-8">
        <Text className="text-sky-day/70 text-sm mb-4 leading-5">
          Pick what area of your life needs attention, then start a reading plan.
        </Text>

        <Text className="text-sky-day/60 text-xs font-semibold mb-3 tracking-wider">LIFE AREAS</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
          <TouchableOpacity
            onPress={() => setSelectedArea(null)}
            className={`mr-2 px-5 py-2.5 rounded-full flex-row items-center ${!selectedArea ? 'bg-sky-sunrise' : 'bg-white/5 border border-white/10'}`}
          >
            <Text className={`font-semibold text-sm ${!selectedArea ? 'text-sky-night' : 'text-white/80'}`}>
              All
            </Text>
          </TouchableOpacity>
          {predefinedAreas.map((area) => (
            <TouchableOpacity
              key={area}
              onPress={() => setSelectedArea(area === selectedArea ? null : area)}
              className={`mr-2 px-5 py-2.5 rounded-full flex-row items-center ${area === selectedArea ? 'bg-sky-sunrise' : 'bg-white/5 border border-white/10'}`}
            >
              <Text className={`font-semibold text-sm ${area === selectedArea ? 'text-sky-night' : 'text-white/80'}`}>
                {area}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {selectedArea && (
          <View className="bg-sky-sunrise/10 border border-sky-sunrise/20 rounded-2xl px-5 py-3 mb-4 flex-row items-center">
            <Feather name="bookmark" size={16} color="#FFC857" />
            <Text className="text-sky-sunrise font-semibold ml-2">
              Plans for: {selectedArea}
            </Text>
          </View>
        )}

        {filtered.length === 0 ? (
          <View className="items-center py-16">
            <Feather name="list" size={48} color="#87CEEB" style={{ opacity: 0.5 }} />
            <Text className="text-sky-day/60 text-base mt-4">No plans for this area yet</Text>
            <Text className="text-sky-day/40 text-sm mt-1">More plans coming soon</Text>
          </View>
        ) : (
          <View className="gap-4">
            {filtered.map((plan) => (
              <TouchableOpacity
                key={plan.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 active:bg-white/10"
              >
                <View className="flex-row items-start justify-between mb-2">
                  <Text className="text-white text-lg font-semibold flex-1 mr-3">{plan.title}</Text>
                  <View className="bg-sky-sunrise/15 rounded-xl px-3 py-1.5 flex-row items-center">
                    <Feather name="clock" size={12} color="#FFC857" />
                    <Text className="text-sky-sunrise text-sm font-bold ml-1">{plan.duration}d</Text>
                  </View>
                </View>
                <Text className="text-sky-day/70 text-sm mb-3 leading-5">{plan.desc}</Text>
                <View className="flex-row items-center justify-between">
                  <View className="bg-white/5 px-3 py-1 rounded-full">
                    <Text className="text-sky-day/60 text-xs">{plan.area}</Text>
                  </View>
                  <Button title="Start Plan" onPress={() => {}} variant="ghost" size="sm" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </GradientBackground>
  );
}
