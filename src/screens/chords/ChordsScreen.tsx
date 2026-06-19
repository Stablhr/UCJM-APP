import { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../styles/ThemeContext';
import GradientBackground from '../../components/GradientBackground';
import ScreenHeader from '../../components/ScreenHeader';
import Button from '../../components/Button';
import FadeInView from '../../components/FadeInView';

const sampleSongs = [
  { id: '1', title: 'Way Maker', artist: 'Sinach', key: 'C', category: 'Praise' },
  { id: '2', title: 'What a Beautiful Name', artist: 'Hillsong Worship', key: 'D', category: 'Worship' },
  { id: '3', title: 'Goodness of God', artist: 'Bethel Music', key: 'G', category: 'Worship' },
  { id: '4', title: '10,000 Reasons', artist: 'Matt Redman', key: 'G', category: 'Praise' },
  { id: '5', title: 'Oceans (Where Feet May Fail)', artist: 'Hillsong United', key: 'D', category: 'Worship' },
  { id: '6', title: 'Who You Say I Am', artist: 'Hillsong Worship', key: 'G', category: 'Worship' },
  { id: '7', title: 'Build My Life', artist: 'Pat Barrett', key: 'E', category: 'Worship' },
  { id: '8', title: 'Graves Into Gardens', artist: 'Elevation Worship', key: 'C', category: 'Praise' },
  { id: '9', title: 'Great Are You Lord', artist: 'All Sons & Daughters', key: 'D', category: 'Worship' },
  { id: '10', title: 'Jireh', artist: 'Elevation Worship', key: 'A', category: 'Worship' },
];

export default function ChordsScreen() {
  const { tokens } = useTheme();
  const [search, setSearch] = useState('');
  const [selectedSong, setSelectedSong] = useState<typeof sampleSongs[0] | null>(null);

  const filtered = search
    ? sampleSongs.filter(
        (s) =>
          s.title.toLowerCase().includes(search.toLowerCase()) ||
          s.artist.toLowerCase().includes(search.toLowerCase())
      )
    : sampleSongs;

  if (selectedSong) {
    return (
      <GradientBackground>
        <ScreenHeader
          title={selectedSong.title}
          subtitle={`${selectedSong.artist} · Key of ${selectedSong.key}`}
          showBack
          rightAction={
            <Button
              title="Transpose"
              onPress={() => {}}
              variant="ghost"
              size="sm"
            />
          }
        />
        <ScrollView contentContainerClassName="px-5 pb-24">
          <FadeInView>
            <View style={{ backgroundColor: tokens.surface, borderWidth: 1, borderColor: tokens.border, borderRadius: 24 }}
              className="p-6"
            >
              <Text style={{ color: tokens.text }} className="font-mono text-base leading-8">
                {`[${selectedSong.key}] ${selectedSong.title}\n\n`}
                {`[${selectedSong.key}] Amazing grace [G]how sweet the sound\n`}
                {`[D]That saved a wretch like [G]me\n`}
                {`[${selectedSong.key}] I once was lost [G]but now I'm found\n`}
                {`[D]Was blind but now I [G]see\n\n`}
                {`—sample chord chart—`}
              </Text>
            </View>
          </FadeInView>

          <FadeInView index={1}>
            <View style={{ backgroundColor: tokens.accentMuted, borderWidth: 1, borderColor: tokens.borderAccent, borderRadius: 16 }}
              className="p-4 mt-4 flex-row items-center"
            >
              <Feather name="info" size={16} color={tokens.accent} />
              <Text style={{ color: tokens.textMuted }} className="text-sm ml-2 flex-1">
                Full chord charts will be available when connected to your song database.
              </Text>
            </View>
          </FadeInView>
        </ScrollView>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <ScreenHeader title="Chord Library" subtitle="Worship songs & lyrics" />
      <ScrollView contentContainerClassName="px-5 pb-24">
        <FadeInView index={0}>
          <View className="relative mb-6">
            <Feather name="search" size={18} color={tokens.textMuted} style={{ position: 'absolute', left: 16, top: 14, zIndex: 1, opacity: 0.5 }} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search songs or artists..."
              placeholderTextColor={tokens.textMuted + '60'}
              style={{
                backgroundColor: tokens.surface,
                borderWidth: 1,
                borderColor: tokens.border,
                borderRadius: 16,
                paddingLeft: 44,
                paddingRight: 16,
                paddingVertical: 14,
                color: tokens.text,
                fontSize: 16,
              }}
            />
          </View>
        </FadeInView>

        {filtered.length === 0 ? (
          <View className="items-center py-16">
            <Feather name="music" size={48} color={tokens.textMuted} style={{ opacity: 0.5 }} />
            <Text style={{ color: tokens.textMuted, opacity: 0.6 }} className="text-base mt-4">No songs found</Text>
            <Text style={{ color: tokens.textMuted, opacity: 0.4 }} className="text-sm mt-1">Try a different search term</Text>
          </View>
        ) : (
          <View className="gap-3">
            {filtered.map((song, i) => (
              <FadeInView key={song.id} index={i + 1}>
                <TouchableOpacity
                  onPress={() => setSelectedSong(song)}
                  style={{
                    backgroundColor: tokens.surface,
                    borderWidth: 1,
                    borderColor: tokens.border,
                    borderRadius: 16,
                    padding: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  className="active:opacity-80"
                >
                  <View style={{ backgroundColor: tokens.accentMuted, borderRadius: 12 }}
                    className="w-12 h-12 items-center justify-center mr-4"
                  >
                    <Feather name="music" size={22} color={tokens.accent} />
                  </View>
                  <View className="flex-1">
                    <Text style={{ color: tokens.text }} className="text-base font-semibold">{song.title}</Text>
                    <Text style={{ color: tokens.textMuted, opacity: 0.7 }} className="text-sm">{song.artist}</Text>
                  </View>
                  <View className="items-end">
                    <Text style={{ color: tokens.accent }} className="text-sm font-bold">{song.key}</Text>
                    <Text style={{ color: tokens.textMuted, opacity: 0.4 }} className="text-xs">{song.category}</Text>
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
