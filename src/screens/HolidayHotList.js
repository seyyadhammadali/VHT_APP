import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    ImageBackground, // Ensure ImageBackground is imported
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
import {
    selectHolidayPackages,
    fetchHolidayPackages,
} from '../redux/slices/pakagesSlice';
import { useSelector, useDispatch } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../constants/colors';

const { width, height } = Dimensions.get('window');
const bannerWidth = width * 0.9;
const bannerHeight = bannerWidth * 0.45;

const cardWidth = (width - 36) / 2;
const horizontalItemWidth = width * 0.35;
const horizontalItemHeight = horizontalItemWidth * 1.2;


export default function HolidayHotList({ navigation }) {
    const dispatch = useDispatch();

    const holidayPackages = useSelector(selectHolidayPackages);
    const loadingPackages = useSelector(state => state.pakages.loading);
    const errorPackages = useSelector(state => state.pakages.error);

    const single = useSelector((state) => state.pages.singlePage);
    const loadingSinglePage = useSelector((state) => state.pages.loading);

    const destinations = useSelector(state => state.destination.country);
    const destination_status = useSelector(destinationStatus);


    const [visibleCount, setVisibleCount] = useState(10);
    const visibleHolidayPackages = holidayPackages.slice(0, visibleCount);

    useEffect(() => {
        dispatch(fetchSinglePage());
        dispatch(fetchHolidayPackages());
        dispatch(fetchCountryDestinations());
    }, [dispatch]);

    const [scrollPosition, setScrollPosition] = useState(0);
    const [contentHeight, setContentHeight] = useState(1);
    const [containerHeight, setContainerHeight] = useState(1);
    const thumbHeight = Math.max((containerHeight / contentHeight) * containerHeight, 30);
    const maxThumbPosition = containerHeight - thumbHeight;
    const thumbPosition = Math.min(
        (scrollPosition / (contentHeight - containerHeight)) * maxThumbPosition || 0,
        maxThumbPosition
    );

    const loadMoreItems = () => {
        setVisibleCount((prev) => prev + 10);
    };

    const renderPackageItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('PakageDetails', { packageId: item.id })}
        >
            <ImageBackground
                source={{ uri: item?.main_image }}
                style={styles.cardImage}
                imageStyle={styles.imageStyle}
            >
                <View style={styles.pill}>
                    <Image
                        source={require('../assets/images/flag.png')}
                        style={styles.flagIcon}
                    />
                    <Text style={styles.daysText}>{item.duration || 'Nights'}</Text>
                </View>
            </ImageBackground>

            <View style={styles.cardContent}>
                <Text style={styles.titleText} numberOfLines={2}>
                    {item.title}
                </Text>
                <View style={styles.bottomRow}>
                    <Text style={styles.priceText}>
                        £{item.sale_price}{' '}
                        <Text style={styles.unit}>/{item.packagetype || 'pp'}</Text>
                    </Text>
                    <Text style={styles.rating}>⭐ {item.rating || 'N/A'}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    // Corrected: Render function for each destination item in the horizontal FlatList
    const renderDestinationItem = ({ item }) => (
        <TouchableOpacity
            style={styles.horizontalDestinationCard}
            onPress={() => navigation.navigate('DestinationDetails', { destinationId: item.id, destinationName: item.name })}
        >
            <ImageBackground
                source={{ uri: item.banner }} // Assuming 'banner' is the image for destination
                style={styles.horizontalDestinationImage}
                imageStyle={{ borderRadius: 10 }} // Apply border radius to the image itself
            >
                {/* Content *inside* ImageBackground to layer on top of the image */}
                <View style={styles.horizontalDestinationContentainer}>
                    <Text style={styles.horizontalDestinationInfoOverlay} numberOfLines={1}>
                        {item.name}
                    </Text>
                    <View style={styles.horizontalDestinationInfoOverlay}>
                        <FlagSVG width={12} height={12} style={{marginRight: 4}} />
                        <Text style={styles.horizontalDestinationCountOverlay}><Text style={{color:"red",fontWeight:'600'}}>{item.total_packages || 0}</Text> Tours</Text>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Header title="Holiday HotList" showNotification={true} navigation={navigation} />
            <ScrollView
                contentContainerStyle={styles.mainScrollContainer}
                showsVerticalScrollIndicator={false}
            >

                   {/* Banner Section */}
                <View style={styles.sectionWithSearchMarginSafari}>
                    {loadingSinglePage ? (
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
                        </>
                    ) : (
                        <Text style={{ color: colors.mediumGray, alignSelf: 'center', marginVertical: 20 }}>No safari banner found.</Text>
                    )}
                </View>
                {/* --- Top Destinations Horizontal List --- */}
                <View style={styles.horizontalDestinationsSection}>
                    <View style={styles.headingtop}>
                        <Text style={styles.sectionTitle}>Top Destinations</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('TopDestination')}>
                            <Text style={styles.sectionTitlelight}>See all</Text>
                        </TouchableOpacity>
                    </View>
                    {destination_status === 'loading' ? (
                        <SkeletonPlaceholder>
                            <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
                                {[...Array(3)].map((_, index) => ( // Show 3 skeleton items
                                    <View key={index} style={[styles.horizontalDestinationCard, { backgroundColor: colors.lightGray, marginRight: 15 }]} >
                                        <SkeletonPlaceholder.Item width={'100%'} height={horizontalItemWidth * 0.8} borderRadius={8} />
                                        <SkeletonPlaceholder.Item marginTop={8} marginLeft={5}>
                                            <SkeletonPlaceholder.Item width="80%" height={16} borderRadius={4} marginBottom={4} />
                                            <SkeletonPlaceholder.Item width="60%" height={12} borderRadius={4} />
                                        </SkeletonPlaceholder.Item>
                                    </View>
                                ))}
                            </View>
                        </SkeletonPlaceholder>
                    ) : (
                        <FlatList
                            data={destinations}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderDestinationItem}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.horizontalFlatListContent}
                            // Performance optimization
                            initialNumToRender={5}
                            maxToRenderPerBatch={5}
                            windowSize={9}
                        />
                    )}
                </View>
                {/* --- End Top Destinations Horizontal List --- */}

           

                {/* Holiday Packages List */}
                <View style={styles.packagesListSection}>
                    <Text style={styles.packagesListTitle}>All-Inclusive Holiday Packages 2025-26</Text>
                    <Text style={styles.packagesListsubtitle}>Scroll through luxury Holiday Packages 2025 deals handpicked by our UK travel experts for you and your loved ones.</Text>
                    {loadingPackages ? (
                        <SkeletonPlaceholder>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                {[...Array(4)].map((_, index) => (
                                    <View key={index} style={[styles.card, { backgroundColor: colors.lightGray, marginBottom: 15 }]} >
                                        <SkeletonPlaceholder.Item width={'100%'} height={180} borderTopLeftRadius={12} borderTopRightRadius={12} />
                                        <SkeletonPlaceholder.Item padding={10}>
                                            <SkeletonPlaceholder.Item width="90%" height={18} borderRadius={4} marginBottom={8} />
                                            <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between">
                                                <SkeletonPlaceholder.Item width="40%" height={16} borderRadius={4} />
                                                <SkeletonPlaceholder.Item width="30%" height={16} borderRadius={4} />
                                            </SkeletonPlaceholder.Item>
                                        </SkeletonPlaceholder.Item>
                                    </View>
                                ))}
                            </View>
                        </SkeletonPlaceholder>
                    ) : errorPackages ? (
                        <Text style={styles.errorText}>Error fetching packages: {errorPackages}</Text>
                    ) : (
                        <FlatList
                            data={visibleHolidayPackages}
                            numColumns={2}
                            keyExtractor={(item) => item.id.toString()}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                            contentContainerStyle={styles.flatListContent}
                            renderItem={renderPackageItem}
                            ListFooterComponent={
                                holidayPackages.length > visibleCount ? (
                                    <TouchableOpacity onPress={loadMoreItems} style={styles.loadMoreButton}>
                                        <Text style={styles.loadMoreText}>Load More</Text>
                                    </TouchableOpacity>
                                ) : null
                            }
                            initialNumToRender={10}
                            maxToRenderPerBatch={5}
                            windowSize={21}
                        />
                    )}
                </View>
                  {/* This custom card container was commented out, ensure it's intentional */}
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
                                        <Text style={styles.customCardDescription}>
                                            {stripHtmlTags(single.description)}
                                        </Text>
                                    </ScrollView>
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
                            </View> *
            </ScrollView>

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <TouchableOpacity style={[styles.blueButton, { backgroundColor: colors.green }]} onPress={() => navigation.navigate('SubmitEnquiry')}>
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

