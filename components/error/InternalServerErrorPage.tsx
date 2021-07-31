/**********************************************************
 * 500 Internal Server Error Page
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box, Text} from '@chakra-ui/react';
import React from 'react';
import SlideContents from '../common/SlideContents';

const InternalServerErrorPage = () => {
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
        <Text
          fontSize={{base: '1.8rem', sm: '2.5rem'}}
          fontWeight="light"
          marginBottom="1.5rem"
        >
          500 | Internal Server Error.
        </Text>
        <Text fontSize={{base: '1rem', sm: '1.5rem'}} fontWeight="light">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Λ＿Λ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;＼＼
          <br />
          &nbsp;（&nbsp;&nbsp;&nbsp;&nbsp;・∀・）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;ｶﾞｯ
          <br />
          と&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ｙ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/ノ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;人
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;_Λ∩
          <br />
          &nbsp;&nbsp;＿/し&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;／／. Ｖ｀Д´）/
          <br />
          （＿フ彡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;←&gt;&gt;1
        </Text>
      </SlideContents>
    </Box>
  );
};

export default InternalServerErrorPage;
