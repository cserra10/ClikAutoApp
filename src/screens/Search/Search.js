import React, { memo, useState } from 'react';
import {
  VStack,
  Button,
  Modal,
} from 'native-base';
import Filters from 'src/components/Filters';
import { useSelector } from 'react-redux';

const Vehicles = () => null;

const Search = () => {
  const [showFilters, setShowFilters] = useState(true);
  const { makers, modelsByMaker } = useSelector(s => s.filters);

  console.log(JSON.stringify({ makers, modelsByMaker }, null, 3));
  const toggleFilters = () => setShowFilters(prev => !prev);

  return (
    <VStack>
      <Button onPress={toggleFilters}>
        Show Filters
      </Button>
      <Modal isOpen={showFilters}>
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
      <Vehicles />
    </VStack>
  );
}
export default memo(Search);
