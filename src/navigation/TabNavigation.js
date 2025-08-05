// import React, {useEffect} from 'react';
// import { Image, View, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import HomeScreen from '../screens/HomeScreen';
// import SpecialOffers from '../screens/Specialoffer';
// import Reviews from '../screens/Reviews';
// import Messages from '../screens/Messages';
// import FastImage from 'react-native-fast-image';
// const Tab = createBottomTabNavigator();
// export default function TabNavigation({route}) {
//     const navigation = useNavigation();
//   const currentRoute = useRoute();
//     const initialRoute = route?.params?.screen || 'Home';
//   return (
//     <Tab.Navigator
//       lazy={false}
//         initialRouteName={initialRoute} 
//         screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarHideOnKeyboard: true,
//         tabBarStyle: {
//           backgroundColor: 'white',
//           position: 'absolute',
//           bottom: 0,
//           left: 10,
//           right: 10,
//           borderTopLeftRadius: 0,
//           borderTopRightRadius: 0,
//           // Responsive height: 9% of screen height, min 60, max 100
//           height: Math.max(60, Math.min(100, Math.round(Dimensions.get('window').height * 0.09))),
//           elevation: 5,
//           shadowColor: '#000',
//           shadowOffset: { width: 0, height: 2 },
//           shadowOpacity: 0.1,
//           shadowRadius: 4, 
//           paddingBottom: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0,
//           paddingHorizontal:0,
//         },
//         tabBarLabelStyle: {
//           fontSize: 12,
//           marginTop:6
//         },
//         tabBarBackground: () => (
//        <View style={{ flex: 1, backgroundColor: 'transparent', borderRadius: 0,marginBottom:10 }} />
// ),
//         tabBarActiveTintColor: '#C28D3E',
//         tabBarInactiveTintColor: 'gray',
//         tabBarIcon: ({ focused }) => {
//           let iconSource;
//           let label;
//           if (route.name === 'Home') {
//             iconSource = focused
//               ? require('../assets/images/whiteInquiry.png')
//               : require('../assets/images/inquiry.png');
//           } else if (route.name === 'SpecialOffers') {
//             iconSource = focused
//               ? require('../assets/images/specialOfferWhite.png')
//               : require('../assets/images/specialOffer.png');
//           } else if (route.name === 'Review') {
//             iconSource = focused
//               ? require('../assets/images/reviewWhite.png')
//               : require('../assets/images/reviewIcon.png');
//           } 
//           else if (route.name === 'LiveChat') {
//             iconSource = focused
//               ? require('../assets/images/WhhiteLiveChat.png')
//               : require('../assets/images/blackLiveChat.png');
//           }
//           return (
//             <View
//       style={[
//         styles.iconContainer,
//         focused && styles.iconContainerFocused
//       ]}>
//             <FastImage
//               source={iconSource}
//               style={styles.tabIcon}
//               resizeMode="contain"
//             />
//             </View>
//           );
//         },
//       })} >
//       <Tab.Screen name="Home" component={HomeScreen}   options={{ tabBarShowLabel: false }}/>
//       <Tab.Screen name="SpecialOffers" component={SpecialOffers} />
//       <Tab.Screen name="LiveChat" component={Messages} />
//       <Tab.Screen name="Review" component={Reviews} />
//     </Tab.Navigator>
//   );
// }
// const styles = StyleSheet.create({
//   tabIcon: {
//     width: 24,
//     height: 24,
//   },
//   iconContainer: {
//     width: 65, 
//     height: 35,
//     borderRadius: 10, 
//     backgroundColor: 'transparent',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   iconContainerFocused: {
//     backgroundColor: '#C28D3E', 
//     marginTop:6
//   },
// });
// TabNavigation.js
// import React from 'react';
// import { Image, View, StyleSheet, StatusBar, Dimensions, Platform, TouchableOpacity } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import { useNavigation } from '@react-navigation/native';
// import HomeScreen from '../screens/HomeScreen';
// import SpecialOffers from '../screens/Specialoffer';
// import Reviews from '../screens/Reviews';
// import Messages from '../screens/Messages';
// import FastImage from 'react-native-fast-image';

// // Import the hamburger menu icon
// import MenuIcon from '../assets/images/menu.png';
// //  <FastImage source={require('../assets/images/menu.png')} style={styles.menuIcon} />
// const Tab = createBottomTabNavigator();
// const HomeStack = createStackNavigator();

// // A Stack Navigator specifically for the Home Screen
// const HomeStackScreen = () => {
//   const navigation = useNavigation();

