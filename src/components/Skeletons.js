// Skeletons.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const SLIDER_WIDTH = width;
const SLIDER_HEIGHT = width * 0.5;
const HOLIDAY_CARD_WIDTH = 280;

export const TopDestinationsSkeleton = () => (
  <View style={styles.skeletonContainer}>
    <SkeletonPlaceholder>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
        {[...Array(5)].map((_, index) => (
          <View key={index} style={{ alignItems: 'center' }}>
            <SkeletonPlaceholder.Item width={60} height={60} borderRadius={30} />
            <SkeletonPlaceholder.Item width={50} height={10} borderRadius={4} marginTop={6} />
          </View>
        ))}
      </View>
    </SkeletonPlaceholder>
  </View>
);

export const HolidaySectionSkeleton = () => (
  <View style={styles.skeletonContainer}>
    <SkeletonPlaceholder>
      <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
        {[...Array(2)].map((_, index) => (
          <View key={index} style={[styles.holidayCard, { width: HOLIDAY_CARD_WIDTH, marginRight: 15 }]}>
            <SkeletonPlaceholder.Item width={HOLIDAY_CARD_WIDTH} height={170} borderTopLeftRadius={20} borderTopRightRadius={20} />
            <SkeletonPlaceholder.Item padding={8}>
              <SkeletonPlaceholder.Item width={180} height={15} borderRadius={4} />
              <SkeletonPlaceholder.Item width={120} height={12} borderRadius={4} marginTop={6} />
              <SkeletonPlaceholder.Item width={150} height={12} borderRadius={4} marginTop={6} />
            </SkeletonPlaceholder.Item>
          </View>
        ))}
      </View>
    </SkeletonPlaceholder>
  </View>
);

export const SafariBannerSkeleton = () => (
  <View style={styles.skeletonContainer}>
    <SkeletonPlaceholder>
      <View style={{ width: width - 20, height: 180, borderRadius: 10, alignSelf: 'center' }} />
    </SkeletonPlaceholder>
  </View>
);

const styles = StyleSheet.create({
  skeletonContainer: {
    paddingVertical: 10,
  },
  holidayCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
});