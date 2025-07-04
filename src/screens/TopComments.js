
// import React, { useRef, useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   Image,
//   Dimensions,
//   SafeAreaView,
//   TouchableOpacity,
//   FlatList, 
//   ImageBackground
// } from 'react-native';
// import Seaview1 from  '../assets/images/seaview5.png';
// import Seaview2 from '../assets/images/seaview3.png';
// import Seaview3 from '../assets/images/seaviewone.png';
// const { width } = Dimensions.get('window');
// const LocationS = (props) => <Text style={{ fontSize: props.height, color: 'gray' }}>📍</Text>;
// const TimerS = (props) => <Text style={{ fontSize: props.height, color: '#C28D3E' }}>⏱️</Text>;
// const TourG = (props) => <Text style={{ fontSize: props.width, color: 'goldenrod' }}>🗺️</Text>;
// const Tour = (props) => <Text style={{ fontSize: props.width, color: 'gray' }}>🗺️</Text>;
// const HotelG = (props) => <Text style={{ fontSize: props.width, color: 'goldenrod' }}>🏨</Text>;
// const Hotel = (props) => <Text style={{ fontSize: props.width, color: 'gray' }}>🏨</Text>;
// const TravelG = (props) => <Text style={{ fontSize: props.width, color: 'goldenrod' }}>✈️</Text>;
// const Travel = (props) => <Text style={{ fontSize: props.width, color: 'gray' }}>✈️</Text>;
// const YellowLocation = (props) => <Text style={{ fontSize: props.width, color: 'orange' }}>📍</Text>;
// const StarS = (props) => <Text style={{ fontSize: props.width, color: 'gold' }}>⭐</Text>;
// const TopComments = ({ navigation }) => {
//   const flatListRef = useRef(null);
//   const [index, setIndex] = useState(0);
//   const [activeTab, setActiveTab] = useState('Tour'); 
//   const [expandedIndex, setExpandedIndex] = useState(null);
// const headerData = [
//   {
//     image: Seaview1,
//     title: 'Kuredu Island Resort & Spa Hotel',
//     duration: '07 Days',
//     subtitle: 'Step Into Paradise with Kuredu Maldives - All Meals & Transfers',
//     price: '£ 1399',
//     per: 'per person',
//     details:
//       '10 Nights Holiday Deal at Bangkok, Phu Quoc & Phuket with \nBreakfast Starting From £1,299/pp Up to 40% Off\nfor 2025 || Book Now with a Reduced Deposit – Just £99/pp\nonly for 2025-26',
//   },
//   {
//     image: Seaview2,
//     title: 'Centara Grand Maldives Resort',
//     duration: '05 Days',
//     subtitle: 'Enjoy Luxury & Marine Life at Centara Grand',
//     price: '£ 1199',
//     per: 'per person',
//     details:
//       '5 Nights Deal Including Flights + Meals Starting from £1199\nBook with Reduced Deposit || Offer Valid for Early 2025',
//   },
//   {
//     image: Seaview3,
//     title: 'Sun Siyam Iru Fushi',
//     duration: '08 Days',
//     subtitle: 'Romantic Getaway with Ocean View Villa',
//     price: '£ 1499',
//     per: 'per couple',
//     details:
//       '8 Nights Stay with All-Inclusive + Transfers\nBook Now for Early Bird Discount || Limited Time Offer',
//   },
// ];
// const articleSections = [
//   {
//     title: '📍 A Traveller’s Guide to Japan',
//     subtitle: 'Ever visualized cherry blossoms?',
//     paragraph:
//       'Ever visualized the sight of cherry blossom petals dancing freely in cool breeze or a night sky full of glowing lanterns? If so, Japan might just be the destination your soul has been yearning for. This place on Earth is all about unique traditions and festive celebrations...',
//     image: require('../assets/images/seatwo.png'),
//   },
//   {
//     title: '📌 The First Question: Where Should I Stay?',
//     subtitle: 'Modern vs. Traditional?',
//     paragraph:
//       'This question might be your biggest concern when planning your Japan luxury holidays... Pick from sleek 5-star hotels in Tokyo to serene Ryokans by the mountains.',
//     image: require('../assets/images/seaview3.png'),
//   },
//   {
//     title: '🥢 Savoring Japanese Cuisine',
//     subtitle: 'From Sushi to Ramen',
//     paragraph:
//       '1. Ryokans with a Traditional Japanese Touch.\nThese local Japanese inns offer a traditional vibe with tatami mats, kaiseki meals, and onsen baths. Perfect for travelers seeking authenticity.',
//     image: require('../assets/images/seaviewone.png'),
//   },
//     {
//     title: '📍 A Traveller’s Guide to Japan',
//     subtitle: 'Ever visualized cherry blossoms?',
//     paragraph:
//       'Ever visualized the sight of cherry blossom petals dancing freely in cool breeze or a night sky full of glowing lanterns? If so, Japan might just be the destination your soul has been yearning for. This place on Earth is all about unique traditions and festive celebrations...',
//     image: require('../assets/images/seatwo.png'),
//   },
//   {
//     title: '📌 The First Question: Where Should I Stay?',
//     subtitle: 'Modern vs. Traditional?',
//     paragraph:
//       'This question might be your biggest concern when planning your Japan luxury holidays... Pick from sleek 5-star hotels in Tokyo to serene Ryokans by the mountains.',
//     image: require('../assets/images/seaview3.png'),
//   },
//   {
//     title: '🥢 Savoring Japanese Cuisine',
//     subtitle: 'From Sushi to Ramen',
//     paragraph:
//       '1. Ryokans with a Traditional Japanese Touch.\nThese local Japanese inns offer a traditional vibe with tatami mats, kaiseki meals, and onsen baths. Perfect for travelers seeking authenticity.',
//     image: require('../assets/images/seaviewone.png'),
//   },
// ];


