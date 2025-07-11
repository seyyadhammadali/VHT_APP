
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
import  Header from '../components/Header';
const airportOptions = ['Lahore', 'Karachi', 'Islamabad', 'Multan', 'Peshawar'];
const SubmitEnquiry = ({navigation}) => {
const [departureDate, setDepartureDate] = useState('');
const [showDeparturePicker, setShowDeparturePicker] = useState(false);
const [showReturnPicker, setShowReturnPicker] = useState(false);
const [showAirportDropdown, setShowAirportDropdown] = useState(false);
const [selectedAirport, setSelectedAirport] = useState('');
const [showPriceDropdown, setShowPriceDropdown] = useState(false);
const [selectedPrice, setSelectedPrice] = useState('');
const priceOptions = ['£ 3000.00/pp', '£ 5000.00/pp', '£ 7000.00/pp', '£ 10000.00/pp'];
const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth()+1)
    .toString().padStart(2, '0')}/${d.getFullYear()}`;
};
  return (
    <SafeAreaView style={styles.container}>
        <Header title="Beat My Quote" showNotification={true} />
            <View style={styles.pakageViewB}>
              <Image source={require('../assets/images/Logo.png')} style={styles.logoStyl}/>
            </View>
         <ScrollView contentContainerStyle={styles.scrollViewContent}>
           {/* Form Fields */}
         <Text style={styles.label}>Your Name</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name And Last Name Here"
          placeholderTextColor="#A0A0A0"
        />
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email Address Here"
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
{/* Package Price Limit */}
<Text style={styles.label}>Passenger</Text>
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

{/* Message Field */}
<Text style={styles.label}>Short Message</Text>
<TextInput
  style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
  placeholder="Short Description about what your query is about?"
  placeholderTextColor="#A0A0A0"
  multiline
/>
     <TouchableOpacity
  style={[
    styles.buttonContainer,
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
  logoStyl:{
    
   width:'50%',
   resizeMode:'contain'
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
  height:14,
  width:14,
  marginRight: 10
  },
 calendarIcons: {
  height: 14,
  width: 14,
  marginLeft: 20,
  tintColor: '#333', 
  resizeMode: 'contain',
}
,
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
    pakageViewB:{
     flexDirection:"row",
     paddingHorizontal:20,
     textAlign:"center",
     justifyContent:"center",
     alignSelf:'center',
     width:'95%',
     marginBottom:0
  },
    sectionTitleFoodB:{
     fontSize: 14,
    fontWeight: '500',
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
export default SubmitEnquiry;
