
import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useDispatch, useSelector } from 'react-redux';
import { fetchYoutubeVideos, fetchReviewComments } from '../redux/slices/reviewSlice';
import Header from '../components/Header';
import colors from '../constants/colors';
import FooterTabs from '../components/FooterTabs';
 
const { width } = Dimensions.get('window');
 
const VIDEO_WIDTH = width - 30;
const VIDEO_HEIGHT = (VIDEO_WIDTH * 9) / 16;
const PLACEHOLDER_IMG = 'https://placehold.co/100x100?text=User';
const STARS = [0, 1, 2, 3, 4];
 
export default function Reviews({ navigation }) {
  const dispatch = useDispatch();
  const { youtubeVideos, comments, loading } = useSelector((state) => state.reviews);
  const playerRef = useRef(null);
 
  useEffect(() => {
    dispatch(fetchYoutubeVideos());
    dispatch(fetchReviewComments());
  }, [dispatch]);
 
  const renderVideoItem = useCallback(({ item }) => (
    <View style={styles.videoContainer}>
      <YoutubePlayer
        ref={playerRef}
        height={VIDEO_HEIGHT}
        width={VIDEO_WIDTH}
        play={false}
        videoId={item.code}
        mute={false}
        forceAndroidAutoplay={false}
        webViewStyle={{ opacity: 0.99 }}
      />
    </View>
  ), []);
 
  const renderReviewItem = useCallback(({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Image
          source={{ uri: item.customer_image || PLACEHOLDER_IMG }}
          style={styles.profilePic}
        />
        <View>
          <Text style={styles.name}>{item.customer_name}</Text>
          <Text style={styles.date}>{item.publish_date}</Text>
        </View>
      </View>
      <Text style={styles.reviewText}>{item.message}</Text>
      <View style={styles.ratingContainer}>
        <View style={styles.starRow}>
          {STARS.map((_, i) => (
            <Image
              key={i}
              source={require('../assets/images/star.png')}
              style={[
                styles.starIcon,
                i >= item.rating && styles.emptyStar
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  ), []);
 
  if (loading) {
    return (
      <View style={styles.safeArea}>
        <Header title="Reviews" showNotification navigation={navigation} />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </View>
    );
  }
 
  return (
    <View style={styles.safeArea}>
      <Header title="Top Reviews" showNotification navigation={navigation} />
      <FlatList
        ListHeaderComponent={
          <FlatList
            data={youtubeVideos}
            renderItem={renderVideoItem}
            keyExtractor={(item) => String(item.id)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.videoListContent}
            decelerationRate="fast"
          />
        }
        data={comments}
        renderItem={renderReviewItem}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={styles.footerSpace} />}
      />
      <FooterTabs></FooterTabs>
    </View>
  );
}
 
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    marginBottom: 0
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoListContent: {
    paddingVertical: 12,
  },
  videoContainer: {
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
    marginRight: 10,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 24,
  },
  reviewCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  profilePic: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    backgroundColor: colors.lightGray,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.darkText,
  },
  date: {
    fontSize: 12,
    color: colors.gray,
  },
  reviewText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 2,
    tintColor: colors.star,
  },
  emptyStar: {
    tintColor: colors.lightGray,
  },
  footerSpace: {
    height: 24,
  },
});