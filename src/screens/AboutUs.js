import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAboutUsPage, selectAboutUsPage } from '../redux/slices/pagesSlice';
import Header from '../components/Header';
import colors from '../constants/colors';
import FastImage from 'react-native-fast-image';
import { Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const { width } = Dimensions.get('window');
const AboutUs = ({ navigation }) => {
  const dispatch = useDispatch();
  const aboutUsPage = useSelector(selectAboutUsPage);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchAboutUsPage()).finally(() => setLoading(false));
  }, [dispatch]);
  return (
    <SafeAreaView style={styles.container}>
      <Header title="About Us" showNotification={true} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.mainContent}>
        {loading ? (
          <SkeletonPlaceholder borderRadius={8}>
            <View style={styles.skeletonBanner} />
            <View style={styles.section}>
              <View style={{ width: '90%', height: 20, marginBottom: 10 }} />
              <View style={{ width: '100%', height: 60, marginBottom: 10 }} />
              <View style={{ width: '100%', height: 60, marginBottom: 10 }} />
              <View style={{ width: '80%', height: 20, marginBottom: 10 }} />
            </View>
          </SkeletonPlaceholder>
        ) : aboutUsPage ? (
          <View>
            {aboutUsPage.banner && (
              <FastImage
                source={{ uri: aboutUsPage.banner }}
                style={styles.banner}
                resizeMode={FastImage.resizeMode.cover}
              />
            )}
            <View style={styles.section}>
              {renderAboutUsSections(aboutUsPage.description)}
            </View>
          </View>
        ) : (
          <Text style={{ textAlign: 'center', color: 'gray', marginTop: 20 }}>
            Failed to load content.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // padding: 5,
  },
  mainContent: {
    paddingHorizontal: 5,
  },
  section: {
    paddingHorizontal: 10,
    paddingBottom: 40,
  },
  banner: {
    width: width - 30,
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
    alignSelf: 'center',
  },
  skeletonBanner: {
    width: width - 30,
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
    alignSelf: 'center',
  },
});
export default AboutUs;
function renderAboutUsSections(html) {
  if (!html) return null;
  const regex = /<p>(.*?)<\/p>/g;
  const matches = [...html.matchAll(regex)];
  if (!matches.length) return null;

  return matches.map((match, idx) => {
    let text = match[1].replace(/<[^>]*>?/gm, '').trim();

    if (
      text === 'About Us' ||
      text === 'Our Vision:' ||
      text === 'Our Mission:'
    ) {
      return (
        <Text
          key={idx}
          style={{
            color: '#C28D3E',
            fontWeight: 'bold',
            fontSize: 16,
            marginTop: 12,
            marginBottom: 4,
          }}
        >
          {text}
        </Text>
      );
    }
    return (
      <Text
        key={idx}
        style={{
          color: '#888888',
          fontSize: 14,
          lineHeight: 22,
          marginBottom: 8,
        }}
      >
        {text}
      </Text>
    );
  });
}
