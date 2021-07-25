/**********************************************************
 * information text
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box, Heading, Center} from '@chakra-ui/react';

const InfoText: React.FC<{title: string}> = props => {
  return (
    <Box>
      <Center>
        <Heading fontSize="1.75rem" margin="1rem 0 1rem 0">
          {props.title}
        </Heading>
      </Center>
      <Box>{props.children}</Box>
    </Box>
  );
};

export default InfoText;
