import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigation from './TabNavigation';
import FAQs from '../screens/FAQs';
import Blogs from '../screens/Blogs';
import ContactUs from '../screens/ContactUs';
import TermsAndConditions from '../screens/TermsAndConditions';
import Disclaimer from '../screens/Disclaimer';
import AboutUs from '../screens/AboutUs';
import TopDestination from '../screens/TopDestination';
import CustomDrawerContent from './CustomDrawerContent';
import Cruise from '../screens/Cruise';
import Safari from '../screens/Safari';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#C28D3E',
        drawerLabelStyle: { fontSize: 16 },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name='Home' component={TabNavigation} />
      <Drawer.Screen name='Destination' component={TopDestination}/>
      <Drawer.Screen name='Safari' component={Safari}/>
      <Drawer.Screen name='Cruise' component={Cruise}/>
      <Drawer.Screen name="Blogs" component={Blogs} />
      <Drawer.Screen name="FAQs" component={FAQs} />
      <Drawer.Screen name='AboutUs' component={AboutUs}/>
      <Drawer.Screen name='Privacy Policy' component={TermsAndConditions}/>
      <Drawer.Screen name='Terms & Conditions' component={TermsAndConditions}/>
      <Drawer.Screen name='Disclaimer' component={Disclaimer}/>
      <Drawer.Screen name="ContactUs" component={ContactUs} />

      
    </Drawer.Navigator>
  );
}
