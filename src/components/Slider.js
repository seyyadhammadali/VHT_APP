import React, { useRef, useState, useCallback } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../constants/colors';
 
const { width: SCREEN_WIDTH } = Dimensions.get('window');
 
const Slider = ({
  images = [],
  height = 200,
  loading = false,
  onImagePress,
  placeholderText = 'No banner found.',
}) => {
  const progress = useSharedValue(0);
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
 
  const onPressPagination = (index) => {
    carouselRef.current?.scrollTo({
      count: index - currentIndex,
      animated: true,
    });
  };
 
  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onImagePress?.(item)}
        style={[styles.carouselItem, { width: SCREEN_WIDTH, height }]}
      >
        <Image
          source={{
            uri:
              item?.large ||
              item?.image ||
              'https://via.placeholder.com/400x200?text=No+Image',
          }}
          style={styles.carouselImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
    ),
    [height, onImagePress]
  );
 
  if (loading) {
    return (
      <SkeletonPlaceholder borderRadius={10}>
        <SkeletonPlaceholder.Item
          width={SCREEN_WIDTH * 0.9}
          height={SCREEN_WIDTH * 0.9 * 0.45}
          borderRadius={10}
          alignSelf="center"
        />
      </SkeletonPlaceholder>
    );
  }
 
  if (!images.length) {
    return <Text style={styles.emptyText}>{placeholderText}</Text>;
  }
 
  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        loop
        width={SCREEN_WIDTH}
        height={height}
        autoPlay
        autoPlayInterval={3000}
        data={images}
        scrollAnimationDuration={1000}
        onProgressChange={(offsetProgress, absoluteProgress) => {
          progress.value = absoluteProgress;
        }}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={renderItem}
      />
 
      <Pagination.Basic
        progress={progress}
        data={images}
        dotStyle={{ backgroundColor: '#c4c4c4ff', borderRadius:'50%' }}
        activeDotStyle={{ backgroundColor: '#313131ff', borderRadius:'50%'}}
        containerStyle={{ gap: 10, marginBottom: 10 }}
        onPress={onPressPagination}
      />
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 2,
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselItem: {
    padding: 10,
    overflow: 'hidden',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    objectFit:'fill',
    borderRadius: 10,
  },
  emptyText: {
    color: colors.mediumGray,
    alignSelf: 'center',
    marginTop: 20,
  },
});
 
export default Slider;
 
 