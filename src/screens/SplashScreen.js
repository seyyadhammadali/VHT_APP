import React from 'react';
import { View, Text ,StyleSheet,Image} from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <View>
   <Image source={require('../assets/images/splashLogo.png')}  style={styles.imgStyle}/>
      </View>
 
    </View>
  );
}
const styles=StyleSheet.create({
container:{
  flex:1,
  justifyContent:'center',
  // alignSelf:'center',
  backgroundColor:"#ffffff"
},
imgStyle:{
resizeMode:'cover',
height:200,
width:240,
alignSelf:'center'
}
})