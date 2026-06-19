import { useState } from 'react';
import { View, Text, TextInput, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import GradientBackground from '../../components/GradientBackground';
import ScreenHeader from '../../components/ScreenHeader';
import Button from '../../components/Button';

const BIBLE_API_BASE = 'https://bible.helloao.org/api';

const books = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth',
  '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra',
  'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon',
  'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
  'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',
  'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians',
  'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
  '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter',
  '1 John', '2 John', '3 John', 'Jude', 'Revelation',
];

export default function BibleReader() {
  const [book, setBook] = useState('John');
  const [chapter, setChapter] = useState('3');
  const [verse, setVerse] = useState('16');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showBookPicker, setShowBookPicker] = useState(false);

  const fetchVerse = async () => {
    setLoading(true);
    setError('');
    setContent('');
    try {
      const ref = `${book}+${chapter}:${verse}`;
      const res = await fetch(`${BIBLE_API_BASE}/${encodeURIComponent(ref)}?translation=bsb`);
      const data = await res.json();
      if (data.text) {
        setContent(data.text);
      } else {
        setError('Verse not found. Check the reference.');
      }
    } catch {
      setError('Failed to load. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const fetchChapter = async () => {
    setLoading(true);
    setError('');
    setContent('');
    try {
      const ref = `${book}+${chapter}`;
      const res = await fetch(`${BIBLE_API_BASE}/${encodeURIComponent(ref)}?translation=bsb`);
      const data = await res.json();
      if (data.text) {
        setContent(data.text);
      } else {
        setError('Chapter not found.');
      }
    } catch {
      setError('Failed to load. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground>
      <ScreenHeader title="Bible Reader" subtitle="Search a passage" />
      <ScrollView contentContainerClassName="px-5 pb-8">
        <TouchableOpacity
          onPress={() => setShowBookPicker(!showBookPicker)}
          className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 mb-3 active:bg-white/10"
        >
          <Text className="text-sky-day/60 text-xs mb-1 font-medium">BOOK</Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-white text-lg font-semibold">{book}</Text>
            <Feather name={showBookPicker ? 'chevron-up' : 'chevron-down'} size={20} color="#FFC857" />
          </View>
        </TouchableOpacity>

        {showBookPicker && (
          <View className="bg-sky-deep border border-white/10 rounded-2xl p-3 mb-3 max-h-64">
            <ScrollView showsVerticalScrollIndicator={false}>
              {books.map((b) => (
                <TouchableOpacity
                  key={b}
                  onPress={() => { setBook(b); setShowBookPicker(false); }}
                  className={`py-2.5 px-4 rounded-xl flex-row items-center ${b === book ? 'bg-sky-sunrise/15' : ''}`}
                >
                  <Text className={`flex-1 ${b === book ? 'text-sky-sunrise font-semibold' : 'text-white/80'}`}>{b}</Text>
                  {b === book && <Feather name="check" size={16} color="#FFC857" />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <View className="flex-row gap-3 mb-4">
          <View className="flex-1">
            <Text className="text-sky-day/60 text-xs mb-1.5 font-medium">CHAPTER</Text>
            <TextInput
              value={chapter}
              onChangeText={setChapter}
              keyboardType="number-pad"
              className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-lg font-semibold"
            />
          </View>
          <View className="flex-1">
            <Text className="text-sky-day/60 text-xs mb-1.5 font-medium">VERSE</Text>
            <TextInput
              value={verse}
              onChangeText={setVerse}
              keyboardType="number-pad"
              className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-lg font-semibold"
            />
          </View>
        </View>

        <View className="flex-row gap-3 mb-6">
          <Button title="Get Verse" onPress={fetchVerse} variant="primary" className="flex-1" disabled={loading} />
          <Button title="Get Chapter" onPress={fetchChapter} variant="outline" className="flex-1" disabled={loading} />
        </View>

        {loading && (
          <View className="py-12 items-center">
            <ActivityIndicator size="large" color="#FFC857" />
            <Text className="text-sky-day/60 text-sm mt-3">Loading scripture...</Text>
          </View>
        )}

        {error ? (
          <View className="bg-sunset/10 border border-sunset/30 rounded-2xl p-5 flex-row items-center">
            <Feather name="alert-circle" size={18} color="#E74C3C" />
            <Text className="text-sunset ml-3 flex-1">{error}</Text>
          </View>
        ) : null}

        {content ? (
          <View className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <View className="flex-row items-center mb-4 pb-4 border-b border-white/5">
              <View className="w-10 h-10 rounded-xl bg-sky-sunrise/15 items-center justify-center mr-3">
                <Feather name="book-open" size={20} color="#FFC857" />
              </View>
              <View>
                <Text className="text-sky-sunrise text-lg font-bold">
                  {book} {chapter}:{verse}
                </Text>
                <Text className="text-sky-day/50 text-xs">BSB Translation</Text>
              </View>
            </View>
            <Text className="text-white/90 text-base leading-8">{content}</Text>
          </View>
        ) : null}
      </ScrollView>
    </GradientBackground>
  );
}
