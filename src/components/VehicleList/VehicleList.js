import React, { memo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { FlatList, Skeleton, Spinner } from 'native-base';
import pickBy from 'lodash/pickBy';
import useAxios from 'src/hooks/useAxios';
import VehicleCard from './VehicleCard';

const VehicleList = () => {
  const api = useAxios();
  const { perPage, makers, modelsByMaker } = useSelector(s => s.filters);
  const selectedFilters =  pickBy({
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

  return (
    <FlatList
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
  )
};

export default memo(VehicleList);
