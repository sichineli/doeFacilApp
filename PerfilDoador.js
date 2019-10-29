import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Container, Button, Header, Left, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from "react-native-firebase"



class PerfilDoador extends Component {

    state = {
        Nome: '',
        Cpf: '',
        Endereco: '',
        Cidade: '',
        Estado: '',
        Cep: '',
        Bairro: '',
        Telefone: '',
        Email: '',
       
        
    }
    componentDidMount() {
        const { navigation } = this.props;
        //Função que carrega toda vez que a tela é focada.
        this.focusListener = navigation.addListener('didFocus', () => {
            this.getDados();
        }); 

    } 
    getDados = async () => {
        const { uid } = firebase.auth().currentUser

        const collections = await firebase.firestore().collection('doador').doc(uid).get();
        const { 
            Nome,
            Cpf,
            Endereco,
            Cidade,
            Estado,
            Cep,
            Bairro,
            Telefone,
            Email,
             } = collections.data();

        this.setState({
            Nome,
            Cpf,
            Endereco,
            Cidade,
            Estado,
            Cep,
            Bairro,
            Telefone,
            Email,
            
            
        })
    }



    render() {

        return (

            <Container>
                <ScrollView>
                    <Header androidStatusBarColor={'grey'} style={{ backgroundColor: '#0069cc' }}>
                        <Left>
                            <Button iconLeft transparent>
                                <Icon name='arrow-left' style={styles.iconMenuCabecalho} onPress={() => this.props.navigation.navigate('HomeDoador')} />
                            </Button>
                        </Left>
                        <Text style={styles.txtCab}> Meu Cadastro </Text>
                        <Right></Right>
                    </Header>

                    <View style={styles.container}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome"
                            underlineColorAndroid="#0069cc"
                            editable={false}
                            value={this.state.Nome}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder="CPF"
                            underlineColorAndroid="#0069cc"
                            editable={false}
                            value={this.state.Cpf}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Endereco"
                            underlineColorAndroid="#0069cc"
                            editable={false}
                            value={this.state.Endereco}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Cidade"
                            underlineColorAndroid="#0069cc"
                            editable={false}
                            value={this.state.Cidade}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Estado"
                            underlineColorAndroid="#0069cc"
                            editable={false}
                            value={this.state.Estado}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder="CEP"
                            underlineColorAndroid="#0069cc"
                            editable={false}
                            value={this.state.Cep}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Bairro"
                            underlineColorAndroid="#0069cc"
                            editable={false}
                            value={this.state.Bairro}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Telefone"
                            underlineColorAndroid="#0069cc"
                            editable={false}
                            value={this.state.Telefone}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            underlineColorAndroid="#0069cc"
                            editable={false}
                            value={this.state.Email}

                        />

                        
                       
                        <Button style={styles.button}
                            onPress={() => this.props.navigation.navigate('AlteracaoPerfilDoador')}>
                            <Text style={styles.text}>Alterar</Text>
                        </Button>
                    </View>
                </ScrollView>
            </Container>

        )
    }
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',

    },


    iconMenuCabecalho: {
        fontSize: 20,
        color: 'white'
    },

    text: {
        color: "white",
        fontSize: 18,
        fontWeight: 'bold'

    },
    button: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: 150,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#e61a5f',
        backgroundColor: '#e61a5f',
        borderRadius: 1,
        marginTop: 50
    },
    input: {
        width: "90%",
        fontSize: 16,
        padding: 10

    },


    txtCab: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 12

    }

});


export default PerfilDoador;