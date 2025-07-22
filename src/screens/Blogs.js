import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Header from '../components/Header';
import ForwardIcon from '../assets/images/forwardIcon.svg';
import colors from '../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllPosts,
  selectAllPosts,
  selectBlogsLoading,
  selectBlogsError,
} from '../redux/slices/BlogSlice';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const { width } = Dimensions.get('window');
const Blogs = ({ navigation }) => {
  const dispatch = useDispatch();
  const allPosts = useSelector(selectAllPosts);
  const loading = useSelector(selectBlogsLoading);
  const error = useSelector(selectBlogsError);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  const topBlogs = allPosts?.slice(0, 6);
  const otherBlogs = allPosts?.slice(6);

  if (loading) {
    return (
      <ScrollView style={styles.container}>
        <Header title="Blogs" showNotification={true} navigation={navigation} />
        <SkeletonPlaceholder>
          <View style={{ paddingHorizontal: 8 }}>
            {/* Top Blogs Skeleton */}
            <View style={styles.sectionHeader}>
              <View style={{ width: 150, height: 20, borderRadius: 4 }} />
              <View style={{ width: 50, height: 20, borderRadius: 4 }} />
            </View>
            <View style={{ flexDirection: 'row' }}>
              {[...Array(2)].map((_, i) => (
                <View key={i} style={{ marginRight: 10 }}>
                  <View style={{ width: width * 0.8, height: 255, borderRadius: 22 }} />
                </View>
              ))}
            </View>
            {/* Other Blogs Skeleton */}
            <View style={{ marginTop: 20 }}>
              <View style={{ width: 200, height: 20, borderRadius: 4, marginBottom: 10 }} />
              {[...Array(4)].map((_, i) => (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                  <View style={{ width: 100, height: 110, borderRadius: 10 }} />
                  <View style={{ marginLeft: 10, flex: 1 }}>
                    <View style={{ width: '90%', height: 20, borderRadius: 4 }} />
                    <View style={{ width: '70%', height: 15, borderRadius: 4, marginTop: 6 }} />
                    <View style={{ width: '50%', height: 15, borderRadius: 4, marginTop: 6 }} />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </SkeletonPlaceholder>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Header title="Blogs" showNotification={true} navigation={navigation} />
      <View style={styles.sectionHeader}>
        <View style={styles.topTextView}>
          <Image style={styles.locationIcon} source={require('../assets/images/LocationIcon.png')} />
          <Text style={styles.sectionTitle}> Top Blog Posts</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('TopComments')}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.topblogView}>
        <FlatList
          data={topBlogs}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => navigation.navigate('TopComments', { postId: item.id })}
            >
              <View style={styles.topBlogCard}>
                <View style={styles.imageWrapper}>
                  <FastImage source={{ uri: item.banner }} style={styles.topBlogImage}>
                    <ForwardIcon style={styles.forwardIcon} />
                  </FastImage>
                </View>
                <Text style={styles.topBlogTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.blogMetaP}>{item.publish_date} | Latest Blog</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.viriksonHoliday}>
        <Image style={styles.locationIcon} source={require('../assets/images/LocationIcon.png')} />
        <Text style={styles.sectionTitle}> Virikson Holidays Blogs</Text>
      </View>
      <View style={{ paddingVertical: 3, paddingHorizontal: 8 }}>
        {otherBlogs?.map((blog) => (
          <TouchableOpacity
            key={blog.id}
            style={styles.card}
            onPress={() => navigation.navigate('TopComments', { postId: blog.id })}
          >
            <View key={blog.id} style={styles.blogCardOther}>
              <FastImage source={{ uri: blog.banner }} style={styles.blogImagee} />
              <View style={styles.blogInfo}>
                <Text style={styles.topBlogTitle}>{blog.title}</Text>
                <Text style={styles.blogMetaV}>{blog.intro}</Text>
                <Text style={styles.blogMetaP}>{blog.publish_date} | Latest Blog</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      paddingHorizontal: 2,
      marginBottom: 80,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      marginTop: 10,
    },
    topblogView:
    {paddingVertical: 6, 
      paddingHorizontal: 8,
       height:270},
    topTextView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom:10
    },
    locationIcon: {
      width: 20,
      height: 20,
    },
    viriksonHoliday:
    {
    flexDirection: 'row',
     marginTop: 20 ,
     paddingHorizontal: 8,
      },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.black,
    },
    seeAll: {
      fontSize: 14,
      color: colors.gray,
    },
    card: {
      marginRight: 8,
    },
    topBlogCard: {
      width: width * 0.8,
      elevation: 5,
      shadowColor: 'gray',
      borderWidth: 1,
      borderColor: '#FFFFFF',
      shadowOpacity: 0.3,
      backgroundColor: 'white',
      borderRadius: 22,
      paddingBottom: 30,
      height: 255, // Set a fixed height
    
    },
    imageWrapper: {
      height: 180,
      overflow: 'hidden',
      borderTopLeftRadius: 22,
      borderTopRightRadius: 22,
    },
    topBlogImage: {
      width: '100%',
      height: '100%',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    forwardIcon: {
      margin: 10,
    },
    topBlogTitle: {
      fontSize: 13,
      fontWeight: '500',
      marginTop: 8,
      color: colors.black,
      paddingHorizontal: 5,
      lineHeight: 18,
      minHeight: 36, // Ensure title area has consistent height (2 lines)
    },
    blogMetaP: {
      fontSize: 10,
      color: colors.gray,
      marginTop: 3,
      paddingHorizontal: 5,
    },
        blogMetaV: {
      fontSize: 10,
      color: colors.gray,
      marginTop: 3,
 
    },
    description: {
      fontSize: 13,
      color: colors.gray,
      marginVertical: 10,
      paddingHorizontal: 4,
    },
    blogCardOther: {
      flexDirection: 'row',
      backgroundColor: colors.white,
      borderRadius: 10,
      marginVertical: 8,
      elevation: 1,
      shadowColor: colors.gray,
      padding: 4,
    },
    blogImagee: {
      width: 100,
      height: 110,
      borderRadius: 10,
    },
    blogInfo: {
      flex: 1,
      paddingLeft: 10,
      justifyContent: 'center',
    },
    blogTitleOther: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.black,
    },
    blogDescOther: {
      fontSize: 12,
      color: colors.gray,
      marginVertical: 2,
    },
    blogMetaOther: {
      fontSize: 10,
      fontWeight: '400',
      color: colors.gray,
    
    },
});

export default Blogs;
