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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import {IoSettingsSharp, IoLogOutOutline} from 'react-icons/io5';
import NoSSR from 'react-no-ssr';
import {useRecoilState} from 'recoil';
import Logo from '../../assets/svgs/logo.svg';
import {UserDataState} from '../../utils/state/atom';
import Link from './Link';
import Login from './Login';

const Header: React.FC = React.memo(() => {
  const IsLogin = React.memo(() => {
    const [userData, setUserData] = useRecoilState(UserDataState);

    return (
      <Menu>
        <MenuButton
          as={Avatar}
          size="md"
          cursor="pointer"
          src={userData.image}
        />
        <MenuList padding="0">
          <NextLink href="/dashboard">
            <MenuItem
              fontSize="1rem"
              fontWeight="bold"
              padding="1rem 0 1rem 1rem"
            >
              {userData.name}
            </MenuItem>
          </NextLink>
          <MenuDivider margin="0" />
          <NextLink href="/setting">
            <MenuItem icon={<IoSettingsSharp />} padding=".5rem 0 .5rem 1rem">
              設定
            </MenuItem>
          </NextLink>
          <MenuItem
            height="100%"
            icon={<IoLogOutOutline />}
            onClick={() => setUserData({name: '', image: ''})}
            padding=".5rem 0 .5rem 1rem"
          >
            ログアウト
          </MenuItem>
        </MenuList>
      </Menu>
    );
  });

  IsLogin.displayName = 'IsLogin';

  const IsNoLogin = () => {
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
                <Flex height="6rem" alignItems="center">
                  <Login />
                </Flex>
              </Center>
              <Center margin="0 1rem 1.3rem 1rem">
                <Text>
                  ログインすると、<Link href="/terms">利用規約</Link>と
                  <Link href="/privacy">プライバシーポリシー</Link>
                  に同意したとみなされます。
                </Text>
              </Center>
            </ModalBody>
          </ModalContent>
        </Modal>
      </React.Fragment>
    );
  };

  const [userData] = useRecoilState(UserDataState);

  return (
    <Box width="100%">
      <Flex
        paddingLeft={{base: '2rem', sm: '1rem'}}
        paddingRight={{base: '3rem'}}
        paddingTop={{base: '2rem', sm: '0'}}
      >
        <Flex alignItems="center">
          <Link href="/">
            <Logo width="15rem" />
          </Link>
        </Flex>
        <Spacer />
        <Box display={{base: 'none', sm: 'flex'}} alignItems="center">
          <NoSSR>
            <NoSSR>
              {typeof userData.token !== 'undefined' ? (
                <IsLogin />
              ) : (
                <IsNoLogin />
              )}
            </NoSSR>
          </NoSSR>
        </Box>
      </Flex>
    </Box>
  );
});

Header.displayName = 'Header';

export default Header;
