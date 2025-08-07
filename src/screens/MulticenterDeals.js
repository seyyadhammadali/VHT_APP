import React, { useEffect, useState, useRef } from 'react';
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
import Header from '../components/Header';
import { fetchSinglePage } from '../redux/slices/pagesSlice';
import {
  fetchCountryDestinations,
  destinationStatus,
} from '../redux/slices/destinationsSlice';
import {
  selectMultiCenterDeals,
  fetchMultiCenterDeals,
  selectMultiCenterDealsStatus,
} from '../redux/slices/pakagesSlice';
import { useSelector, useDispatch } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../constants/colors';
import Carousel from 'react-native-reanimated-carousel';

const { width: windowWidth } = Dimensions.get('window');

// Responsive Dimensions: Define all sizing in one place for consistency
const ResponsiveDimensions = {
  SCREEN_PADDING: 10,
  CARD_MARGIN: 7,
  getCardWidth: (numColumns = 2) => {
    const totalMarginAndPadding =
      (numColumns - 1) * ResponsiveDimensions.CARD_MARGIN +
      ResponsiveDimensions.SCREEN_PADDING * 2;
    return (windowWidth - totalMarginAndPadding) / numColumns;
  },
};

const CARD_WIDTH = ResponsiveDimensions.getCardWidth(2);
const SLIDER_WIDTH = windowWidth - ResponsiveDimensions.SCREEN_PADDING * 2;
const SLIDER_HEIGHT = 180;

export default function MulticenterDeals({ navigation }) {
  const dispatch = useDispatch();
  const { sliders, status: slider_status } = useSelector(
    (state) => state.slider,
  );
  useEffect(() => {
    dispatch(fetchSinglePage());
    dispatch(fetchCountryDestinations());
    dispatch(fetchMultiCenterDeals());
  }, [dispatch]);

  const carouselRef = useRef(null);
  const multiCenterDeals = useSelector(selectMultiCenterDeals);
  const multiCenterDealsStatus = useSelector(selectMultiCenterDealsStatus);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const renderSliderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.sliderItem}
        onPress={() => item.redirect_url && Linking.openURL(item.redirect_url)}
        activeOpacity={0.8}>
        <FastImage
          source={{
            uri: item.large,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
          }}
          style={styles.sliderImage}
          resizeMode={FastImage.resizeMode.cover}
        />
      </TouchableOpacity>
    );
  };

  const renderDealCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PakageDetails', { packageSlug: item.slug })}>
      <ImageBackground
        source={{ uri: item.main_image }}
        style={styles.cardImage}
        imageStyle={styles.imageStyle}>
        <View style={styles.pill}>
          <Image
            source={require('../assets/images/flag.png')}
            style={styles.flagIcon}
          />
          <Text style={styles.daysText}>{item.duration || 'Nights'}</Text>
        </View>
      </ImageBackground>
      <View style={styles.cardContent}>
        <Text style={styles.titleText} numberOfLines={2}>
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
  );

  return (
    <View style={styles.container}>
      <Header title="Multicenter Deals" showNotification={true} navigation={navigation} />
      <ScrollView
        contentContainerStyle={styles.mainScrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* Carousel Section */}
        <View style={styles.carouselSection}>
          {slider_status === 'loading' ? (
            <SkeletonPlaceholder borderRadius={10}>
              <SkeletonPlaceholder.Item
                width={SLIDER_WIDTH}
                height={SLIDER_HEIGHT}
                borderRadius={10}
                alignSelf="center"
              />
            </SkeletonPlaceholder>
          ) : Array.isArray(sliders) && sliders.length > 0 ? (
            <>
              <Carousel
                ref={carouselRef}
                loop={sliders.length > 1}
                width={SLIDER_WIDTH}
                height={SLIDER_HEIGHT}
                autoPlay={sliders.length > 1}
                autoPlayInterval={3000}
                data={sliders}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => setCurrentSlideIndex(index)}
                renderItem={renderSliderItem}
              />
              {sliders.length > 1 && (
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
              )}
            </>
          ) : (
            <View
              style={[
                styles.noSlidersContainer,
                { width: SLIDER_WIDTH, height: SLIDER_HEIGHT },
              ]}>
              <Text style={styles.noSlidersText}>No slides found.</Text>
            </View>
          )}
        </View>

        {/* Multicenter Deals List */}
        <View style={styles.packagesListSection}>
          <Text style={styles.packagesListTitle}>
            All-Inclusive Multicenter Deals 2025-26
          </Text>
          <Text style={styles.packagesListSubtitle}>
            Scroll through luxury Multicenter deals handpicked by our UK travel
            experts for you and your loved ones.
          </Text>
          {multiCenterDealsStatus === 'loading' ? (
            <SkeletonPlaceholder>
              <View style={styles.flatListColumnWrapper}>
                {[...Array(4)].map((_, index) => (
                  <View key={index} style={styles.card}>
                    <SkeletonPlaceholder.Item
                      width={CARD_WIDTH}
                      height={180}
                      borderTopLeftRadius={12}
                      borderTopRightRadius={12}
                    />
                    <SkeletonPlaceholder.Item padding={10}>
                      <SkeletonPlaceholder.Item
                        width="90%"
                        height={18}
                        borderRadius={4}
                        marginBottom={8}
                      />
                      <SkeletonPlaceholder.Item
                        flexDirection="row"
                        justifyContent="space-between">
                        <SkeletonPlaceholder.Item
                          width="40%"
                          height={16}
                          borderRadius={4}
                        />
                        <SkeletonPlaceholder.Item
                          width="30%"
                          height={16}
                          borderRadius={4}
                        />
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
              columnWrapperStyle={styles.flatListColumnWrapper}
              contentContainerStyle={styles.flatListContent}
              showsVerticalScrollIndicator={false}
              renderItem={renderDealCard}
            />
          )}
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.blueButton, { backgroundColor: colors.green }]}
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
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mainScrollContainer: {
    paddingBottom: 80, // Space for the fixed bottom bar
  },

  // Carousel Section
  carouselSection: {
    paddingHorizontal: ResponsiveDimensions.SCREEN_PADDING,
    marginTop: 10,
    alignItems: 'center',
  },
  sliderItem: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  sliderImage: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
  },
  paginationContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.lightGray,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: colors.gold,
  },

  // Packages List Section
  packagesListSection: {
    marginTop: 20,
    paddingHorizontal: ResponsiveDimensions.SCREEN_PADDING,
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
  flatListContent: {
    paddingBottom: 20,
  },
  flatListColumnWrapper: {
    justifyContent: 'space-between',
    marginBottom: ResponsiveDimensions.CARD_MARGIN,
  },

  // Card styles
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 4,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
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

  // Bottom Bar styles
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 12,
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
});