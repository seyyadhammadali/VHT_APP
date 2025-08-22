
import React,{useState} from 'react';
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
import NotifyIconSVG from '../assets/images/WhiteNotify.svg';
import HeaderBackground from '../assets/images/headerbackgroundimage.webp'; 
import BackIcon from '../assets/images/BackWhiteIcon.svg';
import { DrawerActions } from '@react-navigation/native';
import SideDrawer from '../components/SideDrawer';
const Header = ({ title = '', showNotification = true, onBack }) => {
  const navigation = useNavigation();
  // Helper to open the drawer from any screen, even if not a direct child
  const openDrawer = () => {
    const parentDrawer = navigation.getParent && navigation.getParent('ddrawer');
    if (parentDrawer) {
      parentDrawer.dispatch(DrawerActions.openDrawer());
    } else {
      navigation.dispatch(DrawerActions.openDrawer());
    }
  };
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <View>
       <SideDrawer 
          isOpen={drawerOpen}
              onClose={() => setDrawerOpen(false)}
               navigation={navigation}
              ></SideDrawer>
 
    <ImageBackground
      source={HeaderBackground}
      style={styles.headerContainer}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.overlay}>
        <View style={styles.leftSection}>
          <TouchableOpacity
           onPress={() => setDrawerOpen(true)}
            style={styles.menuButton}
          >
            <Image source={require('../assets/images/whiteMenu.png')} style={styles.menuIcon} />
          </TouchableOpacity>
          <View style={styles.verticalDivider} />
          <TouchableOpacity onPress={onBack ? onBack : () => navigation.goBack()}  style={[styles.menuButton,{width:50}]}>
            <BackIcon width={20} height={20}  />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{title}</Text>
        {showNotification ? (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <NotifyIconSVG width={22} height={22} />
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
   height: Platform.OS === 'ios' ? 150 : 110, // This height dictates the overall space the header takes
    paddingTop: Platform.OS === 'ios' ? 60 : StatusBar.currentHeight || 10, // Padding for status bar
    width: '100%',
    paddingBottom: 0, // This should already be 0 as per previous instructions
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
   menuButton:{
    paddingVertical:15,height:80,marginTop:30,alignSelf:"center"
   },
  iconButton: {
    padding: 5,
  },
   leftSection: {
    flexDirection: 'row',
    marginTop:3,
    // alignItems: 'center',
    gap: 5,
  },
  verticalDivider: {
    width: 2,
    height: 22,
    backgroundColor: '#fff',
    marginHorizontal: 0,
    marginTop:45
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
