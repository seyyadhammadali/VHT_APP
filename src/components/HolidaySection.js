

import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import StarSVG from '../assets/images/starS.svg';
import colors from '../constants/colors';
const { width } = Dimensions.get('window');
const HolidaySection = ({ title, packages, seeAllScreen, showFullDetails = true }) => {
  const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PakageDetails', { packageSlug: item.slug })}>
      <FastImage
      source={{
      uri: item.main_image,
          priority: FastImage.priority.normal,
          cache: FastImage.cacheControl.immutable,
        }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        {/* Conditionally render price and duration */}
        {showFullDetails && (
          <>
            <Text style={styles.subTitle}>{item.city}</Text>
            <View style={styles.bottomRow}>
              <Text style={styles.price}>£{item.sale_price || item.price}</Text>
              <Text style={styles.duration}>/{item.duration}</Text>
              <View style={styles.ratingView}>
                <StarSVG width={14} height={14} style={styles.starRating} />
                <Text style={styles.rating}>{item.rating}</Text>
              </View>
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
  if (!Array.isArray(packages) || packages.length === 0) {
    return null; // Don't render the section if there's no data
  }
  return (
    <View style={styles.container}>
      
      <FlatList
        data={packages}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        initialNumToRender={3}
        windowSize={5}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 1,
    paddingRight:10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: 'black',
    // marginRight:'auto'
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'gray',
    marginRight:"auto"
  },
  listContent: {
    paddingHorizontal: 14,
  },
  card: {
    width: width * 0.7, 
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom:5
  },
  image: {
    width: '100%',
    height: 170,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 14,
    color: 'gray',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  duration: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 5,
  },
  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  starRating: {
    marginRight: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HolidaySection;