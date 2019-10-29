import React, { Component } from 'react';
import { Text, StyleSheet, TextInput, ScrollView, ToastAndroid, Image } from 'react-native';
import { Container, Button, Header, Left, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from "react-native-firebase"
import ImagePicker from 'react-native-image-picker';
import { mixedTypeAnnotation } from '@babel/types';

class Item extends Component {

    constructor(props) {

        super(props)
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
        descricao:'',
        quantidade:'',
        image: {},
        displayImage: {},
        urlImage: undefined,
 
        
    }
    componentDidMount(){
        this.getDados()
    }
    getDados = async () => {
        const { uid } = firebase.auth().currentUser


        const collections = await firebase.firestore().collection('doador').doc(uid).get();
        const userDetail = collections.data()

        this.setState({
            Nome : userDetail.Nome,
            Telefone : userDetail.Telefone        
            
        })
    }
    getImage = async () => {
        const options = {
            title: 'Selecionar Imagem',
            takePhotoButtonTitle: 'Tirar foto',
            chooseFromLibraryButtonTitle: 'Carregar da Galeria',
            cancelButtonTitle: 'Cancelar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
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
            
               
                const {path, width, height} = response
                const image = [];
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

      
        const pathT = `itemDoacao_${Math.floor(Math.random() * 1000 + 1)}`;
        console.log(pathT)

        console.log(metadata)
        const metadata = {
          contentType: "image/jpeg",
          
        };
        
        await storageRef.child(`item/${pathT}`).put(path, metadata);
      
        await storageRef
          .child(`item/${pathT}`)
          .getDownloadURL()
          .then((image) => {

            
            this.setState({ urlImage: image }); 
            
          });
      };
      cadastrar = async () => {
        try {
          
            const { uid} = await firebase.auth().currentUser

            const { 
                descricao,
                quantidade,
                urlImage,
               
                
                 } = this.state

            const salvandoDadosDoacao =  firebase.
            firestore().collection("item").doc().set({

                descricao,
                quantidade,
                urlImage: this.state.urlImage,
                uid,
                doador: this.state.Nome,
                telefoneDoador: this.state.Telefone,
                cnpjInstituicao: this.props.navigation.state.params.Cnpj
                
         
            })
            ToastAndroid.show('Doação realizada com sucesso!', ToastAndroid.SHORT)
            this.props.navigation.navigate('HomeDoador')

            console.log(salvandoDadosDoacao)
        }
        catch (error) {
            console.log(error)
        }

    }
    
    render() {
        console.log('PROPS->', this.props)//

        return ( 

            <Container>
                <ScrollView>
                    <Header androidStatusBarColor={'grey'} style={{ backgroundColor: '#0069cc' }}>
                        <Left>
                            <Button iconLeft transparent>
                                <Icon name='arrow-left' style={styles.iconMenuCabecalho} onPress={() => this.props.navigation.navigate('InstituicaoDisponivel')} />
                            </Button>
                        </Left>
                        <Text style={styles.txtCab}> Realizar Doação </Text>
                        <Right></Right>
                    </Header>
                    <Image source={this.state.displayImage} style={styles.uploadAvatar} />
                    <Button style={styles.btnImag} onPress={this.getImage} >
                        <Text style={styles.text } >Selecionar Item</Text>
                    </Button>
                    <TextInput
                        style={styles.inputDes}
                        placeholder="Descrição do Item"
                        maxLength={25}
                        underlineColorAndroid="#0069cc"
                        onChangeText={descricao => this.setState({ descricao })}

                    />

                    <TextInput
                        style={styles.inputQtd}
                        placeholder="Quantidade"
                        keyboardType="numeric"
                        maxLength={6}
                        underlineColorAndroid="#0069cc"
                        onChangeText={quantidade => this.setState({ quantidade })}

                    />
                     <Button style={styles.buttonDoar} >
                        <Text style={styles.textDoar}  onPress={this.cadastrar} >Doar</Text>
                    </Button>
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



    txtCab: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 12

    },
    inputQtd: {
        width: "40%",
        fontSize: 16,
        padding: 10,
        alignSelf: 'center',
        textAlign: 'center',
        marginTop:80
    },
    inputDes: {
        width: "80%",
        fontSize: 16,
        padding: 10,
        alignSelf: 'center',
        textAlign: 'center',
        marginTop:20

    },
    uploadAvatar: {
        width: 150,
        height: 150,
        borderColor: '#0069cc',
        borderWidth: 1,
        marginBottom: 10,
        marginTop:10,
        alignSelf:'center'

    },
    btnImag: {

        width: 150,
        backgroundColor: "#e61a5f",
        alignSelf:'center'
    },
    text: {
        color: "white",
        fontSize: 18,
        fontWeight: 'bold',
        padding:8
        
    },
    textDoar:{
        
            color: "white",
            fontSize: 18,
            fontWeight: 'bold',
            padding:50
    },
    buttonDoar:{
        backgroundColor: "#e61a5f",
        alignSelf:'center',
        width:"40%",
        marginTop:100
    }
});


export default Item;