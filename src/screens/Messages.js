import React from 'react';
import { View, StyleSheet,Image,TouchableOpacity,Text } from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '../components/Header';
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
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    paddingVertical: 20,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
    padding: 6,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: 'gray',
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10,
    // letterSpacing: 1,
  },
  logoStyle: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
cardImage: {
  flex: 1,
  justifyContent: 'space-between',
  padding: 10,
},
imageStyle: {
  borderRadius: 10,
  resizeMode: 'cover',
},
contentContainer: {
  // flex: 1,
  justifyContent: 'space-evenly',
  position:'absolute',
  bottom:18,
  left:5
},
titleText: {
  fontSize: 14,
  fontWeight: '700',
  backgroundColor: '#ffffff',
  alignSelf: 'flex-start',
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 15,
  color:'black',
  marginTop:10,
   padding:3
},
row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 6,
  borderRadius:10
},
infoBox: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  borderRadius: 15,
  paddingHorizontal: 6,
  paddingVertical: 3,
},
flagIcon: {
  width: 14,
  height: 14,
  resizeMode: 'contain',
  marginRight: 4,
},
countText: {
  color: 'red',
  fontSize: 13,
  fontWeight: '600',
  marginRight: 4, // adds space between 62 and "Tours"
},
subtitle: {
  color: 'black',
  fontSize: 13,
  fontWeight: '600',
},
});
export default Messages;
