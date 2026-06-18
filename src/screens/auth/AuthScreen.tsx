import { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
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
          <View className="items-center mb-10">
            <Text className="text-4xl font-bold text-sky-sunrise mb-2">UCJM</Text>
            <Text className="text-lg text-sky-day text-center">
              Unity In Christ Jesus Ministries
            </Text>
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
            <Text className="text-sunset text-sm text-center mb-4">{error}</Text>
          ) : null}

          <Button
            title={mode === 'login' ? 'Sign In' : 'Create Account'}
            onPress={handleEmailAuth}
            loading={loading}
            className="mb-4"
          />

          <Text className="text-sky-day text-center mb-4">or continue with</Text>

          <View className="flex-row gap-3 mb-6">
            <Button
              title="Google"
              onPress={() => handleOAuth('google')}
              variant="outline"
              className="flex-1"
              disabled={loading}
            />
            <Button
              title="Apple"
              onPress={() => handleOAuth('apple')}
              variant="outline"
              className="flex-1"
              disabled={loading}
            />
            <Button
              title="Facebook"
              onPress={() => handleOAuth('facebook')}
              variant="outline"
              className="flex-1"
              disabled={loading}
            />
          </View>

          <View className="flex-row justify-center">
            <Text className="text-sky-day">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            </Text>
            <Text
              className="text-sky-sunrise font-semibold"
              onPress={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}
