import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';

const { width: windowWidth } = Dimensions.get('window');
const SLIDER_WIDTH = windowWidth;

const Slider = ({ images, height = 250, onImagePress }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / SLIDER_WIDTH);
    setActiveIndex(index);
  };

  const handleDotPress = (index) => {
    setActiveIndex(index);
    scrollViewRef.current.scrollTo({ x: index * SLIDER_WIDTH, animated: true });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % images.length;
      handleDotPress(nextIndex);
    }, 3000); // Auto-scroll every 3 seconds
    return () => clearInterval(interval);
  }, [activeIndex, images.length]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, { height }]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ width: SLIDER_WIDTH }}
      >
        {images.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => onImagePress && onImagePress(image)} activeOpacity={0.9}>
            <Image
              source={{ uri: image.image || image }}
              style={[styles.image, { height, width: SLIDER_WIDTH }]}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <TouchableOpacity key={index} onPress={() => handleDotPress(index)}>
            <View
              style={[
                styles.dot,
                {
                  backgroundColor: index === activeIndex ? colors.gold : colors.white,
                  width: index === activeIndex ? 12 : 8,
                  height: index === activeIndex ? 12 : 8,
                  borderRadius: index === activeIndex ? 6 : 4,
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 16,
  },
  image: {
    alignSelf: 'center',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: colors.gold,
  },
});

export default Slider; 