import React, { useState, useEffect, useContext } from 'react';
import { Dimensions, StyleSheet, TextInput, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Animated } from 'react-native';
import { View } from 'react-native';
import { SafeAreaView, Text, Image } from 'react-native';
import CardView from 'react-native-cardview';
import { ScrollView } from 'react-native-gesture-handler';
import { TabView, SceneMap } from 'react-native-tab-view';
import { URL, URL_DEV_2 } from "@env"
import { UserData_Context } from '../../../context-provider/UserContext';
import Axios from 'axios';
import { Alert } from 'react-native';

const image_logo_shop = require('../../../common/asset/user/logo.png');

const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]}>

    </View>
);


const initialLayout = { width: Dimensions.get('window').width };

const Base_Profile_View = ({ navigation }) => {

    const [index, setIndex] = useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
    ]);

    useEffect(() => {

        if (currentUser.id == '32be4d51-8358-4fe7-87f9-ac13d57f396e') {
            _load_current_order();
        }

    }, [])

    const _load_current_order = async () => {


        try {

            let config = {
                headers: {
                    'Authorization': `Bearer ${refToken_context}`,

                },

            }

            let resp = await Axios.get(`${URL}/api/tenant/${currentTenant}/orders`, config);

            console.log('resp data order list is ->', resp.data)
            setOrderData(resp.data.rows)

        } catch (error) {
            Alert.alert('server error load order list')
        }


    }

    const [refToken_context, setRefToken_context, currentUser, setCurrentUser, currentTenant, setCurrentTenant, cartData, setCartData, orderData, setOrderData] = useContext(UserData_Context)

    console.log('current user is', currentUser)

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    const _orderDetails = (id)=>{

        let order_id = id;

        // console.log('pressed id ->', order_id)

        navigation.navigate('OrderDetails_View',{order_id} )
    }

    const _renderTabBar = (props) => {
        const inputRange = props.navigationState.routes.map((x, i) => i);

        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    const color = Animated.color(
                        Animated.round(
                            Animated.interpolate(props.position, {
                                inputRange,
                                outputRange: inputRange.map(inputIndex =>
                                    inputIndex === i ? 255 : 0
                                ),
                            })
                        ),
                        0,
                        0
                    );

                    return (
                        <TouchableOpacity
                            style={styles.tabItem}
                            onPress={() => this.setState({ index: i })}>
                            <Animated.Text style={{ color }}>{route.title}</Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <Image source={image_logo_shop} resizeMode='contain' style={{ width: 135, alignSelf: 'center', height: 135, borderRadius: 10, marginTop: 25 }}></Image>

                {currentUser.id == '32be4d51-8358-4fe7-87f9-ac13d57f396e' ?
                    <Text style={{ alignSelf: 'center', marginTop: 20, color: 'gray', fontWeight: '500', fontSize: 16 }}> Shop Information</Text> :
                    <Text style={{ alignSelf: 'center', marginTop: 20, color: 'gray', fontWeight: '500', fontSize: 16 }}> User Information</Text>
                }


                <View style={{ flexDirection: 'row', flex: 1, margin: 20, marginBottom: 35, marginHorizontal: 30 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: 'gray', fontWeight: '500', fontSize: 13, marginVertical: 10 }}>Name</Text>
                        <Text style={{ color: 'gray', fontWeight: '500', fontSize: 13, marginVertical: 10 }}>Email</Text>
                        <Text style={{ color: 'gray', fontWeight: '500', fontSize: 13, marginVertical: 10 }}>Contact</Text>

                    </View>

                    <View style={{ flex: 2.4 }}>
                        <Text style={{ color: 'gray', fontWeight: '500', fontSize: 13, marginVertical: 10 }} >{currentUser.fullName}</Text>
                        <Text style={{ color: 'gray', fontWeight: '500', fontSize: 13, marginVertical: 10 }} >{currentUser.email}</Text>
                        <Text style={{ color: 'gray', fontWeight: '500', fontSize: 13, marginVertical: 10 }} >{currentUser.phoneNumber}</Text>

                    </View>

                </View>

                <CardView
                    style={{ marginVertical: 7, backgroundColor: 'white', flex: 1, marginHorizontal: 10 }}
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={5}
                >
                    {orderData != null ? (

                        <View style={{ margin: 10 }}>
                            <TouchableOpacity onPress={()=>_orderDetails(orderData[0].id)}>
                            <Text style={{ color: 'black', fontWeight: '500', fontSize: 20, marginVertical: 20, marginHorizontal: 13 }}>Orders</Text>
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
                                    <Text style={{ color: 'black', fontWeight: '500', fontSize: 14, marginVertical: 5, marginHorizontal: 13 }}>{orderData[0] ? `order id : ${orderData[0].id.substring(0, 12)}` : ''}</Text>
                                    <Text style={{ color: 'gray', fontSize: 12, marginVertical: 5, marginHorizontal: 12 }}>{orderData[0] ? `user : ${orderData[0].userId.fullName}` : ''}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <View style={{ alignSelf: 'flex-end' }}>
                                        {/* <Text style={{ color: '#F4013D', fontWeight: '500', fontSize: 14, marginVertical: 5, marginHorizontal: 13 }}>COD now</Text> */}
                                        <Text style={{  },[orderData[0].status?{color:'green',fontWeight: '500', fontSize: 14, marginVertical: 5, marginHorizontal: 13 }:{color:'#F4013D',fontWeight: '500', fontSize: 14, marginVertical: 5, marginHorizontal: 13 }]}>{orderData[0].status? "Done": 'COD Now'}</Text>
                                    </View>
                                    <View style={{ alignSelf: 'flex-end' }}>
                                        <Text style={{ color: 'gray', fontSize: 12, marginVertical: 5, marginHorizontal: 12 }}>{orderData[0] ? `date : ${orderData[0].createdAt.substring(0, 10)}` : ''}</Text>
                                    </View>
                                </View>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>_orderDetails(orderData[1].id)}>
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
                                    <Text style={{ color: 'black', fontWeight: '500', fontSize: 14, marginVertical: 5, marginHorizontal: 13 }}>{orderData[1] ? `order id : ${orderData[1].id.substring(0, 12)}` : ''}</Text>
                                    <Text style={{ color: 'gray', fontSize: 12, marginVertical: 5, marginHorizontal: 12 }}>{orderData[1] ? `user : ${orderData[1].userId.fullName}` : ''}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <View style={{ alignSelf: 'flex-end' }}>
                                    {/* <Text style={{ color: '#F4013D', fontWeight: '500', fontSize: 14, marginVertical: 5, marginHorizontal: 13 }}>{orderData[1].status}</Text> */}
                                    <Text style={{  },[orderData[1].status?{color:'green',fontWeight: '500', fontSize: 14, marginVertical: 5, marginHorizontal: 13 }:{color:'#F4013D',fontWeight: '500', fontSize: 14, marginVertical: 5, marginHorizontal: 13 }]}>{orderData[1].status? "Done": 'COD Now'}</Text>
                                    </View>
                                    <View style={{ alignSelf: 'flex-end' }}>
                                        <Text style={{ color: 'gray', fontSize: 12, marginVertical: 5, marginHorizontal: 12 }}>{orderData[1] ? `date : ${orderData[1].createdAt.substring(0, 10)}` : ''}</Text>
                                    </View>
                                </View>
                            </View>

                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>_orderDetails(orderData[2].id)}>
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
                                    <Text style={{ color: 'black', fontWeight: '500', fontSize: 14, marginVertical: 5, marginHorizontal: 13 }}>{orderData[2] ? `order id : ${orderData[2].id.substring(0, 12)}` : ''}</Text>
                                    <Text style={{ color: 'gray', fontSize: 12, marginVertical: 5, marginHorizontal: 12 }}>{orderData[2] ? `user : ${orderData[2].userId.fullName}` : ''}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <View style={{ alignSelf: 'flex-end' }}>
                                        {/* <Text style={{ color: '#F4013D', fontWeight: '500', fontSize: 14, marginVertical: 5, marginHorizontal: 13 }}>COD now</Text>
                                         */}
                                         <Text style={{  },[orderData[2].status?{color:'green',fontWeight: '500', fontSize: 14, marginVertical: 5, marginHorizontal: 13 }:{color:'#F4013D',fontWeight: '500', fontSize: 14, marginVertical: 5, marginHorizontal: 13 }]}>{orderData[2].status? "Done": 'COD Now'}</Text>
                                    </View>
                                    <View style={{ alignSelf: 'flex-end' }}>
                                        <Text style={{ color: 'gray', fontSize: 12, marginVertical: 5, marginHorizontal: 12 }}>{orderData[2] ? `date : ${orderData[2].createdAt.substring(0, 10)}` : ''}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[{
                                width: '93.5%',
                                height: 1,
                                borderWidth: 0.6,
                                backgroundColor: 'grey',
                                opacity: 0.1,
                                marginBottom: 35,
                                alignSelf: 'center'
                            }]}></View>
                            </TouchableOpacity>
                            {/* <TouchableOpacity style={{alignSelf:'center', marginBottom:10,}} onPress={()=>navigation.navigate('AddProduct_View')}><Text style={{color:'#FA709A'}}>View Order</Text></TouchableOpacity>    */}

                            {/* <TabView
navigationState={{ index, routes }}
renderScene={renderScene}
renderTabBar={props => _renderTabBar(props) }
onIndexChange={setIndex}
initialLayout={initialLayout}
style={{}}
/> */}
                        </View>

                    ) : null}




                </CardView>

                <CardView
                    style={{ marginVertical: 7, backgroundColor: 'white', flex: 1, marginHorizontal: 10, paddingVertical: 13, }}
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={5}
                >

                    {currentUser.id == '32be4d51-8358-4fe7-87f9-ac13d57f396e' ?
                        <>

                            <TouchableOpacity style={{ alignSelf: 'center', marginBottom: 10, }} onPress={() => navigation.navigate('AddProduct_View')}><Text style={{ color: '#FA709A' }}>+ Add Product</Text></TouchableOpacity>


                        </> : null}

                    {/* <View style={{ margin: 10 }}>
                        <Text style={{ color: 'black', fontWeight: '500', fontSize: 20, marginVertical: 20, marginHorizontal: 13 }}>Product</Text>
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
                                <Text style={{ color: 'black', fontWeight: '500', fontSize: 14, marginVertical: 5, marginHorizontal: 13 }}>Samyang</Text>
                                <Text style={{ color: 'gray', fontSize: 12, marginVertical: 5, marginHorizontal: 12 }}>spicy red prawn</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: '#5BDA8C', fontWeight: '500', fontSize: 14, marginVertical: 5, marginHorizontal: 13 }}>10</Text>
                                </View>
                                <View style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: 'gray', fontSize: 12, marginVertical: 5, marginHorizontal: 12 }}>10 Oct 2020</Text>
                                </View>
                            </View>
                        </View>

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
                                <Text style={{ color: 'black', fontWeight: '500', fontSize: 14, marginVertical: 5, marginHorizontal: 13 }}>Samyang</Text>
                                <Text style={{ color: 'gray', fontSize: 12, marginVertical: 5, marginHorizontal: 12 }}>spicy red prawn</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: '#5BDA8C', fontWeight: '500', fontSize: 14, marginVertical: 5, marginHorizontal: 13 }}>9</Text>
                                </View>
                                <View style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: 'gray', fontSize: 12, marginVertical: 5, marginHorizontal: 12 }}>10 Oct 2020</Text>
                                </View>
                            </View>
                        </View>
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
                                <Text style={{ color: 'black', fontWeight: '500', fontSize: 14, marginVertical: 5, marginHorizontal: 13 }}>Samyang</Text>
                                <Text style={{ color: 'gray', fontSize: 12, marginVertical: 5, marginHorizontal: 12 }}>spicy red prawn</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: '#F4013D', fontWeight: '500', fontSize: 14, marginVertical: 5, marginHorizontal: 13 }}>2</Text>
                                </View>
                                <View style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: 'gray', fontSize: 12, marginVertical: 5, marginHorizontal: 12 }}>10 Oct 2020</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[{
                            width: '93.5%',
                            height: 1,
                            borderWidth: 0.6,
                            backgroundColor: 'grey',
                            opacity: 0.1,
                            marginBottom: 25,
                            alignSelf: 'center'
                        }]}></View>

                        <TouchableOpacity style={{ alignSelf: 'center', marginBottom: 10, }} onPress={() => navigation.navigate('AddProduct_View')}><Text style={{ color: '#FA709A' }}>+ Add Product</Text></TouchableOpacity>

                    </View> */}


                </CardView>

            </ScrollView>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        paddingTop: StatusBar.currentHeight,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
});

export default Base_Profile_View;