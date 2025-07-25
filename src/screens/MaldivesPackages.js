import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
  Linking,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import PhoneS from '../assets/images/PhoneS.svg';
import Getqoute from '../assets/images/getQoute.svg';
import FlagSVG from '../assets/images/flagS.svg';
import HeartSVG from '../assets/images/Heart.svg'; 
import Header from '../components/Header';
import { fetchSinglePage } from '../redux/slices/pagesSlice';
import Property3SVG from '../assets/images/Property3.svg'; 
import RightIcon from '../assets/images/Rightarrow.svg';
import LeftIcon from '../assets/images/Leftarrow.svg';
import RedFlag from '../assets/images/redFlag.svg';
import Currencygold from '../assets/images/currencygold.svg';
import {
  selectMultiCenterDeals,
  fetchMultiCenterDeals,
  selectMultiCenterDealsStatus,
} from '../redux/slices/pakagesSlice';
import { useSelector, useDispatch } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../constants/colors';
const { width } = Dimensions.get('window'); 
const bannerWidth = width * 0.9;
const bannerHeight = bannerWidth * 0.45;
const cardWidth = width * 0.9; 
const slides = [
  {
    id: '1',
    image: 'https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Example public URL
    title: '1. Watersports in Ideal Vistas',
    description: 'Witness a quick energy boost with your favorite watersports  Witness a quick energy boost with your favorite watersportsWitness a quick energy boost with your favorite watersports...',
  },
  {
    id: '2',
    image: 'https://images.pexels.com/photos/1000653/pexels-photo-1000653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Example public URL
    title: '2. Snorkeling Paradise',
   description: 'Witness a quick energy boost with your favorite watersports  Witness a quick energy boost with your favorite watersportsWitness a quick energy boost with your favorite watersports...',
 },
  {
    id: '3',
    image: 'https://images.pexels.com/photos/1792613/pexels-photo-1792613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Example public URL
    title: '3. Sunset Cruise',
   description: 'Witness a quick energy boost with your favorite watersports  Witness a quick energy boost with your favorite watersportsWitness a quick energy boost with your favorite watersports...',
 },
];
export default function MaldivesPackages({ navigation }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSinglePage());
    dispatch(fetchMultiCenterDeals());
  }, [dispatch]);
  const single = useSelector((state) => state.pages.singlePage);
  const loading = useSelector((state) => state.pages.loading);
  const multiCenterDealsStatus = useSelector(selectMultiCenterDealsStatus);
  const multiCenterDeals = useSelector(selectMultiCenterDeals);
  const [visibleMultiCenterDealCount, setVisibleMultiCenterDealCount] = useState(4);
  const handleLoadMoreMultiCenterDeals = () => {
    setVisibleMultiCenterDealCount((prevCount) => prevCount + 4);
  };
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollToIndex = (index) => {
    if (scrollRef.current && index >= 0 && index < slides.length) {
      scrollRef.current.scrollTo({ x: index * width, animated: true }); // Use `width` to scroll full screen
      setCurrentIndex(index);
    }
  };
  const [scrollPosition, setScrollPosition] = useState(0);
  const [contentHeight, setContentHeight] = useState(1);
  const [containerHeight, setContainerHeight] = useState(1);
  const thumbHeight = Math.max((containerHeight / contentHeight) * containerHeight, 30);
  const maxThumbPosition = containerHeight - thumbHeight;
  const thumbPosition = Math.min(
    (scrollPosition / (contentHeight - containerHeight)) * maxThumbPosition || 0,
    maxThumbPosition
  );
  return (
    <View style={styles.container}>
      <Header title="Maldives " showNotification={true} navigation={navigation} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.sectionWithSearchMarginSafari}>
          {loading ? (
            <SkeletonPlaceholder borderRadius={10}>
              <SkeletonPlaceholder.Item
                width={bannerWidth}
                height={bannerHeight}
                borderRadius={10}
                alignSelf="center"
              />
            </SkeletonPlaceholder>
          ) : single && single?.banner ? (
            <>
              <FastImage
                source={{
                  uri: single.banner,
                  priority: FastImage.priority.high,
                  cache: FastImage.cacheControl.immutable,
                }}
                style={[styles.bannerImgSafari, { width: bannerWidth, height: bannerHeight }]}
                resizeMode={FastImage.resizeMode.cover}
                onError={(e) => console.warn('Safari slider image error:', e.nativeEvent)}
               />

              <View style={styles.customCardContainer}>
                <Text style={styles.customCardTitle}>
                  {single.title || 'Best Holiday Destinations for You'}
                </Text>
                <View style={styles.scrollableDescriptionWrapper}>
                  <ScrollView
                    style={styles.customScrollArea}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={(_, h) => setContentHeight(h)}
                    onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
                    onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.y)}
                    scrollEventThrottle={16}
                  >
                    <Text style={styles.customCardDescription}>
                      {stripHtmlTags(single.description)}
                    </Text>
                  </ScrollView>
                  <View style={styles.customScrollbarTrack}>
                    <View
                      style={[
                        styles.customScrollbarThumb,
                        {
                          height: thumbHeight,
                          top: thumbPosition,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.packagesListTitle}>All-Inclusive Holiday Packages 2025-26</Text>
                  <Text style={styles.packagesListsubtitle}>
                    Scroll through luxury Holiday Packages 2025 deals handpicked by our UK travel
                    experts for you and your loved ones.
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <Text style={{ color: colors.mediumGray, alignSelf: 'center' }}>
              No safari banner found.
            </Text>
          )}
        </View>
        {/* Multi-Center Deals Section */}
        <View style={styles.multiCenterDealsSection}>
          {multiCenterDealsStatus === 'loading' ? (
            <SkeletonPlaceholder>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                }}
              >
                {[...Array(4)].map((_, index) => (
                  <View key={index} style={[styles.card, { backgroundColor: colors.lightGray, marginBottom: 15 }]} />
                ))}
              </View>
            </SkeletonPlaceholder>
          ) : (
            <>
              <FlatList
                data={multiCenterDeals.slice(0, visibleMultiCenterDealCount)}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10 }}
                contentContainerStyle={{ paddingTop: 10 }}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('PakageDetails', { packageId: item.id })}
                  >
                    <ImageBackground
                      source={{ uri: item.main_image }}
                      style={styles.cardImage}
                      imageStyle={styles.imageStyle}
                    >
                      <View style={styles.pill}>
                        <Image
                          source={require('../assets/images/flag.png')}
                          style={styles.flagIcon}
                        />
                        <Text style={styles.daysText}>{item.duration || '7 Nights'}</Text>
                      </View>
                    </ImageBackground>
                    <View style={styles.cardContent}>
                      <Text style={styles.titleText} numberOfLines={4}>
                        {item.title}
                      </Text>
                      <View style={styles.bottomRow}>
                        <Text style={styles.priceText}>
                          £{item.sale_price || item.price}{' '}
                          <Text style={styles.unit}>/{item.packagetype || 'pp'}</Text>
                        </Text>
                        <Text style={styles.rating}>⭐ {item.rating}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
              {visibleMultiCenterDealCount < multiCenterDeals.length && (
                <TouchableOpacity onPress={handleLoadMoreMultiCenterDeals} style={styles.loadMoreButton}>
                  <Text style={styles.loadMoreButtonText}>Load More</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>

        {/* Basics You Must Know Section */}
        <View style={styles.basicsContainer}>
          <Text style={styles.basicsMainTitle}>Basics You Must Know</Text>
          <Text style={styles.basicsMainDescription}>
            For a seamless voyage, learn about these basics before you embark on your Maldives luxury holiday.
          </Text>

          {/* First Row: One Card (Local Time) */}
          <View style={styles.infoCardRowSingle}>
            <View style={styles.infoCard}>
              <View style={[styles.timeCurrencyIcon, { }]}>
                {/* Placeholder or actual SVG for Local Time */}
              <RedFlag width={70} height={70} /> {/* Using Property3SVG here */}
              </View>
              <Text style={styles.infoCardValue}>Local Time</Text>
              <Text style={styles.infoCardLabel}>Currently 05:36:04</Text>
            </View>
          </View>

          {/* Second Row: Two Cards (Currency and Language) */}
          <View style={styles.infoCardRowDouble}>
            {/* Currency Card */}
            <View style={styles.infoCard}>
              <View style={[styles.timeCurrencyIcon, { backgroundColor: '#C28D3E' }]}>
             <Text style={styles.timeCurrencyIconText}>+5hrs</Text>
              </View>
              <Text style={styles.infoCardLabel}>Currency</Text>
              <Text style={styles.infoCardValue}>Maldivian Rufiyaa</Text>
            </View>

            {/* Language Card */}
            <View style={styles.infoCard}>
              <View style={[styles.timeCurrencyIcon, { backgroundColor: '#C28D3E' }]}>
                {/* Placeholder or another SVG for Language */}
                <Currencygold width={40} height={40} /> {/* Using Property3SVG here */}
                

              </View>
              <Text style={styles.infoCardLabel}>Language</Text>
              <Text style={styles.infoCardValue}>Dhivehi</Text>
            </View>
          </View>

          {/* Additional centered text for Basics You Must Know section */}
          
        </View>

        {/* Horizontal Image Slider Section */}
        <View style={styles.sliderSection}>
          <ScrollView
            horizontal
            ref={scrollRef}
            showsHorizontalScrollIndicator={false}
            pagingEnabled // Enables snapping to individual slides
            onMomentumScrollEnd={(event) => {
              const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
              setCurrentIndex(newIndex);
            }} >
            {slides.map((item) => (
              <View key={item.id} style={styles.slideItem}>
                <Image source={{ uri: item.image }} style={styles.sliderImage} />
                <View style={styles.sliderContentCard}>
                  <Text style={styles.sliderTitle}>{item.title}</Text>
                  <Text style={styles.sliderDescription}>{item.description}</Text>
                </View>
              </View>
            ))}
                
          </ScrollView>
          <View style={{justifyContent:"center",alignItems:"center"}}>
               <Image source={require('../assets/images/seatwo.png')} style={styles.sliderImageSec} />
                <View style={styles.customCardContainer}>
                <Text style={styles.customCardTitleHeading}>
                  {single.title || 'Best Holiday Destinations for You'}
                </Text>
                <View style={styles.scrollableDescriptionWrapper}>
                  <ScrollView
                    style={styles.customScrollArea}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={(_, h) => setContentHeight(h)}
                    onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
                    onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.y)}
                    scrollEventThrottle={16}
                  >
                    <Text style={styles.customCardDescription}>
                      {stripHtmlTags(single.description)}
                    </Text>
                  </ScrollView>
                  <View style={styles.customScrollbarTrack}>
                    <View
                      style={[
                        styles.customScrollbarThumb,
                        {
                          height: thumbHeight,
                          top: thumbPosition,
                        },
                      ]}
                    />
                  </View>
                
                </View>
              </View>
          </View>
          {/* Slider Navigation Arrows */}
          <TouchableOpacity
            style={styles.leftArrow}
            onPress={() => scrollToIndex(currentIndex - 1)}
            disabled={currentIndex === 0}>
            <LeftIcon width={25} height={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rightArrow}
            onPress={() => scrollToIndex(currentIndex + 1)}
            disabled={currentIndex === slides.length - 1}   >
            <RightIcon width={25} height={25} />
          </TouchableOpacity>
          {/* Dots for slider indication */}
          {/* <View style={styles.paginationDots}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentIndex === index && styles.activeDot,
                ]}
              />
            ))}
          </View> */}
          
        </View>
      </ScrollView>

      {/* Bottom Fixed Bar */}
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
    backgroundColor: colors.white,
 
  },
  scrollContainer: {
    paddingBottom: 80, 
  },
  sectionWithSearchMarginSafari: {
    paddingHorizontal: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImgSafari: {
    marginTop: 1,
    marginBottom: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
  customCardContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 10,
    marginVertical: 10,
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    width: bannerWidth,
    alignSelf: 'center',
  },
  customCardTitle: {
    backgroundColor: 'rgba(1, 190, 158, 0.08)',
    color: colors.darkGray,
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
    textAlign: 'center',
  },
   customCardTitleHeading: {

    color: colors.darkGray,
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'left',
  },
  
  customScrollArea: {
    maxHeight: 120,
    paddingRight: 16,
  },
  customCardDescription: {
    color: colors.mediumGray,
    fontSize: 14,
    lineHeight: 20,
  },
  customScrollbarTrack: {
    width: 8,
    height: 120,
    backgroundColor: '#f5f6fa',
    borderRadius: 4,
    position: 'absolute',
    right: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customScrollbarThumb: {
    width: 10,
    backgroundColor: '#b88a3b',
    borderRadius: 4,
    position: 'absolute',
    left: 0,
  },
  packagesListTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.darkGray,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: '#C28D3E1F',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 5,
    marginTop: 30,
  },
  packagesListsubtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.gray,
    marginBottom:5,
    textAlign: 'center',
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  multiCenterDealsSection: {
    paddingBottom: 20,
  },
  card: {
    width: imageWidth,
    height: 210,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: colors.white,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  imageStyle: {
    borderRadius: 10,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  daysText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.black,
    marginTop: -5,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  unit: {
    fontSize: 12,
    fontWeight: 'normal',
    color: colors.gray,
  },
  rating: {
    fontSize: 12,
    color: colors.gold,
  },
  flagIcon: {
    marginRight: 4,
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  loadMoreButton: {
    backgroundColor: colors.goldTable,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  loadMoreButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  basicsContainer: {
    marginHorizontal: 15,
    padding: 16,
    borderRadius: 12,
  },
  basicsMainTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  basicsMainDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  infoCardRowSingle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  infoCardRowDouble: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  infoCard: {
    //  backgroundColor: 'red',
    // borderRadius: 8,
    padding: 15,
    margin: 5,
    alignItems: 'center',
    width: '45%', // To fit two in a row
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },
  timeCurrencyIcon: {
    width: 70,
    height: 50,
    borderRadius: 10, // Make it circular
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  timeCurrencyIconText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoCardLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
    textAlign: 'center',
  },
  infoCardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  remainingTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 15,
  },
  remainingText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#333',
    lineHeight: 22,
  },

  // --- Horizontal Image Slider Styles ---
  sliderSection: {
    marginTop: 0,
    marginBottom: 20,
    paddingHorizontal:10, // Add padding to the section
  },
  slideItem: {
    width: width - 40, // Full width minus horizontal padding
    marginHorizontal: 10, // Center the slide within the scrollview
    alignItems: 'center',
  },
  sliderImage: {
    width: '100%',
    height: width * 0.50, // Responsive height
    borderRadius: 12,
  },
  sliderImageSec:{
width: '95%',
    height: width * 0.50, // Responsive height
    borderRadius: 12,
  },
  sliderContentCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: -12, // Overlap with image
    padding: 15,
    width: '100%', // Make content card slightly smaller than image for visual effect
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    marginBottom:10
  },
  sliderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6,
    textAlign: 'center',
  },
  sliderDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    textAlign: 'center',
  },
  leftArrow: {
    position: 'absolute',
    left: 1,
    top: '10%', // Adjust positioning relative to the slide
    zIndex: 10,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.8)', // Semi-transparent background
    borderRadius: 25,
     elevation: 5,
  },
  rightArrow: {
    position: 'absolute',
    right: 1,
    top: '10%', // Adjust positioning
    zIndex: 10,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 25,
     elevation: 5,
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: colors.primary, // Or any active color you prefer
  },

  // --- Bottom Bar Styles ---
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 12,
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    left: 0, // Ensure it sticks to the left
    right: 0, // Ensure it sticks to the right
    paddingVertical: 15,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#eee',
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
    color: colors.white,
    fontWeight: 'bold',
  },
});

function stripHtmlTags(html) {
  return html?.replace(/<[^>]*>?/gm, '') || '';
}