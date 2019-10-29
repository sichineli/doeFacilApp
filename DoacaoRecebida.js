import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView, FlatList, Image } from 'react-native';
import { Container, Button, Header, Left, Right, ListItem, List } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from "react-native-firebase";



class DoacaoRecebida extends Component {

    state = {
        item: [],
        name:''
    }
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.getDados();
        this.getName();
    }
  
    getName = async () => {
        const { uid } = firebase.auth().currentUser
        const name = await firebase.firestore().collection("doador").where("uid", "==", uid)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    console.log(doc.data())
                    
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }
    
    getDados = async () => {
        let item = []

        const collections = await firebase.firestore().collection('item').get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {

                    item.push(doc.data())

                });

            })
            .catch(function (error) {
                console.log("Error", error);
            });

        this.setState({ item })
    }

    render() {
        return (

            <Container>
                <ScrollView>
                    <Header androidStatusBarColor={'grey'} style={{ backgroundColor: '#0069cc' }}>
                        <Left>
                            <Button iconLeft transparent>
                                <Icon name='arrow-left' style={styles.iconMenuCabecalho} onPress={() => this.props.navigation.navigate('HomeInstituicao')} />
                            </Button>
                        </Left>
                        <Text style={styles.txtCab}> Doações Recebidas </Text>
                        <Right></Right>
                    </Header>
                    <FlatList
                        data={this.state.item}
                        renderItem={({ item }) => <ListItem>
                            <>
                                <Image
                                    style={{ width: 100, height: 90 }}
                                    source={{ uri: item.urlImage }}
                                />
                                <Text style={styles.lista}> {item.descricao} </Text>
                                <Text style={styles.lista}> {item.Nome} </Text>
                            </>


                        </ListItem>}
                        keyExtractor={item => item.doador}

                    />


                </ScrollView>
            </Container>

        )
    }
}




const styles = StyleSheet.create({


    iconMenuCabecalho: {
        fontSize: 20,
        color: 'white'
    },



    txtCab: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 12

    }

});


export default DoacaoRecebida;