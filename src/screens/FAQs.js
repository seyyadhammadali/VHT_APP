
import React, { useState, useEffect } from 'react';
import {  View,  Text,  TouchableOpacity,  StyleSheet,  ScrollView,  SafeAreaView,  Image,  Platform
} from 'react-native';
import Header from '../components/Header';
import {useGetPagesQuery, useGetFaqsQuery} from '../redux/slices/apiSlice';
import FooterTabs from '../components/FooterTabs';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { COLORS, mainStyles } from '../constants/theme';
const FAQs = ({ navigation }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const { data: faqsData, isLoading:loading, isError:error} = useGetFaqsQuery();
  const faqs = faqsData?.data;

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };
  return (

    <SafeAreaView style={mainStyles.safeArea} edges={['bottom', 'left', 'right']}>
      <Header title={'FAQ`s'}/>
      <ScrollView 
          style={mainStyles.container}
          contentContainerStyle={mainStyles.contentContainer}
          showsVerticalScrollIndicator={false}
      >
        <View >
          {loading ? (
            <SkeletonPlaceholder borderRadius={8}>
              <View style={styles.banner} />
              <View style={styles.section}>
                <SkeletonPlaceholder.Item width={'60%'} height={25} marginBottom={10} marginTop={20} />
                <SkeletonPlaceholder.Item width={'100%'} height={405} marginBottom={10} />
              </View>
          </SkeletonPlaceholder>
          ) : error ? (
            <Text>Error: {error}</Text>
          ) : faqs && faqs.length > 0 ? (
            faqs.map((item, index) => (
              <View key={index} style={styles.card}>
                <TouchableOpacity
                  onPress={() => toggleExpand(index)}
                  style={styles.cardHeader}>
                  <Text style={styles.question}>{item?.title}</Text>
                  <View style={expandedIndex === index ? styles.minusIcon : styles.plusIcon}>
                    <Text style={styles.iconText}>
                    {expandedIndex === index ? '−' : '+'}
                  </Text>
                  </View>
                </TouchableOpacity>
                {expandedIndex === index && (
                  <Text style={styles.answer}>{item?.message}</Text>
                )}
              </View>
            ))
          ) :null}
        </View>
      </ScrollView>
      <FooterTabs/>
    </SafeAreaView>
  );
};

export default FAQs;

const styles = StyleSheet.create({



  
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    boxShadow:'0px 2px 45px 0px #1B1B4D14'
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.black,
    flex: 1,
    marginRight: 10,
    fontFamily:'Inter-Medium'
  },
  minusIcon: {
    height:35,
    width:35,
    borderWidth:0,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10
  },
  plusIcon: {
    height:35,
    width:35,
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center',
    borderColor:'#ECECEC',
    borderRadius:10
  },
  iconText: {
    textAlign:'center',
    borderColor:'#ECECEC',
    fontSize: 22,
    color: COLORS.gold,
    fontWeight: 'bold',
  },
  answer: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.secondary,
  },
});