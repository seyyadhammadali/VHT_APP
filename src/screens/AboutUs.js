import React, { useEffect,useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAboutUsPage,
  selectAboutUsPage,
  selectPagesLoading,
} from '../redux/slices/pagesSlice';
import Header from '../components/Header';
import colors from '../constants/colors';
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import RenderHtml from 'react-native-render-html';
import FooterTabs from '../components/FooterTabs';
 import NetInfo from '@react-native-community/netinfo';
import NoInternetMessage from '../components/NoInternetMessage';

const { width } = Dimensions.get('window');
 
const htmlTagStyles = {
  strong: { color: '#C28D3E', fontWeight: 'bold' },
  h1: { color: '#C28D3E', fontWeight: 'bold', fontSize: 24, marginBottom: 10 },
  h2: { color: '#C28D3E', fontWeight: 'bold', fontSize: 20, marginBottom: 8 },
  h3: { color: '#C28D3E', fontWeight: 'bold', fontSize: 18, marginBottom: 6 },
  p: { color: colors.gray, fontSize: 14, lineHeight: 22, marginBottom: 8 },
  ul: { marginBottom: 8 },
  ol: { marginBottom: 8 },
  li: { color: colors.gray, fontSize: 14, lineHeight: 22, marginLeft: 10 },
  a: { color: colors.primary, textDecorationLine: 'underline' },
};
 
const AboutUs = ({ navigation }) => {
  const dispatch = useDispatch();
  const aboutUsPage = useSelector(selectAboutUsPage);
  const loading = useSelector(selectPagesLoading);
  const [isConnected, setIsConnected] = useState(true);

  // *** NEW useEffect FOR NETWORK LISTENER ***
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        return () => {
            unsubscribe();
        };
    }, []);
  useEffect(() => {
    dispatch(fetchAboutUsPage());
  }, [dispatch]);
 
  const renderSkeleton = () => (
    <SafeAreaView style={styles.container}>
      <Header title="About Us" showNotification navigation={navigation} />
      <ScrollView contentContainerStyle={styles.mainContent}>
        <SkeletonPlaceholder borderRadius={8}>
          <View style={styles.banner} />
          <View style={styles.section}>
            <SkeletonPlaceholder.Item width="90%" height={20} marginBottom={10} />
            <SkeletonPlaceholder.Item width="100%" height={60} marginBottom={10} />
            <SkeletonPlaceholder.Item width="100%" height={60} marginBottom={10} />
            <SkeletonPlaceholder.Item width="80%" height={20} marginBottom={10} />
          </View>
        </SkeletonPlaceholder>
      </ScrollView>
    </SafeAreaView>
  );
 
  if (loading || !aboutUsPage) return renderSkeleton();
 
  return (
    <SafeAreaView style={styles.container}>
          {!isConnected ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <NoInternetMessage />
        </View>
      ) : (
        <>
      <Header title="About Us" showNotification navigation={navigation} />
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
              tagsStyles={htmlTagStyles}
            />
          ) : (
            <Text style={styles.noContentText}>
              No content found for About Us.
            </Text>
          )}
        </View>
      </ScrollView>
      <FooterTabs></FooterTabs>
         </>
       )}
    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
  container: {
 
    flex: 1,
    backgroundColor: colors.white,
  },
  mainContent: {
    paddingTop:10,
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
  noContentText: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
});
 
export default AboutUs;