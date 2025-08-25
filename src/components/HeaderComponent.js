import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  FlatList,
  ImageBackground,
  Linking,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Drawer } from 'react-native-drawer-layout'; 
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllDestinations,
  allDestinationsStatus, 
  selectCountryDestinations,
} from '../redux/slices/destinationsSlice';
import { fetchStaticData, selectStaticData } from '../redux/slices/StaticSlice';
import Menu from '../assets/images/menuSVG.svg';
import NotifyIconSVG from '../assets/images/notifyIcon.svg';
import colors from '../constants/colors'; 
import InstagramIcon from '../assets/images/insta.png';
import FacebookIcon from '../assets/images/fb.png';
import PinterestIcon from '../assets/images/pinteret.png';
import YouTubeIcon from '../assets/images/youtube.png';
import TwitterIcon from '../assets/images/twitter.png';
import CrossIcon from '../assets/images/cross.png';
import Goldenarrow from '../assets/images/GoldenArrrow.svg';
import BackGoldenArrow from '../assets/images/BackGoldenArrow.svg'; 
import Logo from '../assets/images/Logo.png';
import { useDrawer } from "./DrawerProvider";
const { width } = Dimensions.get('window');
const ICONS_TO_DISPLAY = [
  { icon: InstagramIcon, label: 'Instagram' },
  { icon: FacebookIcon, label: 'Facebook' },
  { icon: PinterestIcon, label: 'Pinterest' },
  { icon: YouTubeIcon, label: 'YouTube' },
  { icon: TwitterIcon, label: 'Twitter' },
];
const HeaderComponent = ({ navigation, keyword, setKeyword, handleSearch }) => {
  const [drawerOpen, setDrawerOpen] = useState(false); 
  const dispatch = useDispatch();
  const staticData = useSelector(selectStaticData);
  const country = useSelector(selectCountryDestinations);
  const allDestinations = useSelector(selectAllDestinations);
  const destinationsStatus = useSelector(allDestinationsStatus);
  const [activeItem, setActiveItem] = useState(null);
  const [activeName, setActiveName] = useState('');
  const [city, setCity] = useState(null);
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
    if (drawerOpen) { 
      dispatch(fetchStaticData());
    }
  }, [drawerOpen, dispatch]);
  const getData = useMemo(() => {
    if (activeItem === 'city') return city || [];
    if (activeItem === 'Destinations') return menuItems[1]?.subItems || [];
    return menuItems;
  }, [activeItem, city, menuItems]);

  const handleMenuItemPress = useCallback(
    (item, single = false) => {
      if (item.name === 'Destinations' && !single) {
        setActiveItem('Destinations');
      } else {
        setDrawerOpen(false); 
        if (item.screen) navigation.navigate(item.screen);
        setActiveItem(null); 
        setCity(null); 
        setActiveName(''); 
      }
    },
    [navigation]
  );

  const handleDestinationNavigation = useCallback((item, single = false) => {
    if (item.subDestinations.length > 0 && !single) {
      setActiveItem('city');
      setActiveName(item.name);
      setCity(item.subDestinations);
    } else {
      setDrawerOpen(false); // Close drawer
      navigation.navigate('MaldivesPackages', { destinationId: item.id });
      setActiveItem(null); // Reset active item
      setCity(null); // Reset city
      setActiveName(''); // Reset active name
    }
  }, [navigation]);

  const handleSubDestinationClick = useCallback(
    (id) => {
      setDrawerOpen(false); // Close drawer
      navigation.navigate('MaldivesPackages', { destinationId: id });
      setActiveItem(null); // Reset active item
      setCity(null); // Reset city
      setActiveName(''); // Reset active name
    },
    [navigation]
  );

  
const { setOpen } = useDrawer();
  return (
    <View> 
        <View style={styles.contentWrapper}>
          <View style={styles.headerBackground}>
            <FastImage
              source={require('../assets/images/bg-header.webp')}
              style={StyleSheet.absoluteFill}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={[styles.headerContent, { zIndex: 1 }]}>
              {/* <TouchableOpacity style={styles.menuButton} onPress={() => setDrawerOpen(true)}> */}
              <TouchableOpacity style={styles.menuButton} onPress={() => setOpen(true)}>
                <Menu width={25} height={25} />
              </TouchableOpacity>
              <Image source={require('../assets/images/Logo.png')} style={styles.logoStyle} />
              <View style={styles.headerIcons}>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Notifications')}>
                  <NotifyIconSVG width={25} height={25} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.searchBarAbsoluteContainer}>
            <View style={styles.searchBarContainer}>
              <Image source={require('../assets/images/search.png')} style={styles.searchIcon} />
              <TextInput
                placeholder="Search Countries, Cities, Places..."
                placeholderTextColor="#999"
                style={styles.searchBar}
                value={keyword}
                onChangeText={setKeyword}
                returnKeyType="search"
                onSubmitEditing={handleSearch}
              />
              <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Text style={styles.searchButtonText}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // New style to wrap the main screen content for the Drawer
  contentWrapper: {
   contentWrapper: {
  width: width,
  backgroundColor: '#fff',
},

  },
  headerBackground: {
    width: width,
    height: width * 0.40,
    alignSelf: 'center',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 20,
    paddingBottom: 20,
  },
  logoStyle: {
    width: width * 0.5,
    height: width * 0.2,
    resizeMode: 'contain',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  menuButton: {
    marginRight: 6,
    padding: 5,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  searchBarAbsoluteContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -22,
    alignItems: 'center',
    zIndex: 10,
  },
  searchBarContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 45,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: '92%',
    alignSelf: 'center',
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    paddingVertical: Platform.OS === 'android' ? 0 : 10,
  },
  searchButton: {
    backgroundColor: colors.black,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

// Styles for the drawer content (moved from your original SideDrawer component)
// const drawerStyles = StyleSheet.create({
//   drawerBody: {
//     position:"absolute",
//     width: width * 0.7, // As defined in your original styles
//     backgroundColor: '#ffffff',
//     // overflow: 'hidden',
//     flex:1,
    
//   },
//   drawerHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//   },
//   closeButton: {
//     backgroundColor: '#fff',
//     borderRadius: 7,
//     padding: 10,
//   },
//   crossImg: { width: 10, height: 10, resizeMode: 'contain' },
//   logoStyle: { width: width * 0.5, resizeMode: 'contain' },
//   menuItem: {
//     paddingVertical: 15,
//     paddingHorizontal: 10,
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#ccc',
//   },
//   menuItemContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//   menuItemIcon: { width: 25, height: 25, marginRight: 10 },
//   menuText: { fontSize: 16, color: '#000' },
//   activeMenuItem: { backgroundColor: '#2323231A', flexDirection: 'row' },
//   activeMenuItemIcon: { width: "10%" },
//   activeMenuItemView: { width: "90%", alignItems: 'center' },
//   subItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#eee',
//     paddingLeft: 20, // Indent sub-items
//   },
//   subItemText: { fontSize: 14, color: '#555', paddingHorizontal: 10 },
//   socialRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//     borderTopWidth: 1,
//     borderColor: '#eee',
//     backgroundColor: '#fff',
//   },
//   iconButton: { padding: 8 },
//   iconImg: { width: 30, height: 36, resizeMode: 'contain' },
// });

export default HeaderComponent;