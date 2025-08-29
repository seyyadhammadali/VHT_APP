
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
} from 'react-native';
import {  useSelector } from 'react-redux';
import { selectFilteredPage} from '../redux/slices/pagesSlice';
import Header from '../components/Header';
import colors from '../constants/colors';
import RenderHtml from 'react-native-render-html';
import { Dimensions } from 'react-native';
import FooterTabs from '../components/FooterTabs';
import NetInfo from '@react-native-community/netinfo';
import NoInternetMessage from '../components/NoInternetMessage';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const { width } = Dimensions.get('window');
const Disclaimer = ({ navigation }) => {
  const disclaimerPage = useSelector(selectFilteredPage('disclaimer'));
  const loading = disclaimerPage?false:true;
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
    <SafeAreaView style={styles.container}>
      <Header title="About Us" showNotification navigation={navigation} />
      <ScrollView contentContainerStyle={styles.mainContent}>
        <SkeletonPlaceholder borderRadius={8}>
          <View style={styles.banner} />
          <View style={styles.section}>
            <SkeletonPlaceholder.Item width={'60%'} height={25} marginBottom={10} marginTop={20} />
            <SkeletonPlaceholder.Item width={'100%'} height={405} marginBottom={10} />
          </View>
        </SkeletonPlaceholder>
      </ScrollView>
      <FooterTabs />
    </SafeAreaView>
  );
  if (loading || !disclaimerPage) {
    return renderSkeleton();
  }
  return (
    <SafeAreaView style={styles.container}>
        {!isConnected ? (
        <View style={styles.noInternetView}>
          <NoInternetMessage />
        </View>
      ) : (
        <>
      <Header title="Disclaimer" showNotification={true} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.mainContent}>
        <View style={{ marginBottom: 20 }} />
        {disclaimerPage ? (
          <View style={styles.section}>
            <RenderHtml
              contentWidth={width - 40}
              source={{ html: disclaimerPage.description }}
              tagsStyles={{
                h2: { color: '#C28D3E', fontWeight: 'bold', fontSize: 20, marginBottom: 10 },
                p: { color: colors.gray, fontSize: 14, lineHeight: 22 },
                a: { color: colors.primary, textDecorationLine: 'underline' },
              }}
            />
          </View>
        ) :null}
      </ScrollView>
      <FooterTabs/>
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
   noInternetView:
    {flex: 1, 
      justifyContent: 'center',
       alignItems: 'center' }, 
    section:{
    paddingHorizontal:20
  },

});

export default Disclaimer;
