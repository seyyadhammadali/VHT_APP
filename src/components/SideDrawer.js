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

import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryDestinations, fetchCityDestinations } from '../redux/slices/destinationsSlice';
import { fetchStaticData, selectStaticData } from '../redux/slices/StaticSlice';

const { width,height } = Dimensions.get('window');

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

  const dispatch = useDispatch();
  const { country, loading, city } = useSelector(state => state.destination);

  // Memoize menuItems to prevent re-creation on every render
  const menuItems = useMemo(() => [
     { title: 'Home', screen: 'HomeScreen' },
    {
      title: 'Destination',
      icon: Goldenarrow,
      subItems: country.map(c => ({
        title: c.name,
        screen: 'TopDestination',
        id: c.id,
        subDestinationsCount: parseInt(c.sub_destinations, 10),
      }))
    },
    { title: 'Safari', screen: 'Safari' },
    { title: 'Cruise', screen: 'Cruise' },
    { title: 'Blogs', screen: 'Blogs' },
    { title: 'FAQs', screen: 'FAQs' },
    { title: 'About Us', screen: 'AboutUs' },
    { title: 'Privacy Policy', screen: 'PrivacyPolicy' },
    { title: 'Terms & Conditions', screen: 'TermsAndConditions' },
    { title: 'Disclaimer', screen: 'Disclaimer' },
    { title: 'Contact us', screen: 'ContactUs' }
  ], [country]);


useEffect(() => {
  if (isOpen) {
    dispatch(fetchStaticData());
  }
}, [isOpen, dispatch]);
  useEffect(() => {
    if (isOpen && country.length === 0) {
      dispatch(fetchCountryDestinations());
    }
  }, [isOpen, dispatch, country.length]);

  const fetchAndSetSubDestinations = async (countryId) => {
    setIsSubLoading(true);
    try {
      await dispatch(fetchCityDestinations(countryId)).unwrap();
    } catch (error) {
      console.error('Failed to fetch sub-destinations:', error);
    } finally {
      setIsSubLoading(false);
    }
  };

  const handleMenuItemPress = (item) => {
    if (item.title === 'Destination') {
      setActiveItem(item.title);
    } else {
      onClose();
      if (item.screen) {
        navigation.navigate(item.screen);
      }
    }
  };

  const handleSubItemPress = (subItem) => {
    if (subItem.subDestinationsCount > 0) {
      setActiveItem('city');
      setActiveItemName(subItem.title);
      fetchAndSetSubDestinations(subItem.id);
    } else {
      onClose();
      navigation.navigate(subItem.screen, { countryId: subItem.id });
      setActiveItem(null);
    }
  };

  const slideAnim = useRef(new Animated.Value(-width)).current;
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -width,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [isOpen, slideAnim]);

  if (!isOpen && slideAnim._value <= -width) return null;

  return (
    <>
      {isOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        />
      )}

      <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
        {/* Header */}
        <ImageBackground
          source={require('../assets/images/bg-header.webp')}
          style={styles.drawerHeader}
          resizeMode={FastImage.resizeMode.cover}
        >
          <Image source={require('../assets/images/Logo.png')} style={styles.logoStyle} />
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
                onPress={() => setActiveItem('Destination')}
              >
                <View style={[styles.menuItemContent, { justifyContent: 'flex-start' }]}>
                    <BackGoldenArrow style={styles.menuItemIcon} />
                  <Text style={[styles.menuText, { textAlign: 'center', flex: 1 }]}>{activeItemName}</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.subItemsContainer}>
                {city?.data?.map((subItem, subIndex) => (
                  <TouchableOpacity
                    key={subIndex}
                    onPress={() => navigation.navigate('MaldivesPackages', { destinationId: subItem?.id })}
                    style={styles.subItem}
                  >
                    <Text style={styles.subItemText}>{subItem?.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          ) : activeItem === 'Destination' ? (
            <>
              <TouchableOpacity
                style={[styles.menuItem, styles.activeMenuItem]}
                onPress={() => setActiveItem(null)}
              >
                <View style={[styles.menuItemContent, { justifyContent: 'flex-start' }]}>
                  <BackGoldenArrow style={styles.menuItemIcon} />
                  <Text style={[styles.menuText, { textAlign: 'center', flex: 1 }]}>Destination</Text>
                </View>
              </TouchableOpacity>
              {loading ? (
                <ActivityIndicator size="small" color="#000" style={{ marginTop: 10 }} />
              ) : (
                <View style={styles.subItemsContainer}>
                  {menuItems[1].subItems.map((subItem, subIndex) => (
                    <View key={subIndex} style={styles.subItem}>
                      <TouchableOpacity
                        onPress={() => {
                          if (subItem.subDestinationsCount > 0) {
                            handleSubItemPress(subItem);
                          } else {
                            navigation.navigate('MaldivesPackages', { destinationId: subItem.id });
                          }
                        }}
                      >
                        <Text style={styles.subItemText}>{subItem.title}</Text>
                      </TouchableOpacity>
                      {subItem.subDestinationsCount > 0 && (
                        <TouchableOpacity onPress={() => handleSubItemPress(subItem)}>
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
                key={index}
                style={styles.menuItem}
                onPress={() => handleMenuItemPress(item)}
              >
                <View style={styles.menuItemContent}>
                  <Text style={styles.menuText}>{item.title}</Text>
                  {item.icon && <item.icon style={styles.menuItemIcon} />}
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>

        {/* Social Icons */}
      <View style={styles.socialRow}>
  {socialLinks.map((item) => (
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

      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc'
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
  overlay: {
    position: 'absolute',
    top: 0, left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1
  },
  logoStyle: {
    width: width * 0.5,
    objectFit: "contain"
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.70,
    height: height,
    backgroundColor: '#fff',
    zIndex: 11111111,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 35,
    paddingVertical: 5,
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
    width: (width * 0.70),
    flexDirection: 'row',
    justifyContent: "space-between",
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