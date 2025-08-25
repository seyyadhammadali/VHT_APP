

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, ImageBackground, FlatList} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import NoInternetMessage from '../components/NoInternetMessage';
import FlagSVG from '../assets/images/flagS.svg';
import Header from '../components/Header';
import { selectFilteredPage } from '../redux/slices/pagesSlice';
import { selectHotDestinations } from '../redux/slices/destinationsSlice';
import {selectHolidayPackages,fetchHolidayPackages,} from '../redux/slices/pakagesSlice';
import { useSelector, useDispatch } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../constants/colors'
import {  getResponsiveDimensions } from '../constants/sliderConfig';
import Slider from '../components/Slider';
import QuoteFooter from '../components/QuoteFooter';
const { width, height } = Dimensions.get('window');
const bannerConfig = getResponsiveDimensions('BANNER');
const cardWidth = (width - 36) / 2;
const horizontalItemWidth = width * 0.35;
export default function HolidayHotList({ navigation }) {
    const dispatch = useDispatch();
    const holidayPackages = useSelector(selectHolidayPackages);
    const single = useSelector(selectFilteredPage('holiday-hotlist'));
    const destinations = useSelector(selectHotDestinations);
    const sliders = single?.sliders ; 
    const [visibleCount, setVisibleCount] = useState(10);
    const visibleHolidayPackages = holidayPackages.slice(0, visibleCount);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [contentHeight, setContentHeight] = useState(1);
    const [containerHeight, setContainerHeight] = useState(1);
    const thumbHeight = Math.max((containerHeight / contentHeight) * containerHeight, 30);
    const maxThumbPosition = containerHeight - thumbHeight;
    const thumbPosition = Math.min(
        (scrollPosition / (contentHeight - containerHeight)) * maxThumbPosition || 0,
        maxThumbPosition
    );
const isLoading = single?false:true;
const [isConnected, setIsConnected] = useState(true);
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        return () => {
            unsubscribe();
        };
    }, []);
    useEffect(() => {
        dispatch(fetchHolidayPackages());
    }, [dispatch]);

    const loadMoreItems = () => {
        setVisibleCount((prev) => prev + 10);
    };
    const renderPackageItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('PakageDetails', { packageSlug: item.slug })}>
         <ImageBackground
        source={{ uri: item?.main_image }}
         style={styles.cardImage}
        imageStyle={styles.imageStyle} >
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

    const renderDestinationItem = ({ item }) => (
        <TouchableOpacity
            style={styles.horizontalDestinationCard}
            onPress={() => navigation.navigate('MaldivesPackages', { destinationId: item.id, destinationName: item.name })}
        >
            <ImageBackground
                source={{ uri: item.banner }}
                style={styles.horizontalDestinationImage}
                imageStyle={{ borderRadius: 10 }}
            >
                <View style={styles.horizontalDestinationContentainer}>
                    <Text style={styles.horizontalDestinationInfoOverlay} numberOfLines={1}>
                        {item.name}
                    </Text>
                    <View style={styles.horizontalDestinationInfoOverlay}>
                        <FlagSVG width={12} height={12} style={{ marginRight: 4 }} />
                        <Text style={styles.horizontalDestinationCountOverlay}><Text style={{ color: "red", fontWeight: '600' }}>{item.total_packages || 0}</Text> Tours</Text>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
    const baseTagStyles = {

        p: {
            fontSize: 14,
            color: 'black',
            marginBottom: 10,
            paddingBottom: 0,
        },
        h1: {
            color: colors.black,
            fontWeight: 'bold',
            fontSize: 16,
            paddingVertical: 4,
            borderRadius: 6,
            marginBottom: 10,
            textAlign: 'center',
        },
        h3: {
            color: colors.black,
            fontWeight: 'bold',
            fontSize: 16,
            paddingVertical: 4,
            borderRadius: 6,
            marginBottom: 10,
            textAlign: 'center',
        },
        strong: { fontWeight: 'bold', color: 'black', },
        em: { fontStyle: 'italic' },
        ul: { marginBottom: 5 },
        ol: { marginBottom: 5 },
        li: {
            fontSize: 14,
            color: 'black',
            marginLeft: 10,
            marginBottom: 3,
        },
        a: {
            color: 'blue',
            textDecorationLine: 'underline',
        }
    };
    const ScreenSkeleton = () => (
        <SkeletonPlaceholder borderRadius={10}>
            <View style={{ paddingHorizontal: 10 }}>
                {/* Slider Placeholder */}
                <SkeletonPlaceholder.Item
                    width={width - 20}
                    height={bannerConfig.HEIGHT}
                    borderRadius={10}
                    marginVertical={15}
                />
                
                {/* Top Destinations Title Placeholder */}
                <SkeletonPlaceholder.Item width={150} height={20} marginTop={20} marginBottom={10} />
                
                {/* Horizontal Destinations List Placeholder */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {[...Array(2)].map((_, index) => (
                        <SkeletonPlaceholder.Item
                            key={index}
                            width={(width - 40) / 2}
                            height={((width - 40) / 2) * 1.5}
                            borderRadius={10}
                            marginRight={10}
                        />
                    ))}
                </View>
                
                {/* Packages Section Title Placeholder */}
                <SkeletonPlaceholder.Item width={250} height={20} marginTop={20} marginBottom={10} alignSelf="center" />
                
                {/* Packages Grid Placeholder */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {[...Array(4)].map((_, index) => (
                        <SkeletonPlaceholder.Item
                            key={index}
                            width={(width - 40) / 2}
                            height={250}
                            marginBottom={15}
                            borderRadius={12}
                        />
                    ))}
                </View>
            </View>
        </SkeletonPlaceholder>
    );
return (
 <View style={styles.container}>
 {!isConnected ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <NoInternetMessage />
 </View>
 ) : (
     <>
   <Header title="Holiday Hot List" showNotification={true} navigation={navigation} />
   <ScrollView
    contentContainerStyle={styles.mainScrollContainer}
    showsVerticalScrollIndicator={false}
     >
     {isLoading ? (
    <ScreenSkeleton />
     ) : (
    <>
    <Slider images={sliders} />
      <View style={styles.horizontalDestinationsSection}>
        <View style={styles.headingtop}>
          <Text style={styles.sectionTitle}>All Destinations</Text>
            <TouchableOpacity onPress={() => navigation.navigate('TopDestination')}>
              <Text style={styles.sectionTitlelight}>See all</Text>
            </TouchableOpacity>
           </View>
         <FlatList
          data={destinations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderDestinationItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalFlatListContent}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={9}
        />
      </View>               
   <View style={styles.packagesListSection}>
    <Text style={styles.packagesListTitle}>All-Inclusive Holiday Packages 2025-26</Text>
    <Text style={styles.packagesListsubtitle}>Scroll through luxury Holiday Packages 2025 deals handpicked by our UK travel experts for you and your loved ones.</Text>
     <FlatList
      data={visibleHolidayPackages}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      columnWrapperStyle={{ justifyContent: 'space-between'}}
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
 </View>
      </>
  )}
   </ScrollView>
<QuoteFooter />
</>
)}
 </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingBottom: 80,
    },
    hotlistSliderSection: {
        paddingHorizontal: 10,
        marginVertical: 0,
    },
    hotlistItem: {
        width: bannerConfig.WIDTH,
        height: bannerConfig.HEIGHT,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
    },
    hotlistItemImage: {
        width: '100%',
        height: '100%',
        objectFit: 'fill',
        borderRadius: 10,
    },
    hotlistItemOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    hotlistItemTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        marginHorizontal: 4,
    },
    paginationDotActive: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    noDataText: {
        textAlign: 'center',
        color: 'gray',
        marginTop: 20,
    },
    mainScrollContainer: {
        paddingBottom: 20,
        paddingHorizontal:10
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
        width: bannerConfig.WIDTH,
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
    sectionTitlelight: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 2,
        color: 'lightgray'
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
    headingtop: {
        flexDirection: 'row',
        justifyContent: "space-between"
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
        paddingHorizontal: 0
    },
    horizontalDestinationCard: {
        width: width * 0.4,
        
        backgroundColor: colors.white,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    horizontalDestinationImage: {
        width: '100%',
        height: horizontalItemWidth * 1.6,
        borderRadius: 10,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingBottom: 10,
    },

    horizontalDestinationContentainer: {
        padding:5
    },

    horizontalDestinationCountOverlay: {
        fontSize: 12,
        color: colors.black,
        fontWeight: '500'
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 10,
        color: 'black',
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
        alignSelf: 'center',
        backgroundColor: '#C28D3E1F',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
        marginBottom: 5
    },
    packagesListsubtitle: {
        fontSize: 12,
        fontWeight: '400',
        color: colors.gray,
        marginBottom: 15,
        textAlign: 'center',

        paddingHorizontal: 2,
        paddingVertical: 2
    },
    flatListContent: {
        paddingBottom: 20
    },
    card: {
        width: '48%',
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
        backgroundColor: colors.black,
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
    horizontalDestinationInfoOverlay: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "white",
        paddingHorizontal: 5,
        paddingVertical: 5,
        width: '50%',
        marginBottom: 4,
        borderRadius: 10,
        fontSize: 12,
        fontWeight: '600'
    },
    horizontalFlatListContent: {
        gap:10
    },
});