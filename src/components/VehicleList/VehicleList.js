import React, { memo } from 'react';
import { useQuery } from 'react-query';
import useAxios from 'src/hooks/useAxios';
import { useSelector } from 'react-redux';
import { FlatList, Skeleton } from 'native-base';
import pickBy from 'lodash/pickBy';
import VehicleCard from './VehicleCard';

const VehicleList = () => {
  const api = useAxios();
  const { perPage, makers, modelsByMaker } = useSelector(s => s.filters);
  const params =  pickBy({
    perPage,
    maker: makers,
    model: Object.values(modelsByMaker).filter(item => !!item).join(','),
  });

  const query = useQuery(
    ['vehicles', [params]],
    () => api.get('inventory', { params }),
    {
      keepPreviousData: true,
    }
  );

  const vehicles =
    query.isSuccess ? query?.data?.data?.inventory :
    query.isLoading ? [1,2,3] : [];

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
    />
  )
};

export default memo(VehicleList);
