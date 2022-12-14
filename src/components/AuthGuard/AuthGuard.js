import React from 'react';
import { Text, View } from 'react-native';
import useUser from 'src/hooks/useUser';
import Login from 'src/screens/Login';

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
    return <Login />;
  }

  return children;
}

export default AuthGuard;

