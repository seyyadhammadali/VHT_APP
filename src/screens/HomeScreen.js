import React, { useState, useEffect, useRef } from 'react';
import {View,Text,  StyleSheet,  ScrollView,  TouchableOpacity,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Keyboard,
  Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoldenRing from  '../assets/images/goldenring.svg';
import NetInfo from '@react-native-community/netinfo';
import NoInternetMessage from '../components/NoInternetMessage';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FastImage from 'react-native-fast-image';
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
 import { setupPushNotifications } from './PushNotificationService';
const { width, height } = Dimensions.get('window');
const SLIDER_WIDTH = width;
const SLIDER_HEIGHT = width * 0.5;
const bannerConfig = getResponsiveDimensions('BANNER');
const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const currentPage = useSelector(selectFilteredPage('home'));
  const safariPage = useSelector(selectFilteredPage('safari'));
  const holidayPage = useSelector(selectFilteredPage('holiday-hotlist'));
  const CruisePage = useSelector(selectFilteredPage('cruise'));
  const multiCenterPage = useSelector(selectFilteredPage('multi-centre-holidays'));
useEffect(() => {
  const checkModal = async () => {
    const shown = await AsyncStorage.getItem('notificationModalShown');
    if (!shown) {
      setShowNotificationModal(true);
      const timer = setTimeout(async () => {
        setShowNotificationModal(false);
        await AsyncStorage.setItem('notificationModalShown', 'true'); // remember
      }, 6000);
      // cleanup if user closes earlier
      return () => clearTimeout(timer);
    }
  };
  checkModal();
}, []);
  const handleAllowNotifications = async () => {
    setShowNotificationModal(false);
    await AsyncStorage.setItem('notificationModalShown', 'true'); // remember choice
    await setupPushNotifications(dispatch); // request permission + fetch token
  };
  const handleSkipNotifications = async () => {
    setShowNotificationModal(false);
    await AsyncStorage.setItem('notificationModalShown', 'true'); // remember choice
  };
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
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const connected = state.isConnected && state.isInternetReachable;
      setIsConnected(connected);
      if (connected && !hasFetchedData.current) {
   
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
  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      <SafeAreaView style={{ flex: 1 }}>
        {!isConnected ? (
          <>      
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
        packages={holidayPackages.slice(0, 8)}
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
        packages={multiCenterDeals.slice().reverse().slice(0, 8)}
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
        style={[styles.bannerImgSafari, { width: width -20, height: bannerConfig.HEIGHT }]}
        resizeMode={FastImage.resizeMode.cover}
      />
    )}
  </View>
{/* //////////////////Cruise//////////////// */}
  <View style={[styles.sectionHoliday,{paddingBottom:50}]}>
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
        <Modal
        visible={showNotificationModal}
        transparent
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <GoldenRing/>
            <Text style={styles.modalTitle}>“Virikson Holidays” Would like to send you notifications?</Text>
            <Text style={styles.modalText}>
           Notifications may include alerts,
               holiday packages,deals.
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity onPress={handleSkipNotifications} style={styles.cancelBtn}>
                <Text style={[styles.btnText,{color:"lightgray"}]}>Don't Allow</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAllowNotifications} style={styles.okBtn}>
                <Text style={[styles.btnText, { color: '#fff' }]}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  sectionWithSearchMargin: {
    marginVertical: 20,
    paddingHorizontal: 0,
  }, 
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 70,
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
  bannerImgSafari: {
    marginTop: 1,
    marginBottom: 10,
    alignSelf: 'center',
    paddingTop: 0,
    paddingBottom: 12,
    borderRadius: 10,
    objectFit:'fill'
  },
  sectionHoliday: {
    marginTop: height * 0.02,
    // paddingHorizontal: 2,
    marginBottom: 5,
  },
  SafariPakages: {
    marginTop: height * 0.02,
    marginBottom: 5,
  },
  sectionTitlelight: {
    fontSize: 15,
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
    marginRight: 12,
  },
  destinationImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: colors.gold,
   paddingHorizontal:18
  },
  destinationText: {
    fontSize: 12,
    color: '#333',
  },
 modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
},
modalBox: {
  width: '80%',
  backgroundColor: '#fff',
  borderRadius: 12,
  padding: 20,
  alignItems: 'center',
},
modalTitle: {
  fontSize: 18,
  fontWeight: '700',
  marginBottom: 10,
  marginTop:10,
  paddingHorizontal:15
},
modalText: {
  fontSize: 14,
  color: 'gray',
  textAlign: 'center',
  marginBottom: 30,
},
modalActions: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
},
cancelBtn: {
  flex: 1,
  marginRight: 10,
  padding: 12,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#8888881C',
  backgroundColor:"#8888881C",
  alignItems: 'center',
},
okBtn: {
  flex: 1,
  marginLeft: 10,
  padding: 12,
  borderRadius: 8,
  backgroundColor:colors.gold,
  alignItems: 'center',
},
btnText: {
  fontSize: 14,
  fontWeight: '600',
},
});
 