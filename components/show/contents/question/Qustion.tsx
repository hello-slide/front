/**********************************************************
 * Question show contents.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Flex, Heading} from '@chakra-ui/react';

const Question: React.FC<{id: string}> = ({id}) => {
  return (
    <Flex justifyContent="center" alignItems="center" marginTop="7rem">
      <Heading>Question {id}</Heading>
    </Flex>
  );
};

export default Question;
