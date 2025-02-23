import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

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
  { label: '12:30 AM', value: '12:30 AM'},
  { label: '1:00 AM', value: '1:00 AM'},
  { label: '1:30 AM', value: '1:30 AM'},
  { label: '2:00 AM', value: '2:00 AM'},
  { label: '2:30 AM', value: '2:30 AM'},
  { label: '3:00 AM', value: '3:00 AM'},
  { label: '3:30 AM', value: '3:30 AM'},
  { label: '4:00 AM', value: '4:00 AM'},
  { label: '4:30 AM', value: '4:30 AM'},
  { label: '5:00 AM', value: '5:00 AM'},
  { label: '5:30 AM', value: '5:30 AM'},
  { label: '6:00 AM', value: '6:00 AM'},
  { label: '6:30 AM', value: '6:30 AM'},
  { label: '7:00 AM', value: '7:00 AM'},
  { label: '7:30 AM', value: '7:30 AM'},
  { label: '8:00 AM', value: '8:00 AM'},
  { label: '8:30 AM', value: '8:30 AM'},
  { label: '9:00 AM', value: '9:00 AM'},
  { label: '9:30 AM', value: '9:30 AM'},
  { label: '10:00 AM', value: '10:00 AM'},
  { label: '10:30 AM', value: '10:30 AM'},
  { label: '11:00 AM', value: '11:00 AM'},
  { label: '11:30 AM', value: '11:30 AM'},
  { label: '12:00 PM', value: '12:00 PM'},
  { label: '12:30 PM', value: '12:30 PM'},
  { label: '1:00 PM', value: '1:00 PM'},
  { label: '1:30 PM', value: '1:30 PM'},
  { label: '2:00 PM', value: '2:00 PM'},
  { label: '2:30 PM', value: '2:30 PM'},
  { label: '3:00 PM', value: '3:00 PM'},
  { label: '3:30 PM', value: '3:30 PM'},
  { label: '4:00 PM', value: '4:00 PM'},
  { label: '4:30 PM', value: '4:30 PM'},
  { label: '5:00 PM', value: '5:00 PM'},
  { label: '5:30 PM', value: '5:30 PM'},
  { label: '6:00 PM', value: '6:00 PM'},
  { label: '6:30 PM', value: '6:30 PM'},
  { label: '7:00 PM', value: '7:00 PM'},
  { label: '7:30 PM', value: '7:30 PM'},
  { label: '8:00 PM', value: '8:00 PM'},
  { label: '8:30 PM', value: '8:30 PM'},
  { label: '9:00 PM', value: '9:00 PM'},
  { label: '9:30 PM', value: '9:30 PM'},
  { label: '10:00 PM', value: '10:00 PM'},
  { label: '10:30 PM', value: '10:30 PM'},
  { label: '11:00 PM', value: '11:00 PM'},
  { label: '11:30 PM', value: '11:30 PM'},
];

const AddEventPage = () => {
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventDescription, setEventDescription] = useState('')
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [inviteOption, setInviteOption] = useState('Organizations');
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const handleSubmit = () => {
    console.log({ eventName, location, eventType, date, time, inviteOption, eventDescription });
  };

  return (
  <ImageBackground source={require('../assets/images/icon.png')} style={background.background}>
    <View style={background.container}>
      <View style={box.background}>
        <TextInput
          style={background.input} 
          placeholder = 'Event Name'
          placeholderTextColor="black"
          value={eventName} 
          onChangeText={setEventName}
        />

        <TextInput 
          style={background.input}
          placeholder="Location" 
          placeholderTextColor="black"
          value={location} 
          onChangeText={setLocation} 
        />
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
            placeholder={!isFocus ? 'Select Event Type' : '...'}
            searchPlaceholder="Search..."
            value={data}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
              }}
            />
        </View>
          <View style={{ marginRight: 50, marginTop: 20}}>
          <TextInput
            style={background.input}
            placeholder="MM/DD/YYYY"
            placeholderTextColor="black"
            value={date}
            onChangeText={(text) => setDate(formatDate(text))}
            keyboardType="numeric"
            maxLength={10}
          />
          <View style={styles}>
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
            value={time}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              }}
            />
          </View>
          <View style={{marginTop: 20}}>
            <TextInput
            style={background.input}
            placeholder = 'Description...'
            placeholderTextColor="black"
            value={eventDescription} 
            onChangeText={setEventDescription}
            />
          </View>
        </View>

        <View style={bottom.input}>
        <Text style={{ fontWeight: 'bold', marginBottom: 5, marginTop: 10, paddingLeft: 110 }}>Who is Invited?</Text>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <TouchableOpacity onPress={() => setInviteOption('Organizations')} style={{ marginRight: 20 }}>
            <Text>{inviteOption === 'Organizations' ? '🔘' : '⚪️'} Organizations</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setInviteOption('UVA')} style={{ marginRight: 40 }}>
            <Text>{inviteOption === 'UVA' ? '🔘' : '⚪️'} UVA</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setInviteOption('Everyone')} style={{ marginRight: 20 }}>
            <Text>{inviteOption === 'Everyone' ? '🔘' : '⚪️'} Everyone</Text>
          </TouchableOpacity>
        </View>
        <Button title="Add Event" onPress={handleSubmit} />
        </View>

      </View>
    </View>
    </ImageBackground>
  );
};

export default AddEventPage;

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    opacity: 0.8,
    backgroundColor: 'white',
    width: 360,
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

const background = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    opacity: 0.8,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    opacity: 1,
    paddingTop: 20,
    paddingLeft: 17
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 1,
    paddingLeft: 8,
    borderRadius: 5,
    backgroundColor: 'white',
    opacity: 0.8,
    width: 360,
  },
});

const box = StyleSheet.create({
  background: {
    opacity: 1,
    paddingTop: 25,
    borderColor: '#ccc',
    paddingBottom: 150,
  },
})

const bottom = StyleSheet.create({
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 1,
    paddingLeft: 8,
    borderRadius: 5,
    backgroundColor: 'white',
    opacity: 0.8,
    width: 360,
  }
})