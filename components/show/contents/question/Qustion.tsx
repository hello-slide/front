/**********************************************************
 * Question show contents.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Heading, Center} from '@chakra-ui/react';
import {useRecoilValue} from 'recoil';
import {Question as QuestionType} from '../../../../@types/pageItem';
import {SlideshowDataState} from '../../../../utils/state/atom';
import Design from '../common/Design';

const Question: React.FC<{id: string}> = ({id}) => {
  const slideshowData = useRecoilValue(SlideshowDataState);
  const questionData = slideshowData.data?.find(value => value.key === id)
    .value as QuestionType;

  return (
    <Design data={questionData?.slideDesign}>
      <Center paddingY="2rem">
        <Heading fontSize="4rem">{questionData.text}</Heading>
      </Center>
    </Design>
  );
};

export default Question;
