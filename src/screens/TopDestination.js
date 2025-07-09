// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   Dimensions,
//   ImageBackground
// } from 'react-native';
// import PhoneS from '../assets/images/PhoneS.svg';
// import Getqoute from '../assets/images/getQoute.svg';
// import FlagSVG from '../assets/images/flag.svg';
// import HeartSVG from '../assets/images/Heart.svg';

// import Header from '../components/Header';
// const arraylist = [

//   { image: require('../assets/images/CountryCard.png'), label: 'Greece' ,
//     title:'Maldives',
//     subtitle:'Tours',
//     image2:require('../assets/images/flag.png'),
//     image3:require('../assets/images/Heart.png'),
//   },
//   { image: require('../assets/images/CountryCardTwo.png'),
//      label: 'Dubai', 
//      title:'Maldives',
//     subtitle:'Tours',
//     image2:require('../assets/images/flag.png'),
//   image3:require('../assets/images/Heart.png') },
//   { image: require('../assets/images/CountryCardThree.png'),
//     label: 'Malaysia',
//       title:'Maldives',
//     subtitle:'Tours',
//     image2:require('../assets/images/flag.png'),
//     image3:require('../assets/images/Heart.png')},
//   { image: require('../assets/images/CountryCardFour.png'), 
//     label: 'Indonesia',    title:'Maldives',
//     subtitle:'Tours',
//     image2:require('../assets/images/flag.png') ,
//   image3:require('../assets/images/Heart.png')},
//   { image: require('../assets/images/CountryCardFive.png'),
//      label: 'Saudi Arabia' ,    title:'Maldives',
//     subtitle:'Tours',
    
//     image2:require('../assets/images/flag.png'),
//     image3:require('../assets/images/Heart.png')},
//      { image: require('../assets/images/CountryCardSix.png'),
//      label: 'Saudi Arabia' ,    title:'Maldives',
//     subtitle:'Tours',
//     image2:require('../assets/images/flag.png'),
//     image3:require('../assets/images/Heart.png')},
//       { image: require('../assets/images/CountryCardSix.png'),
//      label: 'Saudi Arabia' ,    title:'Maldives',
//     subtitle:'Tours',
//     image2:require('../assets/images/flag.png'),
//     image3:require('../assets/images/Heart.png')},
//       { image: require('../assets/images/CountryCardSix.png'),
//      label: 'Saudi Arabia' ,    title:'Maldives',
//     subtitle:'Tours',
//     image2:require('../assets/images/flag.png'),
//     image3:require('../assets/images/Heart.png')},
// ];
// export default function TopDestination({navigation}) {
//   return (
//     <View style={styles.container}>
//          <Header title="Top Destination" showNotification={true} />
//   <ScrollView
//   contentContainerStyle={styles.scrollContainer}
//   showsVerticalScrollIndicator={false}>
//     {arraylist.map((item, index) => {
//   return (
//     <View key={index} style={styles.card}>
//          <TouchableOpacity
//            key={item.id}
//           style={styles.card}
//           onPress={() => navigation.navigate('PakageDetails', { packageData: item })}>
//       <ImageBackground
//         source={item.image}
//         style={styles.cardImage}
//         imageStyle={styles.imageStyle} >
//         <View style={styles.contentContainer}>
//        <Text style={styles.titleText}>{item.title}</Text>
//          <View style={styles.row}>
//   <View style={styles.infoBox}>
//     <Image source={item.image2} style={styles.flagIcon} />
//       <Text style={styles.countText}>62</Text>
//     <Text style={styles.subtitle}>{item.subtitle}</Text>
//   </View>
// </View>
//   <Image source={item.image3} style={styles.heartIcon} />
//         </View>
//       </ImageBackground>
//       </TouchableOpacity>
//     </View>
//   );
// })}
//       </ScrollView>
//        <View style={styles.bottomBar}>
//          <TouchableOpacity style={[styles.blueButton,{backgroundColor:'#189900'}]}>
//           <Getqoute width={20} height={20} />
//           <Text style={styles.buttonText}>Get A Quote</Text>
//            </TouchableOpacity>
//           <TouchableOpacity style={styles.blueButton}>
//            <PhoneS width={20} height={20} />,
//            <Text style={styles.buttonText}>020 8038 2020</Text>
//             </TouchableOpacity>
//           </View>
//     </View>
//   );
// }

// const windowWidth = Dimensions.get('window').width;
// const imageWidth = (windowWidth - 40) / 2;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding:4,
//     paddingBottom:80
//   },
//   headerContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     marginTop: 10,
//     paddingVertical: 20,
//   },
//   headerIcons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   iconButton: {
//     marginLeft: 10,
//     padding: 6,
//     backgroundColor: '#ffffff',
//     borderRadius: 10,
//     shadowColor: 'gray',
//     elevation: 5,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     marginLeft: 10,
//   },
//   logoStyle: {
//     width:35,
//     height: 35,
//     resizeMode: 'contain',
//   },
//   scrollContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     paddingVertical:8
//   },
//  card: {
//   width: imageWidth,
//   height: 210,
//   marginBottom: 15,
//   borderRadius: 10,
//   overflow: 'hidden',
// },
// cardImage: {
//   flex: 1,
//   justifyContent: 'space-between',
//   padding: 10,
// },
// imageStyle: {
//   borderRadius: 10,
//   resizeMode: 'cover',
// },
// contentContainer: {
//   justifyContent: 'space-evenly',
//   position:'absolute',
//   bottom:18,
//   left:5
// },
// titleText: {
//   fontSize: 14,
//   fontWeight: '700',
//   backgroundColor: '#ffffff',
//   alignSelf: 'flex-start',
//   paddingHorizontal: 10,
//   paddingVertical: 4,
//   borderRadius: 15,
//   color:'black',
//   marginTop:10,
//    padding:3
// },
// row: {
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   marginTop: 6,
//   borderRadius:10
// },
// infoBox: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   backgroundColor: '#ffffff',
//   borderRadius: 15,
//   paddingHorizontal: 6,
//   paddingVertical: 3,
  
