import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, ToastAndroid } from 'react-native';
import { Container, Button, Header, Left, Right } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome5'
import firebase from "react-native-firebase"


class CadastroDoador extends Component {

  static navigationOptions = {
        drawerLabel: () => null,
        drawerLockMode: "locked-closed", //->Impede de abrir o Drawer na lateral
        header: null
    }

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
        Senha: '',
        message: ""
    }

    cadastrar = async () => {
        try {
            const usercadastradoDoador = await firebase.auth()
                .createUserWithEmailAndPassword(this.state.Email, this.state.Senha)
            this.props.navigation.navigate('LoginDoador')

            const { uid } = firebase.auth().currentUser


            const {Nome,
                Cpf,
                Endereco,
                Cidade,
                Estado,
                Cep,
                Bairro,
                Telefone,
                Email,
                Senha,
                message } = this.state

            const salvandoDadosDoDoador = await firebase.
                firestore().collection("doador").doc(uid).set({

                    Nome,
                    Cpf,
                    Endereco,
                    Cidade,
                    Estado,
                    Cep,
                    Bairro,
                    Telefone,
                    Email,
                    Senha,
                    message: "",


                })
            ToastAndroid.show('Cadastro realizado com sucesso!', ToastAndroid.SHORT)

            console.log(salvandoDadosDoDoador)
        }
        catch (error) {
            this.setState({ message: this.getMessageByErrorCode(error.code) });
            console.log(error)
        }

    }


    //Função que trata erro dos campos email e senha do cadastro 
    getMessageByErrorCode(errorCode) {
        console.log(errorCode)
        switch (errorCode) {
            case 'auth/weak-password':
                return 'Insira uma senha válida!';
            case 'auth/invalid-email':
                return 'Insira um e-mail válido!';
            case 'auth/email-already-in-use':
                return 'E-mail informado já está em uso!';

        }
    }
    renderMessage() {
        const { message } = this.state;
        if (!message)
            return null;
        return (
            <View>
                <Text style={{ color: 'red', textAlign: 'center', marginTop: 10, marginBottom: 10 }}>{message}</Text>
            </View>
        );
    }

    static navigationOptions = {
        drawerLabel: () => null,
        drawerLockMode: "locked-closed", //->Impede de abrir o Drawer na lateral
        header: null
    }

    render() {
        return (

            <Container>
                <ScrollView>
                    <Header androidStatusBarColor={'grey'} style={{ backgroundColor: '#0069cc' }}>
                        <Left>
                            <Button iconLeft transparent>
                                <Icon name='arrow-left' style={styles.iconMenuCabecalho} onPress={() => this.props.navigation.goBack()} />
                            </Button>
                        </Left>
                        <Text style={styles.txtCab}>Cadastro Doador</Text>
                        <Right></Right>
                    </Header>

                    <View style={styles.container}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome Completo*"
                            underlineColorAndroid="#0069cc"
                            onChangeText={Nome => this.setState({ Nome })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="CPF*"
                            keyboardType='numeric'
                            underlineColorAndroid="#0069cc"
                            onChangeText={Cpf => this.setState({ Cpf })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Endereco*"
                            underlineColorAndroid="#0069cc"
                            onChangeText={Endereco => this.setState({ Endereco })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Cidade*"
                            underlineColorAndroid="#0069cc"
                            onChangeText={Cidade => this.setState({ Cidade })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Estado*"
                            underlineColorAndroid="#0069cc"
                            onChangeText={Estado => this.setState({ Estado })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="CEP*"
                            keyboardType="numeric"
                            underlineColorAndroid="#0069cc"
                            onChangeText={Cep => this.setState({ Cep })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Bairro*"
                            underlineColorAndroid="#0069cc"
                            onChangeText={Bairro => this.setState({ Bairro })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Telefone*"
                            maxLength={11}
                            keyboardType="phone-pad"
                            underlineColorAndroid="#0069cc"
                            onChangeText={Telefone => this.setState({ Telefone })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email*"
                            underlineColorAndroid="#0069cc"
                            keyboardType='email-address'
                            onChangeText={Email => this.setState({ Email })}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Senha*  (Mínimo de 6 caracteres)"
                            underlineColorAndroid="#0069cc"
                            secureTextEntry={true}
                            onChangeText={Senha => this.setState({ Senha })}
                        />
                        {this.renderMessage()}
                        <Button style={styles.btnSalvar} onPress={this.cadastrar}>
                            <Text style={styles.txtSalvar} >Salvar</Text>
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


    input: {
        width: "90%",
        fontSize: 16,
        padding: 10

    },

    btnSalvar: {
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
    txtSalvar: {
        color: "white",
        fontSize: 18,
        fontWeight: 'bold'


    },

    txtCab: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',

        marginTop: 12

    },

});

export default CadastroDoador;