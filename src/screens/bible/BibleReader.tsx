import { useState } from 'react';
import { View, Text, TextInput, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import GradientBackground from '../../components/GradientBackground';
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
      <ScrollView contentContainerClassName="px-5 pt-14 pb-8">
        <Text className="text-white text-2xl font-bold mb-6">Bible Reader</Text>

        <TouchableOpacity
          onPress={() => setShowBookPicker(!showBookPicker)}
          className="bg-sky-deep/60 border border-sky-day/30 rounded-xl px-4 py-3 mb-3"
        >
          <Text className="text-sky-light text-sm mb-1">Book</Text>
          <Text className="text-white text-base">{book}</Text>
        </TouchableOpacity>

        {showBookPicker && (
          <View className="bg-sky-deep border border-sky-day/30 rounded-xl p-3 mb-3 max-h-60">
            <ScrollView>
              {books.map((b) => (
                <TouchableOpacity
                  key={b}
                  onPress={() => { setBook(b); setShowBookPicker(false); }}
                  className={`py-2 px-3 rounded-lg ${b === book ? 'bg-sky-sunrise/20' : ''}`}
                >
                  <Text className={`${b === book ? 'text-sky-sunrise' : 'text-white'}`}>{b}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <View className="flex-row gap-3 mb-4">
          <View className="flex-1">
            <Text className="text-sky-light text-sm mb-1">Chapter</Text>
            <TextInput
              value={chapter}
              onChangeText={setChapter}
              keyboardType="number-pad"
              className="bg-sky-deep/60 border border-sky-day/30 rounded-xl px-4 py-3 text-white"
            />
          </View>
          <View className="flex-1">
            <Text className="text-sky-light text-sm mb-1">Verse</Text>
            <TextInput
              value={verse}
              onChangeText={setVerse}
              keyboardType="number-pad"
              className="bg-sky-deep/60 border border-sky-day/30 rounded-xl px-4 py-3 text-white"
            />
          </View>
        </View>

        <View className="flex-row gap-3 mb-6">
          <Button title="Get Verse" onPress={fetchVerse} variant="primary" className="flex-1" disabled={loading} />
          <Button title="Get Chapter" onPress={fetchChapter} variant="secondary" className="flex-1" disabled={loading} />
        </View>

        {loading && <ActivityIndicator size="large" color="#FFC857" />}

        {error ? (
          <Text className="text-sunset text-center">{error}</Text>
        ) : null}

        {content ? (
          <View className="bg-sky-deep/80 border border-sky-day/20 rounded-2xl p-5">
            <Text className="text-sky-sunrise text-lg font-bold mb-2">
              {book} {chapter}:{verse}
            </Text>
            <Text className="text-white text-base leading-7">{content}</Text>
          </View>
        ) : null}
      </ScrollView>
    </GradientBackground>
  );
}
