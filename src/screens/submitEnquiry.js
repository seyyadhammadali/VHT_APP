
// // // import React ,{useState } from 'react';
// // // import DateTimePicker from '@react-native-community/datetimepicker';
// // // import {
// // //   View,
// // //   TextInput,
// // //   StyleSheet,
// // //   ScrollView,
// // //   Text,
// // //   SafeAreaView,
// // //   TouchableOpacity,
// // //   Image,
// // //   Platform
// // // } from 'react-native';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { submitEnquiryForm } from '../redux/slices/formSubmissionSlice';

// // // import  Header from '../components/Header';
// // // const airportOptions = ['Lahore', 'Karachi', 'Islamabad', 'Multan', 'Peshawar'];
// // // const SubmitEnquiry = ({navigation}) => {
// // //   const [fullName, setFullName] = useState('');
// // // const [email, setEmail] = useState('');
// // // const [phone, setPhone] = useState('');
// // // const [message, setMessage] = useState('');
// // // const [passengers, setPassengers] = useState('1');
// // // const dispatch = useDispatch();
// // // const { loading, response, error } = useSelector(state => state.formSubmission);
// // // const [departureDate, setDepartureDate] = useState('');
// // // const [showDeparturePicker, setShowDeparturePicker] = useState(false);
// // // const [showReturnPicker, setShowReturnPicker] = useState(false);
// // // const [showAirportDropdown, setShowAirportDropdown] = useState(false);
// // // const [selectedAirport, setSelectedAirport] = useState('');
// // // const [showPriceDropdown, setShowPriceDropdown] = useState(false);
// // // const [selectedPrice, setSelectedPrice] = useState('');
// // // const priceOptions = ['£ 3000.00/pp', '£ 5000.00/pp', '£ 7000.00/pp', '£ 10000.00/pp'];
// // // const formatDate = (date) => {
// // //   const d = new Date(date);
// // //   return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth()+1)
// // //     .toString().padStart(2, '0')}/${d.getFullYear()}`;
// // // };
// // // const convertToISO = (dateStr) => {
// // //   const [dd, mm, yyyy] = dateStr.split('/');
// // //   return `${yyyy}-${mm}-${dd}`;
// // // };

// // // // const handleSubmit = () => {
// // // //   const [firstName, lastName] = fullName.trim().split(' ');
  
// // // //   if (!firstName || !email || !phone || !selectedAirport || !departureDate || !selectedPrice) {
// // // //     alert('Please fill all required fields.');
// // // //     return;
// // // //   }

// // // //   const payload = {
// // // //     page_type: "quote_form",
// // // //     firstname: firstName,
// // // //     lastname: lastName || '',
// // // //     email,
// // // //     phone,
// // // //     message,
// // // //     prefered_airport: selectedAirport,
// // // //     prefered_airline: "Emirates Airlines", // Hardcoded or make dynamic
// // // //     departure_date: convertToISO(departureDate),
// // // //     return_date: "", // Add if needed
// // // //     passengers: selectedPrice.replace(/[^\d]/g, '') || "1", // Extract number from "£ 7000.00/pp"
// // // //   };

// // // //   dispatch(submitEnquiryForm(payload));
// // // // };
// // // const handleSubmit = () => {
// // //   if (!fullName.trim() || !email.trim() || !phone.trim() || !selectedAirport || !departureDate || !selectedPrice) {
// // //     alert('Please fill all required fields.');
// // //     return;
// // //   }

// // //   const nameParts = fullName.trim().split(' ');
// // //   const firstName = nameParts[0];
// // //   const lastName = nameParts.slice(1).join(' ') || '';

// // //   const payload = {
// // //     page_type: 'quote_form',
// // //     firstname: firstName,
// // //     lastname: lastName,
// // //     email,
// // //     phone,
// // //     message,
// // //     prefered_airport: selectedAirport,
// // //     prefered_airline: 'Emirates Airlines', // Can make dynamic later
// // //     departure_date: convertToISO(departureDate),
// // //     return_date: '', // You can optionally add this if needed
// // //     passengers, // from state (not price!)
// // //     price: selectedPrice.replace(/[^\d]/g, ''), // optional, only if API supports
// // //   };

// // //   dispatch(submitEnquiryForm(payload));
// // // };


// // //   return (
// // //     <SafeAreaView style={styles.container}>
// // //          <Header title="Beat My Quote" showNotification={true} navigation={navigation} />
// // //             <View style={styles.pakageViewB}>
// // //               <Image source={require('../assets/images/Logo.png')} style={styles.logoStyl}/>
// // //             </View>
// // //          <ScrollView contentContainerStyle={styles.scrollViewContent}>
// // //            {/* Form Fields */}
// // //          <Text style={styles.label}>Your Name</Text>
// // //     <TextInput
// // //   style={styles.input}
// // //   placeholder="First Name And Last Name Here"
// // //   value={fullName}
// // //   onChangeText={setFullName}
// // // />
// // //         <Text style={styles.label}>Email Address</Text>
// // //       <TextInput
// // //   style={styles.input}
// // //   placeholder="Enter Email Address Here"
// // //   keyboardType="email-address"
// // //   value={email}
// // //   onChangeText={setEmail}
// // // />
// // //         <Text style={styles.label}>Phone Number</Text>
// // //        <TextInput
// // //   style={styles.input}
// // //   placeholder="Your Phone Number Here"
// // //   keyboardType="phone-pad"
// // //   value={phone}
// // //   onChangeText={setPhone}
// // // />
// // //        <Text style={styles.label}>Which airport would you like to fly from?</Text>
// // //    <View style={styles.dropdownContainer}>
// // //    <TextInput
// // //     style={styles.dropdownInputField}
// // //     placeholder="Select"
// // //     placeholderTextColor="#A0A0A0"
// // //     value={selectedAirport}
// // //     editable={false}
// // //     />
// // //     <TouchableOpacity onPress={() => setShowAirportDropdown(!showAirportDropdown)}>
// // //      <Image source={require('../assets/images/downarrow.png')} style={styles.calendarIcon} />
// // //     </TouchableOpacity>
// // //   </View>
// // //       {showAirportDropdown && (
// // //        <View style={styles.dropdownList}>
// // //        {airportOptions.map((airport, index) => (
// // //         <TouchableOpacity
// // //         key={index}
// // //         onPress={() => {
// // //           setSelectedAirport(airport);
// // //           setShowAirportDropdown(false);
// // //         }}
// // //         style={styles.dropdownItem}
// // //       >
// // //         <Text style={styles.dropdownItemText}>{airport}</Text>
// // //       </TouchableOpacity>
// // //     ))}
// // //     </View>
// // //    )}


