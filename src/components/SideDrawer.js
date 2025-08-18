// import React, { useEffect, useRef, useState, useMemo } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Animated,
//   Dimensions,
//   Image,
//   ScrollView,
//   ImageBackground,
//   Linking,
//   ActivityIndicator
// } from 'react-native';
// import FastImage from 'react-native-fast-image';
// import InstagramIcon from '../assets/images/insta.png';
// import FacebookIcon from '../assets/images/fb.png';
// import PinterestIcon from '../assets/images/pinteret.png';
// import YouTubeIcon from '../assets/images/youtube.png';
// import TwitterIcon from '../assets/images/twitter.png';
// import CrossIcon from '../assets/images/cross.png';
// import Goldenarrow from '../assets/images/GoldenArrrow.svg';
// import BackGoldenArrow from '../assets/images/BackGoldenArrow.svg';
// import Logo from '../assets/images/Logo.png';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   selectAllDestinations,
//   allDestinationsStatus,
//   selectCountryDestinations
// } from '../redux/slices/destinationsSlice';
// import { fetchStaticData, selectStaticData } from '../redux/slices/StaticSlice';
 
// const { width, height } = Dimensions.get('window');
 
// const ICONS_TO_DISPLAY = [
//   { icon: InstagramIcon, label: 'Instagram' },
//   { icon: FacebookIcon, label: 'Facebook' },
//   { icon: PinterestIcon, label: 'Pinterest' },
//   { icon: YouTubeIcon, label: 'YouTube' },
//   { icon: TwitterIcon, label: 'Twitter' },
// ];
 
// export default function SideDrawer({ isOpen, onClose, navigation }) {
//   const staticData = useSelector(selectStaticData);
//   const socialLinks = ICONS_TO_DISPLAY.map(item => {
//     const url = staticData?.social_links?.[item.label.toLowerCase()];
//     return { ...item, url };
//   });
 
//   const [activeItem, setActiveItem] = useState(null);
//   const [activeItemName, setActiveItemName] = useState('');
//   const [isSubLoading, setIsSubLoading] = useState(false);
//   const [city, setCity] = useState(null);
 
//   const dispatch = useDispatch();
//   const country = useSelector(selectCountryDestinations);
//   const allDestinations = useSelector(selectAllDestinations);
//   const destinationsStatus = useSelector(allDestinationsStatus);
 
//   // Memoize menuItems
//   const menuItems = useMemo(
//     () => [
//       { name: 'Home', screen: 'HomeScreen' },
//       {
//         name: 'Destinations',
//         icon: Goldenarrow,
//         subItems: country.map(c => ({
//           name: c.name,
//           screen: 'TopDestination',
//           id: c.id,
//           subDestinations: allDestinations.data.filter(
//             dest => dest.parent === parseInt(c.id, 10)
//           ),
//         })),
//       },
//       { name: 'Safari', screen: 'Safari' },
//       { name: 'Cruise', screen: 'Cruise' },
//       { name: 'Blogs', screen: 'Blogs' },
//       { name: 'FAQs', screen: 'FAQs' },
//       { name: 'About Us', screen: 'AboutUs' },
//       { name: 'Privacy Policy', screen: 'PrivacyPolicy' },
//       { name: 'Terms & Conditions', screen: 'TermsAndConditions' },
//       { name: 'Disclaimer', screen: 'Disclaimer' },
//       { name: 'Contact us', screen: 'ContactUs' },
//     ],
//     [country, allDestinations]
//   );
 
//   useEffect(() => {
//     if (isOpen) {
//       dispatch(fetchStaticData());
//     }
//   }, [isOpen, dispatch]);
 
//   const fetchAndSetSubDestinations = async countryId => {
//     setIsSubLoading(true);
//     if (destinationsStatus === 'succeeded') {
//       const citydata = allDestinations.data.filter(dest => dest.parent === countryId);
//       setCity(citydata);
//       setIsSubLoading(false);
//     }
//   };
 
//   const handleMenuItemPress = item => {
//     if (item.name === 'Destinations') {
//       setActiveItem(item.name);
//     } else {
//       onClose();
//       if (item.screen) {
//         navigation.navigate(item.screen);
//       }
//     }
//   };
 
