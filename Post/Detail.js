
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions,  TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import Swiper from 'react-native-swiper';
import moment from 'moment';
import { isTemplateExpression } from 'typescript';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Detail = (props) => {
    
    const accept = async () => {
        const acceptUrl = "http://petmenowspringboot-env.eba-gbytpf9b.us-west-2.elasticbeanstalk.com:80/pet-me-now/order/accept";
        let userId = await AsyncStorage.getItem('userId');
        fetch(acceptUrl, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            userId: userId,
            orderId: detail.id

        })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                // navigation.navigate('Mainpage');
            });
        Alert.alert('Request Success!');


      }
    
    
    
    console.log("props.route", props.route);
    const [detail, setDetail] = useState(props.route.params);   
    return(
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='padding' enabled>
                <View>
                    {/* {
                        detail.Petdetails.image ? <View style={{ height: 300, backgroundColor: "#000" }}>
                            <Swiper style={{ height: 300, backgroundColor: "#000" }} loop={true} showsPagination={true}>

                                {
                                    detail.images.map((item, i) => (
                                        <View style={{ height: 300, backgroundColor: "#000" }}>
                                            <Image style={{ width: windowWidth, height: 300, marginLeft: 10 }} resizeMode="cover" source={{ uri: item.uri }}></Image>
                                        </View>
                                ))
                                }

                            </Swiper>
                        </View> : <></>
                    }    */}

                    <View>
                        <View style={styles.row}>
                            <Text style={{color:'red',marginRight:5}}> </Text>
                            <Text style={{color:'#744E20'}}>Title:</Text>
                            <Text style={{paddingLeft:10}}>{detail.title}</Text>
                        </View>
                         <View style={styles.row}>
                            <Text style={{color:'red',marginRight:5}}> </Text>
                            <Text style={{color:'#744E20'}}>Type:</Text>
                            <Text style={{paddingLeft:10}}>{detail.type}</Text>
                        </View> 
                        <View style={styles.row}>
                            <Text style={{color:'red',marginRight:5}}> </Text>
                            <Text style={{color:'#744E20'}}>Allowed Pets:</Text>
                            <Text style={{paddingLeft:10}}>{detail.allowedPets}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={{color:'red',marginRight:5}}> </Text>
                            <Text style={{color:'#744E20'}}>Contact:</Text>
                            <TouchableOpacity onPress ={()=>Alert.alert('Contact with him or her')}>
                                <Text style={{paddingLeft:10, textDecorationLine:'underline'}}>{detail.userDetails.userName}</Text>
                            </TouchableOpacity>


                            {/* <Text style={{paddingLeft:10, textDecorationLine:'underline'}}>{detail.userDetails.userName}</Text> */}
                        </View>
                        <View style={styles.row}>
                            <Text style={{color:'red',marginRight:5}}> </Text>
                            <Text style={{color:'#744E20'}}>Duration:</Text>
                            <Text style={{paddingLeft:10}}>{detail.durationNumber} {detail.durationType}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={{color:'red',marginRight:5}}> </Text>
                            <Text style={{color:'#744E20'}}>Start date:</Text>
                            <Text style={{paddingLeft:10}}>{moment(parseInt(detail.startDate)).format("YYYY-MM-DD")}</Text>
                        </View> 
                    </View>
                </View>
            </KeyboardAvoidingView>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity onPress={()=>{accept();}}>
                        <View style={styles.button}>
                            <Text style={{ fontSize: 17, color: "#fff" }}>Accept</Text>
                        </View>
                    </TouchableOpacity>
            </View>
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
        paddingVertical: 20,
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




export default Detail;