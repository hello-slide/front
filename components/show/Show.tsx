/**********************************************************
 * Start slideshow
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box} from '@chakra-ui/react';
import React from 'react';
import NoSSR from 'react-no-ssr';
import {useRecoilValue} from 'recoil';
import {ShowState} from '../../utils/state/atom';
import ShowController from './ShowController';

const Show = () => {
  const show = useRecoilValue(ShowState);

  if (show) {
    return (
      <NoSSR>
        <Box
          backgroundColor="white"
          position="absolute"
          width="100%"
          height="100%"
          left="0"
          top="0"
          zIndex="1000"
        >
          <ShowController id={show} />
        </Box>
      </NoSSR>
    );
  }
  return <></>;
};

export default Show;
