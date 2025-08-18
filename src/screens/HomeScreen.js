import React, { useState, useEffect, useRef } from 'react';
import {View,Text,  StyleSheet,  Image,  TextInput,  ScrollView,  TouchableOpacity,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Platform,
  useWindowDimensions,
  FlatList,
  Keyboard,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import NoInternetMessage from '../components/NoInternetMessage';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import StarSVG from '../assets/images/starS.svg';
import NotifyIconSVG from '../assets/images/notifyIcon.svg';
import { useSelector, useDispatch } from 'react-redux';
import Slider from '../components/Slider';

import { fetchSearchPackages, setSearchKeyword } from '../redux/slices/searchSlice';
import {  selectHotDestinations } from '../redux/slices/destinationsSlice';
import { selectFilteredPage} from '../redux/slices/pagesSlice';
import colors from '../constants/colors';
import { getResponsiveDimensions } from '../constants/sliderConfig';
import HolidaySection from '../components/HolidaySection';
import HeaderComponent from '../components/HeaderComponent';
import FooterTabs from '../components/FooterTabs';

const { width, height } = Dimensions.get('window');
const SLIDER_WIDTH = width;
const SLIDER_HEIGHT = width * 0.5;
const bannerConfig = getResponsiveDimensions('BANNER');
// const ContentSkeleton = () => (
//   <View style={styles.skeletonContentContainer}>
//     <SkeletonPlaceholder>
//       {/* Slider Placeholder */}
//       <SkeletonPlaceholder.Item
//         width={SLIDER_WIDTH - 20}
//         height={SLIDER_HEIGHT}
//         borderRadius={10}
//         marginVertical={30}
//         alignSelf="center"
//       />
//       {/* Top Destinations Placeholder */}
//       <SkeletonPlaceholder.Item paddingHorizontal={14} marginBottom={10}>
//         <SkeletonPlaceholder.Item width={150} height={20} borderRadius={4} marginBottom={10} />
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//           {[...Array(5)].map((_, index) => (
//             <View key={index} style={{ alignItems: 'center' }}>
//               <SkeletonPlaceholder.Item width={60} height={60} borderRadius={30} />
//               <SkeletonPlaceholder.Item width={50} height={10} borderRadius={4} marginTop={6} />
//             </View>
//           ))}
//         </View>
//       </SkeletonPlaceholder.Item>

//       {/* Holiday Packages Placeholder */}
//       <SkeletonPlaceholder.Item paddingHorizontal={14} marginVertical={10}>
//         <SkeletonPlaceholder.Item width={200} height={20} borderRadius={4} marginBottom={10} />
//         <View style={{ flexDirection: 'row' }}>
//           {[...Array(2)].map((_, index) => (
//             <View key={index} style={[styles.holidaycard, { width: 280, marginRight: 15 }]}>
//               <SkeletonPlaceholder.Item width={280} height={170} borderTopLeftRadius={20} borderTopRightRadius={20} />
//               <SkeletonPlaceholder.Item padding={8}>
//                 <SkeletonPlaceholder.Item width={180} height={15} borderRadius={4} />
//                 <SkeletonPlaceholder.Item width={120} height={12} borderRadius={4} marginTop={6} />
//                 <SkeletonPlaceholder.Item width={150} height={12} borderRadius={4} marginTop={6} />
//               </SkeletonPlaceholder.Item>
//             </View>
//           ))}
//         </View>
//       </SkeletonPlaceholder.Item>

//       {/* Safari Packages Placeholder */}
//       <SkeletonPlaceholder.Item paddingHorizontal={14} marginVertical={10}>
//         <SkeletonPlaceholder.Item width={200} height={20} borderRadius={4} marginBottom={10} />
//         <SkeletonPlaceholder.Item
//           width={bannerConfig.WIDTH}
//           height={bannerConfig.HEIGHT}
//           borderRadius={10}
//           alignSelf="center"
//         />
//       </SkeletonPlaceholder.Item>
//     </SkeletonPlaceholder>
//   </View>
// );
const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const currentPage = useSelector(selectFilteredPage('home'));
  const safariPage = useSelector(selectFilteredPage('safari'));
  const holidayPage = useSelector(selectFilteredPage('holiday-hotlist'));
  const CruisePage = useSelector(selectFilteredPage('cruise'));
  const multiCenterPage = useSelector(selectFilteredPage('multi-centre-holidays'));
  useEffect(()=>{
    if(currentPage){
      setIsScreenLoading(false);
    }
  },[setIsScreenLoading, currentPage]);
  const  sliders = currentPage?.sliders;
  const destinations = useSelector(selectHotDestinations);
  const safariSliders = safariPage?.sliders;
  const cruisePackages = CruisePage?.products;
  const holidayPackages = holidayPage?.products;
  const multiCenterDeals =multiCenterPage?.products ;
  const [isConnected, setIsConnected] = useState(true);
  const hasFetchedData = useRef(false);
  // Network connection listener
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const connected = state.isConnected && state.isInternetReachable;
      setIsConnected(connected);
      if (connected && !hasFetchedData.current) {
        // Internet is back and we haven't fetched data yet
   
      }
    });

    return () => unsubscribe();
  },);
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
  const carouselRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      <SafeAreaView style={{ flex: 1 }}>
        {!isConnected ? (
          <>
            <HeaderComponent navigation={navigation} keyword={keyword} setKeyword={setKeyword} handleSearch={handleSearch} />
            <NoInternetMessage />
          </>
        ) : (
          <>
            <HeaderComponent navigation={navigation} keyword={keyword} setKeyword={setKeyword} handleSearch={handleSearch} />
          

              <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.sectionWithSearchMargin}>
                  {!sliders ?(
                      <SkeletonPlaceholder>
                          <SkeletonPlaceholder.Item
                            width={SLIDER_WIDTH - 20}
                            height={SLIDER_HEIGHT}
                            borderRadius={10}
                            marginVertical={30}
                            alignSelf="center"
                          />
                      </SkeletonPlaceholder>
                    ):(
                     <Slider images={sliders}  width={SLIDER_WIDTH} height={SLIDER_HEIGHT} />
                    )}
                  
                </View>
             {/* Top Destinations Section */}
  <View style={{ paddingHorizontal: 10 }}>
    <View style={styles.headingtopDestination}>
      <Text style={styles.sectionTitle}>Top Destinations</Text>
      <TouchableOpacity onPress={() => navigation.navigate('TopDestination')}>
        <Text style={styles.sectionTitlelight}>See all</Text>
      </TouchableOpacity>
    </View>

    {!destinations || destinations.length === 0 ? (
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between" marginVertical={10}>
          {[...Array(5)].map((_, index) => (
            <SkeletonPlaceholder.Item
              key={index}
              alignItems="center"
              marginRight={8}
            >
              <SkeletonPlaceholder.Item width={60} height={60} borderRadius={30} />
              <SkeletonPlaceholder.Item width={50} height={10} borderRadius={4} marginTop={6} />
            </SkeletonPlaceholder.Item>
          ))}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    ) : (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {destinations.map((item, index) => (
          <TouchableOpacity
            key={item.id || index}
            style={styles.destinationItem}
            onPress={() =>
              navigation.navigate('MaldivesPackages', {
                destinationId: item.id,
                destinationName: item.name,
              })
            }
          >
            <FastImage
              source={{ uri: item.banner }}
              style={styles.destinationImage}
              resizeMode={FastImage.resizeMode.cover}
            />
            <Text style={styles.destinationText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    )}
  </View>
           {/* Holiday Packages Section */}
  <View style={styles.sectionHoliday}>
    <View style={styles.headingtop}>
      <Text style={styles.sectionTitle}>Holiday Packages</Text>
      <TouchableOpacity onPress={() => navigation.navigate('HolidayHotList')}>
        <Text style={styles.sectionTitlelight}>See all</Text>
      </TouchableOpacity>
    </View>

    {!holidayPackages || holidayPackages.length === 0 ? (
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="row" paddingHorizontal={14}>
          {[...Array(2)].map((_, index) => (
            <SkeletonPlaceholder.Item
              key={index}
              width={280}
              height={300}
              borderRadius={12}
              marginRight={15}
            />
          ))}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    ) : (
      <HolidaySection
        title="Holiday Packages"
        packages={holidayPackages}
        seeAllScreen="HolidayHotList"
      />
    )}
  </View>
{/* ////////////Multi-Centre Deals///////////// */}
        
  <View style={styles.sectionHoliday}>
    <View style={styles.headingtop}>
      <Text style={styles.sectionTitle}>Multi-Centre Deals</Text>
      <TouchableOpacity onPress={() => navigation.navigate('MulticenterDeals')}>
        <Text style={styles.sectionTitlelight}>See all</Text>
      </TouchableOpacity>
    </View>

    {!multiCenterDeals || multiCenterDeals.length === 0 ? (
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="row" paddingHorizontal={14}>
          {[...Array(2)].map((_, index) => (
            <SkeletonPlaceholder.Item
              key={index}
              width={280}
              height={300}
              borderRadius={12}
              marginRight={15}
            />
          ))}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    ) : (
      <HolidaySection
        title="Multi-Centre Deals"
        packages={multiCenterDeals}
        seeAllScreen="HolidayHotList"
      />
    )}
  </View>

             {/* Safari Packages Section */}
  <View style={styles.SafariPakages}>
    <View style={styles.headingtop}>
      <Text style={styles.sectionTitle}>Safari Packages</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Safari')}>
        <Text style={styles.sectionTitlelight}>See all</Text>
      </TouchableOpacity>
    </View>

    {!safariSliders || safariSliders.length === 0 ? (
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          width={bannerConfig.WIDTH}
          height={bannerConfig.HEIGHT}
          borderRadius={10}
          alignSelf="center"
        />
      </SkeletonPlaceholder>
    ) : (
      <FastImage
        source={{ uri: safariSliders[0].large }}
        style={[styles.bannerImgSafari, { width: bannerConfig.WIDTH, height: bannerConfig.HEIGHT }]}
        resizeMode={FastImage.resizeMode.cover}
      />
    )}
  </View>
{/* //////////////////Cruise//////////////// */}
           <View style={styles.sectionHoliday}>
    <View style={styles.headingtop}>
      <Text style={styles.sectionTitle}>Cruise Packages</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Cruise')}>
        <Text style={styles.sectionTitlelight}>See all</Text>
      </TouchableOpacity>
    </View>

    {!cruisePackages || cruisePackages.length === 0 ? (
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="row" paddingHorizontal={14}>
          {[...Array(2)].map((_, index) => (
            <SkeletonPlaceholder.Item
              key={index}
              width={280}
              height={300}
              borderRadius={12}
              marginRight={15}
            />
          ))}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    ) : (
      <HolidaySection
        title="Cruise Packages"
        packages={cruisePackages}
        seeAllScreen="HolidayHotList"
      />
    )}
  </View>
              </ScrollView>
          </>
        )}
      </SafeAreaView>
      <FooterTabs></FooterTabs>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  skeletonContentContainer: {
    flex: 1,
  },
  // ... rest of your styles
  noDataText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
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
  // carouselImage: {
  //   width: '100%',
  //   height: '100%',
  //   objectFit: 'fill',
  //   borderRadius: 10,
  // },
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginTop:6
     
  },
  headingtopDestination:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 2,
    marginTop:6
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
    objectFit:'fill'
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
   
    // marginTop: height * 0.02,
     paddingHorizontal: 12,
    marginBottom: 5,
  },
  sectionHoliday: {
    marginTop: height * 0.02,
    // paddingHorizontal: 2,
    marginBottom: 5,
  },
 
  sectionpopular: {
    marginTop: 0,
    paddingHorizontal: 14,
  },
  SafariPakages: {
    
    marginTop: height * 0.02,
    // paddingHorizontal: 2,
    marginBottom: 5,
  
  
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
    marginRight: 8,
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
   paddingHorizontal:14
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
