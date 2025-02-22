import React, { createContext, useContext, useState } from 'react';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [eventData, setEventData] = useState({
    eventName: '',
    location: '',
    eventType: '',
    date: '',
    time: '',
    inviteOption: 'Organizations',
  });

  return (
    <EventContext.Provider value={{ eventData, setEventData }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => useContext(EventContext);
