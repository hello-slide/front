/**********************************************************
 * New Page Modal
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  SimpleGrid,
  Flex,
  Center,
} from '@chakra-ui/react';
import React from 'react';

const NewPage: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  handleChange: (type: string, id: string) => void;
}> = ({isOpen, onClose, handleChange}) => {
  const [selectItem, setSelectItem] = React.useState('');
  const toast = useToast();

  React.useEffect(() => {
    setSelectItem('');
  }, [isOpen]);

  const create = () => {
    // TODO: Create page api logic.
    const id = Math.floor(Math.random() * 100000).toString();
    handleChange(selectItem, id);
    onClose();
  };

  const SelectType: React.FC<{type: string}> = props => {
    return (
      <Flex
        width="7rem"
        height="4rem"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        backgroundColor={props.type === selectItem ? 'blue.300' : 'gray.100'}
        borderRadius="5px"
        onClick={() => {
          setSelectItem(props.type);
        }}
        cursor="pointer"
        fontWeight="bold"
      >
        {props.children}
      </Flex>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center" marginTop=".5rem">
          新しいページを作成する
        </ModalHeader>
        <ModalCloseButton size="lg" />
        <ModalBody>
          <Center>
            <SimpleGrid columns={2} spacing={10}>
              <SelectType type="quiz">クイズ</SelectType>
              <SelectType type="question">質問</SelectType>
            </SimpleGrid>
          </Center>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={create}>
            作成
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewPage;
