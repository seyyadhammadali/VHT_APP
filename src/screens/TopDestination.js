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
const arraylist = [
//   { image: require('../assets/images/Countrycard.png'), label: 'Turkey' },
  { image: require('../assets/images/CountryCard.png'), label: 'Greece' ,
    title:'Maldives',
    subtitle:'Tours',
    image2:require('../assets/images/flag.png'),
    image3:require('../assets/images/Heart.png'),
  },
  { image: require('../assets/images/CountryCardTwo.png'),
     label: 'Dubai', 
     title:'Maldives',
    subtitle:'Tours',
    image2:require('../assets/images/flag.png'),
  image3:require('../assets/images/Heart.png') },
  { image: require('../assets/images/CountryCardThree.png'),
    label: 'Malaysia',
      title:'Maldives',
    subtitle:'Tours',
    image2:require('../assets/images/flag.png'),
    image3:require('../assets/images/Heart.png')},
  { image: require('../assets/images/CountryCardFour.png'), 
    label: 'Indonesia',    title:'Maldives',
    subtitle:'Tours',
    image2:require('../assets/images/flag.png') ,
  image3:require('../assets/images/Heart.png')},
  { image: require('../assets/images/CountryCardFive.png'),
     label: 'Saudi Arabia' ,    title:'Maldives',
    subtitle:'Tours',
    
    image2:require('../assets/images/flag.png'),
    image3:require('../assets/images/Heart.png')},
     { image: require('../assets/images/CountryCardSix.png'),
     label: 'Saudi Arabia' ,    title:'Maldives',
    subtitle:'Tours',
    image2:require('../assets/images/flag.png'),
    image3:require('../assets/images/Heart.png')},
];

export default function TopDestination({navigation}) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContent}>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.goBack()}
>
             <Image
            source={require('../assets/images/Back.png')}
            style={styles.logoStyle}
          />
          </TouchableOpacity>
         
          <Text style={styles.sectionTitle}>Top Destinations</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('../assets/images/notification.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('../assets/images/iconprofile.png')} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Image Grid */}
  <ScrollView
  contentContainerStyle={styles.scrollContainer}
  showsVerticalScrollIndicator={false}
>
    {arraylist.map((item, index) => {
  return (
    <View key={index} style={styles.card}>
      <ImageBackground
        source={item.image}
        style={styles.cardImage}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.contentContainer}>
          {/* First Row - Title */}
        
       <Text style={styles.titleText}>{item.title}</Text>
          {/* Second Row - Flag, Subtitle, Heart */}
         <View style={styles.row}>
  <View style={styles.infoBox}>
    <Image source={item.image2} style={styles.flagIcon} />
      <Text style={styles.countText}>62</Text>
    <Text style={styles.subtitle}>{item.subtitle}</Text>
  </View>

</View>
  <Image source={item.image3} style={styles.heartIcon} />
        </View>
      </ImageBackground>
    </View>
  );
})}
      </ScrollView>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const imageWidth = (windowWidth - 40) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:4,
    paddingBottom:40
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
    // letterSpacing: 1,
  },
  logoStyle: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
 card: {
  width: imageWidth,
  height: 250,
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
  // flex: 1,
  justifyContent: 'space-evenly',
  position:'absolute',
  bottom:18,
  left:5
},

titleText: {

  fontSize: 14,
  fontWeight: '700',
  backgroundColor: '#ffffff',
  alignSelf: 'flex-start',
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 15,
  color:'black',
  marginTop:10,
   padding:3
},

row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 6,
  borderRadius:10
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
  width: 14,
  height: 14,
  resizeMode: 'contain',
  marginRight: 4,
},

countText: {
  color: 'red',
  fontSize: 13,
  fontWeight: '600',
  marginRight: 4, // adds space between 62 and "Tours"
},

subtitle: {
  color: 'black',
  fontSize: 13,
  fontWeight: '600',
},

heartIcon: {
  width: 26,
  height: 26,
  resizeMode: 'cover',
  position:'absolute',
  left:130,
  marginTop:40
},
textstyle:{
  color:'red',
  fontSize:13,
  marginLeft:10,
  marginRight:20
}
});
