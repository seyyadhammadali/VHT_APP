
import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react";
import { Drawer } from "react-native-drawer-layout";
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Linking, useWindowDimensions ,ScrollView } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import {useGetStaticDataQuery, useGetDestinationsQuery} from '../redux/slices/apiSlice';
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
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [activeName, setActiveName] = useState('');
  const [city, setCity] = useState(null);

  const { data:dataStatic, isLoading:staticLoading, error:staticError } = useGetStaticDataQuery();
  const { data:dataDestinations, isLoading:destinationLoading, error:destinationError } = useGetDestinationsQuery();
  const staticData = dataStatic?.data;
  const country = dataDestinations?.data.filter(itm=>itm.parent === 0);
  const allDestinations = dataDestinations?.data;

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
    { id:'home', name: 'Home', screen: 'HomeScreen' },
    {
      id:'destinations',
      name: 'Destinations',
      icon: Goldenarrow,
      screen: 'TopDestination',
      subItems: country?.map((c) => ({
        name: c.name,
        screen: 'Destinations',
        id: c.id,
        subDestinations: allDestinations.filter(
          (dest) => dest.parent === parseInt(c.id, 10)
        ),
      })),
    },
    { id:'safari', name: 'Safari', screen: 'CategoryScreen' },
    { id:'cruise', name: 'Cruise', screen: 'CategoryScreen' },
    { id:'blogs', name: 'Blogs', screen: 'Blogs' },
    { id:'faqs', name: 'FAQs', screen: 'FAQs' },
    { id:'about-us', name: 'About Us', screen: 'StaticPage' },
    { id:'privacy-policy', name: 'Privacy Policy', screen: 'StaticPage' },
    { id:'terms-and-conditions', name: 'Terms & Conditions', screen: 'StaticPage' },
    { id:'disclaimer', name: 'Disclaimer', screen: 'StaticPage' },
    { id:'contact', name: 'Contact us', screen: 'ContactUs' },
  ], [country, allDestinations]);

  console.log("menuItems",menuItems);
  
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
      if (item.screen) navigation.navigate(item.screen,{slug: item.id});
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
    <View style={{flex: 1, flexDirection:'column', backgroundColor: '#fff' }}>
       {renderDrawerHeader()}

      {/* Scrollable menu */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
       
        {getData?.map((item) => {
          if (activeItem === 'city') {
            return (
              <TouchableOpacity
                key={item?.id.toString()}
                onPress={() => handleSubDestinationClick(item.id)}
                style={drawerStyles.subItem}
              >
                <Text style={drawerStyles.subItemText}>{item.name}</Text>
              </TouchableOpacity>
            );
          }

          if (activeItem === 'Destinations') {
            return (
              <View key={item.id.toString()} style={drawerStyles.subItem}>
                <TouchableOpacity onPress={() => handleDestinationNavigation(item)}>
                  <Text style={drawerStyles.subItemText}>{item.name}</Text>
                </TouchableOpacity>
                {item.subDestinations?.length > 0 && (
                  <Goldenarrow style={drawerStyles.menuItemIcon} />
                )}
              </View>
            );
          }

          return (
            <View key={item.id.toString()} style={drawerStyles.menuItem}>
              <TouchableOpacity style={drawerStyles.menuItemContent} onPress={() =>
                    handleMenuItemPress(item, item.name === 'Destinations')
                  }>
                <TouchableOpacity
                  onPress={() =>
                    handleMenuItemPress(item, item.name === 'Destinations', true)
                  }
                >
                  <Text style={drawerStyles.menuText}>{item.name}</Text>
                </TouchableOpacity>
                {item.icon && <item.icon style={drawerStyles.menuItemIcon} />}
              </TouchableOpacity>
            </View>
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
        drawerStyle={{ width: width * 0.7}}
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
    paddingTop:50,
    paddingBottom:20,
    paddingHorizontal: 15,
  },
  logoStyle: { 
    borderRadius:4,
    overflow:'hidden',
    height:44, 
    width:200, 
    resizeMode: 'contain' 
  },
  closeButton: {
    height:44,
    width:44,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  crossImg: { width: 15, height: 15, resizeMode: 'contain' },

  menuItem: { paddingVertical: 15, paddingHorizontal: 10, borderBottomWidth: 0.5, borderBottomColor: '#ccc' },
  menuItemContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  menuItemIcon: { width: 44, height: 44, marginRight: 10 },
  menuText: { fontSize: 16, color: '#000' },
  activeMenuItem: { backgroundColor: '#2323231A', flexDirection: 'row' },
  activeMenuItemIcon: { width: "10%" },
  activeMenuItemView: { width: "90%", alignItems: 'center' },
  subItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: '#eee', paddingLeft: 20 },
  subItemText: { fontSize: 14, color: '#555', paddingHorizontal: 10 },

  socialRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20, paddingHorizontal: 10, borderTopWidth: 1, borderColor: '#eee', backgroundColor: '#fff' },
  iconButton: { height:44, width:44 },
  iconImg: { width: "100%", height: "100%", resizeMode: 'contain' },
});
