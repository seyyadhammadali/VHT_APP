import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectTermAndConditionPage,
    fetchTermAndConditionPage,
    selectPagesLoading // Import the loading state selector
} from '../redux/slices/pagesSlice';
import FastImage from 'react-native-fast-image';
import RenderHtml from 'react-native-render-html';
import Header from '../components/Header';
import colors from '../constants/colors';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'; // Import SkeletonPlaceholder

const { width } = Dimensions.get('window');

const TermAndConditions = ({ navigation }) => {
    const dispatch = useDispatch();
    const termsAndConditionsPage = useSelector(selectTermAndConditionPage);
    const loading = useSelector(selectPagesLoading); // Get the loading state

    useEffect(() => {
        dispatch(fetchTermAndConditionPage());
    }, [dispatch]);

    // This is the skeleton loading state
    if (loading || !termsAndConditionsPage) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <Header title="Term & Conditions" showNotification={true} navigation={navigation} />
                <ScrollView contentContainerStyle={styles.container}>
                    <SkeletonPlaceholder>
                        <View style={styles.skeletonContainer}>
                            <SkeletonPlaceholder.Item width={width - 20} height={180} borderRadius={12} alignSelf='center' marginBottom={16} />
                            {/* Skeleton for the title */}
                            <SkeletonPlaceholder.Item width={width * 0.7} height={22} borderRadius={4} marginBottom={10} />
                            {/* Skeletons for the description text */}
                            <SkeletonPlaceholder.Item>
                                <SkeletonPlaceholder.Item width={'100%'} height={14} borderRadius={4} marginBottom={6} />
                                <SkeletonPlaceholder.Item width={'95%'} height={14} borderRadius={4} marginBottom={6} />
                                <SkeletonPlaceholder.Item width={'80%'} height={14} borderRadius={4} marginBottom={6} />
                                <SkeletonPlaceholder.Item width={'100%'} height={14} borderRadius={4} marginBottom={6} />
                                <SkeletonPlaceholder.Item width={'90%'} height={14} borderRadius={4} marginBottom={20} />

                                <SkeletonPlaceholder.Item width={width * 0.6} height={18} borderRadius={4} marginBottom={10} />
                                <SkeletonPlaceholder.Item width={'100%'} height={14} borderRadius={4} marginBottom={6} />
                                <SkeletonPlaceholder.Item width={'95%'} height={14} borderRadius={4} marginBottom={6} />
                                <SkeletonPlaceholder.Item width={'70%'} height={14} borderRadius={4} marginBottom={6} />
                            </SkeletonPlaceholder.Item>
                        </View>
                    </SkeletonPlaceholder>
                </ScrollView>
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <Header title={termsAndConditionsPage?.name || 'Term & Conditions'} showNotification={true} navigation={navigation} />
            <ScrollView>
                {termsAndConditionsPage?.banner && (
                    <FastImage
                        source={{ uri: termsAndConditionsPage.banner }}
                        style={styles.banner}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                )}
                <View style={styles.container}>
                    {termsAndConditionsPage ? (
                        <>
                            <Text style={styles.sectionTitle}>{termsAndConditionsPage.name}</Text>
                            <View style={styles.section}>
                                <RenderHtml
                                    contentWidth={width - 40}
                                    source={{ html: termsAndConditionsPage.description }}
                                    tagsStyles={{
                                        strong: { color: '#C28D3E', fontWeight: 'bold' },
                                        h2: { color: '#C28D3E', fontWeight: 'bold', fontSize: 20, marginBottom: 10 },
                                        p: { color: colors.gray, fontSize: 14, lineHeight: 22 },
                                        a: { color: colors.primary, textDecorationLine: 'underline' },
                                    }}
                                />
                            </View>
                        </>
                    ) : (
                         <Text>No terms and conditions found.</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.white,
    },
    banner: {
        width: width - 20,
        height: 180,
        borderRadius: 12,
        marginBottom: 16,
        alignSelf: 'center',
    },
    container: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.darkGray,
    },
    section: {
        paddingBottom: 20,
    },
    skeletonContainer: {
        paddingHorizontal: 20, 
    },
});

export default TermAndConditions;