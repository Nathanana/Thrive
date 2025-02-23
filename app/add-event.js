import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

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

  const handleSubmit = async () => {
    if (eventName && location && eventType && date && time && inviteOption) {
      try {
        await addDoc(collection(db, 'events'), {  // Ensure addDoc is imported
          eventName,
          location,
          eventType,
          date,
          time,
          inviteOption,
          createdAt: new Date(),
        });
        console.log('Event added successfully to Firestore');
      } catch (error) {
        console.error('Error adding event:', error);
      }
    }
    router.back();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Add Event</Text>
      <Text style={{ marginBottom: 5 }}>Event Name:</Text>
      <TextInput 
        placeholder = 'Event Name'
        placeholderTextColor="black"
        value={eventName} 
        onChangeText={setEventName}
        style={{ 
          borderWidth: 1,
          padding: 5, 
          marginBottom: 10,
          borderRadius: 10,
        }}
      />

      <Text style={{ marginBottom: 5 }}>Location:</Text>
      <TextInput 
        placeholder="Location" 
        placeholderTextColor="black"
        value={location} 
        onChangeText={setLocation} 
        style={{ 
          borderWidth: 1, 
          padding: 5, 
          marginBottom: 10, 
          borderRadius: 10,
        }}
      />
      <Text style={{ marginBottom: 5}}>Event Type:</Text>
      <View style={styles}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
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
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setEventType(item.value);
            setIsFocus(false);
            }}
          />
      </View>
        <View style={{ marginRight: 50, marginTop: 10}}>
        <Text style={{ marginBottom: 5 }}>Date:</Text>
        <TextInput
          placeholder="MM/DD/YYYY"
          placeholderTextColor="black"
          value={date}
          onChangeText={(text) => setDate(formatDate(text))}
          keyboardType="numeric"
          maxLength={10}
          style={{
            width: 100,
            borderWidth: 1,
            padding: 5,
            marginBottom: 10,
            borderRadius: 10,
          }}
        />
        <View style={styles}>
        <Text style={{ marginBottom: 5 }}>Time:</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={clock}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Time' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setTime(item.value);
            }}
          />
        </View>
      </View>

      <Text style={{ fontWeight: 'bold', marginBottom: 5, marginTop: 10 }}>Who is Invited?</Text>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <TouchableOpacity onPress={() => setInviteOption('Organizations')} style={{ marginRight: 10 }}>
          <Text>{inviteOption === 'Organizations' ? '🔘' : '⚪️'} Organizations</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setInviteOption('UVA')} style={{ marginRight: 10 }}>
          <Text>{inviteOption === 'UVA' ? '🔘' : '⚪️'} UVA</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setInviteOption('Everyone')} style={{ marginRight: 10 }}>
          <Text>{inviteOption === 'Everyone' ? '🔘' : '⚪️'} Everyone</Text>
        </TouchableOpacity>
      </View>

      <Button title="Add Event" onPress={handleSubmit} />
    </View>
  );
};

export default AddEventPage;

const styles = StyleSheet.create({
  dropdown: {
    height: 30,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
