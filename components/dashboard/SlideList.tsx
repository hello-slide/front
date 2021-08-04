/**********************************************************
 * Slide list components
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {
  Box,
  SimpleGrid,
  Text,
  Button,
  Center,
  useDisclosure,
  Flex,
  ChakraComponent,
} from '@chakra-ui/react';
import {IoAdd, IoTimeOutline} from 'react-icons/io5';
import {useRecoilValue} from 'recoil';
import {SlideState} from '../../utils/state/atom';
import SlideContents from '../common/SlideContents';
import NewSlide from './NewSlide';

const SlideList = () => {
  const slides = useRecoilValue(SlideState);
  const {isOpen, onOpen, onClose} = useDisclosure();

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

  const ListContents: ChakraComponent<'div', {}> = props => {
    return (
      <Box
        width="250px"
        height="100px"
        borderWidth="1.5px"
        borderRadius="lg"
        {...props}
      >
        {props.children}
      </Box>
    );
  };

  const Slides = () => {
    return (
      <SimpleGrid minChildWidth="250px" spacing={5}>
        {slides.map(value => {
          const createDate = new Date(value.createDate);
          return (
            <ListContents key={value.id} padding=".5rem">
              <Text fontWeight="bold" fontSize="1.2rem" marginBottom="1rem">
                {value.title}
              </Text>
              <Flex alignItems="center" fontSize=".9rem">
                <IoTimeOutline size="17" />
                <Text marginLeft=".5rem">{`${createDate.getFullYear()}年 ${
                  createDate.getMonth() + 1
                }月${createDate.getDay() + 1}日 作成`}</Text>
              </Flex>
            </ListContents>
          );
        })}
        <ListContents onClick={onOpen} cursor="pointer">
          <Flex
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            height="100%"
          >
            <IoAdd size="50" />
          </Flex>
        </ListContents>
      </SimpleGrid>
    );
  };

  return (
    <Box marginX={{base: '5%', sm: '10%', md: '13%', lg: '17%'}} marginY="5%">
      {slides.length !== 0 ? <Slides /> : <Empty />}
      <NewSlide isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default SlideList;
