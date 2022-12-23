import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from 'src/screens/Login';

const Stack = createNativeStackNavigator();

const RootStackNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: 'Login' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);


export default RootStackNavigator;
