import React, {useCallback, useState, useMemo} from "react";
import {  Text, ImageBackground, View, useWindowDimensions, ScrollView, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import HomeHeader from '../components/HomeHeader';
import {useGetPagesQuery, useGetDestinationsQuery} from '../redux/slices/apiSlice';
import Slider from "../components/Slider";
import FastImage from "react-native-fast-image";
import { COLORS, mainStyles } from "../constants/theme";
import FlagSVG from '../assets/images/flagS.svg';
import HeartSVG from '../assets/images/Heart.svg';
import PagePackagesList from "../components/PagePackagesList";
import QuoteFooter from "../components/QuoteFooter";
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from "../components/Header";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import ScrollableHtmlContent from "../components/ScrollableHtmlContent";
import packageCard from "../components/packageCard";
const CategoryScreen = ({navigation, route})=>{ 
    const {slug} = route.params;
    const { data: pageData, isLoading: pageLoading } = useGetPagesQuery();
    const page = pageData?.data.find(itm => itm.slug === slug);
    const {height, width} = useWindowDimensions();
    const packages = page?.products;
    console.log("Page", page);
    const [displayCount, setDisplayCount] = useState(10);
    const visiblePackages = useMemo(() => packages?.slice(0, displayCount), [packages, displayCount]);
    const showLoadMoreButton = packages?.length > visiblePackages?.length;
    
    return (
        <>
        <SafeAreaView style={mainStyles.safeArea} edges={['bottom', 'left', 'right']}>
            <Header title={page?.name || 'Category Page'}/>
            <ScrollView 
                style={mainStyles.container}
                contentContainerStyle={mainStyles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <Slider images={page?.sliders} loading={pageLoading}  width={(width - 40)} />
                <View>
                    <ScrollableHtmlContent loading={pageLoading} heading={page?.heading} htmlContent={page?.description} alignment="center" boxHeight={110} />
                    <ScrollableHtmlContent loading={pageLoading}  htmlContent={page?.flight_info} alignment="center" tagsStyles={{h2:{
                    ...mainStyles.contentHeading, backgroundColor: COLORS.headingBg
                }}} />
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
  card: { width:160, height: 220, backgroundColor: COLORS.secondaryBg, borderRadius: 10, marginBottom: 10, overflow: 'hidden' },
  cardImage: { flex: 1, justifyContent: 'space-between', padding: 0 },
  contentContainer: { flexDirection: "column", position: 'absolute', bottom: 10, paddingHorizontal: 10 },
  titleText: { fontSize: 14, fontWeight: '500', fontFamily:'Inter-Medium', backgroundColor: COLORS.white, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 15 , alignSelf: 'flex-start'},
  infoBox: { flexDirection: 'row', alignItems: 'center', fontFamily:'Inter-Bold', backgroundColor: COLORS.white, borderRadius: 15, paddingHorizontal: 6, paddingVertical: 3, marginTop: 6, alignSelf : "flex-start" },
  flagIcon: { marginRight: 4 },
  countText: { color: COLORS.red, fontSize: 13, fontWeight: '800' },
  subtitle: { color: COLORS.black, fontSize: 13, fontWeight: '800' },
  columnWrapper: { justifyContent: 'space-between', gap: 15, paddingBottom: 10 },
  loadMoreButton: { backgroundColor: COLORS.black, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, alignSelf: 'center', marginTop: 10,  },
  loadMoreButtonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
});
export default CategoryScreen;