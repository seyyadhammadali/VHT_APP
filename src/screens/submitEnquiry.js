
import React, { useState,useEffect } from 'react';
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
  Platform,
  Alert ,
  KeyboardAvoidingView,
   Modal, 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { submitEnquiryForm,clearFormSubmission } from '../redux/slices/formSubmissionSlice';
import Header from '../components/Header';
import NetInfo from '@react-native-community/netinfo';
import NoInternetMessage from '../components/NoInternetMessage';
import FooterTabs from '../components/FooterTabs';
const airportOptions = ['Lahore', 'Karachi', 'Islamabad', 'Multan', 'Peshawar'];
const priceOptions = ['£ 3000.00/pp', '£ 5000.00/pp', '£ 7000.00/pp', '£ 10000.00/pp']; 
const SubmitEnquiry = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [passengers, setPassengers] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const { loading, response, error } = useSelector(state => state.formSubmission);
  const [departureDate, setDepartureDate] = useState('');
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [showAirportDropdown, setShowAirportDropdown] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState('');
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(''); 
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  
const nameParts = fullName.trim().split(' ');
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  };
  const convertToISO = (dateStr) => {
    if (!dateStr) return ''; 
    const [dd, mm, yyyy] = dateStr.split('/');
    return `${yyyy}-${mm}-${dd}`;
  };
  const handleInputChange = (field, value) => {
  setFormErrors(prevErrors => ({
    ...prevErrors,
    [field]: '',
  }));

  switch (field) {
    case 'fullName':
      setFullName(value);
      break;
    case 'email':
      setEmail(value);
      break;
    case 'phone':
      setPhone(value);
      break;
    case 'message':
      setMessage(value);
      break;
    case 'passengers':
      setPassengers(value.replace(/[^0-9]/g, ''));
      break;
    case 'selectedAirport':
      setSelectedAirport(value);
      break;
    case 'selectedPrice':
      setSelectedPrice(value);
      break;
    default:
      break;
  }
};
   useEffect(() => {
    if (response) {
      setModalTitle('Success!');
      setModalMessage('Your form has been submitted successfully.');
      setModalVisible(true);
      setFullName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setPassengers('');
      setSelectedAirport('');
      setDepartureDate('');
      setSelectedPrice('');
      setFormErrors({});
      const timer = setTimeout(() => {
        setModalVisible(false);
        dispatch(clearFormSubmission()); 
      }, 3000); 
      return () => clearTimeout(timer); 
    } else if (error) {
      setModalTitle('Error!');
      setModalMessage(error || 'Something went wrong. Please try again.');
      setModalVisible(true);
      
      const timer = setTimeout(() => {
        setModalVisible(false);
        dispatch(clearFormSubmission());
      }, 3000); 
      return () => clearTimeout(timer); 
    }
  }, [response, error, dispatch]);
 const handleSubmit = () => {
  const errors = {};
  if (!fullName.trim()) {
    errors.fullName = 'Full name is required.';
  } else if (fullName.trim().split(' ').length < 2) {
    errors.fullName = 'Please enter both first and last name. (Herry Potter)';
  }
  if (!email.trim()) {
    errors.email = 'Email is required.';
  }
  if (!phone.trim()) {
    errors.phone = 'Phone number is required.';
  }
  if (!selectedAirport) {
    errors.selectedAirport = 'Please select an airport.';
  }
  if (!departureDate) {
    errors.departureDate = 'Departure date is required.';
  }
  if (!passengers.trim()) {
    errors.passengers = 'No of passengers is required.';
  } else if (isNaN(passengers) || parseInt(passengers, 10) <= 0) {
    errors.passengers = 'Enter a valid number of passengers.';
  }
  if (!message.trim()) {
    errors.message = 'Please enter a short message.';
  }

  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
    return;
  }
  setFormErrors({}); 
  const nameParts = fullName.trim().split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');
  const payload = {
    page_type: 'quote_form',
    firstname: firstName,
    lastname: lastName,
    email,
    phone,
    message,
    prefered_airport: selectedAirport,
    prefered_airline: 'Emirates Airlines',
    departure_date: convertToISO(departureDate),
    return_date: '',
    passengers: passengers.toString(),
  };

  if (selectedPrice) {
    payload.quoted_price = selectedPrice.replace(/[^\d.]/g, '');
  }

  dispatch(submitEnquiryForm(payload));
};
  const [isConnected, setIsConnected] = useState(true);
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        return () => {
            unsubscribe();
        };
    }, []);
  return (
    <View style={styles.container}>
      {!isConnected ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <NoInternetMessage />
        </View>
      ) : (
        <>
      <Header title="Beat My Quote" showNotification={true} navigation={navigation} />
    <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -50} 
        >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Form Fields */}
        <Text style={[styles.label]}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name And Last Name Here"
          value={fullName}
          placeholderTextColor={'gray'}
        onChangeText={(text) => handleInputChange('fullName', text)}
        />
        {formErrors.fullName && <Text style={{ color: 'red', fontSize: 12 }}>{formErrors.fullName}</Text>}
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email Address Here"
          keyboardType="email-address"
          value={email}
           placeholderTextColor={'gray'}
          onChangeText={(text) => handleInputChange('email', text)}
        />
        {formErrors.email && <Text style={{ color: 'red', fontSize: 12 }}>{formErrors.email}</Text>}
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Phone Number Here"
          keyboardType="phone-pad"
           placeholderTextColor={'gray'}
          value={phone}
          onChangeText={(text) => handleInputChange('phone', text)}
        />
        {formErrors.phone && <Text style={{ color: 'red', fontSize: 12 }}>{formErrors.phone}</Text>}
        <Text style={styles.label}>Which airport would you like to fly from?</Text>
        <View style={styles.dropdownContainer}>
          <TextInput
            style={styles.dropdownInputField}
            placeholder="Airport"
         
             placeholderTextColor={'gray'}
            value={selectedAirport}
          
         onChangeText={(text) => handleInputChange('selectedAirport', text)}
          />
          </View>
       
   {formErrors.selectedAirport && <Text style={{ color: 'red', fontSize: 12 }}>{formErrors.selectedAirport}</Text>}
   <View style={styles.row}>
  {/* Departure Date */}
  <View style={{ flex: 1, marginRight: 10 }}>
    <Text style={styles.label}>Departure Date</Text>
    <TouchableOpacity
      onPress={() => {
        setShowDeparturePicker(true);
        handleInputChange('departureDate', ''); // Clear the error on touch
      }}
    >
      <View style={styles.dateInputContainer}>
        <TextInput
          style={styles.dateInputField}
          placeholder="dd/mm/yyyy"
          // placeholderTextColor="#A0A0A0"
           placeholderTextColor={'gray'}
          value={departureDate}
          editable={false}
        />
        <Image
          source={require('../assets/images/calender.png')}
          style={styles.calendarIcons}
        />
      </View>
    </TouchableOpacity>
      {showDeparturePicker && (
          <DateTimePicker
            value={new Date()} 
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShowDeparturePicker(false);
              if (selectedDate) {
                setDepartureDate(formatDate(selectedDate));
                 handleInputChange('departureDate', formatDate(selectedDate));
              }
            }}
          />
        )}
    {formErrors.departureDate && (
      <Text style={{ color: 'red', fontSize: 12 }}>{formErrors.departureDate}</Text>
    )}
  </View>

  {/* Number of Passengers */}
  <View style={{ flex: 1 }}>
    <Text style={styles.label}>Passengers</Text>
    <TextInput
      style={styles.input}
      placeholder="e.g., 2"
      keyboardType="numeric"
       placeholderTextColor={'gray'}
      value={passengers}
      onChangeText={(text) => handleInputChange('passengers', text.replace(/[^0-9]/g, ''))}
    />
    {formErrors.passengers && (
      <Text style={{ color: 'red', fontSize: 12 }}>{formErrors.passengers}</Text>
    )}
  </View>
