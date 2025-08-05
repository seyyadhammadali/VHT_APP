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
  Linking ,
  FlatList
} from 'react-native';
import FastImage from 'react-native-fast-image';
import PhoneS from '../assets/images/PhoneS.svg';
import Getqoute from '../assets/images/getQoute.svg';
import FlagSVG from '../assets/images/flagS.svg';
import HeartSVG from '../assets/images/Heart.svg';
import Header from '../components/Header';
import {fetchSinglePage} from '../redux/slices/pagesSlice';
import { destinationStatus, fetchCountryDestinations } from '../redux/slices/destinationsSlice';
import { useSelector, useDispatch } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../constants/colors';
import RenderHtml from 'react-native-render-html';
import { SLIDER_CONFIG, getResponsiveDimensions } from '../constants/sliderConfig';

const { width, height } = Dimensions.get('window');
const bannerConfig = getResponsiveDimensions('BANNER');
const bannerWidth = bannerConfig.WIDTH;
const bannerHeight = bannerConfig.HEIGHT;
const INITIAL_LOAD_COUNT = 10; 
const LOAD_MORE_COUNT = 10;    
export default function TopDestination({ navigation }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSinglePage());
    dispatch(fetchCountryDestinations());
  }, [dispatch]);
  const single = useSelector((state) => state.pages.singlePage);
  const loading = useSelector((state) => state.pages.loading);
  const destinations = useSelector(state => state.destination.country);
  const destination_status = useSelector(destinationStatus);
  const [displayCount, setDisplayCount] = useState(INITIAL_LOAD_COUNT);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [contentHeight, setContentHeight] = useState(1);
  const [containerHeight, setContainerHeight] = useState(1);
  const thumbHeight = Math.max((containerHeight / contentHeight) * containerHeight, 30);
  const maxThumbPosition = containerHeight - thumbHeight;
  const thumbPosition = Math.min(
    (scrollPosition / (contentHeight - containerHeight)) * maxThumbPosition || 0,
    maxThumbPosition
  );
  const visibleDestinations = destinations.slice(0, displayCount);
  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + LOAD_MORE_COUNT);
  };
  const showLoadMoreButton = destinations.length > visibleDestinations.length;
  const showCustomScrollbar = !loading && contentHeight > containerHeight;
  return (
    <View style={styles.container}>
      <Header title="Destinations" showNotification={true} navigation={navigation} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false} >
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
                <Text style={styles.customCardTitle}>{single.title || 'Best Holiday Destinations for You'}</Text>
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
                    ) : (
                     
                       <RenderHtml
                          contentWidth={windowWidth - 20}
                          source={{ html: single.description || '<p>Title Not Available</p>' }}
                          baseStyle={styles.customCardDescription}
                        />
                    )}
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
            </>
          ) : (
            <Text style={{ color: colors.mediumGray, alignSelf: 'center' }}>No safari banner found.</Text>
          )}
        </View>

        <View style={styles.destinationScroll}>
          {destination_status === 'loading' ? (
            <SkeletonPlaceholder>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                {[...Array(6)].map((_, index) => (
                  <View key={index} style={[styles.card, { backgroundColor: colors.lightGray }]} />
                ))}
              </View>
            </SkeletonPlaceholder>
          ) : (
            <FlatList
              data={visibleDestinations} // Use the sliced array here
              numColumns={2}
              keyExtractor={(item) => item.id.toString()}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              contentContainerStyle={styles.flatListContentContainer} // Use a separate style for FlatList content
              showsVerticalScrollIndicator={false} // The main ScrollView handles overall scrolling
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('MaldivesPackages', { packageSlug: item.slug })}
                  >
                    <ImageBackground
                      source={{ uri: item.banner }}
                      style={styles.cardImage}
                      imageStyle={styles.imageStyle}
                    >
                      <View style={styles.contentContainer}>
                        <Text style={styles.titleText}>{item.name}</Text>
                        <View style={styles.row}>
                          <View style={styles.infoBox}>
                            <FlagSVG width={14} height={14} style={styles.flagIcon} />
                            <Text style={styles.countText}>{item.total_packages}</Text>
                            <Text style={styles.subtitle}>Tours</Text>
                          </View>
                        </View>
                        <HeartSVG width={26} height={26} style={styles.heartIcon} />
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}

          {/* Load More Button */}
          {destination_status === 'succeeded' && showLoadMoreButton && (
            <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
              <Text style={styles.loadMoreButtonText}>Load More</Text>
            </TouchableOpacity>
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

const windowWidth = Dimensions.get('window').width;
const imageWidth = (windowWidth - 40) / 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 80, // Make space for the bottom bar
  },
  destinationScroll: {
    padding: 5,
    marginTop:70
  },
  scrollContainer: {
    // No longer needed for FlatList, but keeps overall ScrollView flexible
    // FlatList has its own contentContainerStyle
  },
  flatListContentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20, // Add some padding below the last item
  },
  bannerImgSafari: {
    marginTop: 1,
    marginBottom: 10,
    alignSelf: 'center',
    paddingTop: 0,
    paddingBottom: 12,
    borderRadius: 10
  },
  sectionWithSearchMarginSafari: {
    paddingHorizontal: 10,
    alignSelf: 'center',
    justifyContent: "center",
    alignItems: 'center'
  },
  card: {
    width: imageWidth,
    height: 210,
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  imageStyle: {
    borderRadius: 10,
    resizeMode: 'cover',
    marginRight: 10
  },
  contentContainer: {
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 8,
    left: 5,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '700',
    backgroundColor: colors.white,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    color: colors.black,
    marginTop: 10,
    padding: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    borderRadius: 10,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 15,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  flagIcon: {
    marginRight: 4,
  },
  countText: {
    color: colors.red,
    fontSize: 13,
    fontWeight: '600',
    marginRight: 4,
  },
  subtitle: {
    color: colors.black,
    fontSize: 13,
    fontWeight: '600',
  },
  heartIcon: {
    position: 'absolute',
    left: 120,
    marginTop: 40,
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
  bestDestinationHeading: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 50,
    textAlign: "center",
    color: colors.darkGray,
    backgroundColor: colors.goldLight,
    paddingHorizontal: 35
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
    flexDirection: 'row',
    height: 120, // Adjust height as needed for the scrollable area
    alignSelf: 'center',
    width: '100%',
  },
  customScrollArea: {
    flex: 1,
    paddingRight: 0, // No padding on the right to make space for scrollbar
    height: 200, // Ensure a fixed height for the scroll area
  },
  customCardDescription: {
    color: colors.mediumGray,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'justify',
  },
  customScrollbarTrack: {
    width: 8,
    height: '100%',
    backgroundColor: '#f5f6fa',
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginLeft: 5, // Space between text and scrollbar
  },
  customScrollbarThumb: {
    width: 8,
    backgroundColor: '#b88a3b',
    borderRadius: 4,
    position: 'absolute',
    left: 0,
  },
  flagIconImage: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    marginRight: 4,
  },
  loadMoreButton: {
    backgroundColor: colors.black, // Or any color you prefer
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20, // Add some margin below the button
  },
  loadMoreButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

