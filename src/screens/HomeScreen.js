import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import TurkeySVG from '../assets/images/turkeyS.svg'; 
import GreeceSVG from '../assets/images/GreeceS.svg';
import BaliSVG from '../assets/images/BaliS.svg';
import EgyptSVG from '../assets/images/EgyptS.svg';
import MoroccoSVG from '../assets/images/moroccoS.svg';
import BannerSVG from '../assets/images/BannerS.svg';
import PopularSVG from '../assets/images/popularS.svg';
import PopularTwo from '../assets/images/popularTwoS.svg';
import SafaribannerSVG from '../assets/images/safaribannerS.svg';
import StarSVG from '../assets/images/starS.svg';
import CruiseSVG from '../assets/images/CruiseS.svg';
import CruiseTwoSVG from '../assets/images/CruiseTwoS.svg';
import MulticenterSVG from '../assets/images/multicenterS.svg';
import CruisePkgTwoSVG from '../assets/images/cruisePkgTwo.svg';
import NotifyIconSVG from '../assets/images/notifyIcon.svg';
import ProfileiconSVG from '../assets/images/profileicon.svg';
const { width } = Dimensions.get('window');
const destinationImages = {
  Turkey: <TurkeySVG width={60} height={60} />,
  Greece: <GreeceSVG   width={60} height={60} />,
  Bali:<BaliSVG   width={60} height={60} />,
  Egypt: <EgyptSVG   width={60} height={60} />,
  Morocco:<MoroccoSVG width={60} height={60} />,
  UAE:  <EgyptSVG   width={60} height={60} />,
};
const packageImages = [
  {
    imageSrc:  require('../assets/images/holidaypkgOne.png'),
    title: 'Step Into Paradise...',
    subTitle: 'Kuredu Island Resort',
    price: '1399',
    rating: '4.0',
  },
    {
    imageSrc:   require('../assets/images/holidaypkgtwo.png'),
    title: 'Step Into Paradise...',
    subTitle: 'Kuredu Island Resort',
    price: '1399',
    rating: '4.0',
  },
 {
    imageSrc:  require('../assets/images/holidaypkgthree.png'),
    title: 'Step Into Paradise...',
    subTitle: 'Kuredu Island Resort',
    price: '1399',
    rating: '4.0',
  },
]
const multiDealImages =[
    {
    imageComponent: <MulticenterSVG width={400} height={270} />,
    title: '07 Nights Dubai & Emira.....',
    subTitle: 'Kuredu Island Resort',
    price: '1399',
    rating: '4.0',
  },
    {
    imageComponent:    <CruiseSVG width={400} height={270} />,
    title: 'Step Into Paradise...',
    subTitle: 'Kuredu Island Resort',
    price: '1399',
    rating: '4.0',
  },
 {
    imageComponent: <MulticenterSVG width={400} height={270} />,
    title: 'Step Into Paradise...',
    subTitle: 'Kuredu Island Resort',
    price: '1399',
    rating: '4.0',
  },
];
const cruisePkg = [
    {
    imageComponent: <CruiseSVG width={400} height={270} />,
    title: '07 Nights Dubai & Emira.....',
    subTitle: 'Kuredu Island Resort',
    price: '1399',
    rating: '4.0',
  },
    {
     imageComponent: <CruisePkgTwoSVG width={420} height={270} />,
    title: 'Step Into Paradise...',
    subTitle: 'Kuredu Island Resort',
    price: '1399',
    rating: '4.0',
  },
 {
      imageComponent: <CruiseSVG width={400} height={270} />,
    title: 'Step Into Paradise...',
    subTitle: 'Kuredu Island Resort',
    price: '1399',
    rating: '4.0',
  },
];
const popularHotels = [ 
  {
    icon: PopularSVG,
    title: '07 Nights Holiday in Sea Breeze Beach House Holiday in Sea Breeze...',
    subTitle: 'Sea Breeze Beach House by...',
    price: '1,999pp',
    duration: '/night',
    rating: '5.0',
  },
  {
    icon: PopularTwo,
    title: 'Luxury Stay in Bali Oceanfront Villa Beach House Holiday in Sea Breeze...',
    subTitle: 'Oceanfront Villa Resort',
    price: '2,499pp',
    duration: '/night',
    rating: '4.8',
  },
  // Add more hotel objects as needed
];
const HomeScreen = ({navigation }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
       <ImageBackground
        source={require('../assets/images/backgroundImage.png')} // Replace with your image path
        style={styles.headerBackground}
        imageStyle={{ borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>
          {/* <TouchableOpacity
  style={{ marginRight: 10 }}
  onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
  <Image source={require('../assets/images/Back.png')} style={{ width: 24, height: 24 }} />
</TouchableOpacity> */}

        {/* <View style={styles.headerContent}>
        <Image source={require('../assets/images/Logo.png')} style={styles.logoStyle}/>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <NotifyIconSVG width={20} height={20} />,
            </TouchableOpacity>
          </View>
        </View> */}
        <View style={styles.headerContent}>
  <TouchableOpacity onPress={() => navigation.getParent()?.openDrawer()}>
    <Image source={require('../assets/images/menu.png')} style={{ width: 34, height: 34 }} />
  </TouchableOpacity>

  <Image source={require('../assets/images/Logo.png')} style={styles.logoStyle} />

  <View style={styles.headerIcons}>
    <TouchableOpacity style={styles.iconButton}>
      <NotifyIconSVG width={20} height={20} />
    </TouchableOpacity>
  </View>
</View>
        <View style={styles.searchBarContainer}>
          <Image source={require('../assets/images/search.png')} style={styles.searchIcon} />
          <TextInput
            placeholder="Search Countries, Cities, Places..."
            placeholderTextColor="#999"
            style={styles.searchBar}
          />
        </View>
      </ImageBackground>

      {/* <ImageBackground
        source={require('../assets/images/backgroundImage.png')} // Replace with your image path
        style={styles.headerBackground}
        imageStyle={{ borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>
        <View style={styles.headerContent}>
        <Image source={require('../assets/images/Logo.png')} style={styles.logoStyle}/>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <NotifyIconSVG width={20} height={20} />,
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
               <ProfileiconSVG width={20} height={20} />,
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchBarContainer}>
          <Image source={require('../assets/images/search.png')} style={styles.searchIcon} />
          <TextInput
            placeholder="Search Countries, Cities, Places..."
            placeholderTextColor="#999"
            style={styles.searchBar}
          />
        </View>
      </ImageBackground> */}
      <View style={styles.section}>
      <BannerSVG   width={330} height={150} style={styles.bannerImg}/>,
      </View>
      <View style={styles.sectionDesination}>
               <View style={styles.headingtop}>
  <Text style={styles.sectionTitle}>Top Destinations</Text>
   {/* <TouchableOpacity
             onPress={() => navigation.navigate('TopDestination')}
             > */}
    {/* <Text style={styles.sectionTitlelight}>See all</Text> */}
    {/* </TouchableOpacity> */}
        </View>  
       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Object.keys(destinationImages).map((item, index) => (
  <View key={index} style={styles.destinationItem}>
    {typeof destinationImages[item] === 'object' ? (
      destinationImages[item] // JSX component like Turkey SVG
    ) : (
      <Image source={destinationImages[item]} style={styles.destinationImage} />
    )}
    <Text style={styles.destinationText}>{item}</Text>
  </View>
))}
     </ScrollView>
      </View>
    <View style={styles.sectionHoliday}>
    <View style={styles.headingtop}>
 <Text style={styles.sectionTitle}>Holiday Packages</Text>
  <TouchableOpacity 
   onPress={()=>navigation.navigate('HotelCatalog')}>
 <Text style={styles.sectionTitlelight}>See all</Text>
  </TouchableOpacity>
        </View>  
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.packagesHolidayRow}>
    {packageImages.map((item, index) => (
      <View key={index} style={styles.holidaycard}>
        <Image source={item.imageSrc} style={styles.holidayimage} />
        <View style={styles.cardContent}>
          <Text style={styles.title} numberOfLines={3}>
            {index === 0
              ? 'Step Into Paradise with Kuredu Maldives - All Meals & Transfers are Free All Meals & Transfers...'
              : index === 1
              ? "From Phuket's Coast to Lak's Serenity Beaches, Stunning Luxury"
              : "Luxury Retreats Await in Dubai's Desert Oasis"}
          </Text>
          <Text style={styles.subTitle}>{item.subTitle}</Text>
          <View style={styles.bottomRow}>
            <Text style={styles.price}>£{item.price}</Text>
            <Text style={styles.duration}>/07 Days</Text>
            <View style={styles.ratingView}>
            <StarSVG width={14} height={14} style={styles.starRating}/>,
            <Text style={styles.rating}>{item.rating}</Text>
            </View>
          </View>
        </View>
      </View>
    ))}
  </ScrollView>
</View>
      {/* Popular Hotel Section */}  
      <View style={styles.sectionpopular}>
    <View style={styles.headingtop}>

  <Text style={styles.sectionTitle}>Popular Hotel</Text>

    <TouchableOpacity onPress={()=>navigation.navigate('HotelCatalog')}>
    <Text style={styles.sectionTitlelight}>See all</Text>
    </TouchableOpacity>
        </View>
  {popularHotels.map((hotel, index) => {
  const HotelIcon = hotel.icon;
  return (
    <View key={index} style={styles.cardHorizontal}>
      <View style={styles.svgWrapper}>
        <HotelIcon width={90} height={130} />
      </View>
      <View style={styles.cardContentHorizontal}>
        <Text style={styles.title} numberOfLines={3}>{hotel.title}</Text>
        <Text style={styles.subTitle}>{hotel.subTitle}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>£{hotel.price}</Text>
          <Text style={styles.duration}>{hotel.duration}</Text>
          <View style={styles.ratingView}>
             <StarSVG width={14} height={14} style={styles.starRating}/>,
            <Text style={styles.rating}>{hotel.rating}</Text>
          </View>
        </View>
      </View>
    </View>
  );
})}
      </View>
    {/* //////////multi center deAL////////////// */}
        <View style={styles.sectionHoliday}>
    <View style={styles.headingtop}>
  <Text style={styles.sectionTitle}>Multi-Centre Deals</Text>
  <TouchableOpacity onPress={()=>navigation.navigate('MulticenterDeals')}>
  <Text style={styles.sectionTitlelight}>See all</Text>
  </TouchableOpacity>
        </View>
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.packagesHolidayRow}>
    {multiDealImages.map((item, index) => (
      <View key={index} style={styles.holidaycard}>
        <View style={styles.holidayimageS}>
  {item.imageComponent}
</View>
        <View style={styles.cardContent}>
          <Text style={styles.title} numberOfLines={3}>
            {item.title}
          </Text>
          <Text style={styles.subTitle}>{item.subTitle}</Text>
          <View style={styles.bottomRow}>
            <Text style={styles.price}>£{item.price}</Text>
            <Text style={styles.duration}>/07 Days</Text>
            <View style={styles.ratingView}>
               <StarSVG width={14} height={14} style={styles.starRating}/>
            <Text style={styles.rating}>{item.rating}</Text>
            </View>
          </View>
        </View>
      </View>
    ))}
  </ScrollView>
