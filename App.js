import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

import Me from './MeScreen/Me';
import Home from './Post/Home';
import ChatHome from './MessageScreen/ChatHome';
import History from './BasicScreens/History';
import Login from './BasicScreens/Login';
import RegisterScreen from './BasicScreens/Register';

import { useEffect, useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

function Overview() {
  const [fontsLoaded] = useFonts({
    'Fasthand-Regular': require('./assets/fonts/Fasthand-Regular.ttf'),
    'Larissa': require('./assets/fonts/Larissa.ttf'),
    'MilkyHoney': require('./assets/fonts/MilkyHoney.otf')
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="Home" component={Home} />
      <BottomTabs.Screen name="History" component={History} />
      <BottomTabs.Screen name="Message" component={ChatHome} />
      <BottomTabs.Screen name="Me" component={Me} />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
          <Stack.Screen name="ExpensesOverview" component={Overview} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

