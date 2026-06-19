import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/lib/auth';
import AppNavigator from './src/app/navigator';
import { ThemeProvider } from './src/styles/ThemeContext';
import {
  useFonts,
  Anton_400Regular,
} from '@expo-google-fonts/anton';
import {
  View,
  ActivityIndicator,
  Text,
} from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    Anton_400Regular,
    'Aileron-Regular': require('./assets/fonts/Aileron-Regular.otf'),
    'Aileron-Bold': require('./assets/fonts/Aileron-Bold.otf'),
    'Aileron-SemiBold': require('./assets/fonts/Aileron-SemiBold.otf'),
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center" style={{ backgroundColor: '#f0f0eb' }}>
        <ActivityIndicator size="large" color="#111110" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
