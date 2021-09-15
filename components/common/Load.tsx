/**********************************************************
 * Load Spinner
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box, Spinner, Flex} from '@chakra-ui/react';
import React from 'react';

const Load: React.FC<{isLoad: boolean}> = ({isLoad}) => {
  return (
    <>
      {!isLoad || (
        <>
          <Box
            backgroundColor="gray.400"
            opacity=".5"
            position="fixed"
            width="100vw"
            height="100vh"
            zIndex="9999"
            top="0"
            left="0"
          ></Box>
          <Flex
            width="100vw"
            height="100vh"
            position="fixed"
            top="0"
            left="0"
            zIndex="9999"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner thickness="4px" speed="0.65s" color="blue.500" size="xl" />
          </Flex>
        </>
      )}
    </>
  );
};

export default Load;
