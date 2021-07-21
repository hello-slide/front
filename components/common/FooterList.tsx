/**********************************************************
 * footer list
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Text, Link, ListItem, UnorderedList} from '@chakra-ui/react';
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
    <React.Fragment>
      <Text fontWeight="bold">{title}</Text>
      <UnorderedList listStyleType="none" margin="0">
        {elements.map((value, index) => {
          return (
            <ListItem key={index} margin=".5rem 0 .5rem 0">
              <Link href={value.links} isExternal={value.isExternal}>
                {value.text}
              </Link>
            </ListItem>
          );
        })}
      </UnorderedList>
    </React.Fragment>
  );
};

export default FooterList;
