import React, { memo } from 'react';
import { AspectRatio, Box, Image, Center, Stack, Heading, Text } from 'native-base';
import { IMAGES_URL } from '@env';

const VehicleCard = ({ vehicle }) => (
  <Box
    rounded="lg"
    overflow="hidden"
    shadow="2"
    _dark={{
      borderColor: 'coolGray.600',
      backgroundColor: 'gray.700'
    }}
    _light={{
      backgroundColor: 'gray.50'
    }}
    mb="4"
  >
    <Box>
      <AspectRatio w="100%" ratio={16 / 9}>
        <Image
          source={{
            uri: `${IMAGES_URL}/300x200max/filters:format(webp)/${vehicle?.images?.[0]?.filename}`
          }}
          alt="image"
        />
      </AspectRatio>
      <Center
        bg="violet.500"
        _dark={{
          bg: 'violet.400'
        }}
        _text={{
          color: 'warmGray.50',
          fontWeight: '700',
          fontSize: 'xs'
        }}
        position="absolute"
        bottom="0"
        px="3"
        py="1.5"
      >
        PHOTOS
      </Center>
    </Box>

    <Stack p="4" space={3}>
      <Stack space={2}>
        <Heading size="md" ml="-1">
          {vehicle.maker} {vehicle.mode} {vehicle.year}
        </Heading>
        <Text
          fontSize="xs"
          _light={{
            color: 'violet.500'
          }}
          _dark={{
            color: 'violet.400'
          }}
          fontWeight="500"
          ml="-0.5"
          mt="-1"
        >
          {vehicle.price}
        </Text>
      </Stack>
    </Stack>
  </Box>
  );

export default memo(VehicleCard);
