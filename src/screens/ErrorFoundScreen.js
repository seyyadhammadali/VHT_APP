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
import NetInfo from '@react-native-community/netinfo';
import Errorfoud  from '../assets/images/404Error.svg';
const { width } = Dimensions.get('window');
const ErrorFoundScreen = ({ showSearch = false }) => {
  const navigation = useNavigation();
  const [isConnected, setIsConnected] = useState(null);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);
  const openWifiSettings = () => {
   navigation.goBack();
  };
  return (
    <View style={styles.container}>
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
      <Errorfoud height={240} width={260} />
      <Text style={styles.connectionStyle}>Page not Found</Text>
      <Text style={styles.lightText}>The page you requested could not be{'\n'}found on this server.</Text>
      <TouchableOpacity style={styles.butonStyle} onPress={openWifiSettings}>
        <Text style={styles.textStyle}> Try Again</Text>
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
    justifyContent: 'center',   
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
    fontWeight: '600',
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
    
    textAlign:"center",
    lineHeight:20
  },
});

export default ErrorFoundScreen;
