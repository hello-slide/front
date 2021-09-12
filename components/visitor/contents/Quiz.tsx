/**********************************************************
 * Quiz
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box, Center, Heading, SimpleGrid} from '@chakra-ui/react';
import React from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import {Topic} from '../../../@types/socket';
import {VisitorAns} from '../../../@types/socket';

enum Result {
  Pass,
  Fail,
  NoResult,
}

const Quiz: React.FC<{
  topic: Topic;
  setAns: React.Dispatch<React.SetStateAction<VisitorAns>>;
}> = ({topic, setAns}) => {
  const [answer, setAnswer] = React.useState('');
  const [answerIndex, setAnswerIndex] = React.useState(10); // 10 is out of choice.
  const [resultIndex, setResultIndex] = React.useState(10); // 10 is out of choice.
  const [result, setResult] = React.useState<Result>(Result.NoResult);
  const [lock, setLock] = React.useState(false);
  const {width, height} = useWindowSize();

  React.useEffect(() => {
    if (answer) {
      const ans: VisitorAns = {
        ans: {
          t: 'qz',
          qz: answer,
        },
      };
      setAns(ans);
      setLock(true);
    }
  }, [answer]);

  React.useEffect(() => {
    if (topic.a) {
      setLock(true);
      if (topic.a === answerIndex) {
        setResult(Result.Pass);
      } else {
        setResult(Result.Fail);
      }
      setResultIndex(topic.a);
    } else {
      setAnswer('');
      setAnswerIndex(10);
      setLock(false);
      setResult(Result.NoResult);
      setResultIndex(10);
    }
  }, [topic]);

  const Celebration = () => {
    switch (result) {
      case Result.Pass:
        console.log('pass');
        return <Confetti width={width} height={height} recycle={false} />;
      case Result.Fail:
        // TODO: add fail animation.
        return <></>;
      case Result.NoResult:
        return <></>;
    }
  };

  return (
    <>
      <Celebration />
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
            {topic.c.map((value, index) => {
              return (
                <Center
                  key={value.id}
                  minHeight="100px"
                  minWidth="100px"
                  onClick={() => {
                    if (!lock) {
                      setAnswer(value.id);
                      setAnswerIndex(index);
                    }
                  }}
                  backgroundColor={
                    answer === value.id ? 'blue.200' : 'gray.200'
                  }
                  fontSize="1.2rem"
                  fontWeight="bold"
                  padding="1rem"
                  borderRadius="5px"
                  borderWidth={resultIndex === index ? '5px' : ''}
                  borderColor="red.500"
                >
                  {value.text}
                </Center>
              );
            })}
          </SimpleGrid>
        </Box>
      </Center>
    </>
  );
};

export default Quiz;
