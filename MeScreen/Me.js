import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { width } from '@mui/system';
import { useState } from 'react';

import PersonalInfo from './PersonalInfo';

const Stack = createNativeStackNavigator();

const BasicInfo = ({navigation}) =>{
    const [userName, setUserName] = useState('');
    AsyncStorage.getItem('userName',(err,result)=>setUserName(result));
    return(
        <View style={styles.mainBody}>
         <View style={styles.avatarAndName}>
            <Image source={require('../assets/avatar.png')} style={styles.avatar}/>
            <View style={styles.name}>
                <Text style={styles.nameInfo}>{userName}</Text>
                {/* <Text style={styles.nameInfo}>user id:52955</Text>
                <Text style={styles.nameInfo}>Location: Melbourne</Text> */}
            </View>
         </View>
         <View style={styles.list}>
            <TouchableOpacity style={styles.touchButton}
                onPress={()=>navigation.navigate('PersonalInfo')}
                >
                <Text>Personal Information</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchButton}
                // onPress={handleSubmitButton}
                >
                <Text>Pet Information</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchButton}
                // onPress={handleSubmitButton}
                >
                <Text>Foster/Adopt History</Text>
            </TouchableOpacity>
         </View>
        </View>

    )
}

function Me(){
    return (
        <Stack.Navigator>
            <Stack.Screen name="BasicInfo" component={BasicInfo} options={{headerShown:false}}/>
            <Stack.Screen name="PersonalInfo" component={PersonalInfo} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
}

export default Me;

const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#74C8DB',
      alignContent: 'center',
    },
    avatarAndName:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:20
    },
    avatar:{
        width:130,
        height:130,
        borderRadius:70
    },
    name:{
        marginLeft:20,
    },
    nameInfo:{
        fontSize:18,
        fontWeight:'500'
    },
    touchButton:{
        padding:20,
        borderWidth:1,
        borderColor:'black',
        width:'auto',
        height:'auto'
    }
  });