import React, {useCallback, useState, useMemo} from "react";
import {  Text, ImageBackground, View, useWindowDimensions, ScrollView, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import {useGetPagesQuery, useGetDestinationsQuery} from '../redux/slices/apiSlice';
import Slider from "../components/Slider";
import { COLORS, mainStyles } from "../constants/theme";
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from "../components/Header";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import ScrollableHtmlContent from "../components/ScrollableHtmlContent";
import packageCard from "../components/packageCard";
import FooterTabs from "../components/FooterTabs";
const StaticPage = ({navigation, route})=>{ 
    const {slug} = route.params;
    const { data: pageData, isLoading: pageLoading } = useGetPagesQuery();
    const page = pageData?.data.find(itm => itm.slug === slug);
    const {height, width} = useWindowDimensions();
   const tagsStyles = {
    strong:{
        color:COLORS.black,
        fontSize:16,
        fontWeight:600,
        fontFamily:'Inter-Medium'
    },
    h1:{
        color:COLORS.black,
        fontSize:16,
        fontWeight:600,
        fontFamily:'Inter-Medium'
    },
    h2:{
        color:COLORS.black,
        fontSize:16,
        fontWeight:600,
        fontFamily:'Inter-Medium'
    },
    h3:{
        color:COLORS.black,
        fontSize:16,
        fontWeight:600,
        fontFamily:'Inter-Medium'
    },
    a:{
        color:COLORS.blue,
        fontWeight:600,
        fontSize:14,
        fontFamily:'Inter-Medium'
    }
   };
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
                    <ScrollableHtmlContent loading={pageLoading} tagsStyles={tagsStyles} heading={page?.heading} htmlContent={page?.description} alignment="left"  />
                </View>
                </ScrollView>
            <FooterTabs />
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

});
export default StaticPage;