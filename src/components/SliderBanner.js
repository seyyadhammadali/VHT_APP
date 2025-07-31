
import React, { useRef, useEffect } from 'react';
import { View, FlatList, Dimensions, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const { width } = Dimensions.get('window');
const bannerWidth = width * 0.9;
const bannerHeight = bannerWidth * 0.45;
const sliderInterval = 3000;

const SliderBanner = ({ sliders, loading, navigation }) => {
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    if (!sliders?.length) return;

    const timer = setInterval(() => {
      currentIndex.current = (currentIndex.current + 1) % sliders.length;
      flatListRef.current?.scrollToIndex({
        index: currentIndex.current,
        animated: true,
      });
    }, sliderInterval);

    return () => clearInterval(timer);
  }, [sliders]);
console.log('sliders====================00000000000000000',sliders)
  // 1. Show loading skeleton
  if (loading) {
    return (
      <SkeletonPlaceholder borderRadius={10}>
        <SkeletonPlaceholder.Item
          width={bannerWidth}
          height={bannerHeight}
          borderRadius={10}
          alignSelf="center"
        />
      </SkeletonPlaceholder>
    );
  }
  // 2. Show fallback if no banners
  if (!Array.isArray(sliders) || sliders.length === 0) {
    return (
      <Text style={{ alignSelf: 'center', color: '#666', marginVertical: 10 }}>
        No banners available
      </Text>
    );
  }
  // 3. Show the banner slider
  return (
    <FlatList
      ref={flatListRef}
      data={sliders}
      horizontal
      pagingEnabled
      keyExtractor={(item, index) => `${item.id}-${index}`}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{ marginHorizontal: 10 }}
          onPress={() => {
    if (!item.title) return;

    const packageTitle = item.title
      ? item.title.replace(/\/$/, '').split('/').pop()
      : '';

    console.log('Extracted package title:', packageTitle);

            if (navigation) {
                navigation.navigate('PakageDetails', {
                    packageSlug: packageTitle
                    // packageTitle: packageTitle || 'Details' // Provide a fallback title
                });
            } else {
                console.warn('Navigation prop is missing in SliderBanner or item has no valid link/title:', item);
            }
          }}
        >
          <FastImage
            source={{
              uri: item.mid,
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.immutable,
            }}
            style={{
              width: bannerWidth,
              height: bannerHeight,
              borderRadius: 10,
            }}
            resizeMode={FastImage.resizeMode.cover}
            onError={(e) =>
              console.warn('Image load error:', item.mid, e.nativeEvent)
            }
          />
        </TouchableOpacity>
      )}
      onScrollToIndexFailed={() => {}}
    />
  );
};
export default SliderBanner;















