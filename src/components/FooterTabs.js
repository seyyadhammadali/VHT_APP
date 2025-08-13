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
      activeIcon: require('../assets/images/WhhiteLiveChat.png'), // watch spelling here
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
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => navigation.navigate(tab.name)}
          >
            <View style={[styles.iconContainer, isFocused && styles.iconContainerFocused]}>
              <Image
                source={isFocused ? tab.activeIcon : tab.icon}
                style={styles.imageIcon}
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


// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity ,Image} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// export function FooterTabs() {
//     const navigation = useNavigation();
//   return (
   
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.tab} onPress={()=>navigation.navigate('Inquire')}>
// <Image source={require('../assets/images/inquiry.png')} style={styles.imageIcon}/>
//         <Text style={styles.tabText}>Inquire</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.tab} onPress={()=>navigation.navigate('SpecialOffer')}>
//       <Image source={require('../assets/images/specialOffer.png')} style={styles.imageIcon}/>
//         <Text style={styles.tabText}>Special Offers</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.tab} onPress={()=>navigation.navigate('Messages')}>
//       <Image source={require('../assets/images/blackLiveChat.png')} style={styles.imageIcon}/>
//         <Text style={styles.tabText}>LiveChat</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.tab} onPress={()=>navigation.navigate('Reviews')}>
//       <Image source={require('../assets/images/reviewIcon.png')} style={styles.imageIcon}/>
//         <Text style={styles.tabText}>Reviews</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     paddingVertical: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#e0e0e0',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 120,
//   },
//   tab: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   tabText: {
//     fontSize: 12,
//     color: '#333',
//   },
 
//     tabBarContainer: {
//         flexDirection: 'row',
//         backgroundColor:'white',
//         position: 'absolute',
//         bottom: 0,
//         height: 60,
//         elevation: 5,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         justifyContent: 'space-around', 
//         alignItems: 'center',
//         width: "100%",
//         paddingBottom: 5,
//     },
//     tabButton: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingVertical: 5,
//         flexDirection: 'column', 
//     },
//     imageIcon: {
//         width: 24,
//         height: 24,
//         // Removed marginTop to allow the icon to be centered by the parent view
//     },
//     iconContainer: {
//         width: 65,
//         height: 35,
//         borderRadius: 10,
//         backgroundColor: 'transparent',
//         alignItems: 'center', // Centers the child (icon) horizontally
//         justifyContent: 'center', // Centers the child (icon) vertically
//     },
//     iconContainerFocused: {
//         backgroundColor: '#C28D3E',
//         borderRadius: 10,
//         // The default `iconContainer` already has width, height, and centering properties.
//         // We only need to override the background color.
//     },
//     tabLabel: {
//         fontSize: 10,
//         color: 'gray',
//         marginTop: 4, 
//     },
//     tabLabelFocused: {
//         color: '#C28D3E',
//     }

// });

// export default FooterTabs;
