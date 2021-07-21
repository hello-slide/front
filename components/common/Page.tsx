/**********************************************************
 * Page.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box} from '@chakra-ui/react';
import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Page: React.FC<{isLogin: boolean}> = ({children, isLogin}) => {
  return (
    <Box position="relative">
      <Box minHeight="calc(100vh)" paddingBottom="30px">
        <Header isLogin={isLogin} />
        {children}
      </Box>
      <Box position="absolute" bottom={0} left={0} width="100%">
        <Footer />
      </Box>
    </Box>
  );
};

export default Page;
