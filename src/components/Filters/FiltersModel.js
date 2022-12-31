import React, { memo } from 'react';
import { useQuery } from 'react-query';
import { Button, HStack, Text } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { titleCaps } from 'src/utils';
import useAxios from 'src/hooks/useAxios';
import { toggleModel } from 'src/redux/reducers/filters';

const FiltersModel = ({ maker, enabled }) => {
  const dispatch = useDispatch();
  const selectedModels = useSelector(s => s.filters.modelsByMaker[maker] || '');
  const api = useAxios();
  const modelsQuery = useQuery(
    ['models', maker],
    () => api.get('filters/models', { params: { maker } }),
    { enabled, keepPreviousData: true }
  );

  const models = modelsQuery?.data?.data ?? [];

  return modelsQuery.isSuccess ? (
    <HStack flexWrap="wrap" space="2">
      {models.map((model) => (
        <Button
          key={model.name}
          mb="2"
          size="xs"
          variant={selectedModels.includes(model.name) ? 'solid' : 'outline'}
          onPress={() => dispatch(toggleModel({ model: model.name, maker }))}
          borderWidth="0.5"
          borderColor="muted.200"
        >
          {titleCaps(model.name)}
        </Button>
      ))}
    </HStack>
  ) : <Text>{modelsQuery.status}</Text>;
}

export default memo(FiltersModel);
