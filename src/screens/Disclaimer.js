
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
const { width } = Dimensions.get('window');
const Disclaimer = ({ navigation }) => {
 
  const disclaimerPage = useSelector(selectFilteredPage('disclaimer'));

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
  return (
    <SafeAreaView style={styles.container}>
        {!isConnected ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
        ) : (
          <Text>Loading...</Text>
        )}
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
    section:{
    paddingHorizontal:20
  },

});

export default Disclaimer;
