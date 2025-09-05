import React, {useCallback, useState, useMemo} from "react";
import {  Text, ImageBackground, View, useWindowDimensions, ScrollView, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import {useGetPagesQuery, useGetDestinationsQuery} from '../redux/slices/apiSlice';
import Slider from "../components/Slider";
import { COLORS, mainStyles, SHADOWS } from "../constants/theme";
import QuoteFooter from "../components/QuoteFooter";
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from "../components/Header";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import ScrollableHtmlContent from "../components/ScrollableHtmlContent";
import FastImage from "react-native-fast-image";
import SpecialOfferTag from '../assets/images/specialOffer.svg';
const SpecialOffers = ({navigation})=>{ 
    const { data: pageData, isLoading: pageLoading } = useGetPagesQuery();
    const page = pageData?.data.find(itm => itm.slug === 'holiday-deal');
    const {height, width} = useWindowDimensions();
    const packages = page?.products;
    console.log("Page", page);
    const [displayCount, setDisplayCount] = useState(10);
    const visiblePackages = useMemo(() => packages?.slice(0, displayCount), [packages, displayCount]);
    const showLoadMoreButton = packages?.length > visiblePackages?.length;
    const packageCard = useCallback(({item})=>(
        <View  style={{flex:1,padding:5}}>
            <SpecialOfferTag  style={styles.infoBox} />
            <View
                 style={{
                    flex:1,
                    ...SHADOWS.medium,
                    flexDirection: 'column',
                    backgroundColor: COLORS.white,
                    borderRadius: 15,
                    overflow:'hidden'
                  }}
                >
                    <FastImage
                        source={{ uri: item?.main_image }}
                        style={{
                        width:"100%",
                        height: 150,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    /> 
                 
                  <View style={{ flexDirection: 'column', padding: 10, justifyContent:'space-between' }}>
                    <TouchableOpacity onPress={() => { /* Add navigation or action here */ }}>
                        <Text style={{ ...mainStyles.postTitle, textAlign: 'left' }}>
                            {item?.title?.length > 40 ? `${item.title.slice(0, 40)}...` : item?.title || 'Untitled'}
                        </Text>
                        <Text style={{ color: COLORS.secondary, textAlign: 'left', lineHeight: 22, fontSize: 14 }}>
                            {item.city.length > 50 ? `${item.city.slice(0, 50)}...` : item.city}
                        </Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <Text style={mainStyles.price}>
                            £ {item?.sale_price || item?.price || 'N/A'}{' '}
                            <Text style={mainStyles.priceSpan}>
                            /{item?.packagetype || 'N/A'}
                            </Text>
                        </Text>
                        <Text  >
                          {item?.duration}
                        </Text>
                    </View>
                  </View>
            </View>
        </View>
    ), []);
    return (
        <>
        <SafeAreaView style={mainStyles.safeArea} edges={['bottom', 'left', 'right']}>
            <Header title={'Exclusive Deals'}/>
            <ScrollView 
                style={mainStyles.container}
                contentContainerStyle={mainStyles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <Slider images={page?.sliders} loading={pageLoading}  width={(width - 40)} />
                <View>
                    <ScrollableHtmlContent loading={pageLoading} heading={page?.heading} htmlContent={page?.description} alignment="center" boxHeight={110} />
                </View>
                {!pageLoading ? (
                    <View>
                    <FlatList
                        data={visiblePackages}
                        numColumns={2}
                        keyExtractor={item => item.id.toString()}
                        columnWrapperStyle={styles.columnWrapper}
                        renderItem={({item})=>packageCard({item})}
                        scrollEnabled={false}
                    />
                    {showLoadMoreButton && (
                        <TouchableOpacity style={styles.loadMoreButton} onPress={() => setDisplayCount(prev => prev + 6)}>
                        <Text style={styles.loadMoreButtonText}>Load More</Text>
                        </TouchableOpacity>
                    )}
                    </View>
                ) : (
                    <SkeletonPlaceholder>
                    {[...Array(2)].map((_, idx) => (
                        <View key={idx} style={styles.skeletonRow}>
                        {[...Array(2)].map((_, i) => (
                            <SkeletonPlaceholder.Item key={i} flex={1} height={220} borderRadius={12} />
                        ))}
                        </View>
                    ))}
                    </SkeletonPlaceholder>
                )}
                <ScrollableHtmlContent loading={pageLoading} htmlContent={page?.long_description} alignment="center" boxHeight={200} />
            </ScrollView>
            <QuoteFooter />
        </SafeAreaView>
        </>
    );
};
const styles = StyleSheet.create({
  infoBox: { position:'absolute', top:-1, left:0, zIndex:11 },
 columnWrapper: { justifyContent: 'space-between', gap: 5, paddingBottom: 10 },
  loadMoreButton: { backgroundColor: COLORS.black, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, alignSelf: 'center', marginTop: 10,  },
  loadMoreButtonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
});
export default SpecialOffers;