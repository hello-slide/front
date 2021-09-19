/**********************************************************
 * End slideshow contents.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Flex, Heading, Box, Divider, Text} from '@chakra-ui/react';
import {useRecoilValue} from 'recoil';
import {UserDataState} from '../../../../utils/state/atom';

const End = () => {
  const userData = useRecoilValue(UserDataState);

  return (
    <Flex
      height="100%"
      backgroundColor="black"
      color="white"
      position="relative"
    >
      <Box
        position="absolute"
        right="0"
        bottom="0"
        margin="7rem"
        width="200px"
        textAlign="center"
      >
        <Heading fontSize="5rem">終</Heading>
        <Text marginY=".5rem" fontSize="2rem">
          制作・作成者
        </Text>
        <Divider borderWidth="1px" borderColor="white" marginY=".5rem" />
        <Text fontSize="2rem">{userData?.name}</Text>
      </Box>
      <Flex
        position="absolute"
        bottom="0"
        alignItems="center"
        flexDirection="column"
        width="100%"
        color="#262626"
        fontSize="1.5rem"
        marginBottom=".5rem"
      >
        &copy; {new Date().getFullYear()} hello-slide
      </Flex>
    </Flex>
  );
};

export default End;
