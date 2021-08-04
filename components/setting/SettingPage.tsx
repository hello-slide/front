/**********************************************************
 * Setting page
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {
  Box,
  Avatar,
  Center,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import _deleteAccount from '../../utils/api/delete';
import {UserDataState, LoadState} from '../../utils/state/atom';

const SettingPage = () => {
  const userData = useRecoilValue(UserDataState);
  const setIsLoad = useSetRecoilState(LoadState);
  const toast = useToast();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const router = useRouter();

  React.useEffect(() => {
    if (typeof userData.loginToken === 'undefined') {
      router.push('/');
    }
  });

  const deleteAccount = () => {
    // TODO: delete account logic
    setIsLoad(true);
    _deleteAccount(userData.loginToken)
      .then(() => {
        router.push('/');
        toast({
          title: 'アカウントを削除しました。',
          status: 'info',
          duration: 9000,
          isClosable: true,
        });
        setIsLoad(false);
      })
      .catch(error => {
        toast({
          title: 'アカウントを削除できませんでした',
          description: error,
          status: 'error',
        });
        setIsLoad(false);
      });
  };

  const isLogin = () => {
    if (typeof userData.loginToken === 'undefined') {
      toast({
        title: 'おっと、ログインされていないようです。',
        status: 'warning',
        duration: 9000,
        isClosable: true,
      });
    } else {
      onOpen();
    }
  };

  return (
    <Box marginY="3rem">
      <Center>
        <Avatar size="xl" src={userData.image} name={userData.name} />
      </Center>
      <Center>
        <Text fontWeight="bold" fontSize="1.5rem" textAlign="center">
          {userData.name}
        </Text>
      </Center>
      <Center marginTop="5rem">
        <Text
          _hover={{textDecoration: 'underline'}}
          cursor="pointer"
          onClick={isLogin}
        >
          アカウントを削除する
        </Text>
      </Center>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>本当に削除しますか？</ModalHeader>
          <ModalCloseButton size="lg" />
          <ModalBody>
            すべてのスライドが削除されます。
            <br />
            この操作は戻すことはできません。
          </ModalBody>

          <ModalFooter marginBottom=".3rem">
            <Button variant="blue" mr={3} onClick={onClose}>
              キャンセル
            </Button>
            <Button colorScheme="blue" onClick={deleteAccount}>
              削除する
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SettingPage;
