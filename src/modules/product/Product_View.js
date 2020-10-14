import React,{ useState,useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';



const Product_View = ()=>{


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