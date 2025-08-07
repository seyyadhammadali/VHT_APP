
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
import { DrawerActions } from '@react-navigation/native';
import { navigationRef } from '../navigation/navigationRef'; // Adjust path as needed
import FastImage from 'react-native-fast-image';
import PhoneS from '../assets/images/PhoneS.svg';
import Getqoute from '../assets/images/getQoute.svg';
import Header from '../components/Header';
import { fetchSingleDestination } from '../redux/slices/destinationsSlice';
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
import RenderHtml from 'react-native-render-html';
// Import the new thunk and selector for Maldives sliders
import { fetchMaldivesSliders, selectMaldivesSliders } from '../redux/slices/sliderSlice';
import { SLIDER_CONFIG, AUTO_SCROLL_INTERVALS, PAGINATION_STYLES, getResponsiveDimensions } from '../constants/sliderConfig';

const { width } = Dimensions.get('window');

// Get responsive dimensions for all slider types
const destinationConfig = getResponsiveDimensions('DESTINATION');
const thingsToDoConfig = getResponsiveDimensions('THINGS_TO_DO');
const famousPlacesConfig = getResponsiveDimensions('FAMOUS_PLACES');
const multiCenterConfig = getResponsiveDimensions('MULTI_CENTER_GRID');

// Famous Places Slider Constants
const ITEM_WIDTH = famousPlacesConfig.WIDTH;
const ITEM_SPACING = (width - ITEM_WIDTH) / 2;
const CARD_MARGIN_RIGHT_FAMOUS_PLACES = famousPlacesConfig.MARGIN_RIGHT;

// Multi-Center Deals Section Constants
const MULTI_CENTER_CARD_WIDTH = multiCenterConfig.CARD_WIDTH;
const MULTI_CENTER_CARD_HEIGHT = multiCenterConfig.CARD_HEIGHT;
const MULTI_CENTER_CARD_IMAGE_HEIGHT = multiCenterConfig.CARD_IMAGE_HEIGHT;
const MULTI_CENTER_CARD_MARGIN = multiCenterConfig.CARD_MARGIN;

const bannerWidth = width * 0.9;
const bannerHeight = bannerWidth * 0.6;
// Maldives Slider Constants (New)
const MALDIVES_SLIDER_WIDTH = destinationConfig.WIDTH * 0.95; // Example reduction
const MALDIVES_SLIDER_HEIGHT = destinationConfig.HEIGHT * 0.8; // Example reduction
const SLIDER_IMAGE_BORDER_RADIUS = destinationConfig.BORDER_RADIUS;

function stripHtmlTags(html) {
  return html?.replace(/<[^>]*>?/gm, '') || '';
}

const renderHtmlContent = (htmlContent) => {
  if (!htmlContent) return null;

  const sections = htmlContent.split(/(<h2>.*?<\/h2>|<h3>.*?<\/h3>|<p>.*?<\/p>|<li>.*?<\/li>)/gs);

  return sections.map((section, index) => {
    if (!section.trim()) return null;

    if (section.startsWith('<h2>') && section.endsWith('</h2>')) {
      return (
        <Text key={index} style={styles.contentHeading2}>
          {stripHtmlTags(section)}
        </Text>
      );
    }
    if (section.startsWith('<h3>') && section.endsWith('</h3>')) {
      return (
        <Text key={index} style={styles.contentHeading3}>
          {stripHtmlTags(section)}
        </Text>
      );
    }
    if (section.startsWith('<p>') && section.endsWith('</p>')) {
      const linkMatch = section.match(/<a href="(.*?)">(.*?)<\/a>/);
      if (linkMatch) {
        const fullText = stripHtmlTags(section);
        const linkText = stripHtmlTags(linkMatch[2]);
        const beforeLink = fullText.substring(0, fullText.indexOf(linkText));
        const afterLink = fullText.substring(fullText.indexOf(linkText) + linkText.length);
        const url = linkMatch[1];

        return (
          <Text key={index} style={styles.contentParagraph}>
            {beforeLink}
            <Text style={styles.contentLink} onPress={() => Linking.openURL(url)}>
              {linkText}
            </Text>
            {afterLink}
          </Text>
        );
      }
      return (
        <Text key={index} style={styles.contentParagraph}>
          {stripHtmlTags(section)}
        </Text>
      );
    }
    if (section.startsWith('<li>') && section.endsWith('</li>')) {
      return (
        <View key={index} style={styles.contentListItem}>
          <Text style={styles.contentListBullet}>• </Text>
          <Text style={styles.contentParagraph}>
            {stripHtmlTags(section)}
          </Text>
        </View>
      );
    }
    return (
      <Text key={index} style={styles.contentParagraph}>
        {stripHtmlTags(section)}
      </Text>
    );
  });
};

