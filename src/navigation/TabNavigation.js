import React, {useEffect} from 'react';
import { Image, View, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import SpecialOffers from '../screens/Specialoffer';
import Reviews from '../screens/Reviews';
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
          // Responsive height: 9% of screen height, min 60, max 100
          height: Math.max(60, Math.min(100, Math.round(Dimensions.get('window').height * 0.09))),
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4, 
          paddingBottom: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0,
          paddingHorizontal:0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop:6
        },
        tabBarBackground: () => (
       <View style={{ flex: 1, backgroundColor: 'transparent', borderRadius: 0,marginBottom:10 }} />
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
          } else if (route.name === 'SpecialOffers') {
            iconSource = focused
              ? require('../assets/images/specialOfferWhite.png')
              : require('../assets/images/specialOffer.png');
          } else if (route.name === 'Review') {
            iconSource = focused
              ? require('../assets/images/reviewWhite.png')
              : require('../assets/images/review.png');
          } 
          else if (route.name === 'LiveChat') {
            iconSource = focused
              ? require('../assets/images/whiteLiveChat.png')
              : require('../assets/images/blackLiveChat.png');
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
      <Tab.Screen name="SpecialOffers" component={SpecialOffers} />
      <Tab.Screen name="LiveChat" component={Messages} />
      <Tab.Screen name="Review" component={Reviews} />
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
    marginTop:6
  },
});
