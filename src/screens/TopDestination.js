
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
  Linking,
  FlatList,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
import PhoneS from '../assets/images/PhoneS.svg';
import Getqoute from '../assets/images/getQoute.svg';
import FlagSVG from '../assets/images/flagS.svg';
import HeartSVG from '../assets/images/Heart.svg';
import Header from '../components/Header';
import { fetchSinglePage } from '../redux/slices/pagesSlice';
import NoInternetMessage from '../components/NoInternetMessage';
import { destinationStatus, fetchCountryDestinations } from '../redux/slices/destinationsSlice';
import { useSelector, useDispatch } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../constants/colors';
import RenderHtml from 'react-native-render-html';
import { getResponsiveDimensions } from '../constants/sliderConfig';
import QuoteFooter from '../components/QuoteFooter';

const { width } = Dimensions.get('window');
const bannerConfig = getResponsiveDimensions('BANNER');
const bannerWidth = width - 30;
const bannerHeight = bannerConfig.HEIGHT;
const INITIAL_LOAD_COUNT = 6;
const LOAD_MORE_COUNT = 10;
const imageWidth = (width - 60) / 2;
 
export default function TopDestination({ navigation }) {
  const dispatch = useDispatch();
  const single = useSelector(state => state.pages.singlePage);
  const loading = useSelector(state => state.pages.loading);
  const destinations = useSelector(state => state.destination.country);
  const destination_status = useSelector(destinationStatus);
 const [displayCount, setDisplayCount] = useState(INITIAL_LOAD_COUNT);
  const visibleDestinations = useMemo(() => destinations.slice(0, displayCount), [destinations, displayCount]);
  const showLoadMoreButton = destinations.length > visibleDestinations.length;
const [scrollPosition, setScrollPosition] = useState(0);
  const [contentHeight, setContentHeight] = useState(1);
  const [containerHeight, setContainerHeight] = useState(1);
  const thumbHeight = Math.max((containerHeight / contentHeight) * containerHeight, 30);
  const maxThumbPosition = containerHeight - thumbHeight;
  const thumbPosition = Math.min(
    (scrollPosition / (contentHeight - containerHeight)) * maxThumbPosition || 0,
    maxThumbPosition
  );
  const showCustomScrollbar = !loading && contentHeight > containerHeight;
   const [isConnected, setIsConnected] = useState(true);
    
  useEffect(() => {
    dispatch(fetchSinglePage());
    dispatch(fetchCountryDestinations());
  }, [dispatch]);
  const handleLoadMore = useCallback(() => {
    setDisplayCount(prevCount => prevCount + LOAD_MORE_COUNT);
  }, []);
useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        return () => {
            unsubscribe();
        };
    }, []);
  const renderDestinationCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MaldivesPackages', { destinationId: item.id })}
    >
      <ImageBackground source={{ uri: item.banner }} style={styles.cardImage} imageStyle={styles.imageStyle}>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>{item.name}</Text>
          <View style={styles.infoBox}>
            <FlagSVG width={14} height={14} style={styles.flagIcon} />
            <Text style={styles.countText}>{item.total_packages}</Text>
            <Text style={styles.subtitle}>Tours</Text>
          </View>
          <HeartSVG width={26} height={26} style={styles.heartIcon} />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
        {!isConnected ? (
     <View style={styles.noInternetView}>
          <NoInternetMessage />
        </View>
      ) : (
        <>
      <Header title="Destinations" showNotification navigation={navigation} />
 
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
       
        {/* Banner & Description */}
        <View style={styles.sectionWithSearchMarginSafari}>
          {loading ? (
            <SkeletonPlaceholder borderRadius={10}>
              <SkeletonPlaceholder.Item width={bannerWidth} height={bannerHeight} />
              <SkeletonPlaceholder.Item width={bannerWidth} height={30} marginVertical={10} />
              <SkeletonPlaceholder.Item width={bannerWidth} height={200} />
            </SkeletonPlaceholder>
          ) : single?.banner ? (
            <>
              <FastImage
                source={{ uri: single.banner, priority: FastImage.priority.high }}
                style={styles.bannerImgSafari}
                resizeMode={FastImage.resizeMode.cover}
              />
              <View style={styles.customCardContainer}>
                <Text style={styles.customCardTitle}>{single.title || 'Best Holiday Destinations for You'}</Text>
                <View style={styles.scrollableDescriptionWrapper}>
                  <ScrollView
                    style={styles.customScrollArea}
                    nestedScrollEnabled
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={(_, h) => setContentHeight(h)}
                    onLayout={e => setContainerHeight(e.nativeEvent.layout.height)}
                    onScroll={e => setScrollPosition(e.nativeEvent.contentOffset.y)}
                    scrollEventThrottle={16}
                  >
                    <RenderHtml
                      contentWidth={width - 20}
                      source={{ html: single.description || ' ' }}
                      baseStyle={styles.customCardDescription}
                    />
                  </ScrollView>
                  {showCustomScrollbar && (
                    <View style={styles.customScrollbarTrack}>
                      <View style={[styles.customScrollbarThumb, { height: thumbHeight, top: thumbPosition }]} />
                    </View>
                  )}
                </View>
              </View>
            </>
          ) : (
            <Text style={styles.noBannerText}>No destination banner found.</Text>
          )}
        </View>
 
        {/* Destination Cards */}
        <View style={styles.destinationScroll}>
          {destination_status === 'loading' ? (
            <SkeletonPlaceholder>
              <View style={styles.skeletonRow}>
                {Array.from({ length: INITIAL_LOAD_COUNT }).map((_, index) => (
                  <View key={index} style={styles.skeletonCard} />
                ))}
              </View>
            </SkeletonPlaceholder>
          ) : (
            <>
              <FlatList
                data={visibleDestinations}
                numColumns={2}
                keyExtractor={item => item.id.toString()}
                columnWrapperStyle={styles.columnWrapper}
                renderItem={renderDestinationCard}
                scrollEnabled={false}
              />
              {showLoadMoreButton && (
                <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
                  <Text style={styles.loadMoreButtonText}>Load More</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </ScrollView>
 
      {/* Bottom Bar */}
      <QuoteFooter/>
        </>
       )}
    </View>
  );
}
 
const styles = StyleSheet.create({
   noInternetView: {
 flex: 1, 
 justifyContent: 'center',
  alignItems: 'center' }, 
  container: { flex: 1, backgroundColor: colors.white, paddingBottom: 80 },
  scrollContainer: { marginVertical: 15, paddingHorizontal: 15 },
  sectionWithSearchMarginSafari: { paddingHorizontal: 10, alignItems: 'center' },
  bannerImgSafari: { height: bannerHeight, width: bannerWidth, borderRadius: 10, alignSelf: 'center', marginBottom: 10 },
  noBannerText: { color: colors.mediumGray, alignSelf: 'center' },
  customCardContainer: { backgroundColor: colors.white, borderRadius: 12, marginVertical: 10, shadowOpacity: 0.05, shadowRadius: 8, width: bannerWidth },
  customCardTitle: { backgroundColor: '#f8f1e7', color: colors.darkGray, fontWeight: 'bold', fontSize: 16, borderRadius:5, marginBottom:10, padding: 8, textAlign: 'center' },
  scrollableDescriptionWrapper: { flexDirection: 'row', height: 160, width: '100%' },
  customScrollArea: { flex: 1, paddingRight: 0 },
  customCardDescription: { color: colors.mediumGray, fontSize: 14, lineHeight: 20, textAlign: 'justify' },
  customScrollbarTrack: { width: 4, height: '100%', backgroundColor: '#f5f6fa', borderRadius: 4, marginLeft: 5 },
  customScrollbarThumb: { width: 4, backgroundColor: '#b88a3b', borderRadius: 4, position: 'absolute', left: 0 },
  destinationScroll: { padding: 5, marginTop: 10 },
  columnWrapper: { justifyContent: 'space-between', gap:15 },
  card: {  width: imageWidth,
    height: 210,
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    // --- Add dropshadow styles here ---
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8 },
  cardImage: { flex: 1, justifyContent: 'space-between', padding: 10 },
  imageStyle: { borderRadius: 10 },
  contentContainer: { position: 'absolute', bottom: 8, left: 5 },
  titleText: { fontSize: 14, fontWeight: '700', backgroundColor: colors.white, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 15 },
  infoBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: 15, paddingHorizontal: 6, paddingVertical: 3, marginTop: 6 },
  flagIcon: { marginRight: 4 },
  countText: { color: colors.red, fontSize: 13, fontWeight: '600', marginRight: 4 },
  subtitle: { color: colors.black, fontSize: 13, fontWeight: '600' },
  heartIcon: { position: 'absolute', left: 130, marginTop: 25 },
  bottomBar: { flexDirection: 'row', justifyContent: 'space-evenly', padding: 12, backgroundColor: colors.white, position: 'absolute', bottom: 0, left: 0, right: 0, borderTopWidth: 1, borderTopColor: colors.lightGray },
  blueButton: { flex: 1, backgroundColor: colors.blue, paddingVertical: 15, borderRadius: 8, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly', margin: 3 },
  buttonText: { color: colors.white, fontWeight: 'bold' },
  loadMoreButton: { backgroundColor: colors.black, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, alignSelf: 'center', marginTop: 20, marginBottom: 40 },
  loadMoreButtonText: { color: colors.white, fontSize: 16, fontWeight: 'bold' },
  skeletonRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 15 },
  skeletonCard: { width: '47%', height: 210, borderRadius: 10, marginBottom: 10 },
});