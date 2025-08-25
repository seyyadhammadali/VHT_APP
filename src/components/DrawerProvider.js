
import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react";
import { Drawer } from "react-native-drawer-layout";
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Linking, Dimensions,ScrollView } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { fetchStaticData, selectStaticData } from '../redux/slices/StaticSlice';
import { selectAllDestinations, selectCountryDestinations } from '../redux/slices/destinationsSlice';
import { useNavigation, useRoute } from '@react-navigation/native';
// Drawer assets
import InstagramIcon from '../assets/images/insta.png';
import FacebookIcon from '../assets/images/fb.png';
import PinterestIcon from '../assets/images/pinteret.png';
import YouTubeIcon from '../assets/images/youtube.png';
import TwitterIcon from '../assets/images/twitter.png';
import CrossIcon from '../assets/images/cross.png';
import Goldenarrow from '../assets/images/GoldenArrrow.svg';
import BackGoldenArrow from '../assets/images/BackGoldenArrow.svg';
import Logo from '../assets/images/Logo.png';

const { width } = Dimensions.get('window');
const DrawerContext = createContext();
export const useDrawer = () => useContext(DrawerContext);

const ICONS_TO_DISPLAY = [
  { icon: InstagramIcon, label: 'Instagram' },
  { icon: FacebookIcon, label: 'Facebook' },
  { icon: PinterestIcon, label: 'Pinterest' },
  { icon: YouTubeIcon, label: 'YouTube' },
  { icon: TwitterIcon, label: 'Twitter' },
];

