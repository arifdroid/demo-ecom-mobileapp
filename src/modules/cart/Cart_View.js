import React, { useState, useEffect, useContext } from 'react';

import { SafeAreaView, Text, TouchableOpacity, Image, FlatList, View, StyleSheet } from 'react-native';
import CardView from 'react-native-cardview';
import LinearGradient from 'react-native-linear-gradient';
import { UserData_Context } from '../../context-provider/UserContext';
import { URL, URL_DEV_2, URL_google_bucket } from "@env"
import Axios from 'axios';
import { Alert } from 'react-native';
import CheckBox from 'react-native-check-box';
import { ScrollView, TextInput } from 'react-native-gesture-handler';



const image_nike = require('../../common/asset/sample-product/shoes_nike.jpg')
const image_ramyeon = require('../../common/asset/sample-product/ramyeon.png')
const image_delete = require('../../common/asset/sample-product/delete.png')



const sample_data = [
    { product_name: 'Nike Shoes', product_description: 'jordan air benchmark', product_color: 'Green', product_price: 129.10, product_tag: 'men shoes', product_category: 'shoes', image: image_nike, quantity: 1 },
    { product_name: 'Maggi Ramyeon', product_description: 'korean noodles', product_color: 'Red', product_price: 19.40, product_tag: 'noodle', product_category: 'food', image: image_ramyeon, quantity: 3 },

]

