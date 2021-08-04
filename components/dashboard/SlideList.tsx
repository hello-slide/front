/**********************************************************
 * Slide list components
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box, Text, Button, Center, useDisclosure} from '@chakra-ui/react';
import React from 'react';
import {useRecoilValue} from 'recoil';
import {SlideState} from '../../utils/state/atom';
import SlideContents from '../common/SlideContents';
import NewSlide from './NewSlide';
import Slides from './Slides';

const SlideList = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const slides = useRecoilValue(SlideState);

  const Empty = () => {
    return (
      <SlideContents height="60vh">
        <Box>
          <Text fontSize="1.5rem">さあ、はじめましょう</Text>
          <Center marginTop="1rem">
            <Button onClick={onOpen}>新規作成</Button>
          </Center>
        </Box>
      </SlideContents>
    );
  };

  return (
    <Box marginY="5%">
      {slides.length !== 0 ? (
        <Slides slides={slides} onOpen={onOpen} />
      ) : (
        <Empty />
      )}
      <NewSlide isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default SlideList;
