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
import {useRecoilValue, useSetRecoilState} from 'recoil';
import CreatePage from '../../utils/api/createPage';
import {
  NowPageDataState,
  LoadState,
  CurrentPageState,
  PagesState,
} from '../../utils/state/atom';

const NewPage: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({isOpen, onClose}) => {
  const [selectItem, setSelectItem] = React.useState('');
  const toast = useToast();
  const nowPageData = useRecoilValue(NowPageDataState);
  const setLoad = useSetRecoilState(LoadState);
  const setCurrentPage = useSetRecoilState(CurrentPageState);
  const setPages = useSetRecoilState(PagesState);

  React.useEffect(() => {
    setSelectItem('');
  }, [isOpen]);

  const create = () => {
    setLoad(true);
    const createPageAPI = new CreatePage();

    createPageAPI
      .run(nowPageData?.id, selectItem)
      .then(value => {
        const newElement = {
          id: value.page_id,
          type: value.type,
        };
        setCurrentPage(newElement);

        setPages(value => {
          const a = [...value];
          a.push(newElement);
          return a;
        });
        setLoad(false);
      })
      .catch(error => {
        setLoad(false);
        toast({
          title: '新しいページを作成できませんでした',
          description: `${error}`,
          status: 'error',
        });
      });
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
