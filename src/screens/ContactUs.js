
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';
import Header from '../components/Header';
const ContactUs = ({ navigation }) => {
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);
  const [showAirportDropdown, setShowAirportDropdown] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState('');
  const airportOptions = ['Lahore', 'Karachi', 'Islamabad', 'Multan', 'Peshawar'];
  const [showChildDropdown, setShowChildDropdown] = useState(false);
  const [showAdultDropdown, setShowAdultDropdown] = useState(false);
  const [selectedChild, setSelectedChild] = useState('');
  const [selectedAdult, setSelectedAdult] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const childOptions = ['0', '1', '2', '3', '4', '5'];
  const adultOptions = ['1', '2', '3', '4', '5', '6'];
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [bestTime, setBestTime] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  };
  const priceOptions = ['£ 3000.00/pp', '£ 5000.00/pp', '£ 7000.00/pp', '£ 10000.00/pp'];
  return (
    <SafeAreaView style={styles.container}>
     <Header title="Contact Us" showNotification={true} />
       <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.pakageViewB}>
        <Text style={styles.textStyle}>If you need personal assistance, fill the form below, we will reply back to you asap!</Text>
      </View>
        {/* Form Fields */}
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name Here"
          placeholderTextColor="#A0A0A0"
        />
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Last Name Here"
          placeholderTextColor="#A0A0A0"
        />
        <Text style={styles.label}>Email Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Email Address Here"
          placeholderTextColor="#A0A0A0"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Phone Number Here"
          placeholderTextColor="#A0A0A0"
          keyboardType="phone-pad"
        /> 
        {/* Time Availability */}
        <Text style={styles.label}>Best Time To Call You</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <View style={styles.dateInputContainer}>
            <TextInput
              style={styles.dateInputField}
              placeholder="e.g. 04:00 AM"
              placeholderTextColor="#A0A0A0"
              value={bestTime}
              editable={false}
            />
          </View>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            mode="time"
            value={new Date()}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedTime) => {
              setShowTimePicker(false);
              if (selectedTime) {
                setBestTime(formatTime(selectedTime));
              }
            }}
          />
        )}
        {/* Subject Field */}
        <Text style={styles.label}>Subject</Text>
        <View style={{ position: 'relative', marginBottom: 10 }}>
          <View style={styles.dropdownContainer}>
            <TextInput
              style={styles.dropdownInputField}
              placeholder="Subject"
              placeholderTextColor="#A0A0A0"
              value={selectedPrice} 
              editable={false}
            />
          </View>
        </View>
        {/* Message Field */}
        <Text style={styles.label}>Your Message</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Short Description about what your query is about?"
          placeholderTextColor="#A0A0A0"
          multiline
        />
        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            { backgroundColor: isChecked ? '#01BE9E' : '#333' } 
          ]}
          onPress={() => console.log('Submit Enquiry Pressed')} 
        >
          <Text style={styles.buttonText}>Submit Enquiry</Text>
        </TouchableOpacity>
        {/* Contact Info Section */}
        <View style={styles.contactInfoSection}>
          <View style={styles.contactInfoHeader}>
            <Text style={styles.contactInfoHeaderIcon}>⚠️</Text> 
            <Text style={styles.contactInfoHeaderText}>Contact Info</Text>
          </View>
          {/* Call Now */}
          <View style={styles.contactInfoRow}>
            <Image  style={styles.contactInfoIconRed} source={require('../assets/images/redphoneicon.png')}/>
            <View style={styles.contactInfoTextContainer}>
              <Text style={styles.contactInfoLabel}>Call Now</Text>
              <Text style={styles.contactInfoValue}>+442 020 3820 0065</Text>
            </View>
            <TouchableOpacity style={styles.callStrapButton}>
              <Text style={styles.callStrapButtonText}>Call</Text>
            </TouchableOpacity>
          </View>
          {/* Email */}
          <View style={styles.contactInfoRow}>
               <Image  style={styles.contactInfoIconRed} source={require('../assets/images/emaildot.png')}/>
            <View style={styles.contactInfoTextContainer}>
              <Text style={styles.contactInfoLabel}>Email</Text>
              <Text style={styles.contactInfoValue}>quotes.viriksonholidays.co.uk</Text>
            </View>
            <TouchableOpacity style={styles.callStrapButton}>
              <Text style={styles.callStrapButtonText}>Strap</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactInfoRow}>
            <Image style={styles.contactInfoIconRed} source={require('../assets/images/LocationIcon.png')}/>
            <View style={styles.contactInfoTextContainer}>
              <Text style={styles.contactInfoLabel}>London Office:</Text>
              <Text style={styles.contactInfoValue}>13 Station Road, London, SE25 5AH,{"\n"}
                 United Kingdom</Text>
            </View>
          </View>
          {/* Manchester Office */}
          <View style={styles.contactInfoRow}>
            <Image style={styles.contactInfoIconRed} source={require('../assets/images/LocationIcon.png')}/>
            <View style={styles.contactInfoTextContainer}>
              <Text style={styles.contactInfoLabel}>Manchester Office:</Text>
              <Text style={styles.contactInfoValue}>Suite # 4.10,Purple Zone,Universal{"\n"}Square,Devonshire St N, Manchester M12 {"\n"}6JH,United Kingdom</Text>
            </View>
          </View>
              </View>
          {/* Opening Hours */}
          <View style={[styles.contactInfoSection,{marginTop:20}]}>
            <View style={styles.openingHoursHeader}>
              <Text style={styles.contactInfoIcon}>⏰</Text> {/* Clock icon placeholder */}
              <Text style={styles.openingHoursTitle}>Opening Hours</Text>
            </View>
            <View style={styles.openingHoursRow}>
              <Text style={styles.openingHoursDay}>Monday - Saturday</Text>
              <View style={styles.openingHoursTimeContainer}>
                <Text style={styles.openingHoursTime}>10:00 - 19:00</Text>
              </View>
            </View>
            <View style={styles.openingHoursRow}>
              <Text style={styles.openingHoursDay}>Sunday</Text>
              <View style={[styles.openingHoursTimeContainer, styles.closedTimeContainer]}>
                <Text style={[styles.openingHoursTime, styles.closedTimeText]}>Closed</Text>
              </View>
            </View>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  pakageViewB: {
    flexDirection: "row",
    paddingHorizontal: 5,
    textAlign: "center",
    justifyContent: "center",
    alignSelf: 'center',
    width: '95%',
    marginBottom: 10,
    lineHeight:5
  },
  textStyle: {
    fontSize: 13,
    fontWeight: '400',
    textAlign: "center",
    color: '#888888'
  },
  scrollViewContent: {
    padding: 10,
    paddingBottom: 40, 
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: '#232323',
    marginBottom: 8,
    marginTop: 15, 
  },
  input: {
    width: '100%',
    height: 42,
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: '#F6F6F6',
    fontSize: 12,
    color: '#333',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 42,
    borderRadius: 4,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 10,
  },
  dateInputField: {
    flex: 1,
    backgroundColor: 'transparent',
    height: '100%',
    paddingHorizontal: 0,
    fontSize: 12,
    color: '#333',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 42,
    borderRadius: 4,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 10,
  },
  dropdownInputField: {
    flex: 1,
    backgroundColor: 'transparent',
    height: '100%',
    paddingHorizontal: 0,
    fontSize: 12,
    color: '#333',
  },
  buttonContainer: {
    backgroundColor: '#333', 
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  contactInfoSection: {
    marginTop: 8,
    backgroundColor: '#fff', 
    borderRadius: 10,
    overflow: 'hidden', 
     borderWidth: 1,
     borderColor: '#1B1B4D14',
     shadowColor: 'rgba(27, 27, 77, 0.08)', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1, 
    shadowRadius: 45,
    elevation: 5, 
  },
  contactInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8FF', 
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  contactInfoHeaderIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  contactInfoHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  contactInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F6F6F6',
  },
  contactInfoIcon: {
    fontSize: 18, 
    marginRight: 15,
    width: 25, 
    textAlign: 'center'
  },
contactInfoIconRed:{
  height:20,
  width:20,
  textAlign:"center",
  marginRight:20
},
  contactInfoLabel: {
    fontSize: 12,
    color: 'black',
    marginBottom: 2,
     fontWeight: '500',
  },
  contactInfoValue: {
    fontSize: 12,
    color: '#333',
    fontWeight: '400',
  },
  callStrapButton: {
    backgroundColor: '#C8C8F433',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginLeft:"auto"
  },
  callStrapButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  openingHoursSection: {
    marginTop: 20, 
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  openingHoursHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  openingHoursTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  openingHoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F6F6F6',
  },
  openingHoursDay: {
    fontSize: 14,
    color: '#333',
  },
  openingHoursTimeContainer: {
    backgroundColor: '#E0F8E0',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  openingHoursTime: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00796B', 
  },
  closedTimeContainer: {
    backgroundColor: '#F8E0E0',
  },
  closedTimeText: {
    color: '#D32F2F', 
  },
  locationContainer:{ 
       marginTop: 20,
    backgroundColor: '#fff', 
    borderRadius: 10,
    overflow: 'hidden', 
    borderWidth: 1,
    borderColor: '#E0E0E0',}
});

export default ContactUs;

