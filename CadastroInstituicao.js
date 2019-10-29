import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, ToastAndroid, Image } from 'react-native';
import { Container, Button, Header, Left, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from "react-native-firebase"
import ImagePicker from 'react-native-image-picker';

class CadastroInstituicao extends Component {

  
    constructor(props) {

        super(props)
    }

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
        urlImage: undefined,
        message:'',

    }

    
    getImage = async () => {
        const options = {
            title: 'Selecionar Imagem',
            takePhotoButtonTitle: 'Tirar foto',
            chooseFromLibraryButtonTitle: 'Carregar da Galeria',
            cancelButtonTitle: 'Cancelar',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            },
        };

       await ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);

            } else {
            
                const displayImage = { uri: 'data:image/jpeg;base64,' + response.data };
                console.log(response)
            
                // o response é a imagem completa, estamos extrandio do response, o diretorio
                // e o tamano da imagem que é o que nos interessa
                 const {path, width, height} = response
                const image = [];// o image é a variavel que vamos juntar para enviar todas as 3 informacoes de uma vez unica
                image.push({path,width,height})
                this.setState({
                     image:image[0], displayImage
                 });
                console.log(image)
               this.uploadImage(image[0])
              
            }
        })
    }

    uploadImage = async (image) => {
       
        console.log(image)
        const {path} = image
        const storageRef = firebase.storage().ref();

      
        const pathT = `logo_${Math.floor(Math.random() * 1000 + 1)}`;
        console.log(pathT)

        console.log(metadata)
        const metadata = {
          contentType: "image/jpeg",
          
        };
        
        await storageRef.child(`instituicao/${pathT}`).put(path, metadata);
      
        await storageRef
          .child(`instituicao/${pathT}`)
          .getDownloadURL()
          .then((image) => {
              //salva a URL da imagem no estado urlImage
		
            this.setState({ urlImage: image }); 
          });
      };
     
    

    cadastrar = async () => {
        try {
            const usercadastradoInstituicao = await firebase.auth()
                .createUserWithEmailAndPassword(this.state.Email, this.state.Senha)
            this.props.navigation.navigate('LoginInstituicao')



            const { uid } = firebase.auth().currentUser

            const { RazaoSocial,
                NomeFantasia,
                Cnpj,
                InscricaoEstadual,
                Cep,
                Bairro,
                Endereco,
                Cidade,
                Telefone,
                Email,
                Senha,
                urlImage,
                message } = this.state

            const salvandoDadosDaInstituicao = await firebase.
            firestore().collection("instituicao").doc(uid).set({

                RazaoSocial,
                NomeFantasia,
                Cnpj,
                InscricaoEstadual,
                Cep,
                Endereco,
                Bairro,
                Cidade,
                Telefone,
                Email,
                Senha,
                message: "",
                urlImage: this.state.urlImage,

            })
            ToastAndroid.show('Cadastro realizado com sucesso!', ToastAndroid.SHORT)

            console.log(salvandoDadosDaInstituicao)
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
                <Text style={{
                    color: 'red',
                    textAlign: 'center',
                    marginTop: 10,
                    marginBottom: 10
                }}>{message}</Text>
            </View>
        );
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
                        <Text style={styles.txtCab}>Cadastro Instituição</Text>

                        <Right></Right>
                    </Header>

                    <View style={styles.container}>
                        <Image source={this.state.displayImage} style={styles.uploadAvatar} />
                        <Button style={styles.btnImag} onPress={this.getImage} >
                            <Text style={styles.txtImag} >Selecionar Logo</Text>
                        </Button>


                        <TextInput
                            style={styles.input}
                            placeholder="Razão Social*"
                            underlineColorAndroid="#0069cc"
                            onChangeText={RazaoSocial => this.setState({ RazaoSocial })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nome Fantasia*"
                            underlineColorAndroid="#0069cc"
                            onChangeText={NomeFantasia => this.setState({ NomeFantasia })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="CNPJ*"
                            keyboardType="phone-pad"
                            underlineColorAndroid="#0069cc"
                            onChangeText={Cnpj => this.setState({ Cnpj })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Inscrição Estadual*"
                            
                            underlineColorAndroid="#0069cc"
                            onChangeText={InscricaoEstadual => this.setState({ InscricaoEstadual })}
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
                            placeholder="Endereço*"
                            underlineColorAndroid="#0069cc"
                            onChangeText={Endereco => this.setState({ Endereco })}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Bairro*"
                            underlineColorAndroid="#0069cc"
                            onChangeText={Bairro => this.setState({ Bairro })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Cidade*"
                            underlineColorAndroid="#0069cc"
                            onChangeText={Cidade => this.setState({ Cidade })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Telefone*"
                            keyboardType="phone-pad"
                            underlineColorAndroid="#0069cc"
                            onChangeText={Telefone => this.setState({ Telefone })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="E-mail*"
                            keyboardType='email-address'
                            underlineColorAndroid="#0069cc"
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
                        <Button style={styles.button} onPress={this.cadastrar}>
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
        marginTop: 10
    },
    txtCab: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 12

    },
    iconMenuCabecalho: {
        fontSize: 20,
        color: 'white'
    },

    uploadAvatar: {
        width: 150,
        height: 150,
        borderColor: '#0069cc',
        borderWidth: 1,
        marginBottom: 5

    },
    btnImag: {

        width: 150,
        backgroundColor: "#e61a5f",

    },

    txtImag: {
        color: "white",
        fontSize: 18,
        fontWeight: 'bold',
        padding: 8
    },

    input: {
        width: "90%",
        fontSize: 16,
        padding: 10

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
    text: {
        color: "white",
        fontSize: 18,
        fontWeight: 'bold',


    },





});

export default CadastroInstituicao;