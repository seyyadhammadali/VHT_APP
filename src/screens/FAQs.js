import React, { useState } from 'react';
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
import Header from '../components/Header'; // Adjust path as needed

const faqs = [
  {
    question: 'How Booking can be Confirmed?',
    answer:
      'Remember, if you have provided the credit card details and confirmed data, your booking is confirmed. You only have to click on the Submit Button on the next page. After that you will get an email confirmation. You must then use the email address you use to check emails in routine. The email will share all the package details like your activities, your order number, the price details, etc.',
  },
  {
    question: 'How to cancel a Booked Holiday Package?',
    answer:
      'To cancel a booked holiday package, contact customer support with your booking details. Cancellation charges may apply.',
  },
  {
    question: 'When and How will you receive your Tickets?',
    answer:
      'Tickets will be emailed to you after the booking is confirmed, usually within 24 hours.',
  },
  {
    question: 'Would I have to Pay for the hand Baggage?',
    answer:
      'Hand baggage is free with most airlines up to a weight limit. Extra baggage may incur a charge.',
  },
  {
    question: 'Can you Book a Ticket in your Name for Other Travelers?',
    answer:
      'Yes, you can book tickets for others. Ensure you enter their passport names accurately.',
  },
  {
    question: 'How Early Do I Need to Book a Flight Before Traveling?',
    answer:
      'It is best to book at least 2 weeks in advance for better rates and availability.',
  },
  {
    question: 'Direct Flights, Linked Flights, and Non-stop Flights?',
    answer:
      'Direct flights may have stops, non-stop flights go straight to destination, and linked flights require changing planes.',
  },
  {
    question: 'Scheduled or Chartered Flights?',
    answer:
      'Scheduled flights run on a fixed timetable; chartered flights are rented for private use or specific groups.',
  },
];
const FAQs= ({navigation}) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title="FAQ’s" onBack={() => navigation.navigate('Home')} />
      <ScrollView style={styles.scroll}>
        {/* FAQ List */}
        <View style={styles.faqContainer}>
          {faqs.map((item, index) => (
            <View key={index} style={styles.card}>
              <TouchableOpacity
                onPress={() => toggleExpand(index)}
                style={styles.cardHeader}>
                <Text style={styles.question}>{item.question}</Text>
                <Text style={styles.plusIcon}>
                  {expandedIndex === index ? '-' : '+'}
                </Text>
              </TouchableOpacity>
              {expandedIndex === index && (
                <Text style={styles.answer}>{item.answer}</Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAQs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
 header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 20 : 0, // Adjust for Android status bar
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
      color: '#333',
      marginTop:6
    },
  scroll: {
    padding: 10,
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
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  plusIcon: {
    fontSize: 22,
    color: '#C28D3E',
    fontWeight: 'bold',
  },
  answer: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 20,
    color: '#555',
  },
});
