import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
  Linking,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllDestinations,
  allDestinationsStatus,
  selectCountryDestinations,
} from '../redux/slices/destinationsSlice';
import { fetchStaticData, selectStaticData } from '../redux/slices/StaticSlice';
import InstagramIcon from '../assets/images/insta.png';
import FacebookIcon from '../assets/images/fb.png';
import PinterestIcon from '../assets/images/pinteret.png';
import YouTubeIcon from '../assets/images/youtube.png';
import TwitterIcon from '../assets/images/twitter.png';
import CrossIcon from '../assets/images/cross.png';
import Goldenarrow from '../assets/images/GoldenArrrow.svg';
import BackGoldenArrow from '../assets/images/BackGoldenArrow.svg';
import Logo from '../assets/images/Logo.png';
const { width, height } = Dimensions.get('window');

const ICONS_TO_DISPLAY = [
  { icon: InstagramIcon, label: 'Instagram' },
  { icon: FacebookIcon, label: 'Facebook' },
  { icon: PinterestIcon, label: 'Pinterest' },
  { icon: YouTubeIcon, label: 'YouTube' },
  { icon: TwitterIcon, label: 'Twitter' },
];
export default function SideDrawer({ isOpen, onClose, navigation }) {
  const dispatch = useDispatch();
  const staticData = useSelector(selectStaticData);
  const country = useSelector(selectCountryDestinations);
  const allDestinations = useSelector(selectAllDestinations);
  const destinationsStatus = useSelector(allDestinationsStatus);
  const [activeItem, setActiveItem] = useState(null); 
  const [activeName, setActiveName] = useState('');
  const [city, setCity] = useState(null);
  const [isSubLoading, setIsSubLoading] = useState(false);
  const socialLinks = useMemo(
    () =>
      ICONS_TO_DISPLAY.map((item) => ({
        ...item,
        url: staticData?.social_links?.[item.label.toLowerCase()],
      })),
    [staticData]
  );
  const menuItems = useMemo(
    () => [
      { name: 'Home', screen: 'HomeScreen' },
      {
        name: 'Destinations',
        icon: Goldenarrow,
        screen: 'TopDestination',
        subItems: country.map((c) => ({
          name: c.name,
          screen: 'MaldivesPackages',
          id: c.id,
          subDestinations: allDestinations.data.filter(
            (dest) => dest.parent === parseInt(c.id, 10)
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
  const getData = useMemo(() => {
    if (activeItem === 'city') return city || [];
    if (activeItem === 'Destinations') return menuItems[1]?.subItems || [];
    return menuItems;
  }, [activeItem, city, menuItems]);
  const handleMenuItemPress = useCallback(
    (item, single=false) => {
      if (item.name === 'Destinations' && !single) {
        setActiveItem('Destinations');
      } else {
        onClose();
        if (item.screen) navigation.navigate(item.screen);
      }
    },
    [navigation, onClose]
  );
  const handleDestinationNavigation = useCallback((item, single=false) => {
    if (item.subDestinations.length > 0 && !single) {
      setActiveItem('city');
      setActiveName(item.name);
      setCity(item.subDestinations);
    } else {
      onClose();
      navigation.navigate('MaldivesPackages', { destinationId: item.id });
      setActiveItem(null);
    }
  }, [navigation, onClose]);

  const handleSubDestinationClick = useCallback(
    (id) => {
      onClose();
      navigation.navigate('MaldivesPackages', { destinationId: id });
    },
    [navigation, onClose]
  );
  const renderHeader = useCallback(() => (
    <>
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

      {activeItem && (
        <TouchableOpacity
          style={[styles.menuItem, styles.activeMenuItem]}
          onPress={() =>
            setActiveItem(activeItem === 'city' ? 'Destinations' : null)
          }
        >
          <BackGoldenArrow style={[styles.menuItemIcon, styles.activeMenuItemIcon]} />
          <View style={styles.activeMenuItemView}>
           
            <Text style={styles.menuText}>
              {activeItem === 'city' ? activeName : 'Destinations'}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </>
  ), [activeItem, activeName, onClose]);
  const renderFooter = useCallback(() => (
    <View style={styles.socialRow}>
      {socialLinks.map((item) => (
        <TouchableOpacity
          key={item.label}
          onPress={() => item.url && Linking.openURL(item.url)}
          style={styles.iconButton}
          accessibilityLabel={item.label}
        >
          <Image source={item.icon} style={styles.iconImg} />
        </TouchableOpacity>
      ))}
    </View>
  ), [socialLinks]);
  const renderItem = useCallback(({ item }) => {
    if (activeItem === 'city') {
      return (
        <TouchableOpacity
          onPress={() => handleSubDestinationClick(item.id)}
          style={styles.subItem}
        >
          <Text style={styles.subItemText}>{item.name}</Text>
        </TouchableOpacity>
      );
    }

    if (activeItem === 'Destinations') {
      return (
        <TouchableOpacity
          onPress={() => handleDestinationNavigation(item)}
          style={styles.subItem}
        >
          <TouchableOpacity onPress={()=>handleDestinationNavigation(item, true)}>
            <Text style={styles.subItemText}>{item.name}</Text>
          </TouchableOpacity>
          {item.subDestinations?.length > 0 && <Goldenarrow style={styles.menuItemIcon} />}
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleMenuItemPress(item)}
      >
        <View style={styles.menuItemContent}>
          <TouchableOpacity onPress={()=>handleMenuItemPress(item, (item.name === 'Destinations'?true:false))}>
             <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
         
          {item.icon && <item.icon style={styles.menuItemIcon} />}
        </View>
      </TouchableOpacity>
    );
  }, [activeItem, handleDestinationNavigation, handleMenuItemPress, handleSubDestinationClick]);

  if (!isOpen) return null;

  return (
    <Modal isVisible={isOpen}   
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        coverScreen={true}
        onBackdropPress={() => onClose()}
        style={{ margin: 0 }}>

      {/* Drawer */}
      <View style={styles.drawerBody}>
        {renderHeader()}
        <FlatList
          data={getData}
          keyExtractor={(item, index) => item.id?.toString() || item.name || String(index)}
          renderItem={renderItem}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
        />
        {renderFooter()}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  drawerBody: {
    flex: 1,
    width: width * 0.7,
    backgroundColor: '#ffffffff',
    overflow:'hidden'
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  closeButton: {
    backgroundColor: '#fff',
    borderRadius: 7,
    padding: 10,
  },
  crossImg: { width: 10, height: 10, resizeMode: 'contain' },
  logoStyle: { width: width * 0.5, resizeMode: 'contain' },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  menuItemContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  menuItemIcon: { width: 25, height: 25, marginRight: 10 },
  menuText: { fontSize: 16, color: '#000' },
  activeMenuItem: { backgroundColor: '#2323231A', flexDirection:'row' },
  activeMenuItemIcon: { width:"10%"},
  activeMenuItemView: { width:"90%",alignItems:'center' },
  subItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  subItemText: { fontSize: 14, color: '#555', paddingHorizontal: 10 },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  iconButton: { padding: 8 },
  iconImg: { width: 30, height: 36, resizeMode: 'contain' },
});
