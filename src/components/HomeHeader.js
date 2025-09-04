import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
  StatusBar,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import Menu from '../assets/images/menuSVG.svg';
import NotifyIconSVG from '../assets/images/notifyIcon.svg';
import { useDrawer } from "./DrawerProvider";
import { COLORS, mainStyles } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
const HomeHeader = ({ keyword, setKeyword, handleSearch }) => {
  const { width } = useWindowDimensions();
  const { setOpen } = useDrawer();
  const navigation = useNavigation();
  return (
    <View style={styles.contentWrapper}>
        <FastImage
          source={require('../assets/images/bg-header.webp')}
          style={[StyleSheet.absoluteFill, styles.headerBackground]}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={[styles.headerMain, {paddingHorizontal:width * 0.04}]}>
          <View style={[styles.headerContent]}>
            <TouchableOpacity style={styles.menuButton} onPress={() => setOpen(true)}>
              <Menu width={25} height={25} />
            </TouchableOpacity>
            <Image source={require('../assets/images/Logo.png')} style={styles.logoStyle} />
            <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Notifications')}>
              <NotifyIconSVG width={25} height={25} />
            </TouchableOpacity>

          </View>
    
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
                <Text style={mainStyles.btnSearchText}>Search</Text>
              </TouchableOpacity>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // New style to wrap the main screen content for the Drawer
  contentWrapper: {
    backgroundColor: 'transparent',
  },
  headerBackground: {
    backgroundColor: COLORS.primaryBg,
    alignSelf: 'center',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    overflow: 'hidden',
    marginBottom:20,
  },
  headerMain:{
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 20,
    flexDirection:'column', 
    paddingHorizontal:20,
    gap:20
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoStyle: {
    height:44,
    width:220,
    resizeMode: 'stretch',
    borderRadius:4,
  },
  menuButton: {
    height:44,
    width:44,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
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
    alignSelf: 'center',
  },
  searchIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    paddingVertical: Platform.OS === 'android' ? 0 : 10,
  },
  searchButton: {
    ...mainStyles.btnSearch,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 10,
  },

});

export default HomeHeader;