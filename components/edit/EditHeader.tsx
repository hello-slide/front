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
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {NowPageDataState, ShowState} from '../../utils/state/atom';
import Link from '../common/Link';
import SavePage from './SavePage';

const EditHeader: React.FC<{id: string | string[]}> = ({id}) => {
  const nowPageData = useRecoilValue(NowPageDataState);
  const setShow = useSetRecoilState(ShowState);
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
      <Flex>
        <SavePage marginRight="1rem" />
        <Button
          colorScheme="blue"
          size="sm"
          onClick={() => {
            if (typeof id === 'string') {
              setShow(id);
            }
          }}
        >
          プレゼンテーションを開始
        </Button>
      </Flex>
    </Flex>
  );
};

export default EditHeader;
