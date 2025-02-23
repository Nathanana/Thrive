import React, { useEffect, useState, useRef } from 'react';
import { Button, View, Dimensions, Alert, Image, Text, TouchableOpacity,  Modal, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Link } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { StyleSheet } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { arrayUnion, updateDoc, doc, getFirestore, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const Host = true;
const { width, height } = Dimensions.get('window');

interface LocationCoords {
  latitude: number;
  longitude: number;
}

const Main = () => {
  const [groupCode, setGroupCode] = useState('');
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [eventLocations, setEventLocations] = useState([
    { id: 1, latitude: 38.03572, longitude: -78.50324, image: require('../assets/images/party.jpg') },
    { id: 2, latitude: 38.03570, longitude: -78.50214, image: require('../assets/images/workshop.jpg') },
    { id: 3, latitude: 38.03470, longitude: -78.50214, image: require('../assets/images/athletics.jpg') },
    { id: 4, latitude: 38.03770, longitude: -78.50014, image: require('../assets/images/outdoors.png') }
  ]);

  
  const [isInviteVisible, setIsInviteVisible] = useState(false);
  const [isGroupVisible, setIsGroupVisible] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const auth = getAuth();
  const db = getFirestore();

  const getGroup = async (groupID: string) => {
    try {
      const groupDoc = await getDoc(doc(db, 'groups', groupID));
      if (groupDoc.exists()) {
        const groupName = groupDoc.data()?.name;
        return groupName || null;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting group:', error);
      return null;
    }
  };

  const addUserGroup = async (groupID: string) => {
    const group = await getGroup(groupID);  // Wait for the group to resolve
    const user = auth.currentUser;
    if (user) {
      try {
        await updateDoc(doc(db, 'users', user.uid), {
          userGroups: arrayUnion(group),
        });
        await deleteDoc(doc(db, 'groups', groupID));
        Alert.alert('Group Added', `You've joined ${group}.`);
      } catch (error) {
        console.error('Error adding item:', error);
        Alert.alert('Error', 'There was an issue adding you to the group.');
      }
    }
  };
  

  const clearGroupCode = () => {
    setGroupCode('');
  };

  const getGroupOfHost = async (user: any) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const groupName = userDoc.data()?.hostGroup;
        return groupName || null;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting group:', error);
      return null;
    }
  };
  
  const generateCode = async () => {
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    setInviteCode(randomCode);
  
    try {
      const tempName = await getGroupOfHost(auth.currentUser);
      await setDoc(doc(db, 'groups', randomCode), {
        name: tempName,
      });
      console.log('Group successfully created with code:', randomCode);
    } catch (error) {
      console.error('Error generating code or creating group:', error);
    }
  };
  
  const toggleInviteModal = () => {
    setIsInviteVisible(!isInviteVisible);
  };

  const toggleGroupModal = () => {
    setIsGroupVisible(!isGroupVisible);
  };

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

  const copyToClipboard = (code: string) => {
    Clipboard.setStringAsync(code);
    Alert.alert("Copied!", `Invite code ${code} copied to clipboard.`);
  };

  return (
    <>
      <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isInviteVisible}
        onRequestClose={toggleInviteModal}
      >
        <TouchableWithoutFeedback onPress={() => {
          Keyboard.dismiss();
          toggleInviteModal();
        }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.inviteCode}>{inviteCode}</Text>
              <TouchableOpacity style={styles.copyButton} onPress={() => {toggleInviteModal(), copyToClipboard(inviteCode)}}>
                <Image source={require('../assets/images/copy.png')} style={styles.copyButtonIcon} />
              </TouchableOpacity>
              <Text style={styles.modalText}>ONE TIME INVITE CODE</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isGroupVisible}
        onRequestClose={toggleGroupModal}
      >
        <TouchableWithoutFeedback onPress={() => {
          Keyboard.dismiss();
          toggleGroupModal();
        }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                placeholder=''
                value={groupCode}
                style={styles.groupCode}
                onChangeText={(text) => {
                  const numericText = text.replace(/[^0-9]/g, '');
                  setGroupCode(numericText);
                }}
                keyboardType='numeric'
                maxLength={4}
              />
              <Text style={styles.modalText}>ENTER INVITE CODE</Text>
              <TouchableOpacity style={styles.customButton} onPress={() => addUserGroup(groupCode)}>
                <Text style={styles.buttonText}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

        <MapView
          style={styles.map}
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
              <Link href="/event-page" asChild key={event.id}>
                <Marker coordinate={{ latitude: event.latitude, longitude: event.longitude }}>
                  <Image source={event.image} style={styles.eventImage} />
                </Marker>
              </Link>
            ))
          ) : (
            <Text>No events to display</Text>
          )}
        </MapView>

        {Host && (
          <Link href="/add-event" asChild>
            <TouchableOpacity style={styles.addButton}>
              <Image source={require('../assets/images/plus-icon.png')} style={styles.addButtonIcon} />
            </TouchableOpacity>
          </Link>
        )}
        {Host && (
          <TouchableOpacity style={styles.inviteButton} onPress={() => {toggleInviteModal(); generateCode() ;}}>
            <Image source={require('../assets/images/invite.png')} style={styles.inviteButtonIcon} />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.groupButton} onPress={() => {toggleGroupModal(); clearGroupCode();}}>
          <Image source={require('../assets/images/group.png')} style={styles.inviteButtonIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#ccc',
  },
  map: {
    width,
    height: height,
    zIndex: 0, 
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#131E3A',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '70%',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    opacity: 0.85,
  },
  modalText: {
    textAlign: 'center',
    color: 'white',
    marginTop: 8,
    fontFamily: 'monospace',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    marginTop: 8,
    fontFamily: 'monospace',
  },
  customButton: {
    textAlign: 'center',
    color: 'black',
    marginTop: 8,
  },
  inviteCode: {
    fontSize: 70,
    fontWeight: 'bold',
    fontFamily: 'roboto',
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    textAlign: 'center',
  }, 
  groupCode: {
    fontSize: 70,
    fontWeight: 'bold',
    fontFamily: 'roboto',
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'center',
    borderRadius: 5,
  }, 
  sheet: {
    backgroundColor: '#131E3A',
    borderRadius: 10,
    zIndex: 3,
    position: 'absolute',
    width: '100%',
    height: '102%',
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 30,
  },
  addButton: {
    position: 'absolute',
    bottom: 92,
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
    opacity: 0.85,
  },
  copyButton: {
    position: 'absolute',
    bottom: 5,
    right: 15,
    backgroundColor: '#131E3A',
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    opacity: 0.85,
  },
  copyButtonIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  inviteButton: {
    position: 'absolute',
    bottom: 164,
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
    opacity: 0.85,
  },
  groupButton: {
    position: 'absolute',
    bottom: 20,
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
    opacity: 0.85,
  },
  inviteButtonIcon: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
  addButtonIcon: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
  eventImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingLeft: 10,
  },
  eventName: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  }
});


export default Main;
