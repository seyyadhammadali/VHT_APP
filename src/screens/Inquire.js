
import React, { useState, useEffect } from 'react';
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
  Modal,
   KeyboardAvoidingView,
} from 'react-native';
import Plan from '../assets/images/plane.svg';
import Header from '../components/Header';
import colors from '../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { submitEnquiryForm, clearFormSubmission } from '../redux/slices/formSubmissionSlice';
import NetInfo from '@react-native-community/netinfo';
import NoInternetMessage from '../components/NoInternetMessage';
import FooterTabs from '../components/FooterTabs';
const Inquire = ({ navigation }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [preferredAirline, setPreferredAirline] = useState('');
  const [selectedAirport, setSelectedAirport] = useState('');
  const [selectedChild, setSelectedChild] = useState('0');
  const [selectedAdult, setSelectedAdult] = useState('1');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [comment, setComment] = useState('');
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);
  const [showAirportDropdown, setShowAirportDropdown] = useState(false);
  const [showChildDropdown, setShowChildDropdown] = useState(false);
  const [showAdultDropdown, setShowAdultDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [errors, setErrors] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const dispatch = useDispatch();
  const { loading, error, response } = useSelector(state => state.formSubmission);
  const airportOptions = ['Lahore', 'Karachi', 'Islamabad', 'Multan', 'Peshawar'];
  const childOptions = ['0', '1', '2', '3', '4', '5'];
  const adultOptions = ['1', '2', '3', '4', '5', '6'];
  const priceOptions = ['£ 3000.00/pp', '£ 5000.00/pp', '£ 7000.00/pp', '£ 10000.00/pp'];
  const handleModalClose = () => {
    setModalVisible(false);
    dispatch(clearFormSubmission());
  };
  useEffect(() => {
    let timer;
    if (response) {
      setModalTitle('Success!');
      setModalMessage('Your quote request has been submitted successfully.');
      setModalVisible(true);
      setFirstname('');
      setLastname('');
      setEmail('');
      setPhone('');
      setDepartureDate('');
      setReturnDate('');
      setPreferredAirline('');
      setSelectedAirport('');
      setSelectedChild('0');
      setSelectedAdult('1');
      setSelectedPrice('');
      setComment('');
      setErrors({});
      setIsChecked(false);
      timer = setTimeout(() => {
        setModalVisible(false); 
        dispatch(clearFormSubmission()); 
      }, 2000); 

    } else if (error) {
      setModalTitle('Error!');
      setModalMessage(error || 'Something went wrong. Please try again.');
      setModalVisible(true);
       
       // Auto-close modal after 2 seconds on error as well
      timer = setTimeout(() => {
        setModalVisible(false); // Close the modal
        dispatch(clearFormSubmission()); // Clear the Redux state
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [response, error,dispatch]); 
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
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
  const handleSubmit = () => {
    const newErrors = {};
    if (!firstname.trim()) newErrors.firstname = 'First name is required.';
    if (!lastname.trim()) newErrors.lastname = 'Last name is required.';
    if (!email.trim()) newErrors.email = 'Email is required.';
    if (!phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!departureDate.trim()) newErrors.departureDate = 'Departure date is required.';
    if (!returnDate.trim()) newErrors.returnDate = 'Return date is required.';
    if (!preferredAirline.trim()) newErrors.preferredAirline = 'Preferred Airline is required.';
    if (!selectedAirport.trim()) newErrors.selectedAirport = 'Please select a departure airport.';
    if (!selectedAdult) newErrors.selectedAdult = 'Number of adults is required.';
    if (!isChecked) newErrors.isChecked = 'Please check this box to proceed.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    const totalPassengers = parseInt(selectedAdult, 10) + parseInt(selectedChild, 10);
    const payload = {
      page_type: 'quote_form',
      firstname,
      lastname,
      email,
      phone,
      departure_date: departureDate,
      return_date: returnDate,
      prefered_airline: preferredAirline,
      prefered_airport: selectedAirport,
      passengers: String(totalPassengers),
      message: comment, 
    };
    dispatch(submitEnquiryForm(payload));
  };
  return (
    <SafeAreaView style={styles.container}>
      {!isConnected ? (
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <NoInternetMessage />
        </View>
      ) : (
        <>
      <Header title="Inquire" showNotification={true} navigation={navigation} />
       <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Use 'height' or 'position' for Android
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -50} // Optional offset
        >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.pakageViewB}>
       <Plan style={{ paddingVertical: 15, paddingHorizontal: 10 }} />
       <Text style={styles.sectionTitleFoodB}>Request a Quote</Text>
        </View>
        <Text style={styles.description}>
          Please fill out the information below to get a personalized quote for your trip. We will get back to you within 24 hours.
        </Text>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name Here"
         placeholderTextColor={'gray'}
          value={firstname}
          onChangeText={text => { setFirstname(text); setErrors(errors => ({ ...errors, firstname: undefined })); }}
        />
        {errors.firstname && <Text style={styles.errorText}>{errors.firstname}</Text>}
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Last Name Here"
          placeholderTextColor={'gray'}
          value={lastname}
          onChangeText={text => { setLastname(text); setErrors(errors => ({ ...errors, lastname: undefined })); }}
        />
        {errors.lastname && <Text style={styles.errorText}>{errors.lastname}</Text>}
        <Text style={styles.label}>Email Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Email Address Here"
          placeholderTextColor={'gray'}
          keyboardType="email-address"
          value={email}
          onChangeText={text => { setEmail(text); setErrors(errors => ({ ...errors, email: undefined })); }}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Phone Number Here"
         placeholderTextColor={'gray'}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={text => { setPhone(text); setErrors(errors => ({ ...errors, phone: undefined })); }}
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
        <View style={styles.row}>
          <View style={{ flex: 1}}>
            <Text style={styles.label}>Departure Date</Text>
            <TouchableOpacity onPress={() => setShowDeparturePicker(true)}>
              <View style={styles.dateInputContainer}>
                <TextInput
                  style={styles.dateInputField}
                  placeholder="yyyy-mm-dd"
                  placeholderTextColor={'gray'}
                  value={departureDate}
                  editable={false}
                />
                <Image source={require('../assets/images/calender.png')} style={styles.calendarIcon} />
              </View>
            </TouchableOpacity>
            {errors.departureDate && <Text style={styles.errorText}>{errors.departureDate}</Text>}
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Return Date</Text>
            <TouchableOpacity onPress={() => setShowReturnPicker(true)}>
              <View style={styles.dateInputContainer}>
                <TextInput
                  style={styles.dateInputField}
                  placeholder="yyyy-mm-dd"
                  placeholderTextColor={'gray'}
                  value={returnDate}
                  editable={false}
                />
                <Image source={require('../assets/images/calender.png')} style={styles.calendarIcon} />
              </View>
            </TouchableOpacity>
            {errors.returnDate && <Text style={styles.errorText}>{errors.returnDate}</Text>}
          </View>
        </View>
        {showDeparturePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShowDeparturePicker(false);
              if (selectedDate) {
                setDepartureDate(formatDate(selectedDate));
                setErrors(errors => ({ ...errors, departureDate: undefined }));
              }
            }}
          />
        )}
        {showReturnPicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShowReturnPicker(false);
              if (selectedDate) {
                setReturnDate(formatDate(selectedDate));
                setErrors(errors => ({ ...errors, returnDate: undefined }));
              }
            }}
          />
        )}
        <Text style={styles.label}>Preferred Airlines</Text>
        <TextInput
          style={styles.input}
          placeholder="Preferred Airline"
        placeholderTextColor={'gray'}
          value={preferredAirline}
          onChangeText={text => { setPreferredAirline(text); setErrors(errors => ({ ...errors, preferredAirline: undefined })); }}
        />
        {errors.preferredAirline && <Text style={styles.errorText}>{errors.preferredAirline}</Text>}
        <Text style={styles.label}>Which airport would you like to fly from?</Text>
        <TouchableOpacity onPress={() => setShowAirportDropdown(!showAirportDropdown)}>
        <View style={styles.dropdownContainer}>
          <TextInput
            style={styles.dropdownInputField}
            placeholder="Select"
          placeholderTextColor={'gray'}
            value={selectedAirport}
            editable={false}
          />
            <Image source={require('../assets/images/downarrow.png')} style={styles.calendarIcon} />
        </View> </TouchableOpacity>
        {showAirportDropdown && (
          <View style={styles.dropdownList}>
            {airportOptions.map((airport, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedAirport(airport);
                  setShowAirportDropdown(false);
                  setErrors(errors => ({ ...errors, selectedAirport: undefined }));
                }}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownItemText}>{airport}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {errors.selectedAirport && <Text style={styles.errorText}>{errors.selectedAirport}</Text>}
        <View style={styles.row}>
          <View style={[styles.dropdownWrapper]}>
            <Text style={styles.label}>No of Child</Text>
             <TouchableOpacity onPress={() => {
                setShowChildDropdown(!showChildDropdown);
                setShowAdultDropdown(false);
              }}>
            <View style={styles.dropdownContainer}>
               
              <TextInput
                style={styles.dropdownInputField}
                placeholder="Age 0–11"
                placeholderTextColor="#A0A0A0"
                value={selectedChild}
                editable={false}
              />
            
                <Image source={require('../assets/images/downarrow.png')} style={styles.calendarIcon} />
            
            </View>  </TouchableOpacity>
            {showChildDropdown && (
              <View style={styles.dropdownListFixed}>
                {childOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedChild(option);
                      setShowChildDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          <View style={styles.dropdownWrapper}>
            <Text style={styles.label}>No of Adult</Text>
             <TouchableOpacity onPress={() => {
                setShowAdultDropdown(!showAdultDropdown);
                setShowChildDropdown(false);
              }}>
            <View style={styles.dropdownContainer}>
              <TextInput
                style={styles.dropdownInputField}
                placeholder="Age +12"
                placeholderTextColor="#A0A0A0"
                value={selectedAdult}
                editable={false}
              />
             
                <Image source={require('../assets/images/downarrow.png')} style={styles.calendarIcon} />
             
            </View> </TouchableOpacity>
            {showAdultDropdown && (
              <View style={styles.dropdownListFixed}>
                {adultOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedAdult(option);
                      setShowAdultDropdown(false);
                      setErrors(errors => ({ ...errors, selectedAdult: undefined }));
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {errors.selectedAdult && <Text style={styles.errorText}>{errors.selectedAdult}</Text>}
          </View>
        </View>
        <Text style={styles.label}>Package Price Limit</Text>
        <View style={{ marginBottom: 10 }}>
           <TouchableOpacity onPress={() => setShowPriceDropdown(!showPriceDropdown)}>
          <View style={styles.dropdownContainer}>
            <TextInput
              style={styles.dropdownInputField}
              placeholder="£ 7000.00/pp"
              placeholderTextColor={'gray'}
              value={selectedPrice}
              editable={false}
            />
        
              <Image
                source={require('../assets/images/downarrow.png')}
                style={styles.calendarIcon}
              />
           
          </View> 
          </TouchableOpacity>
          {showPriceDropdown && (
            <View style={styles.dropdownListFixed}>
              {priceOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedPrice(option);
                    setShowPriceDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <Text style={styles.label}>Your Message</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Short Description about what your query is about?"
          placeholderTextColor={'gray'}
          multiline
          value={comment}
          onChangeText={setComment}
        />
        <View style={styles.checkboxTextOne}>
          <TouchableOpacity
            style={[styles.checkboxStyle,{ backgroundColor: isChecked ? '#000' : 'transparent',}]}
            onPress={() => {
                  setIsChecked(!isChecked);
                  setErrors(errors => ({ ...errors, isChecked: undefined })); 
                }}
          >
            {isChecked && (
              <Image
                source={require('../assets/images/tickarrow.png')}
                style={styles.checktickImg}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
          <Text style={{ flex: 1, fontSize: 12, color: '#232323', fontWeight: '400', lineHeight: 16 }}>
            We’d love to keep you updated with our latest exclusive offers, exciting travel news, and
            special giveaways via email or Call. Please tick this box to opt in.
          </Text>
        </View>
        {errors.isChecked && <Text style={[styles.errorText, {marginTop: 5}]}>{errors.isChecked}</Text> }
        <View
          style={styles.borderparagraph}>
           <Text style={{ fontSize: 14, color: '#000', marginBottom: 5,fontWeight: 'bold'  }}>How will your <Text style={{color: '#C28D3E'}}>data</Text> be used?</Text>
          <Text style={styles.paragraphline}>
            We at Virikson Holidays take your Privacy Seriously and never sell your details. We also ensure
            to keep your data secure and safe. We'd like to share discounts, promotions and latest Holiday
            Packages with your positive consent.
          </Text>
        </View>
        <TouchableOpacity style={[ styles.buttonContainer, { backgroundColor: colors.black } ]}
          onPress={handleSubmit}
          disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? 'Submitting...' : 'Submit Enquiry'}
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={handleModalClose} >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={[styles.modalTitle, { color: error ? 'red' : 'green' }]}>{modalTitle}</Text>
              <Text style={styles.modalText}>{modalMessage}</Text>
            </View>
          </View>
        </Modal>
      </ScrollView>
      </KeyboardAvoidingView>
      <FooterTabs/>
         </>
       )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 borderparagraph:{
  backgroundColor: '#F4FBF9',
  padding: 15,
  borderRadius: 10,
  marginTop: 20,},
  container: {
  flex: 1,
  backgroundColor: '#fff',
  },
  checkboxTextOne:{
    flexDirection: 'row',
     alignItems: 'flex-start',
      marginTop: 15 
  },
  checktickImg:{
    width: 14, 
    height: 14, 
    tintColor: '#fff'
  },
  checkboxStyle:{
     width: 18,
    height: 18,
   borderRadius: 3,
   borderWidth: 1,
 borderColor: '#A0A0A0',
  marginRight: 10,
   justifyContent: 'center',
   alignItems: 'center',
  
  marginTop: 2,
  },
  paragraphline:{
    fontSize: 12, 
    color: '#333',
     lineHeight: 16},
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dropdownWrapper: {
    flex: 1,
    position: 'relative',
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
  headerButton: {
    padding: 5,
  },
  headerIcon: {
    fontSize: 24,
    color: '#666',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollViewContent: {
    padding: 10,
    paddingBottom: 40,
  },
  getInTouchContainer: {
    backgroundColor: '#E0F7FA',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: 'center',
    gap:10
  },
  getInTouchText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00796B',
  },
  description: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
    fontWeight: "400"
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
    fontSize: 14,
    color: '#333',
  },
  calendarIcon: {
    height: 14,
    width: 14,
    marginLeft: 'auto'
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
    fontSize: 14,
    color: '#333',
  },
  dropdownArrow: {
    fontSize: 20,
    color: '#A0A0A0',
    marginLeft: 10,
  },
  buttonContainer: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 70,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 14,
    fontWeight: '600',
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
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#01BE9E14',
    borderRadius: 10,
    textAlign: "center",
    justifyContent: "center",
    alignSelf: 'center',
    width: '95%',
    marginBottom: 20,
    marginTop:10
  },
  sectionTitleFoodB: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: 'black',
    paddingHorizontal: 6,
    paddingVertical: 4,
    textAlign: "center"
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 15,
  },
  checkboxBox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#A0A0A0',
    marginRight: 10,
    marginTop: 3,
  },
  checkboxText: {
    flex: 1,
    fontSize: 13,
    color: '#333',
  },
  messageBox: {
    width: '100%',
    height: 100,
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: '#F6F6F6',
    fontSize: 14,
    color: '#333',
    textAlignVertical: 'top',
  },
  privacyBox: {
    backgroundColor: '#F4FBF9',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  privacyHeading: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  privacyText: {
    fontSize: 14,
    color: '#333',
  },
  privacyDataColor: {
    color: '#C28D3E',
    fontWeight: 'bold',
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
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: colors.black,
    width: 100,
  },
  textStyleButton: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 4,
    fontSize: 12,
  },
});
export default Inquire;