import { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import GradientBackground from '../../components/GradientBackground';

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
        <ScrollView contentContainerClassName="px-5 pt-14 pb-8">
          <TouchableOpacity onPress={() => setSelectedSong(null)} className="mb-4">
            <Text className="text-sky-sunrise text-base">← Back to Library</Text>
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold">{selectedSong.title}</Text>
          <Text className="text-sky-day text-lg mb-1">{selectedSong.artist}</Text>
          <Text className="text-sky-light text-sm mb-6">Key: {selectedSong.key}</Text>

          <View className="bg-sky-deep/80 border border-sky-day/20 rounded-2xl p-5">
            <Text className="text-white font-mono text-base leading-8">
              {`[${selectedSong.key}] ${selectedSong.title}\n\n`}
              {`[${selectedSong.key}] Amazing grace [G]how sweet the sound\n`}
              {`[D]That saved a wretch like [G]me\n`}
              {`[${selectedSong.key}] I once was lost [G]but now I'm found\n`}
              {`[D]Was blind but now I [G]see\n\n`}
              {`—sample chord chart—`}
            </Text>
          </View>
        </ScrollView>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <ScrollView contentContainerClassName="px-5 pt-14 pb-8">
        <Text className="text-white text-2xl font-bold mb-6">Chord & Lyrics Library</Text>

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search songs or artists..."
          placeholderTextColor="#87CEEB"
          className="bg-sky-deep/60 border border-sky-day/30 rounded-xl px-4 py-3 text-white text-base mb-6"
        />

        <View className="gap-3">
          {filtered.map((song) => (
            <TouchableOpacity
              key={song.id}
              onPress={() => setSelectedSong(song)}
              className="bg-sky-deep/60 border border-sky-day/20 rounded-2xl p-4 active:bg-sky-deep flex-row items-center"
            >
              <View className="w-10 h-10 rounded-full bg-sky-sunrise/20 items-center justify-center mr-4">
                <Text className="text-sky-sunrise text-lg">♫</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white text-base font-semibold">{song.title}</Text>
                <Text className="text-sky-day text-sm">{song.artist}</Text>
              </View>
              <View className="items-end">
                <Text className="text-sky-sunrise text-sm font-semibold">{song.key}</Text>
                <Text className="text-gray-400 text-xs">{song.category}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </GradientBackground>
  );
}
