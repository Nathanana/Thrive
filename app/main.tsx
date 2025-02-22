import { Text, Button } from 'react-native';
import { Link } from 'expo-router';

const Main = () => {
    return (
      <>
      <Link href="/add-event" asChild>
        <Button title="Add Event" />
      </Link>
      <Link href="/event-page" asChild>
        <Button title="Event Page" />
      </Link>
    </>
    );
  };

export default Main
