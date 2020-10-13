import React, { useState, useEffect } from 'react';

import { SafeAreaView, Text, TouchableOpacity, Image, FlatList, View, StyleSheet } from 'react-native';
import CardView from 'react-native-cardview';
import LinearGradient from 'react-native-linear-gradient';



const image_nike = require('../../common/asset/sample-product/shoes_nike.jpg')
const image_ramyeon = require('../../common/asset/sample-product/ramyeon.png')
const image_delete = require('../../common/asset/sample-product/delete.png')



const sample_data = [
    { product_name: 'Nike Shoes', product_description: 'jordan air benchmark', product_color: 'Green', product_price: 129.10, product_tag: 'men shoes', product_category: 'shoes', image: image_nike, quantity:1 },
    { product_name: 'Maggi Ramyeon', product_description: 'korean noodles', product_color: 'Red', product_price: 19.40, product_tag: 'noodle', product_category: 'food', image: image_ramyeon , quantity:3},

]

const Cart_View = () => {

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <Text style={{ marginLeft: 20, fontSize: 30, marginTop: 25, }}>My Cart</Text>

            <FlatList

                data={sample_data}

                renderItem={({ item, index }) => {
                    return (

                        <View style={{
                            // flexDirection:'row', 
                            justifyContent: 'center',
                            alignSelf: 'center',
                            flex: 1,
                            width:'98%'
                            // height: 295
                        }}>
                            <CardView
                                style={{ marginVertical: 7, backgroundColor: 'white', flex: 1, marginHorizontal:10 }}
                                cardElevation={2}
                                cardMaxElevation={2}
                                cornerRadius={30}
                            >
                                <View
                                    style={{ justifyContent: 'center', margin: 10,
                                     marginTop: 25, flexDirection: 'row' ,flex:1}}

                                >
                                    <View style={{flex:1}}>
                                        <Image source={item.image} resizeMode='contain' style={{ width: 75, alignSelf: 'center', height: 75 }}></Image>
                                        {/* <Text style={{ marginTop: 10, marginLeft: 8, fontSize: 15, color: 'black', fontWeight: '500', }}>
                                            {item.product_name}
                                        </Text> */}
                                        {/* <Text style={{ fontSize: 13, color: 'gray', marginLeft: 8, marginTop: 4 }}>
                                            {item.product_description}
                                        </Text> */}
                                        <View style={{flexDirection:'row', flex:1, width:80, borderWidth:0.5, justifyContent:'center',margin:15, alignSelf: 'center', }}>
                                            <TouchableOpacity style={{flex:1, alignSelf:'center'}}><Text style={{alignSelf: 'center',}}>-</Text></TouchableOpacity>
                                    <View style={{flex:1,borderLeftWidth:0.5 ,borderRightWidth:0.5 }}><Text style={{alignSelf: 'center',}}>{item.quantity}</Text></View>
                                            <TouchableOpacity style={{flex:1, alignSelf: 'center',}}><Text style={{alignSelf: 'center',}}>+</Text></TouchableOpacity>
                                        </View>

                                    </View>
                                    <View style={{flex:2 }}>
                                        
                                        <Text style={{  marginLeft: 8, fontSize: 15, color: 'black', fontWeight: '500', }}>
                                            {item.product_name}
                                        </Text>
                                        <Text style={{ fontSize: 13, color: 'gray', marginLeft: 8, marginTop: 4 }}>
                                            {item.product_description}
                                        </Text>

                                    </View>
                                    <TouchableOpacity style={{flex:0.3 }}>
                                        <Image source={image_delete} resizeMode='contain' style={{ width: 15, alignSelf: 'center', height: 15 }}></Image>
                                       
                                    </TouchableOpacity>


                                </View>

                            </CardView>


                        </View>

                    )
                }}>


            </FlatList>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    linearGradient: {
        // height: 190,
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

export default Cart_View;