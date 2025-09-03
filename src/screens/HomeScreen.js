import {  Text, StatusBar, View, useWindowDimensions, ScrollView, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import HomeHeader from '../components/HomeHeader';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useGetPagesQuery, useGetDestinationsQuery} from '../redux/slices/apiSlice';
import Slider from "../components/Slider";
import FastImage from "react-native-fast-image";
import { COLORS, mainStyles } from "../constants/theme";
import PagePackagesList from "../components/PagePackagesList";
import FooterTabs from "../components/FooterTabs";
import { SafeAreaView } from 'react-native-safe-area-context';
const HomeScreen = ({navigation})=>{
    const {height, width} = useWindowDimensions();
    console.log("renderScreenHome", new Date().toUTCString());
    console.log("homePage",  useGetPagesQuery());
    const {data: pageData, isLoading:pageLoading} = useGetPagesQuery();
    const { data:dataDestinations, isLoading:destinationLoading } = useGetDestinationsQuery();
    const hotDestinations = dataDestinations?.data.filter(itm=>itm.hot === 1);
    const homePage = pageData?.data.find(itm=>itm.slug === 'home');
    const holidayPage = pageData?.data.find(itm=>itm.slug === 'holiday-hotlist');
    const cruise = pageData?.data.find(itm=>itm.slug === 'cruise');
    const safari = pageData?.data.find(itm=>itm.slug === 'safari');
    
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
                    <Slider images={sliders} loading={pageLoading} width={(width - 40)}/>
                    {destinationLoading?(
                        <>
                        <SkeletonPlaceholder>
                            <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between" marginVertical={10}>
                            {[...Array(5)].map((_, index) => (
                                <SkeletonPlaceholder.Item
                                key={index}
                                    alignItems="center"
                                    marginRight={8}
                                    >
                                <SkeletonPlaceholder.Item width={60} height={60} borderRadius={30} />
                                <SkeletonPlaceholder.Item width={50} height={10} borderRadius={4} marginTop={6} />
                                </SkeletonPlaceholder.Item>
                                ))}
                            </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder>
                        </>
                    ):(
                    <View >
                        <View style={{flexDirection:'row', justifyContent:"space-between", marginBottom:10}}>
                            <Text style={mainStyles.heading}>Top Destinations</Text>
                            <TouchableOpacity onPress={()=> navigation.navigate('Destinations')}>
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
                    )}
                    <PagePackagesList loading={pageLoading} title="Holiday Packages" city={true} days={true} page={holidayPage} packages={holidayPage?.products.slice(0,10)} seeAllLinkPress={()=> navigation.navigate('HolidayHotlist')}  />
                    <PagePackagesList loading={pageLoading} title="Multi Center Deals" page={holidayPage} packages={holidayPage?.products.slice(0,10)} seeAllLinkPress={()=> navigation.navigate('CategoryScreen', {slug:'multi-centre-holidays'})}  />
                    {safari?(
                    <View >
                        <View style={{flexDirection:'row', justifyContent:"space-between", marginBottom:10}}>
                            <Text style={mainStyles.heading}>Safari Packages</Text>
                            <TouchableOpacity onPress={()=>navigation.navigate('CategoryScreen', {slug:'safari'})}>
                                <Text style={mainStyles.link}>See all</Text>
                            </TouchableOpacity>
                        </View>
                        <FastImage 
                        style={{height:150, width:"100%", borderRadius:10}}
                            source={{uri: safari?.sliders[0]?.large}}
                            resizeMode={FastImage.resizeMode.stretch}
                        />
                    </View>
                    ):''}
                    <PagePackagesList loading={pageLoading} title="Cruise Packages" page={cruise} packages={cruise?.products.slice(0,10)} seeAllLinkPress={()=> navigation.navigate('CategoryScreen', {slug:'cruise'})}  />
                </ScrollView>
               
            </SafeAreaView>
             <FooterTabs />
        </>
    );
}
const styles = StyleSheet.create({

});

export default HomeScreen;