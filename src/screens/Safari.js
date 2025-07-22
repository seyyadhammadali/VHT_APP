
import React from 'react';
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
import SliderBanner from '../components/SliderBanner';
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import SpecialOfferTag from '../assets/images/specialOffer.svg';
import {
  selectCruisePackages,
  selectCruisePackagesStatus
} from '../redux/slices/pakagesSlice';
import {
  selectSingleCruisePage,
  selectPagesLoading
} from '../redux/slices/pagesSlice'; // You must expose these selectors
import colors from '../constants/colors';

const CARD_MARGIN = 7;
const { width: windowWidth } = Dimensions.get('window');
const cardWidth = (windowWidth - 14 * 2 - CARD_MARGIN) / 2;
const bannerWidth = windowWidth * 0.92;
const bannerHeight = 150;

export default function ExclusiveDeals({ navigation }) {
    const { sliders } = useSelector(state => state.slider);
  const cruisePackages = useSelector(selectCruisePackages);
  const cruisePackagesStatus = useSelector(selectCruisePackagesStatus);
  const singleCruisePage = useSelector(selectSingleCruisePage);
  const loading = useSelector(selectPagesLoading);

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
            singleCruisePage && singleCruisePage[0]?.banner && (
              <FastImage
                source={{ uri: singleCruisePage[0].banner }}
                style={{ width: bannerWidth, height: bannerHeight, borderRadius: 10 }}
                resizeMode={FastImage.resizeMode.cover}
              />
            )
          )}
        </View>
<View style={styles.sectionWithSearchMargin}>
   <SliderBanner sliders={sliders}  />

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
                  onPress={() => navigation.navigate('PakageDetails', { packageData: item })}
                  activeOpacity={0.85}
                >
                  {/* <View style={styles.ribbonTag}>
                    <SpecialOfferTag style={styles.ribbonSvg} />
                  </View> */}
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
  // paddingRight: 10,
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
    // paddingHorizontal: 14,
    paddingBottom: 120,
  },
   sectionWithSearchMargin: {
   paddingHorizontal: 10,
  
  alignSelf:'center',
  justifyContent:"center",
  alignItems:'center',
  height:170
  },
  bannerWrapper: {
    width: '100%',
    // height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 18,
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
    // padding: 5,
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
    color: colors.orange, // orange
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
});