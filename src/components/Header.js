
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HomeBackIcon from '../assets/images/HomeIcon.svg';    
import NotifyIcon from '../assets/images/NotifyIconn.svg';  
import HeaderBackground from '../assets/images/headerbackgroundimage.png'; 
import BackIcon from '../assets/images/BackWhiteIcon.svg'
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
  onPress={() =>
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainApp' }],
    })
  }
>
  <HomeBackIcon width={20} height={20} />
</TouchableOpacity>

          <View style={styles.verticalDivider} />
          <TouchableOpacity onPress={onBack ? onBack : () => navigation.goBack()}>
            <BackIcon width={22} height={22}  />
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
  height: Platform.OS === 'ios' ? 150 : 110, // ⬆️ Increased height
  paddingTop: Platform.OS === 'ios' ? 60 : StatusBar.currentHeight || 10, // ⬆️ Better status bar padding
  width: '100%',
  justifyContent: 'center',
},

  overlay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
     paddingBottom: 25, 
  },
  iconButton: {
    padding: 5,
  },
   leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
  },
  verticalDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#fff',
    marginHorizontal: 8,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
});
