

import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import SliderBanner from '../components/SliderBanner';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useSelector, useDispatch } from 'react-redux'; 
import Header from '../components/Header';
import {
  selectCruisePackages,
  selectCruisePackagesStatus,
} from '../redux/slices/pakagesSlice';
import {
  fetchSingleSafariPage, 
  selectSingleSafariPage,
  selectPagesLoading,
} from '../redux/slices/pagesSlice';
import colors from '../constants/colors';
import RenderHtml from 'react-native-render-html';

const CARD_MARGIN = 7;
const { width: windowWidth } = Dimensions.get('window');
const cardWidth = (windowWidth - 14 * 2 - CARD_MARGIN) / 2; 
const bannerWidth = windowWidth * 0.92;
const bannerHeight = 150;

export default function Safari({ navigation }) {
  const dispatch = useDispatch(); // Initialize useDispatch
  const { sliders } = useSelector((state) => state.slider);
  const cruisePackages = useSelector(selectCruisePackages);
  const cruisePackagesStatus = useSelector(selectCruisePackagesStatus);
  const singleCruisePage = useSelector(selectSingleSafariPage);
  const loading = useSelector(selectPagesLoading);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [contentHeight, setContentHeight] = useState(1);
  const [containerHeight, setContainerHeight] = useState(1);
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
    strong: { fontWeight: 'bold', color: 'darkblue' },
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

  return (
    <View style={styles.maincontainer}>
      <Header title="Safari" showNotification={true} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={styles.bannerWrapper}>
          {loading ? (
            <SkeletonPlaceholder borderRadius={10}>
              <SkeletonPlaceholder.Item
                width={bannerWidth}
                height={bannerHeight}
                borderRadius={10}
                alignSelf="center"
              />
            </SkeletonPlaceholder>
          ) : (
            singleCruisePage && singleCruisePage.banner && (
              <>
              </>
            )
          )}
        </View>

        <View style={styles.sectionWithSearchMargin}>
          <SliderBanner sliders={sliders} />
        </View>
        <View style={styles.customCardContainer}>
          <Text style={styles.customCardTitle}>{singleCruisePage?.title || 'Best Holiday Destinations for You'}</Text>
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
            contentWidth={width - 40} 
            source={{ html: singleCruisePage.description }}
            tagsStyles={baseTagStyles} 
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
                    marginRight={index % 2 === 0 ? CARD_MARGIN : 0}
                    marginLeft={index % 2 === 1 ? CARD_MARGIN : 0}
                  />
                ))}
              </View>
            </SkeletonPlaceholder>
          ) : (
            <FlatList
              data={cruisePackages} 
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
                  onPress={() => navigation.navigate('PakageDetails', { packageId: item.id })}
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
    height: bannerHeight + 40, // Use responsive height based on banner height plus padding
    marginBottom: 10,
  },
  bannerWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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
  },
  customScrollArea: {
    flex: 1,
    paddingRight: 0,
    height: 200,
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
    marginLeft: 5, 
  },
  customScrollbarThumb: {
    width: 8,
    backgroundColor: '#b88a3b', 
    borderRadius: 4,
    position: 'absolute',
    left: 0,
  },
});
