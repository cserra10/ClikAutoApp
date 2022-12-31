import React from 'react';
import { Box, StatusBar, VStack } from 'native-base';

const Screen = ({ children }) => (
  <>
    <StatusBar
      translucent
      backgroundColor="transparent"
      barStyle="light-content"
    />
    <VStack
      bgColor="primary.600"
      flex="1"
    >
      <Box
        safeAreaTop
        _light={{
          bg: 'primary.600',
        }}
        _dark={{
          bg: 'coolGray.900',
        }}
      />
      {children}
    </VStack>
  </>
);

export default Screen;
