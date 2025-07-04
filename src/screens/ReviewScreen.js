import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
// import Video from 'react-native-video';

const { width } = Dimensions.get('window');

const redPlayButton = require('../assets/images/whiteHome.png'); // Play icon PNG
const videoThumb = require('../assets/images/videoThumb2.png'); // Thumbnail

const videoData = [
  {
    id: 1,
    title: 'Live Beach Cam',
    thumbnail: videoThumb,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  // {
  //   id: 2,
  //   title: 'Resort Walkthrough',
  //   thumbnail: videoThumb,
  //   videoUrl: 'https://www.w3schools.com/html/movie.mp4',
  // },
];

export default function LiveVideoScreen({ navigation }) {
  const [playingId, setPlayingId] = useState(null);

  const renderVideoItem = ({ item }) => (
    <View style={styles.videoContainer}>
      {/* {playingId === item.id ? (
        <Video
          source={{ uri: item.videoUrl }}
          style={styles.video}
          resizeMode="cover"
          controls
          onEnd={() => setPlayingId(null)}
        />
      ) : (
        <>
          <Image source={item.thumbnail} style={styles.thumbnail} />
          <TouchableOpacity
            style={styles.playButtonContainer}
            onPress={() => setPlayingId(item.id)}
          >
            <Image source={redPlayButton} style={styles.playButton} />
          </TouchableOpacity>
        </>
      )} */}
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Text style={styles.backText}>{'<'} Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Live Video Reviews</Text>
      </View>

      <ScrollView>
        <FlatList
          data={videoData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderVideoItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        />
        {/* Add review list here below */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#C28D3E',
    fontSize: 16,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  videoContainer: {
    width: width * 0.8,
    height: 220,
    marginRight: 15,
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  playButtonContainer: {
    position: 'absolute',
    top: '40%',
    left: '40%',
    zIndex: 10,
  },
  playButton: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  title: {
    position: 'absolute',
    bottom: 8,
    left: 10,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    borderRadius: 5,
    fontSize: 12,
  },
});
