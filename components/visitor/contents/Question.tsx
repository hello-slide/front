/**********************************************************
 * Questions
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box, Center, Heading, SimpleGrid} from '@chakra-ui/react';
import React from 'react';
import {Topic} from '../../../@types/socket';
import {VisitorAns} from '../../../@types/socket';

const Question: React.FC<{
  topic: Topic;
  setAns: React.Dispatch<React.SetStateAction<VisitorAns>>;
}> = ({topic, setAns}) => {
  const [answer, setAnswer] = React.useState('');

  React.useEffect(() => {
    if (answer) {
      const ans: VisitorAns = {
        ans: {
          t: 'qz',
          qz: answer,
        },
      };
      setAns(ans);
    }
  }, [answer]);

  return (
    <Center width="100%" height="100%">
      <Box>
        <Heading marginY="3rem" textAlign="center">
          {topic.tp}
        </Heading>
        <SimpleGrid
          columns={2}
          spacing={['5', '10']}
          marginBottom="5rem"
          marginX="1rem"
        >
          {topic.c.map(value => {
            return (
              <Center
                key={value.id}
                minHeight="100px"
                onClick={() => {
                  if (!answer) {
                    setAnswer(value.id);
                  }
                }}
                backgroundColor={answer === value.id ? 'blue.200' : 'gray.200'}
                fontSize="1.2rem"
                fontWeight="bold"
                padding="1rem"
                borderRadius="5px"
              >
                {value.text}
              </Center>
            );
          })}
        </SimpleGrid>
      </Box>
    </Center>
  );
};

export default Question;
