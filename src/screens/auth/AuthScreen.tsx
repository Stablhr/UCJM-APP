import { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../lib/auth';
import GradientBackground from '../../components/GradientBackground';
import Button from '../../components/Button';
import Input from '../../components/Input';

type Mode = 'login' | 'register';

export default function AuthScreen() {
  const { signInWithOAuth, signInWithEmail, signUpWithEmail } = useAuth();
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
          contentContainerClassName="flex-grow justify-center px-6 py-12"
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center mb-12">
            <View className="w-24 h-24 rounded-3xl bg-sky-sunrise/15 border border-sky-sunrise/30 items-center justify-center mb-5">
              <Feather name="feather" size={36} color="#FFC857" />
            </View>
            <Text className="text-5xl font-bold text-sky-sunrise tracking-tight mb-2">
              UCJM
            </Text>
            <Text className="text-base text-sky-day/80 text-center max-w-xs leading-6">
              Unity In Christ Jesus Ministries
            </Text>
          </View>

          <View className="bg-white/5 rounded-3xl border border-white/10 p-6 mb-6">
            <View className="flex-row mb-6 bg-sky-night/40 rounded-xl p-1">
              <TouchableOpacity
                onPress={() => { setMode('login'); setError(''); }}
                className={`flex-1 py-2.5 rounded-lg ${mode === 'login' ? 'bg-sky-sunrise' : ''}`}
              >
                <Text className={`text-center font-semibold text-sm ${mode === 'login' ? 'text-sky-night' : 'text-sky-day/60'}`}>
                  Sign In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { setMode('register'); setError(''); }}
                className={`flex-1 py-2.5 rounded-lg ${mode === 'register' ? 'bg-sky-sunrise' : ''}`}
              >
                <Text className={`text-center font-semibold text-sm ${mode === 'register' ? 'text-sky-night' : 'text-sky-day/60'}`}>
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
              <View className="bg-sunset/10 border border-sunset/30 rounded-xl px-4 py-3 mb-4 flex-row items-center">
                <Feather name="alert-circle" size={16} color="#E74C3C" />
                <Text className="text-sunset text-sm ml-2 flex-1">{error}</Text>
              </View>
            ) : null}

            <Button
              title={mode === 'login' ? 'Sign In' : 'Create Account'}
              onPress={handleEmailAuth}
              loading={loading}
              className="mb-4"
            />

            <View className="flex-row items-center mb-4">
              <View className="flex-1 h-px bg-white/10" />
              <Text className="text-sky-day/50 text-xs mx-3 font-medium">OR CONTINUE WITH</Text>
              <View className="flex-1 h-px bg-white/10" />
            </View>

            <View className="flex-row gap-3">
              <Button
                title="Google"
                onPress={() => handleOAuth('google')}
                variant="secondary"
                className="flex-1"
                icon={<Feather name="globe" size={16} color="#87CEEB" />}
                disabled={loading}
              />
              <Button
                title="Apple"
                onPress={() => handleOAuth('apple')}
                variant="secondary"
                className="flex-1"
                icon={<Feather name="smartphone" size={16} color="#87CEEB" />}
                disabled={loading}
              />
              <Button
                title=""
                onPress={() => handleOAuth('facebook')}
                variant="secondary"
                className="w-12"
                icon={<Text className="text-white font-bold text-base">f</Text>}
                disabled={loading}
              />
            </View>
          </View>

          <Text className="text-center text-sky-day/40 text-xs max-w-xs self-center leading-5">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}