</View>

        <Text style={styles.label}>Preferred Price Range (Optional)</Text>
        <View style={{ position: 'relative', marginBottom: 0 }}>
          <View style={styles.dropdownContainer}>
            <TextInput
              style={styles.dropdownInputField}
              placeholder="Select Price (Optional)"
              // placeholderTextColor="#A0A0A0"
               placeholderTextColor={'gray'}
              value={selectedPrice}
        onChangeText={(text) => handleInputChange('selectedPrice', text)}
            />    
          </View>    
        </View>
        {/* Message Field */}
        <Text style={styles.label}>Short Message</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Short Description about what your query is about?"
          value={message}
           placeholderTextColor={'gray'}
        onChangeText={(text) => handleInputChange('message', text)}
          multiline
        />
         {formErrors.message && <Text style={{ color: 'red', fontSize: 12 }}>{formErrors.message}</Text>}
          {loading && <Text style={{ color: 'blue', textAlign: 'center', marginTop: 10 }}>Submitting...</Text>}
        {error && <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>Error: {error}</Text>}
        {response && <Text style={{ color: 'green', textAlign: 'center', marginTop: 10 }}>Form submitted successfully!</Text>}
         <TouchableOpacity
              style={[
                styles.buttonContainer,
                { backgroundColor: loading ? '#ccc' : '#333' } // Change button color when loading
              ]}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Submitting...' : 'Submit Enquiry'}
              </Text>
            </TouchableOpacity>
      </ScrollView>
      </KeyboardAvoidingView>
       <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={[styles.modalTitle, { color: error ? 'red' : 'green' }]}>{modalTitle}</Text>
              <Text style={styles.modalText}>{modalMessage}</Text>
            
            </View>
          </View>
        </Modal>
        </>
       )}
        <FooterTabs/>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    noInternetView:
    {flex: 1, 
      justifyContent: 'center',
       alignItems: 'center' },
  
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  buttonClose: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  textStyleButton: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // padding: 5
  },
  logoStyl: {
    width: '50%',
    resizeMode: 'contain'
  },
  dropdownListFixed: {
    position: 'absolute',
    top: 50,
    left: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 1000,
    elevation: 5,
  },
  scrollViewContent: {
    padding: 10,
    paddingBottom: 70,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
   
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
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
    paddingHorizontal: 7,
  },
  dateInputField: {
    flex: 1,
    backgroundColor: 'transparent',
    height: '100%',
    paddingHorizontal: 0,
    fontSize: 14,
    color: '#333',
  },
  calendarIcon: {
    height: 14,
    width: 14,
    marginRight: 10
  },
  calendarIcons: {
    height: 14,
    width: 14,
    marginLeft: 20,
    tintColor: '#333',
    resizeMode: 'contain',
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
  
   
    fontSize: 14,
    color: 'red',
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

  pakageViewB: {
    flexDirection: "row",
    paddingHorizontal: 20,
    textAlign: "center",
    justifyContent: "center",
    alignSelf: 'center',
    width: '95%',
    marginBottom: 0
  },

  dropdownList: {
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: -10,
    marginBottom: 10,
    zIndex: 1000,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },
});
export default SubmitEnquiry;