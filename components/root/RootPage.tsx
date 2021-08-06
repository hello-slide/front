/**********************************************************
 * Root page.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>, Yoshitsugu Tahara <arisahyper0000@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/

import {Box, Text, Center, Button, useDisclosure} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React, {useRef, useCallback} from 'react';
import {IoCaretDown} from 'react-icons/io5';
import NoSSR from 'react-no-ssr';
import {useRecoilValue} from 'recoil';
import {UserDataState} from '../../utils/state/atom';
import Login from '../common/Login';
import SlideContents from '../common/SlideContents';
import AnimationLogo from './AnimationLogo';

const RootPage = () => {
  const userData = useRecoilValue(UserDataState);
  const router = useRouter();
  const refContentsFirst = useRef<HTMLDivElement>();
  const refContentsSecond = useRef<HTMLDivElement>();
  const refContentsThird = useRef<HTMLDivElement>();
  const {isOpen, onOpen, onClose} = useDisclosure();

  React.useEffect(() => {
    if (typeof userData.refreshToken !== 'undefined') {
      router.push('/dashboard');
      return;
    }
    refContentsFirst.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });

  const scrollToSecond = useCallback(() => {
    refContentsSecond.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [refContentsSecond]);

  const scrollToThird = useCallback(() => {
    refContentsThird.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [refContentsThird]);

  return (
    <Box>
      <Box ref={refContentsFirst}>
        <SlideContents>
          <Box width={{base: '20rem', md: '30rem', lg: '35rem'}}>
            <AnimationLogo />
            <Text textAlign="center" color="gray.500">
              参加ができる進化したスライド
            </Text>
          </Box>
          <Box transition="1.0s" marginTop="5rem">
            <IoCaretDown
              size="1.75rem"
              cursor="pointer"
              onClick={scrollToSecond}
            />
          </Box>
        </SlideContents>
      </Box>
      <Box ref={refContentsSecond}>
        <SlideContents>
          <Text fontSize={{base: '1.75rem', sm: '2rem'}} marginBottom="2rem">
            「HelloSlide」ってなに？
          </Text>
          <Box lineHeight="1.75rem" textAlign="center" color="gray.500">
            <Text>
              HelloSlideはあなたと観客がリアルタイムにコミュニケーションを行えるスライドです。
            </Text>
          </Box>
          <Box transition="1.0s" marginTop="5rem">
            <IoCaretDown
              size="1.75rem"
              cursor="pointer"
              onClick={scrollToThird}
            />
          </Box>
        </SlideContents>
      </Box>
      <Box marginTop={{base: '10rem', md: '15rem'}} ref={refContentsThird}>
        <Center>
          <Text fontSize={{base: '1.75rem', sm: '2rem'}} marginBottom="2rem">
            いますぐログイン！
          </Text>
        </Center>
        <Center marginBottom="15rem">
          <Button onClick={onOpen} colorScheme="blue">
            ログイン
          </Button>
          <NoSSR>
            <Login isOpen={isOpen} onClose={onClose} />
          </NoSSR>
        </Center>
      </Box>
    </Box>
  );
};

export default RootPage;
