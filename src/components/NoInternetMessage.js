import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Linking } from 'react-native';
import EmptyState from '../assets/images/EmptyState.svg';

const NoInternetMessage = () => {

  const openWifiSettings = () => {
    if (Platform.OS === 'android') {
      Linking.sendIntent
        ? Linking.sendIntent('android.settings.WIFI_SETTINGS')
        : Linking.openSettings();
    } else {
      Linking.openURL('App-Prefs:root=WIFI'); // works on some iOS versions, not all
    }
  };

  return (
    <View style={styles.container}>
      <EmptyState height={240} width={260} />
      <Text style={styles.connectionStyle}>Connection Lost</Text>
      <Text style={styles.lightText}>Please check your internet and try again.</Text>
      <TouchableOpacity style={styles.butonStyle} onPress={openWifiSettings}>
        <Text style={styles.textStyle}>Enable Wifi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    marginBottom: 90,
  },
  butonStyle: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    marginTop: 20
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400'
  },
  connectionStyle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5
  },
  lightText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6c757d',
    marginBottom: 20
  }
});

export default NoInternetMessage;
