import React, { useState, useRef ,useMemo,useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
  FlatList
} from 'react-native';
import PhoneS from '../assets/images/PhoneS.svg';
import Getqoute from '../assets/images/getQoute.svg';
import Seaview1 from  '../assets/images/seaview5.png';
import Seaview2 from '../assets/images/seaview3.png';
import Seaview3 from '../assets/images/seaviewone.png';
import Flight from '../assets/images/flight.svg';
import Coffee from '../assets/images/coffee.svg';
import StarS from '../assets/images/starS.svg';
import TimerS from '../assets/images/timerS.svg';
import LocationS from '../assets/images/locationS.svg';
import TourG from '../assets/images/tour.svg';
import Tour from '../assets/images/TourG.svg';
import Travel from '../assets/images/travel.svg';
import TravelG from '../assets/images/TravelG.svg'; 
import Hotel from '../assets/images/hotel.svg';
import HotelG from '../assets/images/HotelG.svg';
import Bluesky from '../assets/images/bluefly.svg';
import Pakage from '../assets/images/pakage.svg';
import CheckBox from '../assets/images/checkbox.svg';
import RedBox from '../assets/images/redbox.svg';
import Message from '../assets/images/bluemessage.svg';
import GoldStar from '../assets/images/goldenStar.svg';
import RedPhone from '../assets/images/redphone.svg';
import hotelOne from '../assets/images/hotelOne.svg';
import hotelTwo from '../assets/images/hotelTwo.svg';
import hotelThree from '../assets/images/hotelThree.svg';
import hotelFour from '../assets/images/hotelFour.svg';
import hotelFive from '../assets/images/hotelFive.svg';
import hotelSix from '../assets/images/hotelSix.svg';
import hotelSeven from '../assets/images/hotelSeven.svg';
import hotelEight from '../assets/images/hotelEight.svg';
import YellowLocation from '../assets/images/yellowLocation.svg';
import TobookAir from '../assets/images/tobookAir.svg';
const bookingIcons = [RedPhone, Message, GoldStar, GoldStar];
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
const DATA = {
  Tour: {
    title: 'MALDIVES ESCAPE',
    image: Bluesky,
    subtitle: 'A Dream Holiday at Villa Nautica, Paradise Island',
    duration: '07 Nights',
    rating: 4.9,
    reviews: '07Nights',
    roomType: 'Upgrade from Beach Villa to Deluxe',
    inclusions: [
      'Return flight from London Airport',
      '23 kgs baggage allowance per person',
      'Return Speedboat Transfer included',
      'Complimentary Wi-Fi',
      'Easy Installments Plan Available',
      'No Hidden Charges',
      '2025 & 2026 Booking on sale Now',
      'Book Now with Reduced Deposit – Just £89pp only for 2025-26',
    ],
    features: [
      'Conference Room', 'Island Resort', 'Swimming Pool',
      'Laundry Service', 'Food Outlets', 'Shopping Outlets',
      'WIFI', 'Disco', 'Wedding Renewals', 'Cultural Show', 'SPA', 'Kids’ Club'
    ],
    FoodBeverages:[
       'Conference Room', 'WIFI', 'Swimming Pool',
      'Laundry Service', 'Food Outlets', 'Shopping Outlets',
      'WIFI', 'Disco', 'Wedding Renewals', 'Cultural Show', 'SPA', 'Kids’ Club'
    ],
    ToBook:[
      'Call 020 3820 4566',
      'Chat with A Travel Agent',
      'All holidays are ATOL protected.,',
      'Prices are correct at the time of posting & subject to change. T & C’s apply'
    ]
  },
Hotel: [
  {
    name: 'Tree House Villas',
    rating: '5.0',
    images: [
      hotelOne,
      hotelTwo,
      hotelThree,
      hotelFour,
      hotelFive,
      hotelSix,
      hotelSeven,
      hotelEight,
    ],
    image:StarS,YellowLocation,
    description:
    'Offering a private beach area and water sports facilities, Kuredu Island Resort & Spa is a beach front property situated in Kuredu in the Lhaviyani Atoll Region. The resort has an outdoor pool, a spa centre and a fitness centre which is complimentary front desk and tour desk service is provided. Guests can also enjoy a drink and. ...Read More...'
  },
  {
    name: 'X10 Khaolak Resort',
    rating: '5.0',
    images: [
      hotelFour,
      hotelFive,
      hotelSix,
      hotelSeven,
      hotelEight,
      hotelSix,
    ],
    description:
    'Offering a private beach area and water sports facilities, Kuredu Island Resort & Spa . hour front desk and tour desk service is provided. Guests can also enjoy a drink and. ...Read More...'
  },
],
 Travel: {
  sevenNights: [
    { month: 'June 25', board: 'All Meals & Transfers', price: '£ 1399' },
    { month: 'July 25', board: 'All Meals & Transfers', price: '£ 1599' },
    { month: 'Aug 25', board: 'All Meals & Transfers', price: '£ 1799' },
    { month: 'Sep 25', board: 'All Meals & Transfers', price: '£ 1499' },
    { month: 'Oct 25', board: 'All Meals & Transfers', price: '£ 1899' },
    { month: 'Nov 25', board: 'All Meals & Transfers', price: '£ 1699' },
  ],
  tenNights: [
    { month: 'June 25', board: 'All Meals & Transfers', price: '£ 1399' },
    { month: 'July 25', board: 'All Meals & Transfers', price: '£ 1599' },
    { month: 'Aug 25', board: 'All Meals & Transfers', price: '£ 1799' },
    { month: 'Sep 25', board: 'All Meals & Transfers', price: '£ 1499' },
    { month: 'Oct 25', board: 'All Meals & Transfers', price: '£ 1899' },
    { month: 'Nov 25', board: 'All Meals & Transfers', price: '£ 1699' },
  ],
}
};
export default function PakageDetails({navigation}) { 
    const [index, setIndex] = useState(0);
   const [activeTab, setActiveTab] = useState('Tour');
   const [expandedIndex, setExpandedIndex] = useState(null);
   const data = DATA[activeTab];
     useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % headerData.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);
  const current = headerData[index];
  const SeaviewComponent = current.image;
