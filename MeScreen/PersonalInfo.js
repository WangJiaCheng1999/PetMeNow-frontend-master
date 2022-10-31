import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { borderRadius, height, margin } from '@mui/system';
import { color } from '@rneui/base';

const PersonalInfo = () => {
    const UserInfoUrl = 'http://petmenowspringboot-env.eba-gbytpf9b.us-west-2.elasticbeanstalk.com:80/pet-me-now/user/details/'
    // getUserId
    const [userId, setUserId] = useState('');
    AsyncStorage.getItem('userId',(err,result)=>setUserId(result));
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userJoinDate, setUserJoinDate] = useState('');

    fetch(UserInfoUrl+userId,{
        method:`GET`,
        headers: {
            'Content-Type': 'application/json'
          },
        
    })
    .then((response) => response.json())
    .then((responseJson) => {

        if (responseJson.status.statusCode === 2001) {

          setUserName(responseJson.responseData.userName);
          setUserEmail(responseJson.responseData.email);
          setUserAddress(responseJson.responseData.address)
          const date = new Date(responseJson.responseData.createdTimestamp);
          setUserJoinDate(date.toLocaleDateString())

        } else {
          alert("Something wrong!")
        }
      })
    return(
        <View style={styles.mainBody}>
            <View style={styles.infoCard}>
                    <View style={styles.infoContainer}>
                    <Text style={styles.title}>User Name</Text>
                    <Text style={styles.content}>{userName}</Text>
                    <Text style={styles.title}>Email</Text>
                    <Text style={styles.content}>{userEmail}</Text>
                    <Text style={styles.title}>Address</Text>
                    <Text style={styles.content}>{userAddress}</Text>
                    <Text style={styles.title}>Join Date</Text>
                    <Text style={styles.content}>{userJoinDate}</Text>
                </View>
            </View>
        </View>
    )
}

export default PersonalInfo;

const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#74C8DB',
      alignItems:'center',
      height:130
    },
    infoCard:{
        width:300,
        height:300,
        backgroundColor:'white',
        borderRadius:10,
        justifyContent: 'center',
        alignItems:'center'
    },
    avatar:{
        width:130,
        height:130,
        borderRadius:70
    },
    infoContainer:{

    },
    title:{
        fontSize:15,
        color:'#030303'
    },
    content:{
        fontSize:18,
        marginBottom:3
    }
  });