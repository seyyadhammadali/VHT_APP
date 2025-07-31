import React, { useState, useRef, useEffect } from 'react';
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
  ActivityIndicator, 
} from 'react-native';
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import {
  selectSearchResults,
  selectSearchLoading,
  selectSearchError,
  selectSearchKeyword, 
  clearSearchResults, 
} from '../redux/slices/searchSlice';
import colors from '../constants/colors';
const CARD_MARGIN = 7;
const { width: windowWidth } = Dimensions.get('window');
const cardWidth = (windowWidth - 14 * 2 - CARD_MARGIN) / 2;
export default function SearchScreen({ navigation }) {
  const dispatch = useDispatch();
  const searchResults = useSelector(selectSearchResults);
  const searchLoading = useSelector(selectSearchLoading);
  const searchError = useSelector(selectSearchError);
  const searchKeyword = useSelector(selectSearchKeyword); 
  useEffect(() => {
    return () => {
      dispatch(clearSearchResults());
    };
  }, [dispatch]);
  const renderPackageItem = ({ item }) => (
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
  );
  return (
    <View style={styles.maincontainer}>
      <Header title={`"${searchKeyword}" Pakages`} showNotification={true} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
       {/* Display Search Results */}
        <View style={styles.searchResultSection}>
          {searchLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.gold} />
              <Text style={styles.loadingText}>Searching packages...</Text>
            </View>
          ) : searchError ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Error: {searchError}</Text>
              <Text style={styles.errorText}>Please try again.</Text>
            </View>
          ) : searchResults.length > 0 ? (
            <FlatList
              data={searchResults} 
              keyExtractor={(item, index) => item.id?.toString() || index.toString()}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                paddingHorizontal: 14,
              }}
              contentContainerStyle={{ paddingBottom: 100 }}
              showsVerticalScrollIndicator={false}
              renderItem={renderPackageItem}
              scrollEnabled={false} 
            />
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No packages found for "{searchKeyword}".</Text>
              <Text style={styles.noResultsSubText}>Try a different search term.</Text>
            </View>
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
  searchResultSection: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 0, 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200, 
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.darkGray,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: colors.red,
    textAlign: 'center',
    marginBottom: 5,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    paddingHorizontal: 20,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGray,
    textAlign: 'center',
    marginBottom: 5,
  },
  noResultsSubText: {
    fontSize: 14,
    color: colors.mediumGray,
    textAlign: 'center',
  },
  packagesHolidayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 20,
    borderRadius: 20,
    paddingHorizontal: 14,
  },
  sectionWithSearchMargin: {
    paddingHorizontal: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 170,
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
    width: windowWidth * 0.92, 
    alignSelf: 'center',
  },
  customCardTitle: {
    backgroundColor: 'rgba(1, 190, 158, 0.08)',
    color: colors.darkGray,
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
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