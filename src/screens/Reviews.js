import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity, 
  useWindowDimensions
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Header from '../components/Header';
import FooterTabs from '../components/FooterTabs';
import { COLORS, mainStyles } from '../constants/theme';
import { useGetReviewsQuery, useGetYoutubeVideosQuery } from '../redux/slices/apiSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';


export default function Reviews({ navigation }) {
  const { width } = useWindowDimensions();
  const VIDEO_WIDTH = width - 40;
  const VIDEO_HEIGHT = (VIDEO_WIDTH * 9) / 16;
  const PLACEHOLDER_IMG = 'https://placehold.co/100x100?text=User';
  const STARS = [0, 1, 2, 3, 4];
  const { data:reviewsData, isLoading:loading  } = useGetReviewsQuery();
  const { data:videosData, isLoading:youtubeloading  } = useGetYoutubeVideosQuery();
  const comments = reviewsData?.data || [];
  const youtubeVideos = videosData?.data;
  const playerRef = useRef(null);
  const [visibleReviewCount, setVisibleReviewCount] = useState(5);


  const handleLoadMore = () => {
    setVisibleReviewCount((prevCount) => prevCount + 5);
  };
  const renderLoadMoreButton = () => {
    if (visibleReviewCount < comments.length) {
      return (
        <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>
      );
    }
    return null; 
  };

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

  
  const visibleComments = comments.slice(0, visibleReviewCount);

  return (
    <SafeAreaView style={mainStyles.safeArea} edges={['bottom', 'left', 'right']}>
      <Header title={'Top Reviews'}/>
      {loading?(
        <>
          <SkeletonPlaceholder >
            <SkeletonPlaceholder.Item height={180} margin={20} borderRadius={10} />
            <SkeletonPlaceholder.Item height={50} marginVertical={10} marginHorizontal={20} borderRadius={10} />
            <SkeletonPlaceholder.Item height={220} marginVertical={5} marginHorizontal={20} borderRadius={10} />
            <SkeletonPlaceholder.Item height={200} marginVertical={5} marginHorizontal={20} borderRadius={10} />
          </SkeletonPlaceholder>
        </>
      ):(
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
        data={visibleComments} 
        renderItem={renderReviewItem}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={mainStyles.contentContainer}
        showsVerticalScrollIndicator={false}
        style={mainStyles.container}
        ListFooterComponent={renderLoadMoreButton}
      />
      )}
      <FooterTabs/>
     
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    marginBottom: 0
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoListContent: {
    paddingVertical: 10,
  },
  videoContainer: {
    width: "auto",
    height: "auto",
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
    marginRight: 10,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom:80
  },
  reviewCard: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    boxShadow: '0px 2px 45px 0px #1B1B4D14'
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profilePic: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    backgroundColor: COLORS.lightGray,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.darkText,
    fontFamily:'Inter-Bold'
  },
  date: {
    fontSize: 12,
    color: COLORS.gray,
  },
  reviewText: {
    fontSize: 16,
    color: COLORS.secondary,
    lineHeight: 20,
    marginBottom: 15,
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
    width: 18,
    height: 18,
    marginRight: 2,
    tintColor: COLORS.star,
  },
  emptyStar: {
    tintColor: COLORS.lightGray,
  },
  loadMoreButton: {
    backgroundColor: COLORS.black,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },
  loadMoreText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});