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
import {IoArrowBackOutline} from 'react-icons/io5';
import {useRecoilValue} from 'recoil';
import {NowPageDataState} from '../../utils/state/atom';
import Link from '../common/Link';

const EditHeader: React.FC = () => {
  const nowPageData = useRecoilValue(NowPageDataState);
  return (
    <Flex justifyContent="space-between" margin="0 .5rem 0">
      <Flex>
        <Link href="/dashboard">
          <IoArrowBackOutline size="29px" />
        </Link>
        <Text
          fontWeight="bold"
          fontSize="1.2rem"
          overflow="hidden"
          height="30px"
          marginLeft="2rem"
        >
          {nowPageData?.title}
        </Text>
      </Flex>
      <Button colorScheme="blue" size="sm">
        プレゼンテーションを開始
      </Button>
    </Flex>
  );
};

export default EditHeader;
