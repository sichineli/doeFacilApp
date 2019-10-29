import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView,ToastAndroid } from 'react-native';
import { Container, Button, Header, Left, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from "react-native-firebase"



class AlteracaoPerfilDoador extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Nome: '',
            Cpf: '',
            Endereco: '',
            Cidade: '',
            Estado: '',
            Cep:  '',
            Bairro: '',
            Telefone: '',
            Email:'',
            
        }
    }
    componentDidMount() {
        this.getDados();
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
            Email
            
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
            Email
           
        })
    }

    alterar = async () => {

        try {
            const { uid } = firebase.auth().currentUser
            const alterandoDadosDoDoador = await firebase.
                firestore().collection("doador").doc(uid).set({

                    Nome: this.state.Nome,
                    Cpf: this.state.Cpf,
                    Endereco: this.state.Endereco,
                    Cidade: this.state.Cidade,
                    Estado: this.state.Estado,
                    Cep: this.state.Cep,
                    Bairro: this.state.Bairro,
                    Cidade: this.state.Cidade,
                    Telefone:this.state.Telefone,
                    Email: this.state.Email,
                   
                    
                })
            ToastAndroid.show('Cadastro realizado com sucesso!', ToastAndroid.SHORT)
            this.props.navigation.navigate('PerfilDoador')
            console.log(alterandoDadosDoDoador)
        }
        catch (error) {
            console.log(error)
        }

    }
    render() {

        return (

            <Container>
                <ScrollView>
                    <Header androidStatusBarColor={'grey'} style={{ backgroundColor: '#0069cc' }}>
                        <Left>
                            <Button iconLeft transparent>
                                <Icon name='arrow-left' style={styles.iconMenuCabecalho} onPress={() => this.props.navigation.navigate('PerfilDoador')} />
                            </Button>
                        </Left>
                        <Text style={styles.txtCab}> Alteração Perfil </Text>
                        <Right></Right>
                    </Header>

                    <View style={styles.container}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome"
                            underlineColorAndroid="#0069cc"
                            value={this.state.Nome}
                            onChangeText={text => this.setState({Nome: text})}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder="CPF"
                            keyboardType="numeric"
                            underlineColorAndroid="#0069cc"
                            value={this.state.Cpf}
                            onChangeText={text => this.setState({Cpf: text})}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Endereco"
                            underlineColorAndroid="#0069cc"
                            value={this.state.Endereco}
                            onChangeText={text => this.setState({Endereco: text})}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Cidade"
                            underlineColorAndroid="#0069cc"
                            value={this.state.Cidade}
                            onChangeText={text => this.setState({Cidade: text})}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Estado"
                            underlineColorAndroid="#0069cc"
                            value={this.state.Estado}
                            onChangeText={text => this.setState({Estado: text})}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder="CEP"
                            underlineColorAndroid="#0069cc"
                            keyboardType="numeric"
                            value={this.state.Cep}
                            onChangeText={text => this.setState({Cep: text})}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Bairro"
                            underlineColorAndroid="#0069cc"
                            value={this.state.Bairro}
                            onChangeText={text => this.setState({Bairro: text})}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Telefone"
                            underlineColorAndroid="#0069cc"
                            keyboardType="phone-pad"
                            value={this.state.Telefone}
                            onChangeText={text => this.setState({Telefone: text})}

                        />
                      
                      <Button style={styles.button} onPress={this.alterar}>
                            <Text style={styles.text} >Salvar</Text>
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


export default AlteracaoPerfilDoador;