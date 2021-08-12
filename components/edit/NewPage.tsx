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
import {useRecoilState, useRecoilValue} from 'recoil';
import createPage from '../../utils/api/createPage';
import {UserDataState, NowPageData} from '../../utils/state/atom';

const NewPage: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  handleChange: (type: string, id: string) => void;
}> = ({isOpen, onClose, handleChange}) => {
  const [selectItem, setSelectItem] = React.useState('');
  const [userData, setUserData] = useRecoilState(UserDataState);
  const toast = useToast();
  const nowPageData = useRecoilValue(NowPageData);

  React.useEffect(() => {
    setSelectItem('');
  }, [isOpen]);

  const create = () => {
    createPage(
      userData.sessionToken,
      userData.refreshToken,
      nowPageData?.id,
      selectItem,
      (sessionToken, refreshToken, isFailed) => {
        if (isFailed) {
          setUserData({
            name: '',
            image: '',
          });
        } else {
          setUserData(value => ({
            name: value.name,
            image: value.image,
            sessionToken: sessionToken,
            refreshToken: refreshToken,
          }));
        }
      }
    )
      .then(value => {
        handleChange(value.type, value.page_id);
      })
      .catch(error => {
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
