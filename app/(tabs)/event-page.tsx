import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const EventPage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Event Image */}
      <Image 
        source={{ uri: 'https://your-image-url.com/image.jpg' }} 
        style={styles.eventImage} 
        resizeMode="cover" 
      />

      {/* Event Title */}
      <Text style={styles.eventTitle}>Event Title</Text>

      {/* Event Date & Time */}
      <Text style={styles.eventDate}>March 10, 2025 at 6:00 PM</Text>

      {/* Event Description */}
      <Text style={styles.eventDescription}>
        This is the event description. You can add a detailed description of the event here.
      </Text>

      {/* RSVP Button */}
      <TouchableOpacity style={styles.button} onPress={() => alert('RSVP clicked')}>
        <Text style={styles.buttonText}>RSVP</Text>
      </TouchableOpacity>

      {/* Message Button */}
      <TouchableOpacity style={styles.button} onPress={() => alert('Message clicked')}>
        <Text style={styles.buttonText}>Message</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  eventImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  eventTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  eventDate: {
    fontSize: 18,
    marginVertical: 5,
    color: '#666',
  },
  eventDescription: {
    fontSize: 16,
    color: '#333',
    marginVertical: 15,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventPage;
