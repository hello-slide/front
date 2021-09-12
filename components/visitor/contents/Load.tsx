/**********************************************************
 * Visitor load.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Heading, Center, Box, Spinner} from '@chakra-ui/react';
import React from 'react';

const Load = () => {
  return (
    <Center height="100%">
      <Box>
        <Heading>しばらくお待ち下さい...</Heading>
        <Center marginY="2rem">
          <Spinner size="xl" />
        </Center>
      </Box>
    </Center>
  );
};

export default Load;
