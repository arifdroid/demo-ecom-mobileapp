import React,{ useState,useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, Vibration, ScrollView, Image, FlatList,StyleSheet,View, Dimensions } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import Carousel from 'react-native-banner-carousel';
import CardView from 'react-native-cardview'


const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 120;
const image_2 = require('../../common/asset/home/banner.png');
const image_1 = require('../../common/asset/home/LazBanner.png')

const images = [
    image_1,
    image_2

];

const renderPage = (image, index) => {
    return (
        <View key={index} style={{ flex: 1 }}>
            <Image style={{ width: BannerWidth - 10, height: BannerHeight, alignSelf: 'center' }} source={image} />
        </View>
    )
}

const Home_View = ()=>{

    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView>
                <LinearGradient colors={['#F4013D','#F3013D', '#FD3B68']} style={styles.linearGradient}>
                    <TouchableOpacity style={{ marginVertical: 10, backgroundColor: 'white', padding: 10, flexDirection: 'row' }}>
                        <Image source={require('../../common/asset/searchblack_2.png')} resizeMode='contain' style={{ height: 20 }}></Image>
                        <Text style={{ opacity: 0.6 }}> Promo 9.9   19% Discount !!~ </Text>
                    </TouchableOpacity>

                    <View style={{ alignSelf: 'center', marginTop: 0, height: 120 }}>
                        <Carousel
                            autoplay
                            autoplayTimeout={5000}
                            loop
                            index={0}
                            pageSize={BannerWidth}


                        >
                            {images.map((image, index) => renderPage(image, index))}
                        </Carousel>
                    </View>

                    {/* <View style={{ alignSelf: 'center', margin: 20, flexDirection: 'row' }}>
                        <Image source={require('../../../common/asset/home/popular.png')} resizeMode='contain' style={{ height: 17 }}></Image>
                        <Text style={{ color: 'white', fontSize: 18 }}>Produk Sedang Trending</Text>
                    </View> */}


                    {/* <FlatList
                        horizontal
                        style={{ alignSelf: 'center', maxHeight: 40 }}
                        data={hashtag}
                        renderItem={({ item }) => {
                            return (<TrendingData data={item} ></TrendingData>)
                        }}
                    ></FlatList> */}
                    {/* <FlatList
                        horizontal
                        style={{ alignSelf: 'center', maxHeight: 40 }}
                        data={hashtag_2}
                        renderItem={({ item }) => {
                            return (<TrendingData data={item} ></TrendingData>)
                        }}
                    ></FlatList> */}

                    {/* <TrendingView></TrendingView> */}








                </LinearGradient>

                        
                    <CardView
                        style={{margin:10, height:220}}
                        cardElevation={2}
                        cardMaxElevation={2}
                        cornerRadius={5}>
                        <Text style={{margin:10, fontSize:16, color:'#707070'}}>
                            KATEGORI
                         </Text>
                         <>
                         
                         {/* <Categories></Categories> */}

                         
                         </>
                    </CardView>

                    <CardView
                        style={{margin:10, height:200, backgroundColor:'#FFF0E8'}}
                        cardElevation={2}
                        cardMaxElevation={2}
                        cornerRadius={5}>
                        <Text style={{margin:10, fontSize:16, color:'#46214C', fontWeight:'bold'}}>
                        JUALAN HANGAT
                         </Text>
                         <>
                         
                         {/* <HotSale></HotSale> */}

                         
                         </>
                    </CardView>
                







            </ScrollView>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        height: 190,
        paddingLeft: 5,
        paddingRight: 5,
        // borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
})

export default Home_View;