// const getModifiedArticleSections = () => {
//   const modified = [];
//   let imageIndex = 0;

//   for (let i = 0; i < articleSections.length; i++) {
//     const item = articleSections[i];
//     modified.push(item);

//     if (
//       item.type === 'subtitle' &&
//       item.content.includes('📌 The First Question')
//     ) {
//       // Always add a text block
//       modified.push({
//         type: 'text',
//         content:
//           'This is a useful guide paragraph added automatically after the First Question heading. It helps elaborate on what kind of accommodations to expect in Japan.',
//         key: `auto-paragraph-${i}`,
//       });

//       // Then add image
//       modified.push({
//         type: 'repeatImage',
//         source: repeatedImages[imageIndex % repeatedImages.length],
//         key: `auto-image-${i}`,
//       });

//       imageIndex++;
//     }
//   }

//   return modified;
// };

// const modifiedArticleSections = getModifiedArticleSections();

//   const handleScrollEnd = (event) => {
//     const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
//     setIndex(newIndex);
//   };

//   useEffect(() => {
//     // Basic auto-scroll for demonstration (optional)
//     const interval = setInterval(() => {
//       setIndex((prevIndex) => {
//         const nextIndex = (prevIndex + 1) % headerData.length;
//         if (flatListRef.current) {
//           flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
//         }
//         return nextIndex;
//       });
//     }, 5000); // Change image every 5 seconds
//     return () => clearInterval(interval);
//   }, [headerData.length]);
// const renderContentItem = ({ item }) => {
//   switch (item.type) {
//     case 'text':
//       return <Text style={styles.paragraph}>{item.content}</Text>;
//     case 'subtitle':
//       return <Text style={styles.subTitle}>{item.content}</Text>;
//     case 'caption':
//       return <Text style={styles.imageCaptionTitle}>{item.content}</Text>;
//     case 'bullet':
//       return (
//         <Text style={styles.bulletPoint}>
//           • <Text style={{ fontWeight: 'bold' }}>{item.content}</Text>
//         </Text>
//       );
//     case 'repeatImage':
//       return (
//         <Image
//           source={item.source}
//           style={styles.contentImage}
//           resizeMode="cover"
//         />
//       );
//     default:
//       return null;
//   }
// };


