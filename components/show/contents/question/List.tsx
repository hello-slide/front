/**********************************************************
 * question list
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box, Text, Center} from '@chakra-ui/react';
import React from 'react';
import {useRecoilValue} from 'recoil';
import {Answer} from '../../../../@types/socket';
import {AnswersState} from '../../../../utils/state/atom';

const List: React.FC<{isAnonymous: boolean; id: string}> = ({
  isAnonymous,
  id,
}) => {
  const [allAns, setAllAns] = React.useState<Answer[]>([]);
  const answers = useRecoilValue(AnswersState);

  React.useEffect(() => {
    setAllAns(value => {
      return value.concat(answers);
    });
  }, [answers]);

  React.useEffect(() => {
    setAllAns([]);
  }, [id]);

  return (
    <Center>
      <Box
        height="calc(92% - 5rem)"
        overflowY="scroll"
        css={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {allAns.map((value, index) => {
          const text = (JSON.parse(value.answer) as Answer)['qe'];

          if (isAnonymous) {
            return (
              <Box key={index}>
                <Text
                  as="span"
                  fontSize="2.1rem"
                  fontWeight="bold"
                  marginRight="1.2rem"
                >
                  {index}:
                </Text>
                <Text as="span" fontSize="2.1rem">
                  {text}
                </Text>
              </Box>
            );
          }
          return (
            <Box key={index}>
              <Text
                as="span"
                fontSize="2.1rem"
                fontWeight="bold"
                marginRight="1.2rem"
              >
                {index}: [{value.name}]
              </Text>
              <Text as="span" fontSize="2.1rem">
                {text}
              </Text>
            </Box>
          );
        })}
      </Box>
    </Center>
  );
};

export default List;
