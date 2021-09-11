/**********************************************************
 * Quiz second show contents (quiz answer).
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Flex, Heading} from '@chakra-ui/react';
import {useRecoilValue} from 'recoil';
import {Quiz} from '../../../../@types/pageItem';
import {SlideshowDataState} from '../../../../utils/state/atom';
import Design from '../common/Design';

const QuizSecond: React.FC<{id: string; link: string; visitor: number}> = ({
  id,
  link,
  visitor,
}) => {
  const slideshowData = useRecoilValue(SlideshowDataState);
  const questionData = slideshowData.data?.find(value => value.key === id)
    .value as Quiz;

  return (
    <Design data={questionData?.slideDesign} link={link} visitor={visitor}>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Heading fontSize="3rem" marginBottom="1rem">
          正解は
        </Heading>
        <Heading fontSize="6rem">
          {questionData?.choices[questionData?.answerIndex].text || '？'}
        </Heading>
      </Flex>
    </Design>
  );
};

export default QuizSecond;
