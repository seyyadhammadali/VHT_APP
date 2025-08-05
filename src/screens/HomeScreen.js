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
  FlatList ,
   Keyboard,
   
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FastImage from 'react-native-fast-image';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import StarSVG from '../assets/images/starS.svg';
import NotifyIconSVG from '../assets/images/notifyIcon.svg';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectHolidayPackages,
  selectMultiCenterDeals,
  selectCruisePackages,
  fetchHolidayPackages,
  fetchMultiCenterDeals,
  fetchCruisePackages,
  fetchSafariPackages,
  selectHolidayPackagesStatus,
  selectMultiCenterDealsStatus,
  selectCruisePackagesStatus,
  selectSafariPackagesStatus,
  selectPakagesLoading,
  selectPakagesError
} from '../redux/slices/pakagesSlice';
import { fetchSearchPackages, setSearchKeyword } from '../redux/slices/searchSlice';;
import { destinationStatus, fetchCountryDestinations } from '../redux/slices/destinationsSlice';
import { fetchHomeSliders , sliderStatus } from '../redux/slices/sliderSlice';
import {fetchSafariSliders} from '../redux/slices/SafariSlice'
import SliderBanner from '../components/SliderBanner';
import colors from '../constants/colors';
import Menu from '../assets/images/menuSVG.svg';
import { SLIDER_CONFIG, getResponsiveDimensions } from '../constants/sliderConfig';

