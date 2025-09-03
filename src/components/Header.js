
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
import NotifyIconSVG from '../assets/images/WhiteNotify.svg';
import HeaderBackground from '../assets/images/headerbackgroundimage.webp'; 
import BackIcon from '../assets/images/BackWhiteIcon.svg';
import { useDrawer } from "./DrawerProvider";
import { mainStyles, SPACING } from '../constants/theme';
const Header = ({ title = '', showNotification = true, onBack }) => {
  const navigation = useNavigation();
  const { setOpen } = useDrawer();
  return (
    <View>
    <ImageBackground
      source={HeaderBackground}
      style={styles.headerContainer}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.overlay}>
        <View style={styles.leftSection}>
          <TouchableOpacity
          onPress={() => setOpen(true)}
            style={styles.iconButton}
          >
            <Image source={require('../assets/images/whiteMenu.png')} style={{width: 25, height: 25}} />
          </TouchableOpacity>
          <View style={styles.verticalDivider} />
          <TouchableOpacity onPress={onBack ? onBack : () => navigation.goBack()}  style={[styles.iconButton,{alignItems:'flex-start'}]}>
            <BackIcon width={28} height={28}  />
          </TouchableOpacity>
        </View>
        <Text style={mainStyles.headerTitle}>{title}</Text>
        {showNotification ? (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <NotifyIconSVG width={28} height={30} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconButton} />
        )}
      </View>
    </ImageBackground>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
 headerContainer: {
   height: Platform.OS === 'ios' ? 150 : 110, 
    paddingTop: Platform.OS === 'ios' ? 60 : StatusBar.currentHeight || 10,
    width: '100%',
    paddingBottom: 0, 
    justifyContent: 'center',
  },
  overlay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.screen,
    paddingBottom: 5, 
  },
  iconButton: {
    height:44,
    width:44,
    justifyContent:'center',
    alignItems:'center'
  },
  leftSection: {
    flexDirection:"row", 
    alignItems:"center", 
    justifyContent:"center"
  },
  verticalDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#fff',
  },
});
