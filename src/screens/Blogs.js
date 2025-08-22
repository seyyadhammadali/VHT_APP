import React, { useEffect, useState } from 'react';
import {  View,  Text,  StyleSheet,  FlatList,  TouchableOpacity,  ScrollView,  Dimensions,  Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import Header from '../components/Header';
import ForwardIcon from '../assets/images/forwardIcon.svg';
import colors from '../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllPosts, selectAllPosts,  selectBlogsLoading,  selectBlogsError,} from '../redux/slices/BlogSlice';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FooterTabs from '../components/FooterTabs';
import NetInfo from '@react-native-community/netinfo';
import NoInternetMessage from '../components/NoInternetMessage';
const { width } = Dimensions.get('window');
const ITEMS_PER_LOAD = 5;
const Blogs = ({ navigation }) => {
  const dispatch = useDispatch();
  const allPosts = useSelector(selectAllPosts);
  const loading = useSelector(selectBlogsLoading);
  const [isConnected, setIsConnected] = useState(true);
  const error = useSelector(selectBlogsError);
  const [visibleOtherBlogsCount, setVisibleOtherBlogsCount] = useState(ITEMS_PER_LOAD);
  const topBlogs = allPosts?.slice(0, 6);
  const otherBlogs = allPosts?.slice(6);
  const displayedOtherBlogs = otherBlogs?.slice(0, visibleOtherBlogsCount);
    useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);
if (loading || !allPosts) {
    return renderSkeleton();
  }
   function renderSkeleton() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.sectionHeader}>
            <View style={styles.topTextView}>
              <SkeletonPlaceholder borderRadius={8}>
                <View style={styles.banner} />
                <View style={styles.section}>
                  <SkeletonPlaceholder.Item width={'60%'} height={25} marginBottom={10} marginTop={20} />
                  <SkeletonPlaceholder.Item width={'100%'} height={405} marginBottom={10} />
                </View>
              </SkeletonPlaceholder>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
  const hasMoreBlogs = otherBlogs?.length > visibleOtherBlogsCount;
  const handleLoadMore = () => {
    setVisibleOtherBlogsCount(prev => prev + ITEMS_PER_LOAD);
  };


  const renderBlogItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.card}
      onPress={() => navigation.navigate('TopComments', { postId: item.id })} >
      <View style={styles.blogCardOther}>
        <FastImage source={{ uri: item.banner }} style={styles.blogImagee} />
        <View style={styles.blogInfo}>
          <Text style={styles.topBlogTitle}>{item.title}</Text>
          <Text style={styles.blogMetaV}>{item.intro}</Text>
          <Text style={styles.blogMetaP}>{item.publish_date} | Latest Blog</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // const renderLoadMoreButton = () => {
  //   if (hasMoreBlogs) {
  //     return (
  //       <TouchableOpacity onPress={handleLoadMore} style={styles.loadMoreButton}>
  //         <Text style={styles.loadMoreButtonText}>Load More</Text>
  //       </TouchableOpacity>
  //     );
  //   }
  //   return null;
  // };
  
  

  // if (error) {
  //   return (
  //     <View style={styles.container}>
  //       <Header title="Blogs" showNotification={true} navigation={navigation} />
  //       <View style={styles.errorContainer}>
  //         <Text style={styles.errorText}>Error loading blogs: {error}</Text>
  //         <TouchableOpacity style={styles.retryButton} onPress={() => dispatch(fetchAllPosts())}>
  //           <Text style={styles.retryButtonText}>Tap to Retry</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   );
  // }

  return (
    <>
      {!isConnected ? (
        <View style={styles.noInternetView}>
          <NoInternetMessage />
        </View>
      ) : (
        <>
          <Header title="Blogs" showNotification={true} navigation={navigation} />
          <ScrollView style={styles.container}>
            <View style={styles.sectionHeader}>
              <View style={styles.topTextView}>
                <Image style={styles.locationIcon} source={require('../assets/images/LocationIcon.png')} />
                <Text style={styles.sectionTitle}> Top Blog Posts</Text>
              </View>
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
              <FlatList
                data={displayedOtherBlogs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderBlogItem}
            ListFooterComponent={
    hasMoreBlogs ? (
      <TouchableOpacity
        onPress={handleLoadMore}
        style={styles.loadMoreButton}
      >
        <Text style={styles.loadMoreButtonText}>Load More</Text>
      </TouchableOpacity>
    ) : null
  }
                scrollEnabled={false} 
              />
            </View>
          </ScrollView>
          <FooterTabs/>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 80
  },
  noInternetView: {
 flex: 1, 
 justifyContent: 'center',
  alignItems: 'center' }, 

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  topblogView: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    height: 270
  },
  topTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  locationIcon: {
    width: 20,
    height: 20,
  },
  viriksonHoliday: {
    flexDirection: 'row',
    marginTop: 20,
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
    backgroundColor: 'white',
    borderRadius: 22,
    paddingBottom: 30,
    height: 255,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    // Android Shadow
    elevation: 8,
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
    minHeight: 36,
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
    padding: 4,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android Shadow
    elevation: 3,
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
  loadMoreButton: {
    backgroundColor: colors.black,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  justifyContent:"center",
  alignSelf:"center",
    marginTop: 20,
    marginBottom: 80,
    width:'50%'
  },
  loadMoreButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: colors.danger,
    textAlign: 'center',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
export default Blogs;