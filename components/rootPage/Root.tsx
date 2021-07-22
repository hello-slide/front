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
      <Flex
        backgroundColor="#333"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        width="100vw"
        height="100vh"
      >
        <Logo width="30rem" />
      </Flex>
      <Footer />
    </React.Fragment>
  );
};

export default Root;
