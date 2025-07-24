// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from './src/screens/SplashScreen';
import TopDestination from './src/screens/TopDestination';
import HolidayHotList from './src/screens/HolidayHotList';
import HotelCatalog from './src/screens/HotelCatalog';
import MulticenterDeals from './src/screens/MulticenterDeals';
import MaldivesPackages from './src/screens/MaldivesPackages';
import PakageDetails from './src/screens/PakageDetails';
import Inquire from './src/screens/Inquire';
import SubmitEnquiry from './src/screens/submitEnquiry';
import TopComments from './src/screens/TopComments';
import Notifications from './src/screens/Notifications';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import { store } from './src/redux/store';
import TabNavigation from './src/navigation/TabNavigation';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
      <Provider store={store}>
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator 
       initialRouteName="MainApp" 
      screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainApp" component={DrawerNavigation} />
       <Stack.Screen name='PakageDetails' component={PakageDetails}/>
       <Stack.Screen name="SplashScreen" component={SplashScreen} />
       <Stack.Screen name="HolidayHotList" component={HolidayHotList}/>
       <Stack.Screen name="HotelCatalog" component={HotelCatalog}/>
       <Stack.Screen name='MulticenterDeals' component={MulticenterDeals}/>
       <Stack.Screen name="TopDestination" component={TopDestination}/>
       <Stack.Screen name="SubmitEnquiry" component={SubmitEnquiry}/>
       <Stack.Screen name='TopComments' component={TopComments}/>
       <Stack.Screen name='Notifications' component={Notifications}/>
         <Stack.Screen name="TabNavigation" component={TabNavigation} /> 




       {/* <Stack.Screen name='ExclusiveDeals' component={ExclusiveDeals}/>  */}
          {/* <Stack.Screen name="MaldivesPackages" component={MaldivesPackages}/>  */}
       {/* <Stack.Screen name="Tabs" component={TabNavigation} />  */}
       {/* <Stack.Screen name='Inquire' component={Inquire}/> */}
    
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
    </Provider>
  );
}
