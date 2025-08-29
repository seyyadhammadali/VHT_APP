import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { fetchStaticData } from '../redux/slices/StaticSlice';
import { fetchAllPages } from '../redux/slices/pagesSlice';
import { fetchAllDestinations, allDestinationsStatus } from '../redux/slices/destinationsSlice';
import NoInternetMessage from '../components/NoInternetMessage'; 
export default function SplashScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const destinations_status = useSelector(allDestinationsStatus);
  const [isConnected, setIsConnected] = useState(null);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (isConnected !== null) {
      if (isConnected) {
        dispatch(fetchStaticData());
        dispatch(fetchAllPages());
        if (destinations_status === 'idle') {
          dispatch(fetchAllDestinations());
        }
        const timeout = setTimeout(() => {
          navigation.replace('HomeScreen');
        }, 3000);

        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          navigation.replace('NoInternetMessage');
        }, 2000);

        return () => clearTimeout(timeout);
      }
    }
  }, [navigation, dispatch, destinations_status, isConnected]);
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/loghooo.png')}
        style={styles.imgStyle}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',   
    alignItems: 'center', 
    backgroundColor: '#ffffff',

  },
  imgStyle: {
  width: 200,   
    height: 200,
    resizeMode: 'contain',
   
  },
});