const { width, height } = Dimensions.get('window');
// Get responsive dimensions
const bannerConfig = getResponsiveDimensions('BANNER');
const packageCardConfig = getResponsiveDimensions('PACKAGE_CARD'); 
const HomeScreen = ({navigation }) => {
  const dispatch = useDispatch();
  const { height: windowHeight } = useWindowDimensions();
  const stackNavigation = useNavigation();
  const [keyword, setKeyword] = useState('');
  const statusBarHeight = Platform.OS === 'ios' ? 20 : (StatusBar.currentHeight || 16);
  const safariSliders = useSelector((state) => state.safari.safariSliders);
  const safariLoading = useSelector((state) => state.safari.safariLoading);
  const { sliders } = useSelector(state => state.slider);
  const destinations = useSelector(state => state.destination.country);
  const [searchText, setSearchText] = useState('');
  const [showSearchButton, setShowSearchButton] = useState(false);
  const holidayPackages = useSelector(selectHolidayPackages);
  const multiCenterDeals = useSelector(selectMultiCenterDeals);
  const cruisePackages = useSelector(selectCruisePackages);
  const pakagesLoading = useSelector(selectPakagesLoading);
  const pakagesError = useSelector(selectPakagesError);
  const destination_status = useSelector(destinationStatus);
  const slider_status = useSelector(sliderStatus);
  const holidayPackagesStatus = useSelector(selectHolidayPackagesStatus);
  const multiCenterDealsStatus = useSelector(selectMultiCenterDealsStatus);
  const cruisePackagesStatus = useSelector(selectCruisePackagesStatus);
  const safariPackagesStatus = useSelector(selectSafariPackagesStatus);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  useEffect(() => {
    const fetchAllHomeData = async () => {
      try {
        const fetches = [];
        if (destination_status === 'idle') fetches.push(dispatch(fetchCountryDestinations()));
      if (slider_status === 'idle') {
        fetches.push(dispatch(fetchHomeSliders()));
        fetches.push(dispatch(fetchSafariSliders())); // ✅
      }
        if (holidayPackagesStatus === 'idle') fetches.push(dispatch(fetchHolidayPackages()));
        if (multiCenterDealsStatus === 'idle') fetches.push(dispatch(fetchMultiCenterDeals()));
        if (cruisePackagesStatus === 'idle') fetches.push(dispatch(fetchCruisePackages()));
        if (safariPackagesStatus === 'idle') fetches.push(dispatch(fetchSafariPackages()));
        await Promise.all(fetches);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchAllHomeData();
  }, );
 
   const handleSearch = () => {
    // Dismiss the keyboard when the search button is pressed
    Keyboard.dismiss();

    if (keyword.trim()) {
      // 1. Save the keyword to Redux state
      dispatch(setSearchKeyword(keyword.trim()));

      // 2. Dispatch the API call to fetch packages
      dispatch(fetchSearchPackages(keyword.trim()));

      // 3. Navigate to the SearchScreen
      navigation.navigate('SearchScreen');

      // Optional: Clear the input field after searching
      setKeyword('');
    } else {
      // Optionally, show an alert or a message if the input is empty
      alert('Please enter a search keyword to find packages.');
    }
  };
  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
    <SafeAreaView style={{ flex: 1 }}>
         <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
       <View style={{position: 'relative'}}>
        <View style={styles.headerBackground}>
        <FastImage
          source={require('../assets/images/backgroundImage.png')}
          style={StyleSheet.absoluteFill}
          resizeMode={FastImage.resizeMode.cover}
            />
         <View style={[styles.headerContent, { zIndex: 1 }]}> 
         {/* <TouchableOpacity onPress={() => (stackNavigation.getParent()?.dispatch(DrawerActions.openDrawer()))}> */}
        {/* <TouchableOpacity
            onPress={() => {
          // Get the navigation object of the parent (the drawer navigator)
          const drawerNav = navigation.getParent();
          
          // Check if the drawer navigator was found before dispatching the action
          if (drawerNav) {
            drawerNav.dispatch(DrawerActions.openDrawer());
          } else {
            console.warn("Drawer navigator not found!");
          }
        }}
      > */}
       <TouchableOpacity  style={styles.menuButton} onPress={() => navigation.openDrawer()} >
         {/* <FastImage source={require('../assets/images/menu.png')} style={styles.menuIcon} /> */}
         <Menu  width={22} height={22} />
        </TouchableOpacity>
         <Image source={require('../assets/images/Logo.png')} style={styles.logoStyle} />
         <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.iconButton} onPress={()=>navigation.navigate('Notifications')}>
          <NotifyIconSVG width={22} height={22} />
            </TouchableOpacity>
         </View>
          </View>
           </View>
        <View style={styles.searchBarAbsoluteContainer}>
          <View style={styles.searchBarContainer}>
            <Image source={require('../assets/images/search.png')} style={styles.searchIcon} />
            <TextInput
              placeholder="Search Countries, Cities, Places..."
              placeholderTextColor="#999"
              style={styles.searchBar}
              value={keyword}
          onChangeText={setKeyword}
          // The returnKeyType can still be 'search' but the primary trigger is the button
          returnKeyType="search"
          onSubmitEditing={handleSearch}
            />
            {/* {showSearchButton && ( */}
              <TouchableOpacity 
                style={styles.searchButton} 
                onPress={handleSearch}
              >
                <Text style={styles.searchButtonText}>Search</Text>
              </TouchableOpacity>
            {/* )} */}
          </View>
        </View>
      </View>
<View style={styles.sectionWithSearchMargin}>
   <SliderBanner
                    sliders={sliders} // Make sure 'sliders' is correctly passed from your Redux state or local state
                    loading={slider_status === 'loading'}
                    navigation={navigation} // <--- IMPORTANT: Pass navigation here
                />

</View>
  
<View style={styles.sectionDesination}>
  <View style={styles.headingtop}>
    <Text style={styles.sectionTitle}>Top Destinations</Text>
    <TouchableOpacity onPress={() => navigation.navigate('HolidayHotList')}>
      <Text style={styles.sectionTitlelight}>See all</Text>
    </TouchableOpacity>
  </View>

  {destination_status === 'loading' ? (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <SkeletonPlaceholder>
        <View style={{ flexDirection: 'row' }}>
          {[...Array(5)].map((_, index) => (
            <View key={index} style={{ alignItems: 'center', marginRight: 15 }}>
              <SkeletonPlaceholder.Item
                width={60}
                height={60}
                borderRadius={30}
              />
              <SkeletonPlaceholder.Item
                width={50}
                height={10}
                borderRadius={4}
                marginTop={6}
              />
            </View>
          ))}
        </View>
      </SkeletonPlaceholder>
    </ScrollView>
  ) : Array.isArray(destinations) && destinations.length > 0 ? (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {destinations.map((item, index) => (
        <TouchableOpacity key={item.id || index} style={styles.destinationItem} onPress={() => navigation.navigate('MaldivesPackages', { destinationId: item.id, destinationName: item.name, navigation:navigation })}>
          <FastImage
            source={{ uri: item.banner }}
            style={styles.destinationImage}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text style={styles.destinationText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  ) : (
    <Text>No destinations found.</Text>
  )}
</View>

 <View style={styles.sectionHoliday}>
  <View style={styles.headingtop}>
    <Text style={styles.sectionTitle}>Holiday Packages</Text>
    <TouchableOpacity onPress={() => navigation.navigate('HolidayHotList')}>
      <Text style={styles.sectionTitlelight}>See all</Text>
    </TouchableOpacity>
  </View>

  {pakagesLoading ? (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.packagesHolidayRow}
    >
      <SkeletonPlaceholder>
        <View style={{ flexDirection: 'row' }}>
          {[...Array(3)].map((_, index) => (
            <View key={index} style={styles.holidaycard}>
              <SkeletonPlaceholder.Item
                width={330}
                height={170}
                borderTopLeftRadius={20}
                borderTopRightRadius={20}
              />
              <SkeletonPlaceholder.Item padding={8}>
                <SkeletonPlaceholder.Item width={180} height={15} borderRadius={4} />
                <SkeletonPlaceholder.Item
                  width={120}
                  height={12}
                  borderRadius={4}
                  marginTop={6}
                />
                <SkeletonPlaceholder.Item
                  width={150}
                  height={12}
                  borderRadius={4}
                  marginTop={6}
                />
              </SkeletonPlaceholder.Item>
            </View>
          ))}
        </View>
      </SkeletonPlaceholder>
    </ScrollView>
  ) : (
    <FlatList
      data={holidayPackages}
      horizontal
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item }) => (
         <View style={{ width: packageCardConfig.WIDTH, marginRight: packageCardConfig.MARGIN_RIGHT }}>
        <TouchableOpacity style={styles.holidaycard}    onPress={() => navigation.navigate('PakageDetails', { packageSlug: item.slug })}>
          <FastImage
            source={{
              uri: item.main_image,
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}
            style={styles.holidayimage}
            resizeMode={FastImage.resizeMode.cover}
          />
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
        </TouchableOpacity>
        </View>
      )}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.packagesHolidayRow}
      initialNumToRender={3}
      windowSize={5}
      maxToRenderPerBatch={5}
      removeClippedSubviews={true}
      getItemLayout={(data, index) => ({
        length: 330,
        offset: 330 * index,
        index,
      })}
    />
  )}
</View>
   <View style={styles.sectionHoliday}>
  <View style={styles.headingtop}>
    <Text style={styles.sectionTitle}>Multi-Centre Deals</Text>
    <TouchableOpacity onPress={() => navigation.navigate('MulticenterDeals')}>
      <Text style={styles.sectionTitlelight}>See all</Text>
    </TouchableOpacity>
  </View>

  {multiCenterDealsStatus === 'loading' ? (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.packagesHolidayRow}
    >
      <SkeletonPlaceholder>
        <View style={{ flexDirection: 'row' }}>
          {[...Array(3)].map((_, index) => (
            <View key={index} style={styles.holidaycard}>
              <SkeletonPlaceholder.Item
                width={330}
                height={170}
                borderTopLeftRadius={20}
                borderTopRightRadius={20}
              />
              <SkeletonPlaceholder.Item padding={8}>
                <SkeletonPlaceholder.Item width={180} height={15} borderRadius={4} />
                <SkeletonPlaceholder.Item
                  width={120}
                  height={12}
                  borderRadius={4}
                  marginTop={6}
                />
                <SkeletonPlaceholder.Item
                  width={150}
                  height={12}
                  borderRadius={4}
                  marginTop={6}
                />
              </SkeletonPlaceholder.Item>
            </View>
          ))}
        </View>
      </SkeletonPlaceholder>
    </ScrollView>
  ) : (
    <FlatList
      horizontal
      data={multiCenterDeals}
      keyExtractor={(item, index) => item.id?.toString() || index.toString()}
      renderItem={({ item }) => (
           <View style={{ width: packageCardConfig.WIDTH, marginRight: packageCardConfig.MARGIN_RIGHT }}>
         <TouchableOpacity style={styles.holidaycard}    onPress={() => navigation.navigate('PakageDetails', { packageSlug: item.slug })}>
          <FastImage
            source={{
              uri: item.main_image,
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}
            style={styles.holidayimage}
          />
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
        </TouchableOpacity>
        </View>
      )}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.packagesHolidayRow}
      onScroll={({ nativeEvent }) => {
        const paddingToRight = 150;
        const scrolledToRight =
          nativeEvent.layoutMeasurement.width + nativeEvent.contentOffset.x >=
          nativeEvent.contentSize.width - paddingToRight;

        if (scrolledToRight) setHasScrolledToBottom(true);
      }}
      scrollEventThrottle={200}
      initialNumToRender={3}
      maxToRenderPerBatch={5}
      windowSize={5}
      removeClippedSubviews={true}
    />
  )}
</View>
<View style={styles.SafariPakages}>
  <View style={styles.headingtop}>
    <Text style={styles.sectionTitle}>Safari Packages</Text>
    <TouchableOpacity onPress={() => navigation.navigate('Safari')}>
      <Text style={styles.sectionTitlelight}>See all</Text>
    </TouchableOpacity>
  </View>
  <View style={styles.sectionWithSearchMarginSafari}>
    {safariLoading ? (
      <SkeletonPlaceholder borderRadius={10}>
        <SkeletonPlaceholder.Item 
          width={bannerConfig.WIDTH} 
          height={bannerConfig.HEIGHT} 
          borderRadius={10}
          alignSelf="center"
        />
      </SkeletonPlaceholder>
    ) : Array.isArray(safariSliders) && safariSliders.length > 0 && safariSliders[0].large ? (
      <FastImage
        source={{
          uri: safariSliders[0].large,
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.immutable,
        }}
        style={[styles.bannerImgSafari, {width: bannerConfig.WIDTH, height: bannerConfig.HEIGHT}]}
        resizeMode={FastImage.resizeMode.cover}
        onError={(e) =>
          console.warn('Safari slider image error:', e.nativeEvent)
        }
      />
    ) : (
      <Text style={{ color: '#999', alignSelf: 'center' }}>No safari banner found.</Text>
    )}
  </View>
</View>
<View style={styles.sectionHoliday}>
  <View style={styles.headingtop}>
    <Text style={styles.sectionTitle}>Cruise Packages</Text>
    <TouchableOpacity onPress={() => navigation.navigate('Cruise')}>
      <Text style={styles.sectionTitlelight}>See all</Text>
    </TouchableOpacity>
  </View>
  {cruisePackagesStatus === 'loading' ? (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.packagesHolidayRow}
    >
      <SkeletonPlaceholder>
        <View style={{ flexDirection: 'row' }}>
          {[...Array(3)].map((_, index) => (
            <SkeletonPlaceholder.Item
              key={index}
              width={330}
              height={170}
              borderRadius={20}
              marginRight={10}
            />
          ))}
        </View>
      </SkeletonPlaceholder>
    </ScrollView>
  ) : (
    <FlatList
      data={cruisePackages}
      horizontal
      keyExtractor={(item, index) => item.id?.toString() || index.toString()}
      renderItem={({ item }) => (
           <View style={{ width: packageCardConfig.WIDTH, marginRight: packageCardConfig.MARGIN_RIGHT }}>
         <TouchableOpacity style={styles.holidaycard}    onPress={() => navigation.navigate('PakageDetails', { packageSlug: item.slug })}>
          <FastImage
            source={{
              uri: item.main_image,
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}
            style={styles.holidayimage}
            resizeMode={FastImage.resizeMode.cover}
          />
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
        </TouchableOpacity>
        </View>
      )}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.packagesHolidayRow}
      initialNumToRender={3}
      maxToRenderPerBatch={5}
      windowSize={5}
      removeClippedSubviews={true}
    />
  )}
