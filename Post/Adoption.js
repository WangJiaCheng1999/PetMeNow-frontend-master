import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Adoption = ({navigation}) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState("");
    const [vacciated, setVacciaton] = useState("");
    const [description, setDescription] = useState("");

    var num = function(str) {
        var patrn = /^[0-9]{1,20}$/;
        var bool = true;
        if (!patrn.exec(str)) {
            bool = false;
        }
        return bool;
    }

    const submit = async () => {
        if (name == "") {
          Alert.alert('Please input pet name!');
          return;
        } else if (name.length > 50) {
            Alert.alert('Name too long!');
            return;
        }

        if (type == "") {
          Alert.alert('Please input pet type!');
          return;
        }
        
        if (breed == "") {
          Alert.alert('Please input pet breed!');
          return;
        }

        if (age == "") {
          Alert.alert('Please input pet age!');
          return;
        } else if (!num(age)) {
            Alert.alert('Age must be number!');
            return;
        }

        if (description == "") {
            Alert.alert('Please input description!');
            return;
        }

        if (vacciated == "") {
            Alert.alert('Please select vaccination status!');
            return;
        }

        const petRegisterUrl = 'http://petmenowspringboot-env.eba-gbytpf9b.us-west-2.elasticbeanstalk.com:80/pet-me-now/pet/register';
        let userId = await AsyncStorage.getItem('userId');
        
        fetch(petRegisterUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                petType: type,
                petBreed: breed,
                age: age,
                vacciated: Boolean(JSON.parse(vacciated)),
                ownerId: userId,
                description: description
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                navigation.navigate('AdoptionDetail', { petId: responseJson.responseData.id });
                console.log(responseJson);
            });
        
        // navigation.navigate('AdoptionDetail', { petId: 1 });
    }

    return(
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='padding' enabled>
                <ScrollView>
                    <Text style={styles.topLine}>Step 1 - Register Your Pet</Text>
                    <View style={styles.row}>
                        <Text style={{color:'red',marginRight:5}}>*</Text>
                        <Text style={{color:'#744E20'}}>Pet Name:</Text>
                        <TextInput style={styles.inputext} placeholder="No more than 50 words" value={name} onChangeText={(text) =>{
                            setName(text);
                        }}></TextInput>
                    </View>
                    <View style={styles.row}>
                        <Text style={{color:'red',marginRight:5}}>*</Text>
                        <Text style={{color:'#744E20'}}>Pet Type:</Text>
                        <TextInput style={styles.inputext} value={type} onChangeText={(text) =>{
                            setType(text);
                        }}></TextInput>
                    </View>
                    <View style={styles.row}>
                        <Text style={{color:'red',marginRight:5}}>*</Text>
                        <Text style={{color:'#744E20'}}>Pet Breed:</Text>
                        <TextInput style={styles.inputext} value={breed} onChangeText={(text) =>{
                            setBreed(text);
                        }}></TextInput>
                    </View>
                    <View style={styles.row}>
                        <Text style={{color:'red',marginRight:5}}>*</Text>
                        <Text style={{color:'#744E20'}}>Age:</Text>
                        <TextInput style={styles.inputext} value={age} onChangeText={(text) =>{
                            setAge(text);
                        }}></TextInput>
                    </View>
                    <View style={styles.row1}>
                        <Text style={{color:'red',marginRight:5}}>*</Text>
                        <Text style={{color:'#744E20'}}>Description:</Text>
                        <TextInput style={styles.detailArea} placeholder="No more than 300 words" value={description} onChangeText={(text) =>{
                            setDescription(text);
                        }}></TextInput>
                    </View>
                    <View style={styles.row}>
                        <Text style={{color:'red',marginRight:5}}>*</Text>
                        <Text style={{color:'#744E20'}}>Vaccination Status:</Text>
                        <TextInput style={styles.inputext} placeholder="Please select vaccination status." value={vacciated} onChangeText={(text) =>{
                            // setVacciaton(text);
                        }}></TextInput>
                    </View>
                    <Picker
                        selectedValue = {vacciated}
                        onValueChange = {(itemValue, itemIndex) =>
                            setVacciaton(itemValue)
                        }>
                        <Picker.Item label='Vacciated' value={'true'} />
                        <Picker.Item label='Not Vaccinated' value={'false'}/>
                    </Picker>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity onPress={()=>{
                        submit();
                    }}>
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
    topLine: {
        fontSize: 24,
        textAlign: 'center',
        color: '#D35400',
        backgroundColor: '#58D68D',
        fontFamily: 'Larissa'
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
        marginTop: 10,
        width: 100,
        backgroundColor: "#744E20",
        textAlign: "center",
        borderRadius: 10,
        height: 45,
        alignItems: "center",
        justifyContent: "center"
      }
})

export default Adoption;
