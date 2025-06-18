import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
const { width } = Dimensions.get('window');
const destinationImages = {
  Turkey: require('../assets/images/turkey.png'),
  Greece: require('../assets/images/Bali.png'),
  Bali: require('../assets/images/Greece.png'),
  Egypt: require('../assets/images/Egypt.png'),
  Morocco: require('../assets/images/turkey.png'),
  UAE: require('../assets/images/morocco.png'),
};
const packageImages = [
  {
    imageSrc:  require('../assets/images/holidaypkgOne.png'),
    title: 'Step Into Paradise...',
    subTitle: 'Kuredu Island Resort',
    price: '1399',
    rating: '4.0',
  },
    {
    imageSrc:   require('../assets/images/holidaypkgtwo.png'),
    title: 'Step Into Paradise...',
    subTitle: 'Kuredu Island Resort',
    price: '1399',
    rating: '4.0',
  },
 {
    imageSrc:  require('../assets/images/holidaypkgthree.png'),
    title: 'Step Into Paradise...',
    subTitle: 'Kuredu Island Resort',
    price: '1399',
    rating: '4.0',
  },
]
const multiDealImages =[
    {
    imageSrc:  require('../assets/images/multidealOne.png'),
    title: '07 Nights Dubai & Emira.....',
    subTitle: 'Kuredu Island Resort',
    price: '1399',
    rating: '4.0',
  },
    {
    imageSrc:   require('../assets/images/multidealTwo.png'),
    title: 'Step Into Paradise...',
    subTitle: 'Kuredu Island Resort',
    price: '1399',
    rating: '4.0',
  },
 {
    imageSrc:  require('../assets/images/multidealThree.png'),
    title: 'Step Into Paradise...',
    subTitle: 'Kuredu Island Resort',
    price: '1399',
    rating: '4.0',
  },
];
const cruisePkg = [
    {
    imageSrc:  require('../assets/images/criusepkeOne.png'),
    title: '07 Nights Dubai & Emira.....',
    subTitle: 'Kuredu Island Resort',
    price: '1399',
    rating: '4.0',
  },
    {
    imageSrc:   require('../assets/images/criusepkgTwo.png'),
    title: 'Step Into Paradise...',
    subTitle: 'Kuredu Island Resort',
    price: '1399',
    rating: '4.0',
  },
 {
    imageSrc:  require('../assets/images/multidealThree.png'),
    title: 'Step Into Paradise...',
    subTitle: 'Kuredu Island Resort',
    price: '1399',
    rating: '4.0',
  },
];
const popularHotels = [
  {
    image: require('../assets/images/popularone.png'),
    title: '07 Nights Holiday in Sea Breeze Beach House Holiday in Sea Breeze...',
    subTitle: 'Sea Breeze Beach House by...',
    price: '1,999pp',
    duration: '/night',
    rating: '5.0',
  },
  {
    image: require('../assets/images/populartwo.png'),
    title: 'Luxury Stay in Bali Oceanfront Villa',
    subTitle: 'Oceanfront Villa Resort',
    price: '2,499pp',
    duration: '/night',
    rating: '4.8',
  },
  // Add more hotel objects as needed
];
const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground
        source={require('../assets/images/backgroundImage.png')} // Replace with your image path
        style={styles.headerBackground}
        imageStyle={{ borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}
        >
        <View style={styles.headerContent}>
        <Image source={require('../assets/images/Logo.png')} style={styles.logoStyle}/>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
                <Image source={require('../assets/images/notification.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
                   <Image source={require('../assets/images/iconprofile.png')}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchBarContainer}>
          <Image source={require('../assets/images/search.png')} style={styles.searchIcon} />
          <TextInput
            placeholder="Search Countries, Cities, Places..."
            placeholderTextColor="#999"
            style={styles.searchBar}
          />
        </View>
      </ImageBackground>
      <View style={styles.section}>
        <Image
          source={require('../assets/images/bannerone.jpg')}
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.sectionDesination}>
        <Text style={styles.sectionTitle}>Top Destinations</Text>
       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Object.keys(destinationImages).map((item, index) => (
            <View key={index} style={styles.destinationItem}>
              <Image
                source={destinationImages[item]}
                style={styles.destinationImage}
              />
              <Text style={styles.destinationText}>{item}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    <View style={styles.sectionHoliday}>
    <View style={styles.headingtop}>
  <Text style={styles.sectionTitle}>Holiday Packages</Text>
    <Text style={styles.sectionTitlelight}>See all</Text>
        </View>  
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.packagesHolidayRow}>
    {packageImages.map((item, index) => (
      <View key={index} style={styles.holidaycard}>
        <Image source={item.imageSrc} style={styles.holidayimage} />
        <View style={styles.cardContent}>
          <Text style={styles.title} numberOfLines={3}>
            {index === 0
              ? 'Step Into Paradise with Kuredu Maldives - All Meals & Transfers are Free All Meals & Transfers...'
              : index === 1
              ? 'From Phuket’s Coast to Lak’s Serenity Beaches, Stunning Luxury'
              : 'Luxury Retreats Await in Dubai’s Desert Oasis'}
          </Text>
          <Text style={styles.subTitle}>{item.subTitle}</Text>
          <View style={styles.bottomRow}>
            <Text style={styles.price}>£{item.price}</Text>
            <Text style={styles.duration}>/07 Days</Text>
            <View style={styles.ratingView}>
            <Image style={styles.starRating} source={require('../assets/images/star.png')}/>
            <Text style={styles.rating}>{item.rating}</Text>
            </View>
          </View>
        </View>
      </View>
    ))}
  </ScrollView>
</View>
      {/* Popular Hotel Section */}  
      <View style={styles.sectionpopular}>
    <View style={styles.headingtop}>
  <Text style={styles.sectionTitle}>Popular Hotel</Text>
    <Text style={styles.sectionTitlelight}>See all</Text>
        </View>
   {popularHotels.map((hotel, index) => (
    <View key={index} style={styles.cardHorizontal}>
      <Image source={hotel.image} style={styles.imageHorizontal} />
      <View style={styles.cardContentHorizontal}>
        <Text style={styles.title} numberOfLines={3}>
          {hotel.title}
        </Text>
        <Text style={styles.subTitle}>{hotel.subTitle}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>£{hotel.price}</Text>
          <Text style={styles.duration}>{hotel.duration}</Text>
            <View style={styles.ratingView}>
            <Image style={styles.starRating} source={require('../assets/images/star.png')}/>
            <Text style={styles.rating}>{hotel.rating}</Text>
            </View>
        </View>
      </View>
    </View>
  ))}
      </View>
    {/* //////////multi center deAL////////////// */}
        <View style={styles.sectionHoliday}>
    <View style={styles.headingtop}>
  <Text style={styles.sectionTitle}>Multi-Centre Deals</Text>
    <Text style={styles.sectionTitlelight}>See all</Text>
        </View>
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.packagesHolidayRow}>
    {multiDealImages.map((item, index) => (
      <View key={index} style={styles.holidaycard}>
        <Image source={item.imageSrc} style={styles.holidayimage} />
        <View style={styles.cardContent}>
          <Text style={styles.title} numberOfLines={3}>
            {item.title}
          </Text>
          <Text style={styles.subTitle}>{item.subTitle}</Text>
          <View style={styles.bottomRow}>
            <Text style={styles.price}>£{item.price}</Text>
            <Text style={styles.duration}>/07 Days</Text>
            <View style={styles.ratingView}>
            <Image style={styles.starRating} source={require('../assets/images/star.png')}/>
            <Text style={styles.rating}>{item.rating}</Text>
            </View>
          </View>
        </View>
      </View>
    ))}
  </ScrollView>
</View>
<View style={styles.SafariPakages}>
  <View style={styles.headingtop}>
  <Text style={styles.sectionTitle}>Safari Packages</Text>
    <Text style={styles.sectionTitlelight}>See all</Text>
        </View>
         <View style={styles.sectionSafari}>
        <Image
          source={require('../assets/images/safaripakage.png')}
          style={styles.bannerImagePkg}
          resizeMode="cover"
        />
      </View>
</View>
{/* /////////////Cruise Pakage////////////// */}
     <View style={styles.sectionHoliday}>
    <View style={styles.headingtop}>
  <Text style={styles.sectionTitle}>Multi-Centre Deals</Text>
    <Text style={styles.sectionTitlelight}>See all</Text>
        </View>
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.packagesHolidayRow}>
    {cruisePkg.map((item, index) => (
      <View key={index} style={styles.holidaycard}>
        <Image source={item.imageSrc} style={styles.holidayimage} />
        <View style={styles.cardContent}>
          <Text style={styles.title} numberOfLines={3}>
            {item.title}
          </Text>
          <Text style={styles.subTitle}>{item.subTitle}</Text>
          <View style={styles.bottomRow}>
            <Text style={styles.price}>£{item.price}</Text>
            <Text style={styles.duration}>/07 Days</Text>
            <View style={styles.ratingView}>
            <Image style={styles.starRating} source={require('../assets/images/star.png')}/>
            <Text style={styles.rating}>{item.rating}</Text>
            </View>
          </View>
        </View>
      </View>
    ))}
  </ScrollView>
