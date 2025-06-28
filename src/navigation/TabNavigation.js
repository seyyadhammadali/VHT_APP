import React, {useEffect} from 'react';
import { Image, View, StyleSheet,StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import Specialoffer from '../screens/Specialoffer';
import ReviewScreen from '../screens/ReviewScreen';
import Messages from '../screens/Messages';
const Tab = createBottomTabNavigator();
export default function TabNavigation({route}) {
    const navigation = useNavigation();
  const currentRoute = useRoute();
    const initialRoute = route?.params?.screen || 'Home';
  return (
    <Tab.Navigator
      lazy={false}
        initialRouteName={initialRoute} 
        screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 0,
          left: 10,
          right: 10,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          height:80,
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
          marginTop:4
        },
        tabBarBackground: () => (
       <View style={{ flex: 1, backgroundColor: 'transparent', borderRadius: 0,marginBottom:40 }} />
),
        tabBarActiveTintColor: '#C28D3E',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused }) => {
          let iconSource;
          let label;
          if (route.name === 'Home') {
            iconSource = focused
              ? require('../assets/images/whiteHome.png')
              : require('../assets/images/home.png');
          } else if (route.name === 'Special offer') {
            iconSource = focused
              ? require('../assets/images/specialOfferWhite.png')
              : require('../assets/images/specialOffer.png');
          } else if (route.name === 'Review') {
            iconSource = focused
              ? require('../assets/images/reviewWhite.png')
              : require('../assets/images/review.png');
          } 
          else if (route.name === 'Messages') {
            iconSource = focused
              ? require('../assets/images/Messages.png')
              : require('../assets/images/Messages.png');
          }
          return (
            <View
      style={[
        styles.iconContainer,
        focused && styles.iconContainerFocused
      ]}>
            <Image
              source={iconSource}
              style={styles.tabIcon}
              resizeMode="contain"
            />
            </View>
          );
        },
      })} >
      <Tab.Screen name="Home" component={HomeScreen}  />
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
  },
  iconContainer: {
    width: 65, 
    height: 35,
    borderRadius: 10, 
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerFocused: {
    backgroundColor: '#C28D3E', 
  },
});
