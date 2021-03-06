/**********************************************************
 * Slide contents
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Flex, FlexProps} from '@chakra-ui/react';
import React from 'react';

const SlideContents: React.FC<FlexProps> = props => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      width="100%"
      height="100vh"
      px={{base: '1rem', md: '5rem'}}
      {...props}
    >
      {props.children}
    </Flex>
  );
};

export default SlideContents;
