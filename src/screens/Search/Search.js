import React, { memo, useState } from 'react';
import {
  VStack,
  Button,
  Modal,
} from 'native-base';
import Filters from 'src/components/Filters';
import { useSelector } from 'react-redux';
import VehicleList from 'src/components/VehicleList';

const Search = () => {
  const [showFilters, setShowFilters] = useState(false);
  const toggleFilters = () => setShowFilters(prev => !prev);

  const filtersModal = (
    <Modal
      isOpen={showFilters}
      size="xl"
    >
      <Modal.Content>
        <Modal.Header>
          Filters
        </Modal.Header>
        <Modal.Body p="0" >
          <Filters />
        </Modal.Body>
        <Modal.Footer>
          <Button.Group>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={toggleFilters}
            >
              Cancel
            </Button>
            <Button onPress={toggleFilters}>
              Apply
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );

  return (
    <VStack px="4">
      <Button onPress={toggleFilters}>
        Show Filters
      </Button>
      {filtersModal}
      <VehicleList />
    </VStack>
  );
}
export default memo(Search);
