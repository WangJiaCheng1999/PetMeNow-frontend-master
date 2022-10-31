import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, Button, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Alert } from 'react-native'
import * as storage from "../storage";
import * as ImagePicker from 'expo-image-picker';
import { Tile } from '@rneui/base';
import DatePicker from 'react-native-modern-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';

const {width,height} = Dimensions.get('window')

const Foster = ({navigation}) => {
    const [title, setTitle] = useState("");
    const [durationNumber, setDurationNumber] = useState("");
    const [startDate, setStartDate] = useState("");
    const [durationType, setDurationType] = useState("");
    const [allowedPet, setAllowedPet] = useState("");

    var num = function(str) {
        var patrn = /^[0-9]{1,20}$/;
        var bool = true;
        if (!patrn.exec(str)) {
            bool = false;
        }
        return bool;
    }

    const submit = async () => {
        if (title == "") {
          Alert.alert('Please Input Title!');
          return;
        } else if (title.length > 50) {
            Alert.alert('Title too long!');
            return;
        }

        if (durationNumber == "") {
          Alert.alert('Please Input Duration number!');
          return;
        } else if (!num(durationNumber)) {
            Alert.alert('Duration must be numbers');
            return;
        }

        if (startDate == "") {
          Alert.alert('Please Input Start date!');
          return;
        }

        if (durationType == "") {
          Alert.alert('Please Input Duration type!');
          return;
        }

        if (allowedPet == "") {
          Alert.alert('Please Input Allowed pets!');
          return;
        }

        const fosterUrl = "http://petmenowspringboot-env.eba-gbytpf9b.us-west-2.elasticbeanstalk.com:80/pet-me-now/order/request";
        let userId = await AsyncStorage.getItem('userId');
        fetch(fosterUrl, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            userId: userId,
            type : "FOSTER",
            title: title,
            startDate: moment(startDate).valueOf(),
            durationNumber:durationNumber,
            durationType:durationType,
            allowedPet:allowedPet

        })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                navigation.navigate('Mainpage');
            });
        Alert.alert('Post Success!');


      }


    return(
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='padding' enabled>
                <ScrollView>
                            <View style={styles.row}>
                                <Text style={{color:'red',marginRight:5}}>*</Text>
                                <Text style={{color:'#744E20'}}>Title:</Text>
                                <TextInput style={styles.inputext} placeholder="No more than 50 words" value={title} onChangeText={(text) =>{
                                    setTitle(text);
                                }}></TextInput>
                            </View>
                            <View style={styles.row}>
                                <Text style={{color:'red',marginRight:5}}>*</Text>
                                <Text style={{color:'#744E20'}}>Start date:</Text>
                                <TextInput style={styles.inputext} value={startDate} onChangeText={(text) =>{
                                    setStartDate(text);
                                }}></TextInput>
                            </View> 
                            <DatePicker
                            options={{
                                backgroundColor: '#d8eff3',
                                textHeaderColor: '#bf8040',
                                textDefaultColor: '#744E20',
                                selectedTextColor: '#fff',
                                mainColor: '#734d26',
                                textSecondaryColor: '#D6C7A1',
                                borderColor: 'rgba(122, 146, 165, 0.1)',
                            }}
                            onSelectedChange={date => setStartDate(date)}
                            />


                            <View style={styles.row}>
                                <Text style={{color:'red',marginRight:5}}>*</Text>
                                <Text style={{color:'#744E20'}}>Duration number:</Text>
                                <TextInput style={styles.inputext} value={durationNumber} onChangeText={(text) =>{
                                    setDurationNumber(text);
                                }}></TextInput>
                            </View>
                            <View style={styles.row}>
                                <Text style={{color:'red',marginRight:5}}>*</Text>
                                <Text style={{color:'#744E20'}}>Duration type:</Text>
                                <TextInput style={styles.inputext} placeholder="e.g.,WEEK"  value={durationType} onChangeText={(text) =>{
                                    // setDurationType(text);
                                }}></TextInput>
                            </View>
                            <Picker
                                selectedValue = {durationType}
                                onValueChange = {(itemValue, itemIndex) =>
                                    setDurationType(itemValue)
                                }>
                                <Picker.Item label='Days' value={'DAYS'} />
                                <Picker.Item label='Weeks' value={'WEEKS'} />
                            </Picker>

                            <View style={styles.row}>
                                <Text style={{color:'red',marginRight:5}}>*</Text>
                                <Text style={{color:'#744E20'}}>Allowed pets:</Text>
                                <TextInput style={styles.inputext} placeholder="e.g.,Cat or Dog"  value={allowedPet} onChangeText={(text) =>{
                                    setAllowedPet(text);
                                }}></TextInput>
                            </View>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <TouchableOpacity onPress={()=>{submit();}}>
                        <View style={styles.button}>
                            <Text style={{ fontSize: 17, color: "#fff" }}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        backgroundColor: "#AADBE4",
    },
    img:{
        justifyContent: "center", 
        paddingLeft: 10, 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "flex-start", 
        paddingHorizontal: 0, 
        paddingVertical: 20
    },
    inital:{
        width: 80, 
        height: 80, 
        backgroundColor: "#fff", 
        alignItems: "center", 
        justifyContent: "center"
    },
    inputext:{
        height: 50,
        borderRadius: 5,
        color: "#333",
        width: "100%",
        paddingLeft: 10,
    },
    row:{
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        paddingHorizontal: 10,
    },
    row1:{
        flexDirection: "row",
        alignItems: "flex-start",
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    detailArea: {
        height: 40,
        borderRadius: 5,
        color: "#333",
        width: "100%",
        paddingLeft: 10,
        textAlignVertical: "top",
    },
    button: {
        marginTop: 40,
        width: 100,
        backgroundColor: "#744E20",
        textAlign: "center",
        borderRadius: 10,
        height: 45,
        alignItems: "center",
        justifyContent: "center"
      }
})


export default Foster;