/**********************************************************
 * Header
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/

import {Box, Flex, Spacer, Avatar, Button} from '@chakra-ui/react';
import React from 'react';
import Logo from '../../assets/svgs/logo.svg';

const Header: React.FC<{isLogin: boolean}> = ({isLogin}) => {
  const Login = () => {
    return <Avatar size="sm" />;
  };

  const NoLogin = () => {
    return <Button colorScheme="blue">Login</Button>;
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