//   return (
//     <HomeStack.Navigator>
//       <HomeStack.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           headerShown: true, // Show the header for the home screen
//           title: '', // Empty title
//           headerLeft: () => (
//             <TouchableOpacity
//               onPress={() => navigation.openDrawer()}
//               style={styles.menuButton}
//             >
//               <Image source={MenuIcon} style={styles.menuIcon} />
//             </TouchableOpacity>
//           ),
//           headerStyle: {
//             backgroundColor: 'white',
//             elevation: 0, // Remove shadow on Android
//             shadowOpacity: 0, // Remove shadow on iOS
//             height: Platform.OS === 'ios' ? 100 : 60, // Adjust header height
//           },
//         }}
//       />
//     </HomeStack.Navigator>
//   );
// };

// export default function TabNavigation({ route }) {
//   const initialRoute = route?.params?.screen || 'HomeStack';

//   return (
//     <Tab.Navigator
//       lazy={false}
//       initialRouteName={initialRoute}
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarHideOnKeyboard: true,
//         tabBarStyle: {
//           backgroundColor: 'white',
//           position: 'absolute',
//           bottom: 0,
//           left: 10,
//           right: 10,
//           borderTopLeftRadius: 0,
//           borderTopRightRadius: 0,
//           height: Math.max(60, Math.min(100, Math.round(Dimensions.get('window').height * 0.09))),
//           elevation: 5,
//           shadowColor: '#000',
//           shadowOffset: { width: 0, height: 2 },
//           shadowOpacity: 0.1,
//           shadowRadius: 4,
//           paddingBottom: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0,
//           paddingHorizontal: 0,
//         },
//         tabBarLabelStyle: {
//           fontSize: 12,
//           marginTop: 6,
//         },
//         tabBarBackground: () => (
//           <View style={{ flex: 1, backgroundColor: 'transparent', borderRadius: 0, marginBottom: 10 }} />
//         ),
//         tabBarActiveTintColor: '#C28D3E',
//         tabBarInactiveTintColor: 'gray',
//         tabBarIcon: ({ focused }) => {
//           let iconSource;
//           if (route.name === 'HomeStack') { // Use the stack navigator name
//             iconSource = focused
//               ? require('../assets/images/whiteInquiry.png')
//               : require('../assets/images/inquiry.png');
//           } else if (route.name === 'SpecialOffers') {
//             iconSource = focused
//               ? require('../assets/images/specialOfferWhite.png')
//               : require('../assets/images/specialOffer.png');
//           } else if (route.name === 'Review') {
//             iconSource = focused
//               ? require('../assets/images/reviewWhite.png')
//               : require('../assets/images/reviewIcon.png');
//           }
//           else if (route.name === 'LiveChat') {
//             iconSource = focused
//               ? require('../assets/images/WhhiteLiveChat.png')
//               : require('../assets/images/blackLiveChat.png');
//           }
//           return (
//             <View
//               style={[
//                 styles.iconContainer,
//                 focused && styles.iconContainerFocused
//               ]}>
//               <FastImage
//                 source={iconSource}
//                 style={styles.tabIcon}
//                 resizeMode="contain"
//               />
//             </View>
//           );
//         },
//       })} >
//       <Tab.Screen name="HomeStack" component={HomeStackScreen} options={{ tabBarShowLabel: false }} />
//       <Tab.Screen name="SpecialOffers" component={SpecialOffers} />
//       <Tab.Screen name="LiveChat" component={Messages} />
//       <Tab.Screen name="Review" component={Reviews} />
//     </Tab.Navigator>
//   );
// }

// const styles = StyleSheet.create({
//   tabIcon: {
//     width: 24,
//     height: 24,
//   },
//   iconContainer: {
//     width: 65,
//     height: 35,
//     borderRadius: 10,
//     backgroundColor: 'transparent',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   iconContainerFocused: {
//     backgroundColor: '#C28D3E',
//     marginTop: 6,
//   },
//   menuButton: {
//     marginLeft: 15,
//   },
//   menuIcon: {
//     width: 24,
//     height: 24,
//     tintColor: '#000', // You can change the color
//   },
// });

// TabNavigation


// TabNavigation.js
import React from 'react';
import { Image, View, StyleSheet, StatusBar, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SpecialOffers from '../screens/Specialoffer';
import Reviews from '../screens/Reviews';
import Messages from '../screens/Messages';
import InquiryScreen from '../screens/Inquire'; // Assuming this is your Inquiry screen
import CustomTabBar from './CustomTabBar'; // <-- Import the custom tab bar

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator
            initialRouteName="Home" // <-- Home is the initial route, but the tab is hidden
            tabBar={(props) => <CustomTabBar {...props} />} // <-- Use the custom tab bar
            screenOptions={{ headerShown: false, tabBarShowLabel: false }}
        >
            {/* This is the hidden screen for the initial "no tab selected" state */}
            <Tab.Screen name="Home" component={HomeScreen} />

            {/* These are the four visible tabs */}
            <Tab.Screen name="Inquire" component={InquiryScreen} />
            <Tab.Screen name="SpecialOffers" component={SpecialOffers} />
            <Tab.Screen name="LiveChat" component={Messages} />
            <Tab.Screen name="Review" component={Reviews} />
        </Tab.Navigator>
    );
}

