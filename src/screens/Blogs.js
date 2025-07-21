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
        onPress={() => navigation.navigate('TopComments', { packageData: item })}
        >
        <View style={styles.topBlogCard}>
        <View style={styles.imageWrapper}>
       <FastImage source={{ uri: item.banner }} style={styles.topBlogImage}>
        <ForwardIcon style={styles.forwardIcon} />
        </FastImage>
         </View>
          <Text style={styles.topBlogTitle}>{item.title}</Text>
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
       <View style={{ paddingVertical: 3, paddingHorizontal: 8, }}>
      {otherBlogs?.map((blog) => (
        <TouchableOpacity
          key={blog.id}
          style={styles.card}
          onPress={() => navigation.navigate('TopComments', { packageData: blog })}
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
