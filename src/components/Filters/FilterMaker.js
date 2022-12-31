import React, { useState, memo } from 'react';
import { Box, Checkbox, HStack, Icon, Pressable, Text, VStack } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Collapsible from 'react-native-collapsible';
import { titleCaps } from 'src/utils';
import { toggleMake } from 'src/redux/reducers/filters';
import { useDispatch, useSelector } from 'react-redux';
import FiltersModel from './FiltersModel';

const FilterMaker = ({ makers = [] }) => {
  const dispatch = useDispatch();
  const selectedMakers = useSelector(s => s.filters.makers);
  const [open, setOpen] = useState({});

  const toggleOpen = (maker) => () => {
    setOpen(prev => ({
      ...prev,
      [maker]: !prev[maker],
    }))
  };

  return (
    <VStack>
      {makers.map((maker) => (
        <Box key={maker.name}>
          <Pressable onPress={toggleOpen(maker.name)}>
            {({ isPressed }) => (
              <HStack
                alignItems="center"
                p="2"
                bgColor={ isPressed ? 'muted.100' : 'white'}
              >
                <Text flex="1">{titleCaps(maker.name)}</Text>
                <Checkbox
                  isChecked={selectedMakers.includes(maker.name)}
                  onChange={() => dispatch(toggleMake(maker.name))}
                  accessibilityLabel="Select"
                  mr="2"
                  size="sm"
                />
                <Icon
                  size="4"
                  color="coolGray.400"
                  as={Feather}
                  name={open[maker.name] ? 'chevron-up' : 'chevron-down'}
                />
              </HStack>
            )}
          </Pressable>
          <Collapsible collapsed={!open[maker.name]}>
            <Box p="2">
              <FiltersModel
                maker={maker.name}
                enabled={!!open[maker.name]}
              />
            </Box>
          </Collapsible>
        </Box>
      ))}
    </VStack>
  );
}

export default memo(FilterMaker);
