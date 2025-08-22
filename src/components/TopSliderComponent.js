import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation } from '@react-navigation/native';
import colors from '../constants/colors'; 
const { width } = Dimensions.get('window');
const SLIDER_WIDTH = width;
const SLIDER_HEIGHT = width * 0.5;
const TopSliderComponent = ({ sliders }) => {
  const navigation = useNavigation();
  const carouselRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const renderSliderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        if (item.slug) {
          navigation.navigate('PakageDetails', { packageSlug: item.slug });
        }
      }}
      style={styles.carouselItem}
    >
      <Image
        source={{ uri: item.large || item.image || 'https://via.placeholder.com/400x200?text=No+Image' }}
        style={styles.carouselImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
  return (
    <View>
      {Array.isArray(sliders) && sliders.length > 0 ? (
        <>
      <Carousel
       ref={carouselRef}
       loop
       width={SLIDER_WIDTH}
       height={SLIDER_HEIGHT}
       autoPlay={true}
       autoPlayInterval={3000}
       data={sliders}
       scrollAnimationDuration={1000}
       onSnapToItem={index => setCurrentSlideIndex(index)}
       renderItem={renderSliderItem}
      />
      <View style={styles.paginationContainer}>
      {sliders.map((_, index) => (
      <View
     key={index}
   style={[styles.paginationDot, index === currentSlideIndex && styles.paginationDotActive]}
     />
     ))}
    </View>
   </>
   ) : (
    <Text style={styles.noDataText}>No sliders available.</Text>
  )}
  </View>
  );
};
const styles = StyleSheet.create({
  carouselItem: {
    width: width - 20,
    height: SLIDER_HEIGHT,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    objectFit: 'fill',
    borderRadius: 10,
    marginTop:20
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25,
    zIndex: 1,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: colors.primary, 
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
});
export default TopSliderComponent;