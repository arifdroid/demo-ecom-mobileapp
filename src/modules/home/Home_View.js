import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, Text, TouchableOpacity, Vibration, ScrollView, Image, FlatList, StyleSheet, View, Dimensions } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import Carousel from 'react-native-banner-carousel';
import CardView from 'react-native-cardview'
import { UserData_Context } from '../../context-provider/UserContext';
import Axios from 'axios';
import { URL, URL_DEV_2 } from "@env"
global.Buffer = global.Buffer || require('buffer').Buffer


const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 120;
const image_2 = require('../../common/asset/home/banner.png');
const image_1 = require('../../common/asset/home/LazBanner.png')

const image_nike = require('../../common/asset/sample-product/shoes_nike.jpg')
const image_ramyeon = require('../../common/asset/sample-product/ramyeon.png')
const image_lotion = require('../../common/asset/sample-product/Hydrating_Lotion.png')
const image_kerepek_durian = require('../../common/asset/sample-product/kerepek_durian.png')
const image_nike_2 = require('../../common/asset/sample-product/shoes_nike_2.jpg')

const images = [
    image_1,
    image_2

];

const sample_data = [
    { product_name: 'Nike Shoes', product_description: 'jordan air benchmark', product_color: 'Green', product_price: 129.10, product_tag: 'men shoes', product_category: 'shoes', image: image_nike },
    { product_name: 'Maggi Ramyeon', product_description: 'korean noodles', product_color: 'Red', product_price: 19.40, product_tag: 'noodle', product_category: 'food', image: image_ramyeon },
    { product_name: 'Hada Labo Hydrating Lotion', product_description: 'hydrating lotion night and day', product_color: null, product_price: 22.00, product_tag: 'lotion', product_category: 'beauty', image: image_lotion },
    { product_name: 'Durian Crepe Krupp', product_description: 'kerepek halal made in malaysia', product_color: 'Yellow', product_price: 5.50, product_tag: 'snacks', product_category: 'food', image: image_kerepek_durian },
    { product_name: 'Maggi Ramyeon', product_description: 'korean noodles', product_color: 'Red', product_price: 19.40, product_tag: 'noodle', product_category: 'food', image: image_ramyeon },
    { product_name: 'Durian Crepe Krupp', product_description: 'kerepek halal made in malaysia', product_color: 'Yellow', product_price: 5.50, product_tag: 'snacks', product_category: 'food', image: image_kerepek_durian },
    { product_name: 'Nike Shoes Special Edition', product_description: 'jordan air benchmark', product_color: 'White', product_price: 229.10, product_tag: 'men shoes', product_category: 'shoes', image: image_nike_2 },
    { product_name: 'Hada Labo Hydrating Lotion', product_description: 'hydrating lotion night and day', product_color: null, product_price: 22.00, product_tag: 'lotion', product_category: 'beauty', image: image_lotion },
]


const renderPage = (image, index) => {
    return (
        <View key={index} style={{ flex: 1 }}>
            <Image style={{ width: BannerWidth - 10, height: BannerHeight, alignSelf: 'center' }} source={image} />
        </View>
    )
}



const Home_View = ({ navigation, route }) => {

    const [refToken_context, setRefToken_context, currentUser, setCurrentUser, currentTenant, setCurrentTenant] = useContext(UserData_Context)

    const [data_downloaded, setData_downloaded] = useState(null);

    console.log('\n\n====\n')
    console.log('data downloaded', data_downloaded)
    console.log('\n====\n\n')

    useEffect(() => {

        __loadProduct_list();

    }, [])

    const __clickProduct = () => {
        navigation.navigate('ProductModules')
    }

    const __loadProduct_list = async () => {

        try {
            let config = {
                headers: {
                    'Authorization': `Bearer ${refToken_context}`,

                },
                // responseType: 'arraybuffer'
            }

            let resp = await Axios.get(`${URL_DEV_2}/api/tenant/${currentTenant}/products`, config);

            let data_product = resp.data.rows
            console.log('resp product is', data_product)

            let data_image_with_image = [];

            let config_2 = {
                headers: {
                    'Authorization': `Bearer ${refToken_context}`,

                },
                responseType: 'arraybuffer'
            }

            data_product.forEach(async (el) => {

                console.log('image url is', el.images[0].downloadUrl)

                await Axios.get(`${el.images[0].downloadUrl}`, config_2)
                    .then((image) => {

                        // console.log('\nimage downloaded->', image, '\n\n')
                        // console.log('\nimage downloaded->', Buffer.from(image.data,'binary').toString('base64'), '\n\n')

                        let data_image = Buffer.from(image.data, 'binary').toString('base64')
                        // let data_image =  `data:image/png;base64,${Buffer.from(image.data, 'binary').toString('base64')}`

                        data_image_with_image.push({ product_name: el.name, product_description: el.description, product_color: el.color, product_price: el.price, product_category: el.categories, image: data_image })
                    }).catch(e => {
                        console.log('download image error', e)
                    })


            })

            if (data_image_with_image.length == data_product.length) {
                setData_downloaded(data_image_with_image)
            }

            console.log('\n\n=====\n')
            console.log('data with image is ->', data_image_with_image)
            console.log('\n=====\n\n')

        } catch (error) {
            console.log('error apa', error)
            Alert.alert('error server')
        }

    }

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


                </LinearGradient>

               

                <FlatList

                    data={data_downloaded ? data_downloaded : sample_data}
                    numColumns={2}
                    renderItem={({ item, index }) => {

                        console.log('item image is', "data:image/png;base64," + item.image)
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
                                    <TouchableOpacity style={{ justifyContent: 'center', margin: 10, marginTop: 25, flex: 1, }}
                                        onPress={__clickProduct}
                                    >
                                        {/* {data_downloaded ? */}
                                        <Image source={{ uri: "data:image/png;base64," + item.image }} resizeMode='contain' style={{ width: 110, alignSelf: 'center', height: 110 }}></Image>
                                        {/* :
                                            <Image source={item.image} resizeMode='contain' style={{ width: 110, alignSelf: 'center', height: 110 }}></Image> 
                                            
                                        } */}


                                        <Text style={{ marginTop: 20, marginLeft: 8, fontSize: 15, color: 'black', fontWeight: '500', }}>
                                            {item.product_name}
                                        </Text>
                                        <Text style={{ fontSize: 13, color: 'gray', marginLeft: 8, marginTop: 8 }}>
                                            {item.product_description}
                                        </Text>

                                        <View style={{ flexDirection: 'row', flex: 1, }}>
                                            <TouchableOpacity style={{ flex: 1, alignSelf: 'flex-end', marginLeft: 20 }}>
                                                <LinearGradient colors={['#FEC140', '#FC966F', '#FA709A']} style={styles.linearGradient_button}>
                                                    <Text style={{ alignSelf: 'center', fontSize: 18, color: 'white' }}>+</Text>
                                                </LinearGradient>

                                            </TouchableOpacity>
                                            <Text style={{ flex: 1.5, alignSelf: 'flex-end', marginBottom: 5 }}>RM {item.product_price}</Text>
                                        </View>
                                    </TouchableOpacity>

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
        justifyContent: 'center',
        top: 10,
        // alignSelf:'flex-end',

        // paddingLeft: 5,
        // paddingRight: 5,
        // borderRadius: 15,
        borderTopEndRadius: 15,
        borderTopStartRadius: 15

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