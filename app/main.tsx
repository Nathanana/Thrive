import React, { useEffect, useState } from 'react';
import { Button, View, Dimensions, Alert, Image, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { StyleSheet } from 'react-native';

const Host = true;
const { width, height } = Dimensions.get('window');

interface LocationCoords {
  latitude: number;
  longitude: number;
}

const Main = () => {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [eventLocations, setEventLocations] = useState([
    { id: 1, latitude: 38.03572, longitude: -78.50324, image: require('../assets/images/party.jpg') },
    { id: 2, latitude: 38.03570, longitude: -78.50214, image: require('../assets/images/workshop.jpg') },
    { id: 3, latitude: 38.03470, longitude: -78.50214, image: require('../assets/images/athletics.jpg') },
    { id: 4, latitude: 38.03770, longitude: -78.50014, image: require('../assets/images/outdoors.png') }
  ]);

  useEffect(() => {
    getPermissions();
  }, []);

  async function getPermissions() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'We need location permissions to show your current location on the map.',
        [{ text: 'OK' }]
      );
    } else {
      setPermissionGranted(true);
      getCurrentLocation();
    }
  }

  async function getCurrentLocation() {
    try {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    } catch (error) {
      console.error('Error getting location', error);
    }
  }

  return (
    <>
      <View style={styles.container}>

        {!location && <Text>Loading user location...</Text>}

        <MapView
          style={{ width, height: height * 0.62 }}
          region={{
            latitude: location?.latitude || 38.03569,
            longitude: location?.longitude || -78.50334,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
        >
          {eventLocations.length > 0 ? (
            eventLocations.map((event) => (
              <Link href="/event-page" asChild>
                <Marker
                  key={event.id}
                  coordinate={{
                    latitude: event.latitude,
                    longitude: event.longitude,
                  }}

                >
                  <Image
                    source={event.image}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      borderWidth: 2,
                      borderColor: 'white',
                    }}
                  />
                </Marker>
              </Link>
            ))
          ) : (
            <Text>No events to display</Text>
          )}
        </MapView>
        {Host && (
          <Link href="/add-event" asChild>
            <TouchableOpacity style={styles.floatingButton}>
              <Image source={require('../assets/images/plus-icon.png')} style={styles.buttonIcon} />
            </TouchableOpacity>
          </Link>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#131E3A',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 360,
    right: 20,
    backgroundColor: '#131E3A',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonIcon: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
});

export default Main;
