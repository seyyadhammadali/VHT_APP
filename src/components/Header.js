
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Platform,
  StatusBar,Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';   
import NotifyIcon from '../assets/images/NotifyIconn.svg';  
import HeaderBackground from '../assets/images/headerbackgroundimage.png'; 
import BackIcon from '../assets/images/BackWhiteIcon.svg';

const Header = ({ title = '', showNotification = true, onBack }) => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={HeaderBackground}
      style={styles.headerContainer}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.overlay}>
           <View style={styles.leftSection}>
     <TouchableOpacity
            onPress={() => navigation.openDrawer()} // This will open the side drawer
            style={styles.menuButton} // Added a specific style for the menu button if needed
          >
        <Image source={require('../assets/images/whiteMenu.png')} style={styles.menuIcon} />
          </TouchableOpacity>
          <View style={styles.verticalDivider} />
          <TouchableOpacity onPress={onBack ? onBack : () => navigation.goBack()}>
            <BackIcon width={20} height={20}  />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{title}</Text>
        {showNotification ? (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <NotifyIcon width={20} height={20} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconButton} />
        )}
      </View>
    </ImageBackground>
  );
};

export default Header;

const styles = StyleSheet.create({
 headerContainer: {
   height: Platform.OS === 'ios' ? 150 : 110, // This height dictates the overall space the header takes
    paddingTop: Platform.OS === 'ios' ? 60 : StatusBar.currentHeight || 10, // Padding for status bar
    width: '100%',
    justifyContent: 'center',
},

   overlay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 25, // This should already be 0 as per previous instructions
  },
  menuIcon:{
    width: 20, height: 20,
     marginRight: 5,
  },
  iconButton: {
    padding: 5,
  },
   leftSection: {
    flexDirection: 'row',
    // alignItems: 'center',
    gap: 5,
  },
  verticalDivider: {
    width: 1,
    height: 22,
    backgroundColor: '#fff',
    marginHorizontal: 0,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    paddingRight:30
    // flex: 1,
  },
});
