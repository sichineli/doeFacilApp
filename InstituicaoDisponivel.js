import React, { Component } from 'react';
import {  Text, StyleSheet, ScrollView, FlatList,Image } from 'react-native';
import { Container, Button, Header, Left, Right, ListItem, List } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from "react-native-firebase";
import { withNavigation } from 'react-navigation';

class InstituicaoDisponivel extends Component {

    
    state = {
        instituicoes: []
    }
    constructor(props) {

        super(props)
    }
    componentDidMount() {
        this.getDados();
    }
    getDados = async () => {
        let instituicoes = []

        const collections = await firebase.firestore().collection('instituicao').get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {

                    instituicoes.push(doc.data())

                });

            })
            .catch(function (error) {
                console.log("Error", error);
            });

        this.setState({ instituicoes: instituicoes })
    }

    render() {
       console.log(this.props) 
        return (

            <Container>
                <ScrollView>
                    <Header androidStatusBarColor={'grey'} style={{ backgroundColor: '#0069cc' }}>
                        <Left>
                            <Button iconLeft transparent>
                                <Icon name='arrow-left' style={styles.iconMenuCabecalho} onPress={() => this.props.navigation.navigate('HomeDoador')} />
                            </Button>
                        </Left>
                        <Text style={styles.txtCab}> Instituições Disponiveis </Text>
                        <Right></Right>
                    </Header>

                    <FlatList
                        data={this.state.instituicoes}
                        renderItem={({ item }) => <ListItem>
                            
                            <Image
                                style={{ width: 80, height: 80 }}
                                source={{ uri: item.urlImage }}
                            />
                          <Text style={styles.lista}  onPress={() => this.props.navigation.navigate('Item')}> 
                          {item.RazaoSocial}
                         </Text>
                        </ListItem>}
                        keyExtractor={item => item.Cnpj}
                        
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
        fontSize: 20,

    },

    txtCab: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 12

    }

});


export default withNavigation(InstituicaoDisponivel);