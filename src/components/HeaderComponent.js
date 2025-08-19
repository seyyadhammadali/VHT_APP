// HeaderComponent.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard,Platform,StatusBar
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Menu from '../assets/images/menuSVG.svg';
import NotifyIconSVG from '../assets/images/notifyIcon.svg';
import colors from '../constants/colors';
import SideDrawer from '../components/SideDrawer';
const { width } = Dimensions.get('window');
const HeaderComponent = ({ navigation, keyword, setKeyword, handleSearch }) => {
const [drawerOpen, setDrawerOpen] = useState(false);
  return (
  <View>
    <SideDrawer 
    isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
         navigation={navigation}
        ></SideDrawer>
    <View style={styles.headerBackground}>
      <FastImage
        source={require('../assets/images/bg-header.webp')}
        style={StyleSheet.absoluteFill}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={[styles.headerContent, { zIndex: 1 }]}>
        <TouchableOpacity style={styles.menuButton} onPress={() => setDrawerOpen(true)}>
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
);
}
const styles = StyleSheet.create({
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
export default HeaderComponent;