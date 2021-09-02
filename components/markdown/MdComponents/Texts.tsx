/**********************************************************
 * md text tags
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box, Text} from '@chakra-ui/react';
import Link_ from '../../common/Link';

export const P: React.FC = ({children}) => {
  return (
    <Text as="p" fontSize="1rem" marginLeft=".75rem" lineHeight="1.9rem">
      {children}
    </Text>
  );
};

export const Strong: React.FC = ({children}) => {
  return (
    <Text
      as="span"
      fontWeight="bold"
      fontSize="1rem"
      borderBottom="solid"
      borderColor="#00D0FF"
      borderBottomWidth="2px"
    >
      {children}
    </Text>
  );
};

export const Code: React.FC = ({children}) => {
  return (
    <Text
      as="span"
      fontWeight="medium"
      fontSize="1rem"
      backgroundColor="gray.100"
      borderRadius="3px"
      padding="0rem .4rem 0rem .4rem"
    >
      {children}
    </Text>
  );
};

export const Pre: React.FC = ({children}) => {
  return (
    <Box marginX="1rem" width="100%" backgroundColor="gray.100" padding=".5rem">
      {children}
    </Box>
  );
};

export const Link: React.FC<{href?: string}> = props => {
  return (
    <Link_
      color="#1f84d1"
      _hover={{color: 'black'}}
      textDecoration="underline"
      href={props.href}
    >
      {props.children}
    </Link_>
  );
};

export const Quote: React.FC = ({children}) => {
  return (
    <Text
      borderLeft="solid"
      borderLeftWidth="4px"
      borderLeftColor="gray.200"
      marginLeft="1.5rem"
      marginY=".75rem"
    >
      {children}
    </Text>
  );
};
