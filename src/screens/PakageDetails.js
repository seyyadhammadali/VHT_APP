
import React, { useState, useRef, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
  FlatList,
  StatusBar,
  Linking
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'; // Make sure this is imported
import PhoneS from '../assets/images/PhoneS.svg';
import Getqoute from '../assets/images/getQoute.svg';
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
import Pakage from '../assets/images/pakage.svg';
import CheckBox from '../assets/images/checkbox.svg';
import RedBox from '../assets/images/redbox.svg';
import YellowLocation from '../assets/images/yellowLocation.svg';
import BackIcon from '../assets/images/BackIcon.svg';
import colors from '../constants/colors';
import { fetchSinglePackage, selectSinglePackage, selectSinglePackageStatus } from '../redux/slices/singlePackageSlice';
import { fetchHomeSliders, selectHomeSliders, sliderStatus } from '../redux/slices/sliderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SLIDER_CONFIG, getResponsiveDimensions } from '../constants/sliderConfig';
export default function PakageDetails({ navigation, route }) {
  const { packageSlug } = route.params;
  const dispatch = useDispatch();
  
  // Get responsive dimensions for package details slider
  const packageDetailsConfig = getResponsiveDimensions('PACKAGE_DETAILS');
  const singlePackage = useSelector(selectSinglePackage);
  const status = useSelector(selectSinglePackageStatus);
  const [visibleImages, setVisibleImages] = useState({});
  const [index, setIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('Tour');
  const [expandedIndex, setExpandedIndex] = useState(null);
  const sliders = useSelector(selectHomeSliders);
  useEffect(() => {
    dispatch(fetchHomeSliders());
  }, [dispatch]);
  const tourData = singlePackage;
  const hotelData = singlePackage?.hotels;
  const travelData = singlePackage?.travel_dates_tables;
  let currentTabData;
  if (activeTab === 'Tour') {
    currentTabData = tourData;
  } else if (activeTab === 'Hotel') {
    currentTabData = hotelData;
  } else if (activeTab === 'Travel') {
    currentTabData = travelData;
  }
const headerData = singlePackage?.main_images?.map((img) => ({
  image: { uri: img.image }, // format for <Image source={item.image} />
})) || [];

  const handleLoadMore = (idx, totalLength) => {
    setVisibleImages(prev => ({
      ...prev,
      [idx]: Math.min((prev[idx] || 10) + 10, totalLength),
    }));
  };
  useEffect(() => {
    dispatch(fetchSinglePackage(packageSlug));
  }, [dispatch, packageSlug]);

  const current = headerData[index];
  const flatListRef = useRef();
 useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (index + 1) % headerData.length; // Problem Line
      setIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 5000);
    return () => clearInterval(timer);
  },); 
  const handleScrollEnd = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / Dimensions.get('window').width);
    setIndex(newIndex);
  };
  if (status === 'loading') {
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
        <SkeletonPlaceholder borderRadius={8}>
          {/* Header Image and Back Button */}
          <SkeletonPlaceholder.Item width={windowWidth} height={300} />
          <SkeletonPlaceholder.Item
            width={32}
            height={32}
            borderRadius={10}
            position="absolute"
            top={40}
            left={20}
            zIndex={10}
          />
          {/* Main Content Area */}
          <SkeletonPlaceholder.Item
            marginTop={-50} // Adjust to overlap with the header skeleton
            borderTopLeftRadius={54}
            width={'100%'}
            paddingTop={20}
            backgroundColor="white"
          >
            {/* Flight, Meals, Star Row */}
            <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between" paddingHorizontal={15} marginTop={5}>
              <SkeletonPlaceholder.Item width={windowWidth / 3 - 20} height={40} borderRadius={8} />
              <SkeletonPlaceholder.Item width={windowWidth / 3 - 20} height={40} borderRadius={8} />
              <SkeletonPlaceholder.Item width={windowWidth / 3 - 20} height={40} borderRadius={8} />
            </SkeletonPlaceholder.Item>

            {/* Location and Duration */}
            <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between" paddingHorizontal={15} paddingVertical={10} marginTop={5}>
              <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
              <SkeletonPlaceholder.Item width={80} height={20} borderRadius={4} />
            </SkeletonPlaceholder.Item>

            {/* Title and Price */}
            <SkeletonPlaceholder.Item paddingHorizontal={10}>
              <SkeletonPlaceholder.Item width={'90%'} height={25} marginBottom={10} borderRadius={4} />
              <SkeletonPlaceholder.Item width={'60%'} height={20} marginBottom={10} borderRadius={4} />
            </SkeletonPlaceholder.Item>

            {/* Description */}
            <SkeletonPlaceholder.Item paddingHorizontal={10}>
              <SkeletonPlaceholder.Item width={'95%'} height={15} marginBottom={5} borderRadius={4} />
              <SkeletonPlaceholder.Item width={'90%'} height={15} marginBottom={5} borderRadius={4} />
              <SkeletonPlaceholder.Item width={'80%'} height={15} borderRadius={4} />
            </SkeletonPlaceholder.Item>

            {/* Tabs */}
            <SkeletonPlaceholder.Item flexDirection="row" justifyContent="center" marginTop={10} paddingHorizontal={5}>
              <SkeletonPlaceholder.Item width={100} height={30} borderRadius={15} marginHorizontal={5} />
              <SkeletonPlaceholder.Item width={100} height={30} borderRadius={15} marginHorizontal={5} />
              <SkeletonPlaceholder.Item width={100} height={30} borderRadius={15} marginHorizontal={5} />
            </SkeletonPlaceholder.Item>

            {/* Dynamic Content Based on Active Tab (Simplified) */}
            <SkeletonPlaceholder.Item paddingHorizontal={10} marginTop={20}>
              {activeTab === 'Hotel' ? (
                <>
                  <SkeletonPlaceholder.Item width={'100%'} height={180} marginBottom={12} borderRadius={10} />
                  <SkeletonPlaceholder.Item width={'100%'} height={180} marginBottom={12} borderRadius={10} />
                </>
              ) : activeTab === 'Travel' ? (
                <>
                  <SkeletonPlaceholder.Item width={'100%'} height={150} marginBottom={12} borderRadius={10} />
                  <SkeletonPlaceholder.Item width={'100%'} height={150} marginBottom={12} borderRadius={10} />
                </>
              ) : ( // Tour Tab
                <>
                  <SkeletonPlaceholder.Item width={'100%'} height={150} marginBottom={15} borderRadius={10} />
                  <SkeletonPlaceholder.Item width={'100%'} height={100} marginBottom={15} borderRadius={10} />
                  <SkeletonPlaceholder.Item width={'100%'} height={100} marginBottom={15} borderRadius={10} />
                </>
              )}
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </ScrollView>
    );
  }
  if (status === 'failed') {
    return (
      <View style={styles.errorContainer}>
        <Text>Failed to load package details. Please try again.</Text>
      </View>
    );
  }
  if (!singlePackage) {
    return (
      <View style={styles.errorContainer}>
        <Text>No package data available.</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
        {/* Header */}
        <View style={styles.cardImage}>
          <View style={styles.sliderContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                position: 'absolute',
                top: 40,
                left: 20,
                zIndex: 10,
                backgroundColor: '#ffffff',
                borderRadius: 8,
              }}
            >
              <BackIcon style={{ width: 10, height: 10 }} />
            </TouchableOpacity>

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
        width: packageDetailsConfig.WIDTH,
        height: packageDetailsConfig.HEIGHT,
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
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnStyle}>
            <Image
              source={require('../assets/images/Back.png')}
              style={styles.logoStyle}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.mainContainer} >
          <View style={styles.innerContent} contentContainerStyle={{ paddingBottom: 10 }}>
            <View style={styles.flightView}>
              <View style={[styles.flightViewS, { borderTopLeftRadius: 28 }]}>
                <Flight height={21} width={21} style={styles.iconStyle} />
                <Text style={styles.mainText}>Flights</Text>
              </View>
              <View style={styles.flightViewS}>
                <Coffee height={20} width={20} style={styles.iconStyle} />
                <Text style={styles.mainText}>All Meals & Transfers</Text>
              </View>
              <View style={styles.flightViewS}>
                <StarS height={20} width={20} style={styles.iconStyle} />
                <Text style={styles.mainText}>
                  {singlePackage?.rating || 'N/A'}
                </Text>
              </View>
            </View>
            <View style={[styles.staticInfoContainer]}>
              <View style={styles.leftInfo}>
                <LocationS height={15} width={15} style={styles.iconStyle} />
                <Text style={[styles.mainText, { color: 'gray',fontWeight:'400' }]}>
                  {singlePackage?.city || 'Location Not Available'}
                </Text>
              </View>
              <View style={styles.rightInfo}>
                <TimerS height={15} width={15} style={styles.iconStyle} />
                <Text style={[styles.mainText, { color: '#C28D3E' }]}>
                  {singlePackage?.duration || 'N/A Days'}
                </Text>
              </View>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
  <RenderHtml
    contentWidth={windowWidth - 20}
    source={{ html: singlePackage?.title || '<p>Title Not Available</p>' }}
    baseStyle={styles.textStyle}
  />