const flatListRef = useRef();

useEffect(() => {
  const timer = setInterval(() => {
    const nextIndex = (index + 1) % headerData.length;
    setIndex(nextIndex);
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
  }, 1000);

  return () => clearInterval(timer);
}, [index]);
const handleScrollEnd = (e) => {
  const contentOffsetX = e.nativeEvent.contentOffset.x;
  const newIndex = Math.round(contentOffsetX / Dimensions.get('window').width);
  setIndex(newIndex);
};
     const MemoizedTabContent = useMemo(() => {
    return (
      <View style={styles.Tabcontainer}>
        {/* Hotel Tab */}
        {activeTab === 'Hotel' ? (
          <Text></Text>
        ) : activeTab === 'Travel' ? (
          <Text></Text>
        ) : (
          <Text></Text>
        )}
      </View>
    );
  }, [activeTab]);
  return (
    <>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
    <View style={styles.container}>
      {/* Header */}
 
<View style={styles.cardImage}>
  {/* Seaview SVG as background */}
    {/* <SeaviewComponent
          width={'100%'}
          height={'96%'}
          norepeat={false}
          style={StyleSheet.absoluteFillObject}
        /> */}
     {/* <View style={styles.sliderContainer}>
  <Image
    source={current.image}
    style={{ width: Dimensions.get('window').width, height: 300, resizeMode: 'cover' }}

  />
  <View style={styles.paginationContainer}>
    {headerData.map((_, i) => (
      <View
        key={i}
        style={[
          styles.dot,
          i === index ? styles.activeDot : styles.inactiveDot,
        ]}
      />
    ))}
  </View> 
</View> */}
<View style={styles.sliderContainer}>
  <FlatList
    ref={flatListRef}
    data={headerData}
    keyExtractor={(_, i) => i.toString()}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    onMomentumScrollEnd={handleScrollEnd}
    renderItem={({ item }) => (
      <Image
        source={item.image}
        style={{
          width: Dimensions.get('window').width,
          height: 300,
          resizeMode: 'cover',
        }}
      />
    )}
  />

  <View style={styles.paginationContainer}>
    {headerData.map((_, i) => (
      <View
        key={i}
        style={[styles.dot, i === index ? styles.activeDot : styles.inactiveDot]}
      />
    ))}
  </View>
</View>


  {/* Back Button Over SVG */}
  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnStyle}>
    <Image
      source={require('../assets/images/Back.png')}
      style={styles.logoStyle}
    />
  </TouchableOpacity>