</View>
<View style={styles.SafariPakages}>
  <View style={styles.headingtop}>
  <Text style={styles.sectionTitle}>Safari Packages</Text>
    <TouchableOpacity onPress={()=>navigation.navigate('MulticenterDeals')}>
  <Text style={styles.sectionTitlelight}>See all</Text>
    </TouchableOpacity>
        </View>
         <View style={styles.sectionSafari}>
    <SafaribannerSVG width={330} height={130} style={styles.safariBanner} />
      </View>
</View>
{/* /////////////Cruise Pakage////////////// */}
     <View style={styles.sectionHoliday}>
    <View style={styles.headingtop}>
        <Text style={styles.sectionTitle}>Cruise Packages</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('MulticenterDeals')}>
   <Text style={styles.sectionTitlelight}>See all</Text>
        </TouchableOpacity>
        </View>
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.packagesHolidayRow}>
    {cruisePkg.map((item, index) => (
      <View key={index} style={styles.holidaycard}>
      <View style={styles.holidayimageS}>
  {item.imageComponent}
</View>
        <View style={styles.cardContent}>
          <Text style={styles.title} numberOfLines={3}>
            {item.title}
          </Text>
          <Text style={styles.subTitle}>{item.subTitle}</Text>
          <View style={styles.bottomRow}>
            <Text style={styles.price}>£{item.price}</Text>
            <Text style={styles.duration}>/07 Days</Text>
            <View style={styles.ratingView}>
               <StarSVG width={14} height={14} style={styles.starRating}/>,
            <Text style={styles.rating}>{item.rating}</Text>
            </View>
          </View>
        </View>
      </View>
    ))}
  </ScrollView>