// ... your styles remain the same but are no longer needed for the tab bar itself
// as the logic is now in CustomTabBar.js
// import React from 'react';
// import { Image, View, StyleSheet, StatusBar, Dimensions, Platform, TouchableOpacity } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import { useNavigation } from '@react-navigation/native';
// import HomeScreen from '../screens/HomeScreen';
// import SpecialOffers from '../screens/Specialoffer';
// import Reviews from '../screens/Reviews';
// import Messages from '../screens/Messages';
// import FastImage from 'react-native-fast-image';

// // Import the hamburger menu icon
// import MenuIcon from '../assets/images/menu.png';

// const Tab = createBottomTabNavigator();
// const HomeStack = createStackNavigator();

// // A Stack Navigator specifically for the Home Screen
// const HomeStackScreen = () => {
//   const navigation = useNavigation();

//   return (
//     <HomeStack.Navigator>
//       <HomeStack.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           headerShown: false, // <-- This is the key change to remove the white space
//         }}
//       />
//     </HomeStack.Navigator>
//   );
// };

// export default function TabNavigation() {
//   return (
//     <Tab.Navigator
//       initialRouteName="HomeStack"
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarHideOnKeyboard: true,
//         tabBarStyle: {
//           backgroundColor: 'white',
//           position: 'absolute',
//           bottom: 0,
//           left: 10,
//           right: 10,
//           borderTopLeftRadius: 0,
//           borderTopRightRadius: 0,
//           height: Math.max(60, Math.min(100, Math.round(Dimensions.get('window').height * 0.09))),
//           elevation: 5,
//           shadowColor: '#000',
//           shadowOffset: { width: 0, height: 2 },
//           shadowOpacity: 0.1,
//           shadowRadius: 4,
//           paddingBottom: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0,
//           paddingHorizontal: 0,
//         },
//         tabBarLabelStyle: {
//           fontSize: 12,
//           marginTop: 6,
//         },
//         tabBarBackground: () => (
//           <View style={{ flex: 1, backgroundColor: 'transparent', borderRadius: 0, marginBottom: 10 }} />
//         ),
//         tabBarActiveTintColor: '#C28D3E',
//         tabBarInactiveTintColor: 'gray',
//         tabBarIcon: ({ focused }) => {
//           let iconSource;
//           let focusedIconSource;

//           if (route.name === 'SpecialOffers') {
//             iconSource = require('../assets/images/specialOffer.png');
//             focusedIconSource = require('../assets/images/specialOfferWhite.png');
//           } else if (route.name === 'Review') {
//             iconSource = require('../assets/images/reviewIcon.png');
//             focusedIconSource = require('../assets/images/reviewWhite.png');
//           } else if (route.name === 'LiveChat') {
//             iconSource = require('../assets/images/blackLiveChat.png');
//             focusedIconSource = require('../assets/images/WhhiteLiveChat.png');
//           }

//           if (!iconSource) return null; // Avoid rendering for HomeStack

//           return (
//             <View
//               style={[
//                 styles.iconContainer,
//                 focused && styles.iconContainerFocused
//               ]}>
//               <FastImage
//                 source={focused ? focusedIconSource : iconSource}
//                 style={styles.tabIcon}
//                 resizeMode="contain"
//               />
//             </View>
//           );
//         },
//         tabBarButton: (props) => {
//           if (route.name === 'HomeStack') {
//             return null;
//           }
//           return <TouchableOpacity {...props} />;
//         },
//       })} >
//       <Tab.Screen name="HomeStack" component={HomeStackScreen} options={{ tabBarShowLabel: false }} />
//       <Tab.Screen name="SpecialOffers" component={SpecialOffers} />
//       <Tab.Screen name="LiveChat" component={Messages} />
//       <Tab.Screen name="Review" component={Reviews} />
//     </Tab.Navigator>
//   );
// }

// const styles = StyleSheet.create({
//   tabIcon: {
//     width: 24,
//     height: 24,
//   },
//   iconContainer: {
//     width: 65,
//     height: 35,
//     borderRadius: 10,
//     backgroundColor: 'transparent',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   iconContainerFocused: {
//     backgroundColor: '#C28D3E',
//     marginTop: 6,
//   },
// });