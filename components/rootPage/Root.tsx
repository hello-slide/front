/**********************************************************
 * Root page.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box, Flex} from '@chakra-ui/react';
import React, {useRef, useCallback} from 'react';
import {IoCaretDown} from 'react-icons/io5';
import Logo from '../../assets/svgs/logo.svg';

const Root = () => {
  const refContents = useRef<HTMLDivElement>();

  const scrollToContents = useCallback(() => {
    refContents.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [refContents]);

  return (
    <React.Fragment>
      <Flex
        // backgroundColor="#333"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        width="100%"
        height="100vh"
      >
        <Logo width="30rem" />
        <Box marginTop="10rem">
          <IoCaretDown size="1.75rem" onClick={scrollToContents} />
        </Box>
      </Flex>
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        width="100%"
        height="100vh"
        ref={refContents}
      >
        <h1>What is &quot;HelloSlide&quot; ? </h1>
        <p></p>
      </Flex>
    </React.Fragment>
  );
};

export default Root;
