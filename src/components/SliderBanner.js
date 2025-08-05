
import React, { useRef, useEffect } from 'react';
import { View, FlatList, Dimensions, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SLIDER_CONFIG, AUTO_SCROLL_INTERVALS, PAGINATION_STYLES, getResponsiveDimensions } from '../constants/sliderConfig';

const { width } = Dimensions.get('window');
const bannerConfig = getResponsiveDimensions('BANNER');
const sliderInterval = AUTO_SCROLL_INTERVALS.BANNER;

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

  // 1. Show loading skeleton
  if (loading) {
    return (
      <SkeletonPlaceholder borderRadius={bannerConfig.BORDER_RADIUS}>
        <SkeletonPlaceholder.Item
          width={bannerConfig.WIDTH}
          height={bannerConfig.HEIGHT}
          borderRadius={bannerConfig.BORDER_RADIUS}
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
          style={{ marginHorizontal: 0 }}
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
              uri: item.mid || 'https://via.placeholder.com/400x200?text=No+Image',
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.immutable,
            }}
            style={{
              width: bannerConfig.WIDTH,
              height: bannerConfig.HEIGHT,
              borderRadius: bannerConfig.BORDER_RADIUS,
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















