// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from './src/screens/SplashScreen';
// import TabNavigation from './src/navigation/TabNavigation';
// import ReviewScreen from './src/screens/ReviewScreen';
import TopDestination from './src/screens/TopDestination';
import PackagesCatalog from './src/screens/PackagesCatalog';
import HotelCatalog from './src/screens/HotelCatalog';
import MulticenterDeals from './src/screens/MulticenterDeals';
import MaldivesPackages from './src/screens/MaldivesPackages';
// import ExclusiveDeals from './src/screens/SpecialOffersjs';
import PakageDetails from './src/screens/PakageDetails';
import Reviews from './src/screens/Reviews';
import Inquire from './src/screens/Inquire';
import Blogs from './src/screens/Blogs';
import SubmitEnquiry from './src/screens/submitEnquiry';
import ContactUs from './src/screens/ContactUs';
import AboutUs from './src/screens/AboutUs';
import Disclaimer from './src/screens/Disclaimer';
import TopComments from './src/screens/TopComments';
import TermsAndConditions from './src/screens/TermsAndConditions';
import Notifications from './src/screens/Notifications';
import FAQs from './src/screens/FAQs';
import DrawerNavigation from './src/navigation/DrawerNavigation';
const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator 
       initialRouteName="MainApp" 
      screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
           <Stack.Screen name="MainApp" component={DrawerNavigation} />
        <Stack.Screen name='PakageDetails' component={PakageDetails}/>
    {/* <Stack.Screen name='ExclusiveDeals' component={ExclusiveDeals}/>  */}
     <Stack.Screen name="PackagesCatalog" component={PackagesCatalog}/>
     <Stack.Screen name="HotelCatalog" component={HotelCatalog}/>
     <Stack.Screen name='MulticenterDeals' component={MulticenterDeals}/>
     <Stack.Screen name="TopDestination" component={TopDestination}/>
      {/* <Stack.Screen name="MaldivesPackages" component={MaldivesPackages}/>  */}
       {/* <Stack.Screen name="Tabs" component={TabNavigation} />  */}
       {/* <Stack.Screen name="Reviews" component={Reviews}/> */}
       {/* <Stack.Screen name='Inquire' component={Inquire}/> */}
       <Stack.Screen name="SubmitEnquiry" component={SubmitEnquiry}/>
  
      
       <Stack.Screen name='TopComments' component={TopComments}/>
       <Stack.Screen name='Notifications' component={Notifications}/>
       {/* <Stack.Screen name='FAQs' component={FAQs}/> */}
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}


 {/* <Stack.Screen name='AboutUs' component={AboutUs}/> */}
       {/* <Stack.Screen name='Disclaimer' component={Disclaimer}/> */}
       {/* <Stack.Screen name='Blogs' component={Blogs}/> */}
       {/* <Stack.Screen name='TermsAndConditions' component={TermsAndConditions}/> */}