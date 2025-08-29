import React, { memo, useCallback } from 'react';
import { View, TouchableOpacity, Text, FlatList, SafeAreaView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { COLORS,SHADOWS, mainStyles } from '../constants/theme';
import StarSVG from '../assets/images/starS.svg';
const PagePackagesList = memo(({title=null, seeAllLinkPress=null, page, packages, city=null, days=null}) => {
  const packageCard = useCallback(({item})=>(
        <View style={{...SHADOWS.medium, flexDirection:"column", width:220, backgroundColor:COLORS.white, padding:0, overflow:'hidden', borderRadius:15 }}>
            <View>
                <FastImage
                    source={{ uri: item?.main_image }}
                    style={{
                        width: 230,
                        height: 150,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </View>
            <View style={{flex:1, flexDirection:"column",padding:10,}}>
                <TouchableOpacity>
                    <Text style={{ ...mainStyles.postTitle, textAlign: 'left' }}>{item?.title.length > 60 ? item?.title.slice(0,60)+'...':item?.title}</Text>
                </TouchableOpacity>
                {city?(
                <Text style={{ color:COLORS.secondary, textAlign: 'left', lineHeight:22, fontSize:14 }}>{item?.city.length > 50 ? item?.city.slice(0,50)+'...':item?.city}</Text>
                ):''}
                <View style={{flexDirection:"row", justifyContent:'space-between', marginTop:10, padding:0}}>
                    <Text style={mainStyles.price}>£{item?.sale_price || item?.price} 
                        <Text style={mainStyles.priceSpan}> /{days?item?.duration:(item?.packagetype === 'pp'?'per person':item?.packagetype)}</Text>
                    </Text>
                    <View style={{flexDirection:"row", gap:5}}>
                        <StarSVG width={20} height={20} style={mainStyles.starRating} />
                        <Text style={mainStyles.rating}>{parseInt(item.rating).toFixed(1)}</Text>
                    </View>
                </View>
            </View>
        </View>
    ), []);
  if(!page){
    return '';
  }
  return (
    <SafeAreaView >
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <Text style={mainStyles.heading}>{title}</Text>
        {seeAllLinkPress?(
        <TouchableOpacity>
          <Text style={mainStyles.link}>See all</Text>
        </TouchableOpacity>
        ):''}
      </View>

      {/* FlatList */}
      <FlatList
        data={packages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={packageCard}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 20, paddingVertical:10, paddingRight:10 }}
      />
    </SafeAreaView>
  );
});

export default PagePackagesList;
