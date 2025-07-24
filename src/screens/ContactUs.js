
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
import { useDispatch, useSelector } from 'react-redux';
import { submitEnquiryForm } from '../redux/slices/formSubmissionSlice';
import colors from '../constants/colors';
const ContactUs = ({ navigation }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [timeToCall, setTimeToCall] = useState('');
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
    hours = hours % 12 || 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  };
  const priceOptions = ['£ 3000.00/pp', '£ 5000.00/pp', '£ 7000.00/pp', '£ 10000.00/pp'];
  const dispatch = useDispatch();
  const { loading, error, response } = useSelector(state => state.formSubmission);
  // Validation error states
  const [errors, setErrors] = useState({});
  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const formatted = formatTime(selectedTime);
      setBestTime(formatted);
      setTimeToCall(formatted);
    }
  };
  const handleSubmit = () => {
    // Validate fields
    const newErrors = {};
    if (!firstname.trim()) newErrors.firstname = 'First name is required.';
    if (!lastname.trim()) newErrors.lastname = 'Last name is required.';
    if (!email.trim()) newErrors.email = 'Email is required.';
    if (!phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!timeToCall.trim()) newErrors.timeToCall = 'Best time to call is required.';
    if (!subject.trim()) newErrors.subject = 'Subject is required.';
    if (!message.trim()) newErrors.message = 'Message is required.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    const payload = {
      page_type: 'contact_form',
      firstname,
      lastname,
      email,
      phone,
      time_to_call: timeToCall,
      subject,
      message,
    };
    dispatch(submitEnquiryForm(payload));
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Contact Us" showNotification={true} navigation={navigation} />
       <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.pakageViewB}>
        <Text style={styles.textStyle}>If you need personal assistance, fill the form below, we will reply back to you asap!</Text>
      </View>
        {/* Form Fields */}
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name Here"
          placeholderTextColor={colors.placeholderText}
          value={firstname}
          onChangeText={text => { setFirstname(text); setErrors(errors => ({ ...errors, firstname: undefined })); }}
        />
        {errors.firstname && <Text style={{ color: 'red', marginBottom: 4 }}>{errors.firstname}</Text>}
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Last Name Here"
          placeholderTextColor={colors.placeholderText}
          value={lastname}
          onChangeText={text => { setLastname(text); setErrors(errors => ({ ...errors, lastname: undefined })); }}
        />
        {errors.lastname && <Text style={{ color: 'red', marginBottom: 4 }}>{errors.lastname}</Text>}
        <Text style={styles.label}>Email Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Email Address Here"
          placeholderTextColor={colors.placeholderText}
          keyboardType="email-address"
          value={email}
          onChangeText={text => { setEmail(text); setErrors(errors => ({ ...errors, email: undefined })); }}
        />
        {errors.email && <Text style={{ color: 'red', marginBottom: 4 }}>{errors.email}</Text>}
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Phone Number Here"
          placeholderTextColor={colors.placeholderText}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={text => { setPhone(text); setErrors(errors => ({ ...errors, phone: undefined })); }}
        />
        {errors.phone && <Text style={{ color: 'red', marginBottom: 4 }}>{errors.phone}</Text>}
        {/* Time Availability */}
        <Text style={styles.label}>Best Time To Call You</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <View style={styles.dateInputContainer}>
            <TextInput
              style={styles.dateInputField}
              placeholder="e.g. 04:00 AM"
              placeholderTextColor={colors.placeholderText}
              value={bestTime}
              editable={false}
            />
          </View>
        </TouchableOpacity>
        {errors.timeToCall && <Text style={{ color: 'red', marginBottom: 4 }}>{errors.timeToCall}</Text>}
        {showTimePicker && (
          <DateTimePicker
            mode="time"
            value={new Date()}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleTimeChange}
          />
        )}
        {/* Subject Field */}
        <Text style={styles.label}>Subject</Text>
        <View style={{ position: 'relative', marginBottom: 10 }}>
          <View style={styles.dropdownContainer}>
            <TextInput
              style={styles.dropdownInputField}
              placeholder="Subject"
              placeholderTextColor={colors.placeholderText}
              value={subject}
              onChangeText={text => { setSubject(text); setErrors(errors => ({ ...errors, subject: undefined })); }}
            />
          </View>
        </View>
        {errors.subject && <Text style={{ color: 'red', marginBottom: 4 }}>{errors.subject}</Text>}
        {/* Message Field */}
        <Text style={styles.label}>Your Message</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Short Description about what your query is about?"
          placeholderTextColor={colors.placeholderText}
          multiline
          value={message}
          onChangeText={text => { setMessage(text); setErrors(errors => ({ ...errors, message: undefined })); }}
        />
        {errors.message && <Text style={{ color: 'red', marginBottom: 4 }}>{errors.message}</Text>}
        {/* Loading/Error/Success States */}
        {loading && <Text style={{ color: 'blue', textAlign: 'center' }}>Submitting...</Text>}
        {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}
        {response && <Text style={{ color: 'green', textAlign: 'center' }}>Submitted successfully!</Text>}
        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            { backgroundColor: colors.primary }
          ]}
          onPress={handleSubmit}
          disabled={loading}
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
    backgroundColor: colors.background,
    // padding: 5
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
    color: colors.secondaryText
  },
  scrollViewContent: {
    padding: 10,
    paddingBottom: 40, 
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.primaryText,
    marginBottom: 8,
    marginTop: 15, 
  },
  input: {
    width: '100%',
    height: 42,
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: colors.inputBackground,
    fontSize: 12,
    color: colors.primaryText,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 42,
    borderRadius: 4,
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 10,
  },
  dateInputField: {
    flex: 1,
    backgroundColor: 'transparent',
    height: '100%',
    paddingHorizontal: 0,
    fontSize: 12,
    color: colors.primaryText,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 42,
    borderRadius: 4,
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 10,
  },
  dropdownInputField: {
    flex: 1,
    backgroundColor: 'transparent',
    height: '100%',
    paddingHorizontal: 0,
    fontSize: 12,
    color: colors.primaryText,
  },
  buttonContainer: {
    backgroundColor: colors.primary, 
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 14,
    fontWeight: '600',
  },

  contactInfoSection: {
    marginTop: 8,
    backgroundColor: colors.background, 
    borderRadius: 10,
    overflow: 'hidden', 
     borderWidth: 1,
     borderColor: colors.border,
     shadowColor: colors.shadow, 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1, 
    shadowRadius: 45,
    elevation: 5, 
  },
  contactInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.infoHeaderBackground, 
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  contactInfoHeaderIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  contactInfoHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primaryText,
  },
  contactInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
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
    color: colors.primaryText,
    marginBottom: 2,
     fontWeight: '500',
  },
  contactInfoValue: {
    fontSize: 12,
    color: colors.primaryText,
    fontWeight: '400',
  },
  callStrapButton: {
    backgroundColor: colors.callStrapButtonBackground,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginLeft:"auto"
  },
  callStrapButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.callStrapButtonText,
  },
  openingHoursSection: {
    marginTop: 20, 
    backgroundColor: colors.background,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  openingHoursHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.infoHeaderBackground,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  openingHoursTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primaryText,
  },
  openingHoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  openingHoursDay: {
    fontSize: 14,
    color: colors.primaryText,
  },
  openingHoursTimeContainer: {
    backgroundColor: colors.openingHoursTimeContainerBackground,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  openingHoursTime: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.openingHoursTime, 
  },
  closedTimeContainer: {
    backgroundColor: colors.closedTimeContainerBackground,
  },
  closedTimeText: {
    color: colors.closedTimeText, 
  },
  locationContainer:{ 
       marginTop: 20,
    backgroundColor: colors.background, 
    borderRadius: 10,
    overflow: 'hidden', 
    borderWidth: 1,
    borderColor: colors.border,}
});

export default ContactUs;

