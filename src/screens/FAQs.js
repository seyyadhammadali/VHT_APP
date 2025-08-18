
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Platform
} from 'react-native';
import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFaqs } from '../redux/slices/FaqsSlice';
import colors from '../constants/colors';
import FooterTabs from '../components/FooterTabs';
import NetInfo from '@react-native-community/netinfo';
import NoInternetMessage from '../components/NoInternetMessage';
const FAQs = ({ navigation }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
    const [isConnected, setIsConnected] = useState(true);
  const dispatch = useDispatch();
  const { data: faqs, loading, error } = useSelector(state => state?.faqs);

  useEffect(() => {
    // Only dispatch fetchFaqs if data is not already present and not currently loading
    if (!faqs || faqs.length === 0 && !loading) {
      dispatch(fetchFaqs());
    }
  }, [dispatch, faqs, loading]); // Added faqs and loading to dependency array

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };
  // *** NEW useEffect FOR NETWORK LISTENER ***
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        return () => {
            unsubscribe();
        };
    }, []);
  return (
    <SafeAreaView style={styles.container}>
         {!isConnected ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
          ) : (
            <Text>No FAQs found.</Text>
          )}
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
    marginBottom:40
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
    color: colors.primary,
    fontWeight: 'bold',
  },
  answer: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textLight,
  },
});