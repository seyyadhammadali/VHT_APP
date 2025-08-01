
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
import Header from '../components/Header';
import {fetchSinglePage} from '../redux/slices/pagesSlice';
import { destinationStatus, fetchCountryDestinations } from '../redux/slices/destinationsSlice';
import {
  selectMultiCenterDeals,
  fetchMultiCenterDeals,
  fetchCruisePackages,
  selectMultiCenterDealsStatus,
} from '../redux/slices/pakagesSlice';
import { useSelector, useDispatch } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../constants/colors';

const { width, height } = Dimensions.get('window');
const bannerWidth = width * 0.9;
const bannerHeight = bannerWidth * 0.45;

// Define cardWidth based on the new styling requirements (similar to HolidayHotList)
const cardWidth = (width - 36) / 2; // (Total width - horizontal padding) / 2

export default function MulticenterDeals({ navigation }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSinglePage());
        dispatch(fetchCountryDestinations());
        dispatch(fetchMultiCenterDeals()); // Ensure this is dispatched to fetch data
    }, [dispatch]);

    const single = useSelector((state) => state.pages.singlePage);
    const loading = useSelector((state) => state.pages.loading);
    const destinations = useSelector(state => state.destination.country);
    const destination_status = useSelector(destinationStatus);
    const multiCenterDeals = useSelector(selectMultiCenterDeals);
    const multiCenterDealsStatus = useSelector(selectMultiCenterDealsStatus);

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
            <Header title="Multicenter Deals" showNotification={true} navigation={navigation} />
            <ScrollView
                contentContainerStyle={styles.mainScrollContainer} // Changed to mainScrollContainer
                showsVerticalScrollIndicator={false}
            >
                {/* Safari Banner Section */}
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
                        <Text style={{ color: colors.mediumGray, alignSelf: 'center' }}>No safari banner found.</Text>
                    )}
                </View>

                {/* Multicenter Deals List */}
                <View style={styles.packagesListSection}> {/* Added a section wrapper for consistent padding */}
                    <Text style={styles.packagesListTitle}>All-Inclusive Multicenter Deals 2025-26</Text>
                    <Text style={styles.packagesListSubtitle}>Scroll through luxury Multicenter deals handpicked by our UK travel experts for you and your loved ones.</Text>

                    {multiCenterDealsStatus === 'loading' ? (
                        <SkeletonPlaceholder>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                {[...Array(4)].map((_, index) => (
                                    <View key={index} style={[styles.card, { backgroundColor: colors.lightGray, marginBottom: 15 }]} >
                                        <SkeletonPlaceholder.Item width={'100%'} height={180} borderTopLeftRadius={12} borderTopRightRadius={12} />
                                        <SkeletonPlaceholder.Item padding={10}>
                                            <SkeletonPlaceholder.Item width="90%" height={18} borderRadius={4} marginBottom={8} />
                                            <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between">
                                                <SkeletonPlaceholder.Item width="40%" height={16} borderRadius={4} />
                                                <SkeletonPlaceholder.Item width="30%" height={16} borderRadius={4} />
                                            </SkeletonPlaceholder.Item>
                                        </SkeletonPlaceholder.Item>
                                    </View>
                                ))}
                            </View>
                        </SkeletonPlaceholder>
                    ) : (
                        <FlatList
                            data={multiCenterDeals}
                            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                            numColumns={2}
                            columnWrapperStyle={styles.flatListColumnWrapper} // Applied new style
                            contentContainerStyle={styles.flatListContent} // Applied new style
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.card}
                                    onPress={() => navigation.navigate('PakageDetails', { packageSlug: item.slug })}
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
                                            <Text style={styles.daysText}>{item.duration || 'Nights'}</Text>
                                        </View>
                                    </ImageBackground>
                                    <View style={styles.cardContent}>
                                        <Text style={styles.titleText} numberOfLines={2}> {/* Reduced numberOfLines */}
                                            {item.title}
                                        </Text>
                                        <View style={styles.bottomRow}>
                                            <Text style={styles.priceText}>
                                                £{item.sale_price || item.price}{' '}
                                                <Text style={styles.unit}>/{item.packagetype || 'pp'}</Text>
                                            </Text>
                                            <Text style={styles.rating}>⭐ {item.rating || 'N/A'}</Text>
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

// Utility function to strip HTML tags
function stripHtmlTags(html) {
 return html?.replace(/<[^>]*>?/gm, '') || '';
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 80, // Add padding to accommodate the fixed bottom bar
  },
  mainScrollContainer: {
    paddingBottom: 20, // General padding for the scrollable content
  },
  // Safari Banner Section Styles (kept mostly same)
  sectionWithSearchMarginSafari: {
    paddingHorizontal: 10,
    alignSelf: 'center',
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 10, // Added margin top for spacing from header
  },
  bannerImgSafari: {
    marginTop: 1,
    marginBottom: 10,
    alignSelf: 'center',
    paddingTop: 0,
    paddingBottom: 12,
    borderRadius: 10
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

  // New styles for Multicenter Deals list section
  packagesListSection: {
    paddingHorizontal: 10, // Apply padding to the section container
    marginTop: 20,
  },
  packagesListTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.darkGray,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: '#C28D3E1F',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 5,
  },
  packagesListSubtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.gray,
    marginBottom: 15,
    textAlign: 'center',
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  // FlatList content and column wrapper to match the commented HolidayHotList
  flatListContent: {
    paddingBottom: 20,
  },
  flatListColumnWrapper: {
    justifyContent: 'space-between',
  },

  // Card styles (copied from HolidayHotList)
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
    padding: 10,
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
    marginLeft: 5
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
  // Adjusted titleText for MulticenterDeals to match HolidayHotList
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
  // Bottom bar styles (kept mostly same, adjusted position)
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