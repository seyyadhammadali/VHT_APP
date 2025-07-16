import React, { useState, useEffect } from 'react';
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
  SafeAreaView,
  Platform,
  useWindowDimensions,
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
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountryDestinations } from '../redux/slices/destinationsSlice';
import { fetchHomeSliders } from '../redux/slices/sliderSlice';
import { 
  selectHolidayPackages, 
  selectMultiCenterDeals, 
  selectCruisePackages,
  selectSafariPackages,
  fetchHolidayPackages,
  fetchMultiCenterDeals,
  fetchCruisePackages,
  fetchSafariPackages,
  selectPakagesLoading,
  selectPakagesError
} from '../redux/slices/pakagesSlice';
const { width, height } = Dimensions.get('window');
const bannerWidth = width * 0.9;
const bannerHeight = bannerWidth * 0.45; 
const svgMap = {
  MulticenterSVG: MulticenterSVG,
  CruiseSVG: CruiseSVG,
  CruisePkgTwoSVG: CruisePkgTwoSVG,
};
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
  const [searchText, setSearchText] = useState('');
  const [showSearchButton, setShowSearchButton] = useState(false);
  const { height: windowHeight } = useWindowDimensions();
  const statusBarHeight = Platform.OS === 'ios' ? 20 : (StatusBar.currentHeight || 16);
  const dispatch = useDispatch();
  const { country: destinations, loading, error } = useSelector(state => state.destination);
  const sliderDispatch = useDispatch();
  const { sliders, loading: sliderLoading, error: sliderError } = useSelector(state => state.slider);
  const holidayPackages = useSelector(selectHolidayPackages);
  const multiCenterDeals = useSelector(selectMultiCenterDeals);
  const cruisePackages = useSelector(selectCruisePackages);
  const safariPackages = useSelector(selectSafariPackages);
  const pakagesLoading = useSelector(selectPakagesLoading);
  const pakagesError = useSelector(selectPakagesError);
  useEffect(() => {
    dispatch(fetchCountryDestinations());
    sliderDispatch(fetchHomeSliders());
    dispatch(fetchHolidayPackages());
    dispatch(fetchMultiCenterDeals());
    dispatch(fetchCruisePackages());
    dispatch(fetchSafariPackages());
  }, [dispatch, sliderDispatch]);
  
  const handleSearchTextChange = (text) => {
    setSearchText(text);
    setShowSearchButton(text.length > 0);
  };
  const handleSearch = () => {
    console.log('Searching for:', searchText);
  };
  const clearSearch = () => {
    setSearchText('');
    setShowSearchButton(false);
  };
  console.log('Redux destinations:', destinations);
  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
       <View style={{position: 'relative'}}>
       <ImageBackground
          source={require('../assets/images/backgroundImage.png')}
          style={styles.headerBackground}
          imageStyle={{ borderBottomLeftRadius: 35, borderBottomRightRadius: 35 }}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => navigation.getParent()?.openDrawer()} style={{marginTop:0}}>
              <Image source={require('../assets/images/menu.png')} style={{ width: 36, height: 36 }} />
            </TouchableOpacity>
            <Image source={require('../assets/images/Logo.png')} style={styles.logoStyle} />
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconButton} onPress={()=>navigation.navigate('Notifications')}>
                <NotifyIconSVG width={25} height={25} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.searchBarAbsoluteContainer}>
          <View style={styles.searchBarContainer}>
            <Image source={require('../assets/images/search.png')} style={styles.searchIcon} />
            <TextInput
              placeholder="Search Countries, Cities, Places..."
              placeholderTextColor="#999"
              style={styles.searchBar}
              value={searchText}
              onChangeText={handleSearchTextChange}
            />
            {showSearchButton && (
              <TouchableOpacity 
                style={styles.searchButton} 
                onPress={handleSearch}
              >
                <Text style={styles.searchButtonText}>Search</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    <View style={styles.sectionWithSearchMargin}>
 {Array.isArray(sliders) && sliders.length > 0 ? (
  <View style={styles.destinationItemS}>
    <Image
      source={{ uri: sliders[0].small }}
      width={bannerWidth} height={bannerHeight} style={styles.bannerImgB}
      resizeMode="cover"
      onError={(e) =>
        console.warn('Image load error for:', sliders[0].flag, e.nativeEvent)
      }
    />
  </View>
) : (
  <Text>No destinations found.</Text>
)}
</View>
      <View style={styles.sectionDesination}>
        <View style={styles.headingtop}>
          <Text style={styles.sectionTitle}>Top Destinations</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('TopDestination')}>
            <Text style={styles.sectionTitlelight}>See all</Text>
          </TouchableOpacity>
        </View>
<ScrollView horizontal showsHorizontalScrollIndicator={false}>
  {Array.isArray(destinations) && destinations.length > 0 ? (
    destinations
      // .filter(item => item.flag?.toLowerCase().endsWith('.png')) // only PNG images
      .map((item, index) => (
        <View key={item.id || index} style={styles.destinationItem}>
          <Image
            source={{ uri: item.banner }}
            style={styles.destinationImage}
            resizeMode="cover"
            onError={(e) =>
              console.warn('Image load error for:', item.flag, e.nativeEvent)
            }
          />
          <Text style={styles.destinationText}>{item.name}</Text>
        </View>
      ))
  ) : (
    <Text>No destinations found.</Text>
  )}
</ScrollView>
      </View>
    <View style={styles.sectionHoliday}>
    <View style={styles.headingtop}>
 <Text style={styles.sectionTitle}>Holiday Packages</Text>
  <TouchableOpacity 
   onPress={()=>navigation.navigate('PackagesCatalog')}>
 <Text style={styles.sectionTitlelight}>See all</Text>
  </TouchableOpacity>
        </View>  
 <ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.packagesHolidayRow}>
  {holidayPackages.map((item, index) => (
    <View key={item.id || index} style={styles.holidaycard}>
      <Image source={{ uri: item.main_image }} style={styles.holidayimage} />
      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
        <Text style={styles.subTitle}>{item.city}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>£{item.sale_price || item.price}</Text>
          <Text style={styles.duration}>/{item.duration}</Text>
          <View style={styles.ratingView}>
            <StarSVG width={14} height={14} style={styles.starRating} />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </View>
  ))}