// Utility function to strip HTML tags
function stripHtmlTags(html) {
    return html?.replace(/<[^>]*>?/gm, '') || '';
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingBottom: 80,
    },
    mainScrollContainer: {
        paddingBottom: 20,
    },
    sectionWithSearchMarginSafari: {
        paddingHorizontal: 10,
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: 'center',
       
    },
    bannerImgSafari: {
        marginTop: 1,
        marginBottom: 2,
        alignSelf: 'center',
        paddingTop: 0,
        paddingBottom: 12,
        borderRadius: 10
    },
    customCardContainer: {
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 10,
        marginVertical: 10,
        shadowColor: colors.black,
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        width: bannerWidth,
        alignSelf: 'center',
    },
    customCardTitle: {
        backgroundColor: '#f8f1e7',
        color: colors.darkGray,
        fontWeight: 'bold',
        fontSize: 16,
        padding: 8,
        borderRadius: 6,
        marginBottom: 8,
        textAlign: 'center',
    },
    sectionTitlelight:{
        fontSize: 14,
        fontWeight: '500',
        marginTop:2,
        color:'lightgray'
    },
    scrollableDescriptionWrapper: {
        position: 'relative',
    },
    customScrollArea: {
        maxHeight: 120,
        paddingRight: 16,
    },
    customCardDescription: {
        color: colors.mediumGray,
        fontSize: 14,
        lineHeight: 20,
    },
    headingtop:{
      
        flexDirection:'row',
        justifyContent:"space-between"
    },
    customScrollbarTrack: {
        width: 8,
        height: '100%',
        backgroundColor: '#f5f6fa',
        borderRadius: 4,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    customScrollbarThumb: {
        width: 8,
        backgroundColor: '#b88a3b',
        borderRadius: 4,
        position: 'absolute',
        left: 0,
    },
    horizontalDestinationsSection: {
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal:12
    },
    // horizontalDestinationsTitle: { // This style is no longer directly used for the main title
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //     color: colors.darkGray,
    //     marginBottom: 15,
    //     textAlign: 'center',
    // },
   
    horizontalDestinationCard: {
        width: horizontalItemWidth  * 1.2,
        marginRight: 5,
        backgroundColor: colors.white,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Removed paddingBottom here as content is now inside ImageBackground
    },
    horizontalDestinationImage: {
        width: '100%',
        height: horizontalItemWidth * 1.6, // Use horizontalItemHeight for the image itself
        borderRadius: 10, // Apply border radius here
        resizeMode: 'cover',
        justifyContent: 'flex-end', // Align content to the bottom
        alignItems: 'flex-start', // Align content to the start (left)
        paddingBottom: 10, // Add padding inside the image to lift content from the bottom
    },
    // New styles for content inside ImageBackground
    horizontalDestinationContentOverlay: {
        // This will act as a container for the title and info,
        // positioned at the bottom of the ImageBackground.
        width: '100%',
        paddingHorizontal: 15,
        // Add a subtle gradient or background for better readability if needed
        // backgroundColor: 'rgba(0,0,0,0.3)',
        paddingVertical: 5,
    },
    horizontalDestinationTitleOverlay: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.white, // Make text white for contrast on image
        marginBottom: 4,
    },
    horizontalDestinationInfoOverlay: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:"white",
        paddingHorizontal:5,
        paddingVertical:5,
        width:'50%',
        marginBottom:4,
        borderRadius:10,
        fontSize:12,
        fontWeight:'600'
    },
    horizontalDestinationContentainer:{
        paddingHorizontal:7,
        paddingVertical:3,
    },

    horizontalDestinationCountOverlay: {
        fontSize: 12,
        color: colors.black,
        fontWeight:'500' 
    },
    sectionTitle:{
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 10,
        color:'black'
    },
    packagesListSection: {
        paddingHorizontal: 10,
        marginTop: 20,
    },
 packagesListTitle: {
  fontSize: 15,
  fontWeight: '600',
  color: colors.darkGray,
  textAlign: 'center',
  alignSelf: 'center', // ✅ this centers the Text component itself
  backgroundColor: '#C28D3E1F',
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 6, 
  marginBottom:5// optional for better look
}
,
    packagesListsubtitle:{
  fontSize: 12,
        fontWeight: '400',
        color: colors.gray,
        marginBottom: 15,
        textAlign: 'center',
    
        paddingHorizontal:2,
        paddingVertical:2
    },
    flatListContent: {
        paddingBottom: 20,
    },
    card: {
        width: cardWidth,
        backgroundColor: colors.white,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 12,
        elevation: 4,
        shadowColor: colors.black,
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    cardImage: {
        height: 180,
        padding: 10,
        justifyContent: 'flex-start',
    },
    imageStyle: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        resizeMode: 'cover',
    },
    pill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 20,
        alignSelf: 'flex-start',
        position: 'absolute',
        bottom: 5,
        marginLeft: 5
    },
    flagIcon: {
        width: 14,
        height: 14,
        resizeMode: 'contain',
        marginRight: 6,
    },
    daysText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.black,
    },
    cardContent: {
        padding: 10,
        justifyContent: 'space-between',
    },
    titleText: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.darkGray,
        marginBottom: 10,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: colors.gold,
    },
    unit: {
        fontSize: 11,
        color: colors.mediumGray,
    },
    rating: {
        fontSize: 12,
        color: colors.orange,
        fontWeight: '600',
    },
    loadMoreButton: {
        marginVertical: 20,
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: colors.gold,
        borderRadius: 8,
    },
    loadMoreText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 12,
        backgroundColor: colors.white,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignSelf: 'center',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: colors.lightGray,
        elevation: 10,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    blueButton: {
        flex: 1,
        backgroundColor: colors.blue,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 5,
        justifyContent: 'space-evenly',
        marginHorizontal: 5,
    },
    buttonText: {
        color: colors.white,
        fontWeight: 'bold',
    },
});
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   Dimensions,
//   ImageBackground,
//   TouchableOpacity,
//   Linking,
//   FlatList
// } from 'react-native';
// import PhoneS from '../assets/images/PhoneS.svg';
// import Getqoute from '../assets/images/getQoute.svg';
// import Header from '../components/Header';
// import {
//   selectHolidayPackages,
//   fetchHolidayPackages,
// } from '../redux/slices/pakagesSlice';
// import { useSelector, useDispatch } from 'react-redux';
// import colors from '../constants/colors';
// const windowWidth = Dimensions.get('window').width;
// const cardWidth = (windowWidth - 36) / 2;
// export default function HolidayHotList({ navigation }) {
//   const dispatch = useDispatch();
//   const holidayPackages = useSelector(selectHolidayPackages);
//   const [visibleCount, setVisibleCount] = useState(10);
//   useEffect(() => {
//     dispatch(fetchHolidayPackages());
//   }, [dispatch]);

