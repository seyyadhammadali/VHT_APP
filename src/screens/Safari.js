
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Linking,
} from 'react-native';
import Getqoute from '../assets/images/getQoute.svg';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-reanimated-carousel';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import PhoneS from '../assets/images/PhoneS.svg';
import {
  selectSafariPackages,
  selectSafariPackagesStatus,
} from '../redux/slices/pakagesSlice';
import {
  fetchSingleSafariPage,
  selectSingleSafariPage,
  selectPagesLoading,
} from '../redux/slices/pagesSlice';
import colors from '../constants/colors';
import RenderHtml from 'react-native-render-html';
import {
    selectSafariSliders, 
    fetchSafariSliders, 
     sliderStatus, 
} from '../redux/slices/sliderSlice';
const CARD_MARGIN = 7;
const { width: windowWidth } = Dimensions.get('window');
const cardWidth = (windowWidth - 14 * 2 - CARD_MARGIN) / 2;
const bannerWidth = windowWidth * 0.92;
const bannerHeight = 150;

const SLIDER_WIDTH = windowWidth * 0.95; 
const SLIDER_HEIGHT = 180; 
const renderSliderItem = ({ item }) => {
  return (
    <TouchableOpacity
      style={styles.sliderItem}
      onPress={() => item.redirect_url && Linking.openURL(item.redirect_url)}
      activeOpacity={0.8}
    >
      <FastImage
        source={{
          uri: item.large,
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.immutable,
        }}
        style={styles.sliderImage}
        resizeMode={FastImage.resizeMode.cover}
      />
    </TouchableOpacity>
  );
};

