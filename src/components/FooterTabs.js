import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export function FooterTabs() {
  const navigation = useNavigation();
  const route = useRoute();
  const currentRoute = route.name;

  const tabs = [
    {
      name: 'Inquire',
      label: 'Inquire',
      icon: require('../assets/images/inquiry.png'),
      activeIcon: require('../assets/images/whiteInquiry.png'),
    },
    {
      name: 'SpecialOffer',
      label: 'Special Offers',
      icon: require('../assets/images/specialOffer.png'),
      activeIcon: require('../assets/images/specialOfferWhite.png'),
    },
    {
      name: 'Messages',
      label: 'LiveChat',
      icon: require('../assets/images/blackLiveChat.png'),
      activeIcon: require('../assets/images/WhhiteLiveChat.png'), 
    },
    {
      name: 'Reviews',
      label: 'Reviews',
      icon: require('../assets/images/reviewIcon.png'),
      activeIcon: require('../assets/images/reviewWhite.png'),
    },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isFocused = currentRoute === tab.name;
         const isFirstTab = tab.name === 'Inquire';
        return (
          <TouchableOpacity
            key={tab.name}
            style={[styles.tab,isFirstTab && styles.firstTab, ]}
            
            onPress={() => navigation.navigate(tab.name)}
          >
            <View style={[styles.iconContainer, isFocused && styles.iconContainerFocused]}>
              <Image
                source={isFocused ? tab.activeIcon : tab.icon}
                style={[styles.imageIcon, tab.name === 'Inquire' && styles.firstImageIcon,]}
              />
            </View>
            <Text style={[styles.tabText, isFocused && styles.tabTextFocused]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
    shadowOpacity:10,
    elevation:10
  },
   firstImageIcon: {
    width: 23,   
    height: 26,  
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerFocused: {
    backgroundColor: '#C28D3E',
    paddingHorizontal:30
  },
  imageIcon: {
    width: 26,
    height: 26,
  },
  tabText: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  },
  tabTextFocused: {
    color: '#C28D3E',
  },
});

export default FooterTabs;

