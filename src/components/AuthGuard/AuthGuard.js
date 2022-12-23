import React from 'react';
import { Text, View } from 'react-native';
import useUser from 'src/hooks/useUser';

function AuthGuard({ children }) {
  const { user, initializing } = useUser();

  if (initializing) {
    return (
      <View>
        <Text>initializing</Text>
      </View>
    )
  }

  if (user === null) {
    return (
      <View>
        <Text>No user</Text>
      </View>
    )
  }

  return children;
}

export default AuthGuard;

