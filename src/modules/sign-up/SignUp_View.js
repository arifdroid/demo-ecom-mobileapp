import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView, StyleSheet, Text, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';



const SignUp_View = ({ navigation }) => {


    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>



            <View style={{ flexDirection: 'row', width: '85%', alignSelf: 'center', marginBottom: 20 }}>

                <Image source={require('../../common/asset/user_grey.png')} resizeMode='contain' style={{ width: 20, alignSelf: 'center', height: 20, flex: 0.5 }}></Image>
                <View style={{ flex: 4, }}>
                    <TextInput style={{ width: '100%', color: 'black' }} placeholder={'email'}></TextInput>
                    <View style={{ borderWidth: 0.4, borderColor: 'gray', width: '98%', marginTop: 10 }}></View>
                </View>

            </View>
            <View style={{ flexDirection: 'row', width: '85%', alignSelf: 'center', marginBottom: 20 }}>

                <Image source={require('../../common/asset/pwd_grey.png')} resizeMode='contain' style={{ width: 20, alignSelf: 'center', height: 20, flex: 0.5 }}></Image>
                <View style={{ flex: 4, }}>
                    <TextInput style={{ width: '100%', color: 'black' }} placeholder={'username'} value={'password'}></TextInput>
                    <View style={{ borderWidth: 0.4, borderColor: 'gray', width: '98%', marginTop: 10 }}></View>
                </View>

            </View>

            <View style={{ flexDirection: 'row', width: '85%', alignSelf: 'center', marginBottom: 20 }}>

                <Image source={require('../../common/asset/pwd_grey.png')} resizeMode='contain' style={{ width: 20, alignSelf: 'center', height: 20, flex: 0.5 }}></Image>
                <View style={{ flex: 4, }}>
                    <TextInput style={{ width: '100%', color: 'black' }} placeholder={'address'} ></TextInput>
                    <View style={{ borderWidth: 0.4, borderColor: 'gray', width: '98%', marginTop: 10 }}></View>
                </View>

            </View>
            <View style={{ flexDirection: 'row', width: '85%', alignSelf: 'center', marginBottom: 20 }}>

                <Image source={require('../../common/asset/pwd_grey.png')} resizeMode='contain' style={{ width: 20, alignSelf: 'center', height: 20, flex: 0.5 }}></Image>
                <View style={{ flex: 4, }}>
                    <TextInput style={{ width: '100%', color: 'black' }} placeholder={'phone'} ></TextInput>
                    <View style={{ borderWidth: 0.4, borderColor: 'gray', width: '98%', marginTop: 10 }}></View>
                </View>

            </View>

            <View style={{ flexDirection: 'row', width: '85%', alignSelf: 'center', marginBottom: 20 }}>

                <Image source={require('../../common/asset/pwd_grey.png')} resizeMode='contain' style={{ width: 20, alignSelf: 'center', height: 20, flex: 0.5 }}></Image>
                <View style={{ flex: 4, }}>
                    <TextInput style={{ width: '100%', color: 'black' }} placeholder={'address'} ></TextInput>
                    <View style={{ borderWidth: 0.4, borderColor: 'gray', width: '98%', marginTop: 10 }}></View>
                </View>

            </View>


            <LinearGradient colors={['#FEC140', '#FC986E', '#FA709A']} style={styles.linearGradient}
                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
            // locations={[0,0.4,0.85]}
            // locations={[0.2,0.5,0.85]}
            >
                <TouchableOpacity style={{ height: 50, width: 200, alignSelf: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate('MainRoute')}>

                    <Text style={{ alignSelf: 'center', color: 'white' }}>Sign Up</Text>

                </TouchableOpacity>
            </LinearGradient>
{/* 
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', margin: 15 }}>
                <Text>Create Account</Text>
            </TouchableOpacity> */}
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

export default SignUp_View;