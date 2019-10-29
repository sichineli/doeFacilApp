import React, { Component } from 'react';
import { Container, Button, Header, Left, Right } from 'native-base';
import { View, Text, StyleSheet ,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


class HomeInstituicao extends Component {

   

    render() {
        return (
            
                <Container>
                     

                    <Header androidStatusBarColor={'grey'} style={{ backgroundColor: '#0069cc' }}>
                        <Left>
                            <Button iconLeft transparent>
                                <Icon name='arrow-left' style={styles.iconMenuCabecalho} onPress={() => this.props.navigation.goBack()} />
                              
                            </Button>
                        </Left>
                        <Text style={styles.txtCab}>Instituição</Text>

                        <Right></Right>
                       
                                        
                    </Header>
                
                    <View style={styles.container}>
                
                   
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('PerfilInstituicao')}>
                    <Icon name='university' style={styles.icon}> </Icon>
                    <Text style = {styles.text}>Dados Instituição</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('DoacaoRecebida')}>
                        <Icon name='handshake' style={styles.icon}> </Icon>
                            <Text style={styles.text}>Doações Recebidas</Text>
                        </TouchableOpacity>
                         <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('DoadoresCadastrados')}>
                        <Icon name='user' style={styles.icon}> </Icon>
                            <Text style={styles.text}>Doadores Cadastrados</Text>
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
    icon:{
        color:'#0069cc',
        fontSize:25,
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
        textAlign: 'center',

        marginTop: 12

    }
 
});

export default HomeInstituicao;