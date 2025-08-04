import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAboutUsPage, selectAboutUsPage, selectPagesLoading } from '../redux/slices/pagesSlice'; // Import selectPagesLoading
import Header from '../components/Header';
import colors from '../constants/colors';
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import RenderHtml from 'react-native-render-html'; 
const { width } = Dimensions.get('window');
const AboutUs = ({ navigation }) => {
    const dispatch = useDispatch();
    const aboutUsPage = useSelector(selectAboutUsPage);
    const loading = useSelector(selectPagesLoading); 
    useEffect(() => {
        dispatch(fetchAboutUsPage());
    }, [dispatch]);
    if (loading || !aboutUsPage) {
        return (
   <SafeAreaView style={styles.container}>
 <Header title="About Us" showNotification={true} navigation={navigation} />
 <ScrollView contentContainerStyle={styles.mainContent}>
 <SkeletonPlaceholder borderRadius={8}>
<View style={styles.skeletonBanner} />
 <View style={styles.section}>
 {/* Skeletons for title and description */}
<SkeletonPlaceholder.Item width={'90%'} height={20} marginBottom={10} />
<SkeletonPlaceholder.Item width={'100%'} height={60} marginBottom={10} />
<SkeletonPlaceholder.Item width={'100%'} height={60} marginBottom={10} />
 <SkeletonPlaceholder.Item width={'80%'} height={20} marginBottom={10} />
</View>
</SkeletonPlaceholder>
</ScrollView>
 </SafeAreaView>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header title="About Us" showNotification={true} navigation={navigation} />
            <ScrollView contentContainerStyle={styles.mainContent}>
                {aboutUsPage.banner && (
                    <FastImage
                        source={{ uri: aboutUsPage.banner }}
                        style={styles.banner}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                )}
                <View style={styles.section}>
                    {aboutUsPage.description ? (
                        <RenderHtml
                            contentWidth={width - 40} 
                            source={{ html: aboutUsPage.description }}
                            tagsStyles={{
                                strong: { color: '#C28D3E', fontWeight: 'bold' },
                                h1: { color: '#C28D3E', fontWeight: 'bold', fontSize: 24, marginBottom: 10 },
                                h2: { color: '#C28D3E', fontWeight: 'bold', fontSize: 20, marginBottom: 8 },
                                h3: { color: '#C28D3E', fontWeight: 'bold', fontSize: 18, marginBottom: 6 },
                                p: { color: colors.gray, fontSize: 14, lineHeight: 22, marginBottom: 8 },
                                ul: { marginBottom: 8 },
                                ol: { marginBottom: 8 },
                                li: { color: colors.gray, fontSize: 14, lineHeight: 22, marginLeft: 10 },
                                a: { color: colors.primary, textDecorationLine: 'underline' },
                            }}
                        />
                    ) : (
                        <Text style={{ textAlign: 'center', color: 'gray', marginTop: 20 }}>
                            No content found for About Us.
                        </Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    mainContent: {
        paddingHorizontal: 15,
    },
    section: {
        paddingBottom: 40,
    },
    banner: {
        width: width - 30,
        height: 180,
        borderRadius: 12,
        marginBottom: 16,
        alignSelf: 'center',
    },
    skeletonBanner: {
        width: width - 30,
        height: 180,
        borderRadius: 12,
        marginBottom: 16,
        alignSelf: 'center',
    },
});
export default AboutUs;