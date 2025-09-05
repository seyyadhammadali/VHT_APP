import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen  from './src/screens/HomeScreen';
import DrawerProvider from "./src/components/DrawerProvider";
import store  from './src/redux/store';
import Notifications from './src/screens/Notifications';
import GlobalFont from 'react-native-global-font';
import Destinations from './src/screens/Destinations';
import HolidayHotlist from './src/screens/HolidayHotlist';
import CategoryScreen from './src/screens/CategoryScreen';
import LiveSupport from './src/screens/LiveSupport';
import StaticPage from './src/screens/StaticPage';
import FAQs from './src/screens/FAQs';
import ContactUs from './src/screens/ContactUs';
import Inquire from './src/screens/Inquire';
import QuoteForm from './src/screens/QuoteForm';
import Reviews from './src/screens/Reviews';
import SpecialOffers from './src/screens/SpecialOffers';
// import SplashScreen from './src/screens/SplashScreen';
// import TopDestination from './src/screens/TopDestination';
// import HolidayHotList from './src/screens/HolidayHotList';
// import MulticenterDeals from './src/screens/MulticenterDeals';
// import MaldivesPackages from './src/screens/MaldivesPackages';
// import PakageDetails from './src/screens/PakageDetails';
// import Inquire from './src/screens/Inquire';
// import HomeScreen from './src/screens/HomeScreen';
// import SubmitEnquiry from './src/screens/submitEnquiry';
// import TopComments from './src/screens/TopComments';
// 
// 
// import SearchScreen from './src/screens/SearchScreen';
// import Specialoffer from './src/screens/Specialoffer';
// import Messages from './src/screens/Messages';
// import Reviews from './src/screens/Reviews';
// import Safari from './src/screens/Safari';
// import Cruise from './src/screens/Cruise'
// import Blogs from './src/screens/Blogs';
// 
// import AboutUs from './src/screens/AboutUs';
// import PrivacyPolicy from './src/screens/PrivacyPolicy';
// import TermsAndConditions from './src/screens/TermsAndConditions';
// import ContactUs from './src/screens/ContactUs';
// import Disclaimer from './src/screens/Disclaimer';
// import NoInternetMessage from './src/components/NoInternetMessage';
// import messaging from '@react-native-firebase/messaging';
// import ErrorFoundScreen from './src/screens/ErrorFoundScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  console.log("App Render:", new Date().toUTCString());
  useEffect(() => {
    GlobalFont.applyGlobal('Inter-Regular');
  }, []);
  return (
    <Provider store={store}>
      <GestureHandlerRootView >
        <NavigationContainer >
          <DrawerProvider >
          <Stack.Navigator
            // initialRouteName="HomeScreen" 
            screenOptions={{ headerShown: false }}
            >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="Destinations" component={Destinations} />
            <Stack.Screen name="HolidayHotlist" component={HolidayHotlist} />
            <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
            <Stack.Screen name="StaticPage" component={StaticPage} />
            <Stack.Screen name="LiveSupport" component={LiveSupport} />
            <Stack.Screen name="FAQs" component={FAQs} />
            <Stack.Screen name="ContactUs" component={ContactUs} />
            <Stack.Screen name="Inquire" component={Inquire} />
            <Stack.Screen name="QuoteForm" component={QuoteForm} />
            <Stack.Screen name="Reviews" component={Reviews} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="SpecialOffers" component={SpecialOffers} />
            
          </Stack.Navigator>
          </DrawerProvider>
        </NavigationContainer>
       </GestureHandlerRootView>
     </Provider>
  );
}
//            <Stack.Screen name="Notifications" component={Notifications} />
//            <Stack.Screen name="SplashScreen" component={SplashScreen} />
//             <Stack.Screen name="NoInternetMessage" component={NoInternetMessage} />
//             
//             <Stack.Screen name="MaldivesPackages" component={MaldivesPackages} />
//             <Stack.Screen name="PakageDetails" component={PakageDetails} />
//             <Stack.Screen name="HolidayHotList" component={HolidayHotList} />
//             <Stack.Screen name="MulticenterDeals" component={MulticenterDeals} />
//             <Stack.Screen name="TopDestination" component={TopDestination} />
//             <Stack.Screen name="SubmitEnquiry" component={SubmitEnquiry} />
//             <Stack.Screen name="TopComments" component={TopComments} />
//             
//             <Stack.Screen name="SearchScreen" component={SearchScreen} />
//             <Stack.Screen name="Inquire" component={Inquire} /> 
//             <Stack.Screen name="SpecialOffer" component={Specialoffer}/>
//             <Stack.Screen name="Messages" component={Messages}/>
//             <Stack.Screen name="Reviews" component={Reviews}/>
//             <Stack.Screen name="Safari" component={Safari}/>
//             <Stack.Screen name="Cruise" component={Cruise}/>
//             <Stack.Screen name="Blogs" component={Blogs}/>
//             <Stack.Screen name="FAQs" component={FAQs}/>
//             <Stack.Screen name="AboutUs" component={AboutUs}/>
//             <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy}/>
//             <Stack.Screen name="TermsAndConditions" component={TermsAndConditions}/>
//             <Stack.Screen name="ContactUs" component={ContactUs}/>
//             <Stack.Screen name="Disclaimer" component={Disclaimer}/>
//             <Stack.Screen name='ErrorFoundScreen' component={ErrorFoundScreen}/>