// // //    <View style={styles.row}>
// // //     {/* Departure Date */}
// // //   <View style={{ flex: 1, marginRight: 10 }}>
// // //     <Text style={styles.label}>Departure Date</Text>
// // //     <TouchableOpacity onPress={() => setShowDeparturePicker(true)}>
// // //       <View style={styles.dateInputContainer}>
// // //         <TextInput
// // //           style={styles.dateInputField}
// // //           placeholder="dd/mm/yyyy"
// // //           placeholderTextColor="#A0A0A0"
// // //           value={departureDate}
// // //           editable={false}
// // //         />
// // //         <Image
// // //           source={require('../assets/images/calender.png')}
// // //           style={styles.calendarIcons}
// // //         />
// // //       </View>
// // //     </TouchableOpacity>
// // //   </View>
// // // </View>
// // // {showDeparturePicker && (
// // //   <DateTimePicker
// // //     value={new Date()}
// // //     mode="date"
// // //     display={Platform.OS === 'ios' ? 'spinner' : 'default'}
// // //     onChange={(event, selectedDate) => {
// // //       setShowDeparturePicker(false);
// // //       if (selectedDate) {
// // //         setDepartureDate(formatDate(selectedDate));
// // //       }
// // //     }}
// // //   />
// // // )}
// // // {/* Package Price Limit */}
// // // <Text style={styles.label}>Passenger</Text>
// // // <View style={{ position: 'relative', marginBottom: 10 }}>
// // //   <View style={styles.dropdownContainer}>
// // //     <TextInput
// // //       style={styles.dropdownInputField}
// // //       placeholder="£ 7000.00/pp"
// // //       placeholderTextColor="#A0A0A0"
// // //     value={passengers}
// // //   onChangeText={setPassengers}
// // //       editable={false}
// // //     />

// // //     <TouchableOpacity onPress={() => setShowPriceDropdown(!showPriceDropdown)}>
// // //       <Image
// // //         source={require('../assets/images/downarrow.png')}
// // //         style={styles.calendarIcon}
// // //       />
// // //     </TouchableOpacity>
// // //   </View>

// // //   {showPriceDropdown && (
// // //     <View style={styles.dropdownListFixed}>
// // //       {priceOptions.map((option, index) => (
// // //         <TouchableOpacity
// // //           key={index}
// // //           style={styles.dropdownItem}
// // //           onPress={() => {
// // //             setSelectedPrice(option);
// // //             setShowPriceDropdown(false);
// // //           }}
// // //         >
// // //           <Text style={styles.dropdownItemText}>{option}</Text>
// // //         </TouchableOpacity>
// // //       ))}
// // //     </View>
// // //   )}
// // // </View>

// // // {/* Message Field */}
// // // <Text style={styles.label}>Short Message</Text>
// // // <TextInput
// // //   style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
// // //   placeholder="Short Description about what your query is about?"
// // //   value={message}
// // //   onChangeText={setMessage}
// // //   multiline
// // // />
// // //     <TouchableOpacity
// // //   style={styles.buttonContainer}
// // //   onPress={handleSubmit}
// // //   disabled={loading}
// // // >
// // //   <Text style={styles.buttonText}>
// // //     {loading ? 'Submitting...' : 'Submit Enquiry'}
// // //   </Text>
// // // </TouchableOpacity>

// // //       </ScrollView>
// // //     </SafeAreaView>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: '#fff',
// // //     padding:5
// // //   },
// // //   headerContainer: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     alignItems: 'center',
// // //     paddingHorizontal: 20,
// // //     paddingVertical: 15,
// // //     borderBottomWidth: 1,
// // //     borderBottomColor: '#E0E0E0',
// // //   },
// // //   logoStyl:{
    
// // //    width:'50%',
// // //    resizeMode:'contain'
// // //   },
// // //   dropdownWrapper: {
// // //   flex: 1,
// // //   position: 'relative',
// // // },
// // // dropdownListFixed: {
// // //   position: 'absolute',
// // //   top: 50,
// // //   left: 0,
// // //   width: '100%',
// // //   backgroundColor: '#fff',
// // //   borderRadius: 4,
// // //   borderWidth: 1,
// // //   borderColor: '#ccc',
// // //   zIndex: 1000,
// // //   elevation: 5,
// // // },
// // //   headerButton: {
// // //     padding: 5,
// // //   },
// // //   headerIcon: {
// // //     fontSize: 24,
// // //     color: '#666',
// // //   },
// // //   headerTitle: {
// // //     fontSize: 20,
// // //     fontWeight: 'bold',
// // //     color: '#333',
// // //   },
// // //   scrollViewContent: {
// // //     padding: 10,
// // //     paddingBottom: 40, 
// // //   },
// // //   getInTouchContainer: {
// // //     backgroundColor: '#E0F7FA', 
// // //     borderRadius: 20,
// // //     paddingVertical: 10,
// // //     paddingHorizontal: 20,
// // //     alignSelf: 'center',
// // //     marginBottom: 20,
// // //   },
// // //   row: {
// // //   flexDirection: 'row',
// // //   justifyContent: 'space-between',
// // //   alignItems: 'center',
// // //   marginTop: 15,
// // // },
// // //   getInTouchText: {
// // //     fontSize: 16,
// // //     fontWeight: 'bold',
// // //     color: '#00796B', 
// // //   },
// // //   description: {
// // //     fontSize: 14,
// // //     color: '#666',
// // //     textAlign: 'center',
// // //     marginBottom: 30,
// // //     lineHeight: 20,
// // //   },
// // //   label: {
// // //     fontSize: 14,
// // //     fontWeight: '400',
// // //     color: '#232323',
// // //     marginBottom: 8,
// // //     marginTop: 15,
// // //   },
// // //   input: {
// // //     width: '100%',
// // //     height: 42,
// // //     borderRadius: 4,
// // //     paddingHorizontal: 10,
// // //     backgroundColor: '#F6F6F6',
// // //     fontSize: 12,
// // //     color: '#333',
// // //   },
// // //   dateInputContainer: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     width: '100%',
// // //     height: 42,
// // //     borderRadius: 4,
// // //     backgroundColor: '#F6F6F6',
// // //     paddingHorizontal: 10,
// // //   },
// // //   dateInputField: {
// // //     flex: 1,
// // //     backgroundColor: 'transparent',
// // //     height: '100%',
// // //     paddingHorizontal: 0,
// // //     fontSize: 14,
// // //     color: '#333',
// // //   },
// // //   calendarIcon: {
// // //   height:14,
// // //   width:14,
// // //   marginRight: 10
// // //   },
// // //  calendarIcons: {
// // //   height: 14,
// // //   width: 14,
// // //   marginLeft: 20,
// // //   tintColor: '#333', 
// // //   resizeMode: 'contain',
// // // }
// // // ,
// // //   dropdownContainer: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     width: '100%',
// // //     height: 42,
// // //     borderRadius: 4,
// // //     backgroundColor: '#F6F6F6',
// // //     paddingHorizontal: 10,
// // //   },
// // //   dropdownInputField: {
// // //     flex: 1,
// // //     backgroundColor: 'transparent',
// // //     height: '100%',
// // //     paddingHorizontal: 0,
// // //     fontSize: 14,
// // //     color: '#333',
// // //   },
// // //   dropdownArrow: {
// // //     fontSize: 20,
// // //     color: '#A0A0A0',
// // //     marginLeft: 10,
// // //   },
// // //   buttonContainer: {
// // //     backgroundColor: '#333', 
// // //     borderRadius: 8,
// // //     paddingVertical: 15,
// // //     alignItems: 'center',
// // //     marginTop: 30,
// // //     marginBottom: 20,
// // //   },
// // //   buttonText: {
// // //     color: '#fff',
// // //     fontSize: 14,
// // //     fontWeight: '600',
// // //   },
// // //    headerContent: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     alignItems: 'center',
// // //     paddingHorizontal: 10,
// // //     marginTop: 10,
// // //     paddingVertical: 20,
// // //   },
// // //   headerIcons: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //   },
// // //   iconButton: {
// // //     marginLeft: 10,
// // //     padding: 6,
// // //     backgroundColor: '#ffffff',
// // //     borderRadius: 10,
// // //     shadowColor: 'gray',
// // //     elevation: 5,
// // //   },
// // //   sectionTitle: {
// // //     fontSize: 18,
// // //     fontWeight: '600',
// // //     marginLeft: 10,
// // //   },
// // //     pakageViewB:{
// // //      flexDirection:"row",
// // //      paddingHorizontal:20,
// // //      textAlign:"center",
// // //      justifyContent:"center",
// // //      alignSelf:'center',
// // //      width:'95%',
// // //      marginBottom:0
// // //   },
// // //     sectionTitleFoodB:{
// // //      fontSize: 14,
// // //     fontWeight: '500',
// // //     marginBottom: 5,
// // //     color: 'black',
// // //     paddingHorizontal:6,
// // //     paddingVertical:4,
// // //     textAlign:"center"
// // //   },
// // // checkboxContainer: {
// // //   flexDirection: 'row',
// // //   alignItems: 'flex-start',
// // //   marginTop: 15,
// // // },

