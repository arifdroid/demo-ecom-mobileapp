import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, TextInput, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Animated } from 'react-native';
import { View } from 'react-native';
import { SafeAreaView, Text, Image } from 'react-native';
import CardView from 'react-native-cardview';
import { ScrollView } from 'react-native-gesture-handler';
import { TabView, SceneMap } from 'react-native-tab-view';

const image_logo_shop = require('../../../common/asset/user/logo.png');

const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]}>

    </View>
);


const initialLayout = { width: Dimensions.get('window').width };

const Base_Profile_View = ({navigation}) => {

    const [index, setIndex] = useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
    ]);



    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

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
                <Text style={{ alignSelf: 'center', marginTop: 20, color: 'gray', fontWeight: '500', fontSize: 16 }}>Shop Information</Text>

                <View style={{ flexDirection: 'row', flex: 1, margin: 20, marginBottom: 35, marginHorizontal: 30 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: 'gray', fontWeight: '500', fontSize: 13, marginVertical: 10 }}>Name</Text>
                        <Text style={{ color: 'gray', fontWeight: '500', fontSize: 13, marginVertical: 10 }}>Email</Text>
                        <Text style={{ color: 'gray', fontWeight: '500', fontSize: 13, marginVertical: 10 }}>Contact</Text>
                        <Text style={{ color: 'gray', fontWeight: '500', fontSize: 13, marginVertical: 10 }}>Address</Text>
                    </View>

                    <View style={{ flex: 2.5 }}>
                        <TextInput style={{ color: 'gray', fontWeight: '500', fontSize: 13, marginVertical: 10 }} value={'K Shoppe Online Mart'}></TextInput>
                        <TextInput style={{ color: 'gray', fontWeight: '500', fontSize: 13, marginVertical: 10 }} value={'KShoppeOnlineMart@gmail.com'}></TextInput>
                        <TextInput style={{ color: 'gray', fontWeight: '500', fontSize: 13, marginVertical: 10 }} value={'60123323232'}></TextInput>
                        <TextInput style={{ color: 'gray', fontWeight: '500', fontSize: 13, marginVertical: 10 }} value={'No.1 Jalan Chepor Indah 36, Taman Chepor Indah'}></TextInput>
                    </View>

                </View>

                <CardView
                    style={{ marginVertical: 7, backgroundColor: 'white', flex: 1, marginHorizontal: 10 }}
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={5}
                >

                    <View style={{ margin: 10 }}>
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
                                <Text style={{ color: 'black', fontWeight: '500', fontSize: 14, marginVertical: 5, marginHorizontal: 13 }}>Samyang</Text>
                                <Text style={{ color: 'gray', fontSize: 12, marginVertical: 5, marginHorizontal: 12 }}>spicy red prawn</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: '#5BDA8C', fontWeight: '500', fontSize: 14, marginVertical: 5, marginHorizontal: 13 }}>Done</Text>
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
                                    <Text style={{ color: '#5BDA8C', fontWeight: '500', fontSize: 14, marginVertical: 5, marginHorizontal: 13 }}>Done</Text>
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
                                    <Text style={{ color: '#F4013D', fontWeight: '500', fontSize: 14, marginVertical: 5, marginHorizontal: 13 }}>COD now</Text>
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
                            marginBottom: 35,
                            alignSelf: 'center'
                        }]}></View>
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


                </CardView>

                <CardView
                    style={{ marginVertical: 7, backgroundColor: 'white', flex: 1, marginHorizontal: 10 }}
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={5}
                >

                    <View style={{ margin: 10 }}>
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

                        <TouchableOpacity style={{alignSelf:'center', marginBottom:10,}} onPress={()=>navigation.navigate('AddProduct_View')}><Text style={{color:'#FA709A'}}>+ Add Product</Text></TouchableOpacity>    

                    </View>


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