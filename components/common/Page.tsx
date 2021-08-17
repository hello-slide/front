/**********************************************************
 * Page.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box, Flex} from '@chakra-ui/react';
import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Page: React.FC<{noFooter?: boolean}> = ({children, noFooter}) => {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Box>
        <Header />
        {children}
      </Box>
      <Box marginTop="auto">{noFooter ? null : <Footer />}</Box>
    </Flex>
  );
};

export default Page;
