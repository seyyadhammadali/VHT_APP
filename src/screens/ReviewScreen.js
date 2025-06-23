import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
const ReviewScreen = () => {
  // Replace this with the actual public chat URL you got from ClickConnector
  const chatUrl = 'https://widget.clickconnector.app/c070f0-5c79b/';
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: chatUrl }}
        startInLoadingState
        javaScriptEnabled
        domStorageEnabled
        mixedContentMode="always"
        originWhitelist={['*']}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ReviewScreen;
