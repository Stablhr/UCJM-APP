import { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../styles/ThemeContext';
import { useAuth } from '../../lib/auth';
import ScreenShell from '../../components/ScreenShell';
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
    <ScreenShell>
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
                width: 88,
                height: 88,
                borderRadius: 8,
                backgroundColor: tokens.surface,
                borderWidth: 1,
                borderColor: tokens.border,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
              }}
            >
              <Feather name="feather" size={40} color={tokens.text} />
            </View>
            <Text
              style={{ color: tokens.text, fontSize: 40, fontFamily: 'Anton_400Regular', letterSpacing: 0.4 }}
            >
              UCJM
            </Text>
            <Text style={{ color: tokens.textMuted, fontSize: 18, letterSpacing: 0.18, textAlign: 'center', maxWidth: 280, marginTop: 4 }}>
              Unity In Christ Jesus Ministries
            </Text>
          </View>

          <View style={{
            backgroundColor: tokens.surface,
            borderWidth: 1,
            borderColor: tokens.border,
            borderRadius: 8,
            padding: 32,
            marginBottom: 24,
          }}>
            <View style={{ flexDirection: 'row', marginBottom: 24, borderBottomWidth: 1, paddingBottom: 0, borderBottomColor: tokens.borderMuted }}>
              <TouchableOpacity
                onPress={() => { setMode('login'); setError(''); }}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  borderBottomWidth: mode === 'login' ? 1 : 0,
                  borderBottomColor: tokens.accent,
                }}
              >
                <Text
                  style={{
                    color: mode === 'login' ? tokens.accent : tokens.textMuted,
                    textAlign: 'center',
                    fontSize: 14,
                    letterSpacing: 0.14,
                    fontWeight: '500',
                  }}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { setMode('register'); setError(''); }}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  borderBottomWidth: mode === 'register' ? 1 : 0,
                  borderBottomColor: tokens.accent,
                }}
              >
                <Text
                  style={{
                    color: mode === 'register' ? tokens.accent : tokens.textMuted,
                    textAlign: 'center',
                    fontSize: 14,
                    letterSpacing: 0.14,
                    fontWeight: '500',
                  }}
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
              <View style={{ backgroundColor: tokens.errorBg, borderWidth: 1, borderColor: tokens.errorBorder, borderRadius: 8 }}
                className="px-4 py-3 mb-4 flex-row items-center"
              >
                <Feather name="alert-circle" size={16} color={tokens.error} />
                <Text style={{ color: tokens.error, fontSize: 14, letterSpacing: 0.14 }} className="ml-2 flex-1">{error}</Text>
              </View>
            ) : null}

            <Button
              title={mode === 'login' ? 'Sign In' : 'Create Account'}
              onPress={handleEmailAuth}
              loading={loading}
              className="mb-4"
            />

            <View className="flex-row items-center mb-4">
              <View style={{ flex: 1, height: 1, backgroundColor: tokens.borderMuted }} />
              <Text style={{ color: tokens.textMuted, fontSize: 14, letterSpacing: 0.14, opacity: 0.5 }} className="mx-3">OR CONTINUE WITH</Text>
              <View style={{ flex: 1, height: 1, backgroundColor: tokens.borderMuted }} />
            </View>

            <View className="flex-row gap-3">
              <Button
                title="Google"
                onPress={() => handleOAuth('google')}
                variant="outline"
                className="flex-1"
                icon={<Feather name="globe" size={16} color={tokens.textMuted} />}
                disabled={loading}
              />
              <Button
                title="Apple"
                onPress={() => handleOAuth('apple')}
                variant="outline"
                className="flex-1"
                icon={<Feather name="smartphone" size={16} color={tokens.textMuted} />}
                disabled={loading}
              />
              <Button
                title=""
                onPress={() => handleOAuth('facebook')}
                variant="outline"
                className="w-12"
                icon={<Text style={{ color: tokens.textMuted, fontWeight: '700' }} className="text-base">f</Text>}
                disabled={loading}
              />
            </View>
          </View>

          <Text style={{ color: tokens.textMuted, fontSize: 14, letterSpacing: 0.14, opacity: 0.4, textAlign: 'center' }} className="max-w-xs self-center leading-5">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenShell>
  );
}
