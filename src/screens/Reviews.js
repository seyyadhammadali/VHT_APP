import React from 'react';
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
const { width } = Dimensions.get('window');
import  Header from '../components/Header';
// Images
const redPlayButton = require('../assets/images/redbuttton.png');
const videoThumb = require('../assets/images/vedeoThumbOne.png');
const profileImage = require('../assets/images/profileperson.png'); // Add a profile pic or placeholder
const likeIcon = require('../assets/images/LikeIcon.png');
const commentIcon = require('../assets/images/disLikeIcon.png');
const starIcon = require('../assets/images/star.png');
// Data
const videoData = [
  { id: 1, title: 'Beach Cam', thumbnail: videoThumb },
  { id: 2, title: 'Hotel View', thumbnail: videoThumb },
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
  const renderVideoItem = ({ item }) => (
    <View style={styles.videoBox}>
      <Image source={item.thumbnail} style={styles.videoThumb} />
      <TouchableOpacity style={styles.playButton}>
        <Image source={redPlayButton} style={styles.playImage} />
      </TouchableOpacity>
    </View>
  );
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
            {/* Header */}
          <Header title="Reviews" showNotification={true} />
      <View style={styles.secBox}>
              <FlatList
        ListHeaderComponent={
          <>
<>
  <FlatList
    data={videoData}
    keyExtractor={(item) => item.id.toString()}
    renderItem={renderVideoItem}
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.videoList}
  />
  {/* Add spacing between video section and reviews */}
  <View style={{ height: 40 }} />
</>
          </>
        }
        data={reviewData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderReviewItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
marginBottom:100
  },

  videoList: {
    // paddingLeft: 10,
  },
  videoBox: {
    width: width * 0.7,
    height: 200,
    borderRadius: 10,
    marginRight: 5,
    overflow: 'hidden',
    backgroundColor: '#000',
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
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 0.6,
    shadowOpacity:50,
    shadowColor:'black',
    blur:20,
  
      // overflow: 'hidden',
    // backgroundColor: '#000',
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
    // justifyContent: 'flex-start',
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
    // letterSpacing: 1,
  },
  secBox:{
    marginTop:10
  }
});
