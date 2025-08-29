// import React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// import TabNavigation from './TabNavigation';
// import FAQs from '../screens/FAQs';
// import Blogs from '../screens/Blogs';
// import ContactUs from '../screens/ContactUs';
// import TermsAndConditions from '../screens/TermsAndConditions';
// import Disclaimer from '../screens/Disclaimer';
// import AboutUs from '../screens/AboutUs';
// import TopDestination from '../screens/TopDestination';
// import CustomDrawerContent from './CustomDrawerContent';
// import Cruise from '../screens/Cruise';
// import Safari from '../screens/Safari';
// import HomeScreen from '../screens/HomeScreen';
// import PrivacyPolicy from '../screens/PrivacyPolicy';
// import colors from '../constants/colors';
// const Drawer = createDrawerNavigator();

// export default function DrawerNavigation() {
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         headerShown: false,
//         drawerActiveTintColor: '#C28D3E',
//         drawerLabelStyle: { fontSize: 16 },
//         swipeEnabled: false, // Disable swipe gesture
//         drawerType: 'front', // Faster open/close
//       }}
//       drawerContent={props => <CustomDrawerContent {...props} />}
//     >
//        <Drawer.Screen name="Home" component={TabNavigation} />
//      {/* <Drawer.Screen name="Home" component={TabNavigation} />
//       <Drawer.Screen name="Home2" component={HomeScreen} /> */}
//       <Drawer.Screen name='Destinations' component={TopDestination}/>
//       <Drawer.Screen name='Safari' component={Safari}/>
//       <Drawer.Screen name='Cruise' component={Cruise}/>
//       <Drawer.Screen name="Blogs" component={Blogs} />
//       <Drawer.Screen name="FAQs" component={FAQs} />
//       <Drawer.Screen name='About Us'component={AboutUs}/>
//       <Drawer.Screen name='Privacy Policy' component={PrivacyPolicy}/>
//       <Drawer.Screen name='Terms & Conditions' component={TermsAndConditions}/>
//       <Drawer.Screen name='Disclaimer' component={Disclaimer}/>
//       <Drawer.Screen name="Contact Us" component={ContactUs} />
//     </Drawer.Navigator>
//   );
// }
// DrawerNavigation.js
// src/navigation/DrawerNavigation.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import CustomDrawerContent from './CustomDrawerContent'; // Assuming you have this
import TabNavigation from './TabNavigation';
import MaldivesPackages from '../old_screens/MaldivesPackages';
import TopComments from '../old_screens/TopComments';
import { navigationRef } from './navigationRef';
import Notifications from '../old_screens/Notifications';
import FAQs from '../old_screens/FAQs';
import Blogs from '../old_screens/Blogs';
import ContactUs from '../old_screens/ContactUs';
import TermsAndConditions from '../old_screens/TermsAndConditions';
import Disclaimer from '../old_screens/Disclaimer';
import AboutUs from '../old_screens/AboutUs';
import TopDestination from '../old_screens/TopDestination';
import SubmitEnquiry from '../old_screens/submitEnquiry';
import Cruise from '../old_screens/Cruise';
import Safari from '../old_screens/Safari';
import HomeScreen from '../old_screens/HomeScreen';
import PrivacyPolicy from '../old_screens/PrivacyPolicy';
import colors from '../constants/colors';
import HolidayHotList from '../old_screens/HolidayHotList';
import MulticenterDeals from '../old_screens/MulticenterDeals';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
   {/* <Stack.Screen name="HomeScreen" component={HomeScreen}/> */}
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
      <Stack.Screen name="MaldivesPackages" component={MaldivesPackages} />
       <Stack.Screen name="TopComments" component={TopComments} />
       <Stack.Screen name="Notifications" component={Notifications} />
       <Stack.Screen name="SubmitEnquiry" component={SubmitEnquiry} />
        <Stack.Screen name="HolidayHotList" component={HolidayHotList} />
         <Stack.Screen name="MulticenterDeals" component={MulticenterDeals} />
         <Stack.Screen name="TopDestination" component={TopDestination} />
      {/* Add other stack screens here if needed */}
    </Stack.Navigator>
  );
}
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      id="ddrawer"
      screenOptions={{ headerShown: false }}
      drawerContent={props => <CustomDrawerContent {...props} />} >
      <Drawer.Screen name="Home" component={MainStack} options={{ headerShown: false }} />
      <Drawer.Screen name='Destinations' component={TopDestination}/>
      <Drawer.Screen name='Safari' component={Safari}/>
      <Drawer.Screen name='Cruise' component={Cruise}/>
      <Drawer.Screen name="Blogs" component={Blogs} />
      <Drawer.Screen name="FAQs" component={FAQs} />
      <Drawer.Screen name='About Us' component={AboutUs}/>
      <Drawer.Screen name='Privacy Policy' component={PrivacyPolicy}/>
      <Drawer.Screen name='Terms & Conditions' component={TermsAndConditions}/>
      <Drawer.Screen name='Disclaimer' component={Disclaimer}/>
      <Drawer.Screen name="Contact Us" component={ContactUs} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigation;