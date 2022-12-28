import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import useUser from 'src/hooks/useUser';

const Dashboard = () => {
  const { user, initializing } = useUser();
  const navigations = useNavigation();

  if (initializing) {
    return (
      <View>
        <Text>initializing</Text>
      </View>
    )
  }

  if (user === null) {
    navigations.navigate('Login');
  }
  return (
    <View>
      <Text>Dashboard {JSON.stringify(user)}</Text>
      <Button title="Logout" onPress={() => auth().signOut()} />
    </View>
  )
}

export default Dashboard;
