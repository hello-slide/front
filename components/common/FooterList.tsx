/**********************************************************
 * footer list
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Heading, Stack, Box} from '@chakra-ui/react';
import React from 'react';
import Link from './Link';

const FooterList = React.memo<{
  title: string;
  elements: {
    text: string;
    links: string;
    isExternal?: boolean;
  }[];
}>(({title, elements}) => {
  return (
    <Box>
      <Heading as="h4" fontSize="1.1rem" letterSpacing="wider" mb={4}>
        {title}
      </Heading>
      <Stack fontSize=".9rem">
        {elements.map((value, index) => {
          return (
            <Link href={value.links} key={index} isExternal={value.isExternal}>
              {value.text}
            </Link>
          );
        })}
      </Stack>
    </Box>
  );
});

FooterList.displayName = 'footerName';

export default FooterList;
