import React, { useEffect, useState, useCallback, useMemo } from 'react';
 
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import SpecialOfferTag from '../assets/images/specialOffer.svg';
import Header from '../components/Header';
import Slider from '../components/Slider';
import ScrollableHtmlContent from '../components/ScrollableHtmlContent';
import QuoteFooter from '../components/QuoteFooter';
import colors from '../constants/colors';
import {
 fetchSafariPackages,
 selectSafariPackages,
  selectSafariPackagesStatus,
} from '../redux/slices/pakagesSlice';
import {
  selectSafariSliders,
  fetchSafariSliders,sliderStatus
} from '../redux/slices/sliderSlice';
import { fetchSingleSafariPage } from '../redux/slices/pagesSlice';
 
export default function Specialoffer({ navigation }) {
 
  const dispatch = useDispatch();
  const singlePage = useSelector((state) => state.pages.singleSafariPage);
  const loadingPage = useSelector((state) => state.pages.loading);
  const packagesList = useSelector(selectSafariPackages);
  const packagesStatus = useSelector(selectSafariPackagesStatus);
  // const sliderStatus = useSelector(sliderStatus);
  const sliders = useSelector(selectSafariSliders);
 
  const [visibleCount, setVisibleCount] = useState(10);
 
  useEffect(() => {
    dispatch(fetchSingleSafariPage());
    dispatch(fetchSafariSliders());
    dispatch(fetchSafariPackages());
  }, [dispatch]);
 
  useEffect(() => {
    setVisibleCount(6);
  }, [packagesList]);
 
  const visiblePackages = useMemo(
    () => packagesList.slice(0, visibleCount),
    [packagesList, visibleCount]
  );
 
  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + 6);
  }, []);
 
  const renderSkeleton = useCallback(() => {
    return (
      <SkeletonPlaceholder borderRadius={12}>
        <View style={{flexDirection:"row", flexWrap:"wrap", justifyContent: "space-between"}}>
          {Array.from({ length: 4 }).map((_, index) => (
            <View
              key={index}
              style={styles.cardContainer}
            >
              <View style={styles.cardImage} />
            </View>
          ))}
        </View>
      </SkeletonPlaceholder>
    );
  }, []);
 
  const renderPackageItem = useCallback(
    ({ item }) => (
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('PakageDetails', { packageSlug: item.slug })
          }
          activeOpacity={0.8}
        >
          <View style={styles.cardWrapper}>
            <SpecialOfferTag style={styles.ribbonTag} />
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
                <Text style={styles.daysText}>{item.duration || 'N/A'}</Text>
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
    ),
    [navigation]
  );
 
  return (
    <>
      <Header title="Safari Packages" showNotification navigation={navigation} />
 
      <FlatList
     
        ListHeaderComponent={
          <>
            <Slider images={sliders} loading={(sliderStatus === "loading")} />
            <View style={styles.customCardContainer}>
              <ScrollableHtmlContent htmlContent={singlePage.description} />
            </View>
          </>
        }
        data={visiblePackages}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.packagesColumnWrapper}
        contentContainerStyle={styles.packagesFlatListContent}
        // showsVerticalScrollIndicator
        renderItem={packagesStatus === 'loading' ? renderSkeleton : renderPackageItem}
        ListFooterComponent={
          visibleCount < packagesList.length && (
            <View style={styles.footer}>
              <TouchableOpacity onPress={handleLoadMore} style={styles.loadMoreBtn}>
                <Text style={styles.loadMoreText}>Load More</Text>
              </TouchableOpacity>
            </View>
          )
        }
      />
      <QuoteFooter></QuoteFooter>
    </>
  );
}
 
const styles = StyleSheet.create({
 
  customCardContainer: {
    paddingVertical: 10,
    marginBottom:10,
    margin:0,
  },
  customCardTitle: {
    backgroundColor: '#f8f1e7',
    color: colors.darkGray,
    fontWeight: 'bold',
    fontSize: 16,
    padding: 4,
    borderRadius: 6,
    marginBottom: 8,
    textAlign: 'center',
  },
  packagesColumnWrapper: {
    justifyContent: 'space-between',
    columnGap:10,
    flex:1,
    marginBottom: 10,
  },
  packagesFlatListContent: {
    paddingBottom:80,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
  },
  cardContainer: {
    width: '48%',
    marginBottom: 5,
  },
  card: {
    height:"100%",
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
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
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
 