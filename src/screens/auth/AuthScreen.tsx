import { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../styles/ThemeContext';
import { useAuth } from '../../lib/auth';
import GradientBackground from '../../components/GradientBackground';
import Button from '../../components/Button';
import Input from '../../components/Input';

type Mode = 'login' | 'register';

export default function AuthScreen() {
  const { signInWithOAuth, signInWithEmail, signUpWithEmail } = useAuth();
  const { tokens, isDark } = useTheme();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailAuth = async () => {
    setLoading(true);
    setError('');
    try {
      if (mode === 'login') {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
    } catch (e: any) {
      setError(e.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'apple' | 'facebook') => {
    setLoading(true);
    setError('');
    try {
      await signInWithOAuth(provider);
    } catch (e: any) {
      setError(e.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="flex-grow justify-center px-6 py-12"
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center mb-12">
            <View
              style={{
                backgroundColor: tokens.accentMuted,
                borderWidth: 1,
                borderColor: tokens.borderAccent,
                borderRadius: 24,
              }}
              className="w-24 h-24 items-center justify-center mb-5"
            >
              <Feather name="feather" size={36} color={tokens.accent} />
            </View>
            <Text style={{ color: tokens.accent }} className="text-5xl font-bold tracking-tight mb-2">
              UCJM
            </Text>
            <Text style={{ color: tokens.textMuted }} className="text-base text-center max-w-xs leading-6">
              Unity In Christ Jesus Ministries
            </Text>
          </View>

          <View style={{
            backgroundColor: tokens.surface,
            borderWidth: 1,
            borderColor: tokens.border,
            borderRadius: 24,
            padding: 24,
            marginBottom: 24,
          }}>
            <View style={{ backgroundColor: tokens.background, borderRadius: 12 }}
              className="flex-row mb-6 p-1"
            >
              <TouchableOpacity
                onPress={() => { setMode('login'); setError(''); }}
                className={`flex-1 py-2.5 rounded-lg ${mode === 'login' ? '' : ''}`}
                style={mode === 'login' ? { backgroundColor: tokens.accent } : {}}
              >
                <Text
                  style={{ color: mode === 'login' ? tokens.background : tokens.textMuted + '99' }}
                  className="text-center font-semibold text-sm"
                >
                  Sign In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { setMode('register'); setError(''); }}
                className={`flex-1 py-2.5 rounded-lg ${mode === 'register' ? '' : ''}`}
                style={mode === 'register' ? { backgroundColor: tokens.accent } : {}}
              >
                <Text
                  style={{ color: mode === 'register' ? tokens.background : tokens.textMuted + '99' }}
                  className="text-center font-semibold text-sm"
                >
                  Register
                </Text>
              </TouchableOpacity>
            </View>

            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="you@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
              autoCapitalize="none"
            />

            {error ? (
              <View style={{ backgroundColor: tokens.errorBg, borderWidth: 1, borderColor: tokens.errorBorder, borderRadius: 12 }}
                className="px-4 py-3 mb-4 flex-row items-center"
              >
                <Feather name="alert-circle" size={16} color={tokens.error} />
                <Text style={{ color: tokens.error }} className="text-sm ml-2 flex-1">{error}</Text>
              </View>
            ) : null}

            <Button
              title={mode === 'login' ? 'Sign In' : 'Create Account'}
              onPress={handleEmailAuth}
              loading={loading}
              className="mb-4"
            />

            <View className="flex-row items-center mb-4">
              <View style={{ flex: 1, height: 1, backgroundColor: tokens.border }} />
              <Text style={{ color: tokens.textMuted, opacity: 0.5 }} className="text-xs mx-3 font-medium">OR CONTINUE WITH</Text>
              <View style={{ flex: 1, height: 1, backgroundColor: tokens.border }} />
            </View>

            <View className="flex-row gap-3">
              <Button
                title="Google"
                onPress={() => handleOAuth('google')}
                variant="secondary"
                className="flex-1"
                icon={<Feather name="globe" size={16} color={tokens.textMuted} />}
                disabled={loading}
              />
              <Button
                title="Apple"
                onPress={() => handleOAuth('apple')}
                variant="secondary"
                className="flex-1"
                icon={<Feather name="smartphone" size={16} color={tokens.textMuted} />}
                disabled={loading}
              />
              <Button
                title=""
                onPress={() => handleOAuth('facebook')}
                variant="secondary"
                className="w-12"
                icon={<Text style={{ color: tokens.textMuted }} className="font-bold text-base">f</Text>}
                disabled={loading}
              />
            </View>
          </View>

          <Text style={{ color: tokens.textMuted, opacity: 0.4 }} className="text-xs text-center max-w-xs self-center leading-5">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}
