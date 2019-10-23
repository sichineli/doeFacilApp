import React, { Component } from 'react';
import { View,  StyleSheet,ImageBackground,TouchableOpacity} from 'react-native';
import { Container,Text, Header, Left, Right,Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';


class HomeScreen extends Component {


  render() {
    return (

      <Container>

<Header androidStatusBarColor={'grey'} style={{ backgroundColor: '#0069cc', heigth: 100 }}>
        
          <Left>
            <Button iconLeft transparent>
              <Icon name='align-justify' style={styles.iconMenuCabecalho} onPress={() => this.props.navigation.openDrawer()} />
            </Button>
          </Left>
          <Right></Right> 

        </Header>
       
        
        <View style={styles.container }>
        
        <ImageBackground style={styles.logo} source={require('./home.jpg')}>
           <Text style={styles.welcome}>Seja Bem-vindo ao Doe Fácil</Text>

          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('LoginInstituicao')}>
            <Text style={styles.text}>INSTITUIÇÃO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('LoginDoador')}>
            <Text style={styles.text}>DOADOR</Text>
          </TouchableOpacity> 
</ImageBackground>


        </View>


      </Container>

    )
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    
    
  },

  welcome: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    color: 'white',
    marginBottom: 100,
    fontWeight:'bold'
    
  },

  
  logo: {
    height: '100%',
    width: '100%'
}
,
  iconMenuCabecalho: {
    fontSize: 20,
    color: 'white'
  },
  
  text: {

    fontSize: 20,
    color: '#0069cc',
    fontWeight:'bold'


},
button: {
    alignSelf: 'center',
    justifyContent: 'center',
    elevation: 5,
    width: '66%',
    height:'10%',
    textAlign: 'center',
    alignItems:'center',
    justifyContent:'center',
    marginTop:70,
    backgroundColor:'white',
    
   
},
  


});


export default HomeScreen;