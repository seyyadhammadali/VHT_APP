
import React, { useState, useEffect } from 'react';
import {  View,  Text,  TouchableOpacity,  StyleSheet,  ScrollView,  SafeAreaView,  Image,  Platform
} from 'react-native';
import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFaqs } from '../redux/slices/FaqsSlice';
import colors from '../constants/colors';
import FooterTabs from '../components/FooterTabs';
import NetInfo from '@react-native-community/netinfo';
import NoInternetMessage from '../components/NoInternetMessage';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const FAQs = ({ navigation }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
    const [isConnected, setIsConnected] = useState(true);
  const dispatch = useDispatch();
  const { data: faqs, loading, error } = useSelector(state => state?.faqs);

  useEffect(() => {
    if (!faqs || faqs.length === 0 && !loading) {
      dispatch(fetchFaqs());
    }
  }, [dispatch, faqs, loading]); 
  useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        return () => {
            unsubscribe();
        };
    }, []);
 const renderSkeleton = () => (
    <SafeAreaView style={styles.container}>
      <Header title="About Us" showNotification navigation={navigation} />
      <ScrollView contentContainerStyle={styles.mainContent}>
        <SkeletonPlaceholder borderRadius={8}>
          <View style={styles.banner} />
          <View style={styles.section}>
            <SkeletonPlaceholder.Item width={'60%'} height={25} marginBottom={10} marginTop={20} />
            <SkeletonPlaceholder.Item width={'100%'} height={405} marginBottom={10} />
          </View>
        </SkeletonPlaceholder>
      </ScrollView>
      <FooterTabs />
    </SafeAreaView>
  );
  if (loading || !faqs) {
    return renderSkeleton();
  }

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };
  return (
    <SafeAreaView style={styles.container}>
         {!isConnected ? (
       <View style={styles.noInternetView}>
          <NoInternetMessage />
        </View>
      ) : (
        <>
      <Header title="FAQ's" showNotification={true} navigation={navigation} />
      <ScrollView style={styles.scroll}>
        <View style={styles.faqContainer}>
          {loading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text>Error: {error}</Text>
          ) : faqs && faqs.length > 0 ? (
            faqs.map((item, index) => (
              <View key={index} style={styles.card}>
                <TouchableOpacity
                  onPress={() => toggleExpand(index)}
                  style={styles.cardHeader}>
                  <Text style={styles.question}>{item?.title}</Text>
                  <Text style={styles.plusIcon}>
                    {expandedIndex === index ? '-' : '+'}
                  </Text>
                </TouchableOpacity>
                {expandedIndex === index && (
                  <Text style={styles.answer}>{item?.message}</Text>
                )}
              </View>
            ))
          ) :null}
        </View>
      </ScrollView>
      <FooterTabs></FooterTabs>
       </>
       )}
    </SafeAreaView>
  );
};

export default FAQs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 20 : 0, 
    paddingBottom: 15,
  },
   noInternetView: {
 flex: 1, 
 justifyContent: 'center',
  alignItems: 'center' },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  backArrow: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
    marginTop:6
  },
  scroll: {
    padding: 10,
    marginBottom:90
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 10,
  },
  faqContainer: {
    marginTop: 10,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textDark,
    flex: 1,
    marginRight: 10,
  },
  plusIcon: {
    fontSize: 22,
    color: colors.gold,
    fontWeight: 'bold',
  },
  answer: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textLight,
  },
});