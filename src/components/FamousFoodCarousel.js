import React, { useRef, useState, useCallback, memo } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import RenderHTML from 'react-native-render-html';
import { useSharedValue } from 'react-native-reanimated';
 
import RightIcon from '../assets/images/Rightarrow.svg';
import LeftIcon from '../assets/images/Leftarrow.svg';
import colors from '../constants/colors';
 
const { width } = Dimensions.get('window');
 
// Shared tag styles for HTML content
const baseTagStyles = {
  p: { fontSize: 14, textAlign: 'center', paddingBottom: 0 },
  h1: {
    backgroundColor: 'rgba(1, 190, 158, 0.08)',
    color: colors.darkGray,
    fontWeight: 'bold',
    fontSize: 16,
    borderRadius: 6,
    textAlign: 'center',
  },
  h2: {
    color: colors.darkGray,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  strong: { fontWeight: 'bold', color: 'rgba(3, 3, 3, 0.08)' },
  em: { fontStyle: 'italic' },
  li: { fontSize: 14, color: 'gray', marginLeft: 10, marginBottom: 3 },
  a: { color: 'blue', textDecorationLine: 'underline' },
};
 
// Arrow button component
const ArrowButton = memo(({ direction, onPress, disabled }) => {
  const Icon = direction === 'left' ? LeftIcon : RightIcon;
  return (
    <TouchableOpacity
      style={[styles.arrowButton, direction === 'left' ? styles.leftArrow : styles.rightArrow]}
      onPress={onPress}
      disabled={disabled}
    >
      <Icon width={25} height={25} />
    </TouchableOpacity>
  );
});
 
// Slide item component
const SlideItem = memo(({ item }) => (
  <View style={styles.slideItem}>
    <Image
      source={{ uri: item.image || 'https://via.placeholder.com/400x200?text=No+Image' }}
      style={styles.sliderImage}
    />
    <View style={styles.sliderContent}>
      <Text style={styles.sliderTitle}>{item.title}</Text>
      <RenderHTML
        contentWidth={width}
        source={{ html: item.description || item.details || '' }}
        tagsStyles={{ p: { fontSize: 14, lineHeight: 16, marginTop: 5 } }}
      />
    </View>
  </View>
));
 
export default function FamousFoodCarousel({ title = '', data = [] }) {
  if (!data.length) return null;
 
  const carouselRef = useRef(null);
  const progress = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
 
  const renderItem = useCallback(({ item }) => <SlideItem item={item} />, []);
 
  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
        <RenderHTML
          contentWidth={width}
          source={{
            html: title || `<h2>📍Famous Foods</h2>`,
          }}
          tagsStyles={baseTagStyles}
        />
      </View>
 
      <View style={styles.sliderSection}>
        <Carousel
          ref={carouselRef}
          data={data}
          loop={false}
          width={width}
          height={320}
          scrollAnimationDuration={500}
          onProgressChange={progress}
          onSnapToItem={setCurrentIndex}
          renderItem={renderItem}
          style={styles.carouselContainer}
        />
 
        <ArrowButton
          direction="left"
          onPress={() => carouselRef.current?.prev()}
          disabled={currentIndex === 0}
        />
        <ArrowButton
          direction="right"
          onPress={() => carouselRef.current?.next()}
          disabled={currentIndex === data.length - 1}
        />
      </View>
      </View>
    </>
  );
}
 
const styles = StyleSheet.create({
  container:{
    marginVertical:10
  },
  titleWrapper: { marginBottom: 10 },
  sliderSection: { position: 'relative' },
  carouselContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom:10
  },
  arrowButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -25 }],
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 10,
  },
  leftArrow: { left: 5 },
  rightArrow: { right: 5 },
  slideItem: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  sliderImage: {
    width: '100%',
    height: 210,
    resizeMode: 'cover',
  },
  sliderContent: {
    padding: 15,
    flex: 1,
  },
  sliderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
});