import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import Header from '../components/Header';
const { width } = Dimensions.get('window');
const termsData = {
  introParagraphs: [
    `These terms and conditions must be agreed upon by users of the site "Virikson Holidays".\nYou should go through these terms and conditions before using Virikson Holidays website. To know about these things before making any booking with us is important. This document will help us bond in a good and friendly manner for any future dealings.`,
    `In case you Disagree to our terms and conditions, you may stop and opt for other tour companies offering better opportunities. If you have further concerns and want to clear yourself regarding the conditions we offer, you may get in us on the given telephone number or at quotes@viriksonholidays.co.uk\nSubjects`
  ],
  bullets: [
    'Our agreement and contract with you',
    'Conditions for Delivery of Your Booking',
    'Our agreement and contract with you',
    'Know about Cancellations or Booking Changes',
    'Our agreement and contract with you',
    'Payment Conditions',
    'Other Terms and Conditions',
  ],
  agreementSections: [
    {
      title: 'Agreement & Contract:',
      content: `A By Booking we mean the demand for services and facilities we provide to our customers which we place on our website. Orders and Payments will be received by Virikson Holidays and for the full payment received on us against the packages, you will get a verification email and that email will include every information about our settled agreement. The mail can either be from any of our agents or by under the name of Virikson Holidays.`
    },
    {
      content: `B Whatever is showcased and offered on the website means that it is available. Virikson Holidays...`
    }
  ]
};
const TermsAndConditions = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
 <ScrollView contentContainerStyle={styles.container}>
   <Header title="Terms & Conditions" showNotification={true} navigation={navigation} />
  {termsData.introParagraphs.map((para, idx) => (
    <Text key={`intro-${idx}`} style={styles.paragraph}>
      {para}
    </Text>
  ))}
  
  <View style={styles.bulletContainer}>
    {termsData.bullets.map((item, index) => (
      <View key={index} style={styles.bulletRow}>
        <Text style={styles.dotStyle}>•</Text>
        <Text style={styles.bulletText}>{item}</Text>
      </View>
    ))}
  </View>
  {termsData.agreementSections.map((section, idx) => (
    <View key={`agreement-${idx}`}>
      {section.title && (
        <Text style={styles.sectionTitle}>{section.title}</Text>
      )}
      <Text style={styles.paragraph}>{section.content}</Text>
    </View>
  ))}
  <View style={{ height: 50 }} />
</ScrollView>
    </SafeAreaView>
  );
};
export default TermsAndConditions;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 8,
    paddingBottom: 100,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    paddingVertical: 20,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
    padding: 6,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: 'gray',
    elevation: 5,
  },
  notifIcon: {
    width: 20,
    height: 20,
  },
  refreshIcon: {
    fontSize: 18,
    paddingHorizontal: 10,
  },
  paragraph: {
    fontSize: 14,
    color: '#888888',
    lineHeight: 22,
    paddingHorizontal:12,
    fontWeight:"400"
  },
  bold: {
    fontWeight: '500',
    color:"black",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    color: '#000',
  },
  bulletContainer: {
    marginTop:10,
    marginBottom: 20,
  },
  bullet: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 10,
    color: '#000',
    paddingHorizontal:12
  },
 bulletRow: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  paddingHorizontal: 12,
  marginBottom: 6,
},
dotStyle: {
  fontSize: 25,
  lineHeight: 22,
  color: 'black',
  marginRight: 8,
},
bulletText: {
  fontSize: 14,
  color: '#888888',
  lineHeight: 22,
  flex: 1,
  fontWeight: '400',
},

});
