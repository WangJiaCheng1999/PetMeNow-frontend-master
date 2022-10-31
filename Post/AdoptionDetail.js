import React, { useState } from 'react';
import { StyleSheet, Image, Text, ScrollView, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-modern-datepicker';
import moment from "moment";

const AdoptionDetail = (props) => {
    const [title, setTitle] = useState("");
    const [duration, setDuration] = useState("");
    const [durationType, setDurationType] = useState("");
    const [image, setImage] = useState("");
    const [selectedDate, setSelectedDate] = useState('');

    const petId = props.route.params.petId;
    const petImageUrl = 'http://petmenowspringboot-env.eba-gbytpf9b.us-west-2.elasticbeanstalk.com:80/pet-me-now/pet/upload-image/' + petId;

    const pickImage = async () => {
        result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
                
        let formData = new FormData();
        formData.append('file', {
            name: 'avatar.jpg',
            type: 'image/jpg',
            uri: result.uri
        });

        fetch(petImageUrl, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
        })
        .then((response) => response.text())
        .then((responseText) => {
            if (responseText.search('2011') === -1) {
                Alert.alert("Please choose a smaller picture!");
            } else {
                setImage(result.uri);
            }
        });
    };

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
          Alert.alert('Please input title!');
          return;
        } else if (title.length > 50) {
            Alert.alert('Title too long!');
            return;
        }

        if (duration == "") {
          Alert.alert('Please input duration!');
          return;
        } else if (!num(duration)) {
            Alert.alert('Duration must be numbers!');
            return;
        }

        if (selectedDate == "") {
            Alert.alert('Please select start date!');
            return;
        }

        if (durationType == "") {
            Alert.alert('Please Select duration type!');
            return;
        }
        
        const orderUrl = 'http://petmenowspringboot-env.eba-gbytpf9b.us-west-2.elasticbeanstalk.com:80/pet-me-now/order/request';
        let userId = await AsyncStorage.getItem('userId');
        
        fetch(orderUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                petId: petId,
                type: "ADOPTION",
                title: title,
                startDate: moment(selectedDate).valueOf(),
                durationNumber: duration,
                durationType: durationType
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            });
        Alert.alert('Success!');
        props.navigation.navigate('Mainpage');
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='padding' enabled>
                <ScrollView>
                    <Text style={styles.topLine}>Step 2 - Post Adoptions</Text>
                    <View style={styles.img}>
                        <TouchableOpacity onPress={() => { pickImage(); }}>
                            <View style={styles.inital}>
                                <Ionicons name="add-outline" color={"#744E20"} size={60}></Ionicons>
                            </View>
                        </TouchableOpacity>
                        <ScrollView style={{ flex: 1 }} >
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image style={{ width: 80, height: 80, marginLeft: 10 }} resizeMode="cover" source={{ uri: image }}></Image>
                            </View>
                        </ScrollView>
                    </View>
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
                        <TextInput style={styles.inputext} placeholder="Please select start time." value={selectedDate} onChangeText={(text) =>{
                            // setSelectedDate(text);
                        }}></TextInput>
                    </View>
                    <DatePicker
                        options={{
                            backgroundColor: '#37A3E7',
                            textHeaderColor: '#FFA25B',
                            textDefaultColor: '#F6E7C1',
                            selectedTextColor: '#fff',
                            mainColor: '#F4722B',
                            textSecondaryColor: '#D6C7A1',
                            borderColor: 'rgba(122, 146, 165, 0.1)',
                        }}
                        onSelectedChange={date => setSelectedDate(date)}
                    />
                    <View style={styles.row}>
                        <Text style={{color:'red',marginRight:5}}>*</Text>
                        <Text style={{color:'#744E20'}}>Duration:</Text>
                        <TextInput style={styles.inputext} value={duration} onChangeText={(text) =>{
                            setDuration(text);
                        }}></TextInput>
                    </View>
                    <View style={styles.row}>
                        <Text style={{color:'red',marginRight:5}}>*</Text>
                        <Text style={{color:'#744E20'}}>Duration type:</Text>
                        <TextInput style={styles.inputext} placeholder="Please select duration type."  value={durationType} onChangeText={(text) =>{
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

export default AdoptionDetail;
