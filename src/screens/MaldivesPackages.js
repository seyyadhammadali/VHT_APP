import React, { useEffect, useState, useRef, useCallback } from 'react';
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
  Animated,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import ScrollableHtmlContent from '../components/ScrollableHtmlContent';
import { DrawerActions } from '@react-navigation/native';
import { navigationRef } from '../navigation/navigationRef'; 
import FastImage from 'react-native-fast-image';
import PhoneS from '../assets/images/PhoneS.svg';
import Getqoute from '../assets/images/getQoute.svg';
import Header from '../components/Header';
import {destinationStatus, fetchSingleDestination } from '../redux/slices/destinationsSlice';
import RightIcon from '../assets/images/Rightarrow.svg';
import LeftIcon from '../assets/images/Leftarrow.svg';
import RedFlag from '../assets/images/redFlag.svg';
import Currencygold from '../assets/images/currencygold.svg';
import { useSharedValue } from "react-native-reanimated";
import {
  selectMultiCenterDeals,
  fetchMultiCenterDeals,
  selectMultiCenterDealsStatus,
} from '../redux/slices/pakagesSlice';
import RenderHTML from 'react-native-render-html';
import { useSelector, useDispatch } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../constants/colors';
import RenderHtml from 'react-native-render-html';
import { fetchMaldivesSliders, selectMaldivesSliders } from '../redux/slices/sliderSlice';
import { SLIDER_CONFIG, AUTO_SCROLL_INTERVALS, PAGINATION_STYLES, getResponsiveDimensions } from '../constants/sliderConfig';
const { width } = Dimensions.get('window');
const destinationConfig = getResponsiveDimensions('DESTINATION');
const thingsToDoConfig = getResponsiveDimensions('THINGS_TO_DO');
const famousPlacesConfig = getResponsiveDimensions('FAMOUS_PLACES');
const multiCenterConfig = getResponsiveDimensions('MULTI_CENTER_GRID');
const ITEM_WIDTH = famousPlacesConfig.WIDTH;
const ITEM_SPACING = (width - ITEM_WIDTH) / 2;
const CARD_MARGIN_RIGHT_FAMOUS_PLACES = famousPlacesConfig.MARGIN_RIGHT;
const MULTI_CENTER_CARD_WIDTH = multiCenterConfig.CARD_WIDTH;
const MULTI_CENTER_CARD_HEIGHT = multiCenterConfig.CARD_HEIGHT;
const MULTI_CENTER_CARD_IMAGE_HEIGHT = multiCenterConfig.CARD_IMAGE_HEIGHT;
const MULTI_CENTER_CARD_MARGIN = multiCenterConfig.CARD_MARGIN;
const bannerWidth = width;
const bannerHeight = bannerWidth * 0.6;
const MALDIVES_SLIDER_WIDTH = width * 0.95; 
const MALDIVES_SLIDER_HEIGHT = destinationConfig.HEIGHT * 0.8; 
const SLIDER_IMAGE_BORDER_RADIUS = destinationConfig.BORDER_RADIUS;
function stripHtmlTags(html) {
  return html?.replace(/<[^>]*>?/gm, '') || '';
}
export default function MaldivesPackages({ navigation, route }) {
  const carouselRef = useRef(null); 
  const { destinationId} = route.params;
  const dispatch = useDispatch();
  const [maldivesSliderIndex, setMaldivesSliderIndex] = useState(0); 
  const maldivesFlatListRef = useRef(null); 
  const timerRef = useRef(null); 
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [destination, setDestination] = useState([]);
  const [thingsTodos, setThingsTodos] = useState([]);
  const [foodsTodos, setFoodsTodos] = useState([]);
  const [famousPlaces, setFamousPlaces] = useState([]);
  const famousPlacesCarouselRef = useRef(null); // New ref for the famous places carousel
  const [famousPlacesCarouselIndex, setFamousPlacesCarouselIndex] = useState(0); 
  const [expanded, setExpanded] = useState(false);
    const [expandedThings, setExpandedThings] = useState(false);
 
  useEffect(() => {
    dispatch(fetchSingleDestination(destinationId));
    dispatch(fetchMultiCenterDeals());
    dispatch(fetchMaldivesSliders());
  }, [dispatch, destinationId]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const singleDestination = useSelector((state) => state.destination.singleDestination);
  const destination_status = useSelector((state) => state.destination.status);
  const maldivesSliders = useSelector(selectMaldivesSliders);
  const isLoading = destination_status === 'succeeded' ;
  useEffect(() => {
    console.log(isLoading, 'isLoading2');
    setDestination(null);
    if (isLoading) {
      setDestination(singleDestination?.data);
      setThingsTodos(singleDestination?.data?.things_todos);
      setFoodsTodos(singleDestination?.data?.foods);
      setFamousPlaces(singleDestination?.data?.places);
      setIsDataLoaded(true);
    }
  }, [singleDestination,maldivesSliders, isLoading]);
  useEffect(() => {
    if (maldivesSliders.length > 1) {
      timerRef.current = setInterval(() => {
        setMaldivesSliderIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % maldivesSliders.length;
          return nextIndex;
        });
      }, AUTO_SCROLL_INTERVALS.DESTINATION); // Use standardized interval
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [maldivesSliders]); 
  const multiCenterDealsStatus = useSelector(selectMultiCenterDealsStatus);
  const multiCenterDeals = useSelector(selectMultiCenterDeals);
  const [visibleMultiCenterDealCount, setVisibleMultiCenterDealCount] =
  useState(4);
  const handleLoadMoreMultiCenterDeals = () => {
    setVisibleMultiCenterDealCount((prevCount) => prevCount + 4);
  };
const thingsToDoCarouselRef = useRef(null);
const [thingsToDoCarouselIndex, setThingsToDoCarouselIndex] = useState(0);
const thingsToDoCarouselProgress = useSharedValue(0);
 const foodsTodosFlatListRef = useRef(null);
const [currentFoodsToDoSlideIndex, setCurrentFoodsToDoSlideIndex] = useState(0); // New state for foods slider
  const [scrollPosition, setScrollPosition] = useState(0);
  const [contentHeight, setContentHeight] = useState(1);
  const [containerHeight, setContainerHeight] = useState(1);
  const thumbHeight = Math.max(
    (containerHeight / contentHeight) * containerHeight,
    30,
  );
  const maxThumbPosition = containerHeight - thumbHeight;
  const thumbPosition = Math.min(
    (scrollPosition / (contentHeight - containerHeight)) * maxThumbPosition ||
    0,
    maxThumbPosition,
  );
  
  const renderMaldivesSliderItem = useCallback(({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => item.title ? Linking.openURL(item.title) : null}
      style={styles.maldivesSliderCard}>
      <FastImage
        source={{
          uri: item.large || item.image || 'https://via.placeholder.com/400x200?text=No+Image',
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.immutable,
        }}
        style={styles.maldivesSliderImage}
        resizeMode={FastImage.resizeMode.cover}
      />
    </TouchableOpacity>
  ), []);
// Utility to strip HTML tags
const stripHtml = (html) => {
  return html.replace(/<[^>]+>/g, '');
};
const toggleThingsExpanded = (index) => {
  setExpandedThings((prev) => ({
    ...prev,
    [index]: !prev[index], // toggle only the clicked one
  }));
};
const renderThingsToDoItem = ({ item, index }) => {
  const htmlContent = item.description || item.details || '';
  const plainText = stripHtml(htmlContent); // plain text only
  const isExpanded = expandedThings[index] || false;
  const maxLength = 120;

  const truncatedText = plainText.length > maxLength
    ? plainText.substring(0, maxLength).trimEnd() + '... '
    : plainText;

  return (
    <View style={[styles.slideItemThings, { minHeight: isExpanded ? undefined : 300 }]}>
      <Image
        source={{ uri: item.image || 'https://via.placeholder.com/400x200?text=No+Image' }}
        style={styles.sliderImage}
      />
      <View style={styles.sliderContentCard}>
        <Text style={styles.sliderTitle}>{item.title}</Text>

        {isExpanded ? (
          <RenderHTML
            contentWidth={width - 40}
            source={{ html: htmlContent }}
          />
        ) : (
          <Text style={styles.descriptionText}>
            {truncatedText}
            {plainText.length > maxLength && (
              <Text style={styles.readMoreBtn} onPress={() => toggleThingsExpanded(index)}>
                Read More
              </Text>
            )}
          </Text>
        )}

        {isExpanded && (
          <TouchableOpacity onPress={() => toggleThingsExpanded(index)}>
            <Text style={[styles.readMoreBtn, { marginTop: 4 }]}>Read Less</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
  const CARD_PEEK_HEIGHT = 300; 
const CARD_CENTER_HEIGHT = 400; 
  const progress = useSharedValue(0);
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
    h2: { 
    color: colors.darkGray,
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 10,
     marginTop: 10,
    textAlign: 'center', 
    alignSelf:"center",
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
const renderFamousPlacesItem = ({ item }) => {
  
  const plainText = stripHtmlTags(item.details || '');
  const shortHtml = `<p>${plainText.substring(0, 120)}${plainText.length > 120 ? '...' : ''}</p>`;

  return (
    <View style={styles.cardPlaces}>
      <Image
        source={{ uri: item.image || 'https://via.placeholder.com/400x200?text=No+Image' }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>

        <RenderHTML
          contentWidth={width - 40}
          source={{ html: expanded ? item.details || '' : shortHtml }}
        />

        {plainText.length > 120 && (
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text style={styles.readMoreBtn}>
              {expanded ? 'Read Less' : 'Read More'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
 return (
  <View style={styles.container}>
      {/* <Header title={`${destination?.name || ''} Packages`} showNotification={true} navigation={navigation} /> */}
  <Header
  title={`${destination?.name || ''} Packages`}
  showNotification={true}
  navigation={navigation}
/>
      {isDataLoaded && destination ? (
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
       {/* Maldives Slider Section - Now using the new Carousel library */}
         <View style={styles.fixedSliderContainer}>
              <Carousel
                loop
                width={MALDIVES_SLIDER_WIDTH}
                height={MALDIVES_SLIDER_HEIGHT}
                autoPlay={true}
                data={maldivesSliders}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => setMaldivesSliderIndex(index)}
                renderItem={renderMaldivesSliderItem}
              />
              {/* Pagination Dots - re-added for visual consistency */}
              {maldivesSliders.length > 1 && (
                <View style={styles.paginationContainer}>
                  {maldivesSliders.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.paginationDot,
                        index === maldivesSliderIndex && styles.paginationDotActive
                      ]}
                    />
                  ))}
                </View>
              )}
          </View>
       <View style={styles.sectionWithSearchMarginSafari}>
            <View style={styles.customCardContainer}>
              {/* USE the new component here */}
              <ScrollableHtmlContent htmlContent={destination?.top_desc + destination?.top_head} />
            </View>
          </View>
        {/* Multi-Center Deals Section */}
        <View style={styles.multiCenterDealsSection}>
        <FlatList
              data={multiCenterDeals?.slice(0, visibleMultiCenterDealCount)}
              keyExtractor={(item, index) => item.id?.toString() || index.toString()}
              numColumns={2}
              columnWrapperStyle={styles.multiCenterColumnWrapper}
              contentContainerStyle={styles.multiCenterContentContainer}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              initialNumToRender={4}
              maxToRenderPerBatch={4}
              windowSize={5}
              removeClippedSubviews={true}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.cardMulti}
                onPress={() => navigation.navigate('PakageDetails', { packageSlug: item.slug })}>
                                      <ImageBackground
                    source={{ uri: item.main_image || 'https://via.placeholder.com/300x200?text=No+Image' }}
                    style={styles.cardImageCard}
                    imageStyle={styles.imageStyle}>
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
           
          
        </View>
        {/* Basics You Must Know Section */}
        <View style={styles.basicsContainer}>
          <Text style={styles.basicsMainTitle}>Basics You Must Know</Text>
          <Text style={styles.basicsMainDescription}>
            For a seamless voyage, learn about these basics before you embark on your {destination?.name} luxury holiday.
          </Text>
          {/* First Row: One Card (Local Time) - Changed to show Flag for Local Time */}
          <View style={styles.infoCardRowSingle}>
            <View style={styles.infoCard}>
              <View style={[styles.timeCurrencyIcon, { backgroundColor: colors.red }]}>
                <RedFlag width={40} height={40} />
              </View>
              <Text style={styles.infoCardValue}>Language</Text>
              <Text style={styles.infoCardLabel}>
                {destination?.local_time ? `UTC +${destination.local_time}hrs` : 'N/A'}
              </Text>
            </View>
          </View>

          {/* Second Row: Two Cards (Currency and Language) */}
          <View style={styles.infoCardRowDouble}>
            {/* Currency Card */}
            <View style={[styles.infoCard,{alignSelf:"center",marginRight:60}]}>
              <View style={[styles.timeCurrencyIcon, { backgroundColor: '#C28D3E' }]}>
                <Currencygold width={40} height={40} />
              </View>
              <Text style={styles.infoCardValue}>Local Time</Text>
              <Text style={styles.infoCardLabel}>{destination?.currency || 'N/A'}</Text>
            </View>
            {/* Language Card */}
            <View style={styles.infoCard}>
              <View style={[styles.timeCurrencyIcon, { backgroundColor: '#C28D3E' }]}>
                <Text style={{ color: "white", fontWeight: "600" }}>+5 hrs</Text>
              </View>
              <Text style={styles.infoCardValue}>Currency</Text>
              <Text style={styles.infoCardLabel}>{destination?.language || 'N/A'}</Text>
            </View>
          </View>
        </View>
        {/* Horizontal Image Slider Section - Things To Do */}
        <View style={styles.sliderSection}>
       <RenderHtml
       contentWidth={width}
       source={{
       html: `<h2 style="text-align: center;">📍Things To Do in ${destination?.name || ''}</h2>`,
        }}
       tagsStyles={baseTagStyles}
        />
        <View>
       <Carousel
        ref={thingsToDoCarouselRef}
        data={thingsTodos}
        loop={false}
        width={width}  // Adjust this width as needed for your design
        height={400}
        maxHeight={430} // Set a fixed height for the carousel
        scrollAnimationDuration={500}
        onProgressChange={thingsToDoCarouselProgress}
        onSnapToItem={(index) => setThingsToDoCarouselIndex(index)}
        renderItem={({ item }) => renderThingsToDoItem({ item })}
        style={styles.carouselContainer}
/>
        <View/>  
       
          {/* Slider Navigation Arrows */}
       <TouchableOpacity
    style={styles.leftArrowThingsToDo}
    onPress={() => thingsToDoCarouselRef.current?.prev()}
    disabled={thingsToDoCarouselIndex === 0}>
    <LeftIcon width={25} height={25} />
</TouchableOpacity>
<TouchableOpacity
    style={styles.rightArrowThingsToDo}
    onPress={() => thingsToDoCarouselRef.current?.next()}
    disabled={thingsToDoCarouselIndex === thingsTodos?.length - 1}
>
    <RightIcon width={25} height={25} />
</TouchableOpacity>
        </View>
     </View>
        {/* Famous places Section */}
         <View style={styles.sliderSection}>    
  {singleDestination?.data?.famous_places_content && (
  <RenderHtml
    contentWidth={width - 40}
    source={{
      html: `<h2>📍${
        singleDestination.data.famous_places_content.match(/<h2>(.*?)<\/h2>/)?.[1] || ''
      }</h2>`,
    }}
    tagsStyles={baseTagStyles}
  />
)}
            <Carousel
             autoPlay={false}
              autoPlayReverse={false}
              vertical={false}
                ref={famousPlacesCarouselRef}
                autoPlayInterval={2000}
                loop={true}
                data={famousPlaces}
                height={400}
                width={width}
                pagingEnabled={true}
                snapEnabled={true}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50,
                }}
                onProgressChange={progress}
                onSnapToItem={(index) => setFamousPlacesCarouselIndex(index)}
                renderItem={renderFamousPlacesItem}
            />
       
          </View> 
        {/* Horizontal Image Foodsa Slider Section - Things To Do */}
    {/* Foods Slider Section */}
    <View style={styles.sliderSection}>
  <RenderHtml
    contentWidth={width}
    source={{
      html: `<h2 style="text-align: center;">📍Foods To Try in ${destination?.name || ''}</h2>`,
    }}
    tagsStyles={baseTagStyles}
  />
  <View>
    <Carousel
      ref={foodsTodosFlatListRef}
      data={foodsTodos}
      loop={false}
      width={width}
      height={358}
      scrollAnimationDuration={500}
      onProgressChange={thingsToDoCarouselProgress}
      onSnapToItem={(index) => setCurrentFoodsToDoSlideIndex(index)}
      renderItem={({ item }) => renderThingsToDoItem({ item })}
      style={styles.carouselContainer}
    />
    <TouchableOpacity
      style={styles.leftArrowFoods}
      onPress={() => foodsTodosFlatListRef.current?.prev()}
      disabled={currentFoodsToDoSlideIndex === 0}
    >
      <LeftIcon width={25} height={25} />
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.rightArrowFoods}
      onPress={() => foodsTodosFlatListRef.current?.next()}
      disabled={currentFoodsToDoSlideIndex === foodsTodos?.length - 1}
    >
      <RightIcon width={25} height={25} />
    </TouchableOpacity>
  </View>
    </View>     
     <View style={styles.sectionWithSearchMarginSafari}>
            <View style={styles.customCardContainer}>
              {/* USE the new component here */}
              <ScrollableHtmlContent htmlContent={destination?.top_desc + destination?.top_head} />
            </View>
          </View>
      </ScrollView>
      ) : (
        <View style={{height:'100%', padding:10}}>
          <SkeletonPlaceholder borderRadius={10}>
            <SkeletonPlaceholder.Item
              width={MALDIVES_SLIDER_WIDTH}
              height={MALDIVES_SLIDER_HEIGHT}
              borderRadius={SLIDER_IMAGE_BORDER_RADIUS}
              
            />
          </SkeletonPlaceholder>
          <SkeletonPlaceholder borderRadius={10} marginTop={10} >
            <SkeletonPlaceholder.Item
              width="100%"
              height={50}
              borderRadius={10}
              alignSelf="center"
              marginTop={10}
            />
          </SkeletonPlaceholder>
          <SkeletonPlaceholder borderRadius={10} marginTop={10} >
            <SkeletonPlaceholder.Item
              width="100%"
              height={150}
              borderRadius={10}
              alignSelf="center"
              marginTop={10}
            />
          </SkeletonPlaceholder>
         <SkeletonPlaceholder  marginTop={10} >
            <SkeletonPlaceholder.Item
              flexDirection="row"
              flexWrap="wrap"
              justifyContent="space-between"
              gap={5}
            >
            {Array.from({ length: 4 }, (_, index) => (
             
              <SkeletonPlaceholder.Item
                key={index}
                width="49%"
                height={200}
                borderRadius={10}
                marginTop={10}
              />
            ))}
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      )}
      {/* Bottom Fixed Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={[styles.blueButton, { backgroundColor: colors.green }]} onPress={() => navigation.navigate('SubmitEnquiry')}>
          <Getqoute width={20} height={20} />
          <Text style={styles.buttonText}>Get A Quote</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.blueButton}
          onPress={() => Linking.openURL('tel:02080382020')}>
          <PhoneS width={20} height={20} />
          <Text style={styles.buttonText}>020 8038 2020</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  sectionWithSearchMarginSafari: {
    paddingHorizontal: 25, 
  },
  headingPlaces: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    textAlign: "center",
    marginTop: 10,
    marginBottom:5,
  },
  bannerImgSafari: {
    marginTop: 1,
    marginBottom: 10,
    borderRadius: 10,
  },
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  descriptionText: {
  fontSize: 14,
  color: '#444',           
  lineHeight: 20,          
  marginTop: 8,
},
  fixedSliderContainer: {
    marginTop: 10,
    alignSelf: 'center',
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    height: MALDIVES_SLIDER_HEIGHT,
    borderRadius: SLIDER_IMAGE_BORDER_RADIUS,
    position: 'relative',
  },
  fixedSliderImage: {
    width: '100%',
    height: '100%',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: PAGINATION_STYLES.DOT_SIZE,
    height: PAGINATION_STYLES.DOT_SIZE,
    borderRadius: PAGINATION_STYLES.DOT_SIZE / 2,
    backgroundColor: PAGINATION_STYLES.DOT_COLOR,
    marginHorizontal: PAGINATION_STYLES.DOT_MARGIN,
  },
  paginationDotActive: {
    backgroundColor: PAGINATION_STYLES.ACTIVE_DOT_COLOR,
    width: PAGINATION_STYLES.ACTIVE_DOT_SIZE,
    height: PAGINATION_STYLES.ACTIVE_DOT_SIZE,
    borderRadius: PAGINATION_STYLES.ACTIVE_DOT_SIZE / 2,
  },

  maldivesSliderCard: {
    width: MALDIVES_SLIDER_WIDTH,
    height: MALDIVES_SLIDER_HEIGHT,
    borderRadius: SLIDER_IMAGE_BORDER_RADIUS,

    overflow: 'hidden', 
  },
  maldivesSliderImage: {
    width: '100%',
    height: '100%',
    objectFit: 'fill'
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

  scrollableThingsDescriptionWrapper: {
    flexDirection: 'row',
    // height: 300,
    alignSelf: 'center',
    width: '100%',
    padding: 10
  },
  scrollableDescriptionWrapper: {
    flexDirection: 'row',
    height: 300,
    alignSelf: 'center',
    width: '100%',
    padding: 10
  },
  
  customScrollArea: {
    flex: 1,
    padding: 0,
  },
   customScrollAreaThings: {
    flexGrow: 1,
    padding: 0,
  },
  customCardDescription: {
    color: colors.mediumGray,
    fontSize: 14,
  },
  Boldstylee:{
     color: colors.mediumGray,
    fontSize: 14,
    lineHeight: 20,
  },
  lightcontext: {
    textAlign: 'center'
  },
  customScrollbarTrack: {
    width: 4,
    height: '100%',
    backgroundColor: '#f5f6fa',
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  customScrollbarThumb: {
    width: 4,
    height:"100%",
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
    packagesListTitleTop: {
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
    marginTop: 10,
  },
  packagesListsubtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.gray,
    marginBottom: 5,
    textAlign: 'center',
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  multiCenterDealsSection: {
    paddingBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  multiCenterContentContainer: {
    paddingHorizontal: (width - (2 * MULTI_CENTER_CARD_WIDTH + MULTI_CENTER_CARD_MARGIN)) / 2,
    paddingTop: 10,
    width: '100%',
  },
  
  multiCenterColumnWrapper: {
    justifyContent: 'space-between',
    marginBottom: MULTI_CENTER_CARD_MARGIN, 
  },
  cardMulti: {
    width: MULTI_CENTER_CARD_WIDTH,
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
    marginRight:8
  },
  card: {
    width: MULTI_CENTER_CARD_WIDTH,
    height: MULTI_CENTER_CARD_HEIGHT,
    marginBottom: MULTI_CENTER_CARD_MARGIN,
    marginHorizontal: MULTI_CENTER_CARD_MARGIN / 2,
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
  cardImageCard: {
    width: '100%',
    height: MULTI_CENTER_CARD_IMAGE_HEIGHT,
    alignContent: "center",
    alignSelf: 'center'
  },
  imageStyle: {
    borderRadius: 10,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
    flex: 1,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    position: "absolute",
    bottom: 3,
    marginHorizontal: 3
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
    marginTop: 5,
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
    paddingHorizontal: 15, 
    padding: 16, 
    borderRadius: 12,
  },
  basicsMainTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: colors.darkGray,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: '#C28D3E1F',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 0,
  },
  basicsMainDescription: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 16,
  },
  infoCardRowSingle: {
    width: '100%',
    paddingHorizontal: 15,
    marginVertical: 10,
  justifyContent:"center",
  alignItems:'center',
  alignContent:"center"
  },
  infoCardRowDouble: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 5,
    width:124,
    textAlign:'center' 
  },
  timeCurrencyIcon: {
    width: 50,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  infoCardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGray,
  },
  infoCardLabel: {
    fontSize: 12,
    color: colors.gray,
    textAlign:'center'
  },
  sliderSection: {
    // marginTop: 20,
    // marginBottom: 10,
    // marginRight:10
  },
  slideItem: {
    width: windowWidth - 40,
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  sliderImage: {
    width: '100%',
    height: thingsToDoConfig.HEIGHT * 0.65, 
    resizeMode: 'cover',
    // marginLeft:50
  },
  sliderContentCard: {
    padding: 15,
     flex: 1,

  },
  sliderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  sliderDescription: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 5,
  },
  horizontalSliderContent: {
    paddingHorizontal: 20, 
    paddingBottom: 20,
    gap: 10, // Space between items
  },
  leftArrowThingsToDo: {
position: 'absolute',
    left: 8,
    top: '30%',
    transform: [{ translateY: -25 }],
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  rightArrowThingsToDo: {
    position: 'absolute',
    right: 8,
    top: '30%',
    transform: [{ translateY: -25 }],
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
    customCardTitleHeading: {
    color: colors.darkGray,
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
    marginTop: 20,
  },
  leftArrowFoods: {
    position: 'absolute',
    left: 5,
    top: '50%',
    transform: [{ translateY: -25 }],
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  rightArrowFoods: {
    position: 'absolute',
    right: 5,
    top: '50%',
    transform: [{ translateY: -25 }],
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  
  cardPlaces: {
    height: 380, 
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
    gap:10
  },
  image: {
    width: '100%',
    height: 180, 
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    padding: 10,
  height:250
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGray,
    marginBottom: 5,
    textAlign: 'center',
  },
  descriptionScroll: {
    maxHeight: 150,
    marginTop: 5,
  },
  description: {
    fontSize: 13,
    color: colors.gray,
    lineHeight: 18,
    textAlign: 'center',
  },
  famousPlacesContentContainer: {
    paddingHorizontal: ITEM_SPACING, 
    paddingBottom: 20,
  },
 bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 12,
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    left: 0, 
    right: 0, 
    alignSelf: 'center',
    paddingVertical: 15,
    borderTopWidth: 1, 
    borderTopColor: colors.lightGray,
    elevation: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
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
  customCardContainerContent: {
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginVertical: 10,
    width: bannerWidth,
    alignSelf: 'center',
  },
    carouselContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding:10,
    },
 slideItemThings: {
  marginBottom:10,
   flex: 1,
        width: '95%', 
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 10, 
        overflow: 'hidden',
       elevation: 2,
    },
    readMoreBtn: {
  color: colors.green,
  marginTop: 5,
  fontWeight: '600',
},

});

















