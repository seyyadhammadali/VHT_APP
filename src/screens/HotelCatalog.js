
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Image,
  Linking
} from 'react-native';
import PopularoneS from '../assets/images/popularoneS.svg';
import PopularTwoS from '../assets/images/popularhoteltwoS.svg';
import PopulathotelthreeS from '../assets/images/populathotelthreeS.svg';
import PopularhotelfourS from '../assets/images/popularhotelfourS.svg';
import Header from '../components/Header';
import StarSVG from '../assets/images/StarSVG.svg';
import PhoneS from '../assets/images/PhoneS.svg';
import Getqoute from '../assets/images/getQoute.svg';

const hotels = [
  {
    id: '1',
    title: '07 Nights Holiday in Sea Breeze Beach House...',
    subtitle: 'Sea Breeze Beach House by...',
    price: '£1,999pp',
    priceNote: '/night',
    rating: 5.0,
    image: PopularoneS
  },
  {
    id: '2',
    title: 'Your Ultimate Thailand Getaway The Float Sea Breeze Beach House...',
    subtitle: 'Sea Breeze Beach House by...',
    price: '£1,299pp',
    priceNote: '/night',
    rating: 5.0,
    image: PopularTwoS
  },
  {
    id: '3',
    title: '07 Nights Holiday in Sea Breeze  Sea Breeze Beach House Beach House...',
    subtitle: 'Sea Breeze Beach House by...',
    price: '£1,999pp',
    priceNote: '/night',
    rating: 5.0,
    image: PopulathotelthreeS
  },
  {
    id: '4',
    title: 'Your Ultimate Thailand Getaway  Sea Breeze Beach House The Float...',
    subtitle: 'Sea Breeze Beach House by...',
    price: '£1,299pp',
    priceNote: '/night',
    rating: 5.0,
    image: PopularhotelfourS
  },
   {
    id: '5',
    title: 'Your Ultimate Thailand Getaway  Sea Breeze Beach House The Float...',
    subtitle: 'Sea Breeze Beach House by...',
    price: '£1,299pp',
    priceNote: '/night',
    rating: 5.0,
  image: PopulathotelthreeS
  },
];
const HotelCatalog = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
        <Header title="Hotel Catalog" showNotification={true} navigation={navigation} />
      {/* Hotel List */}
      <View style={styles.lineStyle}/>
      <FlatList
        data={hotels}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
    renderItem={({ item }) => {
  const ImageComponent = item.image;
  return (
    <TouchableOpacity
      key={item.id}
      style={styles.card}
      onPress={() => navigation.navigate('PakageDetails', { packageData: item })}
    >
      <ImageComponent width={100} height={110} style={styles.cardimg} />
      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{item.subtitle}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{item.price}</Text>
          <Text style={styles.priceNote}>{item.priceNote}</Text>
          <View style={styles.ratingBox}>
            <StarSVG width={14} height={14} />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}}
      />
      {/* Fixed Bottom Buttons */}
      <View style={styles.bottomBar}>
          <TouchableOpacity style={[styles.blueButton,{backgroundColor:'#189900'}]}
          onPress={()=>navigation.navigate('SubmitEnquiry')}>
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
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
flex:1,
padding:5,
backgroundColor:"#ffffff"
  },
  lineStyle:{
    paddingVertical:10
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
  logoStyle: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  backArrow: {
    fontSize: 24,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 4,
  },
  card: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 1,
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
    marginBottom:8
  },
  subtitle: {
    fontSize: 12,
    color: '#777',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 19,
  },
  price: {
    color: '#d21e1e',
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 4,
  },
  priceNote: {
    color: '#999',
    fontSize: 12,
    marginRight: 8,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 13,
    color: '#000',
    marginLeft: 4,
  },
  greenButton: {
    flex: 1,
    backgroundColor: '#00b050',
    paddingVertical: 12,
    marginRight: 5,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection:"row",
    alignSelf:'center',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 12,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
     paddingVertical: 15,
  },
  blueButton: {
    flex: 1,
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'space-evenly',
    margin: 3,
  },


  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardimg:{
    margin:5
  }
});

export default HotelCatalog;
