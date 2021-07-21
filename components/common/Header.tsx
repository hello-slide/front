/**********************************************************
 * Header
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/

import {
  Box,
  Flex,
  Spacer,
  Avatar,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  Center,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Heading,
  Text,
  Link,
} from '@chakra-ui/react';
import React from 'react';
import {FcGoogle} from 'react-icons/fc';
import Logo from '../../assets/svgs/logo.svg';

const Header: React.FC<{isLogin: boolean}> = ({isLogin}) => {
  const Login = () => {
    return <Avatar size="sm" />;
  };

  const NoLogin = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
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
              <Center margin="3rem 0 0 0">
                <Heading fontSize="1.7rem">HelloSlideにログインする</Heading>
              </Center>
              <Center>
                <Box height="6rem" display="flex" alignItems="center">
                  <Button onClick={onOpen} leftIcon={<FcGoogle />}>
                    Googleでログイン
                  </Button>
                </Box>
              </Center>
              <Center margin="0 1rem 1.3rem 1rem">
                <Text>
                  ログインすると、<Link>利用規約</Link>と
                  <Link>プライバシーポリシー</Link>に同意したとみなされます。
                </Text>
              </Center>
            </ModalBody>
          </ModalContent>
        </Modal>
      </React.Fragment>
    );
  };

  return (
    <Box width="100%">
      <Flex paddingLeft={{base: '1rem'}} paddingRight={{base: '3rem'}}>
        <Box display="flex" alignItems="center">
          <Logo width="15rem" />
        </Box>
        <Spacer />
        <Box display={{base: 'none', sm: 'flex'}} alignItems="center">
          {isLogin ? <Login /> : <NoLogin />}
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
