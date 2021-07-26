/**********************************************************
 * 404 Not Found page
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box, Text} from '@chakra-ui/react';
import React from 'react';
import SlideContents from '../common/SlideContents';

const NotFoundPage = () => {
  const refContents = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    refContents.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, []);

  return (
    <Box ref={refContents}>
      <SlideContents>
        <Text fontSize="2.5rem" fontWeight="light" marginBottom="1.5rem">
          404 | Not Found.
        </Text>
        <Text fontSize="1.5rem" fontWeight="light">
          ﾊﾞﾝﾊﾞﾝﾊﾞﾝﾊﾞﾝﾊﾞﾝﾊﾞﾝﾊﾞﾝ
          <br />
          ﾊﾞﾝ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ﾊﾞﾝﾊﾞﾝﾊﾞﾝ
          <br />
          ﾊﾞﾝ&nbsp;&nbsp;(∩`･ω･)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ﾊﾞﾝﾊﾞﾝ
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;＿/_ﾐつ/￣￣￣/
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;＼/＿＿＿/￣￣
          <br />
        </Text>
      </SlideContents>
    </Box>
  );
};

export default NotFoundPage;
