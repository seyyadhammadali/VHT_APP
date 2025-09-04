import React,{useEffect,useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '../components/Header';
import FooterTabs from '../components/FooterTabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mainStyles } from '../constants/theme';
const LiveSupport = ({navigation}) => {
 
  const chatUrl = 'https://widget.clickconnector.app/330770-62d26/';
  return (
    <SafeAreaView style={mainStyles.safeArea} edges={['bottom', 'left', 'right']} >
      <Header title="Live Chat Support"  />
        <View style={mainStyles.container}>
          
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
      <FooterTabs/>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
export default LiveSupport;
