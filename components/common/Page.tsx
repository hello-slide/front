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

const Page: React.FC = ({children}) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box>
        <Header />
        {children}
      </Box>
      <Box marginTop="auto">
        <Footer />
      </Box>
    </Box>
  );
};

export default Page;