//   const handleSubItemPress = subItem => {
//     if (subItem.subDestinations.length > 0) {
//       setActiveItem('city');
//       setActiveItemName(subItem.name);
//       setCity(subItem.subDestinations);
//     } else {
//       onClose();
//       navigation.navigate(subItem.screen, { countryId: subItem.id });
//       setActiveItem(null);
//     }
//   };
 
//   const slideAnim = useRef(new Animated.Value(-width)).current;
//   useEffect(() => {
//     Animated.timing(slideAnim, {
//       toValue: isOpen ? 0 : -width,
//       duration: 300,
//       useNativeDriver: false, // translateX needs layout calculations
//     }).start();
//   }, [isOpen, slideAnim]);
 
//   if (!isOpen && slideAnim._value <= -width) return null;
 
//   return (
//     <>
//       <Animated.View
//         style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}
//       >
       
//         <TouchableOpacity style={styles.drawerMain} onPress={onClose} activeOpacity={1}>
//           <View style={styles.drawerBody}>
//           {/* Header */}
//           <ImageBackground
//             source={require('../assets/images/bg-header.webp')}
//             style={styles.drawerHeader}
//             resizeMode="cover"
//           >
//             <Image source={Logo} style={styles.logoStyle} />
//             <TouchableOpacity onPress={onClose} style={styles.closeButton}>
//               <Image source={CrossIcon} style={styles.crossImg} />
//             </TouchableOpacity>
//           </ImageBackground>
 
//           {/* Menu Items */}
//           <ScrollView>
//             {activeItem === 'city' ? (
//               <>
//                 <TouchableOpacity
//                   style={[styles.menuItem, styles.activeMenuItem]}
//                   onPress={() => setActiveItem('Destinations')}
//                 >
//                   <View
//                     style={[styles.menuItemContent, { justifyContent: 'flex-start' }]}
//                   >
//                     <BackGoldenArrow style={styles.menuItemIcon} />
//                     <Text
//                       style={[styles.menuText, { textAlign: 'center', flex: 1 }]}
//                     >
//                       {activeItemName}
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//                 <View style={styles.subItemsContainer}>
//                   {city?.map((subItem, subIndex) => (
//                     <TouchableOpacity
//                       key={subItem.id || subIndex}
//                       onPress={() =>
//                         navigation.navigate('MaldivesPackages', {
//                           destinationId: subItem?.id,
//                         })
//                       }
//                       style={styles.subItem}
//                     >
//                       <Text style={styles.subItemText}>{subItem?.name}</Text>
//                     </TouchableOpacity>
//                   ))}
//                 </View>
//               </>
//             ) : activeItem === 'Destinations' ? (
//               <>
//                 <TouchableOpacity
//                   style={[styles.menuItem, styles.activeMenuItem]}
//                   onPress={() => setActiveItem(null)}
//                 >
//                   <View
//                     style={[styles.menuItemContent, { justifyContent: 'flex-start' }]}
//                   >
//                     <BackGoldenArrow style={styles.menuItemIcon} />
//                     <Text
//                       style={[styles.menuText, { textAlign: 'center', flex: 1 }]}
//                     >
//                       Destinations
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//                 {isSubLoading ? (
//                   <ActivityIndicator size="small" color="#000" style={{ marginTop: 10 }} />
//                 ) : (
//                   <View style={styles.subItemsContainer}>
//                     {menuItems[1].subItems.map((subItem, subIndex) => (
//                       <View key={subItem.id || subIndex} style={styles.subItem}>
//                         <TouchableOpacity
//                           onPress={() =>
//                             navigation.navigate('MaldivesPackages', {
//                               destinationId: subItem.id,
//                             })
//                           }
//                         >
//                           <Text style={styles.subItemText}>{subItem.name}</Text>
//                         </TouchableOpacity>
//                         {subItem.subDestinations.length > 0 && (
//                           <TouchableOpacity onPress={() => handleSubItemPress(subItem)}>
//                             <Goldenarrow style={styles.menuItemIcon} />
//                           </TouchableOpacity>
//                         )}
//                       </View>
//                     ))}
//                   </View>
//                 )}
//               </>
//             ) : (
//               menuItems.map((item, index) => (
//                 <TouchableOpacity
//                   key={item.name || index}
//                   style={styles.menuItem}
//                   onPress={() => handleMenuItemPress(item)}
//                 >
//                   <View style={styles.menuItemContent}>
//                     <Text style={styles.menuText}>{item.name}</Text>
//                     {item.icon && <item.icon style={styles.menuItemIcon} />}
//                   </View>
//                 </TouchableOpacity>
//               ))
//             )}
//           </ScrollView>
 
