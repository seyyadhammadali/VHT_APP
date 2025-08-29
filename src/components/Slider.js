 import React, { useRef, useState, useCallback } from 'react';
import { View, Image, StyleSheet, useWindowDimensions, TouchableOpacity, Text } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FastImage from 'react-native-fast-image';
const Slider = ({
  images = [],
  height = null,
  width = null,
  loading = false,
  onImagePress,
  placeholderText = '',
}) => {
  const { width: windowWidth } = useWindowDimensions();
  const SCREEN_WIDTH = width?width:windowWidth;
  const SCREEN_HEIGHT = height?height:(SCREEN_WIDTH * 0.4);
 
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
        style={styles.carouselItem}
      >
         <FastImage
            source={{
            uri:
              item?.large ||
              item?.image ||
              'https://via.placeholder.com/400x200?text=No+Image',
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}
          style={styles.carouselImage}
        resizeMode={FastImage.resizeMode.stretch}
      />
      </TouchableOpacity>
    ),
    [SCREEN_HEIGHT,SCREEN_WIDTH, onImagePress]
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
 

 
  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        loop
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        autoPlay
        autoPlayInterval={3000}
        data={images}
        scrollAnimationDuration={1000}
        onProgressChange={(offsetProgress, absoluteProgress) => {
          progress.value = absoluteProgress;
        }}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={renderItem}
         // The authentic method for handling nested scrolls
        onConfigurePanGesture={(PanGesture) => {
          'worklet';
          // Actively fail this gesture if vertical movement is detected
          PanGesture.failOffsetY([-5, 5]);
          // Actively activate this gesture only for horizontal movement
          PanGesture.activeOffsetX([-5, 5]);
        }}
      />
 
      <Pagination.Basic
        progress={progress}
        data={images}
        dotStyle={{ backgroundColor: '#c4c4c4ff', borderRadius:'50%' }}
        activeDotStyle={{ backgroundColor: '#313131ff', borderRadius:'50%'}}
        containerStyle={{ gap: 10,marginTop: 10 }}
        onPress={onPressPagination}
      />
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselItem: {
     borderRadius: 10,
     overflow: 'hidden',
  },
  carouselImage: {
    height: '100%',
  },

});
 
export default Slider;