/**********************************************************
 * 404 Not Found page
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box, Center, Text} from '@chakra-ui/react';

const NotFoundPage = () => {
  return (
    <Center padding="30vh">
      <Box>
        <Text fontSize="3rem" fontWeight="light">
          404 | Not Found.
        </Text>
      </Box>
    </Center>
  );
};

export default NotFoundPage;