//   const loadMoreItems = () => {
//     setVisibleCount((prev) => prev + 10);
//   };
//   const visibleData = holidayPackages.slice(0, visibleCount);
//   return (
//     <View style={styles.maincontainer}>
//       <Header title="Holiday Hotlist" showNotification={true} navigation={navigation} />
//       <FlatList
//         data={visibleData}
//         keyExtractor={(item) => item.id}
//         numColumns={2}
//         columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10 }}
//         contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
//         showsVerticalScrollIndicator={false}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.card}
//             onPress={() => navigation.navigate('PakageDetails', { packageId: item.id })}
//           >
//             <ImageBackground
//               source={{ uri: item?.main_image }}
//               style={styles.cardImage}
//               imageStyle={styles.imageStyle}
//             >
//               <View style={styles.pill}>
//                 <Image
//                   source={require('../assets/images/flag.png')}
//                   style={styles.flagIcon}
//                 />
//                 <Text style={styles.daysText}>{item.duration || 'Nights'}</Text>
//               </View>
//             </ImageBackground>

//             <View style={styles.cardContent}>
//               <Text style={styles.titleText} numberOfLines={4}>
//                 {item.title}
//               </Text>
//               <View style={styles.bottomRow}>
//                 <Text style={styles.priceText}>
//                   £{item.sale_price}{' '}
//                   <Text style={styles.unit}>/{item.packagetype || 'pp'}</Text>
//                 </Text>
//                 <Text style={styles.rating}>⭐ {item.rating}</Text>
//               </View>
//             </View>
//           </TouchableOpacity>
//         )}
//         ListFooterComponent={
//           holidayPackages.length > visibleCount ? (
//             <TouchableOpacity onPress={loadMoreItems} style={styles.loadMoreButton}>
//               <Text style={styles.loadMoreText}>Load More</Text>
//             </TouchableOpacity>
//           ) : null
//         }
//       />

