/**********************************************************
 * Root page.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box, Flex} from '@chakra-ui/react';
import React from 'react';
import Logo from '../../assets/svgs/logo.svg';
import Footer from '../common/Footer';

const Root = () => {
  return (
    <React.Fragment>
      <Box backgroundColor={'#333'} width="100vw" height="100vh" m={0} p={0}>
        <Flex justifyContent="center">
          <Logo width="30rem" my="50vh" />
        </Flex>
      </Box>
      <Footer />
    </React.Fragment>
  );
};

export default Root;
