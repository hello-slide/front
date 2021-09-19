/**********************************************************
 * Quiz first show contents.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Center, Heading} from '@chakra-ui/react';
import React from 'react';
import {useRecoilValue} from 'recoil';
import {Quiz} from '../../../../@types/pageItem';
import {Topic} from '../../../../@types/socket';
import {SlideshowDataState} from '../../../../utils/state/atom';
import Design from '../common/Design';
import Graph from './Graph';

const QuizFirst: React.FC<{
  id: string;
  visitor: number;
  link: string;
  setTopic: React.Dispatch<React.SetStateAction<string>>;
}> = ({id, link, setTopic, visitor}) => {
  const slideshowData = useRecoilValue(SlideshowDataState);
  const questionData = slideshowData?.find(value => value.key === id)
    .value as Quiz;

  React.useEffect(() => {
    if (questionData) {
      const sendData: Topic = {
        t: 'q1',
        tp: questionData.title,
        n: questionData.numberOfChoices,
        c: questionData.choices,
      };
      setTopic(JSON.stringify(sendData));
    }
  }, [questionData]);

  return (
    <Design data={questionData?.slideDesign} link={link} visitor={visitor}>
      <Center paddingY="2rem">
        <Heading fontSize="4rem">{questionData?.title || '？'}</Heading>
      </Center>
      <Graph
        choices={questionData.choices}
        color={questionData?.slideDesign.textColor}
      />
    </Design>
  );
};

export default QuizFirst;
