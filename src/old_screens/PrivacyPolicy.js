import React, { useEffect ,useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import {
  selectFilteredPage
} from '../redux/slices/pagesSlice';
import FastImage from 'react-native-fast-image';
import RenderHtml from 'react-native-render-html';
import Header from '../components/Header';
import colors from '../constants/colors';
import FooterTabs from '../components/FooterTabs';
import NetInfo from '@react-native-community/netinfo';
import NoInternetMessage from '../components/NoInternetMessage';
import { useFocusEffect } from '@react-navigation/native';
import ErrorFound from '../components/ErrorFound';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const { width } = Dimensions.get('window');
const PrivacyPolicy = ({ navigation }) => {
const privacyPolicyPage = useSelector(selectFilteredPage('privacy-policy'));
 const loading = privacyPolicyPage?false:true;
const [isConnected, setIsConnected] = useState(true);
     useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        return () => {
            unsubscribe();
        };
    }, []);

     const renderSkeleton = () => (
      <SafeAreaView style={styles.safeArea}>
      <SkeletonPlaceholder borderRadius={4}>
        <View style={{ marginHorizontal: 10 }}>
          <View style={{ width: 380, height: 150, marginBottom: 10 }} /> 
          <View style={{ width: width - 40, height: 30, marginBottom: 8 }} />
          <View style={{ width: width - 20, height: 180, marginBottom: 8 }} />
          <View style={{ width: width - 40, height: 30, marginBottom: 8 }} />
          <View style={{ width: width - 20, height: 180, marginBottom: 8 }} />
          <View style={{ width: width - 20, height: 85, marginBottom: 8 }} />
          <View style={{ width: width - 20, height: 85, marginBottom: 8 }} />
          <View style={{ width: width - 60, height: 85, marginBottom: 8 }} />
          <View style={{ width: width - 100, height: 85, marginBottom: 8 }} />
        </View>
      </SkeletonPlaceholder>
    </SafeAreaView>
  );
     if (loading || !privacyPolicyPage) {
    return renderSkeleton();
  }
  return (
    <SafeAreaView style={styles.safeArea}>
       {!isConnected ? (
       <View style={styles.noInternetView}>
          <NoInternetMessage />
        </View>
       ) : (
      <>
      <Header title={privacyPolicyPage?.name || 'Privacy Policy'} showNotification={true} navigation={navigation} />
      <ScrollView style={{ paddingHorizontal: 10,marginTop:10 }}>
        {privacyPolicyPage?.banner ? (
          <FastImage
            source={{ uri: privacyPolicyPage.banner }}
            style={styles.banner}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : null}
        <View style={styles.container}>
          {privacyPolicyPage ? (
            <>
              <View style={styles.section}>
                <RenderHtml
                  contentWidth={width - 20} 
                  source={{ html: privacyPolicyPage.description }}
                  tagsStyles={{
                    strong: { color: '#C28D3E', fontWeight: 'bold' },
                    h2: { color: '#C28D3E', fontWeight: 'bold', fontSize: 20, marginBottom: 10 },
                    p: { color: colors.gray, fontSize: 14, lineHeight: 22 },
                    a: { color: colors.primary, textDecorationLine: 'underline' },
                  }}
                />
              </View>
            </>
          ) : null}
        </View>
      </ScrollView>
      <FooterTabs/>
      </>
       )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom:80
  },
noInternetView: {
 flex: 1, 
 justifyContent: 'center',
  alignItems: 'center' }, 


  banner: {
    width: '100%', 
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
    alignSelf: 'center',
    objectFit:'fill'
  },
  container: {
    paddingBottom: 20, 
    marginTop:10
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
});

export default PrivacyPolicy;