import React, { useState, memo } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import Feather from 'react-native-vector-icons/Feather';
import { Box, HStack, Icon, Pressable, Text, View, VStack } from 'native-base';
import Collapsible from 'react-native-collapsible';
import useAxios from 'src/hooks/useAxios';
import FilterMaker from './FilterMaker';

const Filters = () => {
  const { makers, models } = useSelector(s => s.filters);
  const api = useAxios();
  const filtersMetaQuery = useQuery(
    ['filtersMeta', makers, models],
    () => api.get('filters', { params: {} }),
    { keepPreviousData: true },
  );

  const [open, setOpen] = useState({});

  const toggleOpen = (key) => () => {
    setOpen(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
  };

  const metaFilters = filtersMetaQuery?.data?.data;

  if (filtersMetaQuery.isLoading) {
    return <View><Text>Loading</Text></View>
  }

  const sections = filtersMetaQuery.isSuccess ? [
    {
      id: 'makeModel',
      title: 'Make & Model',
      content: (
        <FilterMaker makers={metaFilters?.makers} />
      )
    },

    {
      id: 'price',
      title: 'Price',
      content: <View><Text>Price</Text></View>
    },

    {
      id: 'location',
      title: 'Location',
      content: <View><Text>Location</Text></View>
    },
  ] : [];

  return (
    <VStack bgColor="white">
      {sections.map((section) => (
        <Box key={section.id}>
          <Pressable onPress={toggleOpen(section.id)}>
            {({ isPressed }) => (
              <HStack alignItems="center" p="2" bgColor={ isPressed ? 'muted.100' : 'white'}>
                <Text flex="1">{section.title}</Text>
                <Icon
                  size="4"
                  color="coolGray.400"
                  as={Feather}
                  name={open[section.id] ? 'chevron-up' : 'chevron-down'}
                />
              </HStack>
            )}
          </Pressable>
          <Collapsible collapsed={!open[section.id]}>
            <Box px="2">
              {section.content}
            </Box>
          </Collapsible>
        </Box>
      ))}
    </VStack>
  );
};

export default memo(Filters);
