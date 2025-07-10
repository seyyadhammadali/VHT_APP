
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
const aboutData = [
  {
    sectionTitle: 'Get to Know Us!',
    paragraphs: [
      'Virikson Holidays an esteemed travel agency in the UK, began its journey as an online travel firm in 2013. Over time, it has become a trusted name for travellers with expertise in booking flights, hotel reservations and providing the best routes for visitors.',
      'The firm boasts strong ties with several of the world\'s major airline companies and has excellence in offering low airfares for inexpensive and customized holiday packages. Travelling with us enables travelers plan one of the best adventures they look forward to, with services entailing to their needs.',
      'We offer low-cost flights to all major destinations around the globe and plan itineraries that offer our customers comfortable journeys and mass savings. This is what completes our mission as we never allow the techniques of money saver to hamper the quality of the flights and services we handle.'
    ]
  },
  {
    sectionTitle: 'Our Vision',
    paragraphs: [
      'Working actively to promote sustainable tourism development and care for people, cultural heritage and the environment.'
    ]
  },
  {
    sectionTitle: 'Our Mission',
    paragraphs: [
      'To create unforgettable travel experiences with highly-personalized services that ensure every traveller explores the world with confidence and joy.'
    ]
  }
];

const AboutUs = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
     <Header title="About Us" showNotification={true} />
     <ScrollView contentContainerStyle={styles.mainContent}>
  {aboutData.map((section, index) => (
    <View key={index}>
      <Text
        style={index === 0 ? styles.sectionTitle : styles.sectionTitleMV}
      >
        {section.sectionTitle}
      </Text>

      <View style={{ marginBottom: 10 }} />

      <View style={styles.section}>
        {section.paragraphs.map((para, pIdx) => (
          <Text key={pIdx} style={styles.paragraph}>
            {index === 0 && pIdx === 0 ? (
              <>
                <Text style={styles.boldText}>Virikson Holidays</Text>{' '}
                {para.replace('Virikson Holidays', '')}
              </>
            ) : (
              para
            )}
          </Text>
        ))}
      </View>
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
  mainContent:{
    paddingHorizontal:5
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
     paddingHorizontal:15,
     paddingVertical:8,
     backgroundColor:'#01BE9E14',
     width:"90%",
     marginLeft:1
  },
  sectionTitleMV:{
  fontSize: 16,
    fontWeight: '500',
    paddingHorizontal:10,
    marginBottom:10,
    marginTop:10,
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
    paddingHorizontal:10
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
export default AboutUs;