</View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom:10,
  },
  headerBackground: {
    width: '100%',
   height: 140,
    // paddingTop: StatusBar.currentHeight + 10 || 40,
    // paddingHorizontal: 0,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal:18,
     marginTop: 10, 
  },
  logoStyle:{
   width:'50%',
   resizeMode:'contain'
  },
  greeting: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
    padding: 6,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
    searchBarContainer: {
    marginTop: 40,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 45,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width:'92%',
    alignSelf:'center'
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  headingtop:{
    flexDirection:'row',
    justifyContent:"space-between"
  },
  section: {
    marginTop: 50,
    paddingHorizontal: 20,
  },
  sectionSafari:{
    marginTop: 3,
    paddingHorizontal: 20,
  },
  sectionDesination:{
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionHoliday:{
     marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionpopular:{
    marginTop: 0,
    paddingHorizontal: 20,
  },
  SafariPakages:{
    marginTop: 10,
    paddingHorizontal: 20,
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
  },
  bannerImagePkg:{
    height: 150,
    borderRadius: 12,
    resizeMode:'contain',
    alignSelf:'center',
  },

sectionTitlelight:{
  fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
    color:'lightgray'
},
  destinationItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  destinationImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  destinationText: {
    fontSize: 12,
    color: '#333',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  seeAll: {
    fontSize: 12,
    color: '#FF9800',
  },
  packagesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  packageImage: {
    width: (width - 60) / 2,
    height: 160,
    borderRadius: 12,
  },
  packagesHolidayRow: {
  flexDirection: 'row',
  paddingRight: 10,
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: 10, 
  marginBottom:20,
  borderRadius:20
},
  sectionHolidayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    paddingHorizontal:10
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 120,
  },
   holidayimage:{
    width:'100%',
    height:170,
    borderTopLeftRadius:20,
    borderTopRightRadius:20
   },
  cardContent: {
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
    lineHeight:20
  },
  subTitle: {
    fontSize: 14,
    color: 'gray',
    fontWeight:'600'
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E67E22',
  },
  duration: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 4,
  },
  starIcon: {
    marginLeft: 8,
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
  starRating:{
      marginLeft: 'auto', 
  },
  cardHorizontal: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
    padding:8
  },
  imageHorizontal: {
    width: 120,
    height: 140,
    borderRadius:20,
    marginLeft:0
  },
  cardContentHorizontal: {
    flex: 1,
    padding: 10,
  },
holidaycard: {
  width: width * 0.6, // ~70% of screen width
  marginRight: 16,
  backgroundColor: '#fff',
  borderRadius: 12,
  overflow: 'hidden',
  elevation: 1,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  paddingVertical:0,
  borderTopRightRadius:20,
  borderTopLeftRadius:20,
},
ratingView:{
  flexDirection:"row",
  marginLeft:"auto"
},

});
