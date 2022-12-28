import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from 'src/screens/Dashboard';
import AuthGuard from 'src/components/AuthGuard';

const Stack = createNativeStackNavigator();

const RootStackNavigator = () => (
  <AuthGuard>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ title: 'Dashboard' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </AuthGuard>
);


export default RootStackNavigator;
