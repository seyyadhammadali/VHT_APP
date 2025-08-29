import {  Text, StatusBar, View, useWindowDimensions, ScrollView, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import HomeHeader from '../components/HomeHeader';
import {useGetPagesQuery, useGetDestinationsQuery} from '../redux/slices/apiSlice';
import Slider from "../components/Slider";
import FastImage from "react-native-fast-image";
import { COLORS, mainStyles } from "../constants/theme";
import PagePackagesList from "../components/PagePackagesList";
import FooterTabs from "../components/FooterTabs";
import { SafeAreaView } from 'react-native-safe-area-context';
export default HomeScreen = ({navigation})=>{
    const {height, width} = useWindowDimensions();
    console.log("renderScreenHome", new Date().toUTCString());
    const {data: pageData, loading:pageLoading, error: pageError} = useGetPagesQuery();
    const { data:dataDestinations, isLoading:destinationLoading, error:destinationError } = useGetDestinationsQuery();
    const hotDestinations = dataDestinations?.data.filter(itm=>itm.hot === 1);
    const homePage = pageData?.data.find(itm=>itm.slug === 'home');
    const holidayPage = pageData?.data.find(itm=>itm.slug === 'holiday-hotlist');
    const cruise = pageData?.data.find(itm=>itm.slug === 'cruise');
    console.log("homePage", homePage);
    const sliders = homePage?.sliders || [];
    console.log("hotDestinations",hotDestinations);
    
    return (
        <>
            <StatusBar backgroundColor="transparent" translucent={true}></StatusBar>
            <SafeAreaView style={mainStyles.safeArea} edges={['bottom', 'left', 'right']} > 
                <HomeHeader />
                <ScrollView 
                style={mainStyles.container}
                contentContainerStyle={mainStyles.contentContainer}
                showsVerticalScrollIndicator={false}
               >
                    <Slider images={sliders} width={(width - 40)}/>
                    <View >
                        <View style={{flexDirection:'row', justifyContent:"space-between", marginBottom:10}}>
                            <Text style={mainStyles.heading}>Top Destinations</Text>
                            <TouchableOpacity >
                                <Text style={mainStyles.link}>See all</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={hotDestinations}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={{ justifyContent:'center' }}>
                                    <FastImage
                                        source={{ uri: item?.banner }}
                                        style={{ width: 70, height: 70, borderRadius: "50%", borderWidth:3, borderColor: COLORS.primary, alignSelf:'center' }}
                                        resizeMode={FastImage.resizeMode.cover}
                                    />
                                    <Text style={{...mainStyles.link, marginTop: 5, textAlign: 'center' }}>{item?.name}</Text>
                                </TouchableOpacity>
                            )}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{gap:10}}
                        />
                    </View>
                    {holidayPage?( <PagePackagesList title="Holiday Packages" city={true} days={true} page={holidayPage} packages={holidayPage?.products.slice(0,10)} seeAllLinkPress={()=> navigation.navigate('HolidayScreen')}  />):''}
                    {holidayPage?( <PagePackagesList title="Multi Center Deals" page={holidayPage} packages={holidayPage?.products.slice(0,10)} seeAllLinkPress={()=> navigation.navigate('HolidayScreen')}  />):''}
                    {cruise?( <PagePackagesList title="Cruise Packages" page={cruise} packages={cruise?.products.slice(0,10)} seeAllLinkPress={()=> navigation.navigate('CruiseScreen')}  />):''}
                </ScrollView>
               
            </SafeAreaView>
             <FooterTabs />
        </>
    );
}
const styles = StyleSheet.create({

});