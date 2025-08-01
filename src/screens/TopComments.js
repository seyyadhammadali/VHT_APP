
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSinglePost,
  selectSinglePost,
  selectBlogsLoading,
} from '../redux/slices/BlogSlice';
import FastImage from 'react-native-fast-image';
import RenderHtml from 'react-native-render-html';
import Header from '../components/Header';
import colors from '../constants/colors'; // Make sure your colors.js has the desired color
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AuthorProfile from '../assets/images/AuthorProfile.png';
import BlueMsg from '../assets/images/bluemsg.svg';

const { width } = Dimensions.get('window');

const TopComments = ({ route, navigation }) => {
  const { postId } = route.params;
  const dispatch = useDispatch();
  const singlePost = useSelector(selectSinglePost);
  const loading = useSelector(selectBlogsLoading);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);

  useEffect(() => {
    if (postId) {
      dispatch(fetchSinglePost(postId));
    }
  }, [dispatch, postId]);

  if (loading || !singlePost) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header title="Loading..." showNotification={true} navigation={navigation} />
        <ScrollView>
          <SkeletonPlaceholder>
            <View style={{ width: width, height: 300 }} />
            <View style={{ padding: 20 }}>
              <View style={{ width: '90%', height: 30, borderRadius: 4, marginBottom: 10 }} />
              <View style={{ width: '60%', height: 20, borderRadius: 4, marginBottom: 20 }} />
              <View style={{ width: '100%', height: 100, borderRadius: 4, marginBottom: 10 }} />
              <View style={{ width: '100%', height: 100, borderRadius: 4 }} />
            </View>
          </SkeletonPlaceholder>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Blog Post" showNotification={true} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.container}>
        <FastImage
          source={{ uri: singlePost.banner }}
          style={styles.fullWidthImage}
        />
        <View style={styles.mainContentArea}>
          <View style={styles.titleDateSection}>
            <View style={styles.topTextView}>
              <Image style={styles.locationIcon} source={require('../assets/images/LocationIcon.png')} />
              <Text style={styles.sectionTitle}> {singlePost.title}</Text>
            </View>
            <Text style={styles.dateStyle}>{singlePost.publish_date} | Latest News</Text>
          </View>

          <RenderHtml
            contentWidth={width - 40}
            source={{ html: singlePost.description }}
            tagsStyles={{
              h2: { color: colors.gold, fontWeight: 'bold', fontSize: 20, marginVertical: 10 },
              h3: { color: colors.darkGray, fontWeight: 'bold', fontSize: 18, marginVertical: 8 },
              // IMPORTANT: Set the color here for all <p> tags
              p: { color: colors.gray, fontSize: 14, lineHeight: 22 }, // Changed to colors.black for consistency
              a: { color: colors.primary, textDecorationLine: 'underline' },
            }}
          />

          <View style={styles.aboutAuthorContainer}>
            <View style={styles.aboutAuthorHeader}>
              <FastImage source={AuthorProfile} style={styles.authorImage} />
              <Text style={styles.aboutAuthorTitle}>About Author</Text>
            </View>
            <Text style={styles.authorBio}>
              <Text style={styles.authorName}>{singlePost.author || 'Virikson Holidays'}</Text> a veteran travel writer and advisor, is highly known for her quest to explore the spectacular locales of the globe.
            </Text>
          </View>

          <View style={styles.leaveReplyContainer}>
            <View style={[styles.aboutAuthorHeader,{backgroundColor:'#0069CA14'}]}>
              <BlueMsg style={styles.leaveReplyIcon} />
              <Text style={styles.leaveReplyTitle}>Leave a Reply</Text>
            </View>
            <Text style={styles.requiredFieldsText}>
              Your email address will not be published. Required fields are marked <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <Text style={styles.lableStyle}>Comment</Text>
            <TextInput
              style={styles.commentInput}
              placeholder="Write your thoughts here..."
              multiline
              numberOfLines={4}
              value={comment}
              onChangeText={setComment}
              placeholderTextColor="#888"
            />
            <Text style={styles.lableStyle}>Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Your Full Name Here"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#888"
            />
            <Text style={styles.lableStyle}>Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Your Email Address Here"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#888"
            />
            <Text style={styles.lableStyle}>Website</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Your Website Here"
              value={website}
              onChangeText={setWebsite}
              placeholderTextColor="#888"
            />

            <TouchableOpacity style={styles.checkboxContainer} onPress={() => setSaveInfo(!saveInfo)}>
              <View style={styles.checkbox}>
                {saveInfo && <Text style={styles.checkboxCheck}>✓</Text>}
              </View>
              <Text style={styles.checkboxText}>
                Save my name, email, and website in this browser for the next time I comment.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.postCommentButton}>
              <Text style={styles.postCommentText}>Post Comment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    // This is contentContainerStyle, which applies to the content *inside* the ScrollView.
  },
  fullWidthImage: {
    width: width,
    height: 300,
    resizeMode: 'contain',
  },
  topTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginBottom: 20 // This causes the gap between title and date. Consider if this is intended for the icon itself.
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  viriksonHoliday: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 8,
  },
  mainContentArea: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 0,
    marginTop: -40, // This creates the overlapping effect, keep this.
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  titleDateSection: {
    marginBottom: 15,
  },
  mainTitleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  dateStyle: {
    fontSize: 10,
    color: '#888',
    marginTop: 40, // This is causing the date to be far from the title.
    position: "absolute",
    right: 0
  },
  aboutAuthorContainer: {
    // backgroundColor: '#F7F7F7',
    borderRadius: 10,
    padding: 5,
    marginBottom: 20,
    marginTop: 20,
  },
  aboutAuthorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#C28D3E14',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius:10
  },
  authorImage: {
    width: 11,
    height: 14,
    borderRadius: 15,
    marginRight: 10,
  },
  aboutAuthorTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#101010',
  },
  authorName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  authorBio: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  leaveReplyContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    marginBottom: 20,
  },
  leaveReplyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  leaveReplyIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  leaveReplyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  requiredFieldsText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 15,
  },
  commentInput: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#eee',
  },
  textInput: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#eee',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#C28D3E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginRight: 10,
  },
  checkboxCheck: {
    color: '#C28D3E',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxText: {
    fontSize: 13,
    color: '#555',
    flexShrink: 1,
  },
  postCommentButton: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    width: '75%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  postCommentText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lableStyle: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
});

export default TopComments;