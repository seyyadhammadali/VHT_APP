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
import {selectFilteredPage } from '../redux/slices/pagesSlice';
 import NetInfo from '@react-native-community/netinfo';
import NoInternetMessage from '../components/NoInternetMessage';
export default function Specialoffer({ navigation }) {
  const dispatch = useDispatch();
  const singlePage = useSelector(selectFilteredPage('safari'));
  const loadingPage = singlePage?false:true;
  const packagesList = useSelector(selectSafariPackages);
  const packagesStatus = useSelector(selectSafariPackagesStatus);
  const sliderStatus = singlePage?.sliders ? false: true;
  const sliders = singlePage?.sliders;
  const [visibleCount, setVisibleCount] = useState(10);
 const [isConnected, setIsConnected] = useState(true);
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        return () => {
            unsubscribe();
        };
    }, []);
  useEffect(() => {
    if(!loadingPage){
      dispatch(fetchSafariPackages());
    }
  }, [dispatch, loadingPage]);
 
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
 
function renderPageSkeleton() {
  return (
    <SkeletonPlaceholder borderRadius={8}>
      <View style={{ marginTop: 60, paddingHorizontal: 15 }}>
        {/* Banner */}
        <SkeletonPlaceholder.Item width="100%" height={160} borderRadius={12} />

        {/* Description */}
        <SkeletonPlaceholder.Item width="80%" height={20} marginTop={20} />
        <SkeletonPlaceholder.Item width="90%" height={20} marginTop={10} />
        <SkeletonPlaceholder.Item width="70%" height={20} marginTop={10} />
      </View>
    </SkeletonPlaceholder>
  );
}

function renderCardSkeleton() {
  return (
    <SkeletonPlaceholder borderRadius={12}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 15 }}>
        {[...Array(6)].map((_, index) => (
          <SkeletonPlaceholder.Item
            key={index}
            width="48%"
            height={260}
            marginBottom={15}
          />
        ))}
      </View>
    </SkeletonPlaceholder>
  );
}

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
 if (loadingPage || !singlePage) {
  return renderPageSkeleton();
}


  return (
    <>
       {!isConnected ? (
     <View style={styles.noInternetView}>
          <NoInternetMessage />
        </View>
      ) : (
        <>
      <Header title="Safari Packages" showNotification navigation={navigation} />
     <FlatList
  ListHeaderComponent={
    <>
      {sliderStatus === 'loading' ? (
        renderPageSkeleton()
      ) : (
        <>
          <Slider images={sliders} loading={sliderStatus === "loading"} />
          <View style={styles.customCardContainer}>
            <ScrollableHtmlContent htmlContent={singlePage?.description || ""} />
          </View>
        </>
      )}
    </>
  }
  data={visiblePackages}
  keyExtractor={(item, index) => item.id?.toString() || index.toString()}
  numColumns={2}
  columnWrapperStyle={styles.packagesColumnWrapper}
  contentContainerStyle={styles.packagesFlatListContent}
  renderItem={
    packagesStatus === 'loading'
      ? () => renderCardSkeleton()
      : renderPackageItem
  }
  ListFooterComponent={
    visibleCount < packagesList.length && (
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleLoadMore}
          style={styles.loadMoreBtn}
        >
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>
      </View>
    )
  }
/>

      <QuoteFooter/>
         </>
       )}
    </>
  );
}
 
const styles = StyleSheet.create({
 
  customCardContainer: {
    paddingVertical: 10,
    marginBottom:10,
    margin:0,
  },
   noInternetView: {
 flex: 1, 
 justifyContent: 'center',
  alignItems: 'center' }, 
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
    // iOS Shadow
    shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
   shadowOpacity: 0.3,
   shadowRadius: 4,
   // Android Shadow
  elevation: 8,
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
    fontWeight: '800',
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