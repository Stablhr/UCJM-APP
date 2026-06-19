import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../styles/ThemeContext';
import ScreenShell from '../../components/ScreenShell';
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
        backgroundColor: tokens.borderMuted,
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
    <ScreenShell>
      <ScreenHeader title="Reading Plans" subtitle="Grow in your faith journey" />
      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-24 flex-grow">
        <FadeInView index={0}>
          <Text style={{ color: tokens.textMuted, fontSize: 14, letterSpacing: 0.14 }} className="mb-4 leading-5">
            Pick what area of your life needs attention, then start a reading plan.
          </Text>
        </FadeInView>

        <FadeInView index={1}>
          <Text style={{ color: tokens.textMuted, fontSize: 14, letterSpacing: 0.14, fontWeight: '500' }} className="mb-3">LIFE AREAS</Text>
        </FadeInView>
        <FadeInView index={2}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <TouchableOpacity
              onPress={() => setSelectedArea(null)}
              style={{
                backgroundColor: !selectedArea ? tokens.accent : tokens.surface,
                borderWidth: !selectedArea ? 0 : 1,
                borderColor: tokens.borderMuted,
                borderRadius: 9999,
                paddingHorizontal: 16,
                paddingVertical: 8,
                marginRight: 8,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: !selectedArea ? tokens.background : tokens.textMuted,
                  fontSize: 14,
                  letterSpacing: 0.14,
                  fontWeight: '500',
                }}
              >
                All
              </Text>
            </TouchableOpacity>
            {predefinedAreas.map((area) => (
              <TouchableOpacity
                key={area}
                onPress={() => setSelectedArea(area === selectedArea ? null : area)}
                style={{
                  backgroundColor: area === selectedArea ? tokens.accent : tokens.surface,
                  borderWidth: area === selectedArea ? 0 : 1,
                  borderColor: tokens.borderMuted,
                  borderRadius: 9999,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  marginRight: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: area === selectedArea ? tokens.background : tokens.textMuted,
                    fontSize: 14,
                    letterSpacing: 0.14,
                    fontWeight: '500',
                  }}
                >
                  {area}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </FadeInView>

        {selectedArea && (
          <FadeInView index={3}>
            <View style={{ backgroundColor: tokens.accentMuted, borderWidth: 1, borderColor: tokens.borderAccent, borderRadius: 8 }}
              className="px-5 py-3 mb-4 flex-row items-center"
            >
              <Feather name="bookmark" size={16} color={tokens.accent} />
              <Text style={{ color: tokens.accent, fontSize: 14, letterSpacing: 0.14, fontWeight: '500' }} className="ml-2">
                Plans for: {selectedArea}
              </Text>
            </View>
          </FadeInView>
        )}

        {filtered.length === 0 ? (
          <View className="items-center py-16">
            <Feather name="list" size={48} color={tokens.textMuted} style={{ opacity: 0.5 }} />
            <Text style={{ color: tokens.textMuted, fontSize: 18, letterSpacing: 0.18, opacity: 0.6 }} className="mt-4">No plans for this area yet</Text>
            <Text style={{ color: tokens.textMuted, fontSize: 14, letterSpacing: 0.14, opacity: 0.4 }} className="mt-1">More plans coming soon</Text>
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
                    borderRadius: 8,
                    padding: 32,
                  }}
                  className="active:opacity-80"
                >
                  <View className="flex-row items-start justify-between mb-2">
                    <Text style={{ color: tokens.text, fontSize: 18, letterSpacing: 0.18, fontWeight: '500' }} className="flex-1 mr-3">{plan.title}</Text>
                    <View style={{ borderRadius: 8, backgroundColor: tokens.accentMuted }}
                      className="px-3 py-1.5 flex-row items-center"
                    >
                      <Feather name="clock" size={12} color={tokens.accent} />
                      <Text style={{ color: tokens.accent, fontSize: 14, letterSpacing: 0.14, fontWeight: '700' }} className="ml-1">{plan.duration}d</Text>
                    </View>
                  </View>
                  <Text style={{ color: tokens.textMuted, fontSize: 14, letterSpacing: 0.14, opacity: 0.7 }} className="mb-3 leading-5">{plan.desc}</Text>
                  <View className="flex-row items-center mb-3">
                    <ProgressBar progress={plan.progress} total={plan.duration} />
                    <Text style={{ color: tokens.textMuted, fontSize: 14, letterSpacing: 0.14, opacity: 0.5 }}>
                      {plan.progress}/{plan.duration}
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <View style={{ borderRadius: 9999, borderWidth: 1, borderColor: tokens.borderMuted, backgroundColor: tokens.surface }}
                      className="px-3 py-1"
                    >
                      <Text style={{ color: tokens.textMuted, fontSize: 14, letterSpacing: 0.14, opacity: 0.6 }}>{plan.area}</Text>
                    </View>
                    <Button title={plan.progress > 0 ? 'Continue' : 'Start Plan'} onPress={() => {}} variant="ghost" size="sm" />
                  </View>
                </TouchableOpacity>
              </FadeInView>
            ))}
          </View>
        )}
      </ScrollView>
    </ScreenShell>
  );
}
