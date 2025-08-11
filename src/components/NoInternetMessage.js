// NoInternetMessage.js
import React from 'react';
import { View, Text,StyleSheet } from 'react-native';


const NoInternetMessage = () => {
  return (
    <View style={styles.container}>
      <Text>No internet connection. Please check your settings.</Text>
       <Text>No internet connection. Please check your settings.</Text>
       
       
       

    </View>
  );
};
const styles=StyleSheet.create({

    container:{
        flex:1
    }
})

export default NoInternetMessage;