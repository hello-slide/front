/**********************************************************
 * footer list
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Heading, Link, Stack, Box} from '@chakra-ui/react';
import React from 'react';

const FooterList: React.FC<{
  title: string;
  elements: {
    text: string;
    links: string;
    isExternal?: boolean;
  }[];
}> = ({title, elements}) => {
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
};

export default FooterList;
