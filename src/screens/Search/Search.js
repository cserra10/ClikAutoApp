import React from 'react';
import { Box, Text, View, VStack } from 'native-base';


const Filters = () => null;


const Vehicles = () => null;

const Search = () => {
  const z = 2;

  return (
    <VStack>
      <Box
        safeAreaTop
        _light={{
          bg: 'primary.900',
        }}
        _dark={{
          bg: 'coolGray.900',
        }}
      />
      <Filters />
      <Vehicles />
    </VStack>
  );
}

export default Search;
