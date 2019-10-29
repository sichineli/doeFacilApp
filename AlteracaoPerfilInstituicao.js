import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, ToastAndroid } from 'react-native';
import { Container, Button, Header, Left, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from "react-native-firebase"

class AlteracaoPerfilInstituicao extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Email: '',
            Senha: '',
            RazaoSocial: '',
            NomeFantasia: '',
            Cnpj: '',
            InscricaoEstadual: '',
            Cep: '',
            Endereco: '',
            Bairro: '',
            Cidade: '',
            Telefone: '',
            image: {},
            displayImage: {},
            urlImage: undefined,
            message: '',


        }
    }
    componentDidMount() {
        this.getDados();
    }
    getDados = async () => {
        const { uid } = firebase.auth().currentUser


        const collections = await firebase.firestore().collection('instituicao').doc(uid).get();
        const { Email,
            Senha,
            RazaoSocial,
            NomeFantasia,
            Cnpj,
            InscricaoEstadual,
            Cep,
            Endereco,
            Bairro,
            Cidade,
            Telefone,
            Itens,
            Atividades,
            image,
            displayImage,
            urlImage,
            message, } = collections.data();

        this.setState({
            Email,
            Senha,
            RazaoSocial,
            NomeFantasia,
            Cnpj,
            InscricaoEstadual,
            Cep,
            Endereco,
            Bairro,
            Cidade,
            Telefone,
            Itens,
            Atividades,
            image,
            displayImage,
            urlImage,
            message
        })
    }

    alterar = async () => {

        try {
            const { uid } = firebase.auth().currentUser
            const alterandoDadosDaInstituicao = await firebase.
                firestore().collection("instituicao").doc(uid).set({

                    RazaoSocial: this.state.RazaoSocial,
                    NomeFantasia: this.state.NomeFantasia,
                    Cnpj: this.state.Cnpj,
                    InscricaoEstadual: this.state.InscricaoEstadual,
                    Cep: this.state.Cep,
                    Endereco: this.state.Endereco,
                    Bairro: this.state.Bairro,
                    Cidade: this.state.Cidade,
                    Telefone: this.state.Telefone,
                    Itens: this.state.Itens,
                    Atividades:this.state.Atividades,
                    Email: this.state.Email,
                   
                    urlImage: this.state.urlImage,
                })
            ToastAndroid.show('Cadastro realizado com sucesso!', ToastAndroid.SHORT)
            this.props.navigation.navigate('PerfilInstituicao')
            console.log(alterandoDadosDaInstituicao)
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
                                <Icon name='arrow-left' style={styles.iconMenuCabecalho} onPress={() => this.props.navigation.navigate('PerfilInstituicao')} />
                            </Button>
                        </Left>
                        <Text style={styles.txtCab}> Alteração Perfil </Text>
                        <Right></Right>
                    </Header>

                    <View style={styles.container}>
                        <Image style={styles.imag}
                        source={{ uri: this.state.urlImage }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Razão Social"
                            underlineColorAndroid="#0069cc"
                            value={this.state.RazaoSocial}
                            onChangeText={text => this.setState({ RazaoSocial: text })}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nome Fantasia"
                            underlineColorAndroid="#0069cc"
                            value={this.state.NomeFantasia}
                            onChangeText={text => this.setState({ NomeFantasia: text })}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder="CNPJ"
                            underlineColorAndroid="#0069cc"
                            keyboardType="numeric"
                            value={this.state.Cnpj}
                            onChangeText={text => this.setState({ Cnpj: text })}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Inscrição Estadual"
                            keyboardType="numeric"
                            underlineColorAndroid="#0069cc"
                            value={this.state.InscricaoEstadual}
                            onChangeText={text => this.setState({ InscricaoEstadual: text })}

                        />
                         <TextInput
                            style={styles.input}
                            placeholder="CEP"
                            keyboardType="numeric"
                            underlineColorAndroid="#0069cc"
                            value={this.state.Cep}
                            onChangeText={text => this.setState({ Cep: text })}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Endereco"
                            underlineColorAndroid="#0069cc"
                            value={this.state.Endereco}
                            onChangeText={text => this.setState({ Endereco: text })}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Cidade"
                            underlineColorAndroid="#0069cc"
                            value={this.state.Cidade}
                            onChangeText={text => this.setState({ Cidade: text })}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Bairro"
                            underlineColorAndroid="#0069cc"
                            value={this.state.Bairro}
                            onChangeText={text => this.setState({ Bairro: text })}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Telefone"
                            keyboardType="phone-pad"
                            underlineColorAndroid="#0069cc"
                            value={this.state.Telefone}
                            onChangeText={text => this.setState({ Telefone: text })}

                        />
                         <TextInput
                            style={styles.input}
                            placeholder="Atividades e Campanhas*"
                            underlineColorAndroid="#0069cc"
                            multiline={true}
                            value={this.state.Atividades}
                            onChangeText={text => this.setState({ Atividades :text })}
                        />


                        <TextInput
                            style={styles.input}
                            placeholder="Principais itens que necessitamos*"
                            underlineColorAndroid="#0069cc"
                            multiline={true}
                            value={this.state.Itens}
                            onChangeText={text => this.setState({ Itens :text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            underlineColorAndroid="#0069cc"
                            value={this.state.Email}
                            onChangeText={text => this.setState({ Email: text })}

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
        padding: 5

    },


    txtCab: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 12

    },
    imag: {
        width: 150,
        height: 150,
        borderColor: '#0069cc',
        borderWidth: 1,
        marginTop: 10
    }

});


export default AlteracaoPerfilInstituicao;