
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  FlatList
} from 'react-native';
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import SpecialOfferTag from '../assets/images/specialOffer.svg';
import colors from '../constants/colors';
import {
  selectCruisePackages,
  selectCruisePackagesStatus
} from '../redux/slices/pakagesSlice';
import {
  fetchSingleCruisePage,
  selectSingleCruisePage,
  selectPagesLoading
} from '../redux/slices/pagesSlice';
const CARD_MARGIN = 7;
const { width: windowWidth } = Dimensions.get('window');
const cardWidth = (windowWidth - 14 * 2 - CARD_MARGIN) / 2;
const bannerWidth = windowWidth * 0.9;
const bannerHeight = bannerWidth * 0.45;
export default function ExclusiveDeals({ navigation }) {
  const dispatch = useDispatch();
  // Add state for custom scrollbar
  const [scrollPosition, setScrollPosition] = useState(0);
  const [contentHeight, setContentHeight] = useState(1);
  const [containerHeight, setContainerHeight] = useState(1);
  const thumbHeight = Math.max((containerHeight / contentHeight) * containerHeight, 30);
  const maxThumbPosition = containerHeight - thumbHeight;
  const thumbPosition = Math.min(
    (scrollPosition / (contentHeight - containerHeight)) * maxThumbPosition || 0,
    maxThumbPosition
  );
  useEffect(() => {
    dispatch(fetchSingleCruisePage());
  }, [dispatch]);
  const cruisePackages = useSelector(selectCruisePackages);
  const cruisePage = useSelector((state) => state.pages.singleCruisePage);
  const cruisePackagesStatus = useSelector(selectCruisePackagesStatus);
  const singleCruisePage = useSelector(selectSingleCruisePage);
  const loading = useSelector(selectPagesLoading);
  console.log('singleCruisePage==================-0----',singleCruisePage)
  return (
    <View style={styles.maincontainer}>
      <Header title="Cruise" showNotification={true} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={styles.bannerWrapperCustom}>
          {loading ? (
            <SkeletonPlaceholder borderRadius={10}>
              <SkeletonPlaceholder.Item
                width={bannerWidth}
                height={bannerHeight}
                borderRadius={10}
                alignSelf="center"
              />
            </SkeletonPlaceholder>
          ) : singleCruisePage && singleCruisePage.banner ? (
            <>
              <FastImage
                source={{ uri: singleCruisePage.banner }}
                style={{ width: bannerWidth, height: bannerHeight, borderRadius: 10, alignSelf: 'center' }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <View style={styles.customCardContainer}>
                <Text style={styles.customCardTitle}>{singleCruisePage.title || 'Best Holiday Destinations for You'}</Text>
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
                      {stripHtmlTags(singleCruisePage.description)}
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
            <Text style={{ color: colors.mediumGray, alignSelf: 'center' }}>No cruise banner found.</Text>
          )}
        </View>
        {/* Cruise Cards */}
       <View style={styles.container}>
          {cruisePackagesStatus === 'loading' ? (
            <SkeletonPlaceholder>
              <View style={styles.packagesHolidayRow}>
                {[...Array(4)].map((_, index) => (
                  <SkeletonPlaceholder.Item
                    key={index}
                    width={cardWidth}
                    height={240}
                    borderRadius={12}
                    marginBottom={12}
                  />
                ))}
              </View>
            </SkeletonPlaceholder>
          ) : (
            <FlatList
              data={cruisePackages}
              keyExtractor={(item, index) => item.id?.toString() || index.toString()}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 14 }}
              contentContainerStyle={{ paddingBottom: 100 }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => navigation.navigate('PakageDetails', { packageId: item.id })}
                  activeOpacity={0.85}
                >
                  <ImageBackground
                    source={{ uri: item.main_image }}
                    style={styles.cardImage}
                    imageStyle={styles.imageStyle}
                  >
                    <View style={styles.pill}>
                      <Image source={require('../assets/images/flag.png')} style={styles.flagIcon} />
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
  gap: 10, 
  marginBottom:20,
  borderRadius:20
},
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', 
    paddingBottom: 120,
  },
  bannerWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 18,
  },
  bannerWrapperCustom: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  card: {
    width: cardWidth,
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    marginRight: CARD_MARGIN, 
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
  ribbonTag: {
    width: 80,
    height: 80,
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'contain',
    zIndex: 2,
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
    alignItems: 'flex-start',
    position: 'relative',
  },
  customScrollArea: {
    maxHeight: 120,
    paddingRight: 16, 
    flex: 1,
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
});
// Utility function to strip HTML tags
function stripHtmlTags(html) {
  return html?.replace(/<[^>]*>?/gm, '') || '';
}