// // // checkboxBox: {
// // //   width: 18,
// // //   height: 18,
// // //   borderRadius: 4,
// // //   borderWidth: 1,
// // //   borderColor: '#A0A0A0',
// // //   marginRight: 10,
// // //   marginTop: 3,
// // // },
// // // checkboxText: {
// // //   flex: 1,
// // //   fontSize: 13,
// // //   color: '#333',
// // // },
// // // messageBox: {
// // //   width: '100%',
// // //   height: 100,
// // //   borderRadius: 4,
// // //   paddingHorizontal: 10,
// // //   backgroundColor: '#F6F6F6',
// // //   fontSize: 14,
// // //   color: '#333',
// // //   textAlignVertical: 'top', 
// // // },
// // // privacyBox: {
// // //   backgroundColor: '#F4FBF9',
// // //   padding: 15,
// // //   borderRadius: 10,
// // //   marginTop: 20,
// // // },
// // // privacyHeading: {
// // //   fontSize: 14,
// // //   color: '#000',
// // //   fontWeight: 'bold',
// // //   marginBottom: 5,
// // // },
// // // privacyText: {
// // //   fontSize: 14,
// // //   color: '#333',
// // // },
// // // privacyDataColor: {
// // //   color: '#C28D3E',
// // //   fontWeight: 'bold',
// // // },
// // // dropdownList: {
// // //   backgroundColor: '#fff',
// // //   borderRadius: 4,
// // //   borderWidth: 1,
// // //   borderColor: '#ccc',
// // //   marginTop: -10, 
// // //   marginBottom: 10,
// // //   zIndex: 1000,
// // //   elevation: 5,
// // // },
// // // dropdownItem: {
// // //   paddingVertical: 10,
// // //   paddingHorizontal: 15,
// // //   borderBottomWidth: 1,
// // //   borderBottomColor: '#eee',
// // // },
// // // dropdownItemText: {
// // //   fontSize: 14,
// // //   color: '#333',
// // // },
// // // });
// // // export default SubmitEnquiry;
// // import React, { useState } from 'react';
// // import DateTimePicker from '@react-native-community/datetimepicker';
// // import {
// //   View,
// //   TextInput,
// //   StyleSheet,
// //   ScrollView,
// //   Text,
// //   SafeAreaView,
// //   TouchableOpacity,
// //   Image,
// //   Platform
// // } from 'react-native';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { submitEnquiryForm } from '../redux/slices/formSubmissionSlice';

// // import Header from '../components/Header';

// // const airportOptions = ['Lahore', 'Karachi', 'Islamabad', 'Multan', 'Peshawar'];
// // const priceOptions = ['£ 3000.00/pp', '£ 5000.00/pp', '£ 7000.00/pp', '£ 10000.00/pp']; // These are price ranges

// // const SubmitEnquiry = ({ navigation }) => {
// //   const [fullName, setFullName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [phone, setPhone] = useState('');
// //   const [message, setMessage] = useState('');
// //   const [passengers, setPassengers] = useState(''); // Changed to empty string to encourage user input
// //   const dispatch = useDispatch();
// //   const { loading, response, error } = useSelector(state => state.formSubmission);

// //   const [departureDate, setDepartureDate] = useState('');
// //   const [showDeparturePicker, setShowDeparturePicker] = useState(false);

// //   const [showAirportDropdown, setShowAirportDropdown] = useState(false);
// //   const [selectedAirport, setSelectedAirport] = useState('');

// //   const [showPriceDropdown, setShowPriceDropdown] = useState(false);
// //   const [selectedPrice, setSelectedPrice] = useState(''); // This will store the selected price string

// //   const formatDate = (date) => {
// //     const d = new Date(date);
// //     return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
// //   };

// //   const convertToISO = (dateStr) => {
// //     if (!dateStr) return ''; // Handle empty date string
// //     const [dd, mm, yyyy] = dateStr.split('/');
// //     return `${yyyy}-${mm}-${dd}`;
// //   };

// //   const handleSubmit = () => {
// //     if (!fullName.trim() || !email.trim() || !phone.trim() || !selectedAirport || !departureDate || !passengers.trim()) {
// //       alert('Please fill all required fields: Your Name, Email, Phone, Airport, Departure Date, and Number of Passengers.');
// //       return;
// //     }

