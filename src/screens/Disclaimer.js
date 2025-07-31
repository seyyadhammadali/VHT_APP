
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDisclaimerPage, selectDisclaimerPage } from '../redux/slices/pagesSlice';
import Header from '../components/Header';
import colors from '../constants/colors';
import RenderHtml from 'react-native-render-html';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const Disclaimer = ({ navigation }) => {
  const dispatch = useDispatch();
  const disclaimerPage = useSelector(selectDisclaimerPage);
  useEffect(() => {
    dispatch(fetchDisclaimerPage());
  }, [dispatch]);
  return (
    <SafeAreaView style={styles.container}>
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