</ScrollView>

</View>
      {/* <View style={styles.sectionpopular}>
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
      </View> */}
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
   
     {multiCenterDeals.map((item, index) => (
    <View key={item.id || index} style={styles.holidaycard}>
      <Image source={{ uri: item.main_image }} style={styles.holidayimage} />
      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
        <Text style={styles.subTitle}>{item.city}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>£{item.sale_price || item.price}</Text>
          <Text style={styles.duration}>/{item.duration}</Text>
          <View style={styles.ratingView}>
            <StarSVG width={14} height={14} style={styles.starRating} />
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
    <TouchableOpacity onPress={()=>navigation.navigate('Safari')}>
      <Text style={styles.sectionTitlelight}>See all</Text>
    </TouchableOpacity>
  </View>
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.packagesHolidayRow}>
    {/* {safariPackages.map((item, index) => (
      <View key={item.id || index} style={styles.holidaycard}>
        <Image source={{ uri: item.main_image }} style={styles.holidayimage} />
        <View style={styles.cardContent}>
          <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
          <Text style={styles.subTitle}>{item.city}</Text>
          <View style={styles.bottomRow}>
            <Text style={styles.price}>£{item.sale_price || item.price}</Text>
            <Text style={styles.duration}>/{item.duration}</Text>
            <View style={styles.ratingView}>
              <StarSVG width={14} height={14} style={styles.starRating} />
              <Text style={styles.rating}>{item.rating}</Text>
            </View>
          </View>
        </View>
      </View>
    ))} */}

      {/* {safariPackages.map((item, index) => (
    <View key={item.id || index} style={styles.holidaycard}>
      <Image source={{ uri: item.main_image }} style={styles.holidayimage} />
   
    </View>
  ))} */}
    {safariPackages.map((item, index) => (
    <View key={item.id || index} style={styles.holidaycard}>
      <Image source={{ uri: item.main_image }} style={styles.holidayimage} />
      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
        <Text style={styles.subTitle}>{item.city}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>£{item.sale_price || item.price}</Text>
          <Text style={styles.duration}>/{item.duration}</Text>
          <View style={styles.ratingView}>
            <StarSVG width={14} height={14} style={styles.starRating} />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </View>
  ))}
  </ScrollView>
</View>
{/* /////////////Cruise Pakage////////////// */}
<View style={styles.sectionHoliday}>
  <View style={styles.headingtop}>
    <Text style={styles.sectionTitle}>Cruise Packages</Text>
    <TouchableOpacity onPress={()=>navigation.navigate('Cruise')}>
      <Text style={styles.sectionTitlelight}>See all</Text>
    </TouchableOpacity>
  </View>
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.packagesHolidayRow}>
      {cruisePackages.map((item, index) => (
    <View key={item.id || index} style={styles.holidaycard}>
      <Image source={{ uri: item.main_image }} style={styles.holidayimage} />
      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
        <Text style={styles.subTitle}>{item.city}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>£{item.sale_price || item.price}</Text>
          <Text style={styles.duration}>/{item.duration}</Text>
          <View style={styles.ratingView}>
            <StarSVG width={14} height={14} style={styles.starRating} />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
         </View>
      </View>
    </View>
  ))}

   {cruisePackages.map((item, index) => (
    <View key={item.id || index} style={styles.holidaycard}>
      <Image source={{ uri: item.main_image }} style={styles.holidayimage} />
      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
        <Text style={styles.subTitle}>{item.city}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>£{item.sale_price || item.price}</Text>
          <Text style={styles.duration}>/{item.duration}</Text>
          <View style={styles.ratingView}>
            <StarSVG width={14} height={14} style={styles.starRating} />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </View>
  ))}
  </ScrollView>
</View>
        </ScrollView>
    </View>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
 bannerImg: {
    width: bannerWidth,
    height: bannerHeight,
    borderRadius: 8,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom:70,
  },
  headerBackground: {
    width: width,
    height: height * 0.16,
    alignSelf: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
     paddingHorizontal:20,
     padding:10,
   
    paddingVertical:40
  },
  logoStyle:{
   width:'50%',
   resizeMode:'contain',
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
    width: '92%',
    alignSelf: 'center',
    marginBottom: 0, 
  },
  searchBarAbsoluteContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -22, 
    alignItems: 'center',
    zIndex: 10,
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
  bannerImgB: {
  marginTop: 10,         
  marginBottom: 10,      
  alignSelf: 'center',  
  paddingTop: 0,
paddingBottom: 12,
borderRadius:10
},
bannerImgS:{
  marginTop: -12,          // ↓ reduce spacing above the banner
  marginBottom: -14,       // ↓ reduce spacing below the banner
  alignSelf: 'center',
  paddingTop: 0,
  paddingBottom: 0,
},
  sectionSafari:{
    paddingHorizontal: 20,
  },
  sectionDesination:{
    marginTop: 0,
    paddingHorizontal: 14,
  },
  sectionHoliday:{
     marginTop: 20,
    paddingHorizontal: 14,
    marginBottom:10
  },
  sectionpopular:{
    marginTop: 0,
    paddingHorizontal: 14,
  },
  SafariPakages:{
    marginTop: 0,
    paddingHorizontal: 14,
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
    fontSize: 14,
    fontWeight: '500',
    marginTop:2,
    color:'lightgray'
},
sectionTitle:{
  fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
    color:'black'
},
  destinationItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  destinationItemS: {
    alignItems: 'center',
    marginRight: 0,
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
     borderRadius: 12,
    backgroundColor: '#FFFFFF', 
    shadowColor: '#C2C2FF', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 1, 
    shadowRadius: 45, 
    elevation: 10,
    marginBottom:10
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
  width: width * 0.6,
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
  sectionWithSearchMargin: {
   paddingHorizontal: 10,
  marginTop: 40,
  alignSelf:'center',
  justifyContent:"center",
  alignItems:'center'
  },
   sectionWithSearchMarginS: {
     paddingHorizontal: 20,
  marginTop: 0,
  },
  searchButton: {
    backgroundColor: 'black',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
