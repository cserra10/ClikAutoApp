import React, { memo, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, Skeleton, Spinner, Actionsheet, Button, HStack, Icon, Text } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import pickBy from 'lodash/pickBy';
import useAxios from 'src/hooks/useAxios';
import { setFilter } from 'src/redux/reducers/filters';
import { NumericFormat } from 'react-number-format';
import VehicleCard from './VehicleCard';

const VehicleList = () => {
  const api = useAxios();
  const [showActionSheet, setShowActionSheet] = useState(true);
  const dispatch = useDispatch();
  const { sort, perPage, makers, modelsByMaker } = useSelector(s => s.filters);

  const selectedFilters =  pickBy({
    sort,
    perPage,
    maker: makers,
    model: Object.values(modelsByMaker).filter(item => !!item).join(','),
  });

  const query = useInfiniteQuery(
    ['vehicles', selectedFilters],
    ({ pageParam = 0 }) => api.get('inventory', {
      params: { ...selectedFilters, page: pageParam },
    }),
    {
      keepPreviousData: true,
      getPreviousPageParam: (firstPage) => firstPage?.data?.pagination?.previousPage ?? false,
      getNextPageParam: (lastPage) => lastPage?.data?.pagination?.nextPage ?? false,
    }
  );

  const vehicles =
    query.isSuccess ? query?.data?.pages?.map(page => page?.data?.inventory).flat() ?? [] :
    query.isLoading ? [{ id: '1' }, { id: '2' }] : [];

  const loadMore = () => {
    if (query.hasNextPage) {
      query.fetchNextPage();
    }
  };

  const toggleActionSheet = () => setShowActionSheet(prev => !prev);

  const sortOptions = [
    {
      label: 'year',
      value: 'year:desc',
    },
    {
      label: 'year',
      value: 'year:asc',
    },
    {
      label: 'price',
      value: 'price:desc',
    },
    {
      label: 'price',
      value: 'price:asc',
    },
    {
      label: 'mileage',
      value: 'mileage:desc',
    },
    {
      label: 'mileage',
      value: 'mileage:asc',
    },
  ];

  const setSort = (value) => {
    dispatch(setFilter({
      key: 'sort',
      value
    }));
    toggleActionSheet();
  }

  return (
    <>
      <FlatList
        ListHeaderComponent={(
          <HStack
            justifyContent="space-between"
            alignItems="center"
          >
            <Text
              fontSize="xs"
              key="1"
            >
              <NumericFormat
                displayType="text"
                value={query?.data?.pages?.[0]?.data?.pagination?.totalEntries}
                renderText={value => value}
                thousandSeparator
                suffix=" results"
              />
            </Text>

            <Button
              key="2"
              onPress={toggleActionSheet}
              mb="2"
              variant="ghost"
              alignSelf="flex-end"
              size="sm"
              endIcon={<Icon as={Feather} name={showActionSheet ? 'chevron-up' : 'chevron-down'} />}
            >
              {sort || 'Order By'}
            </Button>
          </HStack>
        )}
        p="4"
        data={vehicles}
        renderItem={({ item }) => query.isSuccess ? (
          <VehicleCard
            vehicle={item}
            loading={query.isLoading}
          />
        ) : query.isLoading ? (
          <Skeleton
            height="64"
            mb="4"
            rounded="lg"
          />
        ) : null}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={query.isFetchingNextPage ? <Spinner size='lg' mt="-1" mb="5" /> : null}
      />

      <Actionsheet
        isOpen={showActionSheet}
        onClose={toggleActionSheet}
      >
        <Actionsheet.Content p="0">
          {sortOptions.map((option) => (
            <Actionsheet.Item
              key={option.value}
              bg={sort === option.value ? 'primary.600' : 'white'}
              _text={{
                color: sort === option.value ? 'white' : undefined
              }}
              onPress={() => setSort(option.value)}
              _pressed={{
                bg: 'primary.600'
              }}
            >
              {option.value}
            </Actionsheet.Item>
          ))}r
        </Actionsheet.Content>
      </Actionsheet>
    </>
  )
};

export default memo(VehicleList);