//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView contentContainerStyle={styles.container}>
//         {/* Header Image Slider */}
//         <View style={styles.sliderContainer}>
//           <ImageBackground
        
              
//                 source={require('../assets/images/seaview5.png')}
//                 style={styles.fullWidthImage}>
//                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnStyle}>
//            <Image
//              source={require('../assets/images/Back.png')}
//              style={styles.logoStyle}
//            />
//          </TouchableOpacity>
//             </ImageBackground>
// </View>
       
//         <View style={styles.mainContentArea}>
//           {/* Title and Date Section */}
//           <View style={styles.titleDateSection}>
//             <Text style={styles.mainTitleStyle}>📍 A Traveller’s Guide to Japan Holiday</Text>
//             <Text style={styles.dateStyle}>29 May 2025 | Latest News</Text>
//           </View>
// <FlatList
//   data={articleSections}
//   keyExtractor={(item, index) => index.toString()}
//   renderItem={({ item }) => (
//     <View style={{ marginBottom: 30 }}>
//       <Text style={styles.subTitle}>{item.title}</Text>
//       <Text style={styles.imageCaptionTitle}>{item.subtitle}</Text>
//       <Text style={styles.paragraph}>{item.paragraph}</Text>
//       <Image source={item.image} style={styles.contentImage} resizeMode="cover" />
//     </View>
//   )}
//   scrollEnabled={false}
//   contentContainerStyle={{ paddingBottom: 80 }}
// />