</View>
            <View style={styles.person}>
              <Text style={styles.dollarprice}>
               £ {singlePackage?.sale_price || '£ N/A'}
              </Text>
                   <Text style={styles.personS}>
                per person
              </Text> 
           
            </View>
            <View style={{ paddingHorizontal: 10 }}>
  <RenderHtml
    contentWidth={windowWidth - 20}
    source={{ html: singlePackage?.description || '<p>Description Not Available</p>' }}
    baseStyle={styles.nightStyle}
  />
</View>
            <View style={styles.flightViewTour}>
              {['Tour', 'Hotel', 'Travel'].map((tab, idx) => {
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
                    key={idx}
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
                status === 'loading' ? (
                  <SkeletonPlaceholder borderRadius={8}>
                    <SkeletonPlaceholder.Item
                      width={windowWidth - 30}
                      height={180}
                      marginBottom={12}
                      borderRadius={10}
                      backgroundColor={'gray'}
                    />
                    <SkeletonPlaceholder.Item
                      width={windowWidth - 30}
                      height={180}
                      marginBottom={12}
                      borderRadius={10}
                    />
                  </SkeletonPlaceholder>
                ) : (
                  <View>
                    {(hotelData || []).map((hotel, idx) => {
                      const imagesToShow = visibleImages[idx] || 10;
                      return (
                        <View key={idx} style={styles.hotelcontainer}>
                          {/* Header & Title */}
                          <View style={styles.hotelHeader}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <YellowLocation width={18} height={18} style={{ marginLeft: 5 }} />
                              <Text style={styles.mainTitle}>{hotel.title}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <StarS width={14} height={14} />
                              <Text style={{ marginLeft: 5, fontWeight: 'bold', fontSize: 13 }}>{hotel.rating}</Text>
                            </View>
                          </View>
                          <RenderHtml
  contentWidth={windowWidth - 20}
  source={{ html: hotel.amenities || '<p>Amenities Not Available</p>' }}
  baseStyle={styles.hotelAmenity}
/>

                          {/* Images */}
                          <View style={{ height: 300, marginTop: 10 }}>
                            <ScrollView
                              scrollEnabled
                              nestedScrollEnabled
                              contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
                              showsVerticalScrollIndicator
                            >
                              {(hotel.images || []).slice(0, imagesToShow).map((imgObj, i) => (
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
                                  <Image
                                    source={{ uri: imgObj.image }}
                                    style={{ width: '100%', height: '100%' }}
                                    resizeMode="cover"
                                  />
                                </View>
                              ))}

                              {hotel.images?.length > imagesToShow && (
                                <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
                                  <TouchableOpacity
                                    onPress={() => handleLoadMore(idx, hotel.images.length)}
                                    style={{
                                      padding: 8,
                                      backgroundColor: '#C28D3E',
                                      borderRadius: 6,
                                    }}
                                  >
                                    <Text style={{ color: '#fff' }}>Load More</Text>
                                  </TouchableOpacity>
                                </View>
                              )}
                            </ScrollView>
                          </View>

                          {/* Description */}
                          <Text style={styles.subtitle}>{hotel.description}</Text>
                        </View>
                      );
                    })}
                  </View>
                )
              ) : activeTab === 'Travel' ? (
                status === 'loading' ? (
                  <SkeletonPlaceholder borderRadius={8}>
                    <SkeletonPlaceholder.Item
                      width={windowWidth - 30}
                      height={150}
                      marginBottom={12}
                      borderRadius={10}
                    />
                    <SkeletonPlaceholder.Item
                      width={windowWidth - 30}
                      height={150}
                      marginBottom={12}
                      borderRadius={10}
                    />
                  </SkeletonPlaceholder>
                ) : (
                  <View style={styles.travelView}>
                    {(travelData || []).map((table, tableIdx) => {
                      const header = table[0];
                      const rows = table.slice(1);

                      return (
                        <View key={tableIdx} style={[styles.table, { marginTop: tableIdx > 0 ? 25 : 0 }]}>
                          <View style={styles.tableHeader}>
                            {header.map((headerText, i) => (
                              <Text key={i} style={styles.tableHeaderText}>
                                {headerText.replace(/\r\n/g, '')}
                              </Text>
                            ))}
                          </View>
                          {rows.map((row, rowIdx) => (
                            <View key={rowIdx} style={[styles.tableRow, rowIdx % 2 !== 0 && styles.tableRowAlt]}>
                              {row.map((cellData, cellIdx) => (
                                <Text key={cellIdx} style={styles.tableCell}>
                                  {cellData.replace(/\r\n/g, '')}
                                </Text>
                              ))}
                            </View>
                          ))}
                        </View>
                      );
                    })}
                  </View>
                )
              ) : (
                <>
                  {/* TOUR TAB DISPLAY */}
                  <View style={styles.card}>
                    <View style={styles.blueSky}>
                    </View>
                     <View style={[styles.pakageView, { marginTop: 10 }]}>
                      <RedBox style={{ paddingVertical: 12 }} />
                      <Text style={styles.sectionTitle}>07 Nights in Villa Nautica, Paradise Island</Text>
                    </View>
                    <Text style={styles.subtitle}>{stripHtmlTags(tourData.description)}</Text>
                    <View style={styles.checkboxRow}>
                      <Pakage width={16} height={16} />
                      <Text style={[styles.bulletText, { fontSize: 14, fontWeight: '500', color: 'black' }]}>
                        Package Inclusion
                      </Text>
                    </View>
                       <Text style={styles.sectionTitleFood}>Features</Text>
                      
                      <RenderHtml
  contentWidth={windowWidth - 20}
  source={{ html: tourData?.itinerary || '<p>Itinerary Not Available</p>' }}
  baseStyle={styles.subtitle}
/>
                    
                    {/* <Text style={styles.rating}>⭐⭐⭐⭐⭐ ({tourData.reviews})</Text>
                    <Text style={[styles.roomType, { fontWeight: 'bold' }]}>
                      Room Type: {tourData.roomType}
                    </Text>
                    <Text style={styles.mealing}>
                      Meal: <Text style={styles.mealStyle}>all Inclusive</Text>
                    </Text> */}
                  </View>

                  <View style={styles.sectionP}>
                    
                    {/* {(tourData.itinerary || []).map((item, idx) => (
                      <View key={idx} style={styles.checkboxRow}>
                        <CheckBox width={16} height={16} />
                        <Text style={styles.bulletText}>{item}</Text>
                      </View>
                    ))} */}

                   
                  </View>

                  {/* <View style={styles.section}>
                    <Text style={styles.sectionTitleFood}>Features</Text>
                    <View style={styles.featureGrid}>
                      {(tourData.features || []).map((item, idx) => (
                        <Text key={idx} style={styles.featureItem}>{item}</Text>
                      ))}
                    </View>
                  </View> */}

                  {/* <View style={styles.section}>
                    <Text style={styles.sectionTitleFood}>Food & Beverage</Text>
                    <View style={styles.featureGrid}>
                      {(tourData.FoodBeverages || []).map((item, idx) => (
                        <Text key={idx} style={styles.featureItem}>{item}</Text>
                      ))}
                    </View>
                  </View> */}

                  {/* <View style={styles.section}>
                    <View style={[styles.pakageViewB, { marginTop: 10 }]}>
                      <TobookAir style={{ paddingVertical: 15 }} />
                      <Text style={styles.sectionTitleFoodB}>To Book</Text>
                    </View>
                    <View style={styles.featureGrid}>
                      {(tourData.ToBook || []).map((item, idx) => {
                        const Icon = bookingIcons[idx];
                        return (
                          <View key={idx} style={styles.rowItemB}>
                            <Icon width={22} height={22} style={styles.iconStyle} />
                            <Text style={styles.featureItem}>{item}</Text>
                          </View>
                        );
                      })}
                    </View>
                  </View> */}
                </>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
           <TouchableOpacity style={[styles.blueButton, { backgroundColor: colors.green }]} onPress={() => navigation.navigate('SubmitEnquiry')}>
         
          <Getqoute width={20} height={20} />
          <Text style={styles.buttonText}>Get A Quote</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.blueButton}
          onPress={() => Linking.openURL('tel:02080382020')}
        >
          <PhoneS width={20} height={20} />
          <Text style={styles.buttonText}>020 8038 2020</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  flightViewSTour: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C8C8F433',
    paddingHorizontal: 6,
    paddingVertical: 10,
    marginHorizontal: 2,
    borderRadius: 8,
  },
  flightViewTour: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 5
  },
  travelView:{
    paddingHorizontal: 10, 
    marginTop: 20,
    marginBottom:40 
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
  hotelHeader:{
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  tabText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  tabTextActive: {
    color: "red",
    fontWeight: '700',
  },
  flightViewS: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C8C8F433',
    paddingHorizontal: 6,
    paddingVertical: 10,
    marginHorizontal: 2,
    borderRadius: 8,
  },
  hotelcontainer: {
    justifyContent: "center",
    padding: 10
  },
  daysStyle: {
    flexDirection: "row",
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    position: "absolute",
    marginTop: 5,
    marginLeft: 2
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
    marginTop: 0
  },
  cardImage: {
    height: 300,
    width: "100%",
    position: "absolute",
    top: 0
  },
  logoStyle: {
    width: 25,
    height: 25,
  },
  mainContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 54,
    width: '100%',
    marginTop: 250,
    paddingTop: 20,
  },
  mainText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    marginLeft: -4,
    padding: 4
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 12,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    paddingVertical: 15,
  },
  blueButton: {
        flex: 1,
        backgroundColor: colors.blue,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 5,
        justifyContent: 'space-evenly',
        marginHorizontal: 5,
    },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  daysView: {
    flexDirection: "row"
  },
  person: {
    marginLeft: 'auto',
    height: 24,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  textStyle: {
    fontSize: 18,
    fontWeight: "600",
    paddingHorizontal: 5,
    marginLeft: 9
  },
  dollarprice: {
    color: "#EC1C24",
    fontWeight: "900",
    fontSize: 22,
        paddingHorizontal: 4
  },
  personS: {
    fontSize: 14,
    color: "#939393",
    marginLeft: 'auto',
    paddingHorizontal: 4
  },
  nightStyle: {
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: '400',
    marginTop: 20,
  },
  Tabcontainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 2,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  tabActive: {
    backgroundColor: '#f9c130',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 5,
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
  sectionP: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    color: 'black',
    marginLeft: 5,
    textAlign: 'left'
  },
  sectionTitleFood: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    color: 'black',
    paddingHorizontal: 10,
    backgroundColor: "#01BE9E1F",
    paddingVertical: 5,
    textAlign: 'left',
    width: 150,
    borderRadius: 10
  },
  sectionTitleF: {
    backgroundColor: "#01BE9E1F",
    width: 80,
    textAlign: "left",
    marginRight: "auto",
    position: "absolute",
    left: 0,
    fontWeight: '500',
    paddingHorizontal: 12
  },
  bullet: {
    fontSize: 14,
    marginBottom: 4,
    color: '#444',
    justifyContent: 'flex-start',
    paddingVertical: 2
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginTop: 10,
  },
  featureItem: {
    width: '48%',
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
  sectionTitleFoodB: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: 'black',
    paddingHorizontal: 6,
    paddingVertical: 4,
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
  blueSky: {
    flexDirection: "row",
  },
  pakageView: {
    flexDirection: "row",
    paddingHorizontal: 2,
  },
  pakageViewB: {
    flexDirection: "row",
    paddingHorizontal: 10,
    backgroundColor: '#0069CA14',
    borderRadius: 10
  },
  rowItemB: {
    flexDirection: 'row',
    width: 600
  },
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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
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
    marginBottom: 40
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
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    paddingVertical: 6,
    paddingHorizontal: 3,
    borderRadius: 8,
  },
  bulletText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 6,
    flex: 1,
    flexWrap: 'wrap',
  },
  mealStyle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'gray',
    marginRight: 50
  },
  mealing: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    paddingVertical: 2
  }
});
function stripHtmlTags(html) {
  return html?.replace(/<[^>]*>?/gm, '') || '';
}