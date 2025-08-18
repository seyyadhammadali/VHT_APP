import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Currencygold from '../assets/images/currencygold.svg';
import colors from '../constants/colors';

const CountryContent = ({ destination }) => {
  if (!destination) return null;

  return (
    <View style={styles.basicsContainer}>
      <Text style={styles.basicsMainTitle}>Basics You Must Know</Text>
      <Text style={styles.basicsMainDescription}>
        For a seamless voyage, learn about these basics before you embark on your {destination?.name} luxury holiday.
      </Text>

      {/* First Row: Flag + Language */}
      <View style={styles.infoCardRowSingle}>
        <View style={styles.infoCard}>
          <Image
            source={{ uri: destination.flag || '' }}
            style={{ height: 50, width: 60 }}
            resizeMode="contain"
          />
          <Text style={styles.infoCardValue}>Language</Text>
          <Text style={styles.infoCardLabel}>
            {destination?.language || '—'}
          </Text>
        </View>
      </View>

      {/* Second Row: Local Time & Currency */}
      <View style={styles.infoCardRowDouble}>
        <View style={[styles.infoCard, { marginRight: 20 }]}>
          <View style={[styles.timeCurrencyIcon, { backgroundColor: '#C28D3E' }]}>
            <Text style={{ color: "white", fontWeight: "600" }}>
              {destination?.local_time ? `${destination.local_time} hrs` : '—'}
            </Text>
          </View>
          <Text style={styles.infoCardValue}>Local Time</Text>
          <Text style={styles.infoCardLabel}>{destination?.local_time ? `UTC ${destination.local_time}hrs`  : ' '}</Text>
        </View>

        <View style={styles.infoCard}>
          <View style={[styles.timeCurrencyIcon, { backgroundColor: '#C28D3E' }]}>
            <Currencygold width={40} height={40} />
          </View>
          <Text style={styles.infoCardValue}>Currency</Text>
          <Text style={styles.infoCardLabel}>{destination?.currency || '—'}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  basicsContainer: {
    paddingHorizontal: 15,
    padding: 16,
    borderRadius: 12,
  },
  basicsMainTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: colors?.darkGray,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: '#C28D3E1F',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 6,
  },
  basicsMainDescription: {
    fontSize: 14,
    color: colors?.gray,
    textAlign: 'center',
    marginBottom: 16,
  },
  infoCardRowSingle: {
    width: '100%',
    paddingHorizontal: 15,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCardRowDouble: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  infoCard: {
    backgroundColor: colors?.white,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: colors?.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 124,
  },
  timeCurrencyIcon: {
    width: 50,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  infoCardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors?.darkGray,
    textAlign: 'center',
  },
  infoCardLabel: {
    fontSize: 12,
    color: colors?.gray,
    textAlign: 'center',
  },
});

export default CountryContent;
