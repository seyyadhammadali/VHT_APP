// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from './src/screens/HomeScreen';
import SplashScreen from './src/screens/SplashScreen';
// import TabNavigation from './src/navigation/TabNavigation';
// import TopDestination from './src/screens/TopDestination';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Tabs" component={TabNavigation} /> */}
        {/* <Stack.Screen name="TopDestination" component={TopDestination}/> */}
        <Stack.Screen name="Splash" component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
