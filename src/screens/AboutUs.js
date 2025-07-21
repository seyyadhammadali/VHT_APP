
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAboutUsPage, selectAboutUsPage } from '../redux/slices/pagesSlice';
import Header from '../components/Header';
import colors from '../constants/colors';
import FastImage from 'react-native-fast-image';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const AboutUs = ({ navigation }) => {
  const dispatch = useDispatch();
  const aboutUsPage = useSelector(selectAboutUsPage);
  useEffect(() => {
    dispatch(fetchAboutUsPage());
  }, [dispatch]);
  return (
    <SafeAreaView style={styles.container}>  
   <Header title="About Us" showNotification={true} navigation={navigation} />
     <ScrollView contentContainerStyle={styles.mainContent}>
        {aboutUsPage ? (
          <View>
            {aboutUsPage.banner && (
              <FastImage
                source={{ uri: aboutUsPage.banner }}
                style={styles.banner}
                resizeMode={FastImage.resizeMode.cover}
              />
            )}
            <View style={styles.section}>
              {aboutUsPage && renderAboutUsSections(aboutUsPage.description)}
            </View>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
</ScrollView>

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: 'gray',
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
     paddingHorizontal:15,
     paddingVertical:8,
     backgroundColor:colors.lightGreen,
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
    paddingHorizontal:10,
    paddingBottom:40
  },
  textStyle: {
    fontSize: 13,
    fontWeight: '400',
    textAlign: "center",
    color: colors.gray
  },
  scrollViewContent: {
    padding: 10,
    paddingBottom: 40, 
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.darkGray,
    marginBottom: 8,
    marginTop: 15, 
  },
  boldText:{
    color:'black',
    fontSize:14,
    fontWeight:'500'
  },
  paragraph:{
     color:colors.gray,
    fontSize:14,
    lineHeight:22,
    fontWeight:"400"
},
  input: {
    width: '100%',
    height: 42,
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: colors.lightGray,
    fontSize: 12,
    color: colors.darkGray,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 42,
    borderRadius: 4,
    backgroundColor: colors.lightGray,
    paddingHorizontal: 10,
  },
  dateInputField: {
    flex: 1,
    backgroundColor: 'transparent',
    height: '100%',
    paddingHorizontal: 0,
    fontSize: 12,
    color: colors.darkGray,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 42,
    borderRadius: 4,
    backgroundColor: colors.lightGray,
    paddingHorizontal: 10,
  },
  dropdownInputField: {
    flex: 1,
    backgroundColor: 'transparent',
    height: '100%',
    paddingHorizontal: 0,
    fontSize: 12,
    color: colors.darkGray,
  },
  buttonContainer: {
    backgroundColor: colors.darkGray, 
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  contactInfoSection: {
    marginTop: 8,
    backgroundColor: colors.white, 
    borderRadius: 10,
    overflow: 'hidden', 
     borderWidth: 1,
     borderColor: colors.lightBlue,
 shadowColor: 'rgba(27, 27, 77, 0.08)', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1, 
    shadowRadius: 45,
    elevation: 5, 
  },
  contactInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBlue, 
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  contactInfoHeaderIcon: {
    fontSize: 18, 
    marginRight: 10,
  },
  contactInfoHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.darkGray,
  },
  contactInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray, 
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
    color: colors.darkGray,
    fontWeight: '400',
  },
  callStrapButton: {
    backgroundColor: colors.lightPurple,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginLeft:"auto"
  },
  callStrapButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.darkGray,
  },
  openingHoursSection: {
    marginTop: 20, 
    backgroundColor: colors.white,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.gray,
  },
  openingHoursHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBlue, 
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  openingHoursTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.darkGray,
  },
  openingHoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  openingHoursDay: {
    fontSize: 14,
    color: colors.darkGray,
  },
  openingHoursTimeContainer: {
    backgroundColor: colors.lightGreen, 
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  openingHoursTime: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.darkGreen, 
  },
  closedTimeContainer: {
    backgroundColor: colors.lightRed, 
  },
  closedTimeText: {
    color: colors.red, 
  },
  locationContainer:{ 
    marginTop: 20,
    backgroundColor: colors.white, 
    borderRadius: 10,
    overflow: 'hidden', 
    borderWidth: 1,
    borderColor: colors.gray,
}
,
  banner: {
    width: width - 30,
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
    alignSelf: 'center',
  },
});
export default AboutUs;


function renderAboutUsSections(html) {
  if (!html) return null;
  // Split by <p>...</p>
  const regex = /<p>(.*?)<\/p>/g;
  const matches = [...html.matchAll(regex)];
  if (!matches.length) return null;

  return matches.map((match, idx) => {
    // Remove any extra HTML tags inside
    let text = match[1].replace(/<[^>]*>?/gm, '').trim();

    // Check for headers
    if (
      text === 'About Us' ||
      text === 'Our Vision:' ||
      text === 'Our Mission:'
    ) {
      return (
        <Text
          key={idx}
          style={{
            color: '#C28D3E',
            fontWeight: 'bold',
            fontSize: 16,
            marginTop: 12,
            marginBottom: 4,
          }}
        >
          {text}
        </Text>
      );
    }

    // Normal paragraph
    return (
      <Text
        key={idx}
        style={{
          color: '#888888',
          fontSize: 14,
          lineHeight: 22,
          marginBottom: 8,
        }}
      >
        {text}
      </Text>
    );
  });
}
