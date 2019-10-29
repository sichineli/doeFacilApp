import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, Image } from 'react-native';
import { Container, Button, Header, Left, Right, ListItem, List } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from "react-native-firebase";



class DoacaoRecebida extends Component {

    state = {
        item: [],
        name: '',
        instituicao: []
    }
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {

            this.getDados();

        });

    }


    getDados = async () => {
        let item = []
        const { uid } = firebase.auth().currentUser
        const instituicao = await firebase.firestore().collection('instituicao').doc(uid).get();
        let data2 = instituicao.data()

        const collections = await firebase.firestore().collection('item').orderBy("doador").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {

                    let data = doc.data()
                    console.log('DOC', data)
                    if (data.cnpjInstituicao == data2.Cnpj) {
                        item.push(doc.data())
                    }


                });

            })
            .catch(function (error) {
                console.log("Error", error);
            });

        this.setState({ item })
    }
    render() {
        console.log('state', this.state)
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
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.lista}> {item.descricao} </Text>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={styles.qtd}>Quantidade:</Text>
                                        <Text style={styles.lista3}> {item.quantidade} </Text>
                                    </View>
                                    <Text style={styles.lista2}> {item.doador} </Text>
                                    <Text style={styles.lista2}> {item.telefoneDoador} </Text>
                                </View>
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

    qtd: {
        fontSize: 15,
        color:'blue',
        fontWeight:'bold',
        textAlign: 'center',
        paddingTop:40
    },
    txtCab: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 12

    },

    lista:
    {

        fontSize: 20,
        color: "red",
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
    },

    lista2:
    {

        fontSize: 15,
        color: "black",
        fontWeight: 'bold',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',

        marginTop: 20
    },
    lista3:{
        fontSize: 15,
        color: "red",
        fontWeight: 'bold',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',


    }
});


export default DoacaoRecebida;