// //     const nameParts = fullName.trim().split(' ');
// //     const firstName = nameParts[0];
// //     const lastName = nameParts.slice(1).join(' ') || '';

// //     // Validate passengers is a number
// //     const numPassengers = parseInt(passengers, 10);
// //     if (isNaN(numPassengers) || numPassengers <= 0) {
// //       alert('Please enter a valid number of passengers.');
// //       return;
// //     }

// //     const payload = {
// //       page_type: 'quote_form',
// //       firstname: firstName,
// //       lastname: lastName,
// //       email,
// //       phone,
// //       message,
// //       prefered_airport: selectedAirport,
// //       prefered_airline: 'Emirates Airlines', // Can make dynamic later
// //       departure_date: convertToISO(departureDate),
// //       return_date: '', // As per API, this is for inquiry_form, can be empty for quote_form
// //       passengers: numPassengers.toString(), // Ensure it's a string as per API body example
// //     };

// //     // Optionally add the selected price if your API supports it in a separate field
// //     if (selectedPrice) {
// //       // Extract only digits from selectedPrice for API if needed, e.g., "7000" from "£ 7000.00/pp"
// //       payload.quoted_price = selectedPrice.replace(/[^\d.]/g, ''); // Removes all non-digit and non-dot characters
// //     }

// //     dispatch(submitEnquiryForm(payload));
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <Header title="Beat My Quote" showNotification={true} navigation={navigation} />
// //       <View style={styles.pakageViewB}>
// //         <Image source={require('../assets/images/Logo.png')} style={styles.logoStyl} />
// //       </View>
// //       <ScrollView contentContainerStyle={styles.scrollViewContent}>
// //         {/* Form Fields */}
// //         <Text style={styles.label}>Your Name</Text>
// //         <TextInput
// //           style={styles.input}
// //           placeholder="First Name And Last Name Here"
// //           value={fullName}
// //           onChangeText={setFullName}
// //         />
// //         <Text style={styles.label}>Email Address</Text>
// //         <TextInput
// //           style={styles.input}
// //           placeholder="Enter Email Address Here"
// //           keyboardType="email-address"
// //           value={email}
// //           onChangeText={setEmail}
// //         />
// //         <Text style={styles.label}>Phone Number</Text>
// //         <TextInput
// //           style={styles.input}
// //           placeholder="Your Phone Number Here"
// //           keyboardType="phone-pad"
// //           value={phone}
// //           onChangeText={setPhone}
// //         />
// //         <Text style={styles.label}>Which airport would you like to fly from?</Text>
// //         <View style={styles.dropdownContainer}>
// //           <TextInput
// //             style={styles.dropdownInputField}
// //             placeholder="Select"
// //             placeholderTextColor="#A0A0A0"
// //             value={selectedAirport}
// //             editable={false}
// //           />
// //           <TouchableOpacity onPress={() => setShowAirportDropdown(!showAirportDropdown)}>
// //             <Image source={require('../assets/images/downarrow.png')} style={styles.calendarIcon} />
// //           </TouchableOpacity>
// //         </View>
// //         {showAirportDropdown && (
// //           <View style={styles.dropdownList}>
// //             {airportOptions.map((airport, index) => (
// //               <TouchableOpacity
// //                 key={index}
// //                 onPress={() => {
// //                   setSelectedAirport(airport);
// //                   setShowAirportDropdown(false);
// //                 }}
// //                 style={styles.dropdownItem}
// //               >
// //                 <Text style={styles.dropdownItemText}>{airport}</Text>
// //               </TouchableOpacity>
// //             ))}
// //           </View>
// //         )}

// //         <View style={styles.row}>
// //           {/* Departure Date */}
// //           <View style={{ flex: 1, marginRight: 10 }}>
// //             <Text style={styles.label}>Departure Date</Text>
// //             <TouchableOpacity onPress={() => setShowDeparturePicker(true)}>
// //               <View style={styles.dateInputContainer}>
// //                 <TextInput
// //                   style={styles.dateInputField}
// //                   placeholder="dd/mm/yyyy"
// //                   placeholderTextColor="#A0A0A0"
// //                   value={departureDate}
// //                   editable={false}
// //                 />
// //                 <Image
// //                   source={require('../assets/images/calender.png')}
// //                   style={styles.calendarIcons}
// //                 />
// //               </View>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //         {showDeparturePicker && (
// //           <DateTimePicker
// //             value={new Date()}
// //             mode="date"
// //             display={Platform.OS === 'ios' ? 'spinner' : 'default'}
// //             onChange={(event, selectedDate) => {
// //               setShowDeparturePicker(false);
// //               if (selectedDate) {
// //                 setDepartureDate(formatDate(selectedDate));
// //               }
// //             }}
// //           />
// //         )}

// //         {/* Number of Passengers Input */}
// //         <Text style={styles.label}>Number of Passengers</Text>
// //         <TextInput
// //           style={styles.input}
// //           placeholder="e.g., 2"
// //           keyboardType="numeric"
// //           value={passengers}
// //           onChangeText={(text) => setPassengers(text.replace(/[^0-9]/g, ''))} // Allow only numbers
// //         />

// //         {/* Preferred Price Range/Limit */}
// //         <Text style={styles.label}>Preferred Price Range (Optional)</Text>
// //         <View style={{ position: 'relative', marginBottom: 10 }}>
// //           <View style={styles.dropdownContainer}>
// //             <TextInput
// //               style={styles.dropdownInputField}
// //               placeholder="Select Price (Optional)"
// //               placeholderTextColor="#A0A0A0"
// //               value={selectedPrice}
// //               editable={false}
// //             />
// //             <TouchableOpacity onPress={() => setShowPriceDropdown(!showPriceDropdown)}>
// //               <Image
// //                 source={require('../assets/images/downarrow.png')}
// //                 style={styles.calendarIcon}
// //               />
// //             </TouchableOpacity>
// //           </View>

// //           {showPriceDropdown && (
// //             <View style={styles.dropdownListFixed}>
// //               {priceOptions.map((option, index) => (
// //                 <TouchableOpacity
// //                   key={index}
// //                   style={styles.dropdownItem}
// //                   onPress={() => {
// //                     setSelectedPrice(option);
// //                     setShowPriceDropdown(false);
// //                   }}
// //                 >
// //                   <Text style={styles.dropdownItemText}>{option}</Text>
// //                 </TouchableOpacity>
// //               ))}
// //             </View>
// //           )}
// //         </View>

