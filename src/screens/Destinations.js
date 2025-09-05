import React, { useState, useMemo, useCallback } from 'react';
import { Text, View, ScrollView, StyleSheet, FlatList, TouchableOpacity, ImageBackground, useWindowDimensions } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useGetPagesQuery, useGetDestinationsQuery } from '../redux/slices/apiSlice';
import Slider from "../components/Slider";
import ScrollableHtmlContent from "../components/ScrollableHtmlContent";
import Header from "../components/Header";
import FlagSVG from '../assets/images/flagS.svg';
import HeartSVG from '../assets/images/Heart.svg';
import { COLORS, mainStyles } from "../constants/theme";
import QuoteFooter from '../components/QuoteFooter';
const Destinations = ({ navigation }) => {
  const { data: pageData, isLoading: pageLoading } = useGetPagesQuery();
  const { data: destinationData, isLoading: destinationLoading } = useGetDestinationsQuery();
  const destinations = destinationData?.data.filter(itm => itm.parent === 0);
  const page = pageData?.data.find(itm => itm.slug === 'destinations');
  const { width } = useWindowDimensions();

  const [displayCount, setDisplayCount] = useState(10);
  const visibleDestinations = useMemo(() => destinations?.slice(0, displayCount), [destinations, displayCount]);
  const showLoadMoreButton = destinations?.length > visibleDestinations?.length;

  const handleNavigate = useCallback((destinationId) => {
    navigation.navigate('PackageDetails', { destinationId });
  }, [navigation]);

  const DestinationCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleNavigate(item.id)}>
      <ImageBackground source={{ uri: item?.banner }} style={styles.cardImage}>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText} numberOfLines={2} ellipsizeMode="tail">{item.name}</Text>
          <View style={styles.arrowRight}>
            <View style={styles.infoBox}>
              <FlagSVG width={14} height={14} style={styles.flagIcon} />
              <Text style={styles.countText}>{item.total_packages}</Text>
              <Text style={styles.subtitle}>Tours</Text>
            </View>
            <HeartSVG width={26} height={26} />
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <>
      <Header title="Destinations" />
      <SafeAreaView style={mainStyles.safeArea} edges={['bottom', 'left', 'right']}>
        <ScrollView style={mainStyles.container} contentContainerStyle={mainStyles.contentContainer} showsVerticalScrollIndicator={false}>
          <Slider images={page?.sliders} loading={pageLoading} width={width - 40} height={180} />
          <ScrollableHtmlContent loading={pageLoading} heading={page?.heading} htmlContent={page?.description} alignment="center" boxHeight={110} />
          {!destinationLoading ? (
            <View>
              <FlatList
                data={visibleDestinations}
                numColumns={2}
                keyExtractor={item => item.id.toString()}
                columnWrapperStyle={styles.columnWrapper}
                renderItem={DestinationCard}
                scrollEnabled={false}
              />
              {showLoadMoreButton && (
                <TouchableOpacity style={styles.loadMoreButton} onPress={() => setDisplayCount(prev => prev + 10)}>
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
      </SafeAreaView>
      <QuoteFooter />
    </>
  );
};

const styles = StyleSheet.create({
  card: { flex: 1, height: 220, backgroundColor: COLORS.secondaryBg, borderRadius: 10, marginBottom: 10, overflow: 'hidden' },
  cardImage: { flex: 1, justifyContent: 'space-between', padding: 0 },
  contentContainer: { width:"100%", position: 'absolute', bottom: 10, paddingInline: 10}, 
  titleText: { fontSize: 14, fontWeight: '500', fontFamily:'Inter-Medium', backgroundColor: COLORS.white, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 15 , alignSelf: 'flex-start'},
  infoBox: { flexDirection: 'row', alignItems: 'center', fontFamily:'Inter-Bold', backgroundColor: COLORS.white, borderRadius: 15, paddingHorizontal: 6, paddingVertical: 3, marginTop: 6, alignSelf : "flex-start" },
  arrowRight: {flexDirection: 'row', justifyContent:"space-between", alignItems: 'center'},
  flagIcon: { marginRight: 4 },
  countText: { color: COLORS.red, fontSize: 13, fontWeight: '800' },
  subtitle: { color: COLORS.black, fontSize: 13, fontWeight: '800' },
  columnWrapper: { justifyContent: 'space-between', gap: 15, paddingBottom: 10 },
  loadMoreButton: { backgroundColor: COLORS.black, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, alignSelf: 'center', marginTop: 10, marginBottom:20 },
  loadMoreButtonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
  skeletonRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 15 },
});

export default Destinations;
