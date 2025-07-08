import React from 'react';
import { View, StyleSheet, TouchableOpacity, Linking, Image, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import InstagramIcon from '../assets/images/insta.png';
import FacebookIcon from '../assets/images/fb.png';
import PinterestIcon from '../assets/images/pinteret.png';
import YouTubeIcon from '../assets/images/youtube.png';
import TwitterIcon from '../assets/images/twitter.png';
// Try to import a cross/close icon from assets, fallback to text if not available
let CrossIcon;
try {
  CrossIcon = require('../assets/images/cross.png');
} catch {
  CrossIcon = null;
}

const SOCIAL_LINKS = [
  {
    icon: InstagramIcon,
    url: 'https://instagram.com/yourprofile',
    label: 'Instagram',
  },
  {
    icon: FacebookIcon,
    url: 'https://facebook.com/yourprofile',
    label: 'Facebook',
  },
  {
    icon: PinterestIcon,
    url: 'https://pinterest.com/yourprofile',
    label: 'Pinterest',
  },
  {
    icon: YouTubeIcon,
    url: 'https://youtube.com/yourprofile',
    label: 'YouTube',
  },
  {
    icon: TwitterIcon,
    url: 'https://twitter.com/yourprofile',
    label: 'Twitter',
  },
];

export default function CustomDrawerContent(props) {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props} contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.crossRow}>
          <TouchableOpacity
            onPress={() => props.navigation.closeDrawer()}
            style={styles.crossButton}
            accessibilityLabel="Close Drawer"
          >
            {CrossIcon ? (
              <Image source={CrossIcon} style={styles.crossImg} />
            ) : (
              <Text style={styles.crossText}>×</Text>
            )}
          </TouchableOpacity>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.socialRow}>
        {SOCIAL_LINKS.map((item) => (
          <TouchableOpacity
            key={item.label}
            onPress={() => Linking.openURL(item.url)}
            style={styles.iconButton}
            accessibilityLabel={item.label}  >
            <Image source={item.icon} style={styles.iconImg} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  crossRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 12,
    paddingBottom: 8,
  },
  crossButton: {
    padding: 12,
    borderRadius: 20,
  },
  crossImg: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
  },
  crossText: {
    fontSize: 32,
    color: 'black',
    fontWeight: 'bold',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal:20,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  iconButton: {
    padding: 8,
  },
  iconImg: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
}); 