// },
// flagIcon: {
//   width: 14,
//   height: 14,
//   resizeMode: 'contain',
//   marginRight: 4,
// },
// countText: {
//   color: 'red',
//   fontSize: 13,
//   fontWeight: '600',
//   marginRight: 4, // adds space between 62 and "Tours"
// },
// subtitle: {
//   color: 'black',
//   fontSize: 13,
//   fontWeight: '600',
// },

// heartIcon: {
//   width: 26,
//   height: 26,
//   resizeMode: 'cover',
//   position:'absolute',
//   left:120,
//   marginTop:40
// },
// textstyle:{
//   color:'red',
//   fontSize:13,
//   marginLeft:10,
//   marginRight:20
// },
// bottomBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     padding:1,
//     backgroundColor:'white',
//     position:"absolute",
//     bottom:0,
//     alignSelf:'center'
//   },
//   blueButton: {
//     flex: 1,
//     backgroundColor: '#007bff',
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     flexDirection:"row",
//     paddingHorizontal:10,
//     justifyContent:"space-evenly",
//     margin:8,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground
} from 'react-native';
import PhoneS from '../assets/images/PhoneS.svg';
import Getqoute from '../assets/images/getQoute.svg';
import FlagSVG from '../assets/images/flagS.svg';
import HeartSVG from '../assets/images/Heart.svg';
import Header from '../components/Header';
const arraylist = [
  {
    image: require('../assets/images/CountryCard.png'),
    label: 'Greece',
    title: 'Maldives',
    subtitle: 'Tours',
  },
  {
    image: require('../assets/images/CountryCardTwo.png'),
    label: 'Dubai',
    title: 'Maldives',
    subtitle: 'Tours',
  },
  {
    image: require('../assets/images/CountryCardThree.png'),
    label: 'Malaysia',
    title: 'Maldives',
    subtitle: 'Tours',
  },
  {
    image: require('../assets/images/CountryCardFour.png'),
    label: 'Indonesia',
    title: 'Maldives',
    subtitle: 'Tours',
  },
  {
    image: require('../assets/images/CountryCardFive.png'),
    label: 'Saudi Arabia',
    title: 'Maldives',
    subtitle: 'Tours',
  },
  {
    image: require('../assets/images/CountryCardSix.png'),
    label: 'Saudi Arabia',
    title: 'Maldives',
    subtitle: 'Tours',
  },
  {
    image: require('../assets/images/CountryCardSix.png'),
    label: 'Saudi Arabia',
    title: 'Maldives',
    subtitle: 'Tours',
  },
  {
    image: require('../assets/images/CountryCardSix.png'),
    label: 'Saudi Arabia',
    title: 'Maldives',
    subtitle: 'Tours',
  },
];
export default function TopDestination({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title="Top Destination" showNotification={true} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {arraylist.map((item, index) => {
          return (
            <View key={index} style={styles.card}>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('PakageDetails', { packageData: item })}
              >
                <ImageBackground
                  source={item.image}
                  style={styles.cardImage}
                  imageStyle={styles.imageStyle}
                >
                  <View style={styles.contentContainer}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <View style={styles.row}>
                      <View style={styles.infoBox}>
                        <FlagSVG width={14} height={14} style={styles.flagIcon} />
                        <Text style={styles.countText}>62</Text>
                        <Text style={styles.subtitle}>{item.subtitle}</Text>
                      </View>
                    </View>
                    <HeartSVG width={26} height={26} style={styles.heartIcon} />
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={[styles.blueButton, { backgroundColor: '#189900' }]}>
          <Getqoute width={20} height={20} />
          <Text style={styles.buttonText}>Get A Quote</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.blueButton}>
          <PhoneS width={20} height={20} />
          <Text style={styles.buttonText}>020 8038 2020</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const windowWidth = Dimensions.get('window').width;
const imageWidth = (windowWidth - 40) / 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 4,
    paddingBottom: 80,
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,

  },
  card: {
    width: imageWidth,
    height: 210,
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  imageStyle: {
    borderRadius: 10,
    resizeMode: 'cover',
  },
  contentContainer: {
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 8,
    left: 5,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '700',
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    color: 'black',
    marginTop: 10,
    padding: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    borderRadius: 10,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  flagIcon: {
    marginRight: 4,
  },
  countText: {
    color: 'red',
    fontSize: 13,
    fontWeight: '600',
    marginRight: 4,
  },
  subtitle: {
    color: 'black',
    fontSize: 13,
    fontWeight: '600',
  },
  heartIcon: {
    position: 'absolute',
    left: 120,
    marginTop: 40,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 5,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
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