</View>
    </ScrollView>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom:70,
  },
  headerBackground: {
    width: 450,
   height: 120,
   alignSelf:"center",
  
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal:35,
     marginTop: 25, 
  },
  logoStyle:{
   width:'50%',
   resizeMode:'contain'
  },
  greeting: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
    searchBarContainer: {
    marginTop: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 45,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width:'84%',
    alignSelf:'center',
    marginBottom:15
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  headingtop:{
    marginTop:4,
    flexDirection:'row',
    justifyContent:"space-between"
  },
  section: {
    // marginTop: 50,
    paddingHorizontal: 20,
  },
  bannerImg: {
  marginTop: 20,         
  marginBottom: 10,      
  alignSelf: 'center',  
  paddingTop: 0,
paddingBottom: 12,
},
  sectionSafari:{
    paddingHorizontal: 20,
  },
  sectionDesination:{
    marginTop: 0,
    paddingHorizontal: 20,
  },
  sectionHoliday:{
     marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionpopular:{
    marginTop: 0,
    paddingHorizontal: 20,
  },
  SafariPakages:{
    marginTop: 10,
    paddingHorizontal: 20,
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
  },
  bannerImagePkg:{
    height: 150,
    borderRadius: 12,
    width: 350,
    alignSelf:'center',
  },
sectionTitlelight:{
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
    color:'lightgray'
},
sectionTitle:{
  fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
    color:'black'
},
  destinationItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  destinationImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  destinationText: {
    fontSize: 12,
    color: '#333',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  seeAll: {
    fontSize: 12,
    color: '#FF9800',
  },
  packagesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  packageImage: {
    width: (width - 60) / 2,
    height: 160,
    borderRadius: 12,
  },
  packagesHolidayRow: {
  flexDirection: 'row',
  paddingRight: 10,
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: 10, 
  marginBottom:20,
  borderRadius:20
},
  sectionHolidayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    paddingHorizontal:10
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 120,
  },
  
  cardContent: {
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
    lineHeight:20
  },
  subTitle: {
    fontSize: 14,
    color: 'gray',
    fontWeight:'600'
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E67E22',
  },
  duration: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 4,
  },
  starIcon: {
    marginLeft: 8,
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
  starRating:{
      marginLeft: 'auto', 
      marginTop:2
  },
  cardHorizontal: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
    padding:8
  },
  imageHorizontal: {
    width: 120,
    height: 140,
    borderRadius:20,
    marginLeft:0
  },
  cardContentHorizontal: {
    flex: 1,
    padding: 10,
  },
holidaycard: {
  width: width * 0.6, // ~70% of screen width
  marginRight: 0,
  backgroundColor: '#fff',
  borderRadius: 12,
  overflow: 'hidden',
  elevation: 1,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  paddingVertical:0,
  borderTopRightRadius:20,
  borderTopLeftRadius:20,
},
ratingView:{
  flexDirection:"row",
  marginLeft:"auto"
},
safariBanner: {
  marginTop: 0,         
  marginBottom: 0,     
  alignSelf: 'center',
},
holidayimage: {
  width: 330,
  height: 170,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  overflow: 'hidden',
  marginRight:3
},
holidayimageS: {
  width: '100%',
  height: 170,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  overflow: 'hidden',
  backgroundColor: '#eee', 
  justifyContent: 'center',
  alignItems: 'center',
},
});
