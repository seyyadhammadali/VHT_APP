import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
   Keyboard,
   Platform
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import {
  setSearchKeyword,
  fetchSearchPackages,
  selectSearchResults,
  selectSearchLoading,
  selectSearchError,
  selectSearchKeyword,
  clearSearchResults,
} from '../redux/slices/searchSlice';
import colors from '../constants/colors';
import { FooterComponent } from 'react-native-screens/lib/typescript/components/ScreenFooter';
import FooterTabs from '../components/FooterTabs';
 
const CARD_MARGIN = 7;
const { width: windowWidth } = Dimensions.get('window');
const cardWidth = (windowWidth - 14 * 2 - CARD_MARGIN) / 2;
 
export default function SearchScreen({ navigation }) {
  const dispatch = useDispatch();
 
  const searchResults = useSelector(selectSearchResults);
  const searchLoading = useSelector(selectSearchLoading);
  const searchError = useSelector(selectSearchError);
  const searchKeyword = useSelector(selectSearchKeyword);
 
  const [visibleCount, setVisibleCount] = useState(6); // show first 6 results
 
  useEffect(() => {
    return () => {
      dispatch(clearSearchResults());
    };
  }, [dispatch]);
 
  const renderPackageItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('PakageDetails', { packageSlug: item.slug })
        }
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
            <Text style={styles.daysText}>
              {item.duration || '7 Nights'}
            </Text>
          </View>
        </ImageBackground>
 
        <View style={styles.cardContent}>
          <Text style={styles.titleText} numberOfLines={4}>
            {item.title}
          </Text>
          <View style={styles.bottomRow}>
            <Text style={styles.priceText}>
              £{item.sale_price || item.price}{' '}
              <Text style={styles.unit}>
                /{item.packagetype || 'pp'}
              </Text>
            </Text>
            <Text style={styles.rating}>⭐ {item.rating || '4.0'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [navigation]
  );
  const [keyword, setKeyword] = useState('');
  const handleSearch = () => {
    Keyboard.dismiss();
    if (keyword.trim()) {
      dispatch(setSearchKeyword(keyword.trim()));
      dispatch(fetchSearchPackages(keyword.trim()));
      setKeyword('');
    } else {
      alert('Please enter a search keyword to find packages.');
    }
  };
  const searchInput = () => {
    return (
      <View style={styles.searchBarAbsoluteContainer}>
          <View style={styles.searchBarContainer}>
            <Image source={require('../assets/images/search.png')} style={styles.searchIcon} />
            <TextInput
              placeholder="Search Countries, Cities, Places..."
              placeholderTextColor="#999"
              style={styles.searchBar}
              value={keyword}
              onChangeText={setKeyword}
              returnKeyType="search"
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
  const renderFooter = () => {
    if (visibleCount < searchResults.length) {
      return (
        <TouchableOpacity
          style={styles.loadMoreBtn}
          onPress={() => setVisibleCount(prev => prev + 6)} // load next 6
        >
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };
 
  const renderContent = () => {
    if (searchLoading) {
      return (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color={colors.gold} />
          <Text style={styles.loadingText}>Searching packages...</Text>
        </View>
      );
    }
 
    if (searchError) {
      return (
        <>
        <View style={styles.centeredContainer}>
          <Text style={[styles.errorText, styles.noResultsText]}>Error: {searchError}</Text>
          <Text style={styles.errorText}>Please try again.</Text>
         
        </View>
        {searchInput()}
        </>
      );
    }
 
    if (searchResults.length === 0) {
      return (
        <>
        <View style={styles.centeredContainer}>
          <Text style={styles.noResultsText}>
            No packages found for "{searchKeyword}".
          </Text>
          <Text style={styles.noResultsSubText}>
            Try a different search term.
          </Text>
        </View>
        {searchInput()}
        </>
      );
    }
 
    return (
      <FlatList
        data={searchResults.slice(0, visibleCount)}
        ListHeaderComponent={(
          <>
          <View style={styles.centeredContainer}>
          <Text style={styles.noResultsText}>
            Search packages for "{searchKeyword}".
          </Text>
          <Text style={styles.noResultsSubText}>
            Total found packages: {searchResults.length}.
          </Text>
        </View>
          </>
        )}
        keyExtractor={(item, index) =>
          item.id?.toString() || index.toString()
        }
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={{ paddingBottom: 100, paddingTop:10 }}
        renderItem={renderPackageItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter}
      />
    );
  };
 
  return (
    <>
    <View style={styles.maincontainer}>
      <Header
        title="Search Packages"
        showNotification
        navigation={navigation}
      />
      {renderContent()}
    </View>
    <FooterTabs></FooterTabs>
    </>
  );
}
 
const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.darkGray,
  },
  errorText: {
    fontSize: 16,
    color: colors.red,
    textAlign: 'center',
    marginBottom: 5,
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
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 14,
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
  loadMoreBtn: {
    marginTop: 10,
    marginBottom: 40,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: colors.gold,
    borderRadius: 20,
  },
  loadMoreText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  searchBarAbsoluteContainer: {
    paddingHorizontal:20
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // bottom: -22,
    // alignItems: 'center',
    // zIndex: 10,
  },
  searchBarContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 45,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: '92%',
    alignSelf: 'center',
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    paddingVertical: Platform.OS === 'android' ? 0 : 10,
  },
  searchButton: {
    backgroundColor: colors.black, // Assuming you have a primary color
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  }
});