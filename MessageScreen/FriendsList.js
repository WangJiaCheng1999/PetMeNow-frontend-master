import {Component} from 'react'
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert, Touchable} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


class FriendsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            friends: ['jack','bob','mike'],
            loaded: false,

        };
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData(){
        let userId = await AsyncStorage.getItem('userId');
        let userName = await AsyncStorage.getItem('userName');
        this.setState({id: userId, name: userName, loaded: true});
    }

    render() {
        return (
            <View>
                <Text>userID: {this.state.id}</Text>
                <Text>userName: {this.state.name}</Text>
                <FlatList
                    style={styles.flatList}
                    data={this.state.friends}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Message', {name: item})}>
                            <Text style={styles.username}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }

}
    


// styles for friends list
const styles = StyleSheet.create({
    username: {
        fontSize: 20,
        color: 'black',
        padding: 10,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    flatList: {
        marginTop: 20,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },

});



export default FriendsList;
