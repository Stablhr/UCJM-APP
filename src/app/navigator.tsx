import { useAuth } from '../lib/auth';
import { View, Text, ActivityIndicator } from 'react-native';

export default function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-sky-night">
        <ActivityIndicator size="large" color="#FFC857" />
      </View>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  return <HomeScreen />;
}

function AuthScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-sky-night px-6">
      <Text className="text-3xl font-bold text-sky-sunrise mb-2">UCJM</Text>
      <Text className="text-lg text-sky-day mb-8 text-center">
        Unity In Christ Jesus Ministries
      </Text>
      <Text className="text-base text-gray-300 text-center">
        Sign in to start your daily reading journey
      </Text>
    </View>
  );
}

function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-sky-night">
      <Text className="text-2xl font-bold text-sky-sunrise">Welcome to UCJM</Text>
    </View>
  );
}
