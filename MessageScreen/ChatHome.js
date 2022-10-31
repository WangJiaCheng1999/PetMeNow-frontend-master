//This js file is used to create a stack of users that used to chat with the current user
//Which is first main page of the chat function
import { Button } from '@rneui/themed';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert, Touchable } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Message from './Message';
import FriendsList from './FriendsList';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const ChatHome = (navigation) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="FriendsList" component={FriendsList} options={{headerShown:false}}/>
            <Stack.Screen name="Message" component={Message} options={({route}) => ({title: route.params.name})}/>
        </Stack.Navigator>
    )
}

export default ChatHome