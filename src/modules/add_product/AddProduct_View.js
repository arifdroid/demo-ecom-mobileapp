import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView, StyleSheet, Text, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { RNCamera } from 'react-native-camera';
import { Platform } from 'react-native';



const AddProduct_View = ({ navigation }) => {

    var thisCamera = useRef(null);
    const [dataImage, setDataImage] = useState(null);

    const takePicture = async () => {
        if (thisCamera) {
            const options = { quality: 0.9, base64: true, height: 1500, width: 2000 };
            const data = await thisCamera.takePictureAsync(options);

            if (Platform.OS === 'ios') {


                let image = data;

                let new_uri = image.uri.replace('file://', '');
                image.uri = new_uri;

                console.log('\n\n====')
                console.log('\n image snapped ==>', image)
                console.log('\n====\n\n')

                setDataImage(data);

            } else {

                setDataImage(data);
            }
        }
    };


    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>

            {dataImage == null ? (
                <View style={styles.container}>
                    <RNCamera
                        ref={ref => (thisCamera = ref)}
                        style={styles.preview}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.off}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}></RNCamera>

                    <View
                        style={{
                            position: 'absolute',
                            bottom: '2%',
                            // justifyContent: 'center',
                            alignSelf: 'center'
                            // flex: 1,
                            // flexDirection: 'row',
                        }}>
                        <View onPress={takePicture} style={styles.blank}></View>
                        <TouchableOpacity onPress={takePicture} style={styles.capture}>
                            <Image
                                source={require('../../common/asset/camera_snap_icon.png')}
                                resizeMode={'contain'}
                                style={{ height: 67, width: 67, alignSelf: 'center' }}></Image>
                        </TouchableOpacity>

                    </View>
                </View>
            ) :

                <>


                    <View style={{ flexDirection: 'row', width: '85%', alignSelf: 'center', marginBottom: 20 }}>

                        <Image source={require('../../common/asset/user_grey.png')} resizeMode='contain' style={{ width: 20, alignSelf: 'center', height: 20, flex: 0.5 }}></Image>
                        <View style={{ flex: 4, }}>
                            <TextInput style={{ width: '100%', color: 'black' }} placeholder={'name'}></TextInput>
                            <View style={{ borderWidth: 0.4, borderColor: 'gray', width: '98%', marginTop: 10 }}></View>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', width: '85%', alignSelf: 'center', marginBottom: 20 }}>

                        <Image source={require('../../common/asset/pwd_grey.png')} resizeMode='contain' style={{ width: 20, alignSelf: 'center', height: 20, flex: 0.5 }}></Image>
                        <View style={{ flex: 4, }}>
                            <TextInput style={{ width: '100%', color: 'black' }} placeholder={'quantity'} ></TextInput>
                            <View style={{ borderWidth: 0.4, borderColor: 'gray', width: '98%', marginTop: 10 }}></View>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', width: '85%', alignSelf: 'center', marginBottom: 20 }}>

                        <Image source={require('../../common/asset/pwd_grey.png')} resizeMode='contain' style={{ width: 20, alignSelf: 'center', height: 20, flex: 0.5 }}></Image>
                        <View style={{ flex: 4, }}>
                            <TextInput style={{ width: '100%', color: 'black' }} placeholder={'color'} ></TextInput>
                            <View style={{ borderWidth: 0.4, borderColor: 'gray', width: '98%', marginTop: 10 }}></View>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', width: '85%', alignSelf: 'center', marginBottom: 20 }}>

                        <Image source={require('../../common/asset/pwd_grey.png')} resizeMode='contain' style={{ width: 20, alignSelf: 'center', height: 20, flex: 0.5 }}></Image>
                        <View style={{ flex: 4, }}>
                            <TextInput style={{ width: '100%', color: 'black' }} placeholder={'description'} ></TextInput>
                            <View style={{ borderWidth: 0.4, borderColor: 'gray', width: '98%', marginTop: 10 }}></View>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', width: '85%', alignSelf: 'center', marginBottom: 20 }}>

                        <Image source={require('../../common/asset/pwd_grey.png')} resizeMode='contain' style={{ width: 20, alignSelf: 'center', height: 20, flex: 0.5 }}></Image>
                        <View style={{ flex: 4, }}>
                            <TextInput style={{ width: '100%', color: 'black' }} placeholder={'category'} ></TextInput>
                            <View style={{ borderWidth: 0.4, borderColor: 'gray', width: '98%', marginTop: 10 }}></View>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', width: '85%', alignSelf: 'center', marginBottom: 20 }}>

                        <Image source={require('../../common/asset/pwd_grey.png')} resizeMode='contain' style={{ width: 20, alignSelf: 'center', height: 20, flex: 0.5 }}></Image>
                        <View style={{ flex: 4, }}>
                            <TextInput style={{ width: '100%', color: 'black' }} placeholder={'price'} ></TextInput>
                            <View style={{ borderWidth: 0.4, borderColor: 'gray', width: '98%', marginTop: 10 }}></View>
                        </View>

                    </View>


                    <LinearGradient colors={['#FEC140', '#FC986E', '#FA709A']} style={styles.linearGradient}
                        start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                    // locations={[0,0.4,0.85]}
                    // locations={[0.2,0.5,0.85]}
                    >
                        <TouchableOpacity style={{ height: 50, width: 200, alignSelf: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate('MainRoute')}>

                            <Text style={{ alignSelf: 'center', color: 'white' }}>Upload</Text>

                        </TouchableOpacity>
                    </LinearGradient>


                </>}



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
    container_gotimage: {
        flex: 1,
        // flexDirection: 'column',
        backgroundColor: 'yellow',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    containerCheck: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
        justifyContent: 'center',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        borderRadius: 5,
        marginBottom: 20,
        flex: 1,
    },
    blank: {
        flex: 1,
    },
    gallery: {
        flex: 1,
        // marginBottom:20,
    },
    btnNormal: {
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 10,
        height: 30,
        width: 100,
    },
    btnPress: {
        borderColor: 'blue',
        borderWidth: 1,
        height: 30,
        width: 100,
    }


})

export default AddProduct_View;