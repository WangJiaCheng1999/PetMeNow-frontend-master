import { Component } from 'react'
import React ,{useEffect,useState}from 'react'
import { TextInput } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Text, View, StyleSheet,ScrollView,Image, TouchableOpacity,Dimensions,RefreshControl} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foster from './Foster';
import Detail from './Detail';
import moment from 'moment';
import Detail2 from './Detail2';
import * as storage from "../storage";
import Adoption from './Adoption';
import AdoptionDetail from './AdoptionDetail';
import { async } from '@firebase/util';
import { WatchDirectoryFlags, WatchFileKind } from 'typescript';

const Stack = createNativeStackNavigator();
const {width,height} = Dimensions.get('window')
const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}



const Mainpage = ({navigation}) => {
  const postUrl ='http://petmenowspringboot-env.eba-gbytpf9b.us-west-2.elasticbeanstalk.com/pet-me-now/history/active'
  const [list, setList] = useState([])
  const [key, setKey] = useState("")

  const [refreshing,setRefreshing] = React.useState(false);



  const onRefresh = React.useCallback(()=>{
    setRefreshing(true);
    setList([]);
    getData();
    wait(2000).then(()=>setRefreshing(false));
  },[])

  fetch(postUrl,{
      method:`GET`,
      headers: {
          'Content-Type': 'application/json'
        },   
  })
  .then((response) => response.json())
  .then((responseJson) => {
      setList(responseJson.responseData.activeOrders)
    })


  const getData=async ()=>{

    fetch(postUrl,{
      method:`GET`,
      headers: {
          'Content-Type': 'application/json'
        },   
    })
    .then((response) => response.json())
    .then((responseJson) => {
        setList(responseJson.responseData.activeOrders)
      })

  }
  // const _onRefresh = () => {
  //   //Clear old data of the list
  //   setList([]);
  //   //Call the Service to get the latest data
  //   getData();
  // };


  // useEffect(() => {
  //   load()
  // }, [])

  const load = async() => {
    getData();
    setList(list.filter(item => {
      return item.title.indexOf(key) != -1;
    }))
  }

  return(
        <View style={styles.container}>
            <View style={styles.btn}>
              <TouchableOpacity onPress ={()=>navigation.navigate('Foster')}>
                <Ionicons name='add-circle-outline' color={"#ebeb42"} style={{marginRight:2, marginLeft:5}} size={30}></Ionicons>
              </TouchableOpacity>

              <TouchableOpacity onPress ={()=>navigation.navigate('Adoption')}>
                <Ionicons name='add-circle-outline' color={"#b74043"} style={{marginRight:10, marginLeft:2}} size={30}></Ionicons>
              </TouchableOpacity>


              <View style={styles.searchbar}>
                <Image style={styles.searchicon} resizeMethod='contain' source={require('../assets/search.png')}></Image>
                <TextInput placeholder='search' returnKeyType='search' value={key} onsubmitEditing={()=>{
                  load();
                }} onChangeText ={(text)=>{
                  setKey(text);
                }} style={{flex:1,marginLeft:5}}></TextInput>
              </View>

              <TouchableOpacity onPress ={()=>setKey(null)}>
                <Text style={{marginLeft:10, marginRight:5, color:'#744E20', fontWeight:'bold'}}>Cancel</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={{flexDirection:'column'}}  refreshControl={<RefreshControl title='Loading' refreshing={refreshing} onRefresh={()=>onRefresh}/>}>
              {
                list.map(item => {
                  return <TouchableOpacity onPress={() => {
                    if (item.type =="FOSTER"){
                      navigation.navigate('Detail',item)
                    } else {
                      navigation.navigate('Detail2',item)
                    }
 


                  }}>
                    <View style={{ flexDirection: 'row', paddingVertical: 10, borderBottomColor: "#92a0a3", borderBottomWidth: 1, justifyContent: "space-between",backgroundColor:'#dbf0f4' }}>
                      {
                        item.type=="ADOPTION"? <Image style={{ width: 80, height: 80 }} source={{ uri: item.petDetails.image }}></Image>:<></>
                      }
                      <View style={{ justifyContent: "space-between", paddingLeft: 10, flex: 1 }}>
                        <Text >{item.title}</Text>
                        <View style={{ flexDirection: "row" }}>
                          <Text >Create time:{moment(parseInt(item.startDate)).format("MM-DD")}</Text>
                          <Text style={{ paddingLeft: 10 }}>Duration:{item.durationNumber} {item.durationType}</Text>
                        </View>
                      </View>
                      {
                        item.type =="FOSTER" ? <Image style={{ width: 60, height: 60 }} resizeMode="contain" source={require("../assets/foster.png")}></Image>:<Image style={{ width: 60, height: 60 }} resizeMode="contain" source={require("../assets/adopt.png")}></Image>
                      }
                    </View>
                  </TouchableOpacity>
                })
              }
            </ScrollView>
            <ScrollView style={{height:400, color:'white'}}>

            </ScrollView>
        </View>
    )
}

function Home(){
  return (
      <Stack.Navigator>
          <Stack.Screen name="Mainpage" component={Mainpage} options={{headerShown:false}}/>
          <Stack.Screen name="Detail" screenOptions={{headerShown:false, headerTitle:"Detail"}} component={Detail} options={{headerTitle:"Detail", headerTintColor:'black',headerBackTitleVisible:false}}/>
          <Stack.Screen name="Detail2" screenOptions={{headerShown:false, headerTitle:"Detail2"}} component={Detail2} options={{headerTitle:"Detail", headerTintColor:'black',headerBackTitleVisible:false}}/>
          <Stack.Screen name="Foster" screenOptions={{headerShown:false}} component={Foster} options={{headerTitle:"Foster", headerTintColor:'black',headerBackTitleVisible:false}}/>
          <Stack.Screen name="Adoption" screenOptions={{headerShown:false}} component={Adoption} options={{headerTitle:"Adoption", headerTintColor:'black',headerBackTitleVisible:false}}/>
          <Stack.Screen name="AdoptionDetail" screenOptions={{headerShown:false, headerTitle:"Adoption"}} component={AdoptionDetail} options={{headerTitle:"Adoption", headerTintColor:'black',headerBackTitleVisible:false}}/>
      </Stack.Navigator>
  );
}



const styles = StyleSheet.create({
    searchbar:{
      flex: 1, 
      flexDirection: "row", 
      backgroundColor: "#f2f2f2", 
      justifyContent: "space-between", 
      height: 40, 
      alignItems: "center", 
      borderRadius: 30,
      paddingHorizontal: 10
    },
    container:{
      backgroundColor:'#AADBE4',
      width,
      height

    },
    btn:{
      flexDirection: 'row',
      paddingTop:5,
      alignItems:'center',
      marginBottom:5
    },
    searchicon:{
      width: 20, 
      height: 20,
    },
    inputext:{
      flex: 1, 
      marginLeft: 5
    }
})


export default Home;