/**********************************************************
 * markdown h{number} tag.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Heading, Divider, Box} from '@chakra-ui/react';

export const H1: React.FC = ({children}) => {
  return (
    <Box marginY="1rem">
      <Heading fontSize="2.3rem" paddingLeft=".5rem">
        {children}
      </Heading>
      <Divider borderWidth="1px" />
    </Box>
  );
};

export const H2: React.FC = ({children}) => {
  return (
    <Box marginY="1rem">
      <Heading fontSize="2.1rem" paddingLeft=".5rem">
        {children}
      </Heading>
      <Divider borderWidth="1px" />
    </Box>
  );
};

export const H3: React.FC = ({children}) => {
  return (
    <Box marginY="1rem">
      <Heading fontSize="1.9rem" paddingLeft=".5rem">
        {children}
      </Heading>
      <Divider borderWidth="1px" />
    </Box>
  );
};

export const H4: React.FC = ({children}) => {
  return (
    <Box marginY="1rem">
      <Heading fontSize="1.7rem" paddingLeft=".5rem">
        {children}
      </Heading>
      <Divider borderWidth="1px" />
    </Box>
  );
};

export const H5: React.FC = ({children}) => {
  return (
    <Box marginY="1rem">
      <Heading fontSize="1.5rem" paddingLeft=".5rem">
        {children}
      </Heading>
      <Divider borderWidth="1px" />
    </Box>
  );
};

export const H6: React.FC = ({children}) => {
  return (
    <Box marginY="1rem">
      <Heading fontSize="1.3rem" paddingLeft=".5rem">
        {children}
      </Heading>
      <Divider borderWidth="1px" />
    </Box>
  );
};