export default function Safari({ navigation }) {
  const dispatch = useDispatch();
   const safariSliders = useSelector(selectSafariSliders);
  const slider_status = useSelector(sliderStatus);
  const safariPackages = useSelector(selectSafariPackages);
  const safariPackagesStatus = useSelector(selectSafariPackagesStatus);
  const singleCruisePage = useSelector(selectSingleSafariPage);
  const loading = useSelector(selectPagesLoading);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [contentHeight, setContentHeight] = useState(1);
  const [containerHeight, setContainerHeight] = useState(1);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const carouselRef = useRef(null);
  const { width } = Dimensions.get('window');
  const thumbHeight = Math.max(
    (containerHeight / contentHeight) * containerHeight,
    30,
  );
  const maxThumbPosition = containerHeight - thumbHeight;
  const thumbPosition = Math.min(
    (scrollPosition / (contentHeight - containerHeight)) * maxThumbPosition || 0,
    maxThumbPosition,
  );
  useEffect(() => {
      dispatch(fetchSafariSliders());
    dispatch(fetchSingleSafariPage());
  }, [dispatch]);
  const showCustomScrollbar = !loading && contentHeight > containerHeight;
  const baseTagStyles = {
    p: {
      fontSize: 14,
      color: 'gray',
      marginBottom: 0,
      paddingBottom: 0,
    },
    h1: { fontSize: 14, fontWeight: 'bold', color: 'black' },
    h2: { fontSize: 18, fontWeight: 'bold', color: 'black' },
    strong: { fontWeight: 'bold', color: 'blue' },
    em: { fontStyle: 'italic' },
    ul: { marginBottom: 5 },
    ol: { marginBottom: 5 },
    li: {
      fontSize: 14,
      color: 'gray',
      marginLeft: 10,
      marginBottom: 3,
    },
    a: {
      color: 'blue',
      textDecorationLine: 'underline',
    }
  };
const renderHtmlContent = (htmlContent) => {
  const baseTagStyles = {
    
    p: {
      fontSize: 14,
      color: '',
      marginBottom: 10,
      paddingBottom: 0,
    },
    h1: { backgroundColor: 'rgba(1, 190, 158, 0.08)',
    color: colors.darkGray,
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 10,
    textAlign: 'center', 
  },
    h2: { backgroundColor: 'rgba(1, 190, 158, 0.08)',
    color: colors.darkGray,
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 10,
    textAlign: 'center', 
  },
    
    strong: { fontWeight: 'bold', color: 'rgba(3, 3, 3, 0.08)' },
    em: { fontStyle: 'italic' },
    ul: { marginBottom: 5 },
    ol: { marginBottom: 5 },
    li: {
      fontSize: 14,
      color: 'gray',
      marginLeft: 10,
      marginBottom: 3,
    },
    a: {
      color: 'blue',
      textDecorationLine: 'underline',
    }
  };
  if (!htmlContent) return null;
  return (
    <RenderHtml 
              tagsStyles={baseTagStyles}
                // contentWidth={width}
                source={{ html: htmlContent || '' }}
              /> 
  );
};
  return (
    <View style={styles.maincontainer}>
      <Header title="Safari" showNotification={true} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* The carousel implementation has been moved here */}
        <View style={styles.sectionWithSearchMargin}>
          {slider_status === 'loading' ? (
            <SkeletonPlaceholder borderRadius={10}>
              <SkeletonPlaceholder.Item
                width={bannerWidth}
                height={bannerHeight}
                borderRadius={10}
                alignSelf="center"
              />
            </SkeletonPlaceholder>
          ) : Array.isArray(safariSliders ) && safariSliders .length > 0 ? (
            <>
              <Carousel
                ref={carouselRef}
                loop={safariSliders .length > 1}
                width={SLIDER_WIDTH}
                height={SLIDER_HEIGHT}
                autoPlay={safariSliders .length > 1}
                autoPlayInterval={3000}
                data={safariSliders }
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => setCurrentSlideIndex(index)}
                renderItem={renderSliderItem}
              />

              {/* Pagination dots based on the actual number of slides */}
              {safariSliders .length > 1 && (
                <View style={styles.paginationContainer}>
                  {safariSliders .map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.paginationDot,
                        index === currentSlideIndex && styles.paginationDotActive,
                      ]}
                    />
                  ))}
                </View>
              )}
            </>
          ) : (
            <View style={[styles.noSlidersContainer, { width: bannerWidth, height: bannerHeight }]}>
              <Text style={styles.noSlidersText}>No slides found.</Text>
            </View>
          )}
        </View>

        <View style={styles.customCardContainer}>
          {/* <Text style={styles.customCardTitle}>{singleCruisePage?.title || 'Best Holiday Destinations for You'}</Text> */}
          <View style={styles.scrollableDescriptionWrapper}>
            <ScrollView
              style={styles.customScrollArea}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={(_, h) => setContentHeight(h)}
              onLayout={e => setContainerHeight(e.nativeEvent.layout.height)}
              onScroll={e => setScrollPosition(e.nativeEvent.contentOffset.y)}
              scrollEventThrottle={16}
            >
              {loading ? (
                <SkeletonPlaceholder>
                  <SkeletonPlaceholder.Item width="100%" height={100} borderRadius={4} />
                </SkeletonPlaceholder>
              ) : renderHtmlContent(singleCruisePage.description) }
            </ScrollView>
            {showCustomScrollbar && (
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
            )}
          </View>
        </View>
        <View style={styles.container}>
          {safariPackagesStatus === 'loading' ? (
            <SkeletonPlaceholder>
              <View style={styles.packagesHolidayRow}>
                {[...Array(4)].map((_, index) => (
                  <SkeletonPlaceholder.Item
                    key={index}
                    width={cardWidth}
                    height={240}
                    borderRadius={12}
                    marginBottom={12}
                    marginRight={index % 2 === 0 ? CARD_MARGIN : 0}
                    marginLeft={index % 2 === 1 ? CARD_MARGIN : 0}
                  />
                ))}
              </View>
            </SkeletonPlaceholder>
          ) : (
            <FlatList
              data={safariPackages}
              keyExtractor={(item, index) => item.id?.toString() || index.toString()}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                paddingHorizontal: 14,
              }}
              contentContainerStyle={{ paddingBottom: 100 }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => navigation.navigate('PakageDetails', { packageSlug: item.slug })}
                  activeOpacity={0.85}
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
                      <Text style={styles.rating}>⭐ {item.rating || '4.0'}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </ScrollView>
       <View style={styles.bottomBar}>
        <TouchableOpacity style={[styles.blueButton, { backgroundColor: colors.green }]} onPress={()=>navigation.navigate('SubmitEnquiry')}>
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

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  packagesHolidayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 20,
    borderRadius: 20,
    paddingHorizontal: 14,
  },
  container: {
    marginTop: 80,
  },
  sectionWithSearchMargin: {
    paddingHorizontal: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: bannerHeight + 40,
    marginBottom: 10,
  },
   bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 12,
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    left: 0, // Ensure it spans the full width
    right: 0, // Ensure it spans the full width
    alignSelf: 'center',
    paddingVertical: 15,
    borderTopWidth: 1, // Optional: Add a subtle border
    borderTopColor: colors.lightGray,
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
    margin: 3,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  card: {
    width: cardWidth,
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 4,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardImage: {
    height: 180,
    justifyContent: 'flex-start',
  },
  imageStyle: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: 'flex-start',
    position: 'absolute',
    bottom: 5,
    marginLeft: 5,
  },
  flagIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    marginRight: 6,
  },
  daysText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.black,
  },
  cardContent: {
    padding: 10,
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.darkGray,
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.gold,
  },
  unit: {
    fontSize: 11,
    color: colors.mediumGray,
  },
  rating: {
    fontSize: 12,
    color: colors.orange,
    fontWeight: '600',
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
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollableDescriptionWrapper: {
    flexDirection: 'row',
    height: 120,
    alignSelf: 'center',
    width: '100%',
    padding: 10,
  },
  customScrollArea: {
    flex: 1,
    paddingRight: 0,
    height: 200,
  },
  customScrollbarTrack: {
    width: 4,
    height: '100%',
    backgroundColor: '#f5f6fa',
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginLeft: 5,
  },
  customScrollbarThumb: {
    width: 4,
    height: 'auto',
    backgroundColor: '#b88a3b',
    borderRadius: 4,
    position: 'absolute',
    left: 0,
  },
  // New styles for the carousel and pagination
  sliderItem: {
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
  },
  sliderImage: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 3,
  },
  paginationDotActive: {
    backgroundColor: colors.primary, // Or any active color you prefer
  },
  noSlidersContainer: {
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  noSlidersText: {
    color: colors.mediumGray,
  },
});