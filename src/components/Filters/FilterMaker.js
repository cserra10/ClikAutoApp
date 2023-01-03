import React, { memo } from 'react';
import { Box, HStack, Icon, Pressable, Text, VStack } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Collapsible from 'react-native-collapsible';
import { titleCaps } from 'src/utils';
import { toggleMake } from 'src/redux/reducers/filters';
import { useDispatch, useSelector } from 'react-redux';
import FiltersModel from './FiltersModel';

const FilterMaker = ({ makers = [] }) => {
  const dispatch = useDispatch();
  const selectedMakers = useSelector(s => s.filters.makers);

  const handleToggleMaker = (makerName) => () => {
    dispatch(toggleMake(makerName));
  };

  return (
    <VStack>
      {makers.map((maker) => {
        const selected = selectedMakers.includes(maker.name);
        return (
          <Box key={maker.name}>
            <Pressable onPress={handleToggleMaker(maker.name)}>
              {({ isPressed }) => (
                <HStack
                  alignItems="center"
                  p="2"
                  bgColor={ selected ? 'primary.600' : isPressed ? 'muted.100' : 'white'}
                >
                  <Text flex="1" color={selected ? 'white' : undefined}>{titleCaps(maker.name)}</Text>
                  {selected && (
                    <Icon
                      size="4"
                      color="white"
                      as={Feather}
                      name='check'
                    />
                  )}
                </HStack>
              )}
            </Pressable>
            <Collapsible collapsed={!selected}>
              <Box pt="2" minH={60}>
                <FiltersModel
                  maker={maker.name}
                  enabled={selected}
                />
              </Box>
            </Collapsible>
          </Box>
        )
      })}
    </VStack>
  );
}

export default memo(FilterMaker);
