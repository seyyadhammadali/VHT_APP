
import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('MainApp'); 
    }, 3000); // 3 seconds
    return () => clearTimeout(timeout); 
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splashLogo.png')}
        style={styles.imgStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  imgStyle: {
    resizeMode: 'cover',
    height: 200,
    width: 240,
    alignSelf: 'center',
  },
});
