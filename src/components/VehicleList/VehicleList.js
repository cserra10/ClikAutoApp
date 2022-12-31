import React, { memo } from 'react';
import { useQuery } from 'react-query';
import useAxios from 'src/hooks/useAxios';
import { useSelector } from 'react-redux';
import { FlatList, Text } from 'native-base';
import VehicleCard from './VehicleCard';

const VehicleList = () => {
  const api = useAxios();
  const { makers, modelsMyMaker } = useSelector(s => s.filters);
  const query = useQuery(
    ['vehicles', []],
    () => api.get('inventory', { params: {} })
  )

  const vehicles = query?.data?.data?.inventory ?? [];

  console.log(query, vehicles);

  return query.isSuccess ? (
    <FlatList
      data={vehicles}
      renderItem={({ item }) => <VehicleCard vehicle={item} />}
    />
  ) : <Text>{query.status}</Text>;
};

export default memo(VehicleList);
