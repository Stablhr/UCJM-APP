import { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import GradientBackground from '../../components/GradientBackground';
import ScreenHeader from '../../components/ScreenHeader';
import Button from '../../components/Button';

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
        <ScrollView contentContainerClassName="px-5 pb-8">
          <View className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <Text className="text-white font-mono text-base leading-8">
              {`[${selectedSong.key}] ${selectedSong.title}\n\n`}
              {`[${selectedSong.key}] Amazing grace [G]how sweet the sound\n`}
              {`[D]That saved a wretch like [G]me\n`}
              {`[${selectedSong.key}] I once was lost [G]but now I'm found\n`}
              {`[D]Was blind but now I [G]see\n\n`}
              {`—sample chord chart—`}
            </Text>
          </View>

          <View className="bg-sky-sunrise/10 border border-sky-sunrise/20 rounded-2xl p-4 mt-4 flex-row items-center">
            <Text className="text-lg mr-2">💡</Text>
            <Text className="text-sky-day text-sm flex-1">
              Full chord charts will be available when connected to your song database.
            </Text>
          </View>
        </ScrollView>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <ScreenHeader title="Chord Library" subtitle="Worship songs & lyrics" />
      <ScrollView contentContainerClassName="px-5 pb-8">
        <View className="relative mb-6">
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search songs or artists..."
            placeholderTextColor="#87CEEB60"
            className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-white text-base"
          />
          <Text className="absolute left-4 top-3.5 text-sky-day/50 text-lg">🔍</Text>
        </View>

        {filtered.length === 0 ? (
          <View className="items-center py-16">
            <Text className="text-5xl mb-4">🎵</Text>
            <Text className="text-sky-day/60 text-base">No songs found</Text>
            <Text className="text-sky-day/40 text-sm mt-1">Try a different search term</Text>
          </View>
        ) : (
          <View className="gap-3">
            {filtered.map((song) => (
              <TouchableOpacity
                key={song.id}
                onPress={() => setSelectedSong(song)}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 active:bg-white/10 flex-row items-center"
              >
                <View className="w-12 h-12 rounded-xl bg-sky-sunrise/15 items-center justify-center mr-4">
                  <Text className="text-sky-sunrise text-xl">♫</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-white text-base font-semibold">{song.title}</Text>
                  <Text className="text-sky-day/70 text-sm">{song.artist}</Text>
                </View>
                <View className="items-end">
                  <Text className="text-sky-sunrise text-sm font-bold">{song.key}</Text>
                  <Text className="text-sky-day/40 text-xs">{song.category}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </GradientBackground>
  );
}
