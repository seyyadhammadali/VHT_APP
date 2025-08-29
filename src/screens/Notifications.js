
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   Image,
//   FlatList,
//   Dimensions,
//   Platform
// } from 'react-native';
// import Header from '../components/Header';
// import colors from '../constants/colors';
// const { width } = Dimensions.get('window');
// import EmptyNotificationsImage from '../assets/images/unreadError.svg';
// import MaldivesImage from '../assets/images/meldives.png';
// import MoroccoImage from '../assets/images/morocoone.png';
// import CruiseImage from '../assets/images/morocotwo.png';
// import SwitzerlandImage from '../assets/images/morocothree.png';
// import TurkeyImage from '../assets/images/morocofour.png';
// const Notifications = ({ navigation }) => {
//   const [activeTab, setActiveTab] = useState('Unread');
//   const readNotifications = [
//     // {
//     //   id: '1',
//     //   title: 'Maldives Special - Just Launched!',
//     //   description: 'Book your 5-night Maldives escape with free island excursions included.',
//     //   image: MaldivesImage,
//     // },
//     // {
//     //   id: '2',
//     //   title: 'Morocco Dream Deal Alert!',
//     //   description: 'Book your 5-night Maldives escape with free island excursions included.',
//     //   image: MoroccoImage,
//     // },
//     // {
//     //   id: '3',
//     //   title: 'Cruise Lovers Rejoice!',
//     //   description: 'Book your 5-night Maldives escape with free island excursions included.',
//     //   image: CruiseImage,
//     // },
//     // {
//     //   id: '4',
//     //   title: 'Adventure Awaits in Switzerland',
//     //   description: 'Book your 5-night Maldives escape with free island excursions included.',
//     //   image: SwitzerlandImage,
//     // },
//     // {
//     //   id: '5',
//     //   title: 'Flash Sale: Turkey Getaway!',
//     //   description: 'Book your 5-night Maldives escape with free island excursions included.',
//     //   image: TurkeyImage,
//     // },
//     // {
//     //   id: '6',
//     //   title: 'Turkey – Multi-City Tour On Sale!',
//     //   description: 'Book your 5-night Maldives escape with free island excursions included.',
//     //      image: CruiseImage,
//     // },
//     // {
//     //   id: '7',
//     //   title: 'Cruise Lovers Rejoice!',
//     //   description: 'Book your 5-night Maldives escape with free island excursions included.',
//     //    image: TurkeyImage,
//     // },
//   ];
//   const renderNotificationItem = ({ item }) => (
//     <View style={styles.notificationCard}>
//       <View style={styles.notificationTextContent}>
//         <Text style={styles.notificationTitle}>{item.title}</Text>
//         <Text style={styles.notificationDescription}>{item.description}</Text>
//       </View>
//       {item.image && (
//         <Image source={item.image} style={styles.notificationImage} />
//       )}
//     </View>
//   );
//   return (
//     <SafeAreaView style={styles.safeArea}>
//          <Header title="Notifications" showNotification={true} navigation={navigation} />
//       <View style={styles.tabContainer}>
//         <TouchableOpacity
//           style={[styles.tab, activeTab === 'Unread' && styles.activeTab]}
//           onPress={() => setActiveTab('Unread')} >
//           <Text style={[styles.tabText, activeTab === 'Unread' && styles.activeTabText]}>Unread</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.tab, activeTab === 'Read' && styles.activeTab]}
//           onPress={() => setActiveTab('Read')} >
//           <Text style={[styles.tabText, activeTab === 'Read' && styles.activeTabText]}>Read</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.content}>
//         {activeTab === 'Unread' ? (
//           <View style={styles.emptyStateContainer}>
//             <EmptyNotificationsImage style={styles.emptyImage} />
//             <Text style={styles.emptyText}>Empty</Text>
//             <Text style={styles.emptySubText}>You don’t have any notifications at this time</Text>
//           </View>
//         ) : (
//        <>
//         {readNotifications.length > 0 ? (
//           <FlatList
//             data={readNotifications}
//             keyExtractor={(item) => item.id}
//             renderItem={renderNotificationItem}
//             contentContainerStyle={styles.notificationListContent}
//             showsVerticalScrollIndicator={false}
//           />
//         ):(
//           <View style={styles.emptyStateContainer}>
//             <EmptyNotificationsImage style={styles.emptyImage} />
//             <Text style={styles.emptyText}>Empty</Text>
//             <Text style={styles.emptySubText}>You don’t have any notifications at this time</Text>
//           </View>
//         )}
//        </>
         
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };
// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: colors.white,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingTop: Platform.OS === 'android' ? 20 : 0,
//     paddingBottom: 15,
//   },
//   backButton: {
//     padding: 5,
//     marginRight: 10,
//   },
//   backArrow: {
//     width: 20,
//     height: 20,
//     resizeMode: 'contain',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: colors.darkGray,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: colors.borderGrayLighter,
//     paddingHorizontal: 20,
//     width:"96%",
//     alignItems:"center",
//     alignSelf:"center"
//   },
//   tab: {
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderBottomWidth: 2,
//     borderBottomColor: 'transparent',
//     marginRight: 15,
//     width:'50%'
//   },
//   activeTab: {
//     borderBottomColor: colors.gold,
//   },
//   tabText: {
//     fontSize: 16,
//     color: colors.gray,
//     textAlign:"center"
//   },
//   activeTabText: {
//     color: colors.gold,
//     fontWeight: 'bold',
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   emptyStateContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingBottom: 120,
//   },
//   emptyImage: {
//     width: 150,
//     height: 150,
//     resizeMode: 'contain',
//     marginBottom: 20,
//   },
//   emptyText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: colors.mediumGray,
//     marginBottom: 5,
//   },
//   emptySubText: {
//     fontSize: 14,
//     color: colors.gray,
//     textAlign: 'center',
//   },
//   notificationListContent: {
//     paddingTop: 20,
//     paddingBottom: 20,
//     width: width - 40,
//   },
//   notificationCard: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     marginBottom: 12,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
 
//   },
//   notificationTextContent: {
//     flex: 1,
//     paddingHorizontal:10,
//     paddingVertical:5
//   },
//   notificationTitle: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: 'black',
//     marginBottom: 5,
//   },
//   notificationDescription: {
//     fontSize: 12,
//     color: '#888888',
//     lineHeight: 18,
//     fontWeight:'400'
//   },
//   notificationImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 8,
//     resizeMode: 'cover',
//   },
// });
 
// export default Notifications;