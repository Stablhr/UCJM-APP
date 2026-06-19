import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../lib/auth';
import { isSupabaseConfigured } from '../lib/supabase';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from '../styles/ThemeContext';
import AuthScreen from '../screens/auth/AuthScreen';
import HomeScreen from '../screens/home/HomeScreen';
import BibleReader from '../screens/bible/BibleReader';
import PlansScreen from '../screens/plans/PlansScreen';
import ChordsScreen from '../screens/chords/ChordsScreen';
import GroupsScreen from '../screens/groups/GroupsScreen';

export type RootStackParamList = {
  Home: undefined;
  Bible: undefined;
  Plans: undefined;
  Chords: undefined;
  Groups: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function MainNavigator() {
  const { tokens, isDark } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: tokens.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Bible" component={BibleReader} />
      <Stack.Screen name="Plans" component={PlansScreen} />
      <Stack.Screen name="Chords" component={ChordsScreen} />
      <Stack.Screen name="Groups" component={GroupsScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { user, loading } = useAuth();
  const { tokens } = useTheme();

  if (loading) {
    return (
      <View
        style={{ backgroundColor: tokens.background }}
        className="flex-1 items-center justify-center"
      >
        <ActivityIndicator size="large" color={tokens.accent} />
      </View>
    );
  }

  const showMain = !!user || !isSupabaseConfigured;

  return (
    <NavigationContainer>
      {showMain ? <MainNavigator /> : <AuthScreen />}
    </NavigationContainer>
  );
}
