import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const AddEventPage: React.FC = () => {
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [eventType, setEventType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [inviteOption, setInviteOption] = useState('Organizations');

  const handleSubmit = () => {
    console.log({ eventName, location, eventType, date, time, inviteOption });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Add Event</Text>

      <Text style={{ marginBottom: 5 }}>Event Name:</Text>
      <TextInput 
        placeholder="Event Name" 
        placeholderTextColor="black"
        value={eventName} 
        onChangeText={setEventName} 
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Text style={{ marginBottom: 5 }}>Location:</Text>
      <TextInput 
        placeholder="Location" 
        placeholderTextColor="black"
        value={location} 
        onChangeText={setLocation} 
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Text style={{ marginBottom: 5 }}>Event Type:</Text>
      <Picker
        selectedValue={eventType}
        onValueChange={(itemValue) => setEventType(itemValue)}
        style={{ borderWidth: 1, marginBottom: 10, color: 'black' }}
      >
        <Picker.Item label="Select Event Type" value="" />
        <Picker.Item label="Conference" value="Conference" />
        <Picker.Item label="Workshop" value="Workshop" />
        <Picker.Item label="Meetup" value="Meetup" />
      </Picker>

      <Text style={{ marginBottom: 5 }}>Date:</Text>
      <TextInput 
        placeholder="Date" 
        placeholderTextColor="black"
        value={date} 
        onChangeText={setDate} 
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Text style={{ marginBottom: 5 }}>Time:</Text>
      <TextInput 
        placeholder="Time" 
        placeholderTextColor="black"
        value={time} 
        onChangeText={setTime} 
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Who is Invited?</Text>
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
