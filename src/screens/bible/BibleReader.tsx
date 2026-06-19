import { useState } from 'react';
import { View, Text, TextInput, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../styles/ThemeContext';
import ScreenShell from '../../components/ScreenShell';
import ScreenHeader from '../../components/ScreenHeader';
import Button from '../../components/Button';
import FadeInView from '../../components/FadeInView';

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
  const { tokens, isDark } = useTheme();
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
    <ScreenShell>
      <ScreenHeader title="Bible Reader" subtitle="Search a passage" />
      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-24 flex-grow">
        <TouchableOpacity
          onPress={() => setShowBookPicker(!showBookPicker)}
          style={{
            backgroundColor: tokens.surface,
            borderWidth: 1,
            borderColor: tokens.border,
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 14,
            marginBottom: 12,
          }}
          className="active:opacity-80"
        >
          <Text style={{ color: tokens.textMuted, fontSize: 14, letterSpacing: 0.14 }} className="mb-1">BOOK</Text>
          <View className="flex-row items-center justify-between">
            <Text style={{ color: tokens.text, fontSize: 18, letterSpacing: 0.18, fontWeight: '500' }}>{book}</Text>
            <Feather name={showBookPicker ? 'chevron-up' : 'chevron-down'} size={20} color={tokens.textMuted} />
          </View>
        </TouchableOpacity>

        {showBookPicker && (
          <View style={{
            backgroundColor: tokens.surface,
            borderWidth: 1,
            borderColor: tokens.border,
            borderRadius: 8,
            padding: 8,
            marginBottom: 12,
            maxHeight: 256,
          }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {books.map((b) => (
                <TouchableOpacity
                  key={b}
                  onPress={() => { setBook(b); setShowBookPicker(false); }}
                  className="py-2.5 px-4 flex-row items-center"
                  style={{ borderRadius: 8, backgroundColor: b === book ? tokens.accentMuted : 'transparent' }}
                >
                  <Text
                    style={{
                      color: b === book ? tokens.accent : tokens.text,
                      fontSize: 14,
                      letterSpacing: 0.14,
                      flex: 1,
                    }}
                  >
                    {b}
                  </Text>
                  {b === book && <Feather name="check" size={16} color={tokens.accent} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <View className="flex-row gap-3 mb-4">
          <View className="flex-1">
            <Text style={{ color: tokens.textMuted, fontSize: 14, letterSpacing: 0.14 }} className="mb-1.5">CHAPTER</Text>
            <TextInput
              value={chapter}
              onChangeText={setChapter}
              keyboardType="number-pad"
              style={{
                backgroundColor: isDark ? tokens.surface : tokens.background,
                borderWidth: 1,
                borderColor: tokens.borderMuted,
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 14,
                color: tokens.text,
                fontSize: 18,
                fontWeight: '500',
              }}
            />
          </View>
          <View className="flex-1">
            <Text style={{ color: tokens.textMuted, fontSize: 14, letterSpacing: 0.14 }} className="mb-1.5">VERSE</Text>
            <TextInput
              value={verse}
              onChangeText={setVerse}
              keyboardType="number-pad"
              style={{
                backgroundColor: isDark ? tokens.surface : tokens.background,
                borderWidth: 1,
                borderColor: tokens.borderMuted,
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 14,
                color: tokens.text,
                fontSize: 18,
                fontWeight: '500',
              }}
            />
          </View>
        </View>

        <View className="flex-row gap-3 mb-6">
          <Button title="Get Verse" onPress={fetchVerse} variant="primary" className="flex-1" disabled={loading} />
          <Button title="Get Chapter" onPress={fetchChapter} variant="outline" className="flex-1" disabled={loading} />
        </View>

        {loading && (
          <View className="py-12 items-center">
            <ActivityIndicator size="large" color={tokens.text} />
            <Text style={{ color: tokens.textMuted, fontSize: 14, letterSpacing: 0.14, opacity: 0.6 }} className="mt-3">Loading scripture...</Text>
          </View>
        )}

        {error ? (
          <FadeInView>
            <View style={{ backgroundColor: tokens.errorBg, borderWidth: 1, borderColor: tokens.errorBorder, borderRadius: 8 }}
              className="p-5 flex-row items-center"
            >
              <Feather name="alert-circle" size={18} color={tokens.error} />
              <Text style={{ color: tokens.error, fontSize: 14, letterSpacing: 0.14 }} className="ml-3 flex-1">{error}</Text>
            </View>
          </FadeInView>
        ) : null}

        {content ? (
          <FadeInView>
            <View style={{
              backgroundColor: tokens.surface,
              borderWidth: 1,
              borderColor: tokens.border,
              borderRadius: 8,
              padding: 32,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: tokens.borderMuted }}>
                <View style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: tokens.accentMuted, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                  <Feather name="book-open" size={20} color={tokens.accent} />
                </View>
                <View>
                  <Text style={{ color: tokens.text, fontSize: 18, letterSpacing: 0.18, fontWeight: '500' }}>
                    {book} {chapter}:{verse}
                  </Text>
                  <Text style={{ color: tokens.textMuted, fontSize: 14, letterSpacing: 0.14, opacity: 0.5 }}>BSB Translation</Text>
                </View>
              </View>
              <Text style={{ color: tokens.text, fontSize: 16, lineHeight: 28, opacity: 0.9 }}>{content}</Text>
            </View>
          </FadeInView>
        ) : null}
      </ScrollView>
    </ScreenShell>
  );
}
