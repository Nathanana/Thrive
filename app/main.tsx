import React from 'react';
import { Text, Button, View, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import MapView from 'react-native-maps';
import * as Location from 'expo-location'; 

const { width, height } = Dimensions.get('window');

const Main = () => {
  return (
    <>
      <Link href="/add-event" asChild>
        <Button title="Add Event" />
      </Link>
      <Link href="/event-page" asChild>
        <Button title="Event Page" />
      </Link>

      <View style={{ flex: 1, marginTop: 20 }}>
        <MapView
          style={{ width, height: height * 0.5 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    </>
  );
};

export default Main;
