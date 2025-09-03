import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { SHADOWS, mainStyles, COLORS } from "../constants/theme";
import FastImage from "react-native-fast-image";
import StarSVG from '../assets/images/starS.svg';
import FlagSVG from '../assets/images/flagS.svg';
const packageCard = ({ item, days=false}) => {
    return (
        <View
          style={{
            flex:1,
            ...SHADOWS.medium,
            flexDirection: 'column',
            backgroundColor: COLORS.white,
            borderRadius: 15,
            overflow: 'hidden',
          }}
        >
            <FastImage
                source={{ uri: item?.main_image }}
                style={{
                width:"100%",
                height: 150,
                flexDirection:"column",
                justifyContent:"flex-end",
                padding:10,
                }}
                resizeMode={FastImage.resizeMode.cover}
            > 
            {days?(
                <View style={styles.infoBox}>
                    <FlagSVG width={14} height={14} style={styles.flagIcon} />
                    <Text style={styles.countText}>{item?.duration.split(' ')[0]}</Text>
                    <Text style={styles.subtitle}> {item?.duration.split(' ')[1]}</Text>
                </View>
            ):''}
            </FastImage>
         
          <View style={{ flexDirection: 'column', padding: 10, justifyContent:'space-between' }}>
            <TouchableOpacity onPress={() => { /* Add navigation or action here */ }}>
              <Text style={{ ...mainStyles.postTitle, textAlign: 'left' }}>
                {item?.title?.length > 60 ? `${item.title.slice(0, 60)}...` : item?.title || 'Untitled'}
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={mainStyles.price}>
                £{item?.sale_price || item?.price || 'N/A'}{' '}
                <Text style={mainStyles.priceSpan}>
                  /{item?.packagetype || 'N/A'}
                </Text>
              </Text>
              <View style={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                <StarSVG width={14} height={14} style={mainStyles.starRating} />
                <Text style={[mainStyles.rating, {color:COLORS.red, fontStyle:'italic'}]}>
                  {item?.rating ? Number(item.rating).toFixed(1) : 'N/A'}
                </Text>
              </View>
            </View>
          </View>
        </View>
    );
}

export default packageCard;
const styles = StyleSheet.create({
    titleText: { fontSize: 14, fontWeight: '500', fontFamily:'Inter-Medium', backgroundColor: COLORS.white, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 15 , alignSelf: 'flex-start'},
  infoBox: { flexDirection: 'row', alignItems: 'center', fontFamily:'Inter-Bold', backgroundColor: COLORS.white, borderRadius: 15, paddingHorizontal: 6, paddingVertical: 3, marginTop: 6, alignSelf : "flex-start" },
  flagIcon: { marginRight: 4 },
  countText: { color: COLORS.red, fontSize: 13, fontWeight: '700' },
  subtitle: { color: COLORS.black, fontSize: 13, fontWeight: '700' },
  
});