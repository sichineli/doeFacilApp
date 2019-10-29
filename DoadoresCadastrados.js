import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Container, Button, Header, Left, Right, ListItem } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from "react-native-firebase";

class DoadoresCadastrados extends Component {


    state = {
        doador: []
    }
    constructor(props) {

        super(props)
    }
    componentDidMount() {
        this.getDados();
    }
    getDados = async () => {
        let doador = []

        const collections = await firebase.firestore().collection('doador').orderBy("Nome").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {

                    doador.push(doc.data())

                });

            })
            .catch(function (error) {
                console.log("Error", error);
            });

        this.setState({ doador: doador })
    }

    render() {
       console.log(this.props) 
        return (

            <Container>
                <ScrollView>
                    <Header androidStatusBarColor={'grey'} style={{ backgroundColor: '#0069cc' }}>
                        <Left>
                            <Button iconLeft transparent>
                                <Icon name='arrow-left' style={styles.iconMenuCabecalho} onPress={() => this.props.navigation.navigate('HomeInstituicao')} />
                            </Button>
                        </Left>
                        <Text style={styles.txtCab}> Doadores Cadastrados </Text>
                        <Right>
                    
                        </Right>
                    </Header>

                    <FlatList style={{ backgroundColor: 'grey' }}
                        data={this.state.doador}
                        renderItem={({ item }) => <ListItem selected>
                          <Text style={styles.lista} > {item.Nome} {item.Telefone}
                  
                            </Text>
                        </ListItem>}
                        keyExtractor={item => item.Cpf}
                        
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

    lista: {
        fontSize: 19,
        color:"white",
        
    },

    txtCab: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 12
        
    }

});


export default DoadoresCadastrados;