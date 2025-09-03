import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Getqoute from '../assets/images/getQoute.svg';
import PhoneS from '../assets/images/PhoneS.svg';
import { COLORS } from '../constants/theme';
 
const QuoteFooter = () => {
    const navigation = useNavigation();
 
    return (
        <View style={styles.bottomBar}>
            <TouchableOpacity style={[styles.blueButton, { backgroundColor: COLORS.green }]} onPress={()=>navigation.navigate('SubmitEnquiry')}>
            <Getqoute width={20} height={20} />
            <Text style={styles.buttonText}>Get A Quote</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.blueButton}
            onPress={() => Linking.openURL('tel:02080382020')}
            >
            <PhoneS width={20} height={20} />
            <Text style={styles.buttonText}>020 8038 2020</Text>
            </TouchableOpacity>
        </View>
    );
};
export default QuoteFooter;
 
const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 12,
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    left: 0, 
    right: 0, 
    alignSelf: 'center',
    paddingVertical: 10,
    borderTopWidth: 1, 
    borderTopColor: COLORS.lightGray,
  },
  blueButton: {
    flex: 1,
    backgroundColor: COLORS.blue,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'space-evenly',
    margin: 3,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 600,
    fontSize:16,
    fontFamily:'Inter-SemiBold'
  },
});