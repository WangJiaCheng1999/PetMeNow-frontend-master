import { Component } from 'react';
import { Image, FlatList, StyleSheet, Text, View, RefreshControl } from 'react-native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

// -------------------------------------------------------------------------------------
// topline: type(statues)
// title: title
// duration: durationNumber + duratonType
// -------------------------------------------------------------------------------------
//                             | firstLine: name(age) / firstName + lastName(userName)
// image: petImage / userImage | secondLine: petType(petBreed) / email(phoneNumber)
//                             | thirdLine: description / allowedPets
// -------------------------------------------------------------------------------------

const Color = {
    backgroundColor: '#74C8DB'
};

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            refresh: false
        };
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        let userId = await AsyncStorage.getItem('userId');
        let historyUrl = "http://petmenowspringboot-env.eba-gbytpf9b.us-west-2.elasticbeanstalk.com:80/pet-me-now/history/user/" + userId;   

        fetch(historyUrl)
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.status.statusCode == '2014') {
                this.setState({
                    data: [],
                    loaded: true
                });
            } else {
                userDetails = responseJson.responseData.userDetails;
                orderDetails = responseJson.responseData.orderDetails;

                orderDetails.forEach(item => {
                    let template = {};

                    template.id = item.id;
                    
                    if (item.status == "REQUESTED") {
                        template.topLine = item.type + " - " + item.status;
                    } else {
                        template.topLine = item.type + " - " + item.status + " by " + item.acceptedUserDetails.firstName + " " + item.acceptedUserDetails.lastName + " (" + item.acceptedUserDetails.userName + ")";
                    }
                    
                    template.title = item.title;
                    template.duration = moment(parseInt(item.startDate)).format("YYYY-MM-DD HH:mm:ss") + " - " + moment(parseInt(item.endDate)).format("YYYY-MM-DD HH:mm:ss") + " (" + item.durationNumber + " " + item.durationType + ")";
                    
                    if (item.type == "ADOPTION") {
                        template.image = item.petDetails.image;
                        template.firstLine = item.petDetails.name + " (" + item.petDetails.age + " years old)";
                        template.secondLine = item.petDetails.petType + " (" + item.petDetails.petBreed + ")";
                        template.thirdLine = item.petDetails.description;
                    } else {
                        template.image = userDetails.image;
                        template.firstLine = userDetails.firstName + " " + userDetails.lastName + " (" + userDetails.userName + ")";
                        template.secondLine = "Contact: " + userDetails.eamil + " / " + userDetails.phoneNumber;
                        template.thirdLine = "Preferred types of pets: " + item.allowedPets;
                    }

                    this.setState({
                        data: this.state.data.concat(template),
                        loaded: true
                    });
                });
            }
        });
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        if (this.state.data == '') {
            return this.renderEmptyView();
        }

        return (
            <FlatList
                data={this.state.data}
                renderItem={({ item }) =>
                    <View styles={styles.container}>
                        <Text style={styles.topLine}> {item.topLine} </Text>
                        <Text style={styles.title}> {item.title} </Text>
                        <Text style={styles.duration}> {item.duration} </Text>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: item.image }} style={styles.image}></Image>
                            <View style={styles.imageInfo}>
                                <Text style={styles.firstLine}> {item.firstLine} </Text>
                                <Text style={styles.secondLine}> {item.secondLine} </Text>
                                <Text style={styles.thirdLine}> {item.thirdLine} </Text>
                            </View>
                        </View>
                    </View>
                }
                refreshControl={
                    <RefreshControl
                        title={'Loading...'}
                        refreshing={this.state.refresh}
                        onRefresh={() => {
                            this.state.data = [];
                            this._onRefresh();
                        }}
                    />
                }
                refreshing={this.state.refresh}
                style = {styles.list}
                keyExtractor = {item => item.id}
            />
        );
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>loading...</Text>
            </View>
        );
    }

    renderEmptyView() {
        return (
            <View style={styles.container}>
                <Text>You do not have any transactions yet.</Text>
            </View>
        );
    }

    _onRefresh() {
        if (!this.state.refresh) {
            this.fetchData()
        }
    }
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: Color.backgroundColor
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        flex: 1,
        backgroundColor: Color.backgroundColor
    },
    topLine: {
        fontSize: 20,
        textAlign: 'center',
        color: '#D35400',
        backgroundColor: '#58D68D',
        fontFamily: 'Larissa'
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        color: '#F7DC6F',
        backgroundColor: '#5DADE2',
        fontFamily: 'MilkyHoney'
    },
    duration: {
        fontSize: 14,
        textAlign: 'center',
        color: 'blue',
        backgroundColor: '#76D7C4',
        fontFamily: 'Fasthand-Regular'
    },
    imageContainer: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginBottom: 20,
        backgroundColor: '#2E86C1'
    },
    image: {
        width: 100,
        height: 100
    },
    imageInfo: {
        marginVertical: 10,
        marginLeft: 10,
        flex: 1,
    },
    firstLine: {
        fontSize: 14,
        marginBottom: 10,
        fontWeight: 'bold',
        fontFamily: 'Cochin',
        color: '#F2F3F4'
    },
    secondLine: {
        fontSize: 14,
        marginBottom: 10,
        fontWeight: 'bold',
        fontFamily: 'Cochin',
        color: '#F2F3F4'
    },
    thirdLine: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Cochin',
        color: '#F2F3F4'
    }
})

export default History;
