import React, {useEffect, useState} from 'react';
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
import SpecialOfferTag from '../assets/images/specialOffer.svg'; // Import for the tag on cards
import Header from '../components/Header';
import {fetchSinglePage} from '../redux/slices/pagesSlice';
import {
  fetchHolidayPackages,
  selectHolidayPackages,
  selectHolidayPackagesStatus,
  selectPakagesError,
  fetchMultiCenterDeals,
  selectMultiCenterDeals,
  selectMultiCenterDealsStatus,
} from '../redux/slices/pakagesSlice';
import {useSelector, useDispatch} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../constants/colors';

const {width} = Dimensions.get('window');
const CARD_MARGIN = 7;
const cardWidth = (width - 10 * 2 - CARD_MARGIN) / 2; // (Total width - 2 * horizontal padding - 1 * margin between cards) / 2

// Helper function to strip HTML tags
function stripHtmlTags(html) {
  return html?.replace(/<[^>]*>?/gm, '') || '';
}

export default function Specialoffer({navigation}) {
  const dispatch = useDispatch();

  const holidayPackages = useSelector(selectHolidayPackages);
  const single = useSelector(state => state.pages.singlePage);
  const loadingPage = useSelector(state => state.pages.loading);
  const multiCenterDeals = useSelector(selectMultiCenterDeals);
  const multiCenterDealsStatus = useSelector(selectMultiCenterDealsStatus);

  // --- MODIFIED STATE FOR STAR FILTERING: DEFAULT TO 5 ---
  const [selectedStarRating, setSelectedStarRating] = useState(5); // Default to 5 stars

  // Filtered list based on selectedStarRating
  const filteredMultiCenterDeals = multiCenterDeals.filter(item => {
    if (selectedStarRating === null) {
      return true; // Show all if no filter is selected (though now 5 is default)
    }
    const itemRating = parseFloat(item.rating);
    return Math.floor(itemRating) === selectedStarRating;
  });

  // Local state for description scrollbar
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

  // Local state for "Load More" functionality on the main packages list
  const [visibleCount, setVisibleCount] = useState(10); // Initial number of packages to show

  // Reset visibleCount when the filter changes
  useEffect(() => {
    setVisibleCount(10);
  }, [selectedStarRating, multiCenterDeals]); // Also reset if main data changes

  const visibleFilteredPackages = filteredMultiCenterDeals.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 10); // Load 10 more packages
  };

  // Dummy comment data for demonstration
  const [comments, setComments] = useState([
    {id: '1', author: 'Alice', text: 'This looks like an amazing deal!'},
    {id: '2', author: 'Bob', text: 'How was the experience for others?'},
    {id: '3', author: 'Charlie', text: 'Great find! Planning my next trip.'},
    {id: '4', author: 'David', text: 'The description is very helpful.'},
  ]);

  // Fetch data on component mount
  useEffect(() => {
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

  const renderComment = ({item}) => (
    <View style={styles.commentItem}>
      <Text style={styles.commentAuthor}>{item.author}</Text>
      <Text style={styles.commentText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.maincontainer}>
      <Header
        title="Multicenter Deals"
        showNotification={true}
        navigation={navigation}
      />
      <ScrollView
        contentContainerStyle={styles.mainScrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* Safari Banner Section */}
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
          ) : single && single?.banner ? (
            <>
              <FastImage
                source={{
                  uri: single.banner,
                  priority: FastImage.priority.high,
                  cache: FastImage.cacheControl.immutable,
                }}
                style={[
                  styles.bannerImgSafari,
                  {width: width * 0.9, height: width * 0.9 * 0.45},
                ]}
                resizeMode={FastImage.resizeMode.cover}
                onError={e => console.warn('Safari slider image error:', e.nativeEvent)}
              />

              {/* Description Container */}
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
            </>
          ) : (
            <Text style={{color: colors.mediumGray, alignSelf: 'center'}}>
              No safari banner found.
            </Text>
          )}
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
      borderBottomWidth: 3, // Use borderBottomWidth for the underline
      borderBottomColor: colors.gold, // Gold underline color
      paddingBottom: 3, // Add padding to create space
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
              keyExtractor={(item, index) => item.id?.toString() || index.toString()}
              numColumns={2}
              columnWrapperStyle={styles.packagesColumnWrapper}
              contentContainerStyle={styles.packagesFlatListContent}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate('PakageDetails', {packageSlug: item.slug})
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
                  <View style={{height: 60}} />
                </View>
              }
            />
          )}
        </View>
      </ScrollView>

      {/* Fixed Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.blueButton, {backgroundColor: '#189900'}]}
          onPress={() => navigation.navigate('SubmitEnquiry')}>
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

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mainScrollContainer: {
    paddingBottom: 70,
  },
  sectionWithSearchMarginSafari: {
    paddingHorizontal: 10,
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImgSafari: {
    borderRadius: 10,
    overflow: 'hidden',
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
    width: width * 0.9, // Use direct width calculation
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
    width: 8,
    backgroundColor: '#b88a3b',
    borderRadius: 4,
    position: 'absolute',
    left: 0,
  },

  commentsSection: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 10,
    marginTop: 15,
    marginBottom: 10,
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    width: width * 0.9,
    alignSelf: 'center',
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGray,
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: '#e7f8f1',
    padding: 8,
    borderRadius: 6,
  },
  commentItem: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  commentAuthor: {
    fontWeight: 'bold',
    color: colors.gold,
    marginBottom: 4,
    fontSize: 13,
  },
  commentText: {
    fontSize: 13,
    color: colors.darkGray,
    lineHeight: 18,
  },
  commentSeparator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 5,
  },

  packagesListSection: {
    paddingHorizontal: 10,
    marginTop: 15,
  },
  packagesListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGray,
    marginBottom: 15,
    marginTop: 5,
    textAlign: 'center',
    backgroundColor: '#f1e7f8',
    padding: 8,
    borderRadius: 6,
    width: width * 0.9,
    alignSelf: 'center',
  },
  starFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%',

  },
  starFilterButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderColor: colors.lightGray,
    marginHorizontal: 5,
  },
  starFilterText: {
    color: colors.gray,
    fontWeight: '600',
    fontSize: 16,
  },
  selectedStarFilterText: {
    color: colors.gold, // Change text color to gold
    textDecorationLine: 'underline', // Add underline
    textDecorationColor: colors.gold, // Make underline gold
    fontWeight: '900',
  },
  packagesGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  packagesColumnWrapper: {
    justifyContent: 'space-between',
  },
  packagesFlatListContent: {
    paddingBottom: 20,
  },

  card: {
    width: cardWidth,
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    marginRight: CARD_MARGIN,
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
    backgroundColor: colors.gold,
    paddingHorizontal: 80,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  loadMoreText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },

  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 12,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignSelf: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#eee',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: -3},
  },
  blueButton: {
    flex: 1,
    backgroundColor: '#007bff',
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
  },
});