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
import CustomDrawerContent from './CustomDrawerContent'; // Assuming you have this
import TabNavigation from './TabNavigation'; // <-- Import your TabNavigation
import { navigationRef } from './navigationRef';

import FAQs from '../screens/FAQs';
import Blogs from '../screens/Blogs';
import ContactUs from '../screens/ContactUs';
import TermsAndConditions from '../screens/TermsAndConditions';
import Disclaimer from '../screens/Disclaimer';
import AboutUs from '../screens/AboutUs';
import TopDestination from '../screens/TopDestination';

import Cruise from '../screens/Cruise';
import Safari from '../screens/Safari';
import HomeScreen from '../screens/HomeScreen';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import colors from '../constants/colors';


const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  console.log("navigation pr");
  
  return (
    // <Drawer.Navigator
    //   initialRouteName="TabNavigation" // The initial screen in the drawer is the Tab Navigator
    //   drawerContent={(props) => <CustomDrawerContent {...props} />}
    //   screenOptions={{ headerShown: false }}
    // >
     <Drawer.Navigator
     id="ddrawer"
      screenOptions={{ headerShown: false }}
//       initialRouteName="TabNavigation"
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//       screenOptions={{ headerShown: false }}
    >
      {/* The main content of your app is the Tab Navigator */}
   
      <Drawer.Screen name="TabNavigation" component={TabNavigation} />

       {/* <Drawer.Screen name="Home2" component={HomeScreen} /> */} 
       <Drawer.Screen name='Destinations' component={TopDestination}/>
       <Drawer.Screen name='Safari' component={Safari}/>
       <Drawer.Screen name='Cruise' component={Cruise}/>
       <Drawer.Screen name="Blogs" component={Blogs} />
       <Drawer.Screen name="FAQs" component={FAQs} />
       <Drawer.Screen name='About Us'component={AboutUs}/>
       <Drawer.Screen name='Privacy Policy' component={PrivacyPolicy}/>
       <Drawer.Screen name='Terms & Conditions' component={TermsAndConditions}/>
       <Drawer.Screen name='Disclaimer' component={Disclaimer}/>
       <Drawer.Screen name="Contact Us" component={ContactUs} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;