//       <View style={styles.bottomBar}>
//         <TouchableOpacity
//           style={[styles.blueButton, { backgroundColor: '#189900' }]}
//           onPress={() => navigation.navigate('SubmitEnquiry')}
//         >
//           <Getqoute width={20} height={20} />
//           <Text style={styles.buttonText}>Get A Quote</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.blueButton}
//           onPress={() => Linking.openURL('tel:02080382020')}
//         >
//           <PhoneS width={20} height={20} />
//           <Text style={styles.buttonText}>020 8038 2020</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
// maincontainer:{
//   flex:1,
//   //  padding:5,
//  backgroundColor:colors.white,
//     paddingBottom:80
//     },
// logoStyle:{
//       height:35,
//       width:35,
//       resizeMode:"contain"
//     },
//   container: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',

//   },
//  card: {
//   width: cardWidth,
//   backgroundColor: colors.white,
//   borderRadius: 12,
//   overflow: 'hidden',
//   marginBottom: 12,
//   elevation: 4,
//   shadowColor: colors.black,
//   shadowOpacity: 0.1,
//   shadowRadius: 6,
// },
//   cardImage: {
//     height: 180,
//     padding: 10,
//     justifyContent: 'flex-start',
//   },
//   imageStyle: {
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//     resizeMode: 'cover',
//   },
//   pill: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: colors.white,
//     paddingHorizontal: 5,
//     paddingVertical: 5,
//     borderRadius: 20,
//     alignSelf: 'flex-start',
//     position:'absolute',
//     bottom:5,
//     marginLeft:5
//   },
//   flagIcon: {
//     width: 14,
//     height: 14,
//     resizeMode: 'contain',
//     marginRight: 6,
//   },
//   daysText: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: colors.black,
//   },
//   cardContent: {
//     padding: 10,
//     justifyContent: 'space-between',
//   },
//   titleText: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: colors.darkGray,
//     marginBottom: 10,
//   },
//   bottomRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   priceText: {
//     fontSize: 13,
//     fontWeight: 'bold',
//     color: colors.gold,
//   },
//   unit: {
//     fontSize: 11,
//     color: colors.mediumGray,
//   },
//   rating: {
//     fontSize: 12,
//     color: colors.orange, // orange
//     fontWeight: '600',
//   },
//    headerContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     marginTop: 10,
//     paddingVertical: 20,
//   },
//   headerIcons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   iconButton: {
//     marginLeft: 10,
//     padding: 6,
//     backgroundColor: '#ffffff',
//     borderRadius: 10,
//     shadowColor: 'gray',
//     elevation: 5,
//   },
//  sectionTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     marginLeft: 10,
//   },
//   bottomBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     padding: 12,
//     backgroundColor: 'white',
//     position: 'absolute',
//     bottom: 0,
//     alignSelf: 'center',
//      paddingVertical: 15,
//   },
//   blueButton: {
//     flex: 1,
//     backgroundColor: '#007bff',
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     flexDirection: 'row',
//     paddingHorizontal: 5,
//     justifyContent: 'space-evenly',
//     margin: 3,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   loadMoreButton: {
//     marginVertical: 20,
//     alignSelf: 'center',
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     backgroundColor: colors.gold,
//     borderRadius: 8,
//   },
//   loadMoreText: {
//     color: colors.white,
//     fontWeight: 'bold',
//     fontSize: 16,
//   },

// });