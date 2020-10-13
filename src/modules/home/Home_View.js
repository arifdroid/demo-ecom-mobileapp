import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, Vibration, ScrollView, Image, FlatList, StyleSheet, View, Dimensions } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import Carousel from 'react-native-banner-carousel';
import CardView from 'react-native-cardview'


const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 120;
const image_2 = require('../../common/asset/home/banner.png');
const image_1 = require('../../common/asset/home/LazBanner.png')

const image_nike = require('../../common/asset/sample-product/shoes_nike.jpg')
const image_ramyeon = require('../../common/asset/sample-product/ramyeon.png')
const image_lotion = require('../../common/asset/sample-product/Hydrating_Lotion.png')
const image_kerepek_durian = require('../../common/asset/sample-product/kerepek_durian.png')

const images = [
    image_1,
    image_2

];

const sample_data = [
    { product_name: 'Nike Shoes', product_description: 'jordan air benchmark', product_color: 'Green', product_price: 129.10, product_tag: 'men shoes', product_category: 'shoes', image: image_nike },
    { product_name: 'Maggi Ramyeon', product_description: 'korean noodles', product_color: 'Red', product_price: 19.40, product_tag: 'noodle', product_category: 'food', image: image_ramyeon },
    { product_name: 'Hada Labo Hydrating Lotion', product_description: 'hydrating lotion night and day', product_color: null, product_price: 22.00, product_tag: 'lotion', product_category: 'beauty', image: image_lotion },
    { product_name: 'Durian Crepe Krupp', product_description: 'kerepek halal made in malaysia', product_color: 'Yellow', product_price: 5.50, product_tag: 'snacks', product_category: 'food', image: image_kerepek_durian },
]

const renderPage = (image, index) => {
    return (
        <View key={index} style={{ flex: 1 }}>
            <Image style={{ width: BannerWidth - 10, height: BannerHeight, alignSelf: 'center' }} source={image} />
        </View>
    )
}

const Home_View = () => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <LinearGradient colors={['#F4013D', '#F3013D', '#FD3B68']} style={styles.linearGradient}>
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
                    style={{ margin: 10, height: 220 }}
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={5}>
                    <Text style={{ margin: 10, fontSize: 16, color: '#707070' }}>
                        KATEGORI
                         </Text>
                    <>

                        {/* <Categories></Categories> */}


                    </>
                </CardView>

                <CardView
                    style={{ margin: 10, height: 200, backgroundColor: '#FFF0E8' }}
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={5}>
                    <Text style={{ margin: 10, fontSize: 16, color: '#46214C', fontWeight: 'bold' }}>
                        JUALAN HANGAT
                         </Text>
                    <>

                        {/* <HotSale></HotSale> */}


                    </>
                </CardView>

                <FlatList

                    data={sample_data}
                    numColumns={2}
                    renderItem={({ item, index }) => {
                        return (

                            <View style={{
                                // flexDirection:'row', 
                                justifyContent: 'center',
                                alignSelf: 'center',
                                flex: 1,
                                height: 295
                            }}>
                                <CardView
                                    style={{ margin: 15, backgroundColor: 'white', flex: 1 }}
                                    cardElevation={2}
                                    cardMaxElevation={2}
                                    cornerRadius={30}
                                >
                                    <View style={{ justifyContent: 'center', margin: 10, marginTop: 25, flex: 1,  }}>
                                        <Image source={item.image} resizeMode='contain' style={{ width: 110, backgroundColor: 'yellow', alignSelf: 'center', height: 110 }}></Image>
                                        <Text style={{ marginTop: 10, marginLeft: 8, fontSize: 15, color: 'black', fontWeight: '500', }}>
                                            {item.product_name}
                                        </Text>
                                        <Text style={{ fontSize: 13, color: 'gray', marginLeft: 8, marginTop: 4 }}>
                                            {item.product_description}
                                        </Text>

                                        <View style={{ flexDirection: 'row', flex: 1, }}>
                                            <TouchableOpacity style={{ flex: 1, alignSelf: 'flex-end', marginLeft: 20 }}>
                                                <LinearGradient colors={['#FEC140','#FC966F' ,'#FA709A']} style={styles.linearGradient_button}>
                                                    <Text style={{alignSelf:'center', fontSize:18, color:'white'}}>+</Text>
                                                </LinearGradient>

                                            </TouchableOpacity>
                                            <Text style={{ flex: 1.5, alignSelf: 'flex-end', marginBottom: 5 }}>RM {item.product_price}</Text>
                                        </View>
                                    </View>

                                </CardView>


                            </View>

                        )
                    }}>


                </FlatList>











            </ScrollView>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        height: 190,
        paddingLeft: 5,
        paddingRight: 5,
        // alignSelf:'flex-end'
        // borderRadius: 5
    },
    linearGradient_button: {
        height: 40,
        width: 35,
        justifyContent:'center',
        top:10,
        // alignSelf:'flex-end',

        // paddingLeft: 5,
        // paddingRight: 5,
        // borderRadius: 15,
        borderTopEndRadius:15,
        borderTopStartRadius:15
        
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