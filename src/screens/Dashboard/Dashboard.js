import React from 'react';
import { VStack, HStack, Text, Pressable, Center, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Screen from 'src/components/Screen';
import useUser from 'src/hooks/useUser';
import Home from 'src/screens/Home';
import Search from 'src/screens/Search';

const Dashboard = () => {
  const { user, initializing } = useUser();
  const navigations = useNavigation();
  const [selected, setSelected] = React.useState(1);

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
    <Screen>
      {sections[selected].content}

      <HStack
        alignItems="center"
        safeAreaBottom
        mt="auto"
        _light={{
          bg: 'white',
        }}
        _dark={{
          bg: 'coolGray.900',
        }}
      >
        {sections.map((menuItem, index) => (
          <Pressable
            key={menuItem.label}
            pt="2"
            cursor="pointer"
            flex={1}
            onPress={() => setSelected(index)}
          >
            <Center>
              <Icon
                mb="1"
                as={MaterialCommunity}
                name={menuItem.icon}
                color={index === selected ? 'primary.900' : 'text.400'}
                size="lg"
              />
              <Text
                color={index === selected ? 'primary.900' : 'text.400'}
                bold
              >
                {menuItem.label}
              </Text>
            </Center>
          </Pressable>
        ))}
      </HStack>
    </Screen>
  );
}

export default Dashboard;
