
import React ,{useState } from 'react';
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
import Plan from '../assets/images/plane.svg';
import Header from '../components/Header';
const Inquire = ({navigation}) => {
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
const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth()+1)
    .toString().padStart(2, '0')}/${d.getFullYear()}`;
};
  return (
    <SafeAreaView style={styles.container}>
        <Header title="Inquire" showNotification={true} />
             <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <View style={styles.pakageViewB}>
                 <Plan style={{paddingVertical:15,paddingHorizontal:10}}/>
                <Text style={styles.sectionTitleFoodB}>Get in Touch</Text>
             </View>
        <Text style={styles.description}>
          Please fill out the information below and we will reach out to you
          with an update within 24 hours. You may also provide us a timeframe
          in the comments section to call you back at your availability &
          comfort.
        </Text>    
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
          style={styles.calendarIcon}
        />
      </View>
    </TouchableOpacity>
  </View>

  {/* Return Date */}
  <View style={{ flex: 1 }}>
    <Text style={styles.label}>Return Date</Text>
    <TouchableOpacity onPress={() => setShowReturnPicker(true)}>
      <View style={styles.dateInputContainer}>
        <TextInput
          style={styles.dateInputField}
          placeholder="dd/mm/yyyy"
          placeholderTextColor="#A0A0A0"
          value={returnDate}
          editable={false}
        />
        <Image
          source={require('../assets/images/calender.png')}
          style={styles.calendarIcon}
        />
      </View>
    </TouchableOpacity>
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
      }
    }}
  />
)}
{/* Time Availability */}
<Text style={styles.label}>Preferred Airlines</Text>
<TextInput
  style={styles.input}
  placeholder="Preferred Aireline"
  placeholderTextColor="#A0A0A0"
/>
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
<View style={styles.row}>
  {/* No of Child */}
  <View style={[styles.dropdownWrapper, { marginRight: 10 }]}>
    <Text style={styles.label}>No of Child</Text>
    <View style={styles.dropdownContainer}>
      <TextInput
        style={styles.dropdownInputField}
        placeholder="Age 0–11 month"
        placeholderTextColor="#A0A0A0"
        value={selectedChild}
        editable={false}
      />
      <TouchableOpacity onPress={() => {
        setShowChildDropdown(!showChildDropdown);
        setShowAdultDropdown(false);
      }}>
        <Image source={require('../assets/images/downarrow.png')} style={styles.calendarIcon} />
      </TouchableOpacity>
    </View>
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
  {/* No of Adult */}
  <View style={styles.dropdownWrapper}>
    <Text style={styles.label}>No of Adult</Text>
    <View style={styles.dropdownContainer}>
      <TextInput
        style={styles.dropdownInputField}
        placeholder="Age +11 month"
        placeholderTextColor="#A0A0A0"
        value={selectedAdult}
        editable={false}
      />
      <TouchableOpacity onPress={() => {
        setShowAdultDropdown(!showAdultDropdown);
        setShowChildDropdown(false);
      }}>
        <Image source={require('../assets/images/downarrow.png')} style={styles.calendarIcon} />
      </TouchableOpacity>
    </View>
    {showAdultDropdown && (
      <View style={styles.dropdownListFixed}>
        {adultOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.dropdownItem}
            onPress={() => {
              setSelectedAdult(option);
              setShowAdultDropdown(false);
            }}
          >
            <Text style={styles.dropdownItemText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )}
  </View>
</View>
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
    <Image source={require('../assets/images/calender.png')} style={styles.calendarIcon} />
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
{/* Package Price Limit */}
<Text style={styles.label}>Package Price Limit</Text>
<View style={{ position: 'relative', marginBottom: 10 }}>
  <View style={styles.dropdownContainer}>
    <TextInput
      style={styles.dropdownInputField}
      placeholder="£ 7000.00/pp"
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
<Text style={styles.label}>Your Message</Text>
<TextInput
  style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
  placeholder="Short Description about what your query is about?"
  placeholderTextColor="#A0A0A0"
  multiline
/>
<View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 15 }}>
  <TouchableOpacity
    style={{
      width: 18,
      height: 18,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: '#A0A0A0',
      marginRight: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isChecked ? '#000' : 'transparent',
      marginTop: 2, // optional: adjust vertical alignment tweak
    }}
    onPress={() => setIsChecked(!isChecked)}
  >
    {isChecked && (
      <Image
        source={require('../assets/images/tickarrow.png')}
        style={{ width: 14, height: 14, tintColor: '#fff' }}
        resizeMode="contain"
      />
    )}
  </TouchableOpacity>
  <Text style={{ flex: 1, fontSize: 12, color: '#232323',fontWeight:'400',lineHeight:16}}>
    We’d love to keep you updated with our latest exclusive offers, exciting travel news, and
    special giveaways via email or Call. Please tick this box to opt in.
  </Text>
</View>
<View
  style={{
    backgroundColor: '#F4FBF9',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  }}
>
  <Text style={{ fontSize: 14, color: '#000', marginBottom: 5 }}>
    <Text style={{ fontWeight: 'bold' }}>How will your </Text>
    <Text style={{ fontWeight: 'bold', color: '#C28D3E' }}>data</Text>
    <Text style={{ fontWeight: 'bold' }}> be used?</Text>
  </Text>
  <Text style={{ fontSize: 12, color: '#333',lineHeight:16 }}>
    We at Virikson Holidays take your Privacy Seriously and never sell your details. We also ensure
    to keep your data secure and safe. We'd like to share discounts, promotions and latest Holiday
    Packages with your positive consent.
  </Text>
</View>

     <TouchableOpacity style={[ styles.buttonContainer,
    { backgroundColor: isChecked ? '#01BE9E' : '#333' } 
  ]}
  onPress={() => console.log('Submit Enquiry Pressed')} 
>
  <Text style={styles.buttonText}>Submit Enquiry</Text>
</TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:5
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
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
    fontWeight:"400"
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
  height:15,
  width:15,

    marginLeft: 10
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
    fontSize: 18,
    fontWeight: 'bold',
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
    pakageViewB:{
     flexDirection:"row",
     paddingHorizontal:20,
     paddingVertical:8,
     backgroundColor:'#01BE9E14',
     borderRadius:10,
     textAlign:"center",
     justifyContent:"center",
     alignSelf:'center',
     width:'95%',
     marginBottom:20
  },
    sectionTitleFoodB:{
     fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: 'black',
    paddingHorizontal:6,
    paddingVertical:4,
    textAlign:"center"
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
export default Inquire;
