import React from 'react';
import { Image, View, StyleSheet,StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Specialoffer from '../screens/Specialoffer';
import ReviewScreen from '../screens/ReviewScreen';
import Messages from '../screens/Messages';
const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 0,
          left: 10,
          right: 10,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          height:60,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4, 
           paddingBottom: StatusBar.currentHeight + 0 || 0,
              paddingHorizontal:0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarBackground: () => (
       <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 0,marginBottom:80 }} />
),
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = focused
              ? require('../assets/images/home.png')
              : require('../assets/images/home.png');
          } else if (route.name === 'Special offer') {
            iconSource = focused
              ? require('../assets/images/specilaOfer.png')
              : require('../assets/images/specilaOfer.png');
          } else if (route.name === 'Review') {
            iconSource = focused
              ? require('../assets/images/review.png')
              : require('../assets/images/review.png');
          } 
          else if (route.name === 'Messages') {
            iconSource = focused
              ? require('../assets/images/message.png')
              : require('../assets/images/message.png');
          }

          return (
            <Image
              source={iconSource}
              style={styles.tabIcon}
              resizeMode="contain"
            />
          );
        },
      })} >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Special offer" component={Specialoffer} />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Review" component={ReviewScreen} />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  tabIcon: {
    width: 24,
    height: 24,
    // marginBottom:90
  },
});
