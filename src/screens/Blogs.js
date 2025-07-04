import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground 
} from 'react-native';
import Header from '../components/Header';
import ForwardIcon from '../assets/images/forwardIcon.svg';
const { width } = Dimensions.get('window');
const topBlogs = [
  {
    id: '1',
    image: require('../assets/images/topblogtwo.png'),
    title: 'Is Khao Sok Worth Visiting? Here’s What You Need to Know',
    date: '11 June 2025',
  },
  {
    id: '2',
    image: require('../assets/images/topblogtwo.png'),
    title: 'Ultimate Guide to Thai Holidays',
    date: '11 June 2025',
  },
];
const otherBlogs = [
  {
    id: '3',
    image: require('../assets/images/topSecBlog.png'),
    title: 'A Traveller\'s Guide to Japan Holidays',
    description: 'Ever visualized the sight of cherry...',
    date: '11 June 2025',
  },
  {
    id: '4',
    image: require('../assets/images/topblogtwo.png'),
    title: 'Ultimate Guide to Holidays in Turkey | Things to Do',
    description: 'Turkey, a beautiful and heaven...',
    date: '11 June 2025',
  },
  {
    id: '5',
    image: require('../assets/images/topSecBlog.png'),
    title: 'WHAT IS THE BEST TIME TO VISIT THE USA?',
    description: 'Spanning over 9.867 million sq...',
    date: '11 June 2025',
  },
  {
    id: '4',
    image: require('../assets/images/topblogtwo.png'),
    title: 'Ultimate Guide to Holidays in Turkey | Things to Do',
    description: 'Turkey, a beautiful and heaven...',
    date: '11 June 2025',
  }
];
const Blogs = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
    
             <Header title="Blogs" showNotification={true} />
      <View style={styles.sectionHeader}>
        <View style={styles.topTextView}>
           <Image style={styles.locationIcon} source={require('../assets/images/LocationIcon.png')}/>
        <Text style={styles.sectionTitle}> Top Blog Posts</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={topBlogs}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
    <View style={styles.topBlogCard}>
    <View style={styles.imageWrapper}>
      <ImageBackground source={item.image} style={styles.topBlogImage}>
        <ForwardIcon style={styles.forwardIcon} />
      </ImageBackground>
    </View>
    <Text style={styles.topBlogTitle}>{item.title}</Text>
    <Text style={styles.blogMetaP}>{item.date} | Latest Blog</Text>
  </View>
)}
      />
      {/* Virikson Holidays Section */}
       <View style={{flexDirection:"row",marginTop:20}}>
           <Image style={styles.locationIcon} source={require('../assets/images/LocationIcon.png')}/>
        <Text style={styles.sectionTitle}> Virikson Holidays Blogs</Text>
        </View>
      <Text style={styles.description}>
        Embark on inspiring journeys through our blog—packed with travel stories, insider tips from passionate explorers.
      </Text>
      {otherBlogs.map(blog => (
        <View key={blog.id} style={styles.blogCardOther}>
          <Image source={blog.image} style={styles.blogImagee} />
          <View style={styles.blogInfo}>
            <Text style={styles.blogTitleOther}>{blog.title}</Text>
            <Text style={styles.blogDescOther}>{blog.description}</Text>
            <Text style={styles.blogMetaOther}>{blog.date} | Latest Blog</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    marginBottom:80
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
  notifIcon: {
    width: 20,
    height: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  seeAll: {
    fontSize: 14,
    color: '#888888',
  },
  topBlogCard: {
    width: width * 0.8,
    marginRight: 8,
    elevation:50,
    shadowColor:'gray',
    borderWidth:1,
    borderColor:'#FFFFFF',
    shadowOpacity:30,
    backgroundColor:'white',
  },
 imageWrapper: {
  width: '99%',
  height: 200,
  alignSelf: 'center',
  marginLeft: 3,
  marginTop: 2,
  borderTopRightRadius: 14,
  borderTopLeftRadius:14,
  overflow: 'hidden', // 👈 important!
},
topBlogImage: {
  width: '100%',
  height: '100%',
  justifyContent: 'center',
},
  topBlogTitle: {
  fontSize: 14,
  fontWeight: '500',
  marginTop: 8,
  color: '#000',
  paddingHorizontal:25,
  lineHeight:18
  },
  blogMeta: {
   fontSize: 12,
   color: '#888',
   marginTop: 3,
  },
  blogMetaP:{
 fontSize: 12,
    color: '#888',
    marginTop: 3,
    paddingHorizontal:25
  },
  description: {
    fontSize: 13,
    color: '#555',
    marginVertical: 10,
    paddingHorizontal:4
  },
  blogCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 8,
    elevation: 1,
    shadowColor: '#ccc',
    padding: 4,
  },
    blogCardOther: {
    flexDirection: 'row',
    borderRadius: 10,
    marginVertical: 4,
    elevation: 50,
    padding: 4,
    shadowColor:'gray',
    borderWidth:1,
    borderColor:'#FFFFFF',
    shadowOpacity:30,
    backgroundColor:'white',
    
  },
  blogImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
    blogImagee: {
    width: 140,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    resizeMode:"cover"
  },
  blogInfo: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal:6,
    paddingVertical:10,
    height:60
  },
  blogTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  blogDesc: {
    fontSize: 12,
    color: '#666',
    marginVertical: 2,
  },
  locationIcon:{
    height:16,
    width:16,
    marginTop:2
  },
  blogTitleOther:{
    fontSize:15,
    fontWeight:"500",
    lineHeight:20,
  
  },
  blogDescOther:{
    fontSize:12,
    fontWeight:"400",
    color:'#888888',
    marginTop:2
  },
  blogMetaOther:{
    fontSize:10,
    fontWeight:"400",
    color:'#888888',
    marginTop:2
  },
  forwardIcon:{
height:25,
width:25,
position:"absolute",
top:6,
right:10
  },
topTextView:{
  flexDirection:"row"
}
});

export default Blogs;
