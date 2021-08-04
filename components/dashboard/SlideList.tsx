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
  Wrap,
  Text,
  Button,
  Center,
  useDisclosure,
  Flex,
  ChakraComponent,
  WrapItem,
} from '@chakra-ui/react';
import React from 'react';
import {IoAdd, IoTimeOutline} from 'react-icons/io5';
import {useRecoilValue} from 'recoil';
import {SlideState} from '../../utils/state/atom';
import updateDate from '../../utils/updateDate';
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
      <WrapItem>
        <Box
          width="250px"
          height="100px"
          borderWidth="1.5px"
          borderRadius="lg"
          {...props}
        >
          {props.children}
        </Box>
      </WrapItem>
    );
  };

  const handleChange = (id: string) => {
    // TODO: Jump to edit page
    console.log(id);
  };

  const Slides = () => {
    const [update, setUpdate] = React.useState(false);

    // Re-render every minute to update the date and time.
    React.useEffect(() => {
      setTimeout(() => {
        setUpdate(!update);
      }, 61000);
    }, [update]);

    return (
      <Wrap
        spacing="40px"
        marginX={{base: '5%', sm: '10%', md: '13%', lg: '17%'}}
      >
        {slides.map(value => {
          const createDate = new Date(value.createDate);
          const lastChangeDate = new Date(value.lastChange);
          return (
            <ListContents
              key={value.id}
              padding=".5rem"
              onClick={() => {
                handleChange(value.id);
              }}
              cursor="pointer"
            >
              <Text fontWeight="bold" fontSize="1.2rem" marginBottom="1rem">
                {value.title}
              </Text>
              <Flex alignItems="center" fontSize=".9rem">
                <IoTimeOutline size="17" />
                <Text marginLeft=".5rem">
                  {updateDate(lastChangeDate, createDate)}
                </Text>
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
      </Wrap>
    );
  };

  return (
    <Box marginY="5%">
      {slides.length !== 0 ? <Slides /> : <Empty />}
      <NewSlide isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default SlideList;
