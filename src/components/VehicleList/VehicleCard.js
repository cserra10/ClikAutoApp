import React, { memo } from 'react';
import { AspectRatio, Box, Image, Stack, Heading, Text, Skeleton, Icon, IconButton, Center } from 'native-base';
import { NumericFormat } from 'react-number-format';
import { IMAGES_URL } from '@env';
import Feather from 'react-native-vector-icons/Feather';
import { formatLargeTransmission, getVehicleStatus, titleCaps } from 'src/utils';


const VehicleStatus = ({ vehicle }) => {
  const status = getVehicleStatus(vehicle);
  let bgColor = 'primary.600';
  if (status === 'AVAILABLE') {
    bgColor = 'green.600'
  }

  return (
    <Box
      py="1"
      px="2"
      bgColor={bgColor}
    >
      <Text
        fontSize="xs"
        color="white"
        bold
      >
        {titleCaps(status)}
      </Text>
    </Box>
  )
}

const VehicleCard = ({ vehicle, skeleton }) => {
  if (skeleton) {
    return (
      <Skeleton height={40} />
    )
  }

  return (
    <Box
      rounded="lg"
      overflow="hidden"
      _dark={{
        borderColor: 'coolGray.600',
        backgroundColor: 'gray.700'
      }}
      // _light={{
      //   backgroundColor: 'coolGray.300',
      // }}
      borderColor="gray.50"
      borderWidth="1"
      mb="4"
      shadow="2"
    >
      <Box>
        <AspectRatio w="100%" ratio={9/6}>
          <Image
            source={{
              uri: `${IMAGES_URL}/500x300max/filters:format(webp)/${vehicle?.images?.[0]?.filename}`,
            }}
            alt="image"
          />
        </AspectRatio>
        <Center
          position="absolute"
          bottom="0"
        >
          <VehicleStatus vehicle={vehicle} />
        </Center>
        <IconButton
          position="absolute"
          right="2"
          top="2"
          backgroundColor="white"
          icon={
            <Icon
              size="4"
              color="primary.600"
              as={Feather}
              name="heart"
            />
          }
        />
      </Box>
      <Stack p="3" space={3}>
        <Stack space={2}>
          <Heading size="md">
            {titleCaps(`${vehicle.maker} ${vehicle.model}`)}
          </Heading>
          <Text fontSize="xs" mt={-1}>
            {vehicle.year}
            {' | '}
            <NumericFormat
              displayType="text"
              value={vehicle.mileage}
              renderText={value => value}
              thousandSeparator
              suffix=" Km"
            />
            {' | '}
            {formatLargeTransmission(vehicle.transmission)}
          </Text>

          <Text fontSize="xs" color="primary.600">
            <NumericFormat
              displayType="text"
              value={vehicle.price}
              renderText={value => value}
              thousandSeparator
              decimalScale={0}
              prefix="$"
            />
          </Text>
        </Stack>
      </Stack>
    </Box>
  )
};

export default memo(VehicleCard);
