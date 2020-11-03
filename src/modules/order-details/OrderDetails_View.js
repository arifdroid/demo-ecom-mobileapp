import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView, StyleSheet, Text, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { URL, URL_DEV_2 } from "@env"
import { UserData_Context } from '../../context-provider/UserContext';
import Axios from 'axios';
import { Alert } from 'react-native';
import { FlatList } from 'react-native';
import CardView from 'react-native-cardview';



const OrderDetails_View = ({ navigation, route }) => {

    const [refToken_context, setRefToken_context, currentUser, setCurrentUser, currentTenant, setCurrentTenant, cartData, setCartData, orderData, setOrderData] = useContext(UserData_Context);

    const [productList, setProductList] = useState(null)
    const [orderDetails, setOrderDetails] = useState(null)

    useEffect(() => {

        // const {order_id}= route.params

        if (route.params) {

            console.log('pressed id', order_id)
            let { order_id } = route.params

            _load_order_details(order_id)

        }
    }, [])

    const _load_order_details = async (order_id) => {

        // console.log('load order details')
        try {
            // console.log('load order details 22')
            let config = {
                headers: {
                    'Authorization': `Bearer ${refToken_context}`,

                },

            }

            let resp = await Axios.get(`${URL}/api/tenant/${currentTenant}/orders/${order_id}`, config);

            // console.log('resp data order DETAIL is ->', resp.data)
            setOrderDetails(resp.data);

            await _load_Product_Details(resp.data.productId);


        } catch (error) {
            Alert.alert('server error load order list')
        }


    }

    const _load_Product_Details = async (orderarray) => {

        console.log('load order details')
        try {
            // console.log('load order details 22')
            let config = {
                headers: {
                    'Authorization': `Bearer ${refToken_context}`,

                },

            }

            let productData = [];

            for (var j = 0; j < orderarray.length; j++) {

                let resp_product = await Axios.get(`${URL}/api/tenant/${currentTenant}/products/${orderarray[j].productId}`, config);

                // console.log('\n\nproduct details', resp_product.data)

                productData.push(resp_product.data)

                if (productData.length == orderarray.length) {
                    setProductList(productData)
                }
            }



        } catch (error) {
            Alert.alert('server error load order list')
        }


    }

    console.log('order details', orderDetails)
    console.log('\n\n=====\n\nproduct details', productList)



    return (
        <SafeAreaView style={{ flex: 1, justifyContent:'center' }}>

            <CardView
                style={{ marginVertical: 7, backgroundColor: 'white', marginHorizontal: 10 , paddingBottom: 50,}}
                cardElevation={2}
                cardMaxElevation={2}
                cornerRadius={10}
            >


                <Text style={{ color: 'black', fontWeight: '500', fontSize: 30, marginVertical: 20, marginHorizontal: 13 }}>Orders</Text>

                {orderDetails ? (

                    <>
                        <Text style={{ color: 'black', fontWeight: '500', fontSize: 16, marginVertical: 5, marginHorizontal: 13 }}>Order ID: {orderDetails.id}</Text>
                        <Text style={{ color: 'gray', fontSize: 14, marginVertical: 5, marginHorizontal: 12 }}>{`User : ${orderDetails.userId.fullName}`}</Text>
                        <Text style={{ color: 'gray', fontSize: 14, marginVertical: 5, marginHorizontal: 12 }}>{`Phone : ${orderDetails.userId.phoneNumber}`}</Text>

                        <FlatList

                            data={productList}

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
                                            cornerRadius={10}
                                        >

                                            <View style={[{
                                                width: '93.5%',
                                                height: 1,
                                                borderWidth: 0.6,
                                                backgroundColor: 'grey',
                                                opacity: 0.1,
                                                marginBottom: 5,
                                                alignSelf: 'center'
                                            }]}>

                                            </View>
                                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                                <View style={{ flex: 1 }}>
                                                    <Text style={{ color: 'black', fontWeight: '500', fontSize: 14, marginVertical: 5, marginHorizontal: 13 }}>{`item name : ${item.name}`}</Text>
                                                    <Text style={{ color: 'gray', fontSize: 12, marginVertical: 5, marginHorizontal: 12 }}>{`item quantity : ${orderDetails.productId[index].quantity_ordered}`}</Text>
                                                    <Text style={{ color: 'gray', fontSize: 12, marginVertical: 5, marginHorizontal: 12 }}>{`item total price : ${orderDetails.productId[index].total_price}`}</Text>
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    <View style={{ alignSelf: 'flex-end' }}>
                                                        <Text style={{ color: '#F4013D', fontWeight: '500', fontSize: 14, marginVertical: 5, marginHorizontal: 13 }}>COD now</Text>
                                                    </View>
                                                    <View style={{ alignSelf: 'flex-end' }}>
                                                        <Text style={{ color: 'gray', fontSize: 12, marginVertical: 5, marginHorizontal: 12 }}>{orderData[0] ? `date : ${orderData[0].createdAt.substring(0, 10)}` : ''}</Text>
                                                    </View>
                                                </View>
                                            </View>

                                        </CardView>


                                    </View>

                                )
                            }}>


                        </FlatList>
                    </>

                ) : null}


            </CardView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    linearGradient: {
        // height: '100%',
        justifyContent: 'center',
        // flex:1,
        alignSelf: 'center',
        width: 200,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 30,
        marginTop: 7

    },


})

export default OrderDetails_View;