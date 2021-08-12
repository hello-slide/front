/**********************************************************
 * Edit page header.
 *
 * @author YutoWatanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Button, Flex} from '@chakra-ui/react';

const EditHeader = () => {
  return (
    <Flex justifyContent="flex-end" margin="0 .5rem 0 0">
      <Button colorScheme="blue" size="sm">
        プレゼンテーションを開始
      </Button>
    </Flex>
  );
};

export default EditHeader;
