
// import React, { useEffect } from 'react';
// import { View, StyleSheet, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchStaticData } from '../redux/slices/StaticSlice'; 
// import { fetchAllPages } from '../redux/slices/pagesSlice';
// import {fetchAllDestinations,allDestinationsStatus } from '../redux/slices/destinationsSlice';
// export default function SplashScreen() {
//   const navigation = useNavigation();
//  const dispatch = useDispatch();
//  const destinations_status =useSelector(allDestinationsStatus);
//   useEffect(() => {
//      dispatch(fetchStaticData());
//        dispatch(fetchAllPages());
//       if(destinations_status === 'idle'){
//         dispatch(fetchAllDestinations());
//       }
//     const timeout = setTimeout(() => {
//       navigation.replace('HomeScreen'); 
//     }, 2000); 
//     return () => clearTimeout(timeout); 
//   }, [navigation,dispatch,destinations_status]);
//   return (
//     <View style={styles.container}>
//       <Image
//         source={require('../assets/images/splashLogo.png')}
//         style={styles.imgStyle}
//       />
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#ffffff',
//   },
//   imgStyle: {
//     resizeMode: 'fill',
//     height: 180,
//     width: 220,
//     alignSelf: 'center',
//   },
// });
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { fetchStaticData } from '../redux/slices/StaticSlice';
import { fetchAllPages } from '../redux/slices/pagesSlice';
import { fetchAllDestinations, allDestinationsStatus } from '../redux/slices/destinationsSlice';
import NoInternetMessage from '../components/NoInternetMessage'; // Assuming you have this component

export default function SplashScreen() {
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

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splashLogo.png')}
        style={styles.imgStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  imgStyle: {
    resizeMode: 'fill',
    height: 180,
    width: 220,
    alignSelf: 'center',
  },
});