/**********************************************************
 * Next link and chakra link
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Link as ChakraLink, LinkProps} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';

const Link: React.FC<LinkProps> = props => {
  return (
    <NextLink href={props.href}>
      <ChakraLink
        {...props}
        onClick={() => (document.activeElement as HTMLElement).blur()}
      />
    </NextLink>
  );
};

export default Link;
