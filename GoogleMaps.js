import React, { Component } from "react";
import MapView from "react-native-maps";

import { Container, Button, Header, Left, Right } from "native-base";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Geolocation from "@react-native-community/geolocation";

class GoogleMaps extends Component {
  static navigationOptions = {
    drawerLabel: () => null,
    drawerLockMode: "locked-closed", //->Impede de abrir o Drawer na lateral
    header: null
  };

  state = {
    latitude: -21.012245,
    longitude: -48.231801,
  };


  render() {
    const { latitude, longitude } = this.state;
    return (
      <Container>
        <Header
          androidStatusBarColor={"grey"}
          style={{ backgroundColor: "#0069cc" }}
        >
          <Left>
            <Button iconLeft transparent>
              <Icon
                name="arrow-left"
                style={styles.iconMenuCabecalho}
                onPress={() => this.props.navigation.navigate("HomeDoador")}
              />
            </Button>
          </Left>
          <Text style={styles.txtCab}>Locais de Doação</Text>

          <Right></Right>
        </Header>
        <View style={styles.map}>
          <MapView style={{ flex: 1 }}
            initialRegion={
              {
                latitude,
                longitude,
                latitudeDelta: 0.0042,
                longitudeDelta: 0.0031
              }
            }
            rotateEnabled={false}
            
            zoomEnabled = {false}
            showsPointsOfInterest={false}
            showsBuildings={false}
          >


            <MapView.Marker
              coordinate={{
                latitude: -21.012245,
                longitude: -48.231801
              }}
              title='APAE - Piangueiras-SP'
              description='Rua Guaporé, 1000 - Centro'

            />
          </MapView>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },

  iconMenuCabecalho: {
    fontSize: 20,
    color: "white"
  },

  txtCab: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginTop: 12
  }
});

export default GoogleMaps;
