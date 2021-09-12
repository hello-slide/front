/**********************************************************
 * Question show contents.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Heading, Center} from '@chakra-ui/react';
import React from 'react';
import {useRecoilValue} from 'recoil';
import {Question as QuestionType} from '../../../../@types/pageItem';
import {Topic} from '../../../../@types/socket';
import {SlideshowDataState} from '../../../../utils/state/atom';
import Design from '../common/Design';
import List from './List';

const Question: React.FC<{
  id: string;
  link: string;
  visitor: number;
  setTopic: React.Dispatch<React.SetStateAction<string>>;
}> = ({id, link, setTopic, visitor}) => {
  const slideshowData = useRecoilValue(SlideshowDataState);
  const questionData = slideshowData.data?.find(value => value.key === id)
    .value as QuestionType;

  React.useEffect(() => {
    if (questionData) {
      const sendData: Topic = {
        t: 'qe',
        tp: questionData.text,
        an: questionData.isAnonymous ? 1 : 0,
      };
      setTopic(JSON.stringify(sendData));
    }
  }, [questionData]);

  return (
    <Design data={questionData?.slideDesign} link={link} visitor={visitor}>
      <Center paddingY="2rem">
        <Heading fontSize="4rem">{questionData.text}</Heading>
      </Center>
      <List isAnonymous={questionData.isAnonymous} id={questionData.id} />
    </Design>
  );
};

export default Question;
