/**********************************************************
 * [Module description.]
 *
 * @author YourName <YourMailAddress>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import React from 'react';
import {useRecoilValue} from 'recoil';
import {CurrentPageState} from '../../utils/state/atom';
import QuestionEdit from './editContents/QuestionEdit';
import QuizEdit from './editContents/QuizEdit';

const EditMain = () => {
  const currentPage = useRecoilValue(CurrentPageState);

  switch (currentPage?.type) {
    case 'quiz':
      return <QuizEdit id={currentPage?.id} />;

    case 'question':
      return <QuestionEdit id={currentPage?.id} />;

    default:
      return <></>;
  }
};

export default EditMain;
