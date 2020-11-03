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



const OrderDetails_View = ({ navigation,route }) => {
    
    const [refToken_context, setRefToken_context, currentUser, setCurrentUser, currentTenant, setCurrentTenant, cartData, setCartData, orderData, setOrderData] = useContext(UserData_Context);

    const [productList, setProductList]=useState(null)
    const [orderDetails, setOrderDetails]=useState(null)

    useEffect(()=>{

        // const {order_id}= route.params
        
        if (route.params) {

            console.log('pressed id', order_id)
            let { order_id } = route.params

            _load_order_details(order_id)
            
        }
    },[])

    const _load_order_details = async(order_id) => {

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

    const _load_Product_Details = async(orderarray) => {

        console.log('load order details')
        try {
            // console.log('load order details 22')
            let config = {
                headers: {
                    'Authorization': `Bearer ${refToken_context}`,

                },

            }

            let productData = [];

            for(var j =0; j<orderarray.length;j++){

                let resp_product = await Axios.get(`${URL}/api/tenant/${currentTenant}/products/${orderarray[j].productId}`, config);

                // console.log('\n\nproduct details', resp_product.data)

                productData.push(resp_product.data)

                if(productData.length == orderarray.length){
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
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>


            <Text>Order Details View</Text>

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