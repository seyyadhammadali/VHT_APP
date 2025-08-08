import React, {useEffect, useState, useRef} from 'react';
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
import SpecialOfferTag from '../assets/images/specialOffer.svg';
import Header from '../components/Header';
import {fetchSinglePage} from '../redux/slices/pagesSlice';
import Carousel from 'react-native-reanimated-carousel';
import {
  fetchHolidayPackages,
  selectHolidayPackages,
  selectMultiCenterDeals,
  selectMultiCenterDealsStatus,
  fetchMultiCenterDeals,
} from '../redux/slices/pakagesSlice';
import {useSelector, useDispatch} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../constants/colors';
import {getResponsiveDimensions} from '../constants/sliderConfig';
import {
    selectSpecialOffers, 
    fetchSpecialOffers, 
} from '../redux/slices/sliderSlice';
const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
const {width} = Dimensions.get('window');
const multiCenterConfig = getResponsiveDimensions('MULTI_CENTER_GRID');
const cardWidth = multiCenterConfig.CARD_WIDTH;
const SLIDER_WIDTH = windowWidth;
const SLIDER_HEIGHT = windowWidth * 0.5;
// Helper function to strip HTML tags
function stripHtmlTags(html) {
  return html?.replace(/<[^>]*>?/gm, '') || '';
}
export default function Specialoffer({navigation}) {
  const dispatch = useDispatch();
  const carouselRef = useRef(null);
  const single = useSelector(state => state.pages.singlePage);
  const loadingPage = useSelector(state => state.pages.loading);
  const multiCenterDeals = useSelector(selectMultiCenterDeals);
  const multiCenterDealsStatus = useSelector(selectMultiCenterDealsStatus);
  const sliders = useSelector(selectSpecialOffers);
  console.log(sliders, 'Sliders Data');
  
  // --- MODIFIED STATE FOR STAR FILTERING: DEFAULT TO 5 ---
  const [selectedStarRating, setSelectedStarRating] = useState(5); // Default to 5 stars
  // Filtered list based on selectedStarRating
  const filteredMultiCenterDeals = multiCenterDeals.filter(item => {
    const itemRating = parseFloat(item.rating);
    return Math.floor(itemRating) === selectedStarRating;
  });
  // Local state for description scrollbar
  const [scrollPosition, setScrollPosition] = useState(0);
  const [contentHeight, setContentHeight] = useState(1);
  const [containerHeight, setContainerHeight] = useState(1);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
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
  // Local state for "Load More" functionality on the main packages list
  const [visibleCount, setVisibleCount] = useState(10); // Initial number of packages to show
  // Reset visibleCount when the filter changes
  useEffect(() => {
    setVisibleCount(10);
  }, [selectedStarRating, multiCenterDeals]); // Also reset if main data changes
  const visibleFilteredPackages = filteredMultiCenterDeals.slice(
    0,
    visibleCount,
  );
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 10); // Load 10 more packages
  };
  // Fetch data on component mount
  useEffect(() => {
     dispatch(fetchSpecialOffers());
    dispatch(fetchSinglePage());
    dispatch(fetchMultiCenterDeals());
    dispatch(fetchHolidayPackages());
   
  }, [dispatch]);
  // Skeleton renderer for the main package list
  const renderPackagesSkeleton = () => {
    const placeholders = Array.from({length: 6});
    return (
      <SkeletonPlaceholder borderRadius={12}>
        <View style={styles.packagesGridContainer}>
          {placeholders.map((_, index) => (
            <View
              key={index}
              style={[
                styles.card,
                (index + 1) % 2 === 0 && {marginRight: 0},
              ]}>
              <View style={styles.cardImage} />
              <View style={styles.cardContent}>
                <View style={{height: 150, marginBottom: 10, borderRadius: 6}} />
                <View style={{height: 120, width: '100%', borderRadius: 6}} />
              </View>
            </View>
          ))}
        </View>
      </SkeletonPlaceholder>
    );
  };
  const renderSliderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        if (item.slug) {
          navigation.navigate('PakageDetails', {packageSlug: item.slug});
        }
      }}
      style={styles.carouselItem}>
      <Image
        source={{
          uri:
            item.large ||
            item.image ||
            'https://via.placeholder.com/400x200?text=No+Image',
        }}
        style={styles.carouselImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
  return (
    <View style={styles.maincontainer}>
      <Header
        title="Exclusive Deals"
        showNotification={true}
        navigation={navigation}
      />
      <ScrollView
        contentContainerStyle={styles.mainScrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* Banner Section with Carousel */}
        <View style={styles.sectionWithSearchMarginSafari}>
          {loadingPage ? (
            <SkeletonPlaceholder borderRadius={10}>
              <SkeletonPlaceholder.Item
                width={width * 0.9}
                height={width * 0.9 * 0.45}
                borderRadius={10}
                alignSelf="center"
              />
            </SkeletonPlaceholder>
          ) : Array.isArray(sliders) && sliders.length > 0 ? (
            <>
              <Carousel
                ref={carouselRef}
                loop
                width={SLIDER_WIDTH}
                height={SLIDER_HEIGHT}
                autoPlay={true}
                autoPlayInterval={3000} // Autoplay every 3 seconds
                data={sliders}
                scrollAnimationDuration={1000}
                onSnapToItem={index => setCurrentSlideIndex(index)}
                renderItem={renderSliderItem}
              />
              <View style={styles.paginationContainer}>
                {sliders.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.paginationDot,
                      index === currentSlideIndex &&
                        styles.paginationDotActive,
                    ]}
                  />
                ))}
              </View>
            </>
          ) : (
            <Text style={{color: colors.mediumGray, alignSelf: 'center'}}>
              No safari banner found.
            </Text>
          )}
        </View>
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
              onLayout={e => setContainerHeight(e.nativeEvent.layout.height)}
              onScroll={e => setScrollPosition(e.nativeEvent.contentOffset.y)}
              scrollEventThrottle={16}>
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
        {/* Multicenter Deals List */}
        <View style={styles.packagesListSection}>
          {/* --- STAR FILTER OPTIONS --- */}
          <View style={styles.starFilterContainer}>
            {[5, 4, 3].map(star => (
              <TouchableOpacity
                key={star}
                onPress={() => setSelectedStarRating(star)}
                style={styles.starFilterButton}>
                <Text
                  style={[
                    styles.starFilterText,
                    selectedStarRating === star && {
                      color: colors.gold,
                      fontWeight: '900',
                      borderBottomWidth: 3,
                      borderBottomColor: colors.gold,
                      paddingBottom: 3,
                    },
                  ]}>
                  ⭐ {star} Star
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* --- END STAR FILTER OPTIONS --- */}
          {multiCenterDealsStatus === 'loading' ? (
            renderPackagesSkeleton()
          ) : (
            <FlatList
              data={visibleFilteredPackages} // Use the FILTERED and paginated data here
              keyExtractor={(item, index) =>
                item.id?.toString() || index.toString()
              }
              numColumns={2}
              columnWrapperStyle={styles.packagesColumnWrapper}
              contentContainerStyle={styles.packagesFlatListContent}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              renderItem={({item}) => (
                <View style={styles.cardContainer}>
                  <TouchableOpacity
                    style={[styles.card]}
                    onPress={() =>
                      navigation.navigate('PakageDetails', {
                        packageSlug: item.slug,
                      })
                    }
                    activeOpacity={0.8}>
                    <View style={styles.cardWrapper}>
                      <SpecialOfferTag style={styles.ribbonTag} />
                      <ImageBackground
                        source={{uri: item.main_image}}
                        style={styles.cardImage}
                        imageStyle={styles.imageStyle}>
                        <View style={styles.pill}>
                          <Image
                            source={require('../assets/images/flag.png')}
                            style={styles.flagIcon}
                          />
                          <Text style={styles.daysText}>
                            {item.duration || 'N/A'}
                          </Text>
                        </View>
                      </ImageBackground>
                    </View>
                    <View style={styles.cardContent}>
                      <Text style={styles.titleText} numberOfLines={4}>
                        {item.title}
                      </Text>
                      <View style={styles.bottomRow}>
                        <Text style={styles.priceText}>
                          £{item.sale_price || item.price}{' '}
                          <Text style={styles.unit}>/{item.packagetype}</Text>
                        </Text>
                        <Text style={styles.rating}>⭐ {item.rating}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              ListFooterComponent={
                <View style={{paddingVertical: 20, alignItems: 'center'}}>
                  {visibleCount < filteredMultiCenterDeals.length && (
                    <TouchableOpacity
                      onPress={handleLoadMore}
                      style={styles.loadMoreBtn}>
                      <Text style={styles.loadMoreText}>Load More</Text>
                    </TouchableOpacity>
                  )}
                </View>
              }
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mainScrollContainer: {
    paddingBottom: 70,
  },
  sectionWithSearchMarginSafari: {
    paddingHorizontal: 2,
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
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
  customCardContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 10,
    marginVertical: 10,
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    width: width * 0.95,
    alignSelf: 'center',
  },
  customCardTitle: {
    backgroundColor: '#f8f1e7',
    color: colors.darkGray,
    fontWeight: 'bold',
    fontSize: 16,
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
    textAlign: 'center',
  },
  scrollableDescriptionWrapper: {
    position: 'relative',
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
    height: '100%',
    backgroundColor: '#f5f6fa',
    borderRadius: 4,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  customScrollbarThumb: {
    width: 4,
    height: 'auto',
    backgroundColor: '#b88a3b',
    borderRadius: 4,
    position: 'absolute',
    left: 0,
  },
  packagesListSection: {
    paddingHorizontal: 10,
    marginTop: 5,
  },
  starFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  starFilterButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderColor: colors.lightGray,
  },
  starFilterText: {
    color: colors.gray,
    fontWeight: '500',
    fontSize: 15,
  },
  packagesGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  packagesColumnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  packagesFlatListContent: {
    paddingBottom: 20,
  },
  cardContainer: {
    width: '48%',
    marginBottom: 12,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardWrapper: {
    position: 'relative',
  },
  ribbonTag: {
    position: 'absolute',
    top: -4,
    zIndex: 10,
    width: 60,
    height: 60,
  },
  cardImage: {
    height: 180,
    padding: 5,
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
    color: colors.gray,
  },
  rating: {
    fontSize: 12,
    color: colors.orange,
    fontWeight: '600',
  },
  loadMoreBtn: {
    backgroundColor: colors.black,
    paddingHorizontal: 60,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  loadMoreText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});