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
const HolidayHotlist = ({navigation, route})=>{ 
    const { data: pageData, isLoading: pageLoading } = useGetPagesQuery();
    const page = pageData?.data.find(itm => itm.slug === 'holiday-hotlist');
    const {height, width} = useWindowDimensions();
    const {data: destinationData, isLoading:destinationLoading, error: destinationError} = useGetDestinationsQuery();
    const destinations = destinationData?.data.filter(itm=>itm.hot === 1);
    const packages = page?.products;
    console.log("Page", page);
    const handleNavigate = useCallback((destinationId) => {
        navigation.navigate('PackageDetails', { destinationId });
      }, [navigation]);
    
    const DestinationCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleNavigate(item.id)}>
        <ImageBackground source={{ uri: item?.banner }} style={styles.cardImage}>
        <View style={styles.contentContainer}>
            <View style={{flexDirection:"column"}}>
                <Text style={styles.titleText} numberOfLines={2} ellipsizeMode="tail">{item.name}</Text>
                <View style={styles.infoBox}>
                    <FlagSVG width={14} height={14} style={styles.flagIcon} />
                    <Text style={styles.countText}>{item.total_packages}</Text>
                    <Text style={styles.subtitle}> Tours</Text>
                </View>
            </View>
        </View>
        </ImageBackground>
    </TouchableOpacity>
    );

    const [displayCount, setDisplayCount] = useState(10);
    const visiblePackages = useMemo(() => packages?.slice(0, displayCount), [packages, displayCount]);
    const showLoadMoreButton = packages?.length > visiblePackages?.length;
    
    return (
        <>
        <SafeAreaView style={mainStyles.safeArea} edges={['bottom', 'left', 'right']}>
            <Header title="Holiday Hotlist" />
            <ScrollView 
                style={mainStyles.container}
                contentContainerStyle={mainStyles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <Slider images={page?.sliders} loading={pageLoading}  width={(width - 40)} />
                {!destinationLoading ?(
                    <View>
                        <View style={{flexDirection:'row', justifyContent:"space-between", marginBottom:10}}>
                            <Text style={mainStyles.heading}>Top Destinations</Text>
                            <TouchableOpacity onPress={()=> navigation.navigate('Destinations')}>
                                <Text style={mainStyles.link}>See all</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                        data={destinations}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={DestinationCard}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.columnWrapper}
                        />
                    </View>
                ):(
                    <SkeletonPlaceholder>
                        <SkeletonPlaceholder.Item
                            width="100%"
                            height={50}
                            borderRadius={12}
                        />
                        <View style={{ flexDirection: 'row', paddingVertical: 10, gap:10 }}>
                        {[...Array(3)].map((_, index) => (
                            <SkeletonPlaceholder.Item
                            key={`skeleton-${index}`}
                            width={160}
                            height={220}
                            borderRadius={12}
                            />
                        ))}
                        </View>
                    </SkeletonPlaceholder>
                )}
                {!pageLoading ? (
                    <View>
                    <FlatList
                        data={visiblePackages}
                        numColumns={2}
                        keyExtractor={item => item.id.toString()}
                        columnWrapperStyle={styles.columnWrapper}
                        renderItem={({item})=>packageCard({item, days:true})}
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
  loadMoreButton: { backgroundColor: COLORS.black, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, alignSelf: 'center', marginTop: 10, marginBottom:20 },
  loadMoreButtonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
});
export default HolidayHotlist;