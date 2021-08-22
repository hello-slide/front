/**********************************************************
 * Change slide contents.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import React from 'react';
import Page from '../../@types/page';

import End from './contents/common/End';
import OpExplanation from './contents/common/OpExplanation';
import QrCode from './contents/common/QrCode';
import Question from './contents/question/Qustion';
import QuizFirst from './contents/quiz/QuizFirst';
import QuizSecond from './contents/quiz/QuizSecond';

const ChangeContents: React.FC<{index: number; pageList: Page[]}> = props => {
  const Pages = (index: number) => {
    switch (props.pageList[index]?.type) {
      case 'quiz1':
        return <QuizFirst id={props.pageList[index].id} />;
      case 'quiz2':
        return <QuizSecond id={props.pageList[index].id} />;
      case 'question':
        return <Question id={props.pageList[index].id} />;
      default:
        return <End />;
    }
  };

  switch (props.index) {
    case 0:
      return <OpExplanation />;
    case 1:
      return <QrCode />;
    default:
      return Pages(props.index - 2);
  }
};

export default ChangeContents;
