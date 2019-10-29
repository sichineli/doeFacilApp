import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image } from 'react-native';
import { Container, Button, Header, Left, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from "react-native-firebase"



class PerfilDoador extends Component {
   

    state = {
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
        urlImage: '',
        message: '', 

    }

    componentDidMount() {
        const { navigation } = this.props;
        //FUNÇÃO QUE CARREGA TODA VEZ QUE A TELA É FOCADA.
        this.focusListener = navigation.addListener('didFocus', () => {
            this.getDados();
        }); 

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
                        <Text style={styles.txtCab}> Perfil Instituição</Text>
                        <Right></Right>
                    </Header>

                    <View style={styles.container}>
                        <Image
                            style={{
                                width: 150,
                                height: 150,
                                borderColor: '#0069cc',
                                borderWidth: 1,
                                marginTop: 10
                            }}
                            source={{ uri: this.state.urlImage }}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Razão Social"
                            underlineColorAndroid="#0069cc"
                            editable={false}
                            value={this.state.RazaoSocial}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nome Fantasia"
                            underlineColorAndroid="#0069cc"
                            editable={false}
                            value={this.state.NomeFantasia}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder="CNPJ"
                            underlineColorAndroid="#0069cc"
                            editable={false}
                            value={this.state.Cnpj}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Inscrição Estadual"
                            underlineColorAndroid="#0069cc"
                            editable={false}
                            value={this.state.InscricaoEstadual}

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
                            placeholder="Endereço"
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
                            placeholder="Atividades e Campanhas*"
                            underlineColorAndroid="#0069cc"
                            multiline={true}
                            editable={false}
                            onChangeText={Atividades => this.setState({ Atividades })}
                            value={this.state.Atividades}
                        />


                        <TextInput
                            style={styles.input}
                            placeholder="Principais itens que necessitamos*"
                            underlineColorAndroid="#0069cc"
                            multiline={true}
                            editable={false}
                            onChangeText={Itens => this.setState({ Itens })}
                            value={this.state.Itens}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            underlineColorAndroid="#0069cc"
                            editable={false}
                            value={this.state.Email}

                        />


                        <Button style={styles.button}
                            onPress={() => this.props.navigation.navigate('AlteracaoPerfilInstituicao')}>
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
        padding: 5

    },


    txtCab: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 12

    }

});


export default PerfilDoador;