// //         {/* Message Field */}
// //         <Text style={styles.label}>Short Message (Optional)</Text>
// //         <TextInput
// //           style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
// //           placeholder="Short Description about what your query is about?"
// //           value={message}
// //           onChangeText={setMessage}
// //           multiline
// //         />
// //         <TouchableOpacity
// //           style={styles.buttonContainer}
// //           onPress={handleSubmit}
// //           disabled={loading}
// //         >
// //           <Text style={styles.buttonText}>
// //             {loading ? 'Submitting...' : 'Submit Enquiry'}
// //           </Text>
// //         </TouchableOpacity>

// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     padding: 5
// //   },
// //   headerContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     paddingHorizontal: 20,
// //     paddingVertical: 15,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#E0E0E0',
// //   },
// //   logoStyl: {

// //     width: '50%',
// //     resizeMode: 'contain'
// //   },
// //   dropdownWrapper: {
// //     flex: 1,
// //     position: 'relative',
// //   },
// //   dropdownListFixed: {
// //     position: 'absolute',
// //     top: 50,
// //     left: 0,
// //     width: '100%',
// //     backgroundColor: '#fff',
// //     borderRadius: 4,
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     zIndex: 1000,
// //     elevation: 5,
// //   },
// //   headerButton: {
// //     padding: 5,
// //   },
// //   headerIcon: {
// //     fontSize: 24,
// //     color: '#666',
// //   },
// //   headerTitle: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     color: '#333',
// //   },
// //   scrollViewContent: {
// //     padding: 10,
// //     paddingBottom: 40,
// //   },
// //   getInTouchContainer: {
// //     backgroundColor: '#E0F7FA',
// //     borderRadius: 20,
// //     paddingVertical: 10,
// //     paddingHorizontal: 20,
// //     alignSelf: 'center',
// //     marginBottom: 20,
// //   },
// //   row: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     marginTop: 15,
// //   },
// //   getInTouchText: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //     color: '#00796B',
// //   },
// //   description: {
// //     fontSize: 14,
// //     color: '#666',
// //     textAlign: 'center',
// //     marginBottom: 30,
// //     lineHeight: 20,
// //   },
// //   label: {
// //     fontSize: 14,
// //     fontWeight: '400',
// //     color: '#232323',
// //     marginBottom: 8,
// //     marginTop: 15,
// //   },
// //   input: {
// //     width: '100%',
// //     height: 42,
// //     borderRadius: 4,
// //     paddingHorizontal: 10,
// //     backgroundColor: '#F6F6F6',
// //     fontSize: 12,
// //     color: '#333',
// //   },
// //   dateInputContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     width: '100%',
// //     height: 42,
// //     borderRadius: 4,
// //     backgroundColor: '#F6F6F6',
// //     paddingHorizontal: 10,
// //   },
// //   dateInputField: {
// //     flex: 1,
// //     backgroundColor: 'transparent',
// //     height: '100%',
// //     paddingHorizontal: 0,
// //     fontSize: 14,
// //     color: '#333',
// //   },
// //   calendarIcon: {
// //     height: 14,
// //     width: 14,
// //     marginRight: 10
// //   },
// //   calendarIcons: {
// //     height: 14,
// //     width: 14,
// //     marginLeft: 20,
// //     tintColor: '#333',
// //     resizeMode: 'contain',
// //   }
// //   ,
// //   dropdownContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     width: '100%',
// //     height: 42,
// //     borderRadius: 4,
// //     backgroundColor: '#F6F6F6',
// //     paddingHorizontal: 10,
// //   },
// //   dropdownInputField: {
// //     flex: 1,
// //     backgroundColor: 'transparent',
// //     height: '100%',
// //     paddingHorizontal: 0,
// //     fontSize: 14,
// //     color: '#333',
// //   },
// //   dropdownArrow: {
// //     fontSize: 20,
// //     color: '#A0A0A0',
// //     marginLeft: 10,
// //   },
// //   buttonContainer: {
// //     backgroundColor: '#333',
// //     borderRadius: 8,
// //     paddingVertical: 15,
// //     alignItems: 'center',
// //     marginTop: 30,
// //     marginBottom: 20,
// //   },
// //   buttonText: {
// //     color: '#fff',
// //     fontSize: 14,
// //     fontWeight: '600',
// //   },
// //   headerContent: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     paddingHorizontal: 10,
// //     marginTop: 10,
// //     paddingVertical: 20,
// //   },
// //   headerIcons: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   iconButton: {
// //     marginLeft: 10,
// //     padding: 6,
// //     backgroundColor: '#ffffff',
// //     borderRadius: 10,
// //     shadowColor: 'gray',
// //     elevation: 5,
// //   },
// //   sectionTitle: {
// //     fontSize: 18,
// //     fontWeight: '600',
// //     marginLeft: 10,
// //   },
// //   pakageViewB: {
// //     flexDirection: "row",
// //     paddingHorizontal: 20,
// //     textAlign: "center",
// //     justifyContent: "center",
// //     alignSelf: 'center',
// //     width: '95%',
// //     marginBottom: 0
// //   },
// //   sectionTitleFoodB: {
// //     fontSize: 14,
// //     fontWeight: '500',
// //     marginBottom: 5,
// //     color: 'black',
// //     paddingHorizontal: 6,
// //     paddingVertical: 4,
// //     textAlign: "center"
// //   },
// //   checkboxContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'flex-start',
// //     marginTop: 15,
// //   },

// //   checkboxBox: {
// //     width: 18,
// //     height: 18,
// //     borderRadius: 4,
// //     borderWidth: 1,
// //     borderColor: '#A0A0A0',
// //     marginRight: 10,
// //     marginTop: 3,
// //   },
// //   checkboxText: {
// //     flex: 1,
// //     fontSize: 13,
// //     color: '#333',
// //   },
// //   messageBox: {
// //     width: '100%',
// //     height: 100,
// //     borderRadius: 4,
// //     paddingHorizontal: 10,
// //     backgroundColor: '#F6F6F6',
// //     fontSize: 14,
// //     color: '#333',
// //     textAlignVertical: 'top',
// //   },
// //   privacyBox: {
// //     backgroundColor: '#F4FBF9',
// //     padding: 15,
// //     borderRadius: 10,
// //     marginTop: 20,
// //   },
// //   privacyHeading: {
// //     fontSize: 14,
// //     color: '#000',
// //     fontWeight: 'bold',
// //     marginBottom: 5,
// //   },
// //   privacyText: {
// //     fontSize: 14,
// //     color: '#333',
// //   },
// //   privacyDataColor: {
// //     color: '#C28D3E',
// //     fontWeight: 'bold',
// //   },
// //   dropdownList: {
// //     backgroundColor: '#fff',
// //     borderRadius: 4,
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     marginTop: -10,
// //     marginBottom: 10,
// //     zIndex: 1000,
// //     elevation: 5,
// //   },
// //   dropdownItem: {
// //     paddingVertical: 10,
// //     paddingHorizontal: 15,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#eee',
// // },
// // dropdownItemText: {
// //     fontSize: 14,
// //     color: '#333',
// // },
// // });
// // export default SubmitEnquiry;
// import React, { useState } from 'react';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import {
//   View,
//   TextInput,
//   StyleSheet,
//   ScrollView,
//   Text,
//   SafeAreaView,
//   TouchableOpacity,
//   Image,
//   Platform
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { submitEnquiryForm } from '../redux/slices/formSubmissionSlice';

