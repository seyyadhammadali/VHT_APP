import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Linking, Image, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStaticData, selectStaticData } from '../redux/slices/StaticSlice';
import InstagramIcon from '../assets/images/insta.png';
import FacebookIcon from '../assets/images/fb.png';
import PinterestIcon from '../assets/images/pinteret.png';
import YouTubeIcon from '../assets/images/youtube.png';
import TwitterIcon from '../assets/images/twitter.png';
import CrossIcon from '../assets/images/cross.png';

const ICONS_TO_DISPLAY = [
  { icon: InstagramIcon, label: 'Instagram' },
  { icon: FacebookIcon, label: 'Facebook' },
  { icon: PinterestIcon, label: 'Pinterest' },
  { icon: YouTubeIcon, label: 'YouTube' },
  { icon: TwitterIcon, label: 'Twitter' },
];

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  const staticData = useSelector(selectStaticData);

  useEffect(() => {
    dispatch(fetchStaticData());
  }, [dispatch]);

  const socialLinks = ICONS_TO_DISPLAY.map(item => {
    const url = staticData?.social_links?.[item.label.toLowerCase()];
    return { ...item, url };
  });

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props} contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.crossRow}>
          <TouchableOpacity
            onPress={() => props.navigation.closeDrawer()}
            style={styles.crossButton}
            accessibilityLabel="Close Drawer"
          >
            <Image source={CrossIcon} style={styles.crossImg} />
          </TouchableOpacity>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.socialRow}>
        {socialLinks.map((item) => (
          <TouchableOpacity
            key={item.label}
            onPress={() => {
              if (item.url) {
                Linking.openURL(item.url)
              }
            }}
            style={styles.iconButton}
            accessibilityLabel={item.label}
          >
            <Image source={item.icon} style={styles.iconImg} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

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

export default CustomDrawerContent; 