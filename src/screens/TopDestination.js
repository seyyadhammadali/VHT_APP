import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
  Linking ,
  FlatList
} from 'react-native';
import FastImage from 'react-native-fast-image';
import PhoneS from '../assets/images/PhoneS.svg';
import Getqoute from '../assets/images/getQoute.svg';
import FlagSVG from '../assets/images/flagS.svg';
import HeartSVG from '../assets/images/Heart.svg';
import Header from '../components/Header';
 import {fetchSinglePage} from '../redux/slices/pagesSlice';
import { destinationStatus, fetchCountryDestinations } from '../redux/slices/destinationsSlice';
import { useSelector, useDispatch } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
// const arraylist = [
//   {
//     image: require('../assets/images/CountryCard.png'),
//     label: 'Greece',
//     title: 'Maldives',
//     subtitle: 'Tours',
//   },
//   {
//     image: require('../assets/images/CountryCardTwo.png'),
//     label: 'Dubai',
//     title: 'Maldives',
//     subtitle: 'Tours',
//   },
//   {
//     image: require('../assets/images/CountryCardThree.png'),
//     label: 'Malaysia',
//     title: 'Maldives',
//     subtitle: 'Tours',
//   },
//   {
//     image: require('../assets/images/CountryCardFour.png'),
//     label: 'Indonesia',
//     title: 'Maldives',
//     subtitle: 'Tours',
//   },
//   {
//     image: require('../assets/images/CountryCardFive.png'),
//     label: 'Saudi Arabia',
//     title: 'Maldives',
//     subtitle: 'Tours',
//   },
//   {
//     image: require('../assets/images/CountryCardSix.png'),
//     label: 'Saudi Arabia',
//     title: 'Maldives',
//     subtitle: 'Tours',
//   },
//   {
//     image: require('../assets/images/CountryCardSix.png'),
//     label: 'Saudi Arabia',
//     title: 'Maldives',
//     subtitle: 'Tours',
//   },
//   {
//     image: require('../assets/images/CountryCardSix.png'),
//     label: 'Saudi Arabia',
//     title: 'Maldives',
//     subtitle: 'Tours',
//   },
// ];
const { width, height } = Dimensions.get('window');
const bannerWidth = width * 0.9;
const bannerHeight = bannerWidth * 0.45; 
export default function TopDestination({ navigation }) {
const dispatch = useDispatch();
useEffect(() => {
  dispatch(fetchSinglePage());
   dispatch(fetchCountryDestinations()); 
}, [dispatch]);
const single = useSelector((state) => state.pages.singlePage);
const loading = useSelector((state) => state.pages.loading);
const destinations = useSelector(state => state.destination.country);
const destination_status = useSelector(destinationStatus);
const [scrollPosition, setScrollPosition] = useState(0);
const [contentHeight, setContentHeight] = useState(1);
const [containerHeight, setContainerHeight] = useState(1);
const thumbHeight = Math.max((containerHeight / contentHeight) * containerHeight, 30);
const maxThumbPosition = containerHeight - thumbHeight;
const thumbPosition = Math.min(
  (scrollPosition / (contentHeight - containerHeight)) * maxThumbPosition || 0,
  maxThumbPosition
);
  return (
    <View style={styles.container}>
    <Header title="Destination" showNotification={true} navigation={navigation} />
     <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false} >
   <View style={styles.sectionWithSearchMarginSafari}>
  {loading ? (
  <SkeletonPlaceholder borderRadius={10}>
    <SkeletonPlaceholder.Item
      width={bannerWidth}
      height={bannerHeight}
      borderRadius={10}
      alignSelf="center"
    />
  </SkeletonPlaceholder>
) : single && single?.banner ? (
  <>
  <FastImage
    source={{
      uri: single.banner,
      priority: FastImage.priority.high,
      cache: FastImage.cacheControl.immutable,
    }}
    style={[styles.bannerImgSafari, { width: bannerWidth, height: bannerHeight }]}
    resizeMode={FastImage.resizeMode.cover}
    onError={(e) => console.warn('Safari slider image error:', e.nativeEvent)}
  />
  {/* Custom Card for Destination Description */}
  
  <View style={styles.customCardContainer}>
    <Text style={styles.customCardTitle}>{single.title || 'Best Holiday Destinations for You'}</Text>
    <View style={styles.scrollableDescriptionWrapper}>
  <ScrollView
    style={styles.customScrollArea}
    nestedScrollEnabled={true}
    showsVerticalScrollIndicator={false}
    onContentSizeChange={(_, h) => setContentHeight(h)}
    onLayout={e => setContainerHeight(e.nativeEvent.layout.height)}
    onScroll={e => setScrollPosition(e.nativeEvent.contentOffset.y)}
    scrollEventThrottle={16}
  >
    <Text style={styles.customCardDescription}>{single.description}</Text>
  </ScrollView>

  {/* Custom scrollbar */}
  <View style={styles.customScrollbarTrack}>
    <View
      style={[
        styles.customScrollbarThumb,
        {
          height: thumbHeight,
          top: thumbPosition,
        },
      ]}
    />
  </View>
</View>
</View>
  </>
) : (
  
  <Text style={{ color: '#999', alignSelf: 'center' }}>No safari banner found.</Text>
)}

</View>

 {destination_status === 'loading' ? (
  <SkeletonPlaceholder>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {[...Array(6)].map((_, index) => (
        <View key={index} style={[styles.card, { backgroundColor: '#eee' }]} />
      ))}
    </View>
  </SkeletonPlaceholder>
) : (
  <FlatList
    data={destinations}
    numColumns={2}
    keyExtractor={(item) => item.id.toString()}
    columnWrapperStyle={{ justifyContent: 'space-between' }}
    contentContainerStyle={styles.scrollContainer}
    renderItem={({ item }) => (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('PakageDetails', { packageData: item })}
        >
          <ImageBackground
            source={{ uri: item.banner }}
            style={styles.cardImage}
            imageStyle={styles.imageStyle}
          >
            <View style={styles.contentContainer}>
              <Text style={styles.titleText}>{item.name}</Text>
              <View style={styles.row}>
                <View style={styles.infoBox}>
                <FlagSVG width={14} height={14} style={styles.flagIcon} />
                  <Text style={styles.countText}>{item.total_packages}</Text>
                  <Text style={styles.subtitle}>Tours</Text>
                </View>
              </View>
              <HeartSVG width={26} height={26} style={styles.heartIcon} />
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    )}
  />
)}

      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={[styles.blueButton, { backgroundColor: '#189900' }]} onPress={()=>navigation.navigate('SubmitEnquiry')}>
          <Getqoute width={20} height={20} />
          <Text style={styles.buttonText}>Get A Quote</Text>
        </TouchableOpacity>
        <TouchableOpacity
         style={styles.blueButton}
         onPress={() => Linking.openURL('tel:02080382020')}
           >
         <PhoneS width={20} height={20} />
         <Text style={styles.buttonText}>020 8038 2020</Text>
         </TouchableOpacity>
      </View>
    </View>
  );
}
const windowWidth = Dimensions.get('window').width;
const imageWidth = (windowWidth - 40) / 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 4,
    paddingBottom: 80,
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
 bannerImgSafari: {
  marginTop: 1,         
  marginBottom: 10,      
  alignSelf: 'center',  
  paddingTop: 0,
  paddingBottom: 12,
  borderRadius:10
},
   sectionWithSearchMarginSafari: {
   paddingHorizontal: 10,
  alignSelf:'center',
  justifyContent:"center",
  alignItems:'center'
  },
  card: {
    width: imageWidth,
    height: 210,
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  imageStyle: {
    borderRadius: 10,
    resizeMode: 'cover',
    marginRight:10
  },
  contentContainer: {
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 8,
    left: 5,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '700',
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    color: 'black',
    marginTop: 10,
    padding: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    borderRadius: 10,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  flagIcon: {
    marginRight: 4,
  },
  countText: {
    color: 'red',
    fontSize: 13,
    fontWeight: '600',
    marginRight: 4,
  },
  subtitle: {
    color: 'black',
    fontSize: 13,
    fontWeight: '600',
  },
  heartIcon: {
    position: 'absolute',
    left: 120,
    marginTop: 40,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 12,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
     paddingVertical: 15,
  },
  blueButton: {
    flex: 1,
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'space-evenly',
    margin: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bestDestinationHeading:{
    fontSize:14,
    fontWeight:'500',
    lineHeight:50,
    textAlign:"center",
    color:"#101010",
    backgroundColor:'#C28D3E1F',
    paddingHorizontal:35

  },
  customCardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginVertical: 10,
    // elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    width: bannerWidth,
    alignSelf: 'center',
    
  },
  customCardTitle: {
    backgroundColor: '#f8f1e7',
    color: '#222',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
    textAlign: 'center',
  },
  customScrollArea: {
    maxHeight: 120,
    paddingRight: 16, // space for scrollbar
  },
  customCardDescription: {
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
  },
  customScrollbarTrack: {
    width: 8,
    height: 120,
    backgroundColor: '#f5f6fa',
    borderRadius: 4,
    position: 'absolute',
    right: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customScrollbarThumb: {
    width: 10,
    backgroundColor: '#b88a3b',
    borderRadius: 4,
    position: 'absolute',
    left: 0,
  },
  flagIconImage: {
  width: 14,
  height: 14,
  resizeMode: 'contain',
  marginRight: 4,
},
});