// import Header from '../components/Header';

// const airportOptions = ['Lahore', 'Karachi', 'Islamabad', 'Multan', 'Peshawar'];
// const priceOptions = ['£ 3000.00/pp', '£ 5000.00/pp', '£ 7000.00/pp', '£ 10000.00/pp']; // These are price ranges

// const SubmitEnquiry = ({ navigation }) => {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [message, setMessage] = useState('');
//   const [passengers, setPassengers] = useState(''); // Changed to empty string to encourage user input
//   const dispatch = useDispatch();
//   const { loading, response, error } = useSelector(state => state.formSubmission);

//   const [departureDate, setDepartureDate] = useState('');
//   const [showDeparturePicker, setShowDeparturePicker] = useState(false);

//   const [showAirportDropdown, setShowAirportDropdown] = useState(false);
//   const [selectedAirport, setSelectedAirport] = useState('');

//   const [showPriceDropdown, setShowPriceDropdown] = useState(false);
//   const [selectedPrice, setSelectedPrice] = useState(''); // This will store the selected price string

//   const formatDate = (date) => {
//     const d = new Date(date);
//     return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
//   };

//   const convertToISO = (dateStr) => {
//     if (!dateStr) return ''; // Handle empty date string
//     const [dd, mm, yyyy] = dateStr.split('/');
//     return `${yyyy}-${mm}-${dd}`;
//   };

//   const handleSubmit = () => {
//     if (!fullName.trim() || !email.trim() || !phone.trim() || !selectedAirport || !departureDate || !passengers.trim()) {
//       alert('Please fill all required fields: Your Name, Email, Phone, Airport, Departure Date, and Number of Passengers.');
//       return;
//     }

//     const nameParts = fullName.trim().split(' ');
//     const firstName = nameParts[0];
//     const lastName = nameParts.slice(1).join(' ') || '';

//     // Validate passengers is a number
//     const numPassengers = parseInt(passengers, 10);
//     if (isNaN(numPassengers) || numPassengers <= 0) {
//       alert('Please enter a valid number of passengers.');
//       return;
//     }

//     const payload = {
//        page_type: 'quote_form',
//       firstname: 'hgfds',
//       lastname: 'jhgfds',
//       email:'gfd',
//       phone:'9876432',
//       message:'fd',
//       prefered_airport: 'selectedAirport',
//       prefered_airline: 'Emirates Airlines', // Can make dynamic later
//       departure_date: 'kjhgfd',
//       return_date: 'juy', // As per API, this is for inquiry_form, can be empty for quote_form
//       passengers: '5', 
//       // page_type: 'quote_form',
//       // firstname: firstName,
//       // lastname: lastName,
//       // email,
//       // phone,
//       // message,
//       // prefered_airport: selectedAirport,
//       // prefered_airline: 'Emirates Airlines', // Can make dynamic later
//       // departure_date: convertToISO(departureDate),
//       // return_date: '', // As per API, this is for inquiry_form, can be empty for quote_form
//       // passengers: numPassengers.toString(), // Ensure it's a string as per API body example
//     };
// console.log('payload=-=-=-=-====',payload)
//     // Optionally add the selected price if your API supports it in a separate field
//     if (selectedPrice) {
//       // Extract only digits from selectedPrice for API if needed, e.g., "7000" from "£ 7000.00/pp"
//       payload.quoted_price = selectedPrice.replace(/[^\d.]/g, ''); // Removes all non-digit and non-dot characters
//     }

