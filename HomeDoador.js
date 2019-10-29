import React, { Component } from 'react';
import { Container, Button, Header, Left, Right } from 'native-base';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from 'react-native-firebase'


class HomeDoador extends Component {

    
logoutUser(){
    firebase.auth().signOut().then(() => {
    
        this.props.navigation.navigate('LoginDoador')
  
      }).catch(function (error) {
        // An error happened.
      });
}
    render() {
        return (

            <Container>


                <Header androidStatusBarColor={'grey'} style={{ backgroundColor: '#0069cc' }}>
                    <Left>
                        <Button iconLeft transparent>
                            <Icon name='arrow-left' style={styles.iconMenuCabecalho} onPress={() => this.props.navigation.goBack()} />

                        </Button>
                    </Left>
                    <Text style={styles.txtCab}>Doador</Text>

                    <Right><Button transparent>
                            <Icon name='sign-out-alt' style={styles.iconMenuCabecalho} onPress={() => this.logoutUser()} />

                        </Button></Right>

                </Header>
                <View style={styles.container}>

                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('PerfilDoador')}>
                        <Icon name='user' style={styles.icon}> </Icon>
                        <Text style={styles.text}>Meu Cadastro</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('InstituicaoDisponivel')}>
                        <Icon name='university' style={styles.icon}> </Icon>
                        <Text style={styles.text}>Instituições Disponíveis</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('DoacaoRealizada')}>
                        <Icon name='handshake' style={styles.icon}> </Icon>
                        <Text style={styles.text}>Doações Realizadas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('GoogleMaps')}>
                        <Icon name='map-pin' style={styles.icon}> </Icon>
                        <Text style={styles.text}>Locais para Doação</Text>
                    </TouchableOpacity>

                </View>

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


    iconMenuCabecalho: {
        fontSize: 20,
        color: 'white'
    },
    
 

    icon: {
        
        
        color: '#0069cc',
        fontSize: 25,
        marginTop:10
    },
    text: {

        fontSize: 20,
        color: '#0069cc',



    },
    button: {
        alignSelf: 'center',
        justifyContent: 'center',
        elevation: 2,
        borderColor:'black',
        width: '66%',
        height:'13%',
        textAlign: 'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:-10,
        marginBottom:10
    
    },



    txtCab: {
        color: 'white',
        fontSize: 20,
    
        marginTop: 12

    }

});

export default HomeDoador;