export default function DrawerProvider({ children }) {
      const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [activeName, setActiveName] = useState('');
  const [city, setCity] = useState(null);

  const dispatch = useDispatch();
  const staticData = useSelector(selectStaticData);
  const country = useSelector(selectCountryDestinations);
  const allDestinations = useSelector(selectAllDestinations);

  // Social links for footer
  const socialLinks = useMemo(() =>
    ICONS_TO_DISPLAY.map((item) => ({
      ...item,
      url: staticData?.social_links?.[item.label.toLowerCase()],
    })),
    [staticData]
  );

  // Menu items
  const menuItems = useMemo(() => [
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
  ], [country, allDestinations]);

  // Fetch static data when drawer opens
  useEffect(() => {
    if (open) dispatch(fetchStaticData());
  }, [open, dispatch]);

  const getData = useMemo(() => {
    if (activeItem === 'city') return city || [];
    if (activeItem === 'Destinations') return menuItems[1]?.subItems || [];
    return menuItems;
  }, [activeItem, city, menuItems]);

  const handleMenuItemPress = useCallback((item, single = false) => {
    if (item.name === 'Destinations' && !single) {
      setActiveItem('Destinations');
    } else {
      setOpen(false);
      if (item.screen) navigation.navigate(item.screen);
      setActiveItem(null);
      setCity(null);
      setActiveName('');
    }
  }, [navigation]);

  const handleDestinationNavigation = useCallback((item, single = false) => {
    console.log("click time",   new Date().toLocaleTimeString());
    
    if (item.subDestinations.length > 0 && !single) {
      setActiveItem('city');
      setActiveName(item.name);
      setCity(item.subDestinations);
    } else {
      setOpen(false);
      navigation.navigate('MaldivesPackages', { destinationId: item.id });
      setActiveItem(null);
      setCity(null);
      setActiveName('');
    }
      console.log("click time out",   new Date().toLocaleTimeString());
  }, [navigation]);

  const handleSubDestinationClick = useCallback((id) => {
    setOpen(false);
    navigation.navigate('MaldivesPackages', { destinationId: id });
    setActiveItem(null);
    setCity(null);
    setActiveName('');
  }, [navigation]);

  // Drawer header
  const renderDrawerHeader = useCallback(() => (
    <>
      <ImageBackground
        source={require('../assets/images/bg-header.webp')}
        style={drawerStyles.drawerHeader}
        resizeMode="cover"
      >
        <Image source={Logo} style={drawerStyles.logoStyle} />
        <TouchableOpacity onPress={() => setOpen(false)} style={drawerStyles.closeButton}>
          <Image source={CrossIcon} style={drawerStyles.crossImg} />
        </TouchableOpacity>
      </ImageBackground>

      {activeItem && (
        <TouchableOpacity
          style={[drawerStyles.menuItem, drawerStyles.activeMenuItem]}
          onPress={() => {
            if (activeItem === 'city') {
              setActiveItem('Destinations');
              setCity(null);
              setActiveName('');
            } else {
              setActiveItem(null);
            }
          }}
        >
          <BackGoldenArrow style={[drawerStyles.menuItemIcon, drawerStyles.activeMenuItemIcon]} />
          <View style={drawerStyles.activeMenuItemView}>
            <Text style={drawerStyles.menuText}>
              {activeItem === 'city' ? activeName : 'Destinations'}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </>
  ), [activeItem, activeName]);

  // Drawer footer
  const renderDrawerFooter = useCallback(() => (
    <View style={drawerStyles.socialRow}>
      {socialLinks.map((item) => (
        <TouchableOpacity
          key={item.label}
          onPress={() => item.url && Linking.openURL(item.url)}
          style={drawerStyles.iconButton}
          accessibilityLabel={item.label}
        >
          <Image source={item.icon} style={drawerStyles.iconImg} />
        </TouchableOpacity>
      ))}
    </View>
  ), [socialLinks]);

  // Drawer content
const renderDrawerItem = useCallback(() => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Scrollable menu */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {renderDrawerHeader()}
        {getData?.map((item) => {
          if (activeItem === 'city') {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleSubDestinationClick(item.id)}
                style={drawerStyles.subItem}
              >
                <Text style={drawerStyles.subItemText}>{item.name}</Text>
              </TouchableOpacity>
            );
          }

          if (activeItem === 'Destinations') {
           
            return (
                <TouchableOpacity
                    onPress={() => handleDestinationNavigation(item)}
                    style={drawerStyles.subItem}
                >
                    <TouchableOpacity onPress={() => handleDestinationNavigation(item, true)}>
                    <Text style={drawerStyles.subItemText}>{item.name}</Text>
                    </TouchableOpacity>
                    {item.subDestinations?.length > 0 && <Goldenarrow style={drawerStyles.menuItemIcon} />}
                </TouchableOpacity>
                );
            }

          return (
            <TouchableOpacity
              key={item.id}
              style={drawerStyles.menuItem}
              onPress={() => handleMenuItemPress(item)}
            >
              <View style={drawerStyles.menuItemContent}>
                 <TouchableOpacity onPress={()=>handleMenuItemPress(item, (item.name === 'Destinations'?true:false))}>
             <Text style={drawerStyles.menuText}>{item.name}</Text>
          </TouchableOpacity>
                {item.icon && <item.icon style={drawerStyles.menuItemIcon} />}
              </View>
            </TouchableOpacity>

            
          );
        })}
      </ScrollView>

      {/* Fixed footer */}
      {renderDrawerFooter()}
    </View>
  );
}, [
  activeItem,
  getData,
  handleDestinationNavigation,
  handleMenuItemPress,
  handleSubDestinationClick,
  renderDrawerFooter,
  renderDrawerHeader
]);

  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      <Drawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        drawerStyle={{ width: width *0.7}}
        overlayStyle={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        renderDrawerContent={renderDrawerItem}
      >
        {children}
      </Drawer>
    </DrawerContext.Provider>
  );
}

const drawerStyles = StyleSheet.create({
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop:40,
    paddingBottom:20,
    paddingHorizontal: 15,
  },
  closeButton: {
    backgroundColor: '#fff',
    borderRadius: 7,
    padding: 10,
  },
  crossImg: { width: 10, height: 10, resizeMode: 'contain' },
  logoStyle: { width: width * 0.5, resizeMode: 'contain' },
  menuItem: { paddingVertical: 15, paddingHorizontal: 10, borderBottomWidth: 0.5, borderBottomColor: '#ccc' },
  menuItemContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  menuItemIcon: { width: 25, height: 25, marginRight: 10 },
  menuText: { fontSize: 16, color: '#000' },
  activeMenuItem: { backgroundColor: '#2323231A', flexDirection: 'row' },
  activeMenuItemIcon: { width: "10%" },
  activeMenuItemView: { width: "90%", alignItems: 'center' },
  subItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: '#eee', paddingLeft: 20 },
  subItemText: { fontSize: 14, color: '#555', paddingHorizontal: 10 },
  socialRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20, paddingHorizontal: 10, borderTopWidth: 1, borderColor: '#eee', backgroundColor: '#fff' },
  iconButton: { padding: 8 },
  iconImg: { width: 30, height: 36, resizeMode: 'contain' },
});