</View>
<View style={styles.mainContainer} >
  <View style={styles.innerContent}  contentContainerStyle={{ paddingBottom: 10 }}>
    <View style={styles.flightView}>
      <View style={[styles.flightViewS,{borderTopLeftRadius:28}]}>
        <Flight height={21} width={21} style={styles.iconStyle} />
        <Text style={styles.mainText}>Flights</Text>
      </View>
      <View style={styles.flightViewS}>
        <Coffee height={20} width={20} style={styles.iconStyle} />
        <Text style={styles.mainText}>All Meals & Transfers</Text>
      </View>
      <View style={styles.flightViewS}>
        <StarS height={20} width={20} style={styles.iconStyle} />
        <Text style={styles.mainText}>5.0</Text>
      </View>
    </View>
    <View style={[styles.staticInfoContainer]}>
  <View style={styles.leftInfo}>
      <LocationS height={15} width={15} style={styles.iconStyle} />
    <Text style={[styles.mainText, { color: 'gray' }]}>
      Kuredu Island Resort & Spa Hotel
    </Text>
  </View>
  <View style={styles.rightInfo}>
  
      <TimerS height={15} width={15} style={styles.iconStyle} />
    <Text style={[styles.mainText, { color: '#C28D3E' }]}>07 Days</Text>
  </View>
</View>

   <Text style={styles.textStyle}>Step Into Paradise with Kuredu Maldives - All Meals & Transfers</Text>
    <View style={styles.person}>
      <Text style={styles.dollarprice}>£ 1399</Text>
      <Text style={styles.personS}>per person</Text>
    </View>
    <Text style={styles.nightStyle}>10 Nights Holiday Deal at Bangkok, Phu Quoc & Phuket with {'\n'}Breakfast Starting From £1,299/pp Up to 40% Off{'\n'}for 2025 || Book Now with a Reduced Deposit – Just £99/pp{'\n'} only for 2025-26</Text>

<View style={styles.flightViewTour}>
  {['Tour', 'Hotel', 'Travel'].map((tab, index) => {
    let Icon;
    if (tab === 'Tour') {
      Icon = activeTab === 'Tour' ? TourG : Tour;
    } else if (tab === 'Hotel') {
      Icon = activeTab === 'Hotel' ? HotelG : Hotel;
    } else if (tab === 'Travel') {
      Icon = activeTab === 'Travel' ? TravelG : Travel;
    }
    const label =
      tab === 'Tour' ? 'Tour Detail' :
      tab === 'Hotel' ? 'Hotel Detail' :
      'Travel Dates';
    const isActive = activeTab === tab;

    return (
      <TouchableOpacity
  key={index}
  onPress={() => setActiveTab(tab)}
  style={[
    styles.tabButton,
    isActive && { borderBottomWidth: 2, borderBottomColor: '#C28D3E' }
  ]}
>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Icon
      width={16}
      height={16}
      style={styles.iconStyle}
      fill={isActive ? 'red' : '#333'}
    />
    <Text style={[
      styles.tabText,
      isActive && styles.tabTextActive,
      isActive && { color: '#C28D3E', fontWeight: '700' },
    ]}>
      {label}
    </Text>
  </View>
</TouchableOpacity>

    );
  })}
</View>

