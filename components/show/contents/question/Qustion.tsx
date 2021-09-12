/**********************************************************
 * Question show contents.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Heading, Center, Box} from '@chakra-ui/react';
import React from 'react';
import {useRecoilValue} from 'recoil';
import {Question as QuestionType} from '../../../../@types/pageItem';
import {Topic} from '../../../../@types/socket';
import {SlideshowDataState} from '../../../../utils/state/atom';
import {AnswersState} from '../../../../utils/state/atom';
import Design from '../common/Design';

const Question: React.FC<{
  id: string;
  link: string;
  visitor: number;
  setTopic: React.Dispatch<React.SetStateAction<string>>;
}> = ({id, link, setTopic, visitor}) => {
  const slideshowData = useRecoilValue(SlideshowDataState);
  const answers = useRecoilValue(AnswersState);
  const questionData = slideshowData.data?.find(value => value.key === id)
    .value as QuestionType;

  React.useEffect(() => {
    if (questionData) {
      const sendData: Topic = {
        t: 'question',
        tp: questionData.text,
      };
      setTopic(JSON.stringify(sendData));
    }
  }, [questionData]);

  return (
    <Design data={questionData?.slideDesign} link={link} visitor={visitor}>
      <Center paddingY="2rem">
        <Heading fontSize="4rem">{questionData.text}</Heading>
      </Center>
      <Center>
        {answers.map(value => {
          return <Box key={value.user_id}>{value.answer}</Box>;
        })}
      </Center>
    </Design>
  );
};

export default Question;
