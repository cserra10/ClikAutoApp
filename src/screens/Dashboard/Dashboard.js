import React from 'react';
import { VStack, HStack, Text, Pressable, Button, Center, Icon, Box } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Material from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useUser from 'src/hooks/useUser';
import Home from 'src/screens/Home';
import Search from 'src/screens/Search';


const DashboardNavigator = createNativeStackNavigator();
const Dashboard = () => {
  const { user, initializing } = useUser();
  const navigations = useNavigation();
  const [selected, setSelected] = React.useState(0);

  if (initializing) {
    return (
      <VStack>
        <Text>initializing</Text>
      </VStack>
    )
  }

  if (user === null) {
    navigations.navigate('Login');
  }

  const sections = [
    {
      label: 'Home',
      icon: 'home',
      content: <Home />
    },
    {
      label: 'Buy',
      icon: 'magnify',
      content: <Search />
    },
    {
      label: 'Sell',
      icon: 'cash',
      content: <Search />
    }
  ];

  return (
    <VStack
      flex="1"
    >

      {sections[selected].content}

      <HStack
        alignItems="center"
        safeAreaBottom
        mt="auto"
      >
        {sections.map((menuItem, index) => (
          <Pressable
            key={menuItem.label}
            py="3"
            cursor="pointer"
            flex={1}
            onPress={() => setSelected(index)}
          >
            <Center>
              <Icon
                mb="1"
                as={MaterialCommunity}
                name={menuItem.icon}
                color={index === selected ? 'primary.600' : 'text.500'}
                size="lg"
              />
              <Text
                color={index === selected ? 'primary.600' : 'text.500'}
                fontSize="12"
              >
                {menuItem.label}
              </Text>
            </Center>
          </Pressable>
        ))}
      </HStack>
    </VStack>
  );
}

export default Dashboard;