//         </View>
//         <View style={{ height: 50 }} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default TopComments;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   container: {
//     paddingBottom: 100,
//   },
//   sliderContainer: {
//     width: width,
//     height: 300, // Height of the slider/header image
//     backgroundColor: '#eee',
//     position: 'relative',
//   },
//   fullWidthImage: {
//     width: width,
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   paginationContainer: {
//     position: 'absolute',
//     bottom: 10,
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     marginHorizontal: 4,
//   },
//   activeDot: {
//     backgroundColor: 'white',
//   },
//   inactiveDot: {
//     backgroundColor: 'rgba(255,255,255,0.5)',
//   },
//   backButton: {
//     position: 'absolute',
//     top: 50, // Adjust as needed to fit status bar/notch
//     left: 20,
//     zIndex: 10, // Ensure it's above the image
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     borderRadius: 20,
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   backIcon: {
//     width: 20,
//     height: 20,
//     tintColor: '#fff',
//   },
//   mainContentArea: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 50,
//     // borderTopRightRadius: 30,
//     marginTop: -40, // Pulls the content up over the image
//     paddingTop: 20,
//     paddingHorizontal: 20,
//     elevation: 5, // For Android shadow
//     shadowColor: '#000', // For iOS shadow
//     shadowOffset: { width: 0, height: -3 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//   },
//   titleDateSection: {
//     marginBottom: 15,
//   },
//   mainTitleStyle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#222',
//   },
//   dateStyle: {
//     fontSize: 12,
//     color: '#888',
//     marginTop: 4,
//   },
//   paragraph: {
//     fontSize: 15,
//     color: '#333',
//     lineHeight: 22,
//     marginBottom: 15,
//   },
//     btnStyle: {
//     backgroundColor: "#ffffff",
//     width: 32,
//     height: 32,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 32,
//     marginLeft: 20
//   },
//   subTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#C82828', // Red color from the image
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   contentImage: {
//     width: '100%',
//     height: 200, // Adjusted height for better fit
//     borderRadius: 10,
//     marginTop: 10,
//     marginBottom: 15,
//   },
//   imageCaptionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333',
//   },
//   bulletPoint: {
//     fontSize: 15,
//     lineHeight: 22,
//     paddingLeft: 5, // Indent for bullet points
//     marginBottom: 8,
//     color: '#333',
//   },

//   // Styles from the original code that were not directly visible in the screenshot,
//   // but are kept for completeness/future use.
//   innerContent: {
//     // This view might wrap additional content below the main article
//     paddingBottom: 10,
//     marginTop: 20, // Separation from the main article
//   },
//   staticInfoContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//     paddingVertical: 5,
//   },
//   leftInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   rightInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   iconStyle: {
//     marginRight: 5,
//   },
//   mainText: {
//     fontSize: 13,
//   },
//   textStyle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: '#333',
//   },
//   person: {
//     flexDirection: 'row',
//     alignItems: 'baseline',
//     marginBottom: 5,
//   },
//   dollarprice: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#C28D3E',
//     marginRight: 5,
//   },
//   personS: {
//     fontSize: 14,
//     color: 'gray',
//   },
//   nightStyle: {
//     fontSize: 13,
//     color: '#555',
//     lineHeight: 18,
//     marginBottom: 20,
//   },
//   flightViewTour: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     paddingBottom: 10,
//     marginBottom: 15,
//   },
//   tabButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 5,
//   },
//   tabText: {
//     fontSize: 14,
//     color: 'gray',
//     marginLeft: 5,
//   },
//   tabTextActive: {
//     color: '#C28D3E',
//     fontWeight: 'bold',
//   },
//   Tabcontainer: {
//     paddingHorizontal: 0,
//   },
//   hotelcontainer: {
//     backgroundColor: '#f9f9f9',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 15,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   mainTitle: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: '#333',
//     marginLeft: 5,
//   },
//   hotelSubtitle: {
//     fontSize: 13,
//     color: '#666',
//     lineHeight: 20,
//     marginTop: 10,
//   },
//   table: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     overflow: 'hidden',
//     marginBottom: 10,
//   },
//   tableHeader: {
//     flexDirection: 'row',
//     backgroundColor: '#f2f2f2',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   tableHeaderText: {
//     flex: 1,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#333',
//     fontSize: 12,
//   },
//   tableRow: {
//     flexDirection: 'row',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   tableRowAlt: {
//     backgroundColor: '#fafafa',
//   },
//   tableCell: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: 12,
//     color: '#555',
//   },
//   sectionTour: {
//     marginBottom: 20,
//   },
//   pakageView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f0f8ff', // Light blue background for package view
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 10,
//   },
//   pakageViewB: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff0f5', // Light pink background for To Book section
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 10,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginLeft: 10,
//     color: '#333',
//   },
//   sectionTitleFood: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//   },
//   sectionTitleFoodB: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginLeft: 10,
//     color: '#333',
//   },
//   featureGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'flex-start',
//   },
//   featureItem: {
//     fontSize: 14,
//     color: '#555',
//     width: '48%', // Approx half width for two columns
//     marginBottom: 8,
//     marginRight: '2%', // Spacing between items
//   },
//   rowItemB: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//     width: '48%',
//     marginRight: '2%',
//   },
// });



import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  TextInput, // Added for form inputs
  Platform, // For platform specific styling
} from 'react-native';

// Import your local images
import Seaview1 from '../assets/images/seaview5.png';
import Seaview2 from '../assets/images/seaview3.png';
import Seaview3 from '../assets/images/seaviewone.png';
import BackIcon from '../assets/images/Back.png'; // Assuming this is your back arrow icon
 import AuthorProfile from '../assets/images/AuthorProfile.png'; // Placeholder for author image (add your actual image)
import BlueMsg from '../assets/images/blueMsg.png';
const { width } = Dimensions.get('window');

// Mock components for SVG icons (replace with your actual SVG imports if you use them)
// const LocationS = (props) => <Text style={{ fontSize: props.height, color: 'gray' }}>📍</Text>;
// const TimerS = (props) => <Text style={{ fontSize: props.height, color: '#C28D3E' }}>⏱️</Text>;
// const TourG = (props) => <Text style={{ fontSize: props.width, color: 'goldenrod' }}>🗺️</Text>;
// const Tour = (props) => <Text style={{ fontSize: props.width, color: 'gray' }}>🗺️</Text>;
// const HotelG = (props) => <Text style={{ fontSize: props.width, color: 'goldenrod' }}>🏨</Text>;
// const Hotel = (props) => <Text style={{ fontSize: props.width, color: 'gray' }}>🏨</Text>;
// const TravelG = (props) => <Text style={{ fontSize: props.width, color: 'goldenrod' }}>✈️</Text>;
// const Travel = (props) => <Text style={{ fontSize: props.width, color: 'gray' }}>✈️</Text>;
// const YellowLocation = (props) => <Text style={{ fontSize: props.width, color: 'orange' }}>📍</Text>;
// const StarS = (props) => <Text style={{ fontSize: props.width, color: 'gold' }}>⭐</Text>;

const TopComments = ({ navigation }) => {
  const flatListRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('Tour');
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);

  const headerData = [
    {
      image: Seaview1,
      title: 'Kuredu Island Resort & Spa Hotel',
      duration: '07 Days',
      subtitle: 'Step Into Paradise with Kuredu Maldives - All Meals & Transfers',
      price: '£ 1399',
      per: 'per person',
      details:
        '10 Nights Holiday Deal at Bangkok, Phu Quoc & Phuket with \nBreakfast Starting From £1,299/pp Up to 40% Off\nfor 2025 || Book Now with a Reduced Deposit – Just £99/pp\nonly for 2025-26',
    },
    {
      image: Seaview2,
      title: 'Centara Grand Maldives Resort',
      duration: '05 Days',
      subtitle: 'Enjoy Luxury & Marine Life at Centara Grand',
      price: '£ 1199',
      per: 'per person',
      details:
        '5 Nights Deal Including Flights + Meals Starting from £1199\nBook with Reduced Deposit || Offer Valid for Early 2025',
    },
    {
      image: Seaview3,
      title: 'Sun Siyam Iru Fushi',
      duration: '08 Days',
      subtitle: 'Romantic Getaway with Ocean View Villa',
      price: '£ 1499',
      per: 'per couple',
      details:
        '8 Nights Stay with All-Inclusive + Transfers\nBook Now for Early Bird Discount || Limited Time Offer',
    },
  ];

  const articleSections = [
    {
      type: 'title_date',
      title: '📍 A Traveller’s Guide to Japan Holiday',
      date: '29 May 2025 | Latest News',
    },
    {
      type: 'paragraph',
      content:
        'Ever visualized the sight of cherry blossom petals dancing freely in cool breeze or a night sky full of glowing lanterns? If so, Japan might just be the destination your soul has been yearning for. This place on Earth is all about unique traditions and festive celebrations- all rolled into one. Each season here has its own charm, and that is why travellers from across the globe plan their <Text style={{color: "#C82828", fontWeight: "bold"}}>Japan Holidays</Text> to become a part of the lively Japanese traditions that date back to centuries. Whether you are here to watch the temples covered in autumn maple leaves, cultural immersion, savour Japanese cuisine, or simply to witness energetic vibes of summer music extravaganza, Japan has a lot more to offer in terms of tourism and self-refreshment. No matter if it is your first visit or fifth, we have assembled this guide to help you explore the best of Japan- timing your trip with the seasons, holidays, and festivals that will make your journey truly special. Here we go into the detailed tour plan!',
    },
    {
      type: 'subTitle',
      content: '📌 The First Question: Where Should I Stay?',
    },
    {
      type: 'paragraph',
      content:
        'This question might be your biggest concern when planning your Japan luxury holidays, and we can’t help agreeing with it! After all, no one wants to stress over hotel locations while trying to enjoy a dream getaway. To your ease, Japan blends with traditional charm and modern luxury accommodations — you can choose to stay at any place based on your preferences and travel goals. Be it from a wide array of options ranging from sleek 5-star hotels in Tokyo to the serene Ryokans located in the mountains, and enjoy ultra-convenient experiences during your stay.',
    },
    {
      type: 'image',
      source: require('../assets/images/seaview3.png'), // Using one of your provided images
    },
    {
      type: 'imageCaption',
      content: '1. Ryokans with a Traditional Japanese Touch',
    },
    {
      type: 'paragraph',
      content:
        'These old-local Japanese inns are far from traditional vibe, and those who live diving close to the Japanese culture and traditions should consider booking here. Ryokans are all about that home-feeling, served with organic food and warm tatami mat floorings, and some of them might also come with personal hot spring or footbath. If the idea feels exciting and traditional to you, here are the top picks:',
    },
    {
      type: 'bullet',
      content: 'Gora Kadan (Hakone) – These are in the mountains for a nice view and peaceful escape with warm hospitality, exquisite art and privacy.',
    },
    {
      type: 'bullet',
      content: 'Tawaraya (Kyoto) – This is one of the most famous and oldest Ryokans in Japan, located in Kyoto.',
    },
    // Add more sections as needed based on your content flow
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % headerData.length;
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        }
        return nextIndex;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [headerData.length]);
  const renderContentItem = ({ item }) => {
    switch (item.type) {
      case 'title_date':
        return (
          <View style={styles.titleDateSection}>
            <Text style={styles.mainTitleStyle}>{item.title}</Text>
            <Text style={styles.dateStyle}>{item.date}</Text>
          </View>
        );
      case 'paragraph':
        return <Text style={styles.paragraph}>{item.content}</Text>;
      case 'subTitle':
        return <Text style={styles.subTitle}>{item.content}</Text>;
      case 'image':
        return (
          <Image
            source={item.source}
            style={styles.contentImage}
            resizeMode="cover"
          />
        );
      case 'imageCaption':
        return <Text style={styles.imageCaptionTitle}>{item.content}</Text>;
      case 'bullet':
        return (
          <Text style={styles.bulletPoint}>
            • <Text style={{ fontWeight: 'bold' }}>{item.content.split('–')[0].trim()}</Text>
            {item.content.includes('–') ? ` – ${item.content.split('–')[1].trim()}` : ''}
          </Text>
        );
      default:
        return null;
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.sliderContainer}>
          <ImageBackground
            source={headerData[index].image} // Dynamically set background image from slider data
            style={styles.fullWidthImage} >
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnStyle}>
              <Image
                source={BackIcon} // Using imported local image
                style={styles.logoStyle}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={styles.mainContentArea}>
          <FlatList
            data={articleSections}
            keyExtractor={(item, idx) => `article-${idx}`}
            renderItem={renderContentItem}
            scrollEnabled={false} 
            contentContainerStyle={{ paddingBottom: 20 }}
          />
          {/* About Author Section (below FlatList) */}
          <View style={styles.aboutAuthorContainer}>
            <View style={styles.aboutAuthorHeader}>
              <Image source={AuthorProfile} style={styles.authorImage} />
              <Text style={styles.aboutAuthorTitle}>About Author</Text>
            </View>
            <Text style={styles.authorBio}>
                 <Text style={styles.authorName}>Juli Wagner</Text> Juli Wagner a veteran travel writer and advisor, is highly known for her quest to explore the spectacular locales of
              the globe. Being in the travel industry for years, she has inspired many people with her articles and stories. Her
              writings not only offer actionable advice but also ignite the spark of adventure in her readers.
            </Text>
          </View>
          {/* Next Post Button */}
          <TouchableOpacity style={styles.nextPostButton}>
            <Text style={styles.nextPostText}>Next Post</Text>
            <Text style={styles.nextPostTitle}>A Traveler’s Guide to the 8 Best Maldivian Resorts</Text>
          </TouchableOpacity>
          {/* Leave a Reply Form */}
          <View style={styles.leaveReplyContainer}>
            <View style={styles.leaveReplyHeader}>
              <Image source={BlueMsg}  style={styles.leaveReplyIcon}/>
              <Text style={styles.leaveReplyTitle}>Leave a Reply</Text>
            </View>
            <Text style={styles.requiredFieldsText}>
              Your email address will not be published. Required fields are marked <Text style={{ color: 'red' }}>*</Text>
            </Text>
           <Text style={styles.lableStyle}>Comment</Text>
            <TextInput
              style={styles.commentInput}
              placeholder="Write your thoughts here..."
              multiline
              numberOfLines={4}
              value={comment}
              onChangeText={setComment}
              placeholderTextColor="#888"
            />
           <Text style={styles.lableStyle}>Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Your Full Name Here"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#888"
            />
           <Text style={styles.lableStyle}>Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Your Email Address Here"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#888"
            />
             <Text style={styles.lableStyle}>Website</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Your Website Here"
              value={website}
              onChangeText={setWebsite}
              placeholderTextColor="#888"
            />

            <TouchableOpacity style={styles.checkboxContainer} onPress={() => setSaveInfo(!saveInfo)}>
              <View style={styles.checkbox}>
                {saveInfo && <Text style={styles.checkboxCheck}>✓</Text>}
              </View>
              <Text style={styles.checkboxText}>
                Save my name, email, and website in this browser for the next time I comment.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.postCommentButton}>
              <Text style={styles.postCommentText}>Post Comment</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TopComments;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingBottom: 0,
  },
  sliderContainer: {
    width: width,
    height: 300,
    backgroundColor: '#eee',
    position: 'relative',
  },
  fullWidthImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'space-between', 
  },
  btnStyle: {
    backgroundColor: "#ffffff",
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 50 : 20, 
    marginLeft: 20
  },
  logoStyle: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  japanHolidaysContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 70 : 40, 
    right: 20,
    alignItems: 'flex-end',
  },
  japanText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'normal',
  },
  holidaysText: {
    fontSize: 34,
    fontWeight: '900', 
    color: '#fff',
    lineHeight: 34,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'white',
  },
  inactiveDot: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  mainContentArea: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 0, 
    marginTop: -40, 
    paddingTop: 20,
    paddingHorizontal: 20,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  titleDateSection: {
    marginBottom: 15,
  },
  mainTitleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  dateStyle: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  paragraph: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#C82828',
    marginTop: 10,
    marginBottom: 10,
  },
  contentImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 15,
  },
  imageCaptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  bulletPoint: {
    fontSize: 15,
    lineHeight: 22,
    paddingLeft: 5,
    marginBottom: 8,
    color: '#333',
  },
  aboutAuthorContainer: {
    backgroundColor: '#F7F7F7', 
    borderRadius: 10,
    padding: 5,
    marginBottom: 20,
  },
  aboutAuthorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor:'#C28D3E14',
    paddingVertical:10,
    paddingHorizontal:10
  },
  authorImage: {
    width: 11,
    height: 14,
    borderRadius: 15,
    marginRight: 10,
  },
  aboutAuthorTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#101010',
  },
  authorName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  authorBio: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginTop:10
  },
  nextPostButton: {
    backgroundColor: '#E6F3F0', 
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50', 
  },
  nextPostText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  nextPostTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  leaveReplyContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    marginBottom: 20,
  },
  leaveReplyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  leaveReplyIcon: {
    fontSize: 20,
    marginRight: 5,
  },
  leaveReplyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  requiredFieldsText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 15,
  },
  commentInput: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    minHeight: 100, 
    textAlignVertical: 'top', 
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#eee',
  },
  textInput: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#eee',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#C28D3E', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginRight: 10,
  },
  checkboxCheck: {
    color: '#C28D3E',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxText: {
    fontSize: 13,
    color: '#555',
    flexShrink: 1, 
  },
  postCommentButton: {
    backgroundColor: '#333', 
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    width:"75%",
    justifyContent:"center",
    alignSelf:"center"

  },
  postCommentText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  innerContent: {
    paddingBottom: 10,
    marginTop: 20,
  },
  staticInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 5,
  },
  leftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    marginRight: 5,
  },
  mainText: {
    fontSize: 13,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  person: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 5,
  },
  dollarprice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C28D3E',
    marginRight: 5,
  },
  personS: {
    fontSize: 14,
    color: 'gray',
  },
  nightStyle: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
    marginBottom: 20,
  },
  flightViewTour: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
    marginBottom: 15,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tabText: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 5,
  },
  tabTextActive: {
    color: '#C28D3E',
    fontWeight: 'bold',
  },
  Tabcontainer: {
    paddingHorizontal: 0,
  },
  hotelcontainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  mainTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 5,
  },
  hotelSubtitle: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
    marginTop: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    fontSize: 12,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableRowAlt: {
    backgroundColor: '#fafafa',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    color: '#555',
  },
  sectionTour: {
    marginBottom: 20,
  },
  pakageView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  pakageViewB: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff0f5',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  sectionTitleFood: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  sectionTitleFoodB: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  featureItem: {
    fontSize: 14,
    color: '#555',
    width: '48%',
    marginBottom: 8,
    marginRight: '2%',
  },
  rowItemB: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: '48%',
    marginRight: '2%',
  },
 lableStyle :{
    fontSize:14,
    fontWeight:'400',
    color:'black',
    paddingHorizontal:10
  },
});
