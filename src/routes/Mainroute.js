import * as React from 'react';
import { Image, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home_View from '../modules/home/Home_View';
import Base_Profile_View from '../modules/user/base-profile/Base_Profile_View';
import Cart_View from '../modules/cart/Cart_View';
import Product_View from '../modules/product/Product_View';

// import Profile from '../modules/profile/profile';
// import Gruppe from '../modules/gruppe/gruppe';
// import Notification from '../modules/notification/notification';
// import Live from '../modules/live/live';
// import HomeScreen from '../modules/search/home screen/homescreen';

//https://stackoverflow.com/questions/60496851/how-to-set-dynamic-tab-bar-icon-on-notification-in-react-native


const Stack = createStackNavigator();
const BottomTab = createMaterialBottomTabNavigator();


const UserModules = () => {
    return (
        <Stack.Navigator initialRouteName="Base_Profile_View">

            <Stack.Screen name="Base_Profile_View" component={Base_Profile_View} options={{ headerShown: false }}></Stack.Screen>


        </Stack.Navigator>
    )

}

const HomeModules = () => {
    return (
        <Stack.Navigator initialRouteName="Home_View">

            <Stack.Screen name="Home_View" component={Home_View} options={{ headerShown: false }}></Stack.Screen>            
            <Stack.Screen name="ProductModules" component={ProductModules} options={{ headerShown: false }}></Stack.Screen>


        </Stack.Navigator>
    )

}

const ProductModules = () => {


    return (
        <Stack.Navigator initialRouteName="Product_View">

            <Stack.Screen name="Product_View" component={Product_View} options={{ headerShown: false }}></Stack.Screen>


        </Stack.Navigator>
    )
}

const Start_Modules = () => {


    return (
        <Stack.Navigator initialRouteName="Product_View">

            <Stack.Screen name="Product_View" component={Product_View} options={{ headerShown: false }}></Stack.Screen>


        </Stack.Navigator>
    )
}

const MainRoute = () => {

    return (

        <NavigationContainer>
            <BottomTab.Navigator initialRouteName='Profile' activeColor='black' inactiveColor='black' barStyle={{ backgroundColor: 'white', padding: 10, paddingBottom: 3 }}>

                <BottomTab.Screen name='HomeModules' component={HomeModules} options={{
                    title: null,
                    tabBarIcon: ({ color }) => (
                        <View style={{
                            //   height:40, width:40, justifyContent:'center'
                        }}>
                            <Image source={require('../common/asset/Home_Icon_Grey.png')} resizeMode="contain" style={{ height: 25, alignSelf: 'center' }} />
                        </View>
                    ),

                }}></BottomTab.Screen>
                <BottomTab.Screen name='Cart_View' component={Cart_View} options={{
                    title: null,
                    tabBarIcon: ({ color }) => (
                        <View style={{}}>
                            <Image source={require('../common/asset/Cart_Icon_Grey.png')} resizeMode="contain" style={{ height: 25, }} />

                        </View>
                    ),
                }}></BottomTab.Screen>
                <BottomTab.Screen name='UserModules' component={UserModules} options={{
                    title: null,
                    tabBarIcon: ({ color }) => (
                        <View style={{}}>
                            <Image source={require('../common/asset/user_grey.png')} resizeMode="contain" style={{ height: 25, }} />

                        </View>
                    ),
                }}></BottomTab.Screen>


            </BottomTab.Navigator>
        </NavigationContainer>

    )
}


export default MainRoute;