//           {/* Social Icons */}
//           <View style={styles.socialRow}>
//             {socialLinks.map(item => (
//               <TouchableOpacity
//                 key={item.label}
//                 onPress={() => {
//                   if (item.url) {
//                     Linking.openURL(item.url);
//                   }
//                 }}
//                 style={styles.iconButton}
//                 accessibilityLabel={item.label}
//               >
//                 <Image source={item.icon} style={styles.iconImg} />
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
//         </TouchableOpacity>
//       </Animated.View>
//     </>
//   );
// }
 
// const styles = StyleSheet.create({
//   menuItem: {
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#ccc',
//   },
//   menuItemContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   menuItemIcon: {
//     width: 25,
//     height: 25,
//     marginRight: 10,
//   },
//   menuText: {
//     fontSize: 16,
//     color: '#000',
//   },
//   activeMenuItem: {
//     backgroundColor: '#2323231A',
//   },
//   subItemsContainer: {
//     paddingLeft: 20,
//     backgroundColor: '#f9f9f9',
//   },
//   subItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#eee',
//   },
//   subItemText: {
//     fontSize: 14,
//     color: '#555',
//     paddingHorizontal: 10,
//   },
//   logoStyle: {
//     width: width * 0.5,
//     resizeMode: 'contain',
//   },
//   drawer: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     padding:0,
//     margin:0,
//     zIndex: 11,
//   },
//   drawerMain:{
//     height:height + 50,
//     backgroundColor: 'rgba(0, 0, 0, 0.59)',
//   },
//   drawerBody: {
//      width: width * 0.7,
//     height: height,
//     backgroundColor: '#fff',
//   },
//   drawerHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 40,
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//   },
//   closeButton: {
//     backgroundColor: '#fff',
//     borderRadius: 7,
//     padding: 10,
//   },
//   crossImg: {
//     width: 10,
//     height: 10,
//     resizeMode: 'contain',
//   },
//   socialRow: {
//     width: width * 0.7,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//     borderTopWidth: 1,
//     borderColor: '#eee',
//     backgroundColor: '#fff',
//     position: 'absolute',
//     bottom: 0,
//   },
//   iconButton: {
//     padding: 8,
//   },
//   iconImg: {
//     width: 30,
//     height: 36,
//     resizeMode: 'contain',
//   },
// });

import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  ScrollView,
  ImageBackground,
  Linking,
  ActivityIndicator
} from 'react-native';
import FastImage from 'react-native-fast-image';
import InstagramIcon from '../assets/images/insta.png';
import FacebookIcon from '../assets/images/fb.png';
import PinterestIcon from '../assets/images/pinteret.png';
import YouTubeIcon from '../assets/images/youtube.png';
import TwitterIcon from '../assets/images/twitter.png';
import CrossIcon from '../assets/images/cross.png';
import Goldenarrow from '../assets/images/GoldenArrrow.svg';
import BackGoldenArrow from '../assets/images/BackGoldenArrow.svg';
import Logo from '../assets/images/Logo.png';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllDestinations,
  allDestinationsStatus,
  selectCountryDestinations
} from '../redux/slices/destinationsSlice';
import { fetchStaticData, selectStaticData } from '../redux/slices/StaticSlice';
 
const { width, height } = Dimensions.get('window');
 
const ICONS_TO_DISPLAY = [
  { icon: InstagramIcon, label: 'Instagram' },
  { icon: FacebookIcon, label: 'Facebook' },
  { icon: PinterestIcon, label: 'Pinterest' },
  { icon: YouTubeIcon, label: 'YouTube' },
  { icon: TwitterIcon, label: 'Twitter' },
];
 
