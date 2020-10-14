import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView, StyleSheet, Text,Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';



const Splashscreen_View = ({navigation}) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient colors={['#FEC140', '#FC986E', '#FA709A']} style={styles.linearGradient}>

                <TouchableOpacity onPress={()=>navigation.navigate('Login_View')}>
                <Image source={require('../../common/asset/user/logo_only.png')} resizeMode='contain' style={{ width: 110, alignSelf: 'center', height: 110 }}></Image>
                <Text style={{ alignSelf: 'center', color: 'white', fontWeight: '700', fontSize: 40, marginTop: 20 }}>K Maps</Text>
                </TouchableOpacity>
            </LinearGradient>
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
export default Splashscreen_View;