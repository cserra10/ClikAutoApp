import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
    <View><Text>Dashboard {JSON.stringify(user)}</Text></View>
  )
}

export default Dashboard;
