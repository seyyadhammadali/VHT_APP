import React, { useEffect ,useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Linking } from 'react-native';
import EmptyState from '../assets/images/EmptyState.svg';


import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { fetchStaticData } from '../redux/slices/StaticSlice';
import { fetchAllPages } from '../redux/slices/pagesSlice';
import { fetchAllDestinations, allDestinationsStatus } from '../redux/slices/destinationsSlice';
const NoInternetMessage = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const destinations_status = useSelector(allDestinationsStatus);
  const [isConnected, setIsConnected] = useState(null);

  // Effect to listen for network status changes
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      // Set the connection status once it's determined
      setIsConnected(state.isConnected);
    });

    // Cleanup the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  // Effect to handle data fetching and navigation based on connection status
  useEffect(() => {
    // Only proceed once the connection status is known
    if (isConnected !== null) {
      if (isConnected) {
        // If connected, start fetching data
        dispatch(fetchStaticData());
        dispatch(fetchAllPages());
        if (destinations_status === 'idle') {
          dispatch(fetchAllDestinations());
        }

        // Navigate to the home screen after a delay
        const timeout = setTimeout(() => {
          navigation.replace('HomeScreen');
        }, 2000);

        return () => clearTimeout(timeout);
      } else {
        // If not connected, navigate directly to the no internet screen
        const timeout = setTimeout(() => {
          navigation.replace('NoInternetMessage');
        }, 2000);

        return () => clearTimeout(timeout);
      }
    }
  }, [navigation, dispatch, destinations_status, isConnected]);
  const openWifiSettings = () => {
    if (Platform.OS === 'android') {
      Linking.sendIntent
        ? Linking.sendIntent('android.settings.WIFI_SETTINGS')
        : Linking.openSettings();
    } else {
      Linking.openURL('App-Prefs:root=WIFI'); // works on some iOS versions, not all
    }
  };

  return (
    <View style={styles.container}>
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
    justifyContent: "center",
    alignItems: 'center',
    marginBottom: 90,
  },
  butonStyle: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    marginTop: 20
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400'
  },
  connectionStyle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5
  },
  lightText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6c757d',
    marginBottom: 20
  }
});

export default NoInternetMessage;
