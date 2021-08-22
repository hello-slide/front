/**********************************************************
 * Edit page
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box} from '@chakra-ui/react';
import React from 'react';
import NoSSR from 'react-no-ssr';
import Show from '../show/Show';
import Edit from './Edit';
import EditHeader from './EditHeader';

const EditPage: React.FC<{id: string | string[]}> = ({id}) => {
  return (
    <>
      <NoSSR>
        <Box width="100%" height="calc(100vh - 84px)" margin="0" padding="0">
          <EditHeader id={id} />
          <Edit id={id} />
        </Box>
      </NoSSR>
      <Show />
    </>
  );
};

export default EditPage;
