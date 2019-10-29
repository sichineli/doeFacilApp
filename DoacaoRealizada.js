import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableHighlight ,Image} from 'react-native';
import { Container, Button, Header, Left, Right, ListItem, List } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from "react-native-firebase";

export default function DoacaoRealizada({ navigation }) {

    const [item, setItem] = useState([]);


    useEffect(()=>{
        getDados();
    },[item])

    
    async function getDados() {
        let array = []
        const { uid } = firebase.auth().currentUser;
        console.log(uid)

        const collections = await firebase.firestore().collection("item").where("uid", "==", uid)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    console.log(doc.data())
                    array.push(doc.data())
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        setItem(array)

    }
    function clearList() {
        setItem([])
        navigation.navigate('HomeDoador');
    }
    return (

        <Container>
            <ScrollView>
                <Header androidStatusBarColor={'grey'} style={{ backgroundColor: '#0069cc' }}>
                    <Left>
                        <Button iconLeft transparent>
                            <Icon name='arrow-left' style={styles.iconMenuCabecalho} onPress={clearList} />
                        </Button>
                    </Left>
                    <Text style={styles.txtCab}> Doações Realizadas </Text>
                    <Right></Right>
                </Header>
                <FlatList
                    data={item}
                    renderItem={({ item }) => <ListItem>
                        <>
                            <Image
                                style={{ width: 100, height: 90 }}
                                source={{ uri: item.urlImage }}
                            />
                            <Text style={styles.lista}> {item.descricao} </Text>
                            
                        </>

                    </ListItem>}
                    keyExtractor={item => item.uid}

                />

            </ScrollView>
        </Container>

    )
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

    }
,
    lista:{
        color:"black",
        padding:5,
        fontSize:20


    }
});