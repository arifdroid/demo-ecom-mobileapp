import React,{ useState,useEffect, useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { URL, URL_DEV_2 } from "@env"
import { UserData_Context } from '../../context-provider/UserContext';
import Axios from 'axios';
import { Alert } from 'react-native';




const Product_View = ({navigation, route})=>{

    const [refToken_context, setRefToken_context, currentUser, setCurrentUser, currentTenant, setCurrentTenant, cartData, setCartData, orderData, setOrderData] = useContext(UserData_Context)


    console.log('check')
    

    useEffect(()=>{

        // const {order_id}= route.params
        
        if (route.params) {

            console.log('pressed id', order_id)
            let { order_id } = route.params

            _load_order_details(order_id)
            
        }
    },[])

    const _load_order_details = async(order_id) => {

        console.log('load order details')
        try {
            console.log('load order details 22')
            let config = {
                headers: {
                    'Authorization': `Bearer ${refToken_context}`,

                },

            }

            let resp = await Axios.get(`${URL}/api/tenant/${currentTenant}/orders/${order_id}`, config);

            console.log('resp data order DETAIL is ->', resp.data)
            

        } catch (error) {
            Alert.alert('server error load order list')
        }


    }

    return(
        <SafeAreaView style={{flex:1, justifyContent:'center'}}>
           


            <Text>Product_View</Text>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    linearGradient: {
        height: '100%',
        justifyContent: 'center',
        // flex:1,
        paddingLeft: 5,
        paddingRight: 5,
        // alignSelf:'flex-end'
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

export default Product_View;