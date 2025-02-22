import React, { useEffect, useState } from 'react';
import { Button, View, Dimensions, Alert } from 'react-native';
import { Link } from 'expo-router';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

interface LocationCoords {
  latitude: number;
  longitude: number;
}

const { width, height } = Dimensions.get('window');

const Main = () => {

  const [location, setLocation] = useState<LocationCoords | null>(null); 
  const [permissionGranted, setPermissionGranted] = useState(false);

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
        <MapView
          style={{ width, height: height * 0.5 }}
          region={{
            latitude: location?.latitude || 37.78825,
            longitude: location?.longitude || -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
        />
      </View>
    </>
  );
};

export default Main;
