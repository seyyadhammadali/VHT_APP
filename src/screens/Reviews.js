import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { WebView } from 'react-native-webview';
const { width } = Dimensions.get('window');
import  Header from '../components/Header';
// Images
const redPlayButton = require('../assets/images/redbuttton.png');
const videoThumb = require('../assets/images/vedeoThumbOne.png');
const profileImage = require('../assets/images/profileperson.png'); 
const likeIcon = require('../assets/images/LikeIcon.png');
const commentIcon = require('../assets/images/disLikeIcon.png');
const starIcon = require('../assets/images/star.png');
const logo = require('../assets/images/Logo.png')
const videoData = [
  { 
    id: 1, 
    title: 'Beach Cam', 
    thumbnail: videoThumb,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  { 
    id: 2, 
    title: 'Hotel View', 
    thumbnail: videoThumb,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  { 
    id: 3, 
    title: 'Resort Tour', 
    thumbnail: videoThumb,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
];
const reviewData = [
  {
    id: 1,
    name: 'Ricardo Smith',
    date: '17th May, 2022',
    text:
      'Hi, its Ricardo here. I am happy to say Vlrkison Holidays provided excellent service, from booking to accommodations. Their staff was knowledgeable and helpful, making our trip stress-free and enjoyable. Highly recommended.',
    stars: 5.0,
    likes: 50,
    comments: 2,
    profile: profileImage,
     rating:5.00
  },
  {
    id: 2,
    name: 'Ricardo Smith',
    date: '17th May, 2022',
    text:
      'Hi, its Ricardo here. I am happy to say Vlrkison Holidays provided excellent service, from booking to accommodations. Their staff was knowledgeable and helpful, making our trip stress-free and enjoyable. Highly recommended.',
    stars: 5,
    likes: 50,
    comments: 2,
    profile: profileImage,
    rating:5.00
  },
   {
    id: 3,
    name: 'Ricardo Smith',
    date: '17th May, 2022',
    text:
      'Hi, its Ricardo here. I am happy to say Vlrkison Holidays provided excellent service, from booking to accommodations. Their staff was knowledgeable and helpful, making our trip stress-free and enjoyable. Highly recommended.',
    stars: 5,
    likes: 50,
    comments: 2,
    profile: profileImage,
    rating:5.00
  },
];
export default function Reviews({ navigation }) {
  const [playingVideo, setPlayingVideo] = useState(null);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const handleVideoPress = (videoId) => {
    if (playingVideo === videoId) {
      setPlayingVideo(null);
    } else {
      setLoadingVideo(true);
      setPlayingVideo(videoId);
    }
  };
  const onVideoEnd = () => {
    setPlayingVideo(null);
  };
  const onVideoError = (error) => {
    console.log('Video error:', error);
    setPlayingVideo(null);
    setLoadingVideo(false);
  };
  const onVideoLoad = () => {
    setLoadingVideo(false);
  };
  // const renderVideoItem = ({ item }) => {
  //   const isPlaying = playingVideo === item.id; 
  //   const htmlContent = `
  //     <!DOCTYPE html>
  //     <html>
  //       <head>
  //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //         <style>
  //           body { margin: 0; padding: 0; background: #000; }
  //           video { 
  //             width: 100%; 
  //             height: 100vh; 
  //             object-fit: cover;
  //             background: #000;
  //           }
  //         </style>
  //       </head>
  //       <body>
  //         <video 
  //           controls 
  //           autoplay 
  //           onended="window.ReactNativeWebView.postMessage('videoEnded')"
  //           onerror="window.ReactNativeWebView.postMessage('videoError')"
  //         >
  //           <source src="${item.videoUrl}" type="video/mp4">
  //           Your browser does not support the video tag.
  //         </video>
  //       </body>
  //     </html>
  //   `;

  //   return (
  //     <View style={styles.videoBox}>
  //       {isPlaying ? (
  //         <WebView
  //           source={{ html: htmlContent }}
  //           style={styles.videoPlayer}
  //           allowsInlineMediaPlayback={true}
  //           mediaPlaybackRequiresUserAction={false}
  //           onLoad={onVideoLoad}
  //           onError={onVideoError}
  //           onMessage={(event) => {
  //             if (event.nativeEvent.data === 'videoEnded') {
  //               onVideoEnd();
  //             }
  //           }}
  //         />
  //       ) : (
  //         <Image source={item.thumbnail} style={styles.videoThumb} />
  //       )}
  //       {!isPlaying && (
  //         <TouchableOpacity 
  //           style={styles.playButton}
  //           onPress={() => handleVideoPress(item.id)}
  //         >
  //           <Image source={redPlayButton} style={styles.playImage} />
  //         </TouchableOpacity>
  //       )}
  //     </View>
  //   );
  // };
 const renderVideoItem = ({ item }) => {
  const isPlaying = playingVideo === item.id;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { margin: 0; padding: 0; background: #000; }
          video { 
            width: 100%; 
            height: 100vh; 
            object-fit: cover;
            background: #000;
          }
        </style>
      </head>
      <body>
        <video 
          controls 
          autoplay 
          onended="window.ReactNativeWebView.postMessage('videoEnded')"
          onerror="window.ReactNativeWebView.postMessage('videoError')"
        >
          <source src="${item.videoUrl}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </body>
    </html>
  `;

  return (
    <View style={styles.videoBox}>
      {isPlaying ? (
        <WebView
          source={{ html: htmlContent }}
          style={styles.videoPlayer}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          onLoad={onVideoLoad}
          onError={onVideoError}
          onMessage={(event) => {
            if (event.nativeEvent.data === 'videoEnded') {
              onVideoEnd();
            }
          }}
        />
      ) : (
        <Image source={item.thumbnail} style={styles.videoThumb} />
      )}
      <Image source={logo} style={styles.videoLogo} />
      {!isPlaying && (
        <TouchableOpacity 
          style={styles.playButton}
          onPress={() => handleVideoPress(item.id)} >
          <Image source={redPlayButton} style={styles.playImage} />
        </TouchableOpacity>
      )}
    </View>
  );
};
  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Image source={item.profile} style={styles.profilePic} />
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </View>
      <Text style={styles.reviewText}>{item.text}</Text>
      <View style={styles.starRow}>
        {[...Array(item.stars)].map((_, i) => (
          <Image key={i} source={starIcon} style={styles.starIcon} />
        ))}
        <Text>{item.rating}</Text>
         <View style={styles.engagementRow}>
        <View style={styles.iconWithText}>
          <Image source={likeIcon} style={styles.engagementIcon} />
          <Text>{item.likes}</Text>
        </View>
                <View style={styles.iconWithText}>
          <Image source={commentIcon} style={styles.engagementIcon} />
          <Text>{item.comments}</Text>
        </View>
      </View>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
           <Header title="Reviews" showNotification={true} navigation={navigation} />
      <View style={styles.secBox}>
        <FlatList
  ListHeaderComponent={
    <>
      <FlatList
        data={videoData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderVideoItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.videoList}
      />
      <View style={{ height: 20 }} /> 
    </>
  }
  data={reviewData}
  keyExtractor={(item) => item.id.toString()}
  renderItem={renderReviewItem}
  contentContainerStyle={styles.listContent}
  showsVerticalScrollIndicator={false}
  ListFooterComponent={<View style={{ height: 60 }} />}
/>
        </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
paddingBottom:100
  },
  videoList: {
  },
  videoBox: {
    width: width * 0.7,
    height: 200,
    borderRadius: 10,
    marginRight: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
    position: 'relative',
  },
  videoThumb: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  playButton: {
    position: 'absolute',
    top: '40%',
    left: '40%',
    zIndex: 2,
  },
  playImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  reviewCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 0.6,
    shadowOpacity:50,
    shadowColor:'black',
    blur:20,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  date: {
    fontSize: 12,
    color: '#777',
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    lineHeight:20,
    letterSpacing:1
  },
  starRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  starIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  engagementRow: {
    flexDirection: 'row',
    marginLeft:"auto",
    gap: 15,
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  engagementIcon: {
    width: 24,
    height: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    paddingVertical: 20,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
    padding: 6,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: 'gray',
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10,
  },
  secBox:{
    marginTop:10
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
  videoLogo: {
  position: 'absolute',
  top: 8,
  left: 8,
  width: 120,
  height: 20,
  resizeMode: 'contain',
  zIndex: 3,
},
});
