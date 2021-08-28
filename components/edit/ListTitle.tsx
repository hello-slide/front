/**********************************************************
 * Slide list title
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box, Text, ChakraProps} from '@chakra-ui/react';
import React from 'react';

const ListTitle = React.memo<{type: string} & ChakraProps>(props => {
  return (
    <Box fontWeight="bold" fontSize="1.5rem" width="140px" {...props}>
      <Text as="span" fontSize="2.7rem" marginRight=".25rem">
        {props.type.slice(0, 1).toUpperCase()}
      </Text>
      <Text as="span" fontSize="1.5rem" wordBreak="keep-all">
        {props.type.slice(1).toLowerCase()}
      </Text>
    </Box>
  );
});

ListTitle.displayName = 'listTitle';

export default ListTitle;
