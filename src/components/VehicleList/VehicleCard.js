import React, { memo } from 'react';
import { AspectRatio, Box, Image, Stack, Heading, Text, Skeleton } from 'native-base';
import { NumericFormat } from 'react-number-format';
import { IMAGES_URL } from '@env';
import { formatLargeTransmission, titleCaps } from '../../utils';

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
      <AspectRatio w="100%" ratio={9/6}>
        <Image
          source={{
            uri: `${IMAGES_URL}/500x300max/filters:format(webp)/${vehicle?.images?.[0]?.filename}`,
          }}
          alt="image"
        />
      </AspectRatio>
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
