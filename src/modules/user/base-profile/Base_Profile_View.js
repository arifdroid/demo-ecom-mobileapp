import React,{ useState,useEffect } from 'react';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { SafeAreaView, Text , Image} from 'react-native';
import CardView from 'react-native-cardview';
import { ScrollView } from 'react-native-gesture-handler';

const image_logo_shop = require('../../../common/asset/user/logo.png')

const Base_Profile_View = ()=>{

    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={{flex:1}}>
            <Image source={image_logo_shop} resizeMode='contain' style={{ width: 135, alignSelf: 'center', height: 135, borderRadius:10,marginTop:25 }}></Image>
            <Text style={{alignSelf:'center', marginTop:20, color:'gray', fontWeight:'500', fontSize:16}}>Shop Information</Text>

            <View style={{flexDirection:'row', flex:1, margin:20, marginBottom:35, marginHorizontal:30}}>
            <View style={{flex:1}}>
            <Text style={{color:'gray', fontWeight:'500', fontSize:13, marginVertical:10}}>Name</Text>
            <Text style={{color:'gray', fontWeight:'500', fontSize:13, marginVertical:10}}>Email</Text>    
            <Text style={{color:'gray', fontWeight:'500', fontSize:13, marginVertical:10}}>Contact</Text>
            <Text style={{color:'gray', fontWeight:'500', fontSize:13, marginVertical:10}}>Address</Text>    
            </View>

            <View style={{flex:2.5}}>
            <TextInput style={{color:'gray', fontWeight:'500', fontSize:13,marginVertical:10}} value={'K Shoppe Online Mart'}></TextInput>    
            <TextInput style={{color:'gray', fontWeight:'500', fontSize:13,marginVertical:10}} value={'KShoppeOnlineMart@gmail.com'}></TextInput>    
            <TextInput style={{color:'gray', fontWeight:'500', fontSize:13,marginVertical:10}} value={'60123323232'}></TextInput>    
            <TextInput style={{color:'gray', fontWeight:'500', fontSize:13,marginVertical:10}} value={'No.1 Jalan Chepor Indah 36, Taman Chepor Indah'}></TextInput>    
            </View>

            </View>

            <CardView
                                style={{ marginVertical: 7, backgroundColor: 'white', flex: 1, marginHorizontal:10 }}
                                cardElevation={2}
                                cardMaxElevation={2}
                                cornerRadius={30}
                            >
                                <View
                                    style={{ justifyContent: 'center', margin: 10,
                                     marginTop: 25, flexDirection: 'row' ,flex:1}}

                                >
                                    <View style={{flex:1}}>
                                        {/* <Image source={item.image} resizeMode='contain' style={{ width: 75, alignSelf: 'center', height: 75 }}></Image> */}
                                        {/* <Text style={{ marginTop: 10, marginLeft: 8, fontSize: 15, color: 'black', fontWeight: '500', }}>
                                            {item.product_name}
                                        </Text> */}
                                        {/* <Text style={{ fontSize: 13, color: 'gray', marginLeft: 8, marginTop: 4 }}>
                                            {item.product_description}
                                        </Text> */}
                                        <View style={{flexDirection:'row', flex:1, width:80, borderWidth:0.5, justifyContent:'center',margin:15, alignSelf: 'center', }}>
                                            <TouchableOpacity style={{flex:1, alignSelf:'center'}}><Text style={{alignSelf: 'center',}}>-</Text></TouchableOpacity>
                                    <View style={{flex:1,borderLeftWidth:0.5 ,borderRightWidth:0.5 }}><Text style={{alignSelf: 'center',}}>2</Text></View>
                                            <TouchableOpacity style={{flex:1, alignSelf: 'center',}}><Text style={{alignSelf: 'center',}}>+</Text></TouchableOpacity>
                                        </View>

                                    </View>
                                    <View style={{flex:2 }}>
                                        
                                        <Text style={{  marginLeft: 8, fontSize: 15, color: 'black', fontWeight: '500', }}>
                                            check
                                        </Text>
                                        <Text style={{ fontSize: 13, color: 'gray', marginLeft: 8, marginTop: 4 }}>
                                            ola
                                        </Text>

                                    </View>
                                   


                                </View>

                            </CardView>

            </ScrollView>

        </SafeAreaView>
    )
}

export default Base_Profile_View;