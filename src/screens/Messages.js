import React from 'react';
import { View, StyleSheet,Image,TouchableOpacity,Text } from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '../components/Header';
import colors from '../constants/colors';
const Messages = ({navigation}) => {
  
  const chatUrl = 'https://widget.clickconnector.app/c070f0-5c79b/';
  return (
    <View style={styles.container}>
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
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
export default Messages;
