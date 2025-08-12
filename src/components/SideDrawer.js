import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  ScrollView,
  ImageBackground
} from 'react-native';
import FastImage from 'react-native-fast-image';
// import { Ionicons } from '@expo/vector-icons';
import InstagramIcon from '../assets/images/insta.png';
import FacebookIcon from '../assets/images/fb.png';
import PinterestIcon from '../assets/images/pinteret.png';
import YouTubeIcon from '../assets/images/youtube.png';
import TwitterIcon from '../assets/images/twitter.png';
import CrossIcon from '../assets/images/cross.png';

const { width, height } = Dimensions.get('window');

export default function SideDrawer({ isOpen, onClose, navigation }) {
  const menuItems = [
    { title: 'Destination', screen: 'TopDestination' },
    { title: 'Safari', screen: 'Safari' },
    { title: 'Cruise', screen: 'CruiseScreen' },
    { title: 'Blogs', screen: 'BlogsScreen' },
    { title: 'FAQs', screen: 'FaqsScreen' },
    { title: 'About Us', screen: 'AboutScreen' },
    { title: 'Privacy Policy', screen: 'PrivacyScreen' },
    { title: 'Terms & Conditions', screen: 'TermsScreen' },
    { title: 'Disclaimer', screen: 'DisclaimerScreen' },
    { title: 'Contact us', screen: 'ContactScreen' }
  ];


  const slideAnim = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: false
      }).start();
    }
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
        <View >
          {/* <Image source={{ uri: logoUrl }} style={styles.logo} resizeMode="contain" /> */}
          <ImageBackground
        source={require('../assets/images/bg-header.webp')}
        style={styles.drawerHeader}
        // style={StyleSheet.absoluteFill}
        resizeMode={FastImage.resizeMode.cover}
      >
    <Image source={require('../assets/images/Logo.png')} style={styles.logoStyle} />
       <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Image source={CrossIcon} style={styles.crossImg} />
            {/* <Ionicons name="close" size={26} color="#000" /> */}
          </TouchableOpacity>
      </ImageBackground>
       
        </View>

        {/* Menu Items */}
        <ScrollView>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                onClose(); // close drawer
                navigation.navigate(item.screen); // navigate
              }}
            >
              <Text style={styles.menuText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Social Icons */}
        <View style={styles.socialRow}>
          {/* <Ionicons name="logo-facebook" size={22} color="#3b5998" /> */}
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  
  overlay: {
    position: 'absolute',
    top: 0, left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1
  },
  
  logoStyle:{
      width: width * 0.5,
     
      objectFit:"contain"
    // height: 15,
  },
  

  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.70,
    height: height,
    backgroundColor: '#fff',
    zIndex: 111111,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingTop:35,
    paddingVertical:5,
    paddingHorizontal:10,
  },
  closeButton:{
    backgroundColor: '#fff',
    borderRadius:7,
    padding:10,
  },
   crossImg: {
    width: 10,
    height: 10,
    
    resizeMode: 'contain',
  },
  logo: { width: 120, height: 40 },
  menuItem: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc'
  },
  menuText: { fontSize: 16, color: '#000' },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingVertical: 10
  }
});
