
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from '../components/Header';
const disclaimerSections = [
  {
    title: 'Visa & Travel Eligibility',
    content: `It is your responsibility to check your visa and travel eligibility, ensuring compliance with the UK’s transition to eVisas.\n\nBRP holders must act before 31 Dec 2024, visit https://www.gov.uk/eVisa for important updates.\n\nOur role as a travel agency is to assist with travel arrangements; however, we do not assume responsibility for changes in immigration policy or disruptions due to the lack of BRP or immigration documentation. Passengers must ensure they have valid passports, visas, and all required travel documents.`,
  },
  {
    title: 'Our Responsibility',
    content: `Our role as a travel agency is to assist with travel arrangements; however, we do not assume responsibility for changes in immigration policy or disruptions due to the lack of BRP or immigration documentation. Passengers must ensure they have valid passports, visas, and all required travel documents.`,
  },
];

const Disclaimer = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
        <Header title="Disclaimer" showNotification={true} />
       <ScrollView contentContainerStyle={styles.mainContent}>
          <View style={{marginBottom:20}}/>
       {disclaimerSections.map((section, index) => (
        <View key={index} style={styles.section}>
        <Text style={styles.sectionTitleMV}>{section.title}</Text>
         <Text style={styles.paragraph}>
          {section.content.includes('https://')
            ? section.content.split('https://').map((part, i) =>
            i === 0 ? (
              part
            ) : (
              <>
                <Text style={{ color: '#0069CA', fontWeight: '500' }}>
                  https://{part.split(' ')[0]}
                </Text>{' '}
                {part.substring(part.indexOf(' ') + 1)}
              </>
            )
          )
        : section.content}
          </Text>
         <View style={{ marginBottom: 20 }} />
          </View>
         ))}
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
    fontSize: 16,
    fontWeight: '500',
    justifyContent:"flex-start",
     paddingHorizontal:10,
     paddingVertical:8,
     backgroundColor:'#01BE9E14',
     width:"90%",
     marginLeft:15
  },
  sectionTitleMV:{
  fontSize: 16,
    fontWeight: '500',
    justifyContent:"flex-start",
    marginBottom:10
  },
     sectionTitleH: {
    fontSize: 16,
    fontWeight: '500',
    justifyContent:"flex-start",
     paddingHorizontal:10,
     paddingVertical:8,
     marginLeft:15
  },
  section:{
    paddingHorizontal:20
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
  boldText:{
    color:'black',
    fontSize:14,
    fontWeight:'500'
  },
  paragraph:{
     color:'#888888',
    fontSize:14,
    lineHeight:22,
    fontWeight:"400"
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
    textAlign: 'center',
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

export default Disclaimer;