<View style={styles.Tabcontainer}>
  {activeTab === 'Hotel' ? (
    <View>
      {data.map((hotel, index) => (
        <View key={index} style={styles.hotelcontainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <YellowLocation width={18} height={18} style={{ marginLeft: 5 }} />
              <Text style={styles.mainTitle}>{hotel.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <StarS width={14} height={14} />
              <Text style={{ marginLeft: 5, fontWeight: 'bold', fontSize: 13 }}>{hotel.rating}</Text>
            </View>
          </View>
          <View style={{ height: 250, marginTop: 10 }}>
            <ScrollView
              scrollEnabled
              nestedScrollEnabled
              contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
              showsVerticalScrollIndicator
            >
              {hotel.images.map((ImgComponent, i) => (
                <View
                  key={i}
                  style={{
                    width: (Dimensions.get('window').width - 35) / 2,
                    height: 105,
                    marginRight: i % 2 === 0 ? 10 : 0,
                    marginBottom: 10,
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}
                >
                  <ImgComponent width="100%" height="100%" />
                </View>
              ))}
            </ScrollView>
          </View>
          <Text style={styles.subtitle}>
            {expandedIndex === index
              ? hotel.description + ' '
              : hotel.description.slice(0, 300) + '... '}
            <Text
              onPress={() => setExpandedIndex(expandedIndex === index ? null : index)}
              style={{ color: '#C28D3E', fontWeight: 'bold' }}
            >
              {expandedIndex === index ? 'Hide' : 'Read More'}
            </Text>
          </Text>
        </View>
      ))}
    </View>
  ) : activeTab === 'Travel' ? (
   <View style={{ paddingHorizontal: 10,marginTop:20 }}>
  {/* 7 Nights Table */}
  <View style={styles.table}>
    <View style={styles.tableHeader}>
      <Text style={styles.tableHeaderText}>Months</Text>
      <Text style={styles.tableHeaderText}>Board Basis</Text>
      <Text style={styles.tableHeaderText}>7 Nights</Text>
    </View>
    {data.sevenNights.map((item, index) => (
      <View key={index} style={[styles.tableRow, index % 2 !== 0 && styles.tableRowAlt]}>
        <Text style={styles.tableCell}>{item.month}</Text>
        <Text style={styles.tableCell}>{item.board}</Text>
        <Text style={styles.tableCell}>{item.price}</Text>
      </View>
    ))}
  </View>
  {/* 10 Nights Table */}
  <View style={[styles.table, { marginTop: 25 }]}>
    <View style={styles.tableHeader}>
      <Text style={styles.tableHeaderText}>Months</Text>
      <Text style={styles.tableHeaderText}>Board Basis</Text>
      <Text style={styles.tableHeaderText}>10 Nights</Text>
    </View>
    {data.tenNights.map((item, index) => (
      <View key={index} style={[styles.tableRow, index % 2 !== 0 && styles.tableRowAlt]}>
        <Text style={styles.tableCell}>{item.month}</Text>
        <Text style={styles.tableCell}>{item.board}</Text>
        <Text style={styles.tableCell}>{item.price}</Text>
      </View>
    ))}
  </View>
</View>
  ) : (
    <>
      <View style={styles.card}>
        <View style={styles.blueSky}>
          {data.image && <data.image width={16} height={16} marginTop="5" />}
          <Text style={[styles.mainTitle, { marginLeft: 10 }]}>{data.title}</Text>
        </View>
        <Text style={styles.subtitle}>{data.subtitle}</Text>
        <Text style={styles.rating}>⭐⭐⭐⭐⭐ ({data.reviews})</Text>
        <Text style={[styles.roomType, { fontWeight: 'bold' }]}>Room Type: {data.roomType}</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.pakageView}>
          <Pakage style={{ paddingVertical: 10 }} />
          <Text style={styles.sectionTitle}>Package Inclusion</Text>
        </View>
        {data.inclusions.map((item, index) => (
          <Text key={index} style={styles.bullet}><CheckBox /> {item}</Text>
        ))}
        <View style={[styles.pakageView, { marginTop: 10 }]}>
          <RedBox style={{ paddingVertical: 12 }} />
          <Text style={styles.sectionTitle}>07 Nights in Villa Nautica, Paradise Island</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitleFood}>Features</Text>
        <View style={styles.featureGrid}>
          {data.features.map((item, index) => (
            <Text key={index} style={styles.featureItem}>{item}</Text>
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitleFood}>Food & Beverage</Text>
        <View style={styles.featureGrid}>
          {data.FoodBeverages.map((item, index) => (
            <Text key={index} style={styles.featureItem}>{item}</Text>
          ))}
        </View>
      </View>
      <View style={styles.section}>
          <View style={[styles.pakageViewB, { marginTop: 10 }]}>
          <TobookAir style={{ paddingVertical: 15}} />
        <Text style={styles.sectionTitleFoodB}>To Book</Text>
        </View>
        <View style={styles.featureGrid}>
          {data.ToBook.map((item, index) => {
            const Icon = bookingIcons[index];
            return (
              <View key={index} style={styles.rowItemB}>
                <Icon width={22} height={22} style={styles.iconStyle} />
                <Text style={styles.featureItem}>{item}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </>
  )}
</View>
  </View>
</View>
</View>
</ScrollView>
{/* </ScrollView> */}
       <View style={styles.bottomBar}>
              <TouchableOpacity style={[styles.blueButton,{backgroundColor:'#189900'}]}>
                    <Getqoute width={20} height={20} />
              <Text style={styles.buttonText}>Get A Quote</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.blueButton}>
                    <PhoneS width={20} height={20} />,
              <Text style={styles.buttonText}>020 8038 2020</Text>
            </TouchableOpacity>
          </View>
    </>
  );
}
const windowWidth = Dimensions.get('window').width;
const imageWidth = (windowWidth - 40) / 2;
const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
 
flightView: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 15,
  marginTop: 5,
},
flightViewSTour:{
     flexDirection: 'row',
  alignItems: 'center', // Align icon & text properly
  backgroundColor: '#C8C8F433',
  paddingHorizontal: 6,
  paddingVertical: 10,
  marginHorizontal: 2, // spacing outside each box
  borderRadius: 8,
},


flightViewTour: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 15,
  marginTop: 10,
},

tabButton: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 8,
  paddingHorizontal: 10,
  marginHorizontal: 5,
},

iconStyle: {
  marginRight: 6,
},

tabText: {
  fontSize: 13,
  color: '#333',
  fontWeight: '500',
},

tabTextActive: {
  // color: '#C28D3E',
  color:"red",
  fontWeight: '700',
},


flightViewS: {
  flexDirection: 'row',
  alignItems: 'center', // Align icon & text properly
  backgroundColor: '#C8C8F433',
  paddingHorizontal: 6,
  paddingVertical: 10,
  marginHorizontal: 2, // spacing outside each box
  borderRadius: 8,
},
hotelcontainer:{
  justifyContent:"center",
  padding:10
},
// iconStyle: {
//  marginRight:6
// },


  daysStyle:{
     flexDirection:"row",
    justifyContent:'space-between',
    backgroundColor:'#ffffff',
  position:"absolute",
    marginTop:5,
    marginLeft:2
  },
  btnStyle: {
    backgroundColor: "#ffffff",
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    marginLeft: 20
  },
  innerContent: {
  // padding: 2,
  marginTop:0
},
  cardImage: {
    height: 300,  // fixed height for image section
    width: "100%",
    // overflow: "hidden",
    position:"absolute",
    top:0
  },
  logoStyle: {
    width: 25,
    height: 25,
  },
//  mainContainer: {
//   backgroundColor: "white",
//   borderTopLeftRadius: 38,
//   position: "absolute",
//   width: '100%',
//    top:210,
// },
mainContainer: {
  backgroundColor: "white",
  borderTopLeftRadius: 54,
  width: '100%',
  marginTop: 250, // or adjust to tighten gap under Seaview
  paddingTop: 20,
},

  mainText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    marginLeft:-4,
    padding:4
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 12,
    backgroundColor: 'white',
    position: "absolute",
    bottom: 0,
    width: '100%',
  },
  blueButton: {
    flex: 1,
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  daysView:{
    flexDirection:"row"
  },
  person:{
    marginLeft:'auto',
    height:30,
    marginBottom:10,
    paddingHorizontal:8
  },
  textStyle:{
    fontSize:18,
    fontWeight:"600",
    paddingHorizontal:5,
    marginLeft:9
  },
  dollarprice:{
    color:"#EC1C24",
    fontWeight:"900",
    fontSize:22
  },
  personS:{
    fontSize:9,
    color:"gray",
    marginLeft:22
  },
  nightStyle:{
    paddingHorizontal:10,
    fontSize:14,
    fontWeight:'400',
    marginTop:20,
  },
    Tabcontainer: {
    flex: 1,
    backgroundColor:"white",
    padding: 2,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  // tabButton: {
  //   flex: 1,
  //   paddingVertical: 10,
  //   backgroundColor: '#fff',
  //   marginHorizontal: 5,
  //   borderRadius: 8,
  //   alignItems: 'center',
  // },
  tabActive: {
    backgroundColor: '#f9c130',
  },
  // tabText: {
  //   color: '#555',
  //   fontWeight: '500',
  // },
  // tabTextActive: {
    // color: '#000',
    // fontWeight: '700',
  // },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 5,
  },
  duration: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
  },
  rating: {
    fontSize: 14,
    color: 'black',
    marginTop: 4,
  },
  roomType: {
    fontSize: 14,
    color: '#333',
    marginTop: 6,
  },
  section: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    color: 'black',
    marginLeft:5,
    // backgroundColor:"#01BE9E1F",
  // paddingVertical:6,
  // paddingHorizontal:10,
 textAlign:'left'
  },
  sectionTitleFood:{
     fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    color: 'black',
  paddingHorizontal:6,
    backgroundColor:"#01BE9E1F",
  paddingVertical:5,
 textAlign:'left',
 width:150,
 borderRadius:10
  },
  sectionTitleF:{
 backgroundColor:"#01BE9E1F",
 width:80,
 textAlign:"left",
 marginRight:"auto",
 position:"absolute",
 left:0,
 fontWeight:'500',
 paddingHorizontal:12
  },
 
  bullet: {
    fontSize: 14,
    marginBottom: 4,
    color: '#444',
    justifyContent:'flex-start'
  },
 featureGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  paddingHorizontal: 5,
  marginTop: 10,
},

  featureItem: {
  width: '48%', // ✅ fits two items per row
  marginBottom: 10,
  fontSize: 13,
  color: '#444',
  fontWeight: '500',
},

  toBook: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 70,
  },
   sectionTitleFoodB:{
     fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: 'black',
  paddingHorizontal:6,
  paddingVertical:4,
 
  },
  bookNow: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  phone: {
    color: '#d32f2f',
  },
  chat: {
    fontSize: 14,
    marginBottom: 10,
    color: '#007bff',
  },
  notes: {
    fontSize: 12,
    color: '#999',
  },
  blueSky:{
    flexDirection:"row",
  },
  pakageView:{
    flexDirection:"row",
    paddingHorizontal:2,
  },
  pakageViewB:{
     flexDirection:"row",
    paddingHorizontal:10,
backgroundColor:'#0069CA14',
borderRadius:10
  },
  rowItemB:{
    flexDirection:'row',
    width:"98%"
  },
  // iconStyle:{
  //   marginRight:10
  // }

  table: {
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 6,
  overflow: 'hidden', 
},
tableHeader: {
  flexDirection: 'row',
  backgroundColor: '#C28D3E',
  paddingVertical: 10,
},
tableHeaderText: {
  flex: 1,
  color: 'white',
  fontWeight: '700',
  fontSize: 16,
  textAlign: 'center',
},
tableRow: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  paddingVertical: 10,
  // paddingHorizontal: 6,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
},
// tableRowAlt: {
//   backgroundColor: '#f9f9f9',
// },
tableCell: {
  flex: 1,
  fontSize: 14,
  color: '#444',
  textAlign: 'center',
},
 tableRowAlt: {
    backgroundColor: '#EFE5D3',
  },
  sliderContainer: {
  width: '100%',
  height: 300,
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
},
dot: {
  width: 8,
  height: 8,
  borderRadius: 4,
  marginHorizontal: 4,
},
activeDot: {
  backgroundColor: '#C28D3E',
  width: 10,
  height: 10,
},
inactiveDot: {
  backgroundColor: '#ccc',
},
paginationContainer: {
  position: 'absolute',
  bottom: 15,
  left: 0,
  right: 0,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:40
},
staticInfoContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 15,
  paddingVertical: 10,
  backgroundColor: '#fff',
  marginTop: 5,
},

leftInfo: {
  flexDirection: 'row',
  alignItems: 'center',
},

rightInfo: {
  flexDirection: 'row',
  alignItems: 'center',
},

});


