/**********************************************************
 * Root page.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box} from '@chakra-ui/react';
import React from 'react';
import Logo from '../../assets/svgs/logo.svg';
import Footer from '../common/Footer';

const Root = () => {
  return (
    <React.Fragment>
      <Box
        backgroundColor={'#333'}
        width="100%"
        mb={18}
        p={2}
        textAlign={'center'}
      >
        <Box>
          <Logo width="30rem" />
        </Box>
      </Box>
      <Footer />
    </React.Fragment>
  );
};

export default Root;