export default function SideDrawer({ isOpen, onClose, navigation }) {
  const staticData = useSelector(selectStaticData);
  const socialLinks = ICONS_TO_DISPLAY.map(item => {
    const url = staticData?.social_links?.[item.label.toLowerCase()];
    return { ...item, url };
  });
 
  const [activeItem, setActiveItem] = useState(null);
  const [activeItemName, setActiveItemName] = useState('');
  const [isSubLoading, setIsSubLoading] = useState(false);
  const [city, setCity] = useState(null);
 
  const dispatch = useDispatch();
  const country = useSelector(selectCountryDestinations);
  const allDestinations = useSelector(selectAllDestinations);
  const destinationsStatus = useSelector(allDestinationsStatus);
 
  // Memoize menuItems
  const menuItems = useMemo(
    () => [
      { name: 'Home', screen: 'HomeScreen' },
      {
        name: 'Destinations',
        icon: Goldenarrow,
        subItems: country.map(c => ({
          name: c.name,
          screen: 'TopDestination',
          id: c.id,
          subDestinations: allDestinations.data.filter(
            dest => dest.parent === parseInt(c.id, 10)
          ),
        })),
      },
      { name: 'Safari', screen: 'Safari' },
      { name: 'Cruise', screen: 'Cruise' },
      { name: 'Blogs', screen: 'Blogs' },
      { name: 'FAQs', screen: 'FAQs' },
      { name: 'About Us', screen: 'AboutUs' },
      { name: 'Privacy Policy', screen: 'PrivacyPolicy' },
      { name: 'Terms & Conditions', screen: 'TermsAndConditions' },
      { name: 'Disclaimer', screen: 'Disclaimer' },
      { name: 'Contact us', screen: 'ContactUs' },
    ],
    [country, allDestinations]
  );
 
  useEffect(() => {
    if (isOpen) {
      dispatch(fetchStaticData());
    }
  }, [isOpen, dispatch]);
 
  const fetchAndSetSubDestinations = async countryId => {
    setIsSubLoading(true);
    if (destinationsStatus === 'succeeded') {
      const citydata = allDestinations.data.filter(dest => dest.parent === countryId);
      setCity(citydata);
      setIsSubLoading(false);
    }
  };
 
  const handleMenuItemPress = item => {
    if (item.name === 'Destinations') {
      setActiveItem(item.name);
    } else {
      onClose();
      if (item.screen) {
        navigation.navigate(item.screen);
      }
    }
  };
 
  const handleSubItemPress = subItem => {
    if (subItem.subDestinations.length > 0) {
      setActiveItem('city');
      setActiveItemName(subItem.name);
      setCity(subItem.subDestinations);
    } else {
      onClose();
      navigation.navigate(subItem.screen, { countryId: subItem.id });
      setActiveItem(null);
    }
  };
   const handleSubDestinationClick = (id) => {
    onClose(); // First, close the drawer
    navigation.navigate('MaldivesPackages', { destinationId: id }); // Then, navigate
  };
   const handleDestinationNavigation = (item) => {
    if (item.subDestinations.length > 0) {
      setActiveItem('city');
      setActiveItemName(item.name);
      setCity(item.subDestinations);
    } else {
      onClose();
      navigation.navigate('MaldivesPackages', { destinationId: item.id });
      setActiveItem(null);
    }
  };

  const slideAnim = useRef(new Animated.Value(-width)).current;
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -width,
      duration: 300,
      useNativeDriver: false, // translateX needs layout calculations
    }).start();
  }, [isOpen, slideAnim]);
 
  if (!isOpen && slideAnim._value <= -width) return null;
 
  return (
    <>
      <Animated.View
        style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}
      >
       
        <TouchableOpacity style={styles.drawerMain} onPress={onClose} activeOpacity={1}>
          <View style={styles.drawerBody}>
          {/* Header */}
          <ImageBackground
            source={require('../assets/images/bg-header.webp')}
            style={styles.drawerHeader}
            resizeMode="cover"
          >
            <Image source={Logo} style={styles.logoStyle} />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Image source={CrossIcon} style={styles.crossImg} />
            </TouchableOpacity>
          </ImageBackground>
 
          {/* Menu Items */}
          <ScrollView>
            {activeItem === 'city' ? (
              <>
                <TouchableOpacity
                  style={[styles.menuItem, styles.activeMenuItem]}
                  onPress={() => setActiveItem('Destinations')}
                >
                  <View
                    style={[styles.menuItemContent, { justifyContent: 'flex-start' }]}
                  >
                    <BackGoldenArrow style={styles.menuItemIcon} />
                    <Text
                      style={[styles.menuText, { textAlign: 'center', flex: 1 }]}
                    >
                      {activeItemName}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.subItemsContainer}>
                  {city?.map((subItem, subIndex) => (
                   <TouchableOpacity
                        key={subItem.id || subIndex}
                        onPress={() => handleSubDestinationClick(subItem.id)} // Use the new function
                        style={styles.subItem}
                      >
                      <Text style={styles.subItemText}>{subItem?.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            ) : activeItem === 'Destinations' ? (
              <>
                <TouchableOpacity
                  style={[styles.menuItem, styles.activeMenuItem]}
                  onPress={() => setActiveItem(null)}
                >
                  <View
                    style={[styles.menuItemContent, { justifyContent: 'flex-start' }]}
                  >
                    <BackGoldenArrow style={styles.menuItemIcon} />
                    <Text
                      style={[styles.menuText, { textAlign: 'center', flex: 1 }]}
                    >
                      Destinations
                    </Text>
                  </View>
                </TouchableOpacity>
                {isSubLoading ? (
                  <ActivityIndicator size="small" color="#000" style={{ marginTop: 10 }} />
                ) : (
                  <View style={styles.subItemsContainer}>
                    {menuItems[1].subItems.map((subItem, subIndex) => (
                      <View key={subItem.id || subIndex} style={styles.subItem}>
                         <TouchableOpacity
                            onPress={() => handleDestinationNavigation(subItem)}
                          >
                        {/* <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('MaldivesPackages', {
                              destinationId: subItem.id,
                            })
                          }
                        > */}
                          <Text style={styles.subItemText}>{subItem.name}</Text>
                        </TouchableOpacity>
                        {subItem.subDestinations.length > 0 && (
                          // <TouchableOpacity onPress={() => handleSubItemPress(subItem)}>
                          //   <Goldenarrow style={styles.menuItemIcon} />
                          // </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDestinationNavigation(subItem)}>
                              <Goldenarrow style={styles.menuItemIcon} />
                            </TouchableOpacity>
                        )}
                      </View>
                    ))}
                  </View>
                )}
              </>
            ) : (
              menuItems.map((item, index) => (
                <TouchableOpacity
                  key={item.name || index}
                  style={styles.menuItem}
                  onPress={() => handleMenuItemPress(item)}
                >
                  <View style={styles.menuItemContent}>
                    <Text style={styles.menuText}>{item.name}</Text>
                    {item.icon && <item.icon style={styles.menuItemIcon} />}
                  </View>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
 
          {/* Social Icons */}
          <View style={styles.socialRow}>
            {socialLinks.map(item => (
              <TouchableOpacity
                key={item.label}
                onPress={() => {
                  if (item.url) {
                    Linking.openURL(item.url);
                  }
                }}
                style={styles.iconButton}
                accessibilityLabel={item.label}
              >
                <Image source={item.icon} style={styles.iconImg} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}
 
const styles = StyleSheet.create({
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  menuItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#000',
  },
  activeMenuItem: {
    backgroundColor: '#2323231A',
  },
  subItemsContainer: {
    paddingLeft: 20,
    backgroundColor: '#f9f9f9',
  },
  subItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  subItemText: {
    fontSize: 14,
    color: '#555',
    paddingHorizontal: 10,
  },
  logoStyle: {
    width: width * 0.5,
    resizeMode: 'contain',
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding:0,
    margin:0,
    zIndex: 11,
  },
  drawerMain:{
    height:height + 50,
    backgroundColor: 'rgba(0, 0, 0, 0.59)',
  },
  drawerBody: {
     width: width * 0.7,
    height: height,
    backgroundColor: '#fff',
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  closeButton: {
    backgroundColor: '#fff',
    borderRadius: 7,
    padding: 10,
  },
  crossImg: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
  },
  socialRow: {
    width: width * 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
  },
  iconButton: {
    padding: 8,
  },
  iconImg: {
    width: 30,
    height: 36,
    resizeMode: 'contain',
  },
});