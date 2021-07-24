/**********************************************************
 * Root page.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>, Yoshitsugu Tahara <arisahyper0000@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/

import {Box, Flex, Text} from '@chakra-ui/react';
import React, {useRef, useCallback} from 'react';
import {IoCaretDown} from 'react-icons/io5';
import Logo from '../../assets/svgs/logo.svg';

const RootPage = () => {
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
        <Logo width="30rem" style={{}} />
        <Box transition="1.0s" marginTop="10rem">
          <IoCaretDown
            size="1.75rem"
            cursor="pointer"
            onClick={scrollToContents}
          />
        </Box>
      </Flex>
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        width="100%"
        height="100vh"
        ref={refContents}
        px="10em"
      >
        <Flex flexDirection="column">
          <Text fontSize="2rem" my="2rem">
            What is &quot;HelloSlide&quot; ?{' '}
          </Text>
        </Flex>

        <Flex>
          <Text lineHeight="1.75rem">
            Hello
            Slideはあなたと観客がリアルタイムにコミュニケーションを取りながらプレゼンテーションを行えるサービスです。
            <br />
            <br />
            HelloSlideを使うことであなたは観客の反応の得られない寂しいプレゼンテーションとはお別れできます。
          </Text>
        </Flex>
      </Flex>
    </React.Fragment>
  );
};

export default RootPage;
