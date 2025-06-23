// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SplashScreen from './src/screens/SplashScreen';
import TabNavigation from './src/navigation/TabNavigation';
// import ReviewScreen from './src/screens/ReviewScreen';
import TopDestination from './src/screens/TopDestination';
import PackagesCatalog from './src/screens/PackagesCatalog';
import HotelCatalog from './src/screens/HotelCatalog';
import MulticenterDeals from './src/screens/MulticenterDeals';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabs" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabNavigation} />
        <Stack.Screen name="TopDestination" component={TopDestination}/>
        <Stack.Screen name="PackagesCatalog" component={PackagesCatalog}/>
        <Stack.Screen name="HotelCatalog" component={HotelCatalog}/>
        <Stack.Screen name='MulticenterDeals' component={MulticenterDeals}/>
        {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

