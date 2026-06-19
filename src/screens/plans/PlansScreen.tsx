import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../styles/ThemeContext';
import GradientBackground from '../../components/GradientBackground';
import ScreenHeader from '../../components/ScreenHeader';
import Button from '../../components/Button';
import FadeInView from '../../components/FadeInView';

const predefinedAreas = [
  'Trusting the Lord', 'Patience', 'Joy', 'Peace', 'Faith',
  'Love', 'Forgiveness', 'Humility', 'Strength', 'Wisdom',
  'Gratitude', 'Hope',
];

const samplePlans = [
  {
    id: '1', title: 'Trusting God in Every Season', area: 'Trusting the Lord',
    duration: 7, desc: 'Learn to rely on God through life\'s ups and downs.', progress: 3,
  },
  {
    id: '2', title: 'The Fruit of Patience', area: 'Patience',
    duration: 5, desc: 'Study what Scripture says about waiting on the Lord.', progress: 0,
  },
  {
    id: '3', title: 'Walking in Joy', area: 'Joy',
    duration: 7, desc: 'Discover the joy that comes from the Lord.', progress: 1,
  },
  {
    id: '4', title: 'The Peace That Passes Understanding', area: 'Peace',
    duration: 5, desc: 'Find God\'s peace in the midst of chaos.', progress: 5,
  },
  {
    id: '5', title: 'Growing Your Faith', area: 'Faith',
    duration: 10, desc: 'Strengthen your faith through God\'s Word.', progress: 0,
  },
  {
    id: '6', title: 'Living in Love', area: 'Love',
    duration: 7, desc: 'Explore the deepest commandment.', progress: 2,
  },
];

function ProgressBar({ progress, total }: { progress: number; total: number }) {
  const { tokens } = useTheme();
  const filled = Math.min(progress, total);
  const remaining = total - filled;

  return (
    <View
      style={{
        height: 4,
        borderRadius: 2,
        overflow: 'hidden',
        flex: 1,
        marginRight: 8,
        flexDirection: 'row',
        backgroundColor: tokens.surfaceAlt,
      }}
    >
      <View style={{ flex: filled, backgroundColor: tokens.accent }} />
      <View style={{ flex: remaining, backgroundColor: 'transparent' }} />
    </View>
  );
}

export default function PlansScreen() {
  const { tokens } = useTheme();
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const filtered = selectedArea
    ? samplePlans.filter((p) => p.area === selectedArea)
    : samplePlans;

  return (
    <GradientBackground>
      <ScreenHeader title="Reading Plans" subtitle="Grow in your faith journey" />
      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-24 flex-grow">
        <FadeInView index={0}>
          <Text style={{ color: tokens.textMuted, opacity: 0.7 }} className="text-sm mb-4 leading-5">
            Pick what area of your life needs attention, then start a reading plan.
          </Text>
        </FadeInView>

        <FadeInView index={1}>
          <Text style={{ color: tokens.textMuted, opacity: 0.6 }} className="text-xs font-semibold mb-3 tracking-wider">LIFE AREAS</Text>
        </FadeInView>
        <FadeInView index={2}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <TouchableOpacity
              onPress={() => setSelectedArea(null)}
              style={!selectedArea ? { backgroundColor: tokens.accent, borderRadius: 999 } : { backgroundColor: tokens.surface, borderWidth: 1, borderColor: tokens.border, borderRadius: 999 }}
              className="mr-2 px-5 py-2.5 flex-row items-center"
            >
              <Text
                style={{ color: !selectedArea ? tokens.background : tokens.textMuted }}
                className="font-semibold text-sm"
              >
                All
              </Text>
            </TouchableOpacity>
            {predefinedAreas.map((area) => (
              <TouchableOpacity
                key={area}
                onPress={() => setSelectedArea(area === selectedArea ? null : area)}
                style={area === selectedArea ? { backgroundColor: tokens.accent, borderRadius: 999 } : { backgroundColor: tokens.surface, borderWidth: 1, borderColor: tokens.border, borderRadius: 999 }}
                className="mr-2 px-5 py-2.5 flex-row items-center"
              >
                <Text
                  style={{ color: area === selectedArea ? tokens.background : tokens.textMuted }}
                  className="font-semibold text-sm"
                >
                  {area}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </FadeInView>

        {selectedArea && (
          <FadeInView index={3}>
            <View style={{ backgroundColor: tokens.accentMuted, borderWidth: 1, borderColor: tokens.borderAccent, borderRadius: 16 }}
              className="px-5 py-3 mb-4 flex-row items-center"
            >
              <Feather name="bookmark" size={16} color={tokens.accent} />
              <Text style={{ color: tokens.accent }} className="font-semibold ml-2">
                Plans for: {selectedArea}
              </Text>
            </View>
          </FadeInView>
        )}

        {filtered.length === 0 ? (
          <View className="items-center py-16">
            <Feather name="list" size={48} color={tokens.textMuted} style={{ opacity: 0.5 }} />
            <Text style={{ color: tokens.textMuted, opacity: 0.6 }} className="text-base mt-4">No plans for this area yet</Text>
            <Text style={{ color: tokens.textMuted, opacity: 0.4 }} className="text-sm mt-1">More plans coming soon</Text>
          </View>
        ) : (
          <View className="gap-4">
            {filtered.map((plan, i) => (
              <FadeInView key={plan.id} index={i + 3}>
                <TouchableOpacity
                  style={{
                    backgroundColor: tokens.surface,
                    borderWidth: 1,
                    borderColor: tokens.border,
                    borderRadius: 16,
                    padding: 20,
                  }}
                  className="active:opacity-80"
                >
                  <View className="flex-row items-start justify-between mb-2">
                    <Text style={{ color: tokens.text }} className="text-lg font-semibold flex-1 mr-3">{plan.title}</Text>
                    <View style={{ backgroundColor: tokens.accentMuted, borderRadius: 12 }}
                      className="px-3 py-1.5 flex-row items-center"
                    >
                      <Feather name="clock" size={12} color={tokens.accent} />
                      <Text style={{ color: tokens.accent }} className="text-sm font-bold ml-1">{plan.duration}d</Text>
                    </View>
                  </View>
                  <Text style={{ color: tokens.textMuted, opacity: 0.7 }} className="text-sm mb-3 leading-5">{plan.desc}</Text>
                  <View className="flex-row items-center mb-3">
                    <ProgressBar progress={plan.progress} total={plan.duration} />
                    <Text style={{ color: tokens.textMuted, opacity: 0.5 }} className="text-xs">
                      {plan.progress}/{plan.duration}
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <View style={{ backgroundColor: tokens.surface, borderRadius: 999 }}
                      className="px-3 py-1"
                    >
                      <Text style={{ color: tokens.textMuted, opacity: 0.6 }} className="text-xs">{plan.area}</Text>
                    </View>
                    <Button title={plan.progress > 0 ? 'Continue' : 'Start Plan'} onPress={() => {}} variant="ghost" size="sm" />
                  </View>
                </TouchableOpacity>
              </FadeInView>
            ))}
          </View>
        )}
      </ScrollView>
    </GradientBackground>
  );
}
