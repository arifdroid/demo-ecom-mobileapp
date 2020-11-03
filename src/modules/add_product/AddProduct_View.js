import React, { useState, useEffect, useRef, useContext } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView, StyleSheet, Text, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { RNCamera } from 'react-native-camera';
import { Platform } from 'react-native';
import { URL, URL_DEV_2,URL_google_bucket } from "@env"
import { v4 as uuidv4 } from 'uuid';
import { UserData_Context } from '../../context-provider/UserContext';
import Axios from 'axios';
import { Alert } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'



const AddProduct_View = ({ navigation }) => {

    var thisCamera = useRef(null);
    const [dataImage, setDataImage] = useState(null);
    const [refToken_context, setRefToken_context, currentUser, setCurrentUser, currentTenant, setCurrentTenant, cartData, setCartData] = useContext(UserData_Context)
    
    useEffect(()=>{
        setDataImage(null)
    },[])


    console.log('data image ->', dataImage)

    const takePicture = async () => {
        if (thisCamera) {
            const options = { quality: 0.3, base64: true, orientation: RNCamera.Constants.Orientation.portrait, fixOrientation: true };
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

    console.log('image now', dataImage )

    const _uploadProduct=async()=>{

        //create uuid
        let image_id = uuidv4();
        image_id = `${image_id}.jpg` 

       
        let config = {
            headers: {
                'Authorization': `Bearer ${refToken_context}`
            }
        }

        try {

            let resp = await Axios.get(`${URL}/api/tenant/${currentTenant}/file/credentials?filename=${image_id}&storageId=productsImages`, config);
            
            const upload_url = resp.data.uploadCredentials.url;
            const uploadCredentials = resp.data.uploadCredentials
            

            

            let params = [
                {
                  name: 'key',
                  data: `${uploadCredentials.fields.key}`,
                },
    
                {
                  name: 'x-goog-date',
                  data: `${uploadCredentials.fields['x-goog-date']}`,
                },
                {
                  name: 'x-goog-credential',
                  data: `${uploadCredentials.fields['x-goog-credential']}`,
                },
                {
                    name: 'x-goog-algorithm',
                    data: `${uploadCredentials.fields['x-goog-algorithm']}`,
                },
                {
                    name: 'policy',
                    data: `${uploadCredentials.fields['policy']}`,
                },
                {
                    name: 'x-goog-signature',
                    data: `${uploadCredentials.fields['x-goog-signature']}`,
                },
                {
                    name: 'file',
                    filename: `${image_id}`,
                    type: 'image/jpeg',
                    data: RNFetchBlob.wrap(dataImage.uri),
                  },
              ];

              console.log('\n\n======\n')
              console.log('image file name', image_id)
              console.log('\n======\n\n')

              RNFetchBlob.config({
                trusty: true
            }).fetch('POST', upload_url, {                
                'Content-Type': 'multipart/form-data',                
            }, params).then(resp => {
                console.log('customerverifyupdate 4 NOW', resp);
                
            }).catch(error => {
                console.log('customerverifyupdate 5 now', error);
                
            })

            // let resp_upload = await Axios.post(upload_url, formData, {
            //     headers: {
            //       'Content-Type': 'multipart/form-data',
            //     //   'Authorization': `Bearer ${refToken_context}`
            //     },
            //   });

            // let resp_upload = await Axios.post(upload_url, formData, {
            //     headers: {
            //       'Content-Type': 'multipart/form-data',
            //     },
            //   }).then(resp=>{

            //   }).catch(e=>{
            //       console.log('upload error is', e)
            //   })

            // console.log('resp_upload now is', resp_upload)



        } catch (error) {
            
            console.log('error got is', error)
            Alert.alert('server error')
        }
        
       



    }



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

                    <Image source={{uri: "data:image/png;base64," + dataImage.base64}}  style={{ width: 280, alignSelf: 'center', height: 280 }}></Image>


                    <View style={{ flexDirection: 'row', width: '85%', alignSelf: 'center', marginBottom: 8 }}>

                        <Image source={require('../../common/asset/user_grey.png')} resizeMode='contain' style={{ width: 20, alignSelf: 'center', height: 20, flex: 0.5 }}></Image>
                        <View style={{ flex: 4, }}>
                            <TextInput style={{ width: '100%', color: 'black' }} placeholder={'name'}></TextInput>
                            <View style={{ borderWidth: 0.4, borderColor: 'gray', width: '98%', marginTop: 10 }}></View>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', width: '85%', alignSelf: 'center', marginBottom: 8 }}>

                        <Image source={require('../../common/asset/pwd_grey.png')} resizeMode='contain' style={{ width: 20, alignSelf: 'center', height: 20, flex: 0.5 }}></Image>
                        <View style={{ flex: 4, }}>
                            <TextInput style={{ width: '100%', color: 'black' }} placeholder={'quantity'} ></TextInput>
                            <View style={{ borderWidth: 0.4, borderColor: 'gray', width: '98%', marginTop: 10 }}></View>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', width: '85%', alignSelf: 'center', marginBottom: 8 }}>

                        <Image source={require('../../common/asset/pwd_grey.png')} resizeMode='contain' style={{ width: 20, alignSelf: 'center', height: 20, flex: 0.5 }}></Image>
                        <View style={{ flex: 4, }}>
                            <TextInput style={{ width: '100%', color: 'black' }} placeholder={'color'} ></TextInput>
                            <View style={{ borderWidth: 0.4, borderColor: 'gray', width: '98%', marginTop: 10 }}></View>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', width: '85%', alignSelf: 'center', marginBottom: 8 }}>

                        <Image source={require('../../common/asset/pwd_grey.png')} resizeMode='contain' style={{ width: 20, alignSelf: 'center', height: 20, flex: 0.5 }}></Image>
                        <View style={{ flex: 4, }}>
                            <TextInput style={{ width: '100%', color: 'black' }} placeholder={'description'} ></TextInput>
                            <View style={{ borderWidth: 0.4, borderColor: 'gray', width: '98%', marginTop: 10 }}></View>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', width: '85%', alignSelf: 'center', marginBottom: 8 }}>

                        <Image source={require('../../common/asset/pwd_grey.png')} resizeMode='contain' style={{ width: 20, alignSelf: 'center', height: 20, flex: 0.5 }}></Image>
                        <View style={{ flex: 4, }}>
                            <TextInput style={{ width: '100%', color: 'black' }} placeholder={'category'} ></TextInput>
                            <View style={{ borderWidth: 0.4, borderColor: 'gray', width: '98%', marginTop: 10 }}></View>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', width: '85%', alignSelf: 'center', marginBottom: 8 }}>

                        <Image source={require('../../common/asset/pwd_grey.png')} resizeMode='contain' style={{ width: 20, alignSelf: 'center', height: 20, flex: 0.5 }}></Image>
                        <View style={{ flex: 4, }}>
                            <TextInput style={{ width: '100%', color: 'black' }} placeholder={'price'} ></TextInput>
                            <View style={{ borderWidth: 0.4, borderColor: 'gray', width: '98%', marginTop: 10 }}></View>
                        </View>

                    </View>

                    <View style={{flexDirection:'row', alignSelf: 'center',}}>

                    <LinearGradient colors={['#ffe0d4', '#ffe0d4', '#ffe0d4']} style={styles.linearGradient}
                        start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                    // locations={[0,0.4,0.85]}
                    // locations={[0.2,0.5,0.85]}
                    >
                        <TouchableOpacity style={{ height: 40, width: 130, alignSelf: 'center', justifyContent: 'center', borderColor:'#FA709A', borderRadius:0.5 }} onPress={()=>navigation.pop()}>

                            <Text style={{ alignSelf: 'center', color: '#FA709A' }}>Cancel</Text>

                        </TouchableOpacity>
                    </LinearGradient>

                    <View style={{margin:20}}></View>


                    <LinearGradient colors={['#FEC140', '#FC986E', '#FA709A']} style={styles.linearGradient}
                        start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                    // locations={[0,0.4,0.85]}
                    // locations={[0.2,0.5,0.85]}
                    >
                        <TouchableOpacity style={{ height: 40, width: 130, alignSelf: 'center', justifyContent: 'center' }} onPress={_uploadProduct}>

                            <Text style={{ alignSelf: 'center', color: 'white' }}>Upload</Text>

                        </TouchableOpacity>
                    </LinearGradient>
                    </View>


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
        width: 150,
        // marginVertical:10,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 30,
        marginTop: 7,
        borderColor:'#FA709A'
        

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
        marginBottom: 8,
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