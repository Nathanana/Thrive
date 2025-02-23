import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import debounce from 'lodash.debounce';

const EVENT_DATA_KEY = 'eventData';

// Define the Type for Location Suggestions
type LocationSuggestion = {
  place_id: string;
  display_name: string;
};


// Save Event Data to AsyncStorage
export const saveEventData = async (data: object) => {
  try {
    await AsyncStorage.setItem(EVENT_DATA_KEY, JSON.stringify(data));
    Alert.alert('Success', 'Event saved successfully!');
  } catch (error) {
    console.log('Error saving event data:', error);
  }
};

// Get Event Data from AsyncStorage
export const getEventData = async (): Promise<any> => {
  try {
    const savedData = await AsyncStorage.getItem(EVENT_DATA_KEY);
    return savedData ? JSON.parse(savedData) : null;
  } catch (error) {
    console.log('Error getting event data:', error);
    return null;
  }
};

// Clear Event Data from AsyncStorage
export const clearEventData = async () => {
  try {
    await AsyncStorage.removeItem(EVENT_DATA_KEY);
    Alert.alert('Success', 'Event data cleared!');
  } catch (error) {
    console.log('Error clearing event data:', error);
  }
};

const AddEventPage = () => {
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [eventType, setEventType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [inviteOption, setInviteOption] = useState('Organizations');

  const handleSubmit = () => {
    const eventData = {
      eventName,
      location,
      eventType,
      date,
      time,
      inviteOption
    };
    saveEventData(eventData);
  };

  // Fetch Suggestions from OpenStreetMap Nominatim API
  const fetchSuggestions = async (input: string) => {
    if (input.length < 3) {
      setSuggestions([]);
      return;
    }
  
    const apiUrl = `https://nominatim.openstreetmap.org/search?q=${input}&format=json&addressdetails=1`;
    try {
      const response = await fetch(apiUrl);
      const json: LocationSuggestion[] = await response.json();
      setSuggestions(json);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };
  

  // Debounce API Requests for Better Performance
  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), []);

  // Handle Selection from Dropdown
  const handleSelect = (address: string) => {
    setLocation(address);
    setSuggestions([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Event</Text>

      <Text style={styles.label}>Event Name:</Text>
      <TextInput
        placeholder="Event Name"
        placeholderTextColor="black"
        value={eventName}
        onChangeText={setEventName}
        style={styles.input}
      />

      <Text style={styles.label}>Location:</Text>
      <TextInput
        placeholder="Enter Location"
        placeholderTextColor="black"
        value={location}
        onChangeText={(text) => {
          setLocation(text);
          debouncedFetchSuggestions(text);
        }}
        style={styles.input}
      />

      {suggestions.length > 0 && (
        <FlatList
        data={suggestions}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelect(item.display_name)}>
            <Text style={styles.suggestionItem}>{item.display_name}</Text>
          </TouchableOpacity>
        )}
        style={styles.suggestionsContainer}
      />
      )}

      <Text style={styles.label}>Event Type:</Text>
      <Picker
        selectedValue={eventType}
        onValueChange={(itemValue) => setEventType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Event Type" value="" />
        <Picker.Item label="Conference" value="Conference" />
        <Picker.Item label="Workshop" value="Workshop" />
        <Picker.Item label="Meetup" value="Meetup" />
      </Picker>

      <Text style={styles.label}>Date:</Text>
      <TextInput
        placeholder="Date"
        placeholderTextColor="black"
        value={date}
        onChangeText={setDate}
        style={styles.input}
      />

      <Text style={styles.label}>Time:</Text>
      <TextInput
        placeholder="Time"
        placeholderTextColor="black"
        value={time}
        onChangeText={setTime}
        style={styles.input}
      />

      <Text style={styles.boldLabel}>Who is Invited?</Text>
      <View style={styles.inviteOptions}>
        <TouchableOpacity onPress={() => setInviteOption('Organizations')} style={styles.inviteOption}>
          <Text>{inviteOption === 'Organizations' ? '🔘' : '⚪️'} Organizations</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setInviteOption('UVA')} style={styles.inviteOption}>
          <Text>{inviteOption === 'UVA' ? '🔘' : '⚪️'} UVA</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setInviteOption('Everyone')} style={styles.inviteOption}>
          <Text>{inviteOption === 'Everyone' ? '🔘' : '⚪️'} Everyone</Text>
        </TouchableOpacity>
      </View>

      <Button title="Add Event" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  label: { marginBottom: 5 },
  boldLabel: { fontWeight: 'bold', marginBottom: 5 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  picker: { borderWidth: 1, marginBottom: 10, color: 'black' },
  suggestionsContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    maxHeight: 150,
    marginBottom: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  inviteOptions: { flexDirection: 'row', marginBottom: 10 },
  inviteOption: { marginRight: 10 },
});

export default AddEventPage;