</View>
        </ScrollView>
      </SafeAreaView>
     
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
    width: bannerConfig.WIDTH,
    height: bannerConfig.HEIGHT,
    borderRadius: 8,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  menuIcon:{
    width: 20, height: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom:70,
  },
  headerBackground: {
    width: width,
    height: height * 0.18,
    alignSelf: 'center',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    overflow: 'hidden', // This is critical!
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
     paddingHorizontal:20,
     padding:10,
   
    paddingVertical:20
  },
  logoStyle:{
    width: width * 0.5,
  height: width * 0.2, // or use height * 0.1
  resizeMode: 'contain',
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
    menuButton: {
    marginRight: 6,
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
    marginTop:5,
    flexDirection:'row',
    justifyContent:"space-between"
  },
  section: {
    paddingHorizontal: 20,
  },
  bannerImgB: {
  // marginTop: 10,  
  marginTop: height * 0.01,       
  marginBottom: 10,      
  alignSelf: 'center',  
  paddingTop: 0,
paddingBottom: 12,
borderRadius:10
},
  bannerImgSafari: {
  marginTop: 1,         
  marginBottom: 10,      
  alignSelf: 'center',  
  paddingTop: 0,
paddingBottom: 12,
borderRadius:10
},
bannerImgS:{
  marginTop: -12,         
  marginBottom: -14,       
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
    //  marginTop: 20,
     marginTop: height * 0.02,
    paddingHorizontal: 14,
    marginBottom:10,
    
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
    marginRight: 5,
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
    borderWidth:1,
    borderColor:colors.gold
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
  paddingRight: 2,
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
  width: width * 0.7,
  marginRight: 0,
  backgroundColor: '#fff',
  borderRadius: 12,
  overflow: 'hidden',
  paddingVertical:0,
  borderTopRightRadius:20,
  borderTopLeftRadius:20,
  borderBottomLeftRadius: 12,
  borderBottomRightRadius: 12,
  shadowColor: '#C2C2FF',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.18, 
  shadowRadius: 45, 
  elevation: 15, 
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
   marginTop: height * 0.04,
  // marginTop: 40,
  alignSelf:'center',
  justifyContent:"center",
  alignItems:'center',
  height: bannerConfig.HEIGHT + 40 // Use responsive height based on banner height plus padding
  },
   sectionWithSearchMarginSafari: {
   paddingHorizontal: 10,
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
