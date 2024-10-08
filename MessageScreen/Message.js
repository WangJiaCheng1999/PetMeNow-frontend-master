import React , { Component, useState, useCallback, useEffect} from 'react'
import { Image, FlatList, StyleSheet, Text, View, RefreshControl } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'


const Message = ({navigation, route}) => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello, this is ' + route.params.name,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
        <View style={styles.container}>
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
        />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
})

export default Message