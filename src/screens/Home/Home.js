import React from 'react';
import { View, Button, Text } from 'native-base';
import auth from '@react-native-firebase/auth';

const Home = () => {
  const z = 2;

  return (
    <View>
      <Text>Home</Text>
      <Button onPress={() => auth().signOut()}>
        Logout
      </Button>
    </View>
  );
}

export default Home;
