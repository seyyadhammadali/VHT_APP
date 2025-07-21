import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPrivacyPolicyPage,
  selectPrivacyPolicyPage,
} from '../redux/slices/pagesSlice';
import FastImage from 'react-native-fast-image';
import RenderHtml from 'react-native-render-html';
import Header from '../components/Header';
import colors from '../constants/colors';

const { width } = Dimensions.get('window');

const PrivacyPolicy = ({ navigation }) => {
  const dispatch = useDispatch();
  const privacyPolicyPage = useSelector(selectPrivacyPolicyPage);
  useEffect(() => {
    dispatch(fetchPrivacyPolicyPage());
  }, [dispatch]);
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title={privacyPolicyPage?.name || 'Privacy Policy'} showNotification={true} navigation={navigation} />
      <ScrollView>
        {privacyPolicyPage?.banner ? (
          <FastImage
            source={{ uri: privacyPolicyPage.banner }}
            style={styles.banner}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : null}
        <View style={styles.container}>
          {privacyPolicyPage ? (
            <>
              <Text style={styles.sectionTitle}>{privacyPolicyPage.name}</Text>
              <View style={styles.section}>
                <RenderHtml
                  contentWidth={width - 40}
                  source={{ html: privacyPolicyPage.description }}
                  tagsStyles={{
                    strong: { color: '#C28D3E', fontWeight: 'bold' },
                    h2: { color: '#C28D3E', fontWeight: 'bold', fontSize: 20, marginBottom: 10 },
                    p: { color: colors.gray, fontSize: 14, lineHeight: 22 },
                    a: { color: colors.primary, textDecorationLine: 'underline' },
                  }}
                />
              </View>
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
   banner: {
    width: width - 30,
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
    alignSelf: 'center',
  },
  container: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.darkGray,
  },
  section: {
    paddingBottom: 20,
  },
});

export default PrivacyPolicy; 