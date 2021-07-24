/**********************************************************
 * Login page
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  Heading,
  Center,
  Flex,
  ModalContent,
  Text,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React from 'react';
import Link from './Link';
import Login from './Login';

const LoginButton = () => {
  const router = useRouter();
  const {isOpen, onOpen, onClose} = useDisclosure();

  React.useEffect(() => {
    router.events.on('routeChangeStart', onClose);
  });

  const From = () => {
    return (
      <React.Fragment>
        <Center margin="3rem 0 0 0">
          <Heading fontSize="1.7rem">HelloSlideにログインする</Heading>
        </Center>
        <Center>
          <Flex height="6rem" alignItems="center">
            <Login />
          </Flex>
        </Center>
        <Center margin="0 1rem 1.3rem 1rem">
          <Text>
            ログインすると、
            <Link href="/terms" onClick={onClose}>
              利用規約
            </Link>
            と
            <Link href="/privacy" onClick={onClose}>
              プライバシーポリシー
            </Link>
            に同意したとみなされます。
          </Text>
        </Center>
      </React.Fragment>
    );
  };

  const NoForm = () => {
    return (
      <React.Fragment>
        <Center margin="3rem 0 2rem 0">
          <Heading fontSize="1.5rem">m(；∇；)mゴメンネ</Heading>
        </Center>
        <Center margin="0 1rem 1.3rem 1rem">
          <Text>スマートフォンからのログインはできません。</Text>
        </Center>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Button colorScheme="blue" onClick={onOpen}>
        Login
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton size="lg" />
          <ModalBody>
            {window.matchMedia &&
            window.matchMedia('(max-device-width: 640px)').matches ? (
              <NoForm />
            ) : (
              <From />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default LoginButton;
