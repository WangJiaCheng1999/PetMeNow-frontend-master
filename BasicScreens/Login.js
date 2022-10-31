import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
 
import AsyncStorage from '@react-native-async-storage/async-storage';

const signInUrl = "http://petmenowspringboot-env.eba-gbytpf9b.us-west-2.elasticbeanstalk.com:80/pet-me-now/user/sign-in";

const LoginScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');

 
  const passwordInputRef = createRef();
 
  const handleSubmitPress = () => {
    // just for test
    // navigation.navigate('ExpensesOverview');
    // real access backend data
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    // setLoading(true);
    // let dataToSend = {email: userEmail, password: userPassword};
    // let formBody = [];
    // for (let key in dataToSend) {
    //   let encodedKey = encodeURIComponent(key);
    //   let encodedValue = encodeURIComponent(dataToSend[key]);
    //   formBody.push(encodedKey + '=' + encodedValue);
    // }
    // formBody = formBody.join('&');
 
    fetch(signInUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName : userName,
        password : userPassword,
    })
    })
      .then((response) => response.json())
      .then((responseJson) => {

        // If server response message same as Data Matched
        if (responseJson.status.statusCode === 2002) {
          AsyncStorage.setItem('userId', responseJson.responseData.id.toString());
          AsyncStorage.setItem('userName', responseJson.responseData.userName);
          // console.log(responseJson.responseData.id.toString());
          navigation.navigate('ExpensesOverview');
        } else {
          alert("The password is wrong!")
        }
      })
      .catch((error) => {
        //Hide Loader
        // setLoading(false);
        console.error(error);
      });
  };
 
  return (
    <View style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
                <Text
                    style={{
                        fontSize:40,
                        fontWeight:'bold',
                        color:'white'
                    }}
                >Pet Me Now</Text>
              <Image
                source={require('../assets/loginPage.png')}
                style={{
                  width: '60%',
                  height:200,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
              <Image 
                style={styles.inputIcons}
                source={require('../assets/akar-icons_person.png')}
              />
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserName) =>
                  setUserName(UserName)
                }
                placeholder="Enter Name"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <Image 
                style={styles.inputIcons}
                source={require('../assets/carbon_password.png')}
              />
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
                placeholder="Enter Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}
              >
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('Register')}>
              New Here ? Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;
 
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#74C8DB',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    backgroundColor:'#ACE7F4',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  buttonStyle: {
    backgroundColor: 'white',
    borderWidth: 0,
    color: 'black',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: 'gray',
    paddingVertical: 11,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: '#6f747d',
  },
  inputIcons: {
    marginTop: 9,
    marginRight: 5,
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textDecorationLine : 'underline',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
