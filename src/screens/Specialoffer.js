
import React ,{useEffect,useState}from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableOpacity,FlatList
} from 'react-native';
import SpecialOfferTag from '../assets/images/specialOffer.svg';
import Header from '../components/Header';
import colors from '../constants/colors';
import { useSelector, useDispatch } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  fetchHolidayDeals,
  selectHolidayDeals,
  sliderStatus
} from '../redux/slices/sliderSlice';
import {
  fetchHolidayPackages,
  selectHolidayPackages,
  selectHolidayPackagesStatus,
  selectPakagesError
} from '../redux/slices/pakagesSlice';
import SliderBanner from '../components/SliderBanner';

const CARD_MARGIN = 7;
const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 14 * 2 - CARD_MARGIN) / 2; 
export default function ExclusiveDeals({ navigation }) {
const dispatch = useDispatch();
const deals = useSelector(selectHolidayDeals);
const [visibleCount, setVisibleCount] = useState(10);
const status = useSelector(selectHolidayPackagesStatus);
const error = useSelector(selectPakagesError);
const holidayPackages = useSelector(selectHolidayPackages);
const visiblePackages = holidayPackages.slice(0, visibleCount);
const handleLoadMore = () => {
  setVisibleCount(prev => prev + 10);
};
 useEffect(() => {
  dispatch(fetchHolidayDeals());
}, [dispatch]); 
  useEffect(() => {
    dispatch(fetchHolidayPackages());
  }, [dispatch]);
  const renderSkeleton = () => {
  const placeholders = Array.from({ length: 6 });
  return (
    <SkeletonPlaceholder borderRadius={12}>
      <View style={styles.container}>
      {placeholders.map((_, index) => (
      <View
       key={index}
       style={[
       styles.card,
       (index + 1) % 2 === 0 && { marginRight: 0 },
        ]}
        >
    <View style={styles.cardImage} />
    <View style={styles.cardContent}>
     <View style={{ height: 150, marginBottom: 10, borderRadius: 6 }} />
    <View style={{ height: 120, width: '100%', borderRadius: 6 }} />
            </View>
          </View>
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};
  return (
    <View style={styles.maincontainer}>
     <Header title="Exclusive Deals" showNotification={true} navigation={navigation} />
     <ScrollView showsVerticalScrollIndicator={false}>
     <View style={styles.sectionWithSearchMargin}>
     <SliderBanner sliders={deals} loading={sliderStatus === 'loading'} />
     </View>
     <View style={styles.container}>
      {status === 'loading' ? renderSkeleton() : (
   <FlatList
  data={visiblePackages}
  keyExtractor={(item) => item.id.toString()}
  numColumns={2}
  contentContainerStyle={styles.container}
  showsVerticalScrollIndicator={false}
  columnWrapperStyle={{ justifyContent: 'space-between' }}
  initialNumToRender={6}
  maxToRenderPerBatch={10}
  removeClippedSubviews
  renderItem={({ item, index }) => (
  <TouchableOpacity
  style={[styles.card, (index + 1) % 2 === 0 && { marginRight: 0 }]}
  onPress={() => navigation.navigate('PakageDetails', { packageId: item?.id })}
  activeOpacity={0.8}
    >
  <View style={styles.cardWrapper}>
 <SpecialOfferTag style={styles.ribbonTag} />
 <ImageBackground
 source={{ uri: item.main_image }}
 style={styles.cardImage}
 imageStyle={styles.imageStyle} >
<View style={styles.pill}>
  <Image
  source={require('../assets/images/flag.png')} // fallback flag
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
 £{item.sale_price} <Text style={styles.unit}>/{item.packagetype}</Text>
  </Text>
   <Text style={styles.rating}>⭐ {item.rating}</Text>
   </View>
 </View>
 </TouchableOpacity>
  )}
ListFooterComponent={
  <View style={{ paddingVertical: 20, alignItems: 'center' }}>
    {visibleCount < holidayPackages.length && (
      <TouchableOpacity onPress={handleLoadMore} style={styles.loadMoreBtn}>
      <Text style={styles.loadMoreText}>Load More</Text>
    </TouchableOpacity>
    )}
    <View style={{ height: 60 }} />
  </View>
}

/>
 )}
    <View style={{ height: 80 }} />
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
   sectionWithSearchMargin: {
   paddingHorizontal: 10,
  marginTop: 0,
  alignSelf:'center',
  justifyContent:"center",
  alignItems:'center',
  height:180
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', 
    paddingBottom: 120,
  },
  center: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 50,
},

  bannerWrapper: {
    width: '100%',
    height: 120,
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
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
 ribbonTag: {
  position: 'absolute',
  top: -4, 
  zIndex: 10,
  width: 60,
  height: 60,
},
});
