/**********************************************************
 * Edit page header.
 *
 * @author YutoWatanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Button, Flex, Text} from '@chakra-ui/react';
import React from 'react';
import {useRecoilValue} from 'recoil';
import {NowPageData} from '../../utils/state/atom';

const EditHeader: React.FC = () => {
  const nowPageData = useRecoilValue(NowPageData);
  return (
    <Flex justifyContent="space-between" margin="0 .5rem 0">
      <Text fontWeight="bold" fontSize="1.2rem" overflow="hidden" height="30px">
        {nowPageData?.title}
      </Text>
      <Button colorScheme="blue" size="sm">
        プレゼンテーションを開始
      </Button>
    </Flex>
  );
};

export default EditHeader;
