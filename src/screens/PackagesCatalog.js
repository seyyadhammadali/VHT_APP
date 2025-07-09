import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import PhoneS from '../assets/images/PhoneS.svg';
import Getqoute from '../assets/images/getQoute.svg';
import Header from '../components/Header';
const DATA = [
  {
    id: 1,
    image: require('../assets/images/CountryCard.png'),
    title: 'Step Into Paradise\n with Kuredu \nMaldives - All Meals & Transfers are Free',
    price: '£1399',
    days: '7 Days',
    flag: require('../assets/images/flag.png'),
    rating: '4.0',
  },
  {
    id: 2,
    image: require('../assets/images/CountryCardTwo.png'),
    title: 'Step Into Paradise\n with Kuredu \nMaldives - All Meals & Transfers are Free',
    price: '£1399',
    days: '17 Days',
    flag: require('../assets/images/flag.png'),
    rating: '4.0',
  },
  {
    id: 3,
    image: require('../assets/images/CountryCardThree.png'),
    title: 'Step Into Paradise\n with Kuredu \nMaldives - All Meals & Transfers are Free',
    price: '£1399',
    days: '8 Days',
    flag: require('../assets/images/flag.png'),
    rating: '4.0',
  },
  {
    id: 4,
    image: require('../assets/images/CountryCardFour.png'),
    title: 'Step Into Paradise\n with Kuredu \nMaldives - All Meals & Transfers are Free',
    price: '£1399',
    days: '9 Days',
    flag: require('../assets/images/flag.png'),
    rating: '4.0',
  },
   {
    id: 5,
    image: require('../assets/images/CountryCardFour.png'),
    title: 'Step Into Paradise\n with Kuredu \nMaldives - All Meals & Transfers are Free',
    price: '£1399',
    days: '9 Days',
    flag: require('../assets/images/flag.png'),
    rating: '4.0',
  },
   {
    id: 6,
    image: require('../assets/images/CountryCardFour.png'),
    title: 'Step Into Paradise\n with Kuredu \nMaldives - All Meals & Transfers are Free',
    price: '£1399',
    days: '9 Days',
    flag: require('../assets/images/flag.png'),
    rating: '4.0',
  },
];
const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 36) / 2;

export default function PackageList({navigation}) {
  return (
    <View style={styles.maincontainer}>
    <Header title="Pakage Catalog" showNotification={true} />
    <ScrollView contentContainerStyle={styles.container} showsHorizontalScrollIndicator={false}>
   {DATA.map((item) => (
  <TouchableOpacity
    key={item.id}
    style={styles.card}
    onPress={() => navigation.navigate('PakageDetails', { packageData: item })}
  >
    <ImageBackground
      source={item.image}
      style={styles.cardImage}
      imageStyle={styles.imageStyle}>
      <View style={styles.pill}>
        <Image source={item.flag} style={styles.flagIcon} />
        <Text style={styles.daysText}>{item.days}</Text>
      </View>
    </ImageBackground>
    <View style={styles.cardContent}>
      <Text style={styles.titleText} numberOfLines={4}>
        {item.title}
      </Text>
      <View style={styles.bottomRow}>
        <Text style={styles.priceText}>{item.price} <Text style={styles.unit}>/pp</Text></Text>
        <Text style={styles.rating}>⭐ {item.rating}</Text>
      </View>
    </View>
  </TouchableOpacity>
))}

    </ScrollView>

      <View style={styles.bottomBar}>
              <TouchableOpacity style={[styles.blueButton,{backgroundColor:'#189900'}]}
              onPress={()=>navigation.navigate('SubmitEnquiry')}>
                    <Getqoute width={20} height={20} />

              <Text style={styles.buttonText}>Get A Quote</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.blueButton}>
                    <PhoneS width={20} height={20} />,
              <Text style={styles.buttonText}>020 8038 2020</Text>
            </TouchableOpacity>
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
    maincontainer:{
flex:1,
padding:5,
backgroundColor:"#ffffff"

    },
    logoStyle:{
      height:35,
      width:35,
      resizeMode:"contain"
    },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
    
  },
  card: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  
  },
  cardImage: {
    height: 180,
    padding: 10,
    justifyContent: 'flex-start',
  },
  imageStyle: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: 'flex-start',
    position:'absolute',
    bottom:5,
    marginLeft:5
  },
  flagIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    marginRight: 6,
  },
  daysText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  cardContent: {
    padding: 10,
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#C28D3E',
  },
  unit: {
    fontSize: 11,
    color: '#666',
  },
  rating: {
    fontSize: 12,
    color: '#f97316', // orange
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
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10,
  },
   bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding:1,
    backgroundColor:'white',
    position:"absolute",
    bottom:0,
    alignSelf:'center'
  },

  blueButton: {
    flex: 1,
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection:"row",
    paddingHorizontal:10,
    justifyContent:"space-evenly",
    margin:8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

});
