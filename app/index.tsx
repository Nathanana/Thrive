import React from 'react';
import { EventProvider } from './event-date';
import AddEventPage from './(tabs)/add-event';

export default function App() {
  return (
    <EventProvider>
      <AddEventPage />
    </EventProvider>
  );
}