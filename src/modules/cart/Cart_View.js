import React, { useState, useEffect, useContext } from 'react';

import { SafeAreaView, Text, TouchableOpacity, Image, FlatList, View, StyleSheet } from 'react-native';
import CardView from 'react-native-cardview';
import LinearGradient from 'react-native-linear-gradient';
import { UserData_Context } from '../../context-provider/UserContext';
import { URL, URL_DEV_2, URL_google_bucket } from "@env"
import Axios from 'axios';
import { Alert } from 'react-native';



const image_nike = require('../../common/asset/sample-product/shoes_nike.jpg')
const image_ramyeon = require('../../common/asset/sample-product/ramyeon.png')
const image_delete = require('../../common/asset/sample-product/delete.png')



const sample_data = [
    { product_name: 'Nike Shoes', product_description: 'jordan air benchmark', product_color: 'Green', product_price: 129.10, product_tag: 'men shoes', product_category: 'shoes', image: image_nike, quantity: 1 },
    { product_name: 'Maggi Ramyeon', product_description: 'korean noodles', product_color: 'Red', product_price: 19.40, product_tag: 'noodle', product_category: 'food', image: image_ramyeon, quantity: 3 },

]

const Cart_View = () => {

    const [refToken_context, setRefToken_context, currentUser, setCurrentUser, currentTenant, setCurrentTenant, cartData, setCartData] = useContext(UserData_Context)

    const _removeThisItem = () => {
        setCartData(prevData => {

            let final_cart_data = [];

            // final_cart_data = prevData.map(el =>{
            //     if(el.id == item.id){
            //         // return {...el,quantity:el.quantity+1}
            //         // return null;
            //         return []
            //     }else{
            //         return el
            //     }
            // })

            // console.log('final cart data cart view', final_cart_data)

            return final_cart_data

        })
    }

    console.log('\n\n cart order', cartData)

    const __pressOrder = async() => {


        let cart_now = cartData;

        let cart_array_to_order = cart_now.map(el=>{
            return {
                productId:el.id,
                quantity_ordered:parseInt(el.quantity),
                total_price: parseFloat(el.product_price) * parseInt(el.quantity)
            }
        })

        let config = {
            headers: {
                'Authorization': `Bearer ${refToken_context}`
            }
        }

        let data = {
            "order_array": cart_array_to_order
        }

        console.log('cart_array_to_order data', data)

        try {

        let resp_create_order = await Axios.post(`${URL}/api/tenant/${currentTenant}/orders`, { data }, config);

        if(resp_create_order) {
            Alert.alert('order success')
            setCartData(null)
        }   
            
        } catch (error) {
            Alert.alert('order fail')
        }
        

    }

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <Text style={{ marginLeft: 20, fontSize: 30, marginTop: 25, }}>My Cart</Text>

            <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 30, marginHorizontal: 10, marginBottom: 20 }} onPress={() => _removeThisItem()}>
                <Image source={image_delete} resizeMode='contain' style={{ width: 15, alignSelf: 'center', height: 15 }}></Image>

            </TouchableOpacity>

            <FlatList

                data={cartData}

                renderItem={({ item, index }) => {
                    return (

                        <View style={{
                            // flexDirection:'row', 
                            justifyContent: 'center',
                            alignSelf: 'center',
                            flex: 1,
                            width: '98%'
                            // height: 295
                        }}>
                            <CardView
                                style={{ marginVertical: 7, backgroundColor: 'white', flex: 1, marginHorizontal: 10 }}
                                cardElevation={2}
                                cardMaxElevation={2}
                                cornerRadius={30}
                            >
                                <View
                                    style={{
                                        justifyContent: 'center', margin: 10,
                                        marginTop: 25, flexDirection: 'row', flex: 1
                                    }}

                                >
                                    <View style={{ flex: 1 }}>
                                        <Image source={{ uri: "data:image/png;base64," + item.image }} resizeMode='contain' style={{ width: 75, alignSelf: 'center', height: 75 }}></Image>
                                        {/* <Text style={{ marginTop: 10, marginLeft: 8, fontSize: 15, color: 'black', fontWeight: '500', }}>
                                            {item.product_name}
                                        </Text> */}
                                        {/* <Text style={{ fontSize: 13, color: 'gray', marginLeft: 8, marginTop: 4 }}>
                                            {item.product_description}
                                        </Text> */}
                                        <View style={{ flexDirection: 'row', flex: 1, width: 80, borderWidth: 0.5, justifyContent: 'center', margin: 15, alignSelf: 'center', }}>
                                            <TouchableOpacity style={{ flex: 1, alignSelf: 'center' }}><Text style={{ alignSelf: 'center', }}>-</Text></TouchableOpacity>
                                            <View style={{ flex: 1, borderLeftWidth: 0.5, borderRightWidth: 0.5 }}><Text style={{ alignSelf: 'center', }}>{item.quantity}</Text></View>
                                            <TouchableOpacity style={{ flex: 1, alignSelf: 'center', }}><Text style={{ alignSelf: 'center', }}>+</Text></TouchableOpacity>
                                        </View>

                                    </View>
                                    <View style={{ flex: 2 }}>

                                        <Text style={{ marginLeft: 8, fontSize: 15, color: 'black', fontWeight: '500', }}>
                                            {item.product_name}
                                        </Text>
                                        <Text style={{ fontSize: 13, color: 'gray', marginLeft: 8, marginTop: 4 }}>
                                            {item.product_description}
                                        </Text>

                                    </View>
                                    {/* <TouchableOpacity style={{flex:0.3 }} onPress={()=>_removeThisItem(item)}>
                                        <Image source={image_delete} resizeMode='contain' style={{ width: 15, alignSelf: 'center', height: 15 }}></Image>
                                       
                                    </TouchableOpacity> */}


                                </View>

                            </CardView>


                        </View>

                    )
                }}>


            </FlatList>

            {/* <View style={{width:'80%', alignSelf:'center', marginHorizontal:20, marginBottom:20, borderRadius:20}}> */}
            <LinearGradient colors={['#FEC140', '#FC986E', '#FA709A']} style={styles.linearGradient_2}
                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
            // locations={[0,0.4,0.85]}
            // locations={[0.2,0.5,0.85]}
            >
                <TouchableOpacity style={{ height: 50, width: 200, alignSelf: 'center', justifyContent: 'center', borderRadius: 20 }} onPress={__pressOrder}>

                    <Text style={{ alignSelf: 'center', color: 'white' }}>Order Now</Text>

                </TouchableOpacity>
            </LinearGradient>
            {/* </View> */}

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
    linearGradient_2: {
        // height: 190,
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 20,
        width: '80%',
        borderRadius: 20,
        alignSelf: 'center'
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