import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { fetchYoutubeVideos, fetchReviewComments } from '../redux/slices/reviewSlice';
import Header from '../components/Header';
import colors from '../constants/colors';

const { width } = Dimensions.get('window');
const VIDEO_HEIGHT = 200; // Fixed video height
const VIDEO_WIDTH = width * 0.9; // 90% of screen width

// Replace these with your actual icon imports
const likeIcon = require('../assets/images/LikeIcon.png');
const commentIcon = require('../assets/images/disLikeIcon.png');
const starIcon = require('../assets/images/star.png');

export default function Reviews({ navigation }) {
  const dispatch = useDispatch();
  const { youtubeVideos, comments, loading } = useSelector((state) => state.reviews);
  const [playingVideo, setPlayingVideo] = useState(null);

  useEffect(() => {
    dispatch(fetchYoutubeVideos());
    dispatch(fetchReviewComments());
  }, [dispatch]);

  const renderVideoItem = ({ item }) => {
    const videoUrl = `https://www.youtube.com/embed/${item.code}`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
          <style>
            body { margin: 0; padding: 0; background: #000; overflow: hidden; }
            iframe {
              width: 100%;
              height: 100%;
              border: none;
            }
            .container {
              width: 100%;
              height: 100%;
              position: relative;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <iframe 
              src="${videoUrl}?autoplay=1&controls=1&modestbranding=1" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
            ></iframe>
          </div>
        </body>
      </html>
    `;

    return (
      <View style={styles.videoContainer}>
        <WebView
          source={{ html: htmlContent }}
          style={styles.videoPlayer}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          allowsFullscreenVideo={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scrollEnabled={false}
        />
      </View>
    );
  };

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Image 
          source={{ uri: item.customer_image || 'https://placehold.co/100x100?text=User' }} 
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
          {[...Array(5)].map((_, i) => (
            <Image 
              key={i} 
              source={i < item.rating ? starIcon : starIcon} 
              style={[styles.starIcon, i >= item.rating && styles.emptyStar]} 
            />
          ))}
        </View>
        {/* <View style={styles.engagementRow}>
          <TouchableOpacity style={styles.actionButton}>
            <Image source={likeIcon} style={styles.actionIcon} />
            <Text style={styles.actionCount}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Image source={commentIcon} style={styles.actionIcon} />
            <Text style={styles.actionCount}>0</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header title="Reviews" showNotification={true} navigation={navigation} />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Top Reviews" showNotification={true} navigation={navigation} />
      <FlatList
        ListHeaderComponent={
          <>
            <FlatList
              data={youtubeVideos}
              renderItem={renderVideoItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.videoListContent}
              decelerationRate="fast"
            />
            <View style={styles.sectionDivider} />
          
          </>
        }
        data={comments}
        renderItem={renderReviewItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={styles.footerSpace} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoListContent: {
    paddingHorizontal: 10,
    paddingTop: 12,
    paddingBottom: 8,
  },
  videoContainer: {
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
    borderRadius: 8,
    marginRight: 10,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  videoPlayer: {
    width: '100%',
    height: 350,
   
  },
  sectionDivider: {
    height: 16,
    backgroundColor: colors.lightGray,
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  listContent: {
    paddingHorizontal: 16,
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
  engagementRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  actionIcon: {
    width: 18,
    height: 18,
    marginRight: 4,
    tintColor: colors.gray,
  },
  actionCount: {
    fontSize: 12,
    color: colors.gray,
  },
  footerSpace: {
    height: 24,
  },
});
