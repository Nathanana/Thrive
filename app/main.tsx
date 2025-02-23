import React, { useEffect, useState } from 'react';
import { Button, View, Dimensions, Alert, Image, Text } from 'react-native';
import { Link } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

// Define the type for the location object
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
      <Link href="/add-event" asChild>
        <Button title="Add Event" />
      </Link>
      <Link href="/event-page" asChild>
        <Button title="Event Page" />
      </Link>

      <View style={{ flex: 1, marginTop: 20 }}>

        {!location && <Text>Loading user location...</Text>}

        <MapView
          style={{ width, height: height * 0.5 }}
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
            ))
          ) : (
            <Text>No events to display</Text>
          )}
        </MapView>
      </View>
    </>
  );
};

export default Main;
