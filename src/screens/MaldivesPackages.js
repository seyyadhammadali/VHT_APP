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
  FlatList,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import ScrollableHtmlContent from '../components/ScrollableHtmlContent';
import FastImage from 'react-native-fast-image';
import Header from '../components/Header';
import {selectDestinationById } from '../redux/slices/destinationsSlice';
import { useSharedValue } from "react-native-reanimated";
import {
  fetchDestinationPackages,
  selectDestinationPackages,
  selectDestinationPackagesStatus,
} from '../redux/slices/pakagesSlice';
import RenderHTML from 'react-native-render-html';
import { useSelector, useDispatch } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../constants/colors';
import RenderHtml from 'react-native-render-html';
import NetInfo from '@react-native-community/netinfo';
import NoInternetMessage from '../components/NoInternetMessage';
import { SLIDER_CONFIG, AUTO_SCROLL_INTERVALS, PAGINATION_STYLES, getResponsiveDimensions } from '../constants/sliderConfig';
import Slider from '../components/Slider';
import QuoteFooter from '../components/QuoteFooter';
import FamousFoodCarousel from '../components/FamousFoodCarousel';
import CountryContent from '../components/CountryContent';

const { width } = Dimensions.get('window');
const thingsToDoConfig = getResponsiveDimensions('THINGS_TO_DO');
const multiCenterConfig = getResponsiveDimensions('MULTI_CENTER_GRID');
const MULTI_CENTER_CARD_WIDTH = multiCenterConfig.CARD_WIDTH;
const MULTI_CENTER_CARD_HEIGHT = multiCenterConfig.CARD_HEIGHT;
const MULTI_CENTER_CARD_IMAGE_HEIGHT = multiCenterConfig.CARD_IMAGE_HEIGHT;
const MULTI_CENTER_CARD_MARGIN = multiCenterConfig.CARD_MARGIN;
const bannerWidth = width;
function stripHtmlTags(html) {
  return html?.replace(/<[^>]*>?/gm, '') || '';
}
export default function MaldivesPackages({ navigation, route }) {
  const carouselRef = useRef(null); 
  const { destinationId} = route.params;
  const destination = useSelector(selectDestinationById(destinationId));
  const dispatch = useDispatch();
    const [famousPlacesCarouselIndex, setFamousPlacesCarouselIndex] = useState(0); 
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const famousPlacesCarouselRef = useRef(null); 
  const [expanded, setExpanded] = useState(false);
  const [expandedThings, setExpandedThings] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  // *** NEW useEffect FOR NETWORK LISTENER ***
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        return () => {
            unsubscribe();
        };
    }, []);
 useEffect(() => {
    // Only dispatch data fetching if there is an internet connection
    if (destination) {
        dispatch(fetchDestinationPackages(destination?.id));
    }
  }, [dispatch, destination]);
  const destinationsPackages = useSelector(selectDestinationPackages);
  const packages_status = useSelector(selectDestinationPackagesStatus) !== 'succeeded';
  const [packagesCount, setPackagesCount] = useState(4);
  const handleLoadMoreMultiCenterDeals = () => {
    setPackagesCount((prevCount) => prevCount + 4);
  };
  const progress = useSharedValue(0);
  const baseTagStyles = {
    
    p: {
      fontSize: 14,
      color: '',
      marginBottom: 0,
      paddingBottom: 0,
      textAlign:'center'
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
    fontSize: 18,
    paddingHorizontal: 0,
    borderRadius: 6,
    Bottom: 0,
     marginTop: 5,
    textAlign: 'center', 
    alignSelf:"center",
  },
   h3: { 
    color: colors.darkGray,
    fontWeight: 'bold',
    fontSize: 18,
    paddingHorizontal: 0,
    borderRadius: 6,
    Bottom: 0,
     marginTop: 5,
    textAlign: 'center', 
    alignSelf:"center",
  },
   h4: { 
    color: colors.darkGray,
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 0,
    borderRadius: 6,
    Bottom: 0,
     marginTop: 5,
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
  const [expandedItems, setExpandedItems] = useState({});

const renderFamousPlacesItem = ({ item }) => {
  const isExpanded = expandedItems[item.id];
  const plainText = stripHtmlTags(item.details || '');
  const shortHtml = `<p>${plainText.substring(0,300)}${plainText.length > 350 ? '...' : ''}</p>`;

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id], // toggle only clicked card
    }));
  };

  return (
    <View style={styles.cardPlaces}>
      <Image
        source={{ uri: item.image || 'https://via.placeholder.com/400x200' }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>

        <RenderHTML
          contentWidth={width - 40}
          source={{ html: isExpanded ? item.details || '' : shortHtml }}
        />

        {/* {plainText.length > 200 && (
          <TouchableOpacity onPress={() => toggleExpand(item.id)}>
            <Text style={styles.readMoreBtn}>
              {isExpanded ? 'Read Less' : 'Read More'}
            </Text>
          </TouchableOpacity>
        )} */}
      </View>
    </View>
  );
};

 return (
  <View style={styles.container}>
       {!isConnected ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <NoInternetMessage />
        </View>
      ) : (
        <>
        {console.log(destination, "destination")
        }
    <Header title={`${destination?.name || ''} Packages`} showNotification={true} navigation={navigation} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {destination ? (destination?.sliders.length > 0 ? (<Slider images={destination.sliders} />) : '')
        :(
           <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              width={width - 20}
              height={180}
              borderRadius={10}
              marginVertical={20}
              alignSelf="center"
            />
        </SkeletonPlaceholder>
        )}
        {destination ? ((destination?.top_head || destination?.top_desc) ? (
          <ScrollableHtmlContent htmlContent={destination?.top_head + destination?.top_desc} /> 
        ):''):(
           <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              width={width * 0.6}
              height={30}
              borderRadius={10}
              marginHorizontal={10}
              alignSelf="left"
            />
            <SkeletonPlaceholder.Item
              width={width - 20}
              height={210}
              borderRadius={10}
              marginVertical={5}
              alignSelf="center"
            />
        </SkeletonPlaceholder>
        )}
        
         {destinationsPackages.length > 0 ? (
          <FlatList
              data={destinationsPackages?.slice(0, packagesCount)}
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
            ListFooterComponent={
              packagesCount < destinationsPackages.length && (
                <TouchableOpacity onPress={handleLoadMoreMultiCenterDeals} style={styles.loadMoreButton}>
                  <Text style={styles.loadMoreButtonText}>Load More</Text>
                </TouchableOpacity>
              )
            }
          />
        ):(
      <FlatList
            data={[...Array(4)]}
            keyExtractor={(_, index) => `skeleton-${index}`}
            numColumns={2}
            columnWrapperStyle={styles.multiCenterColumnWrapper}
            contentContainerStyle={styles.multiCenterContentContainer}
            showsVerticalScrollIndicator={false}
            renderItem={() => (
              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item
                  width={width * 0.46} // Use a dynamic value based on screen width for better responsiveness
                  height={200}
                  borderRadius={10}
                />
              </SkeletonPlaceholder>
            )}
          />
        )}
        {/* Multi-Center Deals Section */}
        
     <CountryContent destination={destination} />

     {destination?.things_todos ? (
     <FamousFoodCarousel title={`<h2 style="text-align: center;">📍Things To Do in ${destination?.name || ''}</h2>`} data={destination?.things_todos} />
     ):''}
   
     {destination?.places ? (
      <>
           {destination?.famous_places_content && (
            <View   style={{paddingHorizontal:20}}>
          <RenderHtml
        
            source={{
              html: destination.famous_places_content || '',
            }}
            tagsStyles={baseTagStyles}
          />
          </View>
            )}
         
            <Carousel
             autoPlay={false}
              autoPlayReverse={false}
              vertical={false}
                ref={famousPlacesCarouselRef}
                autoPlayInterval={2000}
                loop={true}
                data={destination?.places}
                height={350}
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
      </>
     ): ''}
        {/* Horizontal Image Foodsa Slider Section - Things To Do */}
   {destination?.foods ? (
        <FamousFoodCarousel title={destination?.delicious_food_content} data={destination?.foods} />
   ):''}
   {destination?.things_todo_content ? (
        <View style={styles.sectionWithSearchMarginSafari}>
            <ScrollableHtmlContent  htmlContent={destination?.things_todo_content } />
          </View>
   ):''} 
      </ScrollView> 
      <QuoteFooter />
      </>
       )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  sectionWithSearchMarginSafari: {
    paddingVertical: 20, 
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
    height: 180,
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
    backgroundColor: '#ffffff',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    position: "absolute",
    bottom: 8,
    marginHorizontal: 8
  },
 
  daysText: {
    color: colors.black,
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
    color: colors.gold,
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
    
    // padding:10
    // marginTop: 20,
    // marginBottom: 10,
    // marginRight:10
  },
  slideItem: {
    width: (width - 40),
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
  
  cardPlaces: {
    minHeight: 350,
    // height: 380, 
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
    gap:10,
     marginBottom: 0,
  },
  image: {
    width: '100%',
    height: 180, 
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    padding: 10,
  // height:250
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGray,
    marginBottom: 5,
    textAlign: 'center',
  },

  description: {
    fontSize: 13,
    color: colors.gray,
    lineHeight: 18,
    textAlign: 'center',
  },



  buttonText: {
 color: colors.white,
fontWeight: 'bold',
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

