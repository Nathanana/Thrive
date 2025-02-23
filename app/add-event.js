import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useRouter } from 'expo-router';

function formatDate(input) {
  let value = input.replace(/\D/g, "");
  let formatted = "";

  if (value.length > 0) {
    formatted += value.substring(0, 2);
    if (value.length >= 3) {
      formatted += "/" + value.substring(2, 4);
    }
    if (value.length >= 5) {
      formatted += "/" + value.substring(4, 8);
    }
  }
  return formatted;
}

const data = [
  { label: 'Conference', value: 'Conference' },
  { label: 'Workshop', value: 'Workshop' },
  { label: 'Meetup', value: 'Meetup' },
];

const clock = [
  { label: '12:00 AM', value: '12:00 AM'},
  { label: '1:00 AM', value: '1:00 AM'},
  { label: '2:00 AM', value: '2:00 AM'},
  { label: '3:00 AM', value: '3:00 AM'},
  { label: '4:00 AM', value: '4:00 AM'},
  { label: '5:00 AM', value: '5:00 AM'},
  { label: '6:00 AM', value: '6:00 AM'},
  { label: '7:00 AM', value: '7:00 AM'},
  { label: '8:00 AM', value: '8:00 AM'},
  { label: '9:00 AM', value: '9:00 AM'},
  { label: '10:00 AM', value: '10:00 AM'},
  { label: '11:00 AM', value: '11:00 AM'},
  { label: '12:00 PM', value: '12:00 PM'},
  { label: '1:00 PM', value: '1:00 PM'},
  { label: '2:00 PM', value: '2:00 PM'},
  { label: '3:00 PM', value: '3:00 PM'},
  { label: '4:00 PM', value: '4:00 PM'},
  { label: '5:00 PM', value: '5:00 PM'},
  { label: '6:00 PM', value: '6:00 PM'},
  { label: '7:00 PM', value: '7:00 PM'},
  { label: '8:00 PM', value: '8:00 PM'},
  { label: '9:00 PM', value: '9:00 PM'},
  { label: '10:00 PM', value: '10:00 PM'},
  { label: '11:00 PM', value: '11:00 PM'},
];

const AddEventPage = () => {
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [eventType, setEventType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [inviteOption, setInviteOption] = useState('Organizations');
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (eventName && location && eventType && date && time && inviteOption) {
      try {
        await addDoc(collection(db, 'events'), { 
          eventName,
          location,
          eventType,
          date,
          time,
          inviteOption,
          createdAt: new Date(),
        });
        Alert.alert('Success', 'Event added successfully!');
        router.push('/');
      } catch (error) {
        Alert.alert('Error', 'Failed to add event. Please try again.');
      }
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };

  return (
    <ImageBackground source={require('../assets/images/icon.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Event</Text>

        <TextInput
          style={styles.input}
          placeholder="Event Name"
          value={eventName}
          onChangeText={setEventName}
          placeholderTextColor="#555"
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
          placeholderTextColor="#555"
        />

        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'black' }, { backgroundColor: 'white' }, {opacity: 0.85}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Event Style' : '...'}
          placeholderTextColor='#555'
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setEventType(item.value);
            setIsFocus(false);
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="MM/DD/YYYY"
          value={date}
          onChangeText={text => setDate(formatDate(text))}
          keyboardType="numeric"
          maxLength={10}
          placeholderTextColor="#555"
        />

        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'black' }, {backgroundColor: 'white'}]}
          data={clock}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Time' : '...'}
          value={time}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => setTime(item.value)}
        />

        <Text style={styles.inviteText}>Who is Invited?</Text>
        <View style={styles.inviteContainer}>
          <TouchableOpacity onPress={() => setInviteOption('Organizations')} style={styles.inviteButton}>
            <Text>{inviteOption === 'Organizations' ? '🔘' : '⚪️'} Organizations</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setInviteOption('UVA')} style={styles.inviteButton}>
            <Text>{inviteOption === 'UVA' ? '🔘' : '⚪️'} UVA</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setInviteOption('Everyone')} style={styles.inviteButton}>
            <Text>{inviteOption === 'Everyone' ? '🔘' : '⚪️'} Everyone</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.customButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Event</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
    backgroundColor: 'white',
    opacity: 0.85,
  },
  dropdown: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    paddingLeft: 8,
  },
  inviteText: {
    color: 'white',
    marginBottom: 10,
    fontSize: 16,
    paddingLeft: 132,
  },
  inviteContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  inviteButton: {
    marginRight: 10,
  },
  customButton: {
    backgroundColor: '#131E3A',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    opacity: 0.85,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddEventPage;
