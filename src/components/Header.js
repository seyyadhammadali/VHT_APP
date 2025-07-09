// components/Header.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackArrowIcon from '../assets/images/BackIcon.svg'; // Replace with your actual icon path
import NotifyIcon from '../assets/images/NotifyIIcon.svg';
const Header = ({ title, showNotification = false, onBack }) => {
  const navigation = useNavigation();

  return (
     <View style={styles.headerContent}>
      {/* Left: Back + Title */}
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={onBack ? onBack : () => navigation.goBack()}>
          <BackArrowIcon 
          // style={styles.backImage}
           />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>

      {/* Right: Notification */}
      {showNotification && (
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <NotifyIcon/>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 25,
    paddingVertical:5,
    backgroundColor: '#ffffff',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
    color: '#333',
  },
  backImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  iconButton: {
    paddingLeft: 12,
  },
});