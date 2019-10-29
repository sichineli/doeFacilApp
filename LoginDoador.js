import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import { Container, Button, Header, Left, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from "react-native-firebase"

class LoginDoador extends Component {


     state = {
        email: "",
        senha: "",
    }

    login = async () => {
        const { email, senha } = this.state
       
        try {
          if (email === "" || senha === "") {
            const mesagemErro = "Preencha todos os campos corretamente";
            return alert(mesagemErro);
         }
         else{
             await firebase
            .auth()
            .signInWithEmailAndPassword(email, senha)
            .then(() => this.props.navigation.navigate("HomeDoador")
            )
            .catch((error) => {
                let mesagemErro = "Erro ao tentar conectar, verifique sua conexão com a internet, se o error persistir contate o desenvolvedor"
                if (error.code === "auth/wrong-password") {
                    mesagemErro = "Email ou senha inválido";
                } else if (error.code === "auth/user-disabled") {
                    mesagemErro = "Usuario desativado, solicite o ativamento da conta";
                } else if (error.code === "auth/invalid-email") {
                    mesagemErro = "Email inválido";
                } else if (error.code === "auth/user-not-found") {
                    mesagemErro = "Email ou senha inválido";
                }
                 return alert(mesagemErro);
            }
            );
        
         }
        } catch {
          const mesagemErro = "Erro ao tentar conectar, verifique sua conexão com a internet";
        alert(mesagemErro);
        }

    }

   
    render() {
        return (

            <Container>
                  <ScrollView style={styles.scroll}>
                    <Header androidStatusBarColor={'grey'} style={{ backgroundColor: '#0069cc' }}>
                        <Left>
                            <Button iconLeft transparent>
                                <Icon name='arrow-left' style={styles.iconMenuCabecalho} onPress={() => this.props.navigation.goBack()} />
                            </Button>
                        </Left>
                        <Text style={styles.txtCab}>Login Doador</Text>
                        <Right></Right>
                    </Header>
                    <View style={styles.container}>


                        <Image style={styles.logo} source={require('./donation.png')} />

                        <TextInput
                            style={styles.input}

                            placeholder="Digite seu email"
                            value={this.state.email}
                            onChangeText={email => this.setState({ email })}
                        />
                        <TextInput

                            style={styles.input}

                            placeholder="Digite sua senha"
                            value={this.state.senha}
                            secureTextEntry={true}
                            onChangeText={senha => this.setState({ senha })}
                        />
                        <Button style={styles.btnEntrar} onPress={this.login}>
                            <Text style={styles.text}>Entrar</Text>
                        </Button>
                      
                        <Button style={styles.btnCadastrar} onPress={() => this.props.navigation.navigate('CadastroDoador')}>
                            <Text style={styles.text}>Cadastre-se</Text>
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
        backgroundColor: '#0069cc',
        marginTop: 0
    },

    scroll: {
        backgroundColor: '#0069cc',

    },

    iconMenuCabecalho: {
        fontSize: 20,
        color: 'white'
    },
    btnEntrar: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: 300,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#e61a5f',
        backgroundColor: '#e61a5f',
        borderRadius: 8,


    },
    btnCadastrar: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: 150,
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#e61a5f',
        backgroundColor: '#e61a5f',
        borderRadius: 8,
        marginTop: 15
    },

    input: {
        width: 300,
        padding: 10,
        fontSize: 16,
        color: "black",
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: '#0069cc',
        borderRadius: 8,
        marginTop: 8
    },
    text: {
        color: "white",
        fontSize: 18,
        fontWeight: 'bold'
    },

    txtCadastrar: {
        color: "white",
        fontSize: 18,
        fontWeight: 'bold'

    },
    txtCab: {
        color: 'white',
        fontSize: 20,

        alignSelf: 'center',
        marginTop: 12

    },


    logo: {
        height: 150,
        width: 150,
        marginTop: 50,
        marginBottom: 40
    }
});

export default LoginDoador;