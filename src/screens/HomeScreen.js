
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Platform,
  useWindowDimensions,
  FlatList,
  Keyboard,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
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
} from '../redux/slices/pakagesSlice';
import { fetchSearchPackages, setSearchKeyword } from '../redux/slices/searchSlice';
import { destinationStatus, fetchCountryDestinations } from '../redux/slices/destinationsSlice';
import { fetchHomeSliders, sliderStatus } from '../redux/slices/sliderSlice';
import { fetchSafariSliders, safariStatus } from '../redux/slices/SafariSlice';
import colors from '../constants/colors';
import Menu from '../assets/images/menuSVG.svg';
import { getResponsiveDimensions } from '../constants/sliderConfig';
const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const SLIDER_WIDTH = windowWidth;
const SLIDER_HEIGHT = windowWidth * 0.5;
const { width, height } = Dimensions.get('window');
const bannerConfig = getResponsiveDimensions('BANNER');
const packageCardConfig = getResponsiveDimensions('PACKAGE_CARD');

// Define a single full-screen skeleton component
const FullScreenSkeleton = () => (
  <View style={styles.skeletonContainer}>
    <SkeletonPlaceholder>
      {/* Header and Search Bar Placeholder */}
      <SkeletonPlaceholder.Item width={width} height={height * 0.18} borderBottomLeftRadius={35} borderBottomRightRadius={35} />
      <SkeletonPlaceholder.Item width={'92%'} height={45} borderRadius={12} alignSelf="center" marginTop={-22} />

      {/* Slider Placeholder */}
      <SkeletonPlaceholder.Item width={SLIDER_WIDTH - 20} height={SLIDER_HEIGHT} borderRadius={10} marginVertical={20} alignSelf="center" />

      {/* Top Destinations Placeholder */}
      <SkeletonPlaceholder.Item paddingHorizontal={14} marginBottom={10}>
        <SkeletonPlaceholder.Item width={150} height={20} borderRadius={4} marginBottom={10} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {[...Array(5)].map((_, index) => (
            <View key={index} style={{ alignItems: 'center' }}>
              <SkeletonPlaceholder.Item width={60} height={60} borderRadius={30} />
              <SkeletonPlaceholder.Item width={50} height={10} borderRadius={4} marginTop={6} />
            </View>
          ))}
        </View>
      </SkeletonPlaceholder.Item>

      {/* Holiday Packages Placeholder */}
      <SkeletonPlaceholder.Item paddingHorizontal={14} marginVertical={10}>
        <SkeletonPlaceholder.Item width={200} height={20} borderRadius={4} marginBottom={10} />
        <View style={{ flexDirection: 'row' }}>
          {[...Array(2)].map((_, index) => (
            <View key={index} style={[styles.holidaycard, { width: 280, marginRight: 15 }]}>
              <SkeletonPlaceholder.Item width={280} height={170} borderTopLeftRadius={20} borderTopRightRadius={20} />
              <SkeletonPlaceholder.Item padding={8}>
                <SkeletonPlaceholder.Item width={180} height={15} borderRadius={4} />
                <SkeletonPlaceholder.Item width={120} height={12} borderRadius={4} marginTop={6} />
                <SkeletonPlaceholder.Item width={150} height={12} borderRadius={4} marginTop={6} />
              </SkeletonPlaceholder.Item>
            </View>
          ))}
        </View>
      </SkeletonPlaceholder.Item>

      {/* Safari Packages Placeholder */}
      <SkeletonPlaceholder.Item paddingHorizontal={14} marginVertical={10}>
        <SkeletonPlaceholder.Item width={200} height={20} borderRadius={4} marginBottom={10} />
        <SkeletonPlaceholder.Item width={bannerConfig.WIDTH} height={bannerConfig.HEIGHT} borderRadius={10} alignSelf="center" />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  </View>
);

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { sliders } = useSelector(state => state.slider);
  const destinations = useSelector(state => state.destination.country);
  const safariSliders = useSelector(state => state.safari.safariSliders);
  const holidayPackages = useSelector(selectHolidayPackages);
  const multiCenterDeals = useSelector(selectMultiCenterDeals);
  const cruisePackages = useSelector(selectCruisePackages);
  const destination_status = useSelector(destinationStatus);
  const slider_status = useSelector(sliderStatus);
  const holidayPackagesStatus = useSelector(selectHolidayPackagesStatus);
  const multiCenterDealsStatus = useSelector(selectMultiCenterDealsStatus);
  const cruisePackagesStatus = useSelector(selectCruisePackagesStatus);
  const safariPackagesStatus = useSelector(selectSafariPackagesStatus);

  // New combined loading state
  const [isScreenLoading, setIsScreenLoading] = useState(true);

  useEffect(() => {
    // Check if any of the statuses are 'idle' or 'loading'
    const shouldFetch =
      destination_status === 'idle' ||
      slider_status === 'idle' ||
      holidayPackagesStatus === 'idle' ||
      multiCenterDealsStatus === 'idle' ||
      cruisePackagesStatus === 'idle' ||
      safariPackagesStatus === 'idle';
    if (shouldFetch) {
      setIsScreenLoading(true);
      const fetches = [
        dispatch(fetchCountryDestinations()),
        dispatch(fetchHomeSliders()),
        dispatch(fetchSafariSliders()),
        dispatch(fetchHolidayPackages()),
        dispatch(fetchMultiCenterDeals()),
        dispatch(fetchCruisePackages()),
        dispatch(fetchSafariPackages()),
      ];
      // Wait for all fetches to complete, then set the loading state to false
      Promise.allSettled(fetches)
        .then(() => {
          setIsScreenLoading(false);
        })
        .catch(error => {
          console.log('Error fetching data:', error);
          setIsScreenLoading(false); // Make sure to turn off loading even on error
        });
    } else if (
      // If all data is already loaded, set loading state to false
      destination_status === 'succeeded' &&
      slider_status === 'succeeded' &&
      holidayPackagesStatus === 'succeeded' &&
      multiCenterDealsStatus === 'succeeded' &&
      cruisePackagesStatus === 'succeeded' &&
      safariPackagesStatus === 'succeeded'
    ) {
      setIsScreenLoading(false);
    }
  }, [
    dispatch,
    destination_status,
    slider_status,
    holidayPackagesStatus,
    multiCenterDealsStatus,
    cruisePackagesStatus,
    safariPackagesStatus,
  ]);
  
  const [keyword, setKeyword] = useState('');
  const handleSearch = () => {
    Keyboard.dismiss();
    if (keyword.trim()) {
      dispatch(setSearchKeyword(keyword.trim()));
      dispatch(fetchSearchPackages(keyword.trim()));
      navigation.navigate('SearchScreen');
      setKeyword('');
    } else {
      alert('Please enter a search keyword to find packages.');
    }
  };
  const renderSliderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        if (item.slug) {
          navigation.navigate('PakageDetails', { packageSlug: item.slug });
        }
      }}
      style={styles.carouselItem}>
      <Image
        source={{ uri: item.large || item.image || 'https://via.placeholder.com/400x200?text=No+Image' }}
        style={styles.carouselImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  const carouselRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      <SafeAreaView style={{ flex: 1 }}>
        {/* Conditional Rendering based on isScreenLoading */}
        {isScreenLoading ? (
          <FullScreenSkeleton />
        ) : (
          <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header and Search */}
            <View style={{ position: 'relative' }}>
              <View style={styles.headerBackground}>
                <FastImage
                  source={require('../assets/images/bg-header.webp')}
                  style={StyleSheet.absoluteFill}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <View style={[styles.headerContent, { zIndex: 1 }]}>
                  <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
                    <Menu width={22} height={22} />
                  </TouchableOpacity>
                  <Image source={require('../assets/images/Logo.png')} style={styles.logoStyle} />
                  <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Notifications')}>
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
                    returnKeyType="search"
                    onSubmitEditing={handleSearch}
                  />
                  <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>Search</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Content Sections */}
            <View style={styles.sectionWithSearchMargin}>
              {/* Slider */}
              {Array.isArray(sliders) && sliders.length > 0 ? (
                <>
                  <Carousel
                    ref={carouselRef}
                    loop
                    width={SLIDER_WIDTH}
                    height={SLIDER_HEIGHT}
                    autoPlay={true}
                    autoPlayInterval={3000}
                    data={sliders}
                    scrollAnimationDuration={1000}
                    onSnapToItem={index => setCurrentSlideIndex(index)}
                    renderItem={renderSliderItem}
                  />
                  <View style={styles.paginationContainer}>
                    {sliders.map((_, index) => (
                      <View key={index} style={[styles.paginationDot, index === currentSlideIndex && styles.paginationDotActive]} />
                    ))}
                  </View>
                </>
              ) : (
                <Text style={styles.noDataText}>No slides found.</Text>
              )}
            </View>

            <View style={styles.sectionDesination}>
              <View style={styles.headingtop}>
                <Text style={styles.sectionTitle}>Top Destinations</Text>
                <TouchableOpacity onPress={() => navigation.navigate('TopDestination')}>
                  <Text style={styles.sectionTitlelight}>See all</Text>
                </TouchableOpacity>
              </View>
              {Array.isArray(destinations) && destinations.length > 0 ? (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {destinations.map((item, index) => (
                    <TouchableOpacity
                      key={item.id || index}
                      style={styles.destinationItem}
                      onPress={() => navigation.navigate('MaldivesPackages', { destinationId: item.id, destinationName: item.name, navigation: navigation })}>
                      <FastImage source={{ uri: item.banner }} style={styles.destinationImage} resizeMode={FastImage.resizeMode.cover} />
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
              {Array.isArray(holidayPackages) && holidayPackages.length > 0 ? (
                <FlatList
                  data={holidayPackages}
                  horizontal
                  keyExtractor={(item, index) => `${item.id}-${index}`}
                  renderItem={({ item }) => (
                    <View >
                      <TouchableOpacity style={styles.holidaycard} onPress={() => navigation.navigate('PakageDetails', { packageSlug: item.slug })}>
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
                          <Text style={styles.title} numberOfLines={3}>
                            {item.title}
                          </Text>
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
                />
              ) : (
                <Text>No holiday packages found.</Text>
              )}
            </View>

            <View style={styles.sectionHoliday}>
              <View style={styles.headingtop}>
                <Text style={styles.sectionTitle}>Multi-Centre Deals</Text>
                <TouchableOpacity onPress={() => navigation.navigate('MulticenterDeals')}>
                  <Text style={styles.sectionTitlelight}>See all</Text>
                </TouchableOpacity>
              </View>
              {Array.isArray(multiCenterDeals) && multiCenterDeals.length > 0 ? (
                <FlatList
                  horizontal
                  data={multiCenterDeals}
                  keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                  renderItem={({ item }) => (
                    <View>
                      <TouchableOpacity style={styles.holidaycard} onPress={() => navigation.navigate('PakageDetails', { packageSlug: item.slug })}>
                        <FastImage
                          source={{
                            uri: item.main_image,
                            priority: FastImage.priority.normal,
                            cache: FastImage.cacheControl.immutable,
                          }}
                          style={styles.holidayimage}
                        />
                        <View style={styles.cardContent}>
                          <Text style={styles.title} numberOfLines={3}>
                            {item.title}
                          </Text>
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
              ) : (
                <Text>No multi-center deals found.</Text>
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
                {Array.isArray(safariSliders) && safariSliders.length > 0 && safariSliders[0].large ? (
                  <FastImage
                    source={{
                      uri: safariSliders[0].large,
                      priority: FastImage.priority.high,
                      cache: FastImage.cacheControl.immutable,
                    }}
                    style={[styles.bannerImgSafari, { width: bannerConfig.WIDTH, height: bannerConfig.HEIGHT }]}
                    resizeMode={FastImage.resizeMode.cover}
                    onError={e => console.warn('Safari slider image error:', e.nativeEvent)}
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
              {Array.isArray(cruisePackages) && cruisePackages.length > 0 ? (
                <FlatList
                  data={cruisePackages}
                  horizontal
                  keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                  renderItem={({ item }) => (
                    <View>
                      <TouchableOpacity style={styles.holidaycard} onPress={() => navigation.navigate('PakageDetails', { packageSlug: item.slug })}>
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
                          <Text style={styles.title} numberOfLines={3}>
                            {item.title}
                          </Text>
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
              ) : (
                <Text>No cruise packages found.</Text>
              )}
            </View>
          </ScrollView>
        )}
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
  skeletonContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
  },
  // ... rest of your styles
  sectionWithSearchMargin: {
    marginVertical: 20,
    paddingHorizontal: 0,
  },
  carouselItem: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
    padding: 10,
    overflow: 'hidden',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    objectFit: 'fill',
    borderRadius: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
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
  menuIcon: {
    width: 20,
    height: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 70,
  },
  headerBackground: {
    width: width,
    height: height * 0.18,
    alignSelf: 'center',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    padding: 10,
    paddingVertical: 20,
  },
  logoStyle: {
    width: width * 0.5,
    height: width * 0.2,
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
  headingtop: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  section: {
    paddingHorizontal: 20,
  },
  bannerImgB: {
    marginTop: height * 0.01,
    marginBottom: 10,
    alignSelf: 'center',
    paddingTop: 0,
    paddingBottom: 12,
    borderRadius: 10,
  },
  bannerImgSafari: {
    marginTop: 1,
    marginBottom: 10,
    alignSelf: 'center',
    paddingTop: 0,
    paddingBottom: 12,
    borderRadius: 10,
  },
  bannerImgS: {
    marginTop: -12,
    marginBottom: -14,
    alignSelf: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
  sectionSafari: {
    paddingHorizontal: 20,
  },
  sectionDesination: {
    marginTop: 0,
    paddingHorizontal: 14,
  },
  sectionHoliday: {
    marginTop: height * 0.02,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  sectionpopular: {
    marginTop: 0,
    paddingHorizontal: 14,
  },
  SafariPakages: {
    marginTop: 0,
    paddingHorizontal: 14,
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
  },
  bannerImagePkg: {
    height: 150,
    borderRadius: 12,
    width: 350,
    alignSelf: 'center',
  },
  sectionTitlelight: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 2,
    color: 'lightgray',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
    color: 'black',
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
    borderWidth: 1,
    borderColor: colors.gold,
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
    marginBottom: 20,
    borderRadius: 20,
  },
  sectionHolidayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    paddingHorizontal: 10,
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
    lineHeight: 20,
  },
  subTitle: {
    fontSize: 14,
    color: 'gray',
    fontWeight: '600',
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
  starRating: {
    marginLeft: 'auto',
    marginTop: 2,
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
    marginBottom: 10,
  },
  imageHorizontal: {
    width: 120,
    height: 140,
    borderRadius: 20,
    marginLeft: 0,
  },
  cardContentHorizontal: {
    flex: 1,
    padding: 10,
  },
  holidaycard: {
    width: 280,
    marginRight: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 5,
    overflow: 'hidden',
    paddingVertical: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    shadowColor: '#C2C2FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 45,
    elevation: 15,
    height: 300,
  },
  ratingView: {
    flexDirection: 'row',
    marginLeft: 'auto',
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
    marginRight: 3,
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
  sectionWithSearchMarginSafari: {
    paddingHorizontal: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
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