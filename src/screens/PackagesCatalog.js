import React ,{useEffect}from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Linking,
  FlatList
} from 'react-native';
import PhoneS from '../assets/images/PhoneS.svg';
import Getqoute from '../assets/images/getQoute.svg';
import Header from '../components/Header';
import {
  selectHolidayPackages,
  fetchHolidayPackages,
  selectHolidayPackagesStatus,
 
} from '../redux/slices/pakagesSlice';
import { useSelector, useDispatch } from 'react-redux';
import colors from '../constants/colors';
const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 36) / 2;
export default function PackageList({navigation}) {
     const holidayPackages = useSelector(selectHolidayPackages);
     const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchHolidayPackages());
  }, [dispatch]);
  
  return (
    <View style={styles.maincontainer}>
     <Header title="Pakage Catalog" showNotification={true} navigation={navigation} />
    <ScrollView contentContainerStyle={styles.container} showsHorizontalScrollIndicator={false}>
<FlatList
  data={holidayPackages}
  keyExtractor={(item) => item.id}
  numColumns={2}
  columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10 }}
  contentContainerStyle={{ paddingBottom: 120, paddingTop: 10 }}
  showsVerticalScrollIndicator={false}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PakageDetails', { packageData: item })}
    >
      <ImageBackground
        source={{ uri: item?.main_image }}
        style={styles.cardImage}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.pill}>
          <Image
            source={require('../assets/images/flag.png')}
            style={styles.flagIcon}
          />
          <Text style={styles.daysText}>{item.duration || 'Nights'}</Text>
        </View>
      </ImageBackground>

      <View style={styles.cardContent}>
        <Text style={styles.titleText} numberOfLines={4}>
          {item.title}
        </Text>
        <View style={styles.bottomRow}>
          <Text style={styles.priceText}>
            £{item.sale_price}{' '}
            <Text style={styles.unit}>/{item.packagetype || 'pp'}</Text>
          </Text>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )}
/>

    </ScrollView>

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
      </View>
  );
}

const styles = StyleSheet.create({
maincontainer:{
  flex:1,
   padding:5,
 backgroundColor:colors.white,
    paddingBottom:80
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

  },
 card: {
  width: cardWidth,
  backgroundColor: colors.white,
  borderRadius: 12,
  overflow: 'hidden',
  marginBottom: 12,
  elevation: 4,
  shadowColor: colors.black,
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
    backgroundColor: colors.white,
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
    color: colors.black,
  },
  cardContent: {
    padding: 10,
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.darkGray,
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
    color: colors.gold,
  },
  unit: {
    fontSize: 11,
    color: colors.mediumGray,
  },
  rating: {
    fontSize: 12,
    color: colors.orange, // orange
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

});
