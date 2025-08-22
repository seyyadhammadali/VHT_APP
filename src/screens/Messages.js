import React,{useEffect,useState} from 'react';
import { View, StyleSheet,Image,TouchableOpacity,Text } from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '../components/Header';
import colors from '../constants/colors';
import FooterTabs from '../components/FooterTabs';

import NetInfo from '@react-native-community/netinfo';
import NoInternetMessage from '../components/NoInternetMessage';
const Messages = ({navigation}) => {
 const [isConnected, setIsConnected] = useState(true);
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        return () => {
            unsubscribe();
        };
    }, []);  
  const chatUrl = 'https://widget.clickconnector.app/330770-62d26/';
  return (
    <View style={styles.container}>

        {!isConnected ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <NoInternetMessage />
        </View>
      ) : (
        <>
        <Header title="Messages" showNotification={true} navigation={navigation} />
           <WebView
        source={{ uri: chatUrl }}
        startInLoadingState
        javaScriptEnabled
        domStorageEnabled
        mixedContentMode="always"
        originWhitelist={['*']}
        style={styles.WebViewStyle}
      />
      <FooterTabs></FooterTabs>
       </>
       )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
export default Messages;
