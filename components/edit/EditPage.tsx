/**********************************************************
 * Edit page
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box, Flex} from '@chakra-ui/react';
import React from 'react';
import NoSSR from 'react-no-ssr';
import Page from '../../@types/page';
import PageList from './PageList';

const EditPage: React.FC<{id: string | string[]}> = ({id}) => {
  const [currentPage, setCurrentPage] = React.useState<Page | undefined>();
  return (
    <NoSSR>
      <Flex width="100%" height="calc(100vh - 84px)" margin="0" padding="0">
        <PageList
          setCurrentPage={page => {
            setCurrentPage(page);
          }}
          nowPageId={currentPage?.id}
        />
        <Box>
          * 現在のページID: {currentPage?.id}
          <br />* 現在のページタイプ: {currentPage?.type}
        </Box>
      </Flex>
    </NoSSR>
  );
};

export default EditPage;