//     dispatch(submitEnquiryForm(payload));
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header title="Beat My Quote" showNotification={true} navigation={navigation} />
//       <View style={styles.pakageViewB}>
//         <Image source={require('../assets/images/Logo.png')} style={styles.logoStyl} />
//       </View>
//       <ScrollView contentContainerStyle={styles.scrollViewContent}>
//         {/* Form Fields */}
//         <Text style={styles.label}>Your Name</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="First Name And Last Name Here"
//           value={fullName}
//           onChangeText={setFullName}
//         />
//         <Text style={styles.label}>Email Address</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Email Address Here"
//           keyboardType="email-address"
//           value={email}
//           onChangeText={setEmail}
//         />
//         <Text style={styles.label}>Phone Number</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Your Phone Number Here"
//           keyboardType="phone-pad"
//           value={phone}
//           onChangeText={setPhone}
//         />
//         <Text style={styles.label}>Which airport would you like to fly from?</Text>
//         <View style={styles.dropdownContainer}>
//           <TextInput
//             style={styles.dropdownInputField}
//             placeholder="Select"
//             placeholderTextColor="#A0A0A0"
//             value={selectedAirport}
//             editable={false}
//           />
//           <TouchableOpacity onPress={() => setShowAirportDropdown(!showAirportDropdown)}>
//             <Image source={require('../assets/images/downarrow.png')} style={styles.calendarIcon} />
//           </TouchableOpacity>
//         </View>
//         {showAirportDropdown && (
//           <View style={styles.dropdownList}>
//             {airportOptions.map((airport, index) => (
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => {
//                   setSelectedAirport(airport);
//                   setShowAirportDropdown(false);
//                 }}
//                 style={styles.dropdownItem}
//               >
//                 <Text style={styles.dropdownItemText}>{airport}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         )}

//         <View style={styles.row}>
//           {/* Departure Date */}
//           <View style={{ flex: 1, marginRight: 10 }}>
//             <Text style={styles.label}>Departure Date</Text>
//             <TouchableOpacity onPress={() => setShowDeparturePicker(true)}>
//               <View style={styles.dateInputContainer}>
//                 <TextInput
//                   style={styles.dateInputField}
//                   placeholder="dd/mm/yyyy"
//                   placeholderTextColor="#A0A0A0"
//                   value={departureDate}
//                   editable={false}
//                 />
//                 <Image
//                   source={require('../assets/images/calender.png')}
//                   style={styles.calendarIcons}
//                 />
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>
//         {showDeparturePicker && (
//           <DateTimePicker
//             value={new Date()}
//             mode="date"
//             display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//             onChange={(event, selectedDate) => {
//               setShowDeparturePicker(false);
//               if (selectedDate) {
//                 setDepartureDate(formatDate(selectedDate));
//               }
//             }}
//           />
//         )}

//         {/* Number of Passengers Input */}
//         <Text style={styles.label}>Number of Passengers</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="e.g., 2"
//           keyboardType="numeric"
//           value={passengers}
//           onChangeText={(text) => setPassengers(text.replace(/[^0-9]/g, ''))} // Allow only numbers
//         />

//         {/* Preferred Price Range/Limit */}
//         <Text style={styles.label}>Preferred Price Range (Optional)</Text>
//         <View style={{ position: 'relative', marginBottom: 10 }}>
//           <View style={styles.dropdownContainer}>
//             <TextInput
//               style={styles.dropdownInputField}
//               placeholder="Select Price (Optional)"
//               placeholderTextColor="#A0A0A0"
//               value={selectedPrice}
//               editable={false}
//             />
//             <TouchableOpacity onPress={() => setShowPriceDropdown(!showPriceDropdown)}>
//               <Image
//                 source={require('../assets/images/downarrow.png')}
//                 style={styles.calendarIcon}
//               />
//             </TouchableOpacity>
//           </View>

//           {showPriceDropdown && (
//             <View style={styles.dropdownListFixed}>
//               {priceOptions.map((option, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   style={styles.dropdownItem}
//                   onPress={() => {
//                     setSelectedPrice(option);
//                     setShowPriceDropdown(false);
//                   }}
//                 >
//                   <Text style={styles.dropdownItemText}>{option}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           )}
//         </View>

//         {/* Message Field */}
//         <Text style={styles.label}>Short Message (Optional)</Text>
//         <TextInput
//           style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
//           placeholder="Short Description about what your query is about?"
//           value={message}
//           onChangeText={setMessage}
//           multiline
//         />
//         <TouchableOpacity
//           style={styles.buttonContainer}
//           onPress={handleSubmit}
//           disabled={loading}
//         >
//           <Text style={styles.buttonText}>
//             {loading ? 'Submitting...' : 'Submit Enquiry'}
//           </Text>
//         </TouchableOpacity>

//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 5
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//   },
//   logoStyl: {

//     width: '50%',
//     resizeMode: 'contain'
//   },
//   dropdownWrapper: {
//     flex: 1,
//     position: 'relative',
//   },
//   dropdownListFixed: {
//     position: 'absolute',
//     top: 50,
//     left: 0,
//     width: '100%',
//     backgroundColor: '#fff',
//     borderRadius: 4,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     zIndex: 1000,
//     elevation: 5,
//   },
//   headerButton: {
//     padding: 5,
//   },
//   headerIcon: {
//     fontSize: 24,
//     color: '#666',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   scrollViewContent: {
//     padding: 10,
//     paddingBottom: 40,
//   },
//   getInTouchContainer: {
//     backgroundColor: '#E0F7FA',
//     borderRadius: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     alignSelf: 'center',
//     marginBottom: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 15,
//   },
//   getInTouchText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#00796B',
//   },
//   description: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//     marginBottom: 30,
//     lineHeight: 20,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '400',
//     color: '#232323',
//     marginBottom: 8,
//     marginTop: 15,
//   },
//   input: {
//     width: '100%',
//     height: 42,
//     borderRadius: 4,
//     paddingHorizontal: 10,
//     backgroundColor: '#F6F6F6',
//     fontSize: 12,
//     color: '#333',
//   },
//   dateInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     height: 42,
//     borderRadius: 4,
//     backgroundColor: '#F6F6F6',
//     paddingHorizontal: 10,
//   },
//   dateInputField: {
//     flex: 1,
//     backgroundColor: 'transparent',
//     height: '100%',
//     paddingHorizontal: 0,
//     fontSize: 14,
//     color: '#333',
//   },
//   calendarIcon: {
//     height: 14,
//     width: 14,
//     marginRight: 10
//   },
//   calendarIcons: {
//     height: 14,
//     width: 14,
//     marginLeft: 20,
//     tintColor: '#333',
//     resizeMode: 'contain',
//   }
//   ,
//   dropdownContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     height: 42,
//     borderRadius: 4,
//     backgroundColor: '#F6F6F6',
//     paddingHorizontal: 10,
//   },
//   dropdownInputField: {
//     flex: 1,
//     backgroundColor: 'transparent',
//     height: '100%',
//     paddingHorizontal: 0,
//     fontSize: 14,
//     color: '#333',
//   },
//   dropdownArrow: {
//     fontSize: 20,
//     color: '#A0A0A0',
//     marginLeft: 10,
//   },
//   buttonContainer: {
//     backgroundColor: '#333',
//     borderRadius: 8,
//     paddingVertical: 15,
//     alignItems: 'center',
//     marginTop: 30,
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   headerContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     marginTop: 10,
//     paddingVertical: 20,
//   },
//   headerIcons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   iconButton: {
//     marginLeft: 10,
//     padding: 6,
//     backgroundColor: '#ffffff',
//     borderRadius: 10,
//     shadowColor: 'gray',
//     elevation: 5,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginLeft: 10,
//   },
//   pakageViewB: {
//     flexDirection: "row",
//     paddingHorizontal: 20,
//     textAlign: "center",
//     justifyContent: "center",
//     alignSelf: 'center',
//     width: '95%',
//     marginBottom: 0
//   },
//   sectionTitleFoodB: {
//     fontSize: 14,
//     fontWeight: '500',
//     marginBottom: 5,
//     color: 'black',
//     paddingHorizontal: 6,
//     paddingVertical: 4,
//     textAlign: "center"
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginTop: 15,
//   },

//   checkboxBox: {
//     width: 18,
//     height: 18,
//     borderRadius: 4,
//     borderWidth: 1,
//     borderColor: '#A0A0A0',
//     marginRight: 10,
//     marginTop: 3,
//   },
//   checkboxText: {
//     flex: 1,
//     fontSize: 13,
//     color: '#333',
//   },
//   messageBox: {
//     width: '100%',
//     height: 100,
//     borderRadius: 4,
//     paddingHorizontal: 10,
//     backgroundColor: '#F6F6F6',
//     fontSize: 14,
//     color: '#333',
//     textAlignVertical: 'top',
//   },
//   privacyBox: {
//     backgroundColor: '#F4FBF9',
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 20,
//   },
//   privacyHeading: {
//     fontSize: 14,
//     color: '#000',
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   privacyText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   privacyDataColor: {
//     color: '#C28D3E',
//     fontWeight: 'bold',
//   },
//   dropdownList: {
//     backgroundColor: '#fff',
//     borderRadius: 4,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     marginTop: -10,
//     marginBottom: 10,
//     zIndex: 1000,
//     elevation: 5,
//   },
//   dropdownItem: {
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
// },
// dropdownItemText: {
//     fontSize: 14,
//     color: '#333',
// },
// });
// export default SubmitEnquiry;
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
  Platform,
  Alert // Import Alert for better user feedback
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { submitEnquiryForm } from '../redux/slices/formSubmissionSlice';

import Header from '../components/Header';

const airportOptions = ['Lahore', 'Karachi', 'Islamabad', 'Multan', 'Peshawar'];
const priceOptions = ['£ 3000.00/pp', '£ 5000.00/pp', '£ 7000.00/pp', '£ 10000.00/pp']; // These are price ranges

const SubmitEnquiry = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [passengers, setPassengers] = useState('');
  const [formErrors, setFormErrors] = useState({});
 // Changed to empty string to encourage user input
  const dispatch = useDispatch();
  const { loading, response, error } = useSelector(state => state.formSubmission);
  const [departureDate, setDepartureDate] = useState('');
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [showAirportDropdown, setShowAirportDropdown] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState('');
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(''); // This will store the selected price string
const nameParts = fullName.trim().split(' ');
  const formatDate = (date) => {
    const d = new Date(date);
    // Returns date in DD/MM/YYYY format
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  };
  const convertToISO = (dateStr) => {
    if (!dateStr) return ''; // Handle empty date string
    // Converts DD/MM/YYYY to YYYY-MM-DD for API
    const [dd, mm, yyyy] = dateStr.split('/');
    return `${yyyy}-${mm}-${dd}`;
  };
 const handleSubmit = () => {
  const errors = {};
  if (!fullName.trim()) {
    errors.fullName = 'Full name is required.';
  } else if (fullName.trim().split(' ').length < 2) {
    errors.fullName = 'Please enter both first and last name.';
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
    errors.passengers = 'Number of passengers is required.';
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

  setFormErrors({}); // Clear errors if valid

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

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Beat My Quote" showNotification={true} navigation={navigation} />
      <View style={styles.pakageViewB}>
        <Image source={require('../assets/images/Logo.png')} style={styles.logoStyl} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Form Fields */}
        <Text style={styles.label}>Your Name</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name And Last Name Here"
          value={fullName}
          onChangeText={setFullName}
        />
        {formErrors.fullName && <Text style={{ color: 'red', fontSize: 12 }}>{formErrors.fullName}</Text>}
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email Address Here"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {formErrors.email && <Text style={{ color: 'red', fontSize: 12 }}>{formErrors.email}</Text>}
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Phone Number Here"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        {formErrors.phone && <Text style={{ color: 'red', fontSize: 12 }}>{formErrors.phone}</Text>}
        <Text style={styles.label}>Which airport would you like to fly from?</Text>
        <View style={styles.dropdownContainer}>
          <TextInput
            style={styles.dropdownInputField}
            placeholder="Select"
            placeholderTextColor="#A0A0A0"
            value={selectedAirport}
            editable={false}
          />
          <TouchableOpacity onPress={() => setShowAirportDropdown(!showAirportDropdown)}>
            <Image source={require('../assets/images/downarrow.png')} style={styles.calendarIcon} />
          </TouchableOpacity>
        </View>
        {showAirportDropdown && (
          <View style={styles.dropdownList}>
            {airportOptions.map((airport, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedAirport(airport);
                  setShowAirportDropdown(false);
                }}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownItemText}>{airport}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
   {formErrors.selectedAirport && <Text style={{ color: 'red', fontSize: 12 }}>{formErrors.selectedAirport}</Text>}
        <View style={styles.row}>
          {/* Departure Date */}
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={styles.label}>Departure Date</Text>
            <TouchableOpacity onPress={() => setShowDeparturePicker(true)}>
              <View style={styles.dateInputContainer}>
                <TextInput
                  style={styles.dateInputField}
                  placeholder="dd/mm/yyyy"
                  placeholderTextColor="#A0A0A0"
                  value={departureDate}
                  editable={false}
                />
                <Image
                  source={require('../assets/images/calender.png')}
                  style={styles.calendarIcons}
                />
              </View>
            </TouchableOpacity>
          </View>
          
        </View>
        {showDeparturePicker && (
          <DateTimePicker
            value={new Date()} // Initial value
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShowDeparturePicker(false);
              if (selectedDate) {
                setDepartureDate(formatDate(selectedDate));
              }
            }}
          />
        )}
{formErrors.departureDate && <Text style={{ color: 'red', fontSize: 12 }}>{formErrors.departureDate}</Text>}
        {/* Number of Passengers Input */}
        <Text style={styles.label}>Number of Passengers</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 2"
          keyboardType="numeric"
          value={passengers}
          onChangeText={(text) => setPassengers(text.replace(/[^0-9]/g, ''))} // Allow only numbers
        />
 {formErrors.passengers && <Text style={{ color: 'red', fontSize: 12 }}>{formErrors.passengers}</Text>}
        {/* Preferred Price Range/Limit */}
        <Text style={styles.label}>Preferred Price Range (Optional)</Text>
        <View style={{ position: 'relative', marginBottom: 10 }}>
          <View style={styles.dropdownContainer}>
            <TextInput
              style={styles.dropdownInputField}
              placeholder="Select Price (Optional)"
              placeholderTextColor="#A0A0A0"
              value={selectedPrice}
              editable={false}
            />
            <TouchableOpacity onPress={() => setShowPriceDropdown(!showPriceDropdown)}>
              <Image
                source={require('../assets/images/downarrow.png')}
                style={styles.calendarIcon}
              />
            </TouchableOpacity>
          </View>

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

        {/* Message Field */}
        <Text style={styles.label}>Short Message (Optional)</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Short Description about what your query is about?"
          value={message}
          onChangeText={setMessage}
          multiline
        />
         {formErrors.message && <Text style={{ color: 'red', fontSize: 12 }}>{formErrors.message}</Text>}
          {loading && <Text style={{ color: 'blue', textAlign: 'center', marginTop: 10 }}>Submitting...</Text>}
        {error && <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>Error: {error}</Text>}
        {response && <Text style={{ color: 'green', textAlign: 'center', marginTop: 10 }}>Form submitted successfully!</Text>}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Submitting...' : 'Submit Enquiry'}
          </Text>
        </TouchableOpacity>

        {/* Loading/Error/Success States (optional: add these to your UI) */}
      

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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  logoStyl: {
    width: '50%',
    resizeMode: 'contain'
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  getInTouchText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00796B',
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
    textAlign: "center",
    justifyContent: "center",
    alignSelf: 'center',
    width: '95%',
    marginBottom: 0
  },
  sectionTitleFoodB: {
    fontSize: 14,
    fontWeight: '500',
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
});
export default SubmitEnquiry;