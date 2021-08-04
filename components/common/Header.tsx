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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useToast,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import {useGoogleLogout} from 'react-google-login';
import {IoSettingsSharp, IoLogOutOutline} from 'react-icons/io5';
import NoSSR from 'react-no-ssr';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useSetRecoilState} from 'recoil';
import Logo from '../../assets/svgs/logo.svg';
import logout from '../../utils/api/logout';
import {UserDataState} from '../../utils/state/atom';
import {LoadState} from '../../utils/state/atom';
import Link from './Link';
import LoginButton from './LoginButton';

const Header: React.FC = React.memo(() => {
  const IsLogin = React.memo(() => {
    const toast = useToast();
    const [userData, setUserData] = useRecoilState(UserDataState);
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const setIsLoad = useSetRecoilState(LoadState);

    const {signOut, loaded} = useGoogleLogout({
      clientId: googleClientId,
      onLogoutSuccess: () => {
        setIsLoad(true);
        logout(userData.loginToken)
          .then(() => {
            setUserData({name: '', image: ''});
            toast({
              title: 'ログアウトしました',
              status: 'info',
              isClosable: true,
            });
            setIsLoad(false);
          })
          .catch(error => {
            toast({
              title: 'ログアウトできませんでした',
              description: error,
              status: 'error',
            });
            setIsLoad(false);
          });
      },
    });

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
            onClick={signOut}
            disabled={!loaded}
            padding=".5rem 0 .5rem 1rem"
          >
            ログアウト
          </MenuItem>
        </MenuList>
      </Menu>
    );
  });

  IsLogin.displayName = 'IsLogin';

  const userData = useRecoilValue(UserDataState);

  return (
    <Box width="100%">
      <Flex
        paddingLeft="1rem"
        paddingRight={{base: '3rem'}}
        paddingTop={{base: '1rem', sm: '0'}}
      >
        <Flex alignItems="center">
          <Link href="/">
            <Box width={{base: '10rem', sm: '15rem'}}>
              <Logo />
            </Box>
          </Link>
        </Flex>
        <Spacer />
        <Box display={{base: 'none', sm: 'flex'}} alignItems="center">
          <NoSSR>
            {typeof userData.loginToken !== 'undefined' ? (
              <IsLogin />
            ) : (
              <LoginButton />
            )}
          </NoSSR>
        </Box>
      </Flex>
    </Box>
  );
});

Header.displayName = 'Header';

export default Header;