const Cart_View = () => {

    const [refToken_context, setRefToken_context, currentUser, setCurrentUser, currentTenant, setCurrentTenant, cartData, setCartData] = useContext(UserData_Context)

    const [toggleLocationDelivery_1, setToggleLocationDelivery_1] = useState(false)
    const [toggleLocationDelivery_2, setToggleLocationDelivery_2] = useState(false)
    const [toggleLocationDelivery_3, setToggleLocationDelivery_3] = useState(false)

    const [locationCustom, setLocationCustom] = useState('')
    const [codeTimeCustom, setCodeTimeCustom] = useState('')

    const [toggleCODTime_1, setToggleCODTime_1] = useState(false)
    const [toggleCODTime_2, setToggleCODTime_2] = useState(false)

    const [total_price, setTotal_price] = useState(0)



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

    useEffect(() => {

        if (cartData) {

            let total_price_this = 0;

            cartData.forEach(el => {

                total_price_this = parseFloat(el.product_price) * parseInt(el.quantity) + total_price_this

            })

            setTotal_price(total_price_this)
        }

    }, [cartData])

    // console.log('\n\n cart order', cartData)

    useEffect(() => {

        if (toggleLocationDelivery_1) {
            setToggleLocationDelivery_2(false)
            setToggleLocationDelivery_3(false)
        }


    }, [toggleLocationDelivery_1])

    useEffect(() => {


        if (toggleLocationDelivery_2) {
            setToggleLocationDelivery_1(false)
            setToggleLocationDelivery_3(false)
        }


    }, [toggleLocationDelivery_2])

    useEffect(() => {

        if (toggleLocationDelivery_3) {
            setToggleLocationDelivery_1(false)
            setToggleLocationDelivery_2(false)
        }

    }, [toggleLocationDelivery_3])

    useEffect(() => {

        if (toggleCODTime_1) {
            setToggleCODTime_2(false)

        }

    }, [toggleCODTime_1])

    useEffect(() => {

        if (toggleCODTime_2) {
            setToggleCODTime_1(false)

        }

    }, [toggleCODTime_2])

    const __pressOrder = async () => {


        let cart_now = cartData;

        let cart_array_to_order = cart_now.map(el => {
            return {
                productId: el.id,
                quantity_ordered: parseInt(el.quantity),
                total_price: parseFloat(el.product_price) * parseInt(el.quantity)
            }
        })

        let cod_location_this = ''

        let cod_time_this = ''
        
        if(toggleLocationDelivery_1) cod_location_this = 'Infront of hostel Delime'
        else if(toggleLocationDelivery_2) cod_location_this = 'Infront of hostel Zamrud'
        else if(toggleLocationDelivery_3) cod_location_this = 'At the cafe'
        else if(locationCustom!='')cod_location_this = locationCustom

        if(toggleCODTime_1) cod_time_this = 'This tuesday 5pm'
        else if(toggleCODTime_2) cod_time_this = 'This friday 5pm'        
        else if(codeTimeCustom!='')cod_time_this = codeTimeCustom

        let config = {
            headers: {
                'Authorization': `Bearer ${refToken_context}`
            }
        }

        let data = {
            "order_array": cart_array_to_order,
            "cod_location":cod_location_this,
            'cod_time':cod_time_this
        }

        console.log('cart_array_to_order data', data)

        try {

            let resp_create_order = await Axios.post(`${URL}/api/tenant/${currentTenant}/orders`, { data }, config);

            if (resp_create_order) {
                Alert.alert('order success')
                setCartData(null)
                setTotal_price(0)
                setToggleCODTime_1(false)
                setToggleCODTime_2(false)
                setToggleLocationDelivery_1(false)
                setToggleLocationDelivery_2(false)
                setToggleLocationDelivery_3(false)
            }

        } catch (error) {
            Alert.alert('order fail')
        }


    }

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <ScrollView>
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
                                            <Text style={{ fontSize: 13, color: 'gray', marginLeft: 8, marginTop: 4 }}>
                                                {parseFloat(item.product_price) * parseInt(item.quantity)}

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

                <Text style={{ marginLeft: 20, fontSize: 16, marginTop: 35, marginBottom: 15 }}>Select Preferred COD Location</Text>

                <CheckBox
                    style={{ width: 230, marginLeft: 20, marginTop: 5, marginBottom: 10 }}
                    onClick={() => {
                        setToggleLocationDelivery_1(!toggleLocationDelivery_1)
                    }}
                    uncheckedCheckBoxColor={'gray'}
                    checkedCheckBoxColor={'red'}
                    isChecked={toggleLocationDelivery_1}
                    rightText={"Infront of hostel delima"}
                />
                <CheckBox
                    style={{ width: 230, marginLeft: 20, marginTop: 5, marginBottom: 10 }}
                    onClick={() => {
                        setToggleLocationDelivery_2(!toggleLocationDelivery_2)
                    }}
                    uncheckedCheckBoxColor={'gray'}
                    checkedCheckBoxColor={'red'}
                    isChecked={toggleLocationDelivery_2}
                    rightText={"Infront of hostel zamrud"}
                />
                <CheckBox
                    style={{ width: 230, marginLeft: 20, marginTop: 5, marginBottom: 10 }}
                    onClick={() => {
                        setToggleLocationDelivery_3(!toggleLocationDelivery_3)
                    }}
                    uncheckedCheckBoxColor={'gray'}
                    checkedCheckBoxColor={'red'}
                    isChecked={toggleLocationDelivery_3}
                    rightText={"At the cafe"}
                />

                <View style={{ flex: 4, width: '80%', marginLeft: 20, marginBottom: 30 }}>
                    <TextInput style={{ width: '100%', color: 'black' }} placeholder={'cod location'} onChangeText={el => setLocationCustom(el)}></TextInput>
                    <View style={{ borderWidth: 0.4, borderColor: 'gray', width: '98%', marginTop: 10 }}></View>
                </View>

                <Text style={{ marginLeft: 20, fontSize: 16, marginTop: 15, marginBottom: 15 }}>Select Preferred COD Time</Text>

                <CheckBox
                    style={{ width: 230, marginLeft: 20, marginTop: 5, marginBottom: 10 }}
                    onClick={() => {
                        setToggleCODTime_1(!toggleCODTime_1)
                    }}
                    uncheckedCheckBoxColor={'gray'}
                    checkedCheckBoxColor={'red'}
                    isChecked={toggleCODTime_1}
                    rightText={"This tuesday 5pm"}
                />
                <CheckBox
                    style={{ width: 230, marginLeft: 20, marginTop: 5, marginBottom: 10 }}
                    onClick={() => {
                        setToggleCODTime_2(!toggleCODTime_2)
                    }}
                    uncheckedCheckBoxColor={'gray'}
                    checkedCheckBoxColor={'red'}
                    isChecked={toggleCODTime_2}
                    rightText={"This friday 5pm"}
                />

                <View style={{ flex: 4, width: '80%', marginLeft: 20, marginBottom: 40 }}>
                    <TextInput style={{ width: '100%', color: 'black' }} placeholder={'cod time and date'} onChangeText={el => setCodeTimeCustom(el)}></TextInput>
                    <View style={{ borderWidth: 0.4, borderColor: 'gray', width: '98%', marginTop: 10 }}></View>
                </View>

                <Text style={{ marginLeft: 20, fontSize: 22, marginTop: 15, marginBottom: 15 }}>Total Price : {total_price}</Text>

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
            </ScrollView>
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