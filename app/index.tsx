import { Text, Button } from 'react-native';
import { Link } from 'expo-router';

const Main = () => {
    return (
      <>
      <Link href="/add-event">
        <Text>Add Event</Text>
      </Link>
      <Link href="/event-page">
        <Text>Event Page</Text>
      </Link>
    </>
    );
  };

export default Main
