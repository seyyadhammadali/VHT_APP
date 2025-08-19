import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform, 
  Linking, 
  Dimensions, 
  Image, 
  TextInput 
} from 'react-native';
import FastImage from 'react-native-fast-image';
import EmptyState from '../assets/images/EmptyState.svg';

import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { fetchStaticData } from '../redux/slices/StaticSlice';
import { fetchAllPages } from '../redux/slices/pagesSlice';
import { fetchAllDestinations, allDestinationsStatus } from '../redux/slices/destinationsSlice';

const { width } = Dimensions.get('window');

const NoInternetMessage = ({ showSearch = false }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const destinations_status = useSelector(allDestinationsStatus);
  const [isConnected, setIsConnected] = useState(null);

  // Internet state listener
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  // Handle reconnect
  useEffect(() => {
    if (isConnected !== null && isConnected) {
      dispatch(fetchStaticData());
      dispatch(fetchAllPages());
      if (destinations_status === 'idle') dispatch(fetchAllDestinations());

      const timeout = setTimeout(() => navigation.replace('HomeScreen'), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isConnected, dispatch, navigation, destinations_status]);

  const openWifiSettings = () => {
    if (Platform.OS === 'android') {
      Linking.sendIntent
        ? Linking.sendIntent('android.settings.WIFI_SETTINGS')
        : Linking.openSettings();
    } else {
      Linking.openURL('App-Prefs:root=WIFI');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Background */}
      <View style={styles.headerBackground}>
        <FastImage
          source={require('../assets/images/bg-header.webp')}
          style={StyleSheet.absoluteFill}
          resizeMode={FastImage.resizeMode.cover}
        />
         <View style={[styles.headerContent, { zIndex: 1 }]}>
                <Image source={require('../assets/images/Logo.png')} style={styles.logoStyle} />
                </View>

      </View>
  {/* Search Bar */}
      {showSearch && (
        <View style={styles.searchBarAbsoluteContainer}>
          <View style={styles.searchBarContainer}>
            <Image source={require('../assets/images/search.png')} style={styles.searchIcon} />
            <TextInput
              placeholder="Search Countries, Cities, Places..."
              placeholderTextColor="#999"
              style={styles.searchBar}
            />
          </View>
        </View>
      )}


      {/* Content */}
      <EmptyState height={240} width={260} />
      <Text style={styles.connectionStyle}>Connection Lost</Text>
      <Text style={styles.lightText}>Please check your internet and try again.</Text>
      <TouchableOpacity style={styles.butonStyle} onPress={openWifiSettings}>
        <Text style={styles.textStyle}>Enable Wifi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerBackground: {
    width: width,
    height: width * 0.40,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    overflow: 'hidden',
    marginBottom: 20,
  },
    headerContent: {
          flex: 1,
    justifyContent: 'center',   // center vertically
    alignItems: 'center',       
    },
    logoStyle: {
      width: width * 0.6,
      height: width * 0.3,
      resizeMode: 'contain',
    },
  searchBarAbsoluteContainer: {
    position: 'absolute',
    top: width * 0.35,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '92%',
    height: 45,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
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
  butonStyle: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
  connectionStyle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  lightText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6c757d',
    marginBottom: 20,
  },
});

export default NoInternetMessage;