export default function MaldivesPackages({ navigation, route }) {
   const carouselRef = useRef(null); 
  const { destinationId} = route.params;
  const dispatch = useDispatch();
  const [maldivesSliderIndex, setMaldivesSliderIndex] = useState(0); // New state for Maldives slider
  const maldivesFlatListRef = useRef(null); // New ref for Maldives FlatList
  const timerRef = useRef(null); // Ref for the auto-scroll timer

  // NEW STATE: Track if destination data has been loaded
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchSingleDestination(destinationId));
    dispatch(fetchMultiCenterDeals());
    dispatch(fetchMaldivesSliders());
  }, [dispatch, destinationId]);

  // NEW useEffect to update isDataLoaded
  useEffect(() => {
    if (!singleDestinationLoading && singleDestination?.data) {
      setIsDataLoaded(true);
    }
  }, [singleDestinationLoading, singleDestination]);


  // New useEffect for the auto-scrolling
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
  }, [maldivesSliders]); // Rerun when slider data changes

  // Handler for manual image change (optional - can be used for touch events)
  const handleManualImageChange = () => {
    setMaldivesSliderIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % maldivesSliders.length;
      return nextIndex;
    });
    // Reset the timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setMaldivesSliderIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % maldivesSliders.length;
          return nextIndex;
        });
      }, AUTO_SCROLL_INTERVALS.DESTINATION);
    }
  };


  const scrollX = useRef(new Animated.Value(0)).current;
  const singleDestination = useSelector(
    (state) => state.destination.singleDestination,
  );
  const singleDestinationLoading = useSelector(
    (state) => state.destination.loading,
  );
  const singleDestinationError = useSelector(
    (state) => state.destination.error,
  );


  const multiCenterDealsStatus = useSelector(selectMultiCenterDealsStatus);
  // New state and selector for Maldives sliders
  const maldivesSliders = useSelector(selectMaldivesSliders);


  const multiCenterDeals = useSelector(selectMultiCenterDeals);
  const [visibleMultiCenterDealCount, setVisibleMultiCenterDealCount] =
    useState(4);
  const handleLoadMoreMultiCenterDeals = () => {
    setVisibleMultiCenterDealCount((prevCount) => prevCount + 4);
  };

  const thingsTodosFlatListRef = useRef(null); // Renamed for clarity
  const [currentThingsToDoSlideIndex, setCurrentThingsToDoSlideIndex] = useState(0); // Renamed for clarity
  const foodsTodosFlatListRef = useRef(null); // New ref for foods FlatList
  const [currentFoodsToDoSlideIndex, setCurrentFoodsToDoSlideIndex] = useState(0); // New state for foods slider

  const destination = singleDestination?.data;
  const thingsTodos = singleDestination?.data?.things_todos;
  const foodsTodos = singleDestination?.data?.foods;
  const famousPlaces = singleDestination?.data?.places || [];

  const handleThingsToDoScrollEnd = (event) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / (width - 40));
    setCurrentThingsToDoSlideIndex(newIndex);
  };

  const scrollThingsToDoToIndex = (index) => {
    if (thingsTodosFlatListRef.current && index >= 0 && index < thingsTodos.length) {
      thingsTodosFlatListRef.current.scrollToIndex({ index, animated: true });
      setCurrentThingsToDoSlideIndex(index);
    }
  };

  const handleFoodsToDoScrollEnd = (event) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / (width - 40));
    setCurrentFoodsToDoSlideIndex(newIndex);
  };

  const scrollFoodsToDoToIndex = (index) => {
    if (foodsTodosFlatListRef.current && index >= 0 && index < foodsTodos.length) {
      foodsTodosFlatListRef.current.scrollToIndex({ index, animated: true });
      setCurrentFoodsToDoSlideIndex(index);
    }
  };
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
  const tagsStyles = {
  h2: {
    color: 'blue !important',
  }
};

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
  const renderThingsToDoItem = ({ item }) => (
    <View style={styles.slideItemThings}>
      <Image source={{ uri: item.image || 'https://via.placeholder.com/400x200?text=No+Image' }} style={styles.sliderImage} />
      <View style={styles.sliderContentCard}>
        <Text style={styles.sliderTitle}>{item.title}</Text>
         <RenderHtml 
           contentWidth={width}
           source={{ html: item.description || item.details }}
          tagsStyles={{
           p: styles.customCardDescription,
           h2 :styles.customCardDescription
}}
                                    />
        
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title={`${destination?.name || ''} Pakages`} showNotification={true} navigation={navigation} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* Maldives Slider Section - Fixed Position with Auto-Change */}
       {/* Maldives Slider Section - Now using the new Carousel library */}
         <View style={styles.sliderContainer}>
           {maldivesSliders.length > 0 ? (
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
          ) : (
            <SkeletonPlaceholder borderRadius={10}>
              <SkeletonPlaceholder.Item
                width={MALDIVES_SLIDER_WIDTH}
                height={MALDIVES_SLIDER_HEIGHT}
                borderRadius={SLIDER_IMAGE_BORDER_RADIUS}
                alignSelf="center"
              />
            </SkeletonPlaceholder>
          )}
        </View>


         
        <View style={styles.sectionWithSearchMarginSafari}>
          {singleDestinationLoading ? (
            <SkeletonPlaceholder borderRadius={10}>
              <SkeletonPlaceholder.Item
                width={bannerWidth}
                height={bannerHeight}
                borderRadius={10}
                alignSelf="center"
              />
            </SkeletonPlaceholder>
          ) : singleDestination && singleDestination?.data?.banner ? (
            <>

              <View style={styles.customCardContainer}>
                    
                    {/* <Text style={styles.packagesListTitleTop}>
                      {stripHtmlTags(singleDestination.data.top_head.split('<h2>')[1]?.split('</h2>')[0]) || 'Best Holiday Destinations for You'}
                    </Text> */}
              <RenderHtml 
              tagsStyles={tagsStyles}
                contentWidth={width}
                source={{ html: singleDestination.data.top_head || '' }}
                
                // style={styles.packagesListTitleTop}
              //   tagsStyles={{
              //   p: styles.customCardDescription,
              //   h2 :styles.packagesListTitleTop,
              //   h1 :styles.packagesListTitleTop,
              //   h3 :styles.packagesListTitleTop,
              //   a:styles.customCardDescription,
              // }}
              /> 
                {/* CONDITIONAL RENDERING: Show the scrollable content only when data is loaded */}
                {isDataLoaded && (
             
                  
                  <View style={styles.scrollableDescriptionWrapper}>
                    <ScrollView
                      style={styles.customScrollArea}
                      nestedScrollEnabled={true}
                      showsVerticalScrollIndicator={false}
                      onContentSizeChange={(_, h) => setContentHeight(h)}
                      onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
                      onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.y)}
                      scrollEventThrottle={16}>
                      {renderHtmlContent(singleDestination?.data?.top_desc)}
                      {renderHtmlContent(singleDestination?.data?.top_head)}
                    </ScrollView>
                    {/* CONDITIONAL RENDERING: Show the custom thumb only when content is loaded */}
                    {contentHeight > containerHeight && (
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
                )}
                {/* Conditionally render the title and subtitle as well */}
                {isDataLoaded && (
                  <>
                    <Text style={styles.packagesListTitle}>
                      {stripHtmlTags(singleDestination.data.top_head.split('<h2>')[1]?.split('</h2>')[0]) || 'Best Holiday Destinations for You'}
                    </Text>
                    <Text style={styles.packagesListsubtitle}>
                      Scroll through luxury Holiday Packages 2025 deals handpicked by our UK travel
                      experts for you and your loved ones.
                    </Text>
                  </>
                )}
              </View>
            </>
          ) : (
            <Text style={{ color: colors.mediumGray, alignSelf: 'center' }}>
              No destination data found.
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
                }}>
                {[...Array(4)].map((_, index) => (
                  <View key={index} style={[styles.card, { backgroundColor: colors.lightGray, marginBottom: 15 }]} />
                ))}
              </View>
            </SkeletonPlaceholder>
          ) : (
            <>
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
            </>
          )}
        </View>
        {/* Basics You Must Know Section */}
        <View style={styles.basicsContainer}>
          <Text style={styles.basicsMainTitle}>Basics You Must Know</Text>
          <Text style={styles.basicsMainDescription}>
            For a seamless voyage, learn about these basics before you embark on your Maldives luxury holiday.
          </Text>
          {/* First Row: One Card (Local Time) - Changed to show Flag for Local Time */}
          <View style={styles.infoCardRowSingle}>
            <View style={styles.infoCard}>
              <View style={[styles.timeCurrencyIcon, { backgroundColor: colors.red }]}>
                <RedFlag width={40} height={40} />
              </View>
              <Text style={styles.infoCardValue}>Language</Text>
              <Text style={styles.infoCardLabel}>
                {singleDestination?.data?.local_time ? `UTC +${singleDestination.data.local_time}hrs` : 'N/A'}
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
              <Text style={styles.infoCardLabel}>{singleDestination?.data?.currency || 'N/A'}</Text>
            </View>
            {/* Language Card */}
            <View style={styles.infoCard}>
              <View style={[styles.timeCurrencyIcon, { backgroundColor: '#C28D3E' }]}>
                <Text style={{ color: "white", fontWeight: "600" }}>+5 hrs</Text>
              </View>
              <Text style={styles.infoCardValue}>Currency</Text>
              <Text style={styles.infoCardLabel}>{singleDestination?.data?.language || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Horizontal Image Slider Section - Things To Do */}
        <View style={styles.sliderSection}>
          <Text style={styles.headingPlaces}>📍Things To Do in {destination?.name || ''}</Text>
          <FlatList
            ref={thingsTodosFlatListRef}
            data={thingsTodos}
            keyExtractor={(item) => item.id?.toString()}
            renderItem={renderThingsToDoItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleThingsToDoScrollEnd}
            contentContainerStyle={styles.horizontalSliderContent}
          />
          {/* Slider Navigation Arrows */}
          <TouchableOpacity
            style={styles.leftArrowThingsToDo}
            onPress={() => scrollThingsToDoToIndex(currentThingsToDoSlideIndex - 1)}
            disabled={currentThingsToDoSlideIndex === 0}>
            <LeftIcon width={25} height={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rightArrowThingsToDo}
            onPress={() => scrollThingsToDoToIndex(currentThingsToDoSlideIndex + 1)}
            disabled={currentThingsToDoSlideIndex === thingsTodos?.length - 1}
          >
            <RightIcon width={25} height={25} />
          </TouchableOpacity>
        </View>

        {/* Famous places Section */}
        <View>
          <Text style={styles.headingPlaces}>📍{stripHtmlTags(singleDestination?.data?.famous_places_content)}</Text>

          <Animated.FlatList
            data={famousPlaces}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToAlignment="center"
            snapToInterval={ITEM_WIDTH + CARD_MARGIN_RIGHT_FAMOUS_PLACES}
            decelerationRate="fast"
            // This is the key for centering the Famous Places cards
            contentContainerStyle={styles.famousPlacesContentContainer}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 1) * (ITEM_WIDTH + CARD_MARGIN_RIGHT_FAMOUS_PLACES),
                index * (ITEM_WIDTH + CARD_MARGIN_RIGHT_FAMOUS_PLACES),
                (index + 1) * (ITEM_WIDTH + CARD_MARGIN_RIGHT_FAMOUS_PLACES),
              ];

              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.9, 1, 0.9],
                extrapolate: 'clamp',
              });

              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.6, 1, 0.6],
                extrapolate: 'clamp',
              });

              return (
                                 <Animated.View style={[
                   styles.cardPlaces,
                   {
                     width: ITEM_WIDTH,
                     marginRight: CARD_MARGIN_RIGHT_FAMOUS_PLACES,
                     transform: [{ scale }],
                     opacity
                   }
                 ]}>
                   <Image source={{ uri: item.image || 'https://via.placeholder.com/400x200?text=No+Image' }} style={styles.image} />
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <ScrollView showsVerticalScrollIndicator style={styles.descriptionScroll}>
                      <Text style={styles.description}>
                        {stripHtmlTags(item.details)}</Text>
                    </ScrollView>
                  </View>
                </Animated.View>
              );
            }}
          />
        </View>

        {/* Horizontal Image Foodsa Slider Section - Things To Do */}
        <View style={styles.sliderSection}>
          <Text style={styles.customCardTitleHeading}>
            {stripHtmlTags(singleDestination?.data?.delicious_food_content?.split('<h2>')[1]?.split('</h2>')[0]) || 'Delicious Foods'}
          </Text>
          <FlatList
            ref={foodsTodosFlatListRef} // Using the new ref for foods
            data={foodsTodos}
            keyExtractor={(item) => item.id?.toString()}
            renderItem={renderThingsToDoItem} // Reusing render item as it works for both
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleFoodsToDoScrollEnd} // Using new handler for foods
            contentContainerStyle={styles.horizontalSliderContent}
          />
          {/* Slider Navigation Arrows */}
          <TouchableOpacity
            style={styles.leftArrowFoods} // Applying new style for foods slider
            onPress={() => scrollFoodsToDoToIndex(currentFoodsToDoSlideIndex - 1)}
            disabled={currentFoodsToDoSlideIndex === 0}>
            <LeftIcon width={25} height={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rightArrowFoods} // Applying new style for foods slider
            onPress={() => scrollFoodsToDoToIndex(currentFoodsToDoSlideIndex + 1)}
            disabled={currentFoodsToDoSlideIndex === foodsTodos?.length - 1}
          >
            <RightIcon width={25} height={25} />
          </TouchableOpacity>
        </View>

        <View style={styles.customCardContainerContent}>
          {/* CONDITIONAL RENDERING: Show the scrollable content only when data is loaded */}
          {isDataLoaded && (
            <View style={styles.scrollableDescriptionWrapper}>
              <ScrollView
                style={styles.customScrollArea}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                onContentSizeChange={(_, h) => setContentHeight(h)}
                onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
                onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.y)}
                scrollEventThrottle={16}>
                <Text>
                  <Text style={styles.lightcontext}>📍 {renderHtmlContent(singleDestination?.data?.things_todo_content)}</Text>
                </Text>
              </ScrollView>
              {/* CONDITIONAL RENDERING: Show the custom thumb only when content is loaded and scrollable */}
              {contentHeight > containerHeight && (
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
          )}
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
    paddingHorizontal: 25, // Uniform padding for main sections
    // alignSelf: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
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
  fixedSliderContainer: {
    width: MALDIVES_SLIDER_WIDTH,
    height: MALDIVES_SLIDER_HEIGHT,
    borderRadius: SLIDER_IMAGE_BORDER_RADIUS,
    overflow: 'hidden',
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

    overflow: 'hidden', // Ensures image respects border-radius
    // marginHorizontal: 15, // Adds space between the slides
  },
  maldivesSliderImage: {
    width: '100%',
    height: '100%',
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

  customCardContainerContent: {
    paddingVertical: 20,
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
    elevation:2

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
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
    marginTop: 20,
  },

  scrollableDescriptionWrapper: {
    flexDirection: 'row',
    height: 300,
    alignSelf: 'center',
    width: '100%',
  },
  customScrollArea: {
    flex: 1,
    paddingRight: 0,
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
    width: 8,
    height: '100%',
    backgroundColor: '#f5f6fa',
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  customScrollbarThumb: {
    width: 8,
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
    // Removed direct padding from here, it's now in contentContainerStyle for FlatList
    alignItems: 'center',
  },
  // New style for Multi-Center Deals FlatList content container
  multiCenterContentContainer: {
    paddingHorizontal: (width - (2 * MULTI_CENTER_CARD_WIDTH + MULTI_CENTER_CARD_MARGIN)) / 2,
    // (screen_width - (2 * card_width + margin_between_cards)) / 2
    paddingTop: 10,
    width: '100%', // Ensure it takes full width to calculate padding correctly
  },
  // New style for Multi-Center Deals FlatList column wrapper
  multiCenterColumnWrapper: {
    justifyContent: 'space-between',
    marginBottom: MULTI_CENTER_CARD_MARGIN, // Move this from cardMulti to here for better spacing
  },
  cardMulti: {
    width: MULTI_CENTER_CARD_WIDTH,
    // Removed marginBottom and marginHorizontal from here, handled by columnWrapperStyle and contentContainerStyle
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
  headingPlaces: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
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
    paddingHorizontal: 15,
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
  },
  sliderSection: {
    marginTop: 20,
    marginBottom: 20,
    marginRight:10
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
  slideItemThings:{
    width: thingsToDoConfig.WIDTH,
    marginHorizontal: 0,
    borderRadius: thingsToDoConfig.BORDER_RADIUS,
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
    marginRight: thingsToDoConfig.MARGIN_RIGHT
  },
  sliderImage: {
    width: '100%',
    height: thingsToDoConfig.HEIGHT * 0.65, // 65% of card height for image
    resizeMode: 'cover',
    // marginLeft:50
  },
  sliderContentCard: {
    padding: 15,
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
  // Famous Places Styles
  cardPlaces: {
    height: 380, // Fixed height for a consistent look
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180, // Take up a fixed portion of the card
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGray,
    marginBottom: 5,
    textAlign: 'center',
  },
  descriptionScroll: {
    maxHeight: 150, // Limit the height of the scrollable area
    marginTop: 5,
  },
  description: {
    fontSize: 13,
    color: colors.gray,
    lineHeight: 18,
    textAlign: 'center',
  },
  famousPlacesContentContainer: {
    paddingHorizontal: ITEM_SPACING, // Correctly center the first and last card
    paddingBottom: 20,
  },
  // Bottom Bar
 bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 12,
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    left: 0, // Ensure it spans full width
    right: 0, // Ensure it spans full width
    alignSelf: 'center',
    paddingVertical: 15,
    borderTopWidth: 1, // Added border for separation
    borderTopColor: colors.lightGray,
    elevation: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  blueButton: {
    flex: 1,
    backgroundColor: colors.blue, // Using colors.blue from palette
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'space-evenly',
    marginHorizontal: 5, // Changed from margin to marginHorizontal for consistency
  },
  buttonText: {
 color: colors.white,
fontWeight: 